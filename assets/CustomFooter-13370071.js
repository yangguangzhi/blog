import{_ as P,u as X,f as $,g as j,h as W,i as h,r as m,o as n,c,j as e,k as E,v as H,l as r,b as t,e as v,w as d,m as f,t as T}from"./app-a6bbcd8f.js";const q="/blog/images/cyberSecurityRecord.png",G={class:"footer-wrapper"},I={class:"xicon-icon",style:{width:"18px",height:"18px","font-size":"18px",color:"inherit"},xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},J=t("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[t("circle",{cx:"12",cy:"12",r:"9"}),t("path",{d:"M14 9.75a3.016 3.016 0 0 0-4.163.173a2.993 2.993 0 0 0 0 4.154A3.016 3.016 0 0 0 14 14.25"})],-1),K=[J],O={key:0},Q={class:"xicon-icon",style:{width:"18px",height:"18px","font-size":"18px",color:"inherit"},xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 12 12"},U=t("g",{fill:"none"},[t("path",{d:"M1.974 6.659a.5.5 0 0 1-.948-.317c-.01.03 0-.001 0-.001a1.633 1.633 0 0 1 .062-.162c.04-.095.099-.226.18-.381c.165-.31.422-.723.801-1.136C2.834 3.827 4.087 3 6 3c1.913 0 3.166.827 3.931 1.662a5.479 5.479 0 0 1 .98 1.517l.046.113c.003.008.013.06.023.11L11 6.5s.084.333-.342.474a.5.5 0 0 1-.632-.314v-.003l-.006-.016a3.678 3.678 0 0 0-.172-.376a4.477 4.477 0 0 0-.654-.927C8.584 4.673 7.587 4 6 4s-2.584.673-3.194 1.338a4.477 4.477 0 0 0-.795 1.225a2.209 2.209 0 0 0-.03.078l-.007.018zM6 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4zM5 7a1 1 0 1 1 2 0a1 1 0 0 1-2 0z",fill:"currentColor"})],-1),Z=[U],ee={key:1,class:"cyber-security"},te=t("img",{src:q,alt:""},null,-1),oe=["href"],se={__name:"CustomFooter",setup(ne){const D=X(),p=$(),o=j(),{solution:i,options:w}=W(),M=h(()=>i.value==="valine"?w.value.visitor!=!1:i.value==="waline"?w.value.pageview!=!1:!1),N=h(()=>{var u,_;let s="";p.value.author&&(s+=`${p.value.author} `);const l=(_=(u=o.value)==null?void 0:u.footer)==null?void 0:_.startYear,a=new Date().getFullYear();return l&&l!=a&&(s+=`${l} - `),s+=a,s}),x=h(()=>p.value.home||D.value),Y=h(()=>{var s;return(s=o.value.modules||[])==null?void 0:s.includes("Comment")});return(s,l)=>{var g,k,y,C,b,V,L,S,B,z,F,R;const a=m("Xicons"),u=m("ValineViews"),_=m("WalineViews"),A=m("Comments");return n(),c("div",G,[e("    <span>"),e("      <Xicons"),e('          icon="ColorPalette"'),e('          link="https://vuepress-theme-reco.recoluan.com"'),e('          target="_blank"'),e('          :text="`vuepress-theme-reco@${version}`"'),e("      />"),e("    </span>"),E(t("span",null,[v(a,{icon:"Security",link:(k=(g=r(o))==null?void 0:g.footer)==null?void 0:k.recordLink,text:(C=(y=r(o))==null?void 0:y.footer)==null?void 0:C.record,target:"_blank"},null,8,["link","text"])],512),[[H,(V=(b=r(o))==null?void 0:b.footer)==null?void 0:V.record]]),t("span",null,[v(a,{text:N.value},{icon:d(()=>[(n(),c("svg",I,K))]),_:1},8,["text"])]),M.value?(n(),c("span",O,[v(a,null,{icon:d(()=>[(n(),c("svg",Q,Z))]),default:d(()=>[r(i)==="valine"?(n(),f(u,{key:0,idVal:x.value},null,8,["idVal"])):e("v-if",!0),r(i)==="waline"?(n(),f(_,{key:1,path:x.value},null,8,["path"])):e("v-if",!0)]),_:1})])):e("v-if",!0),(S=(L=r(o))==null?void 0:L.footer)!=null&&S.cyberSecurityRecord?(n(),c("span",ee,[te,t("a",{href:((z=(B=r(o))==null?void 0:B.footer)==null?void 0:z.cyberSecurityLink)||"#",target:"_blank"},T((R=(F=r(o))==null?void 0:F.footer)==null?void 0:R.cyberSecurityRecord),9,oe)])):e("v-if",!0),Y.value?e("v-if",!0):(n(),f(A,{key:2,"hide-comments":!0}))])}}},ae=P(se,[["__file","CustomFooter.vue"]]);export{ae as default};