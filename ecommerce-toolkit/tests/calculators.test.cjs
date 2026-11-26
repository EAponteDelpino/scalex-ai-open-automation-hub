const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const test=require("node:test");
const src=fs.readFileSync(path.join(__dirname,"..","src","calculators.js"),"utf8");
const ctx={};vm.createContext(ctx);vm.runInContext(src,ctx);
const c=ctx.ScaleXEcommerce;
const approx=(a,b)=>assert.ok(Math.abs(a-b)<0.011, `${a} != ${b}`);
test("exports exactly ten tools",()=>assert.equal(Object.keys(c.calculators).length,10));
test("unit profit derives fee and margin",()=>{
 const x=c.calculate("unit-profit",{price:100,product:40,packaging:2,shipping:5,feePct:3,ads:10,refundReserve:0});
 approx(x.profit,40);approx(x.marginPct,40);approx(x.totalCost,60);
});
test("roas zero spend returns null",()=>{
 const a=c.calculate("roas",{revenue:100,spend:0,otherCosts:40});
 assert.equal(a.roas,null);approx(a.netContribution,60);
});
test("max CPA accounts for target margin",()=>{
 const a=c.calculate("max-cpa",{price:100,cogs:30,shipping:5,other:5,feePct:5,targetMarginPct:20});
 approx(a.maxCpa,35);approx(a.minRequiredRoas,100/35);
});
test("COD weighted expectancy",()=>{
 const a=c.calculate("cod-simulator",{orders:100,deliveryPct:80,price:100,product:40,shipping:5,returnCost:7,adCost:10,commissionPct:0});
 approx(a.expectedRevenue,8000);approx(a.expectedCosts,80*45+20*7+100*10);approx(a.expectedProfit,3260);
});
test("price builder solves target percentage of selling price",()=>{
 const x=c.calculate("price-builder",{cost:50,fixed:10,targetMarginPct:30,feePct:10});
 approx(x.sellingPrice,100);
});
test("meta scenario calculations",()=>{
 const x=c.calculate("meta-ads-scenario",{budget:200,cpm:10,ctrPct:2,conversionPct:5,ticket:100,productCosts:20});
 approx(x.expectedImpressions,20000);approx(x.expectedOrders,20);approx(x.expectedRevenue,2000);approx(x.estimatedProfit,1400);
});
test("break-even rounding and infeasible state",()=>{
 const x=c.calculate("breakeven",{fixed:100,price:40,variable:18});assert.equal(x.breakEvenUnits,5);
 const y=c.calculate("breakeven",{fixed:100,price:20,variable:20});assert.equal(y.breakEvenUnits,null);assert.equal(y.feasible,false);
});
test("product score is bounded and declared heuristic",()=>{
 const x=c.calculate("product-evaluator",{marginPct:50,returnPct:10,competitionPct:30,demandPct:75,supplierReliabilityPct:80});
 assert.ok(x.heuristicScore<=100 && x.heuristicScore>=0);assert.match(x.disclaimer,/Subjective/);
});
test("logistics computes expected return burden",()=>{
 const x=c.calculate("logistics",{shipments:100,outbound:12,failedPct:20,returnFee:8,packaging:2});
 approx(x.expectedTotal,1560);approx(x.avgPerShipment,15.6);
});
test("dashboard zeros and positive values",()=>{
 const x=c.calculate("kpi-dashboard",{revenue:1000,orders:10,adSpend:250,cogs:300,shipping:100,fees:50});
 approx(x.aov,100);approx(x.roas,4);approx(x.netContribution,300);
});
test("negative and invalid inputs rejected",()=>{
 assert.throws(()=>c.calculate("roas",{revenue:-1,spend:10,otherCosts:0}),/negative/);
 assert.throws(()=>c.calculate("unit-profit",{price:0,product:1,packaging:0,shipping:0,feePct:0,ads:0,refundReserve:0}),/greater than zero/);
 assert.throws(()=>c.calculate("price-builder",{cost:10,fixed:0,targetMarginPct:95,feePct:10}),/below 100/);
 assert.throws(()=>c.calculate("roas",{revenue:"",spend:20,otherCosts:0}),/required/);
 assert.throws(()=>c.calculate("foo",{}),/Unknown/);
});
