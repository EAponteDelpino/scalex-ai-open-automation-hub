/* ScaleX AI Ecommerce Open Toolkit · all financial inputs are nonnegative and monetary values use the chosen unit. */
(function(root) {
"use strict";
const finite = (v,name="value") => {
  if (v === "" || v === null || v === undefined) throw Error(name + " is required");
  const n=Number(v);
  if(!Number.isFinite(n)) throw Error(name + " must be a finite number");
  return n;
};
const nonneg=(v,name)=>{const n=finite(v,name);if(n<0)throw Error(name+" cannot be negative");return n;};
const positive=(v,name)=>{const n=finite(v,name);if(n<=0)throw Error(name+" must be greater than zero");return n;};
const fraction=(v,name)=>{const n=nonneg(v,name);if(n>100)throw Error(name+" cannot exceed 100%");return n/100;};
const ratio=(num,den)=>den===0?null:num/den;
const value=(n)=>Number.isFinite(n)?Math.round((n+Number.EPSILON)*100)/100:null;
function unitProfit(d){
  const price=positive(d.price,"price");
  const product=nonneg(d.product,"product"),packaging=nonneg(d.packaging,"packaging");
  const shipping=nonneg(d.shipping,"shipping"),fee=fraction(d.feePct,"feePct"),ads=nonneg(d.ads,"ads");
  const refund=nonneg(d.refundReserve,"refundReserve");
  const totalCost=product+packaging+shipping+price*fee+ads+refund;
  const profit=price-totalCost;
  return {revenue:value(price),totalCost:value(totalCost),profit:value(profit),marginPct:value(profit/price*100),roiOnCostPct:ratio(profit,totalCost)===null?null:value(profit/totalCost*100)};
}
function roas(d){
  const revenue=nonneg(d.revenue,"revenue"),spend=nonneg(d.spend,"spend"),otherCosts=nonneg(d.otherCosts,"otherCosts");
  const net=revenue-spend-otherCosts;
  return {roas:ratio(revenue,spend)===null?null:value(revenue/spend),netContribution:value(net),marketingCostSharePct:revenue>0?value(spend/revenue*100):null};
}
function maxCpa(d){
  const price=positive(d.price,"price");
  const cogs=nonneg(d.cogs,"cogs"),shipping=nonneg(d.shipping,"shipping"),other=nonneg(d.other,"other");
  const fee=fraction(d.feePct,"feePct"),targetMargin=fraction(d.targetMarginPct,"targetMarginPct");
  const beforeAds=price-cogs-shipping-other-price*fee;
  const max=beforeAds-price*targetMargin;
  return {beforeAdsContribution:value(beforeAds),maxCpa:value(max),feasible:max>=0,minRequiredRoas:max>0?value(price/max):null};
}
function cod(d){
  const total=positive(d.orders,"orders");
  const deliveredPct=fraction(d.deliveryPct,"deliveryPct");
  const price=positive(d.price,"price"),product=nonneg(d.product,"product");
  const shipping=nonneg(d.shipping,"shipping"),returnCost=nonneg(d.returnCost,"returnCost"),adCost=nonneg(d.adCost,"adCost");
  const commission=fraction(d.commissionPct,"commissionPct");
  const delivered=total*deliveredPct,failed=total-delivered;
  const revenue=delivered*price;
  const costs=delivered*(product+shipping+price*commission)+failed*returnCost+total*adCost;
  return {expectedDelivered:value(delivered),expectedFailed:value(failed),expectedRevenue:value(revenue),expectedCosts:value(costs),expectedProfit:value(revenue-costs),profitPerOrder:value((revenue-costs)/total)};
}
function priceFromMargin(d){
  const cost=nonneg(d.cost,"cost"),fixed=nonneg(d.fixed,"fixed");
  const margin=fraction(d.targetMarginPct,"targetMarginPct"),fee=fraction(d.feePct,"feePct");
  const denom=1-margin-fee;
  if(denom<=0)throw Error("target margin plus fee must be below 100%");
  const price=(cost+fixed)/denom;
  return {sellingPrice:value(price),requiredRevenue:value(price),assumedMarginPct:value(margin*100)};
}
function metaScenario(d){
  const budget=nonneg(d.budget,"budget"),cpm=positive(d.cpm,"cpm"),ctr=fraction(d.ctrPct,"ctrPct"),conversion=fraction(d.conversionPct,"conversionPct");
  const ticket=nonneg(d.ticket,"ticket"),productCosts=nonneg(d.productCosts,"productCosts");
  const impressions=budget/cpm*1000, clicks=impressions*ctr,orders=clicks*conversion;
  const revenue=orders*ticket;
  return {expectedImpressions:value(impressions),expectedClicks:value(clicks),expectedOrders:value(orders),expectedRevenue:value(revenue),expectedRoas:budget>0?value(revenue/budget):null,estimatedProfit:value(revenue-budget-orders*productCosts)};
}
function breakeven(d){
  const fixed=nonneg(d.fixed,"fixed"),price=positive(d.price,"price");
  const variable=nonneg(d.variable,"variable");
  const unitContribution=price-variable;
  return {unitContribution:value(unitContribution),breakEvenUnits:unitContribution>0?Math.ceil(fixed/unitContribution):null,feasible:unitContribution>0,breakEvenRevenue:unitContribution>0?value(Math.ceil(fixed/unitContribution)*price):null};
}
function productScore(d){
  const margin=fraction(d.marginPct,"marginPct"),returnPct=fraction(d.returnPct,"returnPct"),competition=fraction(d.competitionPct,"competitionPct");
  const demand=fraction(d.demandPct,"demandPct"),supplier=fraction(d.supplierReliabilityPct,"supplierReliabilityPct");
  const score=Math.max(0,Math.min(100,100*(0.3*margin+0.25*demand+0.2*supplier+0.15*(1-returnPct)+0.1*(1-competition))));
  return {heuristicScore:value(score),grade:score>=75?"strong hypothesis":score>=50?"needs testing":"high-risk hypothesis",disclaimer:"Subjective weighted rubric, not a demand forecast."};
}
function logistics(d){
  const shipments=positive(d.shipments,"shipments");
  const shipped=nonneg(d.outbound,"outbound"),failed=fraction(d.failedPct,"failedPct");
  const returnFee=nonneg(d.returnFee,"returnFee"),pack=nonneg(d.packaging,"packaging");
  const expected=shipments*(shipped+pack)+shipments*failed*returnFee;
  return {expectedTotal:value(expected),avgPerShipment:value(expected/shipments),estimatedFailedShipments:value(shipments*failed)};
}
function dashboard(d){
  const revenue=nonneg(d.revenue,"revenue"),orders=nonneg(d.orders,"orders");
  const spend=nonneg(d.adSpend,"adSpend"),cogs=nonneg(d.cogs,"cogs"),shipping=nonneg(d.shipping,"shipping");
  const fees=nonneg(d.fees,"fees");
  const costs=spend+cogs+shipping+fees;
  const profit=revenue-costs;
  return {revenue:value(revenue),orders:value(orders),aov:orders>0?value(revenue/orders):null,roas:spend>0?value(revenue/spend):null,totalCosts:value(costs),netContribution:value(profit),marginPct:revenue>0?value(profit/revenue*100):null};
}
const calculators={
  "unit-profit":unitProfit,
  "roas":roas,
  "max-cpa":maxCpa,
  "cod-simulator":cod,
  "price-builder":priceFromMargin,
  "meta-ads-scenario":metaScenario,
  "breakeven":breakeven,
  "product-evaluator":productScore,
  "logistics":logistics,
  "kpi-dashboard":dashboard
};
root.ScaleXEcommerce=Object.freeze({calculators,calculate:(id,data)=>{
  if(!Object.prototype.hasOwnProperty.call(calculators,id))throw Error("Unknown calculator");
  return calculators[id](data);
}});
})(typeof globalThis !== "undefined" ? globalThis : window);
