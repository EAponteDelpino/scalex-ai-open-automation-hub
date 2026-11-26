/* ScaleX AI GHL toolkit. Safe helpers; no external network calls. */
(function(g){
  'use strict';
  function root(el){return typeof el==='string'?document.querySelector(el):el;}
  function safeURL(raw,allowedProtocols=['https:']){
    try{const u=new URL(String(raw));return allowedProtocols.includes(u.protocol)?u:null;}catch{return null;}
  }
  function currency(value,code='COP',locale='es-CO'){
    const n=Number(value);if(!Number.isFinite(n)||n<0)throw Error('Invalid monetary amount');
    return new Intl.NumberFormat(locale,{style:'currency',currency:code,maximumFractionDigits:code==='COP'?0:2}).format(n);
  }
  function storageKey(name){return 'scalex-ghl-'+String(name).replace(/[^a-z0-9_-]/gi,'');}
  function queryParams(keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){
    const src=new URLSearchParams(location.search),d={};
    keys.forEach(k=>{const v=src.get(k);if(v)d[k]=v.slice(0,250);});return d;
  }
  function whatsappLink(phone,message){
    const digits=String(phone).replace(/\D/g,'');
    if(digits.length<8||digits.length>15)throw Error('Invalid E.164-like phone number');
    return 'https://wa.me/'+digits+'?text='+encodeURIComponent(String(message));
  }
  g.ScaleXGHL={root,safeURL,currency,storageKey,queryParams,whatsappLink,version:'0.1.0'};
})(window);
