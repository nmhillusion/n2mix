(()=>{var t={873:t=>{t.exports=function(){return{querySelectorAll({selector:t,text:e,attributes:o}){const r=document.querySelectorAll(t),n=[];t:for(const t of r)if(!e||t.textContent.includes(e)){if("object"==typeof o)for(const e of Object.keys(o)){const r=o[e],n=t.getAttribute(e);if(console.log({attrValue:r,elAttrValue:n}),r!=n)continue t}n.push(t)}return n},querySelector({selector:t,text:e,attributes:o}){const r=this.querySelectorAll({selector:t,text:e,attributes:o});return 0<r.length?r[0]:null}}}},441:t=>{t.exports={nfn:(t,e=1e10)=>(...o)=>(e=Math.min(o.length,e),"function"==typeof t?t(...o.slice(0,e)):null),suffle(t){let e=[];if("object"==typeof t&&t.hasOwnProperty("length")){const r=t.length,n=[];function o(){return Math.round(Math.random()*(r-1))}do{let t;do{t=o()}while(n.includes(t));n.push(t)}while(r>n.length);e=n.map((e=>t[e]))}return e},randomColor(){let t="#";do{t+=Math.round(16*Math.random()).toString(16)}while(7>t.length);return t},log(t){"object"==typeof t&&Object.keys(t).forEach((e=>console.log(` ${e} : ${t[e]} `)))}}}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var l=e[r]={exports:{}};return t[r](l,l.exports,o),l.exports}"undefined"==typeof _m&&(_m={$:function(t){return document.querySelectorAll(t),{}},dom:o(873),fn:o(441)})})();