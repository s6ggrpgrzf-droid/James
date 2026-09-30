
const {useState,useEffect,useCallback,useRef}=React;
const pick=(lg,en,es)=>lg==="en"?en:(es||en);

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{height:100%;background:#07080A;}
body{overscroll-behavior:none;-webkit-tap-highlight-color:transparent;}
input,textarea{font-family:inherit;}
input::placeholder{color:#6B7A8D;}
input:focus{border-color:#F5A623!important;outline:none;box-shadow:0 0 0 1px rgba(245,166,35,0.6),0 0 0 4px rgba(245,166,35,0.18),0 8px 24px rgba(245,166,35,0.18);}
textarea:focus{border-color:#F5A623!important;outline:none;box-shadow:0 0 0 1px rgba(245,166,35,0.6),0 0 0 4px rgba(245,166,35,0.18),0 8px 24px rgba(245,166,35,0.18);}
::-webkit-scrollbar{display:none;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatY{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.01)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 0 1px rgba(245,166,35,0.15),0 0 18px rgba(245,166,35,0.30),0 0 40px rgba(245,166,35,0.15)}50%{box-shadow:0 0 0 1px rgba(245,166,35,0.30),0 0 32px rgba(245,166,35,0.55),0 0 72px rgba(245,166,35,0.32)}}
@keyframes borderPulse{0%,100%{border-color:rgba(245,166,35,0.35);box-shadow:inset 0 0 0 1px rgba(245,166,35,0)}50%{border-color:rgba(245,166,35,0.85);box-shadow:inset 0 0 16px rgba(245,166,35,0.18)}}
@keyframes iUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes iPop{from{opacity:0;transform:scale(0.65)}to{opacity:1;transform:scale(1)}}
@keyframes vUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes vPop{from{opacity:0;transform:scale(0.65)}to{opacity:1;transform:scale(1)}}
@keyframes vFade{from{opacity:0}to{opacity:1}}
@keyframes trainPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,166,35,0),0 0 0 0 rgba(245,166,35,0),0 0 0 0 rgba(245,166,35,0)}50%{box-shadow:0 0 0 8px rgba(245,166,35,0.22),0 0 28px rgba(245,166,35,0.45),0 0 64px rgba(245,166,35,0.22)}}
@keyframes trainShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes trainFloat{0%,100%{transform:translateY(0) scale(1);filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25))}50%{transform:translateY(-6px) scale(1.04);filter:drop-shadow(0 14px 22px rgba(0,0,0,0.35))}}
@keyframes toastIn{from{opacity:0;transform:translate(-50%,-50%) scale(0.85)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes toastOut{from{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(0.85)}}
@keyframes tabSlide{from{opacity:0;transform:translateY(18px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes cardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmerSlide{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes navPop{0%{transform:scale(1)}40%{transform:scale(1.22)}70%{transform:scale(0.96)}100%{transform:scale(1)}}
@keyframes lockShake{0%,100%{transform:translateX(0);box-shadow:0 0 0 0 rgba(244,63,94,0)}20%{transform:translateX(-4px);box-shadow:0 0 14px rgba(244,63,94,0.30)}40%{transform:translateX(4px);box-shadow:0 0 20px rgba(244,63,94,0.40)}50%{box-shadow:0 0 24px rgba(244,63,94,0.45)}60%{transform:translateX(-3px);box-shadow:0 0 18px rgba(244,63,94,0.35)}80%{transform:translateX(3px);box-shadow:0 0 10px rgba(244,63,94,0.20)}}
@keyframes defenderPulse{0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,0),0 0 0 0 rgba(139,92,246,0),0 0 0 0 rgba(139,92,246,0)}50%{box-shadow:0 0 0 10px rgba(139,92,246,0.20),0 0 32px rgba(139,92,246,0.40),0 0 64px rgba(139,92,246,0.22)}}
@keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
.page{animation:tabSlide 0.28s cubic-bezier(0.22,1,0.36,1) forwards;}
.float{animation:floatY 3.5s ease-in-out infinite;}
.glow{animation:glowPulse 3s ease-in-out infinite;}
.border-pulse{animation:borderPulse 3s ease-in-out infinite;}
.iup{animation:iUp 0.5s cubic-bezier(0.22,1,0.36,1) both;}
.ipop{animation:iPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;}
.id1{animation-delay:0.15s;opacity:0;}.id2{animation-delay:0.35s;opacity:0;}.id3{animation-delay:0.55s;opacity:0;}
.card-in{animation:cardIn 0.35s cubic-bezier(0.22,1,0.36,1) both;}
.c0{animation-delay:0.04s;opacity:0}.c1{animation-delay:0.10s;opacity:0}.c2{animation-delay:0.16s;opacity:0}.c3{animation-delay:0.22s;opacity:0}.c4{animation-delay:0.28s;opacity:0}.c5{animation-delay:0.34s;opacity:0}.c6{animation-delay:0.40s;opacity:0}.c7{animation-delay:0.46s;opacity:0}.c8{animation-delay:0.52s;opacity:0}.c9{animation-delay:0.58s;opacity:0}
button{transition:all 0.22s cubic-bezier(0.22,1,0.36,1);}
button:active{opacity:0.82;transform:scale(0.96);}
.tip{transition:border-color 0.25s cubic-bezier(0.22,1,0.36,1),transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s cubic-bezier(0.22,1,0.36,1);}
.tip:active{transform:scale(0.99);}
.train-pulse{animation:trainPulse 2.2s ease-in-out infinite;}
.train-float{animation:trainFloat 3s ease-in-out infinite;}
.nav-pop{animation:navPop 0.4s cubic-bezier(0.34,1.56,0.64,1);}
.lock-shake{animation:lockShake 0.5s ease;}
.defender-pulse{animation:defenderPulse 2.4s ease-in-out infinite;}
.shimmer-locked{background:linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.03) 38%,rgba(255,255,255,0.10) 50%,rgba(255,255,255,0.03) 62%,transparent 80%);background-size:200% 100%;animation:shimmerSlide 2.6s ease-in-out infinite;}
.brand-wordmark{font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:-0.3px;background:linear-gradient(110deg,#EDF0F7 40%,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.brand-display{font-family:'Bebas Neue','Outfit',sans-serif;letter-spacing:0.5px;line-height:1;}
.brand-headline-grad{background:linear-gradient(110deg,#fff 35%,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-family:'Bebas Neue','Outfit',sans-serif;letter-spacing:-0.5px;line-height:1.05;}
.brand-btn-primary{background:linear-gradient(135deg,#F5A623,#C8820A);border:none;border-radius:9999px;padding:14px 28px;font-family:'Outfit',sans-serif;font-size:15px;font-weight:900;color:#000;cursor:pointer;letter-spacing:-0.2px;box-shadow:0 0 0 1px rgba(245,166,35,0.25),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.20);transition:transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s cubic-bezier(0.22,1,0.36,1);}
.brand-btn-primary:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 0 0 1px rgba(245,166,35,0.35),0 6px 18px rgba(245,166,35,0.42),0 18px 50px rgba(245,166,35,0.48),0 34px 96px rgba(245,166,35,0.28);}
.brand-card{background:#12151A;border:1px solid rgba(255,255,255,0.11);border-radius:18px;padding:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.20);}
`;

(function(){const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);})();

async function load(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
async function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){console.warn("Save failed:",k,e);return false;}}

const C = {
bg:"#07080A", s1:"#0D0F13", s2:"#12151A", s3:"#1A1E26",
border:"rgba(255,255,255,0.11)",
amber:"#F5A623", amberD:"#C8820A", amberL:"#ffc84a",
green:"#10B981", teal:"#06B6D4", blue:"#3B82F6",
red:"#F43F5E", purple:"#8B5CF6",
text:"#EDF0F7", text2:"#8B95A8", text3:"#6B7A8D",
sans:"'Outfit',system-ui,sans-serif",
display:"'Bebas Neue','Outfit',sans-serif",
mono:"'JetBrains Mono','Courier New',monospace",
r:{xs:6, sm:10, md:14, lg:18, xl:24, full:9999},
sp:{1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 7:32, 8:40, 9:64, 10:80},
sh:{
1:"inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.20)",
2:"inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.18)",
3:"0 8px 24px rgba(0,0,0,0.30), 0 18px 48px rgba(0,0,0,0.18), 0 24px 60px rgba(0,0,0,0.45)",
hero:"0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04), 0 60px 120px -20px rgba(245,166,35,0.18)",
amber:"0 0 0 1px rgba(245,166,35,0.25),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.20)",
amberHi:"0 0 0 1px rgba(245,166,35,0.35),0 6px 18px rgba(245,166,35,0.42),0 18px 50px rgba(245,166,35,0.48),0 34px 96px rgba(245,166,35,0.28)",
accent:(c)=>`0 0 0 1px ${c}33,0 4px 14px ${c}55,0 14px 36px ${c}55,0 28px 64px ${c}30`,
},
ease:{out:"cubic-bezier(0.22,1,0.36,1)", spring:"cubic-bezier(0.34,1.56,0.64,1)"},
};

const S = {
wordmark:{
background:`linear-gradient(110deg,${C.text} 40%,${C.amber})`,
WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
fontWeight:700, letterSpacing:"-0.3px",
},
headlineGrad:(accent=C.amber)=>({
background:`linear-gradient(110deg,#fff 35%,${accent})`,
WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
fontFamily:C.display, letterSpacing:"-0.5px", lineHeight:1.05,
}),
pageTitle:{
fontFamily:C.display, fontSize:"clamp(22px,5vw,28px)",
fontWeight:400, letterSpacing:"0.5px", lineHeight:1, color:C.text,
},
btnPrimary:{
background:`linear-gradient(135deg,${C.amber},${C.amberD})`,
border:"none", borderRadius:C.r.full, padding:"14px 28px",
fontFamily:C.sans, fontSize:15, fontWeight:900, color:"#000",
cursor:"pointer", boxShadow:C.sh.amber,
transition:`transform 0.25s ${C.ease.out}, box-shadow 0.25s ${C.ease.out}`,
letterSpacing:"-0.2px", WebkitTapHighlightColor:"transparent",
},
btnGhost:{
background:"rgba(255,255,255,0.05)",
border:"1px solid rgba(255,255,255,0.08)",
borderRadius:C.r.sm, padding:"7px 12px",
fontFamily:C.sans, fontSize:12, fontWeight:800, color:C.text2,
cursor:"pointer", letterSpacing:"0.5px",
transition:`background 0.18s ${C.ease.out}, color 0.18s ${C.ease.out}`,
},
card:{
background:C.s2,
border:`1px solid ${C.border}`,
borderRadius:C.r.lg, padding:C.sp[4],
boxShadow:C.sh[1],
},
modalSheet:{
position:"relative",
background:`linear-gradient(180deg,${C.s2},${C.s1})`,
borderTop:"1px solid rgba(255,255,255,0.08)",
borderRadius:`${C.r.xl}px ${C.r.xl}px 0 0`,
padding:C.sp[6], paddingBottom:C.sp[8],
width:"100%", maxWidth:430, zIndex:1,
boxShadow:C.sh[3],
},
modalScrim:{
position:"absolute", inset:0, background:"rgba(0,0,0,0.78)",
},
modalGrip:{
width:40, height:4, borderRadius:C.r.full,
background:"rgba(255,255,255,0.15)",
margin:`0 auto ${C.sp[5]}px`,
},
logoBox:(size=38)=>({
width:size, height:size,
borderRadius: size>=60 ? C.r.xl : (size>=30 ? C.r.lg : C.r.sm),
background:`linear-gradient(135deg,${C.amber},${C.amberD})`,
display:"flex", alignItems:"center", justifyContent:"center",
boxShadow: size>=60 ? C.sh.amber : C.sh[1],
}),
};

















function Toast({msg, onDone}) {
const [out, setOut] = useState(false);
useEffect(()=>{
const t1=setTimeout(()=>setOut(true),1600);
const t2=setTimeout(()=>onDone(),2000);
return()=>{clearTimeout(t1);clearTimeout(t2);};
},[]);
return(
<div role="status" aria-live="polite" aria-atomic="true" style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:999,pointerEvents:"none",
background:"rgba(16,185,129,0.95)",borderRadius:16,padding:"14px 24px",
fontSize:14,fontWeight:800,color:"#000",fontFamily:C.sans,
animation:out?"toastOut 0.4s ease forwards":"toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
boxShadow:"0 0 0 1px rgba(16,185,129,0.30),0 6px 18px rgba(16,185,129,0.32),0 14px 40px rgba(16,185,129,0.32),0 28px 72px rgba(16,185,129,0.20)",whiteSpace:"nowrap"}}>
✓ {msg}
</div>
);
}

function QuickSituationsCarousel({lang, onCardClick}) {
const t=(en,es)=>lang==="en"?en:es;
const [scrollPos, setScrollPos] = useState(0);
const scrollRef = useRef(null);

const situations = pick(lang,QUICK_SITUATIONS,QUICK_SITUATIONS_ES);
const cardWidth = 280;
const gap = 12;
const cardsPerView = 2.3;
const dotIdx = Math.round(scrollPos / (cardWidth + gap));

function handleScroll(e) {
setScrollPos(e.target.scrollLeft);
}

return (
<div style={{marginBottom: 16}}>

<div style={{fontSize: 13, fontWeight: 800, color: C.amber, letterSpacing: "1px", textTransform: "uppercase", paddingLeft: 2, marginBottom: 12}}>{t("🚀 Quick Help","🚀 Ayuda Rápida")}</div>

<div
ref={scrollRef}
onScroll={handleScroll}
style={{
display: "flex",
gap: `${gap}px`,
overflowX: "auto",
paddingBottom: 8,
scrollBehavior: "smooth",
scrollSnapType: "x mandatory",
WebkitOverflowScrolling: "touch",
msOverflowStyle: "none",
scrollbarWidth: "none",
}}
>
{situations.map((sit, i) => (
<div
key={i}
onClick={() => onCardClick(i)}
style={{
flex: `0 0 ${cardWidth}px`,
minWidth: `${cardWidth}px`,
scrollSnapAlign: "start",
scrollSnapStop: "always",
background: `linear-gradient(135deg,${C.s2},${C.s1})`,
border: `1px solid ${C.border}`,
borderRadius: 18,
padding: "20px 16px",
display: "flex",
flexDirection: "column",
alignItems: "center",
textAlign: "center",
boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 16px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.18)",
transition: "all 0.2s ease",
cursor: "pointer",
}}
onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(0,0,0,0.35), 0 22px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(245,166,35,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 16px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.18)"; e.currentTarget.style.transform = "translateY(0)"; }}
>

<div style={{fontSize: 64, marginBottom: 12, display: "block"}}>{sit.e}</div>

<h3 style={{fontSize: 16, fontWeight: 800, marginBottom: 6, color: C.text, lineHeight: 1.3}}>
{lang === "en" ? sit.l : sit.le}
</h3>

<p style={{fontSize: 12, color: C.text2, margin: 0, lineHeight: 1.4}}>{t("Tap to explore","Toca para explorar")}</p>
</div>
))}
</div>

<div style={{display: "flex", gap: 5, justifyContent: "center", marginTop: 10}}>
{situations.map((_, i) => (
<div
key={i}
style={{
width: dotIdx === i ? 24 : 6,
height: 6,
borderRadius: 99,
background: dotIdx === i ? C.amber : "rgba(255,255,255,0.2)",
transition: "all 0.3s ease",
}}
/>
))}
</div>

<style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
</div>
);
}

function IntroAnimation({onDone,lang}) {
const t=(en,es)=>lang==="en"?en:es;
const [scene, setScene] = useState(0);
const [progress, setProgress] = useState(0);
const TOTAL = 32000;
const SCENES = [{id:0,start:0},{id:1,start:4500},{id:2,start:9500},{id:3,start:14500},{id:4,start:19000},{id:5,start:23500},{id:6,start:28000}];

useEffect(()=>{
const t0=Date.now();
const tick=()=>{
const elapsed=Date.now()-t0;
setProgress(Math.min(elapsed/TOTAL*100,100));
for(let i=SCENES.length-1;i>=0;i--){if(elapsed>=SCENES[i].start){setScene(SCENES[i].id);break;}}
if(elapsed<TOTAL){requestAnimationFrame(tick);}else{setTimeout(onDone,400);}
};
requestAnimationFrame(tick);
},[]);

const A=C.amber,G=C.green,B=C.blue,T=C.teal,P=C.purple;
const ss=(n)=>({position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px 28px",opacity:scene===n?1:0,transition:"opacity 0.5s ease",pointerEvents:scene===n?"auto":"none"});
const Divider=({color=A})=><div style={{width:36,height:2,borderRadius:99,background:`linear-gradient(90deg,${color},#fff)`,margin:"0 auto 16px",opacity:0,animation:"iUp 0.4s 0.35s cubic-bezier(0.22,1,0.36,1) both"}}/>;

return(
<div style={{position:"fixed",inset:0,background:C.bg,zIndex:999,fontFamily:C.sans,color:C.text,overflow:"hidden",maxWidth:430,margin:"0 auto"}}>
<div style={{position:"absolute",top:0,left:0,height:3,width:`${progress}%`,background:`linear-gradient(90deg,${A},#ffd280)`,boxShadow:`0 0 8px rgba(245,166,35,0.85),0 0 18px rgba(245,166,35,0.45)`,transition:"width 0.08s linear",zIndex:10}}/>
<button onClick={onDone} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.22)",borderRadius:20,padding:"7px 16px",color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:700,cursor:"pointer",zIndex:10,fontFamily:C.sans}}>{t("Skip →","Omitir →")}</button>

<div style={ss(0)}>
<div style={{position:"absolute",top:-60,right:-40,width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,166,35,0.15),transparent 68%)",pointerEvents:"none"}}/>
<div className="ipop" style={{width:76,height:76,borderRadius:24,background:`linear-gradient(135deg,${A},#C8820A)`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:22,boxShadow:`0 0 0 1px rgba(245,166,35,0.20),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.22)`}}><svg width="38" height="38" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{filter:"drop-shadow(0 0 12px rgba(255,255,255,0.35))"}}><path d="M1 10 L3 6 L8 4 L10 2 L12 4 L17 6 L19 10 L17.5 18 L2.5 18 Z" fill="white"/><path d="M10 2 L10 18" stroke="white" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/><path d="M8 4 L12 4" stroke="white" strokeWidth="1" opacity="0.6" strokeLinecap="round"/></svg></div>
<div className="iup id1" style={{...S.headlineGrad(A),fontSize:48,marginBottom:6,textAlign:"center"}}>DropPilot</div>
<div className="iup id1" style={{fontSize:11,color:"rgba(255,255,255,0.3)",letterSpacing:"4px",fontWeight:700,textTransform:"uppercase",marginBottom:24}}>{t("Customer Service · Gig Edition","Servicio al Cliente · Edición Gig")}</div>
<Divider/>
<div className="iup id2" style={{fontSize:15,color:"rgba(255,255,255,0.55)",textAlign:"center",lineHeight:1.9,fontWeight:500}}>{t("The first customer service app","La primera app de servicio al cliente")}<br/>{t("built specifically for gig drivers.","hecha específicamente para conductores de apps.")}<br/>{t("The delivery is the task.","La entrega es la tarea.")}<br/>{t("The service is the job.","El servicio es el trabajo.")}</div>
</div>

<div style={ss(1)}>
<div className="iup" style={{fontSize:12,fontWeight:800,color:"rgba(245,166,35,0.7)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:18}}>{t("what your job actually is","cuál es tu trabajo en realidad")}</div>
<div className="iup id1" style={{...S.headlineGrad(A),fontSize:34,lineHeight:1.15,textAlign:"center",marginBottom:20}}>{t("You don't get rated","No te califican")}<br/>{t("on speed.","por velocidad.")}<br/>{t("You get rated on","Te califican por")}<br/>{t("how you made them feel.","cómo los hiciste sentir.")}</div>
<Divider/>
<div className="iup id2" style={{display:"flex",flexDirection:"column",gap:10,width:"100%"}}>
{[
[t("Your rating is a customer service score — every delivery adds to it.","Tu calificación es un puntaje de servicio al cliente — cada entrega suma."),"rgba(245,166,35,0.08)","rgba(245,166,35,0.25)"],
[t("Tips are emotional, not logical. Customers tip how they felt, not how fast you were.","Las propinas son emocionales, no lógicas. Los clientes dan propina según cómo se sintieron, no según tu velocidad."),"rgba(59,130,246,0.08)","rgba(59,130,246,0.25)"],
[t("Drivers who master service earn significantly more. Same roads. Same apps.","Los conductores que dominan el servicio ganan mucho más. Mismas calles. Mismas apps."),"rgba(16,185,129,0.08)","rgba(16,185,129,0.25)"]
].map(([t,bg,border],i)=>(
<div key={i} className="iup" style={{padding:"12px 15px",background:bg,border:`1px solid ${border}`,borderRadius:13,animationDelay:`${0.3+i*0.14}s`,opacity:0}}>
<div style={{fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.55,fontWeight:600}}>{t}</div>
</div>
))}
</div>
</div>

<div style={ss(2)}>
<div className="iup" style={{fontSize:12,fontWeight:800,color:"rgba(139,92,246,0.7)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:18}}>{t("the service gap","la brecha del servicio")}</div>
<div className="iup id1" style={{...S.headlineGrad(P),fontSize:34,lineHeight:1.15,textAlign:"center",marginBottom:20}}>{t("Most gig drivers","La mayoría de los conductores")}<br/>{t("were never taught","nunca aprendieron")}<br/>{t("customer service.","servicio al cliente.")}<br/>{t("That's the gap.","Esa es la brecha.")}</div>
<Divider color={P}/>
<div className="iup id2" style={{display:"flex",flexDirection:"column",gap:9,width:"100%"}}>
{[
["📞",t("Built by someone who managed call center teams processing support tickets daily — who knows exactly how your appeals get read and what actually gets your account reinstated.","Creado por alguien que dirigió equipos de call center procesando tickets de soporte a diario — que sabe exactamente cómo se leen tus apelaciones y qué logra que te reactiven la cuenta.")],
["🏨",t("Hotel front desk management means face-to-face de-escalation with guests who feel entitled. The customer scripts come directly from that experience — not from a textbook.","La experiencia en recepción de hotel significa calmar cara a cara a huéspedes exigentes. Los mensajes para clientes vienen directo de esa experiencia — no de un libro.")],
["🚗",t("DropPilot brings real professional service experience to gig drivers. The person who built this has managed both sides of the counter.","DropPilot trae experiencia real de servicio profesional a los conductores. Quien creó esto ha estado en ambos lados del mostrador.")]
].map(([e,t],i)=>(
<div key={i} className="iup" style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",background:"rgba(139,92,246,0.06)",border:"1px solid rgba(139,92,246,0.18)",borderRadius:13,animationDelay:`${0.28+i*0.14}s`,opacity:0}}>
<span style={{fontSize:18,flexShrink:0,marginTop:1}}>{e}</span>
<div style={{fontSize:12.5,color:"rgba(255,255,255,0.72)",lineHeight:1.6,fontWeight:500}}>{t}</div>
</div>
))}
</div>
</div>

<div style={ss(3)}>
<div className="iup" style={{fontSize:12,fontWeight:800,color:"rgba(245,166,35,0.7)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:18}}>{t("five sections. one toolkit.","cinco secciones. un kit.")}</div>
<div className="iup id1" style={{...S.headlineGrad(A),fontSize:34,lineHeight:1.15,textAlign:"center",marginBottom:20}}>{t("Scripts. Habits. Defense.","Mensajes. Hábitos. Defensa.")}<br/>{t("Training. All built for","Capacitación. Todo hecho para")}<br/>{t("the real job.","el trabajo real.")}</div>
<Divider/>
<div className="iup id2" style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
{[
["⭐",A,t("Earn","Ganar"),t("Service habits and psychology that raise your rating and tips","Hábitos de servicio y psicología que suben tu calificación y propinas")],
["💬",B,t("Scripts","Mensajes"),t("Word-for-word messages for every customer situation","Mensajes palabra por palabra para cada situación con clientes")],
["📖",T,t("Basics","Básicos"),t("Platform rules, policies, and how gig work actually works","Reglas, políticas y cómo funciona en realidad este trabajo")],
["🛡️",P,t("Defend","Defensa"),t("Protect your account when complaints and disputes happen","Protege tu cuenta cuando haya quejas y disputas")],
["🎓",A,t("Training","Capacitación"),t("Customer service lessons backed by real research","Lecciones de servicio al cliente respaldadas por investigación real")]
].map(([e,col,label,desc],i)=>(
<div key={i} className="iup" style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,animationDelay:`${0.25+i*0.1}s`,opacity:0}}>
<div style={{width:32,height:32,borderRadius:9,background:`${col}15`,border:`1px solid ${col}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{e}</div>
<div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:col,marginBottom:1}}>{label}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.45)",lineHeight:1.3}}>{desc}</div></div>
</div>
))}
</div>
</div>

<div style={ss(4)}>
<div className="iup" style={{fontSize:12,fontWeight:800,color:"rgba(6,182,212,0.7)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:18}}>{t("built for every platform","hecho para cada plataforma")}</div>
<div className="iup id1" style={{...S.headlineGrad(T),fontSize:36,lineHeight:1.15,textAlign:"center",marginBottom:20}}>DoorDash. Uber Eats.<br/>Instacart. Lyft. Flex.</div>
<Divider color={T}/>
<div className="iup id2" style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
{[
["🍔","#FF3008","DoorDash",t("Habits, scripts, and appeal letters built for DD drivers","Hábitos, mensajes y cartas de apelación para conductores DD")],
["🛵","#06C167","Uber Eats",t("Service tips, rating recovery, and dispute templates","Consejos de servicio, recuperación de calificación y plantillas de disputas")],
["🛒","#43B02A","Instacart",t("Shopper etiquette, substitution handling, and IC appeals","Etiqueta de comprador, manejo de sustituciones y apelaciones IC")],
["🚙","#FF00BF","Lyft",t("Passenger service, rating protection, and driver tips","Servicio a pasajeros, protección de calificación y consejos")],
["📦","#FF9900","Flex",t("Block scheduling, standing protection, and TBA handling","Programación de bloques, protección de nivel y manejo de TBA")]
].map(([e,col,label,desc],i)=>(
<div key={i} className="iup" style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(6,182,212,0.05)",border:"1px solid rgba(6,182,212,0.15)",borderRadius:12,animationDelay:`${0.25+i*0.1}s`,opacity:0}}>
<div style={{width:32,height:32,borderRadius:9,background:`${col}18`,border:`1px solid ${col}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{e}</div>
<div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:"rgba(255,255,255,0.85)",marginBottom:1}}>{label}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.3}}>{desc}</div></div>
</div>
))}
</div>
</div>

<div style={ss(5)}>
<div className="iup" style={{fontSize:12,fontWeight:800,color:"rgba(245,166,35,0.7)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:18}}>{t("elite access — $10 one time","acceso elite — $10 una vez")}</div>
<div className="iup id1" style={{...S.headlineGrad(A),fontSize:36,lineHeight:1.15,textAlign:"center",marginBottom:20}}>{t("Lifetime access.","Acceso de por vida.")}<br/>{t("Every update","Cada actualización")}<br/>{t("we ever ship.","que lanzamos.")}</div>
<Divider color={G}/>
<div className="iup id2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,width:"100%"}}>
{[["💬",B,t("30+ Scripts","30+ Mensajes")],["🛡️",P,t("Appeal Letters","Cartas de Apelación")],["🎓",A,t("Lessons","Lecciones")],["🧠",G,t("Psychology","Psicología")],["🎯",T,t("Scenarios","Escenarios")],["💰",A,t("Tip Science","Ciencia de Propinas")]].map(([e,col,label],i)=>(
<div key={i} style={{background:`${col}08`,border:`1px solid ${col}20`,borderRadius:12,padding:"11px 12px",display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:18}}>{e}</span>
<span style={{fontSize:12,fontWeight:700,color:col}}>{label}</span>
</div>
))}
</div>
</div>

<div style={ss(6)}>
<div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,rgba(245,166,35,0.18),transparent 65%)`,pointerEvents:"none"}}/>
<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${A}70,transparent)`}}/>
<div style={{position:"relative",zIndex:1,textAlign:"center",width:"100%"}}>
<div className="ipop" style={{width:76,height:76,borderRadius:24,background:`linear-gradient(135deg,${A},#C8820A)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",boxShadow:`0 0 0 1px rgba(245,166,35,0.20),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.22)`}}><svg width="38" height="38" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{filter:"drop-shadow(0 0 12px rgba(255,255,255,0.35))"}}><path d="M1 10 L3 6 L8 4 L10 2 L12 4 L17 6 L19 10 L17.5 18 L2.5 18 Z" fill="white"/><path d="M10 2 L10 18" stroke="white" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/><path d="M8 4 L12 4" stroke="white" strokeWidth="1" opacity="0.6" strokeLinecap="round"/></svg></div>
<div className="iup id1" style={{...S.headlineGrad(A),fontSize:48,marginBottom:4,textAlign:"center"}}>DropPilot</div>
<div className="iup id1" style={{fontSize:11,color:"rgba(255,255,255,0.28)",letterSpacing:"4px",fontWeight:700,textTransform:"uppercase",marginBottom:22}}>{t("Customer Service · Gig Edition","Servicio al Cliente · Edición Gig")}</div>
<div style={{width:36,height:2,borderRadius:99,background:`linear-gradient(90deg,${A},#fff)`,margin:"0 auto 22px",animation:"iUp 0.4s 0.28s both",opacity:0}}/>
<div className="iup id2" style={{display:"flex",flexDirection:"column",gap:7,marginBottom:26,width:"100%"}}>
{[["⭐",t("Earn","Ganar"),A,t("Free","Gratis")],["💬",t("Scripts","Mensajes"),B,t("Elite","Elite")],["📖",t("Basics","Básicos"),T,t("Elite","Elite")],["🛡️",t("Defend","Defensa"),P,t("Elite","Elite")],["🎓",t("Training","Capacitación"),A,t("Elite","Elite")]].map(([e,t,col,badge],i)=>(
<div key={i} className="iup" style={{display:"flex",alignItems:"center",gap:12,padding:"9px 14px",background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.07)",animationDelay:`${0.25+i*0.09}s`,opacity:0}}>
<span style={{fontSize:16,flexShrink:0}}>{e}</span>
<span style={{fontSize:13,color:"rgba(255,255,255,0.75)",fontWeight:600,flex:1}}>{t}</span>
<span style={{fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:6,background:badge===t("Free","Gratis")?"rgba(16,185,129,0.15)":"rgba(245,166,35,0.12)",color:badge===t("Free","Gratis")?G:A,border:`1px solid ${badge===t("Free","Gratis")?"rgba(16,185,129,0.3)":"rgba(245,166,35,0.25)"}`}}>{badge}</span>
</div>
))}
</div>
<div className="iup id3">
<button onClick={onDone} style={{...S.btnPrimary,padding:"15px 44px",fontSize:16}}>{t("Let's Go →","¡Vamos! →")}</button>
</div>
<div className="iup" style={{fontSize:12,color:"rgba(255,255,255,0.2)",marginTop:14,animationDelay:"0.75s",opacity:0}}>{t("Free to explore · Elite access $10 · Lifetime · Free updates forever","Gratis para explorar · Acceso Elite $10 · De por vida · Actualizaciones gratis para siempre")}</div>
</div>
</div>
</div>
);
}







function ScenarioTrainer({lang}) {
const t=(en,es)=>lang==="en"?en:es;
const [idx,setIdx]=useState(0);
const [chosen,setChosen]=useState(null);
const SCN=pick(lang,SCENARIOS,SCENARIOS_ES);const sc=SCN[idx%SCN.length];
const diffColor={high:C.red,medium:C.amber,low:C.green};
const next=()=>{setIdx(idx+1);setChosen(null);};
return(
<div style={{display:"flex",flexDirection:"column",gap:12}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div style={{fontSize:11,color:C.text3,fontWeight:700,letterSpacing:"0.5px"}}>{t("SCENARIO","ESCENARIO")} {(idx%SCN.length)+1} {t("OF","DE")} {SCN.length}</div>
<div style={{background:`${diffColor[sc.difficulty]}15`,border:`1px solid ${diffColor[sc.difficulty]}35`,borderRadius:6,padding:"3px 8px",fontSize:10,fontWeight:800,color:diffColor[sc.difficulty],textTransform:"uppercase"}}>{sc.difficulty}</div>
</div>
<div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:16,padding:"16px"}}>
<div style={{fontSize:10,fontWeight:800,color:C.text3,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8}}>{sc.e} {sc.tag}</div>
<div style={{fontSize:14,color:C.text,lineHeight:1.75,fontWeight:500}}>{sc.situation}</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{sc.choices.map((ch,i)=>{
const isChosen=chosen===i;
const revealed=chosen!==null;
const ok=ch.correct;
const bc=!revealed?C.border:ok?"#10B981":isChosen?"#F43F5E":C.border;
const bg=!revealed?C.s1:ok?"rgba(16,185,129,0.08)":isChosen?"rgba(244,63,94,0.06)":C.s1;
return(
<div key={i}>
<button onClick={()=>{if(chosen===null)setChosen(i);}} style={{background:bg,border:`1px solid ${bc}`,borderRadius:13,padding:"13px 14px",width:"100%",textAlign:"left",cursor:chosen===null?"pointer":"default",display:"flex",alignItems:"flex-start",gap:10,transition:"all 0.18s",fontFamily:C.sans,WebkitTapHighlightColor:"transparent"}}>
<div style={{width:22,height:22,borderRadius:"50%",background:!revealed?"rgba(255,255,255,0.06)":ok?"rgba(16,185,129,0.2)":isChosen?"rgba(244,63,94,0.2)":"rgba(255,255,255,0.04)",border:`1.5px solid ${bc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:!revealed?C.text3:ok?C.green:isChosen?C.red:C.text3,flexShrink:0,marginTop:1}}>
{!revealed?String.fromCharCode(65+i):ok?"✓":isChosen?"✗":String.fromCharCode(65+i)}
</div>
<span style={{fontSize:13,color:revealed&&!ok&&!isChosen?C.text3:C.text,lineHeight:1.55,fontWeight:500}}>{ch.text}</span>
</button>
{revealed&&isChosen&&(
<div style={{marginTop:6,padding:"11px 14px",background:ok?"rgba(16,185,129,0.07)":"rgba(244,63,94,0.06)",border:`1px solid ${ok?"rgba(16,185,129,0.2)":"rgba(244,63,94,0.15)"}`,borderRadius:11,fontSize:12,color:C.text2,lineHeight:1.65}}>
{ok&&sc.rule&&(
<div style={{fontFamily:C.display,fontSize:18,letterSpacing:"0.5px",lineHeight:1.05,color:C.amberL,marginBottom:6}}>{sc.rule}</div>
)}
<span style={{fontWeight:800,color:ok?C.green:C.red,marginRight:6}}>{ok?"✓ Right —":"✗ Not ideal —"}</span>{ch.why}
</div>
)}
{revealed&&!isChosen&&ok&&(
<div style={{marginTop:6,padding:"11px 14px",background:"rgba(16,185,129,0.07)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:11,fontSize:12,color:C.text2,lineHeight:1.65}}>
{sc.rule&&(
<div style={{fontFamily:C.display,fontSize:18,letterSpacing:"0.5px",lineHeight:1.05,color:C.amberL,marginBottom:6}}>{sc.rule}</div>
)}
<span style={{fontWeight:800,color:C.green,marginRight:6}}>{t("✓ Best response —","✓ Mejor respuesta —")}</span>{ch.why}
</div>
)}
</div>
);
})}
</div>
{chosen!==null&&(
<button onClick={next} style={{background:`linear-gradient(135deg,${C.amber},${C.amberD})`,border:"none",borderRadius:13,padding:"14px",fontSize:14,fontWeight:800,color:"#000",cursor:"pointer",width:"100%",WebkitTapHighlightColor:"transparent"}}>
{idx%SCN.length===SCN.length-1?t("Start Over →","Empezar de Nuevo →"):t("Next Scenario →","Siguiente Escenario →")}
</button>
)}
</div>
);
}











function VideoPlayer({video,lang}) {
const t=(en,es)=>lang==="en"?en:es;
const [scene, setScene] = useState(0);
const [progress, setProgress] = useState(0);
const [playing, setPlaying] = useState(false);
const [quizPhase, setQuizPhase] = useState(null);
const [quizIdx, setQuizIdx] = useState(0);
const [answered, setAnswered] = useState(null);
const elapsed = useRef(0);
const rafRef = useRef(null);
const t0Ref = useRef(null);

useEffect(()=>{restart(false); return()=>{if(rafRef.current)cancelAnimationFrame(rafRef.current);};},[video.id]);

function restart(autoplay=true){
if(rafRef.current)cancelAnimationFrame(rafRef.current);
elapsed.current=0; t0Ref.current=null;
setScene(0); setProgress(0); setPlaying(autoplay);
setQuizPhase(null); setQuizIdx(0); setAnswered(null);
if(autoplay) rafRef.current=requestAnimationFrame(tick);
}

function tick(ts){
if(!t0Ref.current) t0Ref.current=ts;
elapsed.current=ts-t0Ref.current;
setProgress(Math.min(elapsed.current/video.dur*100,100));
let sc=0;
for(let i=video.scenes.length-1;i>=0;i--){if(elapsed.current>=video.scenes[i].t){sc=i;break;}}
setScene(sc);
if(elapsed.current<video.dur){rafRef.current=requestAnimationFrame(tick);}
else{setPlaying(false);if(pick(lang,QUIZZES,QUIZZES_ES)[video.id]?.length)setQuizPhase('quiz');}
}

function togglePlay(){
if(!playing && elapsed.current>=video.dur){restart(true);return;}
if(playing){cancelAnimationFrame(rafRef.current);setPlaying(false);}
else{
const saved=elapsed.current; t0Ref.current=null;
rafRef.current=requestAnimationFrame(ts=>{t0Ref.current=ts-saved;tick(ts);});
setPlaying(true);
}
}

function jumpToScene(si){
if(rafRef.current)cancelAnimationFrame(rafRef.current);
const targetMs=video.scenes[si].t;
elapsed.current=targetMs; t0Ref.current=null;
setScene(si); setProgress(targetMs/video.dur*100);
const saved=targetMs;
rafRef.current=requestAnimationFrame(ts=>{t0Ref.current=ts-saved;tick(ts);});
setPlaying(true);
}

const sc=video.scenes[scene];
const vc=video.color;
const A="#F5A623",G="#10B981",R="#F43F5E";

return(
<div style={{position:"relative",borderRadius:22,overflow:"hidden",background:"#07080A",border:`1px solid ${vc}30`}}>
<div style={{position:"absolute",top:0,left:0,height:4,width:`${progress}%`,background:`linear-gradient(90deg,${vc},#fff)`,boxShadow:`0 0 8px ${vc}cc,0 0 20px ${vc}66`,transition:"width 0.1s linear",zIndex:10}}>
<div style={{position:"absolute",right:-5,top:-3,width:10,height:10,borderRadius:"50%",background:"#fff",boxShadow:`0 0 8px ${vc},0 0 16px ${vc}80`}}/>
</div>
<div style={{minHeight:320,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-40,right:-30,width:180,height:180,borderRadius:"50%",background:`radial-gradient(circle,${vc}20,transparent 65%)`,pointerEvents:"none"}}/>
<div style={{position:"absolute",bottom:-40,left:-20,width:140,height:140,borderRadius:"50%",background:`radial-gradient(circle,${vc}15,transparent 65%)`,pointerEvents:"none"}}/>
<div key={`${video.id}-${scene}`} style={{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
{sc.tag&&<div style={{fontSize:11,fontWeight:800,color:vc,letterSpacing:1.5,textTransform:"uppercase",animation:"vUp 0.4s cubic-bezier(0.22,1,0.36,1) both",background:`${vc}15`,border:`1px solid ${vc}35`,borderRadius:99,padding:"4px 12px"}}>{sc.tag}</div>}
{sc.emoji&&!sc.stat&&<div style={{fontSize:sc.hed?48:64,animation:"vPop 0.4s 0.1s cubic-bezier(0.34,1.56,0.64,1) both",opacity:0}}>{sc.emoji}</div>}
{sc.stat&&<div style={{fontSize:72,fontWeight:900,letterSpacing:"-3px",color:G,lineHeight:1,animation:"vPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both"}}>{sc.stat}</div>}
{sc.statSub&&<div style={{fontSize:18,fontWeight:800,color:"rgba(255,255,255,0.8)",animation:"vUp 0.4s 0.15s both",opacity:0}}>{sc.statSub}</div>}
{sc.hed&&<div style={{...S.headlineGrad(vc),fontSize:sc.hed.length>30?32:38,lineHeight:1.15,textAlign:"center",whiteSpace:"pre-line",animation:`vUp 0.5s 0.15s ${C.ease.out} both`,opacity:0}}>{sc.hed}</div>}
<div style={{width:32,height:2,borderRadius:99,background:`linear-gradient(90deg,${vc},#fff)`,animation:"vFade 0.4s 0.3s both",opacity:0}}/>
{sc.sub&&<div style={{fontSize:12,color:"rgba(255,255,255,0.55)",textAlign:"center",lineHeight:1.75,animation:"vUp 0.5s 0.3s both",opacity:0}}>{sc.sub.split('\n').map((line,i,arr)=><React.Fragment key={i}>{line}{i<arr.length-1&&<br/>}</React.Fragment>)}</div>}
{sc.hi&&<div style={{width:"100%",background:`${sc.hi.color}10`,border:`1px solid ${sc.hi.color}40`,borderRadius:12,padding:"11px 14px",animation:"vUp 0.5s 0.45s both",opacity:0}}><div style={{fontSize:12,fontWeight:700,color:sc.hi.color,lineHeight:1.7,whiteSpace:"pre-line"}}>{sc.hi.text}</div></div>}
{sc.cite&&<div style={{fontSize:12,color:"rgba(255,255,255,0.25)",fontStyle:"italic",textAlign:"center",animation:"vFade 0.4s 0.6s both",opacity:0}}>{sc.cite}</div>}
{sc.vs&&<div style={{display:"flex",gap:8,width:"100%",animation:"vUp 0.5s 0.3s both",opacity:0}}>
<div style={{flex:1,background:`${R}10`,border:`1px solid ${R}30`,borderRadius:12,padding:12,textAlign:"center"}}>
<div style={{fontSize:12,fontWeight:800,color:R,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{sc.vs.bad[0]}</div>
<div style={{fontSize:13,color:"rgba(255,255,255,0.5)",fontStyle:"italic",lineHeight:1.5}}>{sc.vs.bad[1]}</div>
</div>
<div style={{flex:1,background:`${G}10`,border:`1px solid ${G}30`,borderRadius:12,padding:12,textAlign:"center"}}>
<div style={{fontSize:12,fontWeight:800,color:G,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{sc.vs.good[0]}</div>
<div style={{fontSize:13,color:"rgba(255,255,255,0.7)",fontStyle:"italic",lineHeight:1.5}}>{sc.vs.good[1]}</div>
</div>
</div>}
{sc.why&&<div style={{width:"100%",background:`${sc.why.color}10`,border:`1px solid ${sc.why.color}35`,borderRadius:12,padding:"11px 14px",animation:"vUp 0.5s 0.45s both",opacity:0}}><div style={{fontSize:12,fontWeight:700,color:sc.why.color,lineHeight:1.7}}>{sc.why.text}</div></div>}
{sc.vs2&&<div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",animation:"vUp 0.5s 0.3s both",opacity:0}}>
{sc.vs2.map(([e,label,txt,col],i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:`${col}10`,border:`1px solid ${col}25`,borderRadius:12}}>
<span style={{fontSize:22,flexShrink:0}}>{e}</span>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:col,marginBottom:3}}>{label}</div><div style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.5}}>{txt}</div></div>
</div>
))}
</div>}
{sc.math&&<div style={{display:"flex",flexDirection:"column",gap:7,width:"100%",animation:"vUp 0.5s 0.3s both",opacity:0}}>
{sc.math.map(([label,val,big],i)=>(
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:big?"rgba(245,166,35,0.1)":"rgba(255,255,255,0.04)",borderRadius:12,padding:"10px 14px",border:big?"1px solid rgba(245,166,35,0.3)":"1px solid rgba(255,255,255,0.07)"}}>
<span style={{fontSize:12,color:big?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.5)",fontWeight:big?700:400}}>{label}</span>
<span style={{fontSize:big?20:15,fontWeight:900,color:A}}>{val}</span>
</div>
))}
</div>}
{sc.listBad&&<div style={{display:"flex",flexDirection:"column",gap:7,width:"100%",animation:"vUp 0.5s 0.2s both",opacity:0}}>
{sc.listBad.map((t,i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:`${R}10`,border:`1px solid ${R}25`,borderRadius:12}}>
<span style={{color:R,fontWeight:900,fontSize:14}}>✗</span><span style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>{t}</span>
</div>
))}
</div>}
{sc.listGood&&<div style={{display:"flex",flexDirection:"column",gap:7,width:"100%",animation:"vUp 0.5s 0.2s both",opacity:0}}>
{sc.listGood.map(([e,t],i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:`${G}10`,border:`1px solid ${G}25`,borderRadius:12}}>
<span style={{fontSize:18,flexShrink:0}}>{e}</span><span style={{fontSize:12,color:"rgba(255,255,255,0.8)",fontWeight:600}}>{t}</span>
</div>
))}
</div>}
{sc.bars&&<div style={{width:"100%",animation:"vUp 0.5s 0.3s both",opacity:0}}>
{sc.bars.map(([label,stars,pct,col],i)=>(
<div key={i} style={{marginBottom:i<sc.bars.length-1?14:0}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"rgba(255,255,255,0.45)",marginBottom:6}}><span>{label}</span><span>{stars}</span></div>
<div style={{background:"rgba(255,255,255,0.07)",borderRadius:99,height:9,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${col},${col}CC)`,borderRadius:99}}/></div>
</div>
))}
</div>}
{sc.cta&&<div style={{textAlign:"center",animation:"vUp 0.5s 0.45s both",opacity:0}}>
<div style={{background:"rgba(245,166,35,0.12)",border:"2px solid rgba(245,166,35,0.5)",borderRadius:14,padding:"11px 20px",display:"inline-block"}}>
<div style={{fontSize:13,fontWeight:800,color:A}}>{t("Free to explore — droppilot.app","Gratis para explorar — droppilot.app")}</div>
<div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:2}}>{t("Full access — $10 one time","Acceso completo — $10 una vez")}</div>
</div>
</div>}
</div>
</div>

<div style={{padding:"12px 16px 18px",borderTop:`1px solid ${vc}20`}}>
{quizPhase==='quiz'&&(pick(lang,QUIZZES,QUIZZES_ES)[video.id]||[]).length>0?(()=>{
const qd=pick(lang,QUIZZES,QUIZZES_ES)[video.id];
const q=qd[quizIdx];
return(
<div key={quizIdx}>
<div style={{fontSize:11,fontWeight:800,color:vc,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{t("Quick Check","Repaso Rápido")} · {quizIdx+1}/{qd.length}</div>
<div style={{fontSize:14,fontWeight:700,color:C.text,lineHeight:1.55,marginBottom:12}}>{q.q}</div>
<div style={{display:"flex",flexDirection:"column",gap:7}}>
{q.options.map((opt,oi)=>{
const isAnswered=answered!==null;
const isCorrect=oi===q.correct;
const isSelected=oi===answered;
let bg="rgba(255,255,255,0.04)",brd="1px solid rgba(255,255,255,0.1)",col=C.text;
if(isAnswered&&isCorrect){bg="rgba(16,185,129,0.12)";brd=`1px solid ${C.green}50`;col=C.green;}
else if(isAnswered&&isSelected&&!isCorrect){bg="rgba(244,63,94,0.1)";brd=`1px solid ${C.red}40`;col=C.red;}
return(
<button key={oi} onClick={()=>{if(!isAnswered)setAnswered(oi);}} style={{background:bg,border:brd,borderRadius:10,padding:"10px 12px",fontSize:13,fontWeight:isAnswered&&isCorrect?700:400,cursor:isAnswered?"default":"pointer",color:col,textAlign:"left",display:"flex",alignItems:"center",gap:8,transition:"all 0.18s"}}>
<span style={{width:18,height:18,borderRadius:4,background:isAnswered&&isCorrect?C.green:isAnswered&&isSelected?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",fontWeight:900,flexShrink:0}}>{isAnswered&&isCorrect?"✓":isAnswered&&isSelected?"✗":String.fromCharCode(65+oi)}</span>
{opt}
</button>
);
})}
</div>
{answered!==null&&(
<div>
<div style={{marginTop:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"9px 11px",fontSize:12,color:C.text2,lineHeight:1.6}}>{q.explain}</div>
<button onClick={()=>{if(quizIdx<qd.length-1){setQuizIdx(i=>i+1);setAnswered(null);}else{setQuizPhase('takeaways');}}} style={{marginTop:10,background:vc,border:"none",borderRadius:10,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:"#000",width:"100%"}}>
{quizIdx<qd.length-1?t("Next question →","Siguiente pregunta →"):t("See key takeaways →","Ver puntos clave →")}
</button>
</div>
)}
</div>
);
})()
:quizPhase==='takeaways'&&(pick(lang,KEY_TAKEAWAYS,KEY_TAKEAWAYS_ES)[video.id]||[]).length>0?(
<div>
<div style={{fontSize:11,fontWeight:800,color:C.green,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>{t("✓ 3 Things to Remember","✓ 3 Cosas para Recordar")}</div>
<div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
{(pick(lang,KEY_TAKEAWAYS,KEY_TAKEAWAYS_ES)[video.id]||[]).map((t,i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"linear-gradient(135deg,rgba(245,166,35,0.08),rgba(245,166,35,0.02))",border:"1px solid rgba(245,166,35,0.28)",borderRadius:14}}>
<div style={{fontFamily:C.display,fontSize:36,lineHeight:1,color:C.amberL,letterSpacing:"0.5px",flexShrink:0,minWidth:32,textAlign:"center"}}>{i+1}</div>
<span style={{fontSize:14,color:C.text,lineHeight:1.45,fontWeight:600}}>{t}</span>
</div>
))}
</div>
<button onClick={()=>restart(false)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:C.text2,width:"100%"}}>{t("↺ Restart Lesson","↺ Reiniciar Lección")}</button>
</div>
):(
<>

<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:14}}>
{video.scenes.map((_,si)=>(
<button key={si} onClick={()=>jumpToScene(si)} aria-label={`Scene ${si+1}`} style={{width:si===scene?22:9,height:9,borderRadius:99,background:si===scene?vc:"rgba(255,255,255,0.15)",border:"none",cursor:"pointer",padding:0,transition:"all 0.2s"}}/>
))}
<span style={{fontSize:11,color:`${vc}90`,fontWeight:800,marginLeft:6,letterSpacing:"0.5px",fontFamily:"'JetBrains Mono',monospace"}}>{scene+1}/{video.scenes.length}</span>
</div>

<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
<button onClick={()=>restart(false)} aria-label="Restart" style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:99,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:17,color:"rgba(255,255,255,0.4)"}}>↺</button>
<button onClick={togglePlay} aria-label={playing?"Pause":"Play"} style={{background:`linear-gradient(135deg,${vc},${vc}BB)`,border:"none",borderRadius:50,width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:22,boxShadow:`0 0 0 1px ${vc}33,0 4px 14px ${vc}55,0 14px 36px ${vc}55,0 28px 64px ${vc}30`,flexShrink:0,transition:"transform 0.22s cubic-bezier(0.22,1,0.36,1)",fontFamily:"inherit"}}>
{playing?"⏸":elapsed.current>=video.dur?"↺":"▶"}
</button>
<div style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:99,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,color:`${vc}90`}}>
{Math.max(0,Math.ceil(video.dur*(1-progress/100)/1000))}s
</div>
</div>
</>
)}
</div>
</div>
);
}




function PaywallModal({lang,setShowPay,payStep,setPayStep,setTab}){
const t=(en,es)=>pick(lang,en,es);
return(
      <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
        <div onClick={()=>{setShowPay(false);setPayStep("offer");}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.78)"}}/>
        <div style={{position:"relative",background:"linear-gradient(180deg,#12151a,#0d0f13)",borderTop:"1px solid rgba(255,255,255,0.08)",borderRadius:"24px 24px 0 0",padding:24,paddingBottom:40,width:"100%",maxWidth:430,zIndex:1,maxHeight:"88vh",overflowY:"auto"}}>
          <div style={{width:40,height:4,borderRadius:99,background:"rgba(255,255,255,0.15)",margin:"0 auto 22px"}}/>

          {payStep==="offer"&&(
            <div>
              <div style={{textAlign:"center",marginBottom:18}}>
                <div style={{fontSize:44,marginBottom:10}}>🔒</div>
                <div style={{fontSize:22,fontWeight:900,marginBottom:6}}>{t("Become Elite","Hazte Elite")}</div>
                <div style={{fontSize:14,color:C.text2,lineHeight:1.7}}>{t("Everything you need to earn more, protect your account, and stay sharp — all in one place.","Todo lo que necesitas para ganar más, proteger tu cuenta y mantenerte alerta — en un solo lugar.")}</div>
              </div>

              <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:16,marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,marginBottom:12,borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                  <span style={{fontSize:15,fontWeight:700}}>{t("Elite Access","Acceso Elite")}</span>
                  <span style={{fontSize:22,fontWeight:900,color:C.amber,fontFamily:C.sans}}>$10</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:9}}>
                  {[t("4 free tips + 6 more with full psychology breakdowns","4 consejos gratis + 6 más con análisis psicológicos completos"),t("7 in-depth learning sections — psychology, tip science, de-escalation & more","7 secciones de aprendizaje — psicología, ciencia de propinas, desescalada y más"),t("30 message templates with one-tap copy","30 plantillas de mensajes para copiar con un toque"),t("5 training lessons — the science behind what earns more","5 lecciones — la ciencia detrás de lo que te hace ganar más"),t("Platform habits & appeal scripts for all 6 platforms","Hábitos y guiones de apelación para las 6 plataformas"),t("Per-delivery checklists + safety score per platform","Listas por entrega + puntaje de seguridad por plataforma"),t("Notes log for problem addresses and difficult customers","Registro de notas para direcciones problemáticas y clientes difíciles"),t("📡 Policy Watch — monthly platform policy updates","📡 Policy Watch — actualizaciones mensuales de políticas")].map((f,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12,color:C.text2}}>
                      <span style={{color:C.green,fontWeight:900,fontSize:13,flexShrink:0}}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={()=>{ window.location.href=STRIPE_LINK; }} style={{...S.btnPrimary,background:`linear-gradient(135deg,${C.amber},${C.amberD},${C.amberL})`,borderRadius:C.r.lg,padding:"17px",fontSize:16,width:"100%",letterSpacing:0,display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:20}}>💳</span>
                <div style={{textAlign:"left"}}>
                  <div>{t("Become Elite — $10","Hazte Elite — $10")}</div>
                  <div style={{fontSize:13,fontWeight:500,opacity:0.75,marginTop:2}}>{t("Secure Stripe checkout · unlocks instantly on return","Pago seguro con Stripe · se desbloquea al regresar")}</div>
                </div>
              </button>
              <div style={{textAlign:"center",fontSize:12,color:C.text3,marginBottom:4}}>{t("One-time payment · Lifetime access · No recurring charges, ever","Pago único · Acceso de por vida · Sin cargos recurrentes, nunca")}</div>
              <div style={{textAlign:"center",fontSize:11,color:"rgba(107,122,141,0.7)",marginTop:8,lineHeight:1.5,padding:"0 4px"}}>{t("DropPilot is not affiliated with, endorsed by, or connected to DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft, or Amazon Flex.","DropPilot no está afiliado, respaldado ni conectado con DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft o Amazon Flex.")}</div>
            </div>
          )}

          {payStep==="done"&&(
            <div style={{textAlign:"center",padding:"10px 0"}}>
              <div style={{fontSize:64,marginBottom:16}}>🎉</div>
              <div style={{fontSize:24,fontWeight:900,marginBottom:8}}>{t("You're Elite.","Eres Elite.")}</div>
              <div style={{fontSize:14,color:C.text2,marginBottom:26,lineHeight:1.7}}>{t("You now have lifetime access to everything in DropPilot — every template, script, training lesson, and all future app feature updates. Yours forever.","Ahora tienes acceso de por vida a todo en DropPilot — cada plantilla, mensaje, lección y todas las futuras actualizaciones. Para siempre tuyo.")}</div>
              <button onClick={()=>{setShowPay(false);setPayStep("offer");setTab("defend");}} style={{background:C.purple,border:"none",borderRadius:16,padding:"16px",fontSize:16,fontWeight:800,cursor:"pointer",width:"100%",color:"#fff",boxShadow:"0 0 0 1px rgba(139,92,246,0.30),0 4px 14px rgba(139,92,246,0.35),0 14px 40px rgba(139,92,246,0.38),0 28px 64px rgba(139,92,246,0.20)",marginBottom:10}}>{t("Go to Account Defense","Ir a Defensa de Cuenta")}</button>
              <button onClick={()=>{setShowPay(false);setPayStep("offer");setTab("templates");}} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",color:C.text2}}>{t("See Message Templates","Ver Plantillas de Mensajes")}</button>
            </div>
          )}
        </div>
      </div>
);
}

function PlatformPicker({lang,setShowPlatformPicker,startShift}){
const t=(en,es)=>pick(lang,en,es);
return(
      <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
        <div onClick={()=>setShowPlatformPicker(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.78)"}}/>
        <div style={{position:"relative",background:"linear-gradient(180deg,#12151a,#0d0f13)",borderTop:"1px solid rgba(255,255,255,0.08)",borderRadius:"24px 24px 0 0",padding:24,paddingBottom:40,width:"100%",maxWidth:430,zIndex:1}}>
          <div style={{width:40,height:4,borderRadius:99,background:"rgba(255,255,255,0.15)",margin:"0 auto 20px"}}/>
          <div style={{fontSize:19,fontWeight:900,marginBottom:4}}>🚗 {t("Which app are you driving for?","¿Para qué app estás manejando?")}</div>
          <div style={{fontSize:13,color:C.text3,marginBottom:20}}>{t("Your shift will be focused on that platform.","Tu turno se enfocará en esa plataforma.")}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).map(p=>(
              <button key={p.id} onClick={()=>startShift(p.id)} style={{background:`${p.color}0F`,border:`1.5px solid ${p.color}40`,borderRadius:16,padding:"16px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent"}}>
                <div style={{width:44,height:44,borderRadius:13,background:`${p.color}20`,border:`1px solid ${p.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{p.e}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:16,fontWeight:800,color:p.color}}>{p.label}</div>
                  <div style={{fontSize:12,color:C.text3,marginTop:2}}>{t("Tap to start your shift","Toca para iniciar tu turno")}</div>
                </div>
                <div style={{fontSize:20,color:`${p.color}60`}}>›</div>
              </button>
            ))}
          </div>
        </div>
      </div>
);
}
