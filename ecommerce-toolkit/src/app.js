(function(){
"use strict";
const data=[{"id":"unit-profit","title":"Rentabilidad por producto","description":"Calcula margen, beneficio y ROI por producto considerando costos reales.","inputs":[{"key":"price","label":"Precio de venta","defaultValue":129900},{"key":"product","label":"Costo del producto","defaultValue":55000},{"key":"packaging","label":"Empaque","defaultValue":2000},{"key":"shipping","label":"Envío asumido","defaultValue":10000},{"key":"feePct","label":"Comisión de pago (%)","defaultValue":3},{"key":"ads","label":"Publicidad por pedido","defaultValue":18000},{"key":"refundReserve","label":"Reserva por devoluciones","defaultValue":3000}]},{"id":"roas","title":"ROAS y contribución","description":"Evalúa ingresos frente a inversión y otros costos; ROAS no es beneficio.","inputs":[{"key":"revenue","label":"Ventas atribuibles","defaultValue":3000000},{"key":"spend","label":"Inversión publicitaria","defaultValue":900000},{"key":"otherCosts","label":"Otros costos","defaultValue":1300000}]},{"id":"max-cpa","title":"CPA máximo rentable","description":"Estima cuánto puedes pagar por adquirir un pedido para alcanzar un margen objetivo.","inputs":[{"key":"price","label":"Precio de venta","defaultValue":129900},{"key":"cogs","label":"Producto","defaultValue":55000},{"key":"shipping","label":"Logística","defaultValue":12000},{"key":"other","label":"Otros costos","defaultValue":3000},{"key":"feePct","label":"Comisiones (%)","defaultValue":3},{"key":"targetMarginPct","label":"Margen objetivo (%)","defaultValue":15}]},{"id":"cod-simulator","title":"Contraentrega y devoluciones","description":"Valor esperado con tasas de entregas y devoluciones. Permite pedidos fraccionarios esperados.","inputs":[{"key":"orders","label":"Pedidos","defaultValue":100},{"key":"deliveryPct","label":"Pedidos entregados (%)","defaultValue":75},{"key":"price","label":"Venta por pedido","defaultValue":129900},{"key":"product","label":"Costo del producto entregado","defaultValue":55000},{"key":"shipping","label":"Envío entregado","defaultValue":12000},{"key":"returnCost","label":"Costo pedido fallido","defaultValue":14000},{"key":"adCost","label":"Publicidad por pedido","defaultValue":13000},{"key":"commissionPct","label":"Comisión (%)","defaultValue":4}]},{"id":"price-builder","title":"Precio según margen","description":"Calcula el precio mínimo bajo margen sobre ventas y comisión porcentual.","inputs":[{"key":"cost","label":"Costo base","defaultValue":60000},{"key":"fixed","label":"Costos fijos por unidad","defaultValue":10000},{"key":"targetMarginPct","label":"Margen deseado (%)","defaultValue":30},{"key":"feePct","label":"Comisiones sobre venta (%)","defaultValue":3}]},{"id":"meta-ads-scenario","title":"Escenario Meta Ads","description":"Simulación hipotética de CPM, CTR y conversión; no predice resultados.","inputs":[{"key":"budget","label":"Presupuesto","defaultValue":1000000},{"key":"cpm","label":"CPM","defaultValue":20000},{"key":"ctrPct","label":"CTR (%)","defaultValue":2},{"key":"conversionPct","label":"Conversión de clic a pedido (%)","defaultValue":3},{"key":"ticket","label":"Ticket promedio","defaultValue":129900},{"key":"productCosts","label":"Costos variables por pedido","defaultValue":73000}]},{"id":"breakeven","title":"Punto de equilibrio","description":"Unidades necesarias para cubrir costos fijos considerando contribución positiva.","inputs":[{"key":"fixed","label":"Costos fijos","defaultValue":2500000},{"key":"price","label":"Precio de venta","defaultValue":129900},{"key":"variable","label":"Costo variable por venta","defaultValue":78000}]},{"id":"product-evaluator","title":"Evaluador de productos","description":"Puntuación orientativa de cinco variables; no es una investigación de demanda.","inputs":[{"key":"marginPct","label":"Margen (%)","defaultValue":35},{"key":"returnPct","label":"Devoluciones (%)","defaultValue":15},{"key":"competitionPct","label":"Intensidad competitiva estimada (%)","defaultValue":50},{"key":"demandPct","label":"Demanda estimada (%)","defaultValue":70},{"key":"supplierReliabilityPct","label":"Confiabilidad proveedor (%)","defaultValue":80}]},{"id":"logistics","title":"Costos logísticos","description":"Estimación de costos de despacho, empaque y retornos.","inputs":[{"key":"shipments","label":"Envíos","defaultValue":100},{"key":"outbound","label":"Costo por envío","defaultValue":14000},{"key":"failedPct","label":"Fallidos (%)","defaultValue":20},{"key":"returnFee","label":"Costo retorno adicional","defaultValue":9000},{"key":"packaging","label":"Empaque","defaultValue":2000}]},{"id":"kpi-dashboard","title":"Dashboard ecommerce","description":"Resumen de ingresos, margen, ticket promedio, ROAS y contribución neta.","inputs":[{"key":"revenue","label":"Ingresos","defaultValue":10000000},{"key":"orders","label":"Pedidos","defaultValue":100},{"key":"adSpend","label":"Publicidad","defaultValue":2000000},{"key":"cogs","label":"Productos","defaultValue":4200000},{"key":"shipping","label":"Logística","defaultValue":900000},{"key":"fees","label":"Comisiones","defaultValue":250000}]}];
const nav=document.getElementById("nav"),fields=document.getElementById("fields"),
  title=document.getElementById("title"),description=document.getElementById("description"),
  results=document.getElementById("results"),error=document.getElementById("error");
const currency=document.getElementById("currency");
const idFromHash=()=>decodeURIComponent(location.hash.slice(1));
let selected=data.some(d=>d.id===idFromHash())?idFromHash():data[0].id;
const metricLabels={revenue:"Ingresos",totalCost:"Costo total",profit:"Beneficio",marginPct:"Margen (%)",
roiOnCostPct:"ROI sobre costo (%)",roas:"ROAS (veces)",netContribution:"Contribución neta",
marketingCostSharePct:"Publicidad / ingresos (%)",beforeAdsContribution:"Contribución antes de publicidad",
maxCpa:"CPA máximo",feasible:"¿Viable?",minRequiredRoas:"ROAS mínimo (veces)",
expectedDelivered:"Entregas esperadas",expectedFailed:"Fallidos esperados",expectedRevenue:"Ingresos estimados",
expectedCosts:"Costos estimados",expectedProfit:"Beneficio esperado",profitPerOrder:"Beneficio por pedido",
sellingPrice:"Precio de venta",requiredRevenue:"Ingresos por unidad",assumedMarginPct:"Margen objetivo (%)",
expectedImpressions:"Impresiones estimadas",expectedClicks:"Clics estimados",expectedOrders:"Pedidos estimados",
expectedRoas:"ROAS esperado",estimatedProfit:"Beneficio estimado",unitContribution:"Contribución por unidad",
breakEvenUnits:"Unidades de equilibrio",breakEvenRevenue:"Ingresos en equilibrio",
heuristicScore:"Puntuación orientativa / 100",grade:"Categoría",disclaimer:"Advertencia",
expectedTotal:"Gasto logístico esperado",avgPerShipment:"Costo medio por envío",
estimatedFailedShipments:"Envíos fallidos estimados",orders:"Pedidos",aov:"Ticket promedio",
totalCosts:"Costos totales",netContribution:"Contribución neta",marginPct:"Margen (%)"};
const nonMoney=/Pct$|^roas$|Roas$|^grade$|^disclaimer$|^feasible$|^heuristicScore$|^expected(Delivered|Failed|Impressions|Clicks|Orders)$|^breakEvenUnits$|^estimatedFailedShipments$|^orders$/;
const locale={COP:"es-CO",USD:"es-CO",EUR:"es-CO"};
function presentation(key,v){
 if(v===null)return "No definido";
 if(typeof v==="boolean")return v?"Sí":"No";
 if(typeof v==="string")return v;
 const n=Number(v);if(!Number.isFinite(n))return "No definido";
 if(nonMoney.test(key))return new Intl.NumberFormat("es-CO",{maximumFractionDigits:2}).format(n);
 return new Intl.NumberFormat(locale[currency.value],{style:"currency",currency:currency.value,maximumFractionDigits:currency.value==="COP"?0:2}).format(n);
}
function render(){
 const item=data.find(d=>d.id===selected);nav.textContent="";
 for(const d of data){const b=document.createElement("button");b.type="button";b.textContent=d.title;b.setAttribute("aria-current",String(d.id===selected));b.addEventListener("click",()=>{selected=d.id;location.hash=encodeURIComponent(selected);render();});nav.append(b);}
 title.textContent=item.title;description.textContent=item.description;fields.textContent="";
 for(const i of item.inputs){const label=document.createElement("label"),input=document.createElement("input");label.textContent=i.label;input.name=i.key;input.type="number";input.step="any";input.min="0";input.required=true;input.value=i.defaultValue;label.append(input);fields.append(label);}
 const submit=document.createElement("button");submit.textContent="Calcular";submit.id="submit";submit.type="submit";fields.append(submit);
 results.textContent="";error.textContent="";compute();
}
function compute(){
 results.textContent="";error.textContent="";
 try{
  const values={};for(const el of fields.querySelectorAll("input"))values[el.name]=el.value;
  const out=window.ScaleXEcommerce.calculate(selected,values);
  for(const [k,v] of Object.entries(out)){const box=document.createElement("div");box.className="metric";const titleEl=document.createElement("small"),num=document.createElement("strong");
   titleEl.textContent=metricLabels[k]||k;num.textContent=presentation(k,v);box.append(titleEl,num);results.append(box);}
 }catch(e){error.textContent=String(e.message||e);}
}
fields.addEventListener("submit",ev=>{ev.preventDefault();compute();});
currency.addEventListener("change",compute);
window.addEventListener("hashchange",()=>{const id=idFromHash();if(data.some(d=>d.id===id)&&id!==selected){selected=id;render();}});
render();
})();
