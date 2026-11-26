/* ScaleX AI · WhatsApp Sales Framework.
   Local-only deterministic helpers. No network calls, no WhatsApp API and no auto-send. */
(function (root) {
 "use strict";
 const clean=(x,max=400)=>String(x==null?"":x).trim().slice(0,max);
 const bounded=(n,min,max,name)=>{if(n===""||n===null||n===undefined)throw Error(name+" is required");const v=Number(n);if(!Number.isFinite(v)||v<min||v>max)throw Error(name+" out of range");return v;};
 const phone=(raw)=>{const digits=clean(raw,32).replace(/\D/g,"");if(digits.length<8||digits.length>15)throw Error("Use international phone, 8 to 15 digits");return digits;};
 const waLink=(raw,text)=>"https://wa.me/"+phone(raw)+"?text="+encodeURIComponent(clean(text,4096));
 const escapeText=(v)=>clean(v,600);
 function leadScore(d){
   const intent=bounded(d.intent,0,5,"intent"),budget=bounded(d.budgetFit,0,5,"budgetFit"),urgency=bounded(d.urgency,0,5,"urgency");
   const score=Number(((intent*0.45+budget*0.35+urgency*0.2)*20).toFixed(1));
   return {score,segment:score>=75?"alta prioridad":score>=45?"prioridad media":"prioridad baja",explanation:"Puntuación orientativa, no predice una venta."};
 }
 const objectionTypes={
   price:{label:"Precio",suggestion:"Explica el valor concreto, el alcance y los costos con transparencia. Evita inventar descuentos."},
   trust:{label:"Confianza",suggestion:"Comparte información verificable del negocio y políticas aplicables. No fabriques testimonios."},
   timing:{label:"Momento",suggestion:"Pregunta cuándo sería conveniente retomar, sin insistir ni crear urgencia falsa."},
   shipping:{label:"Envío",suggestion:"Indica tiempos, costos y cobertura confirmados por tu operación."},
   information:{label:"Información",suggestion:"Aclara características reales y ofrece fuentes verificables antes de pedir la compra."}
 };
 function objection(d){const type=clean(d.type,30);if(!Object.hasOwn(objectionTypes,type))throw Error("Unknown objection type");return {type,label:objectionTypes[type].label,recommendation:objectionTypes[type].suggestion,draft:"Gracias por comentarlo. "+objectionTypes[type].suggestion+" ¿Qué dato necesitas para decidir con tranquilidad?"};}
 function consent(d){const optIn=d.optIn===true,optOut=d.optOut===true;const approved=d.approvedTemplate===true,withinWindow=d.withinServiceWindow===true;return {marketingAllowed:optIn&&!optOut&&approved,serviceReplyCandidate:!optOut&&withinWindow,notice:"Una evaluación local no verifica la normativa, las políticas de Meta ni la ventana real de servicio. Confirma autorización, plantilla, categoría y restricciones en el proveedor."};}
 function followUp(d){const c=consent(d);const days=bounded(d.days,1,90,"days");return {eligible:c.marketingAllowed,days,proposedText:c.marketingAllowed?"Hola, queríamos saber si todavía te interesa recibir información sobre "+clean(d.topic,100)+". Si prefieres no recibir más mensajes, dínoslo y lo respetaremos.":"No generar seguimiento comercial: faltan consentimiento, plantilla aprobada o hay baja registrada.",automaticSend:false};}
 function recovery(d){const c=consent(d);return {eligible:c.marketingAllowed,draft:c.marketingAllowed?"Hola. Hace un tiempo consultaste sobre "+clean(d.product,100)+". ¿Quieres que te compartamos la información actualizada? Si no deseas más mensajes, lo respetaremos.":"No enviar: se necesita permiso válido y plantilla apropiada.",automaticSend:false};}
 function template(d){const title=clean(d.title,120),benefit=clean(d.benefit,220),cta=clean(d.cta,100);return {draft:[title,benefit,cta].filter(Boolean).join("\n\n"),approvalNeeded:true,warning:"Texto borrador: enviar fuera de ventana de atención puede exigir plantilla aprobada. Evita contenido engañoso."};}
 function knowledge(d){const question=clean(d.question,180),answer=clean(d.answer,800);if(!question||!answer)throw Error("Question and answer are required");return {entry:{question,answer,source:clean(d.source,220)||"not provided"},status:"draft",verificationRequired:true};}
 function reply(d){const tone=clean(d.tone,20);const name=clean(d.name,80)||"hola";const product=clean(d.product,100)||"el producto";const facts=clean(d.facts,500);const prefix=tone==="formal"?"Buen día":"Hola";return {draft:prefix+", "+name+". Gracias por tu interés en "+product+"."+(facts?" Información confirmada: "+facts:" Para darte detalles correctos, necesitamos revisar las características y condiciones actuales.")+" ¿Qué te gustaría saber primero?",sent:false};}
 function flow(d){const product=clean(d.product,120)||"nuestra oferta";return {nodes:[{id:"welcome",type:"message",text:"¡Hola! Gracias por escribir sobre "+product+"."},{id:"permission",type:"decision",question:"¿Deseas recibir información por este canal?",yes:"details",no:"stop"},{id:"details",type:"message",text:"Compartir información verificada y preguntar qué necesita el cliente"},{id:"stop",type:"end",text:"Respetar la decisión y no enviar promociones"}],automaticSend:false};}
 function simulate(d){const message=clean(d.message,500).toLowerCase();const matched=message.includes("precio")?"price":message.includes("env")?"shipping":message.includes("garant")?"trust":"information";const result=objection({type:matched});return {detectedCategory:result.label,responseDraft:result.draft,certainty:"rule-based keyword heuristic; review manually",sent:false};}
 const tools={
   "conversation-builder":flow,"lead-scoring":leadScore,"sales-agent":reply,
   "objection-handler":objection,"lead-recovery":recovery,"follow-up-builder":followUp,
   "whatsapp-link":d=>({url:waLink(d.phone,d.message),sent:false}),
   "message-template":template,"knowledge-base":knowledge,"sales-simulator":simulate
 };
 root.ScaleXWhatsApp={calculate:(id,d)=>{if(!Object.hasOwn(tools,id))throw Error("Unknown tool");return tools[id](d);},tools:Object.keys(tools),consent,waLink};
})(typeof globalThis!=="undefined"?globalThis:window);
