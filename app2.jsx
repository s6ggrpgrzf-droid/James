const STRIPE_LINK = "/api/checkout"; // in-app Elite button uses the verified Stripe Checkout flow (not a payment link)
function App() {
const [tab, setTab] = useState("tips");
const [navPop, setNavPop] = useState(null);
function changeTab(id){
setNavPop(id);
setTab(id);
setTimeout(()=>setNavPop(null), 400);
}
const [cfg, setCfg_] = useState({name:""});
const [pro, setPro] = useState(false);
const [loaded, setLoaded] = useState(false);
const [showIntro, setShowIntro] = useState(false);
const [toast, setToast] = useState(null);
const showToast = (msg) => setToast(msg);
const [showPay, setShowPay] = useState(false);
const [payStep, setPayStep] = useState("offer");
const [showCfg, setShowCfg] = useState(false);
const tapCount = useRef(0);
const tapTimer = useRef(null);
function handleSecretTap(){
tapCount.current+=1;
if(tapTimer.current) clearTimeout(tapTimer.current);
if(tapCount.current>=5){tapCount.current=0;setShowCfg(o=>!o);}
else{tapTimer.current=setTimeout(()=>{tapCount.current=0;},1500);}
}
const [tipOpen, setTipOpen] = useState(null);
const [learnOpen, setLearnOpen] = useState(null);
const [learnSub, setLearnSub] = useState(null);
const [favTips, setFavTips] = useState(new Set());
const [basicsOpen, setBasicsOpen] = useState(null);
const [basicsSub, setBasicsSub] = useState(null);
const [msgOpen, setMsgOpen] = useState(null);
const [subOpen, setSubOpen] = useState(null);
const [copied, setCopied] = useState(null);
const [templateSearch, setTemplateSearch] = useState("");
const [favTemplates, setFavTemplates] = useState(new Set());
const [activeVideo, setActiveVideo] = useState(0);
const [lang, setLang] = useState("en");
function t(en,es){return lang==="en"?en:es;}
const [showQuickHelp, setShowQuickHelp] = useState(false);
const [qhActive, setQhActive] = useState(null);
const [qhCopied, setQhCopied] = useState(false);
const [fillKey, setFillKey] = useState(null);
const [fillVals, setFillVals] = useState({});
const [shiftMode, setShiftMode] = useState(false);
const [shiftPlatform, setShiftPlatform] = useState(null);
const [showPlatformPicker, setShowPlatformPicker] = useState(false);
function startShift(platId){
setShiftPlatform(platId);
setShiftMode(true);
setShowPlatformPicker(false);
load(`dp3-checks-${platId}`, pick(lang,PLATFORM_CHECKLISTS,PLATFORM_CHECKLISTS_ES)[platId]||[]).then(saved=>{
const base=(pick(lang,PLATFORM_CHECKLISTS,PLATFORM_CHECKLISTS_ES)[platId]||[]).map(c=>({...c,done:false}));
setChecks(saved.length?saved.map((s,i)=>({...(base[i]||s),done:s.done})):base);
});
}
function endShift(){
setShiftMode(false);
setShiftPlatform(null);
}
const [showProfile, setShowProfile] = useState(false);
const [notifOn, setNotifOn] = useState(false);
const [notifPerm, setNotifPerm] = useState(()=>typeof Notification!=="undefined"?Notification.permission:"unsupported");
const [faqOpen, setFaqOpen] = useState(null);
const [defPlatform, setDefPlatform] = useState(null);
const [defSection, setDefSection] = useState("habits");
const [appealOpen, setAppealOpen] = useState(null);
const [appealSub, setAppealSub] = useState(null);
const [checks, setChecks] = useState([]);
const [noteInput, setNoteInput] = useState("");
const [notes, setNotes] = useState([]);
const searchDebounce = useRef(null);
const [searchDisplay, setSearchDisplay] = useState("");
useEffect(()=>()=>{
if(searchDebounce.current) clearTimeout(searchDebounce.current);
if(tapTimer.current) clearTimeout(tapTimer.current);
},[]);
useEffect(()=>{
const h=e=>{if(e.key==="Escape"&&showPay){setShowPay(false);setPayStep("offer");}};
document.addEventListener("keydown",h);
return()=>document.removeEventListener("keydown",h);
},[showPay]);
useEffect(()=>{
if(!loaded||!notifOn) return;
if(typeof Notification==="undefined"||Notification.permission!=="granted") return;
const today=new Date().toDateString();
const last=localStorage.getItem("dp3-notif-last");
if(last===today) return;
const tip=pick(lang,ALL_TIPS,ALL_TIPS_ES)[Math.floor(new Date().getDate()-1)%pick(lang,ALL_TIPS,ALL_TIPS_ES).length];
try{
new Notification("DropPilot — "+t("Tip of the Day","Consejo del Día"),{body:`${tip.e} ${tip.t}: ${tip.s}`});
localStorage.setItem("dp3-notif-last",today);
}catch(e){}
},[loaded,notifOn]);
async function toggleNotif(){
if(typeof Notification==="undefined"){showToast(t("Notifications not supported on this browser.","Notificaciones no soportadas en este navegador."));return;}
if(!notifOn){
const perm=await Notification.requestPermission();
setNotifPerm(perm);
if(perm==="granted"){
setNotifOn(true); save("dp3-notif",true);
const tip=pick(lang,ALL_TIPS,ALL_TIPS_ES)[0];
try{new Notification("DropPilot — "+t("Tip of the Day","Consejo del Día"),{body:`${tip.e} ${tip.t}: ${tip.s}`});localStorage.setItem("dp3-notif-last",new Date().toDateString());}catch(e){}
showToast(t("Tip of the Day enabled!","¡Consejo del día activado!"));
} else if(perm==="denied"){
showToast(t("Blocked — enable notifications in browser settings.","Bloqueado — activa las notificaciones en los ajustes del navegador."));
}
} else {
setNotifOn(false); save("dp3-notif",false);
showToast(t("Tip of the Day turned off.","Consejo del día desactivado."));
}
}
useEffect(()=>{
// Elite is decided by the SERVER (signed dp_elite cookie), never by URL
// params or localStorage. The edge middleware sets the cookie after
// verifying a paid Stripe session; /api/status reads it here.
const doLoad = (verifiedPro) => {
Promise.all([
load("dp3-cfg",{name:""}),
load("dp3-elite",false),
load("dp3-intro-seen",false),
load("dp3-fav-tips",[]),
load("dp3-fav-tpl",[]),
load("dp3-notes",[]),
load("dp3-notif",false),
load("dp3-lang","en"),
]).then(([c,p,seen,ft,ftpl,n,notif,l])=>{
setCfg_(c); setPro(verifiedPro); setLoaded(true);
setFavTips(new Set(ft.filter(f=>typeof f==="number"&&f>=0&&f<ALL_TIPS.length)));
setFavTemplates(new Set(ftpl.filter(k=>typeof k==="string")));
setNotes(n);
setNotifOn(!!notif);
setLang(l||"en");
if(verifiedPro){ save("dp3-elite",true); setShowPay(true); setPayStep("done"); }
else if(!seen) setShowIntro(true);
});
};
// Ask the server whether this browser is elite. If so, pull the full
// content files first — they overwrite the free globals loaded by app.html.
fetch("/api/status",{credentials:"include"}).then(r=>r.json()).then(async (s)=>{
const elite = !!(s && s.elite);
if(elite){
try{
for(const f of ["en1","en2","es1","es2"]){
const r = await fetch("/api/content?f="+f,{credentials:"include"});
if(r.ok){ (0,eval)(await r.text()); }
}
}catch(e){/* fall through with free content */}
}
doLoad(elite);
}).catch(()=>{
// Offline: fall back to the cached local flag so elite keeps working
// without a signal (content served from the service-worker cache).
load("dp3-elite",false).then(p=>doLoad(!!p));
});
},[]);
const setCfg = useCallback(d=>{setCfg_(d); save("dp3-cfg",d);},[]);
function copyMsg(text,key){
if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>{setCopied(key);showToast("Copied to clipboard!");});}
else{setCopied(key);showToast("Copied to clipboard!");}
}
function getPlaceholders(text){
const found=[],seen=new Set();
let m;const re=/\[([^\]]+)\]/g;
while((m=re.exec(text))!==null){if(!seen.has(m[1])){found.push(m[1]);seen.add(m[1]);}}
return found;
}
function applyFill(text,vals){
return text.replace(/\[([^\]]+)\]/g,(_,k)=>vals[k]||`[${k}]`);
}
function toggleLang(){
const nl=lang==="en"?"es":"en";
setLang(nl); save("dp3-lang",nl);
setMsgOpen(null); setSubOpen(null);
}
function toggleCheck(i){
const updated=checks.map((c,idx)=>idx===i?{...c,done:!c.done}:c);
setChecks(updated);
if(defPlatform) save(`dp3-checks-${defPlatform}`,updated);
}
function selectPlatform(id){
if(defPlatform===id){setDefPlatform(null);return;}
setDefPlatform(id);
setDefSection("habits");
setAppealOpen(null);
setAppealSub(null);
load(`dp3-checks-${id}`,(pick(lang,PLATFORM_CHECKLISTS,PLATFORM_CHECKLISTS_ES)[id]||[]).map(c=>({...c,done:false}))).then(saved=>{
setChecks(saved);
});
}
function toggleFavTip(i){
const next=new Set(favTips);
if(next.has(i)){next.delete(i);}else{next.add(i);if(next.size===1)showToast(t("Tip saved! Upgrade to Elite for full access.","¡Consejo guardado! Mejora a Elite para acceso completo."));}
setFavTips(next);
save("dp3-fav-tips",[...next]);
}
function toggleFavTemplate(key){
const next=new Set(favTemplates);
next.has(key)?next.delete(key):next.add(key);
setFavTemplates(next);
save("dp3-fav-tpl",[...next]);
}
function addNote(){
if(!noteInput.trim()) return;
const newNote={text:noteInput.trim(),date:new Date().toLocaleDateString()};
const updated=[newNote,...notes].slice(0,50);
if(notes.length>=50) showToast(t("Note limit reached — oldest removed.","Límite de notas alcanzado — se eliminó la más antigua."));
setNotes(updated);
save("dp3-notes",updated);
setNoteInput("");
}
function deleteNote(i){
const updated=notes.filter((_,idx)=>idx!==i);
setNotes(updated);
save("dp3-notes",updated);
}
function handleSearchChange(val){
setSearchDisplay(val);
if(searchDebounce.current) clearTimeout(searchDebounce.current);
searchDebounce.current=setTimeout(()=>setTemplateSearch(val),200);
}
const ACTIVE_MSG_CATS = lang==="en"?MSG_CATS:MSG_CATS_ES;
const filteredCats = templateSearch.trim()
? ACTIVE_MSG_CATS.map(cat=>({
...cat,
secs: cat.secs.filter(s=>
s.h.toLowerCase().includes(templateSearch.toLowerCase()) ||
s.msg.toLowerCase().includes(templateSearch.toLowerCase())
)
})).filter(cat=>cat.secs.length>0)
: ACTIVE_MSG_CATS;
if(!loaded) return(
<div style={{background:C.bg,height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:C.sans}}>
<div style={{width:60,height:60,borderRadius:20,background:`linear-gradient(135deg,${C.amber},${C.amberD})`,display:"flex",alignItems:"center",justifyContent:"center",animation:"floatY 2s ease-in-out infinite",boxShadow:`0 0 0 1px rgba(245,166,35,0.20),0 4px 14px rgba(245,166,35,0.30),0 14px 40px rgba(245,166,35,0.32),0 28px 72px rgba(245,166,35,0.20)`}}><svg width="32" height="32" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1 10 L3 6 L8 4 L10 2 L12 4 L17 6 L19 10 L17.5 18 L2.5 18 Z" fill="white"/><path d="M10 2 L10 18" stroke="white" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/><path d="M8 4 L12 4" stroke="white" strokeWidth="1" opacity="0.6" strokeLinecap="round"/></svg></div>
<div style={{color:C.amber,fontSize:17,fontWeight:700}}>{t("Loading DropPilot...","Cargando DropPilot...")}</div>
</div>
);
if(showIntro) return <IntroAnimation lang={lang} onDone={()=>{setShowIntro(false);save("dp3-intro-seen",true);}}/>;
return(
<div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",fontFamily:C.sans,color:C.text,display:"flex",flexDirection:"column"}}>
{toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
<div style={{background:"rgba(10,12,16,0.94)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"13px 18px",display:"flex",alignItems:"center",position:"sticky",top:0,zIndex:60}}>
<div onClick={handleSecretTap} style={{display:"flex",alignItems:"center",gap:10,userSelect:"none",WebkitUserSelect:"none",cursor:"default",flex:1}}>
<div className="glow" style={{width:38,height:38,borderRadius:C.r.lg,background:shiftMode&&shiftPlatform?`linear-gradient(135deg,${pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===shiftPlatform)?.color||C.amber},${C.amberD})`:`linear-gradient(135deg,${C.amber},${C.amberD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{shiftMode&&shiftPlatform?pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===shiftPlatform)?.e:<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1 10 L3 6 L8 4 L10 2 L12 4 L17 6 L19 10 L17.5 18 L2.5 18 Z" fill="white"/><path d="M10 2 L10 18" stroke="white" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/><path d="M8 4 L12 4" stroke="white" strokeWidth="1" opacity="0.6" strokeLinecap="round"/></svg>}</div>
<div>
<div style={{...S.wordmark,fontSize:18}}>DropPilot</div>
{shiftMode&&shiftPlatform?(
<div style={{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===shiftPlatform)?.color||C.amber}}>● {pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===shiftPlatform)?.label} Shift Active</div>
):(
<div style={{fontSize:10,color:C.text3,letterSpacing:"1.5px",fontWeight:700,textTransform:"uppercase"}}>{t("Customer Service · Gig Edition","Servicio al Cliente · Edición Gig")}</div>
)}
</div>
</div>
{!shiftMode&&<button onClick={()=>setShowPlatformPicker(true)} aria-label={t("Start shift","Empezar turno")} style={{background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.3)",borderRadius:C.r.sm,padding:"0 10px",height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,flexShrink:0,marginRight:6,gap:5,WebkitTapHighlightColor:"transparent"}}>
<span>🚗</span><span style={{fontSize:11,fontWeight:800,color:C.amber,fontFamily:C.sans}}>{t("Drive","Manejar")}</span>
</button>}
<button onClick={toggleLang} aria-label={t("Toggle language","Cambiar idioma")} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:C.r.sm,padding:"0 10px",height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:11,fontWeight:800,color:C.text2,letterSpacing:"0.5px",flexShrink:0,marginRight:6,fontFamily:C.sans}}>{lang==="en"?"ES":"EN"}</button>
<button onClick={()=>setShowProfile(o=>!o)} aria-label={t("Profile & Settings","Perfil y ajustes")} style={{background:showProfile?`${C.amber}18`:"rgba(255,255,255,0.05)",border:`1px solid ${showProfile?`${C.amber}40`:"rgba(255,255,255,0.08)"}`,borderRadius:C.r.sm,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:17,flexShrink:0,transition:"all 0.15s"}}>⚙️</button>
</div>
{showCfg&&(
<div style={{background:C.s2,borderBottom:"1px solid rgba(255,255,255,0.07)",padding:18}}>
<div style={{fontSize:15,fontWeight:800,marginBottom:16}}>{t("⚙ Admin Settings","⚙ Ajustes de Admin")}</div>
<div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:14,marginBottom:14}}>
<button onClick={()=>{setShowIntro(true);setShowCfg(false);save("dp3-intro-seen",false);}} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,padding:"11px 12px",color:C.text2,fontSize:13,width:"100%",cursor:"pointer",marginBottom:8}}>{t("↺ Replay Intro","↺ Repetir Intro")}</button>
{pro&&<button onClick={()=>{fetch("/api/reset",{credentials:"include"}).catch(()=>{});setPro(false);save("dp3-elite",false);}} style={{background:"rgba(244,63,94,0.08)",border:"1px solid rgba(244,63,94,0.2)",borderRadius:11,padding:"11px 12px",color:C.red,fontSize:13,width:"100%",cursor:"pointer",marginBottom:8}}>{t("Reset Elite Access","Restablecer Acceso Elite")}</button>}
</div>
<button onClick={()=>setShowCfg(false)} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"14px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>{t("Save & Close","Guardar y Cerrar")}</button>
</div>
)}
{showProfile&&(
<div style={{background:C.s2,borderBottom:"1px solid rgba(255,255,255,0.07)",padding:18,animation:"slideUp 0.22s cubic-bezier(0.22,1,0.36,1)"}}>
<div style={{fontSize:14,fontWeight:800,color:C.text,marginBottom:14}}>{t("👤 Your Profile","👤 Tu Perfil")}</div>
<div style={{marginBottom:16}}>
<div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:5,textTransform:"uppercase",letterSpacing:"1px"}}>{t("Your Name","Tu Nombre")}</div>
<input value={cfg.name||""} onChange={e=>setCfg({...cfg,name:e.target.value})} placeholder="e.g. James" style={{background:C.s1,border:"1px solid rgba(255,255,255,0.08)",borderRadius:11,padding:"11px 12px",color:C.text,fontSize:13,width:"100%"}}/>
</div>
<div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:14,marginBottom:16}}>
<div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:"1px"}}>{t("⭐ Access","⭐ Acceso")}</div>
{pro?(
<div style={{background:`${C.green}0D`,border:`1px solid ${C.green}30`,borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:10}}>
<span style={{fontSize:18}}>⭐</span>
<div>
<div style={{fontSize:13,fontWeight:800,color:C.green}}>{t("Elite Active","Elite Activo")}</div>
<div style={{fontSize:11,color:C.text3,marginTop:2}}>{t("Lifetime access — all features unlocked","Acceso de por vida — todo desbloqueado")}</div>
</div>
</div>
):(
<button onClick={()=>{setShowProfile(false);setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"13px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>{t("Upgrade to Elite — $10 one time","Mejorar a Elite — $10 una vez")}</button>
)}
</div>
<div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:14,marginBottom:16}}>
<div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:"1px"}}>{t("🔔 Notifications","🔔 Notificaciones")}</div>
<div style={{background:C.s1,border:`1px solid ${notifOn?`${C.green}35`:"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,transition:"border-color 0.2s"}}>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:13,fontWeight:700,color:C.text}}>Tip of the Day</div>
<div style={{fontSize:11,color:C.text3,marginTop:3,lineHeight:1.4}}>
{notifPerm==="denied"?t("Blocked — enable in your browser settings","Bloqueado — actívalo en los ajustes de tu navegador"):notifOn?t("Sends a fresh tip each time you open the app","Envía un consejo nuevo cada vez que abres la app"):t("Get a customer service tip every day","Recibe un consejo de servicio al cliente cada día")}
</div>
</div>
<button onClick={toggleNotif} style={{background:notifOn?`${C.green}18`:"rgba(255,255,255,0.07)",border:`1px solid ${notifOn?`${C.green}40`:"rgba(255,255,255,0.12)"}`,borderRadius:99,padding:"7px 16px",fontSize:12,fontWeight:800,cursor:"pointer",color:notifOn?C.green:C.text3,flexShrink:0,transition:"all 0.15s"}}>
{notifOn?"On ✓":"Enable"}
</button>
</div>
</div>
<div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:14,marginBottom:16}}>
<div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:"1px"}}>{t("❓ FAQ","❓ Preguntas Frecuentes")}</div>
<div style={{display:"flex",flexDirection:"column",gap:6}}>
{[
[t("What's free and what's Elite?","¿Qué es gratis y qué es Elite?"),
t("Free forever: 3 Earn tips, the Reading People psychology guide, 2 arrival scripts, and 3 account-protection habits. Elite ($10 one-time) unlocks everything else: 7 more tips, 7 more guides, 30+ more scripts, appeal letters, platform guides, training videos, and every update we ever ship.","Gratis para siempre: 3 consejos de Ganar, la guía de psicología Reading People, 2 guiones de llegada y 3 hábitos de protección de cuenta. Elite ($10 una vez) desbloquea todo lo demás: 7 consejos más, 7 guías más, más de 30 guiones, cartas de apelación, guías por plataforma, videos y cada actualización que lancemos.")],
[t("I paid but my access didn't unlock. What do I do?","Pagué pero no se desbloqueó. ¿Qué hago?"),
t("After payment, Stripe sends you back to the app and it unlocks automatically. If something went wrong, close and reopen the app — your purchase is saved. Still not working? Email support@droppilot.app and we'll sort it out same day.","Después del pago, Stripe te regresa a la app y se desbloquea automáticamente. Si algo falló, cierra y vuelve a abrir la app — tu compra está guardada. ¿Sigue sin funcionar? Escribe a support@droppilot.app y lo resolvemos el mismo día.")],
[t("How do I add DropPilot to my home screen?","¿Cómo agrego DropPilot a mi pantalla de inicio?"),
t("On iPhone: tap the Share button (the box with an arrow) in Safari, then tap 'Add to Home Screen.' On Android: tap the three-dot menu in Chrome, then 'Add to Home screen.' It'll sit on your home screen and open like a real app.","En iPhone: toca el botón Compartir (el cuadro con una flecha) en Safari, luego toca 'Agregar a pantalla de inicio'. En Android: toca el menú de tres puntos en Chrome, luego 'Agregar a pantalla de inicio'. Quedará en tu inicio y abrirá como una app normal.")],
[t("Does the app work offline?","¿La app funciona sin internet?"),
t("Yes — once it's loaded, all the tips, scripts, and guides work without a connection. Your notes and checklist progress save locally on your phone. The only thing that needs internet is the initial load and the Stripe payment.","Sí — una vez cargada, todos los consejos, mensajes y guías funcionan sin conexión. Tus notas y el progreso se guardan en tu teléfono. Lo único que necesita internet es la carga inicial y el pago con Stripe.")],
[t("Is my data saved if I clear my browser or get a new phone?","¿Se guardan mis datos si borro el navegador o cambio de teléfono?"),
t("Everything is saved locally on your device. If you clear your browser data or switch phones, your progress will reset. Elite access can be restored — email support@droppilot.app from the same address used at checkout and we'll sort it out same day.","Todo se guarda localmente en tu dispositivo. Si borras los datos del navegador o cambias de teléfono, tu progreso se reiniciará. El acceso Elite se puede restaurar — escribe a support@droppilot.app desde el mismo correo del pago y lo resolvemos el mismo día.")],
[t("What platforms does DropPilot cover?","¿Qué plataformas cubre DropPilot?"),
t("DoorDash, Uber Eats, Lyft, Instacart, Walmart Spark, Amazon Flex, Uber (rideshare), and GoPuff. Every platform has its own habits, appeal letter templates, checklist, and a dedicated section in the Basics guide.","DoorDash, Uber Eats, Lyft, Instacart, Walmart Spark, Amazon Flex, Uber (viajes) y GoPuff. Cada plataforma tiene sus hábitos, plantillas de apelación, lista y una sección dedicada en la guía de Básicos.")],
[t("Can I use DropPilot on multiple devices?","¿Puedo usar DropPilot en varios dispositivos?"),
t("Yes — just pay once and it's yours. Each device stores access locally, so if you set up a new phone email support@droppilot.app from the address used at checkout and we'll get you restored. Notes and checklist progress are device-specific.","Sí — pagas una vez y es tuyo. Cada dispositivo guarda el acceso localmente, así que si configuras un teléfono nuevo escribe a support@droppilot.app desde el correo del pago y te lo restauramos. Las notas y el progreso son por dispositivo.")],
[t("Something's not working. How do I get help?","Algo no funciona. ¿Cómo obtengo ayuda?"),
t("Email support@droppilot.app — payment issues, access problems, anything else. Most issues are resolved same day.","Escribe a support@droppilot.app — problemas de pago, de acceso, lo que sea. La mayoría se resuelve el mismo día.")],
].map(([q,a],i)=>{
const open=faqOpen===i;
return(
<div key={i} style={{background:C.s1,border:`1px solid ${open?"rgba(245,166,35,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:12,overflow:"hidden",transition:"border-color 0.18s"}}>
<button onClick={()=>setFaqOpen(open?null:i)} style={{background:"none",border:"none",width:"100%",padding:"11px 13px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,cursor:"pointer",fontFamily:C.sans}}>
<span style={{fontSize:12,fontWeight:700,color:open?C.amber:C.text,textAlign:"left",lineHeight:1.4}}>{q}</span>
<span style={{fontSize:14,color:open?C.amber:C.text3,flexShrink:0,transition:"transform 0.18s",transform:open?"rotate(180deg)":"none"}}>⌄</span>
</button>
{open&&(
<div style={{padding:"0 13px 12px",fontSize:12,color:C.text2,lineHeight:1.7}}>{a}</div>
)}
</div>
);
})}
</div>
</div>
<div style={{marginBottom:14}}>
<button onClick={()=>{setShowProfile(false);setShowIntro(true);save("dp3-intro-seen",false);}} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:11,padding:"10px 12px",color:C.text3,fontSize:13,width:"100%",cursor:"pointer"}}>{t("↺ Replay Intro","↺ Repetir Intro")}</button>
</div>
<div style={{marginBottom:14,padding:"12px 14px",background:C.s1,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12}}>
<div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>{t("Support & Legal","Soporte y Legal")}</div>
<a href="mailto:support@droppilot.app" style={{display:"block",fontSize:13,fontWeight:700,color:C.amber,textDecoration:"none",marginBottom:6}}>✉ support@droppilot.app</a>
<div style={{fontSize:12,color:C.text3}}>
<a href="terms.html" target="_blank" rel="noopener" style={{color:C.text2,textDecoration:"none",marginRight:14}}>{t("Terms","Términos")}</a>
<a href="privacy.html" target="_blank" rel="noopener" style={{color:C.text2,textDecoration:"none"}}>{t("Privacy","Privacidad")}</a>
</div>
</div>
<button onClick={()=>setShowProfile(false)} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"14px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>{t("Save & Close","Guardar y Cerrar")}</button>
<div style={{marginTop:16,padding:"12px 14px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12}}>
<div style={{fontSize:11,color:C.text3,lineHeight:1.6,textAlign:"center"}}>
{t("DropPilot is an independent tool created for gig drivers. It is ","DropPilot es una herramienta independiente creada para conductores de apps. ")}<span style={{fontWeight:700}}>{t("not affiliated with, endorsed by, or connected to","no está afiliada, respaldada ni conectada con")}</span>{t(" DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft, or Amazon Flex. All templates, advice, and content are provided as-is for informational purposes only."," DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft o Amazon Flex. Todas las plantillas, consejos y contenido se proporcionan tal cual, solo con fines informativos.")}
</div>
</div>
</div>
)}
<div style={{flex:1,overflowY:"auto",paddingBottom:shiftMode?100:80}}>
{shiftMode&&shiftPlatform&&(()=>{
const plat=pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===shiftPlatform);
const pc=plat?.color||C.amber;
const habits=(pick(lang,PLATFORM_HABITS,PLATFORM_HABITS_ES)[shiftPlatform]||[]).filter(h=>h.urgent).slice(0,3);
const done=checks.filter(c=>c.done).length;
const pct=checks.length?Math.round(done/checks.length*100):0;
const pctCol=pct>=100?C.green:pct>=60?C.amber:C.red;
return(
<div className="page" style={{padding:16,display:"flex",flexDirection:"column",gap:14}}>
<div style={{background:`${pc}10`,border:`1px solid ${pc}30`,borderRadius:18,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
<div style={{width:46,height:46,borderRadius:14,background:`${pc}20`,border:`1px solid ${pc}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{plat?.e}</div>
<div style={{flex:1}}>
<div style={{fontSize:11,fontWeight:800,color:pc,letterSpacing:"1.5px",textTransform:"uppercase"}}>{t("Shift Active","Turno Activo")}</div>
<div style={{fontSize:20,fontWeight:900,color:C.text}}>{plat?.label}</div>
</div>
<div style={{textAlign:"center"}}>
<div style={{fontSize:20,fontWeight:900,color:pctCol}}>{pct}%</div>
<div style={{fontSize:10,color:C.text3,fontWeight:700}}>{t("protected","protegido")}</div>
</div>
</div>
<div style={{background:C.s1,border:"1px solid rgba(255,255,255,0.07)",borderRadius:18,overflow:"hidden"}}>
<div style={{padding:"14px 16px 10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div style={{fontSize:13,fontWeight:800,color:C.text,letterSpacing:"0.5px"}}>✅ {t("Delivery Checklist","Lista de entrega")}</div>
<button onClick={()=>{const r=checks.map(c=>({...c,done:false}));setChecks(r);save(`dp3-checks-${shiftPlatform}`,r);}} style={{background:"transparent",border:"none",color:C.text3,fontSize:12,fontWeight:700,cursor:"pointer",padding:"4px 8px",WebkitTapHighlightColor:"transparent"}}>{t("Reset","Reiniciar")}</button>
</div>
<div style={{padding:"0 12px 12px",display:"flex",flexDirection:"column",gap:8}}>
{checks.map((item,i)=>(
<button key={i} onClick={()=>toggleCheck(i)} style={{background:item.done?`${C.green}10`:C.s2,border:`1px solid ${item.done?`${C.green}35`:"rgba(255,255,255,0.06)"}`,borderRadius:13,padding:"13px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent",transition:"background 0.15s,border 0.15s"}}>
<div style={{width:28,height:28,borderRadius:8,border:`2px solid ${item.done?C.green:"rgba(255,255,255,0.2)"}`,background:item.done?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
{item.done&&<span style={{color:"#000",fontSize:15,fontWeight:900}}>✓</span>}
</div>
<span style={{fontSize:14,fontWeight:600,color:item.done?C.green:C.text,lineHeight:1.3}}>{item.e} {item.t}</span>
</button>
))}
</div>
</div>
{habits.length>0&&(
<div style={{background:C.s1,border:"1px solid rgba(255,255,255,0.07)",borderRadius:18,overflow:"hidden"}}>
<div style={{padding:"14px 16px 10px",fontSize:13,fontWeight:800,color:C.red}}>⚠️ {t("Critical Habits","Hábitos Críticos")}</div>
<div style={{padding:"0 12px 12px",display:"flex",flexDirection:"column",gap:8}}>
{habits.map((h,i)=>(
<div key={i} style={{background:"rgba(244,63,94,0.06)",border:"1px solid rgba(244,63,94,0.18)",borderRadius:12,padding:"12px 13px",display:"flex",alignItems:"flex-start",gap:10}}>
<span style={{fontSize:18,flexShrink:0}}>{h.e}</span>
<div>
<div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:3}}>{h.t}</div>
<div style={{fontSize:12,color:C.text3,lineHeight:1.5}}>{h.why.slice(0,90)}{h.why.length>90?"…":""}</div>
</div>
</div>
))}
</div>
</div>
)}
<button onClick={()=>{setShowQuickHelp(true);setQhActive(null);setQhCopied(false);}} style={{background:`linear-gradient(135deg,${C.blue}18,${C.blue}08)`,border:`1.5px solid ${C.blue}40`,borderRadius:16,padding:"16px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent"}}>
<div style={{width:44,height:44,borderRadius:13,background:`${C.blue}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>⚡</div>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:800,color:C.blue}}>{t("Need a script right now?","¿Necesitas un mensaje ahora?")}</div>
<div style={{fontSize:12,color:C.text3,marginTop:2}}>{t("Gate code, running late, no answer & more","Código de acceso, retraso, sin respuesta y más")}</div>
</div>
<div style={{fontSize:20,color:`${C.blue}60`}}>›</div>
</button>
</div>
);
})()}
{!shiftMode&&tab==="tips"&&(
<div className="page" style={{padding:16,display:"flex",flexDirection:"column",gap:14}}>
{pro ? (
<QuickSituationsCarousel lang={lang} onCardClick={(i)=>{setShowQuickHelp(true);setQhActive(i);}}/>
) : (
<div style={{background:`linear-gradient(135deg,rgba(245,166,35,0.08),rgba(245,166,35,0.03))`,border:"1px solid rgba(245,166,35,0.15)",borderRadius:18,padding:20,marginBottom:12,textAlign:"center"}}>
<div style={{fontSize:32,marginBottom:8}}>🎯</div>
<div style={{fontSize:14,fontWeight:800,color:C.text,marginBottom:4}}>{t("Quick Help Carousel","Carrusel de Ayuda Rápida")}</div>
<div style={{fontSize:12,color:C.text2,marginBottom:12,lineHeight:1.5}}>{t("Browse quick solutions for common delivery situations","Explora soluciones rápidas para situaciones comunes de entrega")}</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,padding:"8px 16px",fontSize:13,fontWeight:800,letterSpacing:0,boxShadow:`0 0 0 1px rgba(245,166,35,0.25),0 4px 12px rgba(245,166,35,0.30)`}}>{t("Unlock with Elite","Desbloquear con Elite")}</button>
</div>
)}
<div style={{fontSize:13,fontWeight:800,color:C.amber,letterSpacing:"1px",textTransform:"uppercase",paddingLeft:2}}>{t("⭐ Quick Tips","⭐ Consejos Rápidos")}</div>
{(lang==="en"?ALL_TIPS:ALL_TIPS_ES).map((tip,i)=>{
const open=tipOpen===i;
const fav=favTips.has(i);
const locked=!pro&&i>=3;
return(
<div key={i} className={`tip card-in c${Math.min(i,9)}`} onClick={()=>{if(locked){setShowPay(true);setPayStep("offer");return;}setTipOpen(open?null:i)}}
style={{background:open?C.s2:C.s1,border:`1px solid ${open?"rgba(245,166,35,0.3)":C.border}`,borderRadius:16,padding:18,cursor:"pointer",transition:"opacity 0.15s",opacity:locked?0.55:1}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:44,height:44,borderRadius:13,background:open?"rgba(245,166,35,0.12)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{tip.e}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:3}}>{tip.t}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.5}}>{tip.s}</div>
</div>
{locked?(
<span style={{fontSize:12,fontWeight:700,color:C.amber,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:6,padding:"3px 8px",flexShrink:0}}>Elite</span>
):pro?(
<button aria-label={fav?t("Remove from favorites","Quitar de favoritos"):t("Save to favorites","Guardar en favoritos")} onClick={e=>{e.stopPropagation();toggleFavTip(i);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:"4px",color:fav?C.amber:"rgba(255,255,255,0.2)",flexShrink:0}}>
{fav?"★":"☆"}
</button>
):(
<span style={{fontSize:12,fontWeight:700,color:C.green,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:6,padding:"3px 8px",flexShrink:0}}>{t("Free","Gratis")}</span>
)}
<div style={{color:C.text3,fontSize:13,flexShrink:0,transition:"transform 0.18s",transform:open?"rotate(180deg)":"none"}}>▾</div>
</div>
{open&&(
<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.07)"}}>
<p style={{fontSize:13,color:C.text2,lineHeight:1.8,margin:0}}>{tip.d}</p>
</div>
)}
</div>
);
})}
<div style={{fontSize:13,fontWeight:800,color:C.text2,letterSpacing:"1px",textTransform:"uppercase",paddingLeft:2,marginTop:4}}>{t("🎓 Deeper Learning","🎓 Aprendizaje Profundo")}</div>
{pick(lang,LEARN_CATS,LEARN_CATS_ES).map((cat,ci)=>{
const catOpen=learnOpen===ci;
return(
<div key={ci} style={{background:C.s1,border:`1px solid ${catOpen?"rgba(59,130,246,0.3)":C.border}`,borderRadius:18,overflow:"hidden",opacity:(pro||ci<1)?1:0.55,transition:"opacity 0.15s"}}>
<div onClick={()=>{if(!pro&&ci>=1){setShowPay(true);setPayStep("offer");return;}setLearnOpen(catOpen?null:ci);setLearnSub(null);}} style={{padding:"16px 18px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div style={{width:44,height:44,borderRadius:13,background:catOpen?"rgba(59,130,246,0.12)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat.e}</div>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:700}}>{cat.t}</div>
<div style={{fontSize:13,color:C.text2,marginTop:2}}>{cat.sub}</div>
</div>
{(!pro&&ci>=1)
?<span style={{fontSize:12,fontWeight:700,color:C.amber,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:6,padding:"3px 8px",flexShrink:0}}>Elite</span>
:<div style={{color:C.text3,fontSize:13,transition:"transform 0.18s",transform:catOpen?"rotate(180deg)":"none"}}>▾</div>
}
</div>
{catOpen&&(pro||ci<1)&&(
<div style={{padding:"0 12px 12px",display:"flex",flexDirection:"column",gap:10}}>
{cat.secs.map((sec,si)=>{
const key=`l${ci}-${si}`;
const open2=learnSub===key;
const lines=(sec.body||"").split("\n");
const stepRe=/^(\d+)\.\s+(.+)$/;
const stepStart=lines.findIndex(l=>stepRe.test(l.trim()));
let intro=sec.body, steps=null, outro="";
if(stepStart>=0){
intro=lines.slice(0,stepStart).join(" ").trim();
const stepLines=[]; let endIdx=stepStart-1;
for(let i=stepStart;i<lines.length;i++){
const m=lines[i].trim().match(stepRe);
if(m){stepLines.push(m[2]);endIdx=i;} else break;
}
steps=stepLines;
outro=lines.slice(endIdx+1).join(" ").trim();
}
const introMatch=(intro||"").match(/^([^.!?]+[.!?])\s*([\s\S]*)$/);
const lead=introMatch?introMatch[1]:intro;
const rest=introMatch?introMatch[2]:"";
const tipWords=(sec.tip||"").split(/\s+/).filter(Boolean).length;
const isMnemonic=tipWords>0 && tipWords<=8;
return(
<div key={si} style={{background:C.s2,border:`1px solid ${open2?"rgba(245,166,35,0.22)":"rgba(255,255,255,0.06)"}`,borderRadius:14,overflow:"hidden",transition:"border-color 0.18s"}}>
<div onClick={()=>setLearnSub(open2?null:key)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
<span style={{fontSize:13,fontWeight:700,color:open2?C.amber:C.text}}>{sec.h}</span>
<div style={{color:open2?C.amber:C.text3,fontSize:13,transition:"transform 0.18s",transform:open2?"rotate(180deg)":"none",flexShrink:0}}>▾</div>
</div>
{open2&&(
<div style={{padding:"0 14px 14px"}}>
<div style={{background:"linear-gradient(135deg,rgba(245,166,35,0.09),rgba(245,166,35,0.03))",border:"1px solid rgba(245,166,35,0.28)",borderRadius:14,padding:"12px 16px",marginBottom:12}}>
<div style={{fontSize:9,fontWeight:800,color:C.amberD,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:4}}>{t("The Rule","La Regla")}</div>
<div style={{fontFamily:C.display,fontSize:22,letterSpacing:"0.5px",lineHeight:1.05,color:C.amberL}}>{sec.h}</div>
</div>
{intro&&(
<p style={{fontSize:13,lineHeight:1.8,margin:"0 0 12px"}}>
<span style={{color:C.text,fontWeight:600}}>{lead}</span>
{rest&&<span style={{color:C.text2}}>{" "}{rest}</span>}
</p>
)}
{steps&&(
<div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
{steps.map((st,i)=>(
<div key={i} style={{display:"flex",alignItems:"flex-start",gap:10}}>
<div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.amber},${C.amberD})`,color:"#000",fontWeight:900,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,fontFamily:C.display}}>{i+1}</div>
<span style={{fontSize:13,color:C.text2,lineHeight:1.65}}>{st}</span>
</div>
))}
</div>
)}
{outro&&(
<p style={{fontSize:13,color:C.text2,lineHeight:1.8,margin:"0 0 12px"}}>{outro}</p>
)}
{isMnemonic?(
<div style={{display:"flex",justifyContent:"center",marginTop:4}}>
<div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:2,background:"linear-gradient(135deg,rgba(245,166,35,0.12),rgba(245,166,35,0.04))",border:"1px solid rgba(245,166,35,0.4)",borderRadius:14,padding:"10px 22px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05)"}}>
<div style={{fontSize:9,fontWeight:800,color:C.amberD,letterSpacing:"1.6px",textTransform:"uppercase"}}>{t("Memorize","Memorizar")}</div>
<div style={{fontFamily:C.display,fontSize:18,letterSpacing:"0.5px",lineHeight:1.05,color:C.amberL,textAlign:"center"}}>{sec.tip}</div>
</div>
</div>
):(
<div style={{background:"rgba(245,166,35,0.07)",border:"1px solid rgba(245,166,35,0.2)",borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"flex-start",gap:8}}>
<span style={{fontSize:14,flexShrink:0}}>💡</span>
<span style={{fontSize:12,color:C.amber,lineHeight:1.6,fontWeight:600}}>{sec.tip}</span>
</div>
)}
</div>
)}
</div>
);
})}
</div>
)}
</div>
);
})}
{pro&&favTips.size>0&&(
<div style={{background:C.s1,border:`1px solid rgba(245,166,35,0.2)`,borderRadius:18,padding:14}}>
<div style={{fontSize:12,fontWeight:800,color:C.amber,marginBottom:10}}>{t("★ Your Saved Tips","★ Tus Consejos Guardados")}</div>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{[...favTips].filter(i=>(lang==="en"?ALL_TIPS:ALL_TIPS_ES)[i]).map(i=>{const tips2=lang==="en"?ALL_TIPS:ALL_TIPS_ES;return(
<div key={i} style={{fontSize:13,color:C.text2,display:"flex",gap:8,alignItems:"center"}}>
<span>{tips2[i].e}</span><span style={{fontWeight:600,color:C.text}}>{tips2[i].t}</span>
</div>
);})}
</div>
</div>
)}
{!pro&&(
<div style={{position:"relative"}}>
<div style={{filter:"blur(5px)",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",WebkitMaskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)",maskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)"}}>
<div style={{fontSize:13,fontWeight:800,color:C.text2,letterSpacing:"1px",textTransform:"uppercase",paddingLeft:2,marginBottom:14}}>{t("🎓 Deeper Learning","🎓 Aprendizaje Profundo")}</div>
{[["🧠",t("Reading People","Leyendo a la Gente"),t("Simple psychology you can use right now","Psicología simple que puedes usar ahora mismo")],["🔥",t("Handling Difficult Situations","Manejando Situaciones Difíciles"),t("What to say when things go wrong","Qué decir cuando las cosas salen mal")],["💰",t("The Science of Tipping","La Ciencia de las Propinas"),t("Why people tip — and how to make it happen","Por qué la gente da propina — y cómo lograrlo")],["📋",t("Recovery Scripts","Guiones de Recuperación"),t("Exactly what to say when there's a problem","Exactamente qué decir cuando hay un problema")],["🗺️",t("Know Your Delivery","Conoce Tu Entrega"),t("Different situations need different approaches","Diferentes situaciones necesitan diferentes enfoques")],["🏆",t("Staying Sharp","Mantente Alerta"),t("How to keep earning more over the long run","Cómo seguir ganando más a largo plazo")],["🚪",t("At The Door","En La Puerta"),t("Small habits that change how customers see you","Pequeños hábitos que cambian cómo te ven los clientes")]].map(([e,tt,s],i)=>(
<div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:18,padding:"16px 18px",marginBottom:12}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:44,height:44,borderRadius:13,background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{e}</div>
<div style={{flex:1}}><div style={{fontSize:15,fontWeight:700}}>{tt}</div><div style={{fontSize:13,color:C.text2,marginTop:2}}>{s}</div></div>
<div style={{color:C.text3,fontSize:13}}>▾</div>
</div>
</div>
))}
</div>
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"linear-gradient(180deg,rgba(7,8,10,0) 0%,rgba(7,8,10,0.6) 20%,rgba(7,8,10,0.97) 40%)",borderRadius:16,padding:"20px 16px"}}>
<div className="border-pulse" style={{borderRadius:22,padding:"24px 20px",textAlign:"center",background:"linear-gradient(160deg,#0f0d00,#0d0f13)",border:"1px solid rgba(245,166,35,0.35)",width:"100%",position:"relative"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.amber},transparent)`}}/>
<div style={{fontSize:44,marginBottom:12}}>🎓</div>
<div style={{fontSize:19,fontWeight:900,marginBottom:8,background:`linear-gradient(135deg,${C.text} 20%,${C.amber})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t("Unlock Deeper Learning","Desbloquear Aprendizaje Profundo")}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.75,marginBottom:16}}>{t("The free tips are just the start. Elite unlocks the full psychology playbook — why people tip, how to handle upset customers, what top earners do differently, and science-backed scripts for every moment.","Los consejos gratis son solo el inicio. Elite desbloquea el manual completo de psicología — por qué la gente da propina, cómo manejar clientes molestos, qué hacen diferente los que más ganan, y guiones respaldados por ciencia para cada momento.")}</div>
<div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18,textAlign:"left"}}>
{[["🧠",t("Reading people — psychology you can use at every door","Leer a la gente — psicología para cada puerta")],["🔥",t("De-escalation — exactly what to say when someone's upset","Desescalada — exactamente qué decir cuando alguien está molesto")],["💰",t("Tip science — the research behind what makes people tip","Ciencia de propinas — la investigación detrás de lo que hace que la gente dé propina")],["📋",t("Recovery scripts — cold food, missing items, your mistakes","Guiones de recuperación — comida fría, artículos faltantes, tus errores")],["🗺️",t("Delivery situations — apartments, hotels, grocery vs food","Situaciones de entrega — apartamentos, hoteles, mercado vs comida")],["🏆",t("Staying sharp — burnout, mindset, long-term consistency","Mantente alerta — agotamiento, mentalidad, consistencia a largo plazo")]].map(([e,f],i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(245,166,35,0.06)",borderRadius:9,padding:"9px 12px",border:"1px solid rgba(245,166,35,0.12)"}}>
<span style={{fontSize:14,flexShrink:0}}>{e}</span>
<span style={{fontSize:12,color:C.text2}}>{f}</span>
</div>
))}
</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,background:`linear-gradient(135deg,${C.amber},${C.amberD},${C.amberL})`,borderRadius:C.r.lg,padding:"16px",fontSize:15,width:"100%",letterSpacing:0}}>{t("Unlock Elite Access — $10","Desbloquear Acceso Elite — $10")}</button>
<div style={{fontSize:12,color:C.text3,marginTop:9}}>{t("Lifetime access · Free updates forever","Acceso de por vida · Actualizaciones gratis para siempre")}</div>
</div>
</div>
</div>
)}
</div>
)}
{!shiftMode&&tab==="templates"&&(
<div className="page" style={{padding:16,display:"flex",flexDirection:"column",gap:20}}>
<div style={{textAlign:"center",padding:"8px 0 4px"}}>
<div style={{fontSize:13,fontWeight:800,color:C.blue,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:6}}>{t("Message Templates","Plantillas de Mensajes")}</div>
<div style={{...S.pageTitle}}>{t("What to Say & When","Qué Decir y Cuándo")}</div>
<div style={{fontSize:13,color:C.text2,marginTop:4,lineHeight:1.6}}>{t("Ready-to-send messages for every situation.","Mensajes listos para enviar para cada situación.")}</div>
</div>
{!pro&&(
<div style={{display:"flex",flexDirection:"column",gap:12}}>
<div style={{fontSize:13,fontWeight:800,color:C.green,letterSpacing:"1px",textTransform:"uppercase",paddingLeft:2}}>{t("✅ Free scripts","✅ Mensajes gratis")}</div>
<div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden"}}>
<div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
<div style={{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{ACTIVE_MSG_CATS[0].e}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{ACTIVE_MSG_CATS[0].t}</div><div style={{fontSize:13,color:C.text2,marginTop:1}}>{ACTIVE_MSG_CATS[0].sub}</div></div>
</div>
<div style={{padding:"0 12px 12px",display:"flex",flexDirection:"column",gap:10}}>
{ACTIVE_MSG_CATS[0].secs.slice(0,2).map((sec,si)=>{
const subKey=`0-${si}`;
const subOpen2=subOpen===subKey;
const fav=favTemplates.has(subKey);
return(
<div key={si} style={{background:sec.caution?"rgba(244,63,94,0.06)":C.s2,border:`1px solid ${sec.caution?"rgba(244,63,94,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:14,overflow:"hidden"}}>
<div onClick={()=>setSubOpen(subOpen2?null:subKey)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
<div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
{sec.caution&&<span style={{fontSize:13}}>⚠️</span>}
<span style={{fontSize:13,fontWeight:700,color:sec.caution?C.red:C.text}}>{sec.h}</span>
</div>
<button aria-label={fav?t("Remove from saved templates","Quitar de plantillas guardadas"):"Save template"} onClick={e=>{e.stopPropagation();toggleFavTemplate(subKey);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,padding:"2px 6px",color:fav?C.amber:"rgba(255,255,255,0.2)",flexShrink:0}}>
{fav?"★":"☆"}
</button>
<div style={{color:C.text3,fontSize:13,transition:"transform 0.18s",transform:subOpen2?"rotate(180deg)":"none",flexShrink:0}}>▾</div>
</div>
{subOpen2&&(
<div style={{padding:"0 14px 14px"}}>
{sec.hint&&<div style={{background:"rgba(245,166,35,0.08)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:8,padding:"8px 10px",marginBottom:8,fontSize:12,color:C.amber,lineHeight:1.5}}>💡 {sec.hint}</div>}
<div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"11px 13px",marginBottom:10,fontSize:12,color:sec.caution?C.red:C.text,lineHeight:1.65,whiteSpace:"pre-wrap",fontFamily:C.mono}}>{sec.msg}</div>
{!sec.caution&&(
<button onClick={()=>copyMsg(sec.msg,subKey)} style={{background:C.green,border:"none",borderRadius:10,padding:"10px 14px",fontSize:12,fontWeight:700,cursor:"pointer",color:"#000",width:"100%",marginBottom:8}}>{t("Copy Message","Copiar Mensaje")}</button>
)}
<div style={{fontSize:13,color:C.text3,lineHeight:1.6,background:"rgba(59,130,246,0.06)",borderRadius:8,padding:"8px 10px",borderLeft:"2px solid rgba(59,130,246,0.3)"}}>{sec.w}</div>
</div>
)}
</div>
);
})}
{ACTIVE_MSG_CATS[0].secs.slice(2).map((sec,si)=>(
<div key={`l${si}`} onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{background:C.s2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,opacity:0.45}}>
<span style={{fontSize:13,fontWeight:700,color:C.text}}>{sec.h}</span>
<span style={{fontSize:11,fontWeight:700,color:C.amber,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:6,padding:"3px 8px",flexShrink:0}}>Elite</span>
</div>
))}
</div>
</div>
</div>
)}
{!pro?(
<div style={{position:"relative"}}>
<div style={{filter:"blur(5px)",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",WebkitMaskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)",maskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)"}}>
<div style={{background:C.s1,border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"11px 12px 11px 36px",color:C.text3,fontSize:13,marginBottom:14}}>{t("Search templates...","Buscar plantillas...")}</div>
{ACTIVE_MSG_CATS.slice(1).map((cat,i)=>(
<div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:18,padding:"14px 16px",marginBottom:12}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{cat.e}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{cat.t}</div><div style={{fontSize:13,color:C.text2,marginTop:1}}>{cat.sub}</div></div>
<div style={{color:C.text3,fontSize:13}}>▾</div>
</div>
</div>
))}
</div>
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"linear-gradient(180deg,rgba(7,8,10,0) 0%,rgba(7,8,10,0.6) 18%,rgba(7,8,10,0.97) 38%)",borderRadius:16,padding:"20px 16px"}}>
<div style={{borderRadius:22,padding:"24px 20px",textAlign:"center",background:"linear-gradient(160deg,#030c1a,#0d0f13)",border:`1px solid rgba(59,130,246,0.35)`,width:"100%",position:"relative",animation:"defenderPulse 2.4s ease-in-out infinite"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.blue},transparent)`}}/>
<div style={{fontSize:44,marginBottom:12}}>💬</div>
<div style={{fontSize:19,fontWeight:900,marginBottom:8,background:`linear-gradient(135deg,${C.text} 20%,${C.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t("30 Ready-to-Send Scripts","30 Mensajes Listos para Enviar")}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.75,marginBottom:16}}>{t("Stop guessing what to say. Every situation you'll face — from running late to gate codes to upset customers — has a proven script ready for you.","Deja de adivinar qué decir. Cada situación que enfrentes — desde llegar tarde hasta códigos de puerta y clientes molestos — tiene un guion probado listo para ti.")}</div>
<div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18,textAlign:"left"}}>
{[["📲",t("Arrival texts that get 5-star ratings before you knock","Textos de llegada que consiguen 5 estrellas antes de tocar")],["⏰",t("Late delivery messages that flip frustration into forgiveness","Mensajes de retraso que convierten frustración en perdón")],["🚨",t("Problem scripts — wrong address, gate codes, no answer","Guiones para problemas — dirección incorrecta, códigos, sin respuesta")],["⭐",t("What to say (and never say) to earn better tips","Qué decir (y qué nunca decir) para ganar mejores propinas")],["🏢",t("Scripts for hotels, gated communities & offices","Guiones para hoteles, comunidades cerradas y oficinas")]].map(([e,f],i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(59,130,246,0.07)",borderRadius:9,padding:"9px 12px",border:"1px solid rgba(59,130,246,0.13)"}}>
<span style={{fontSize:14,flexShrink:0}}>{e}</span>
<span style={{fontSize:12,color:C.text2}}>{f}</span>
</div>
))}
</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{background:`linear-gradient(135deg,${C.blue},#1d4ed8)`,border:"none",borderRadius:C.r.lg,padding:"16px",fontSize:15,fontWeight:900,cursor:"pointer",width:"100%",color:"#fff",fontFamily:C.sans,boxShadow:C.sh.accent(C.blue),transition:`transform 0.25s ${C.ease.out}, box-shadow 0.25s ${C.ease.out}`,WebkitTapHighlightColor:"transparent"}}>{t("Unlock Elite Access — $10","Desbloquear Acceso Elite — $10")}</button>
<div style={{fontSize:12,color:C.text3,marginTop:9}}>{t("Lifetime access · Free updates forever","Acceso de por vida · Actualizaciones gratis para siempre")}</div>
</div>
</div>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:20}}>
<div style={{position:"relative"}}>
<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:C.text3,pointerEvents:"none"}}>🔍</span>
<input value={searchDisplay} onChange={e=>{setMsgOpen(null);setSubOpen(null);handleSearchChange(e.target.value);}} placeholder={t("Search templates...","Buscar plantillas...")} style={{background:C.s1,border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"11px 12px 11px 36px",color:C.text,fontSize:13,width:"100%"}}/>
{searchDisplay&&<button onClick={()=>{setSearchDisplay("");setTemplateSearch("");}} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.text3,cursor:"pointer",fontSize:16}}>✕</button>}
</div>
{favTemplates.size>0&&!templateSearch&&(
<div style={{background:C.s1,border:`1px solid rgba(245,166,35,0.2)`,borderRadius:14,padding:"12px 14px"}}>
<div style={{fontSize:13,fontWeight:800,color:C.amber,marginBottom:8}}>{t("★ Saved Templates","★ Plantillas Guardadas")}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
{[...favTemplates].map(key=>{
const [ci,si]=key.split("-").map(Number);
const sec=ACTIVE_MSG_CATS[ci]?.secs[si];
if(!sec) return null;
return(
<button key={key} onClick={()=>{setMsgOpen(ci);setSubOpen(key);setTemplateSearch("");}}
style={{background:"rgba(245,166,35,0.08)",border:"1px solid rgba(245,166,35,0.2)",borderRadius:8,padding:"5px 10px",fontSize:13,fontWeight:600,color:C.amber,cursor:"pointer"}}>
{sec.h}
</button>
);
})}
</div>
</div>
)}
{filteredCats.length===0&&(
<div style={{textAlign:"center",padding:"32px 16px",color:C.text3,fontSize:13}}>No templates match "{templateSearch}"</div>
)}
{filteredCats.map((cat,ci)=>{
const realCi=ACTIVE_MSG_CATS.indexOf(cat);
const isFreeCat=cat.t===ACTIVE_MSG_CATS[0].t;
const catOpen=msgOpen===realCi||!!templateSearch;
return(
<div key={ci} style={{background:C.s1,border:`1px solid ${catOpen&&!templateSearch?"rgba(59,130,246,0.3)":C.border}`,borderRadius:18,overflow:"hidden"}}>
<div onClick={()=>{if(!pro&&!isFreeCat){setShowPay(true);setPayStep("offer");return;}if(!templateSearch){setMsgOpen(catOpen?null:realCi);setSubOpen(null);}}} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div style={{width:40,height:40,borderRadius:12,background:catOpen?"rgba(59,130,246,0.12)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{cat.e}</div>
<div style={{flex:1}}>
<div style={{fontSize:14,fontWeight:700}}>{cat.t}</div>
<div style={{fontSize:13,color:C.text2,marginTop:1}}>{cat.sub}</div>
</div>
{(!pro&&!isFreeCat)?<span style={{fontSize:14}}>🔒</span>:(!templateSearch&&<div style={{color:C.text3,fontSize:12,transition:"transform 0.18s",transform:catOpen?"rotate(180deg)":"none"}}>▾</div>)}
</div>
{(catOpen)&&(
<div style={{padding:"0 12px 12px",display:"flex",flexDirection:"column",gap:10}}>
{cat.secs.map((sec,si)=>{
const realSi=ACTIVE_MSG_CATS[realCi]?.secs?.indexOf(sec);
const subKey=`${realCi}-${realSi}`;
if(!pro&&!isFreeCat) return(
<div key={si} onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{background:C.s2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"flex-start",gap:10,opacity:0.45}}>
<div style={{flex:1}}>
<div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>{sec.h}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.5,fontStyle:"italic"}}>"{sec.msg.split('\n')[0].substring(0,60)}..."</div>
</div>
<span style={{fontSize:12,fontWeight:700,color:C.amber,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:6,padding:"3px 8px",flexShrink:0}}>Elite</span>
</div>
);
const subOpen2=subOpen===subKey;
const fav=favTemplates.has(subKey);
return(
<div key={si} style={{background:sec.caution?"rgba(244,63,94,0.06)":C.s2,border:`1px solid ${sec.caution?"rgba(244,63,94,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:14,overflow:"hidden"}}>
<div onClick={()=>setSubOpen(subOpen2?null:subKey)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
<div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
{sec.caution&&<span style={{fontSize:13}}>⚠️</span>}
<span style={{fontSize:13,fontWeight:700,color:sec.caution?C.red:C.text}}>{sec.h}</span>
</div>
<button aria-label={fav?t("Remove from saved templates","Quitar de plantillas guardadas"):"Save template"} onClick={e=>{e.stopPropagation();toggleFavTemplate(subKey);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,padding:"2px 6px",color:fav?C.amber:"rgba(255,255,255,0.2)",flexShrink:0}}>
{fav?"★":"☆"}
</button>
<div style={{color:C.text3,fontSize:13,transition:"transform 0.18s",transform:subOpen2?"rotate(180deg)":"none",flexShrink:0}}>▾</div>
</div>
{subOpen2&&(
<div style={{padding:"0 14px 14px"}}>
{sec.hint&&<div style={{background:"rgba(245,166,35,0.08)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:8,padding:"8px 10px",marginBottom:8,fontSize:12,color:C.amber,lineHeight:1.5}}>💡 {sec.hint}</div>}
<div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"11px 13px",marginBottom:10,fontSize:12,color:sec.caution?C.red:C.text,lineHeight:1.65,whiteSpace:"pre-wrap",fontFamily:C.mono}}>{sec.msg}</div>
{!sec.caution&&(
<button onClick={()=>copyMsg(sec.msg,subKey)} style={{background:C.green,border:"none",borderRadius:10,padding:"10px 14px",fontSize:12,fontWeight:700,cursor:"pointer",color:"#000",width:"100%",marginBottom:8}}>{t("Copy Message","Copiar Mensaje")}</button>
)}
<div style={{fontSize:13,color:C.text3,lineHeight:1.6,background:"rgba(59,130,246,0.06)",borderRadius:8,padding:"8px 10px",borderLeft:"2px solid rgba(59,130,246,0.3)"}}>{sec.w}</div>
</div>
)}
</div>
);
})}
</div>
)}
</div>
);
})}
</div>
)}
</div>
)}
{!shiftMode&&tab==="defend"&&(
<div className="page" style={{padding:16,display:"flex",flexDirection:"column",gap:20}}>
<div style={{textAlign:"center",padding:"8px 0 4px"}}>
<div style={{fontSize:13,fontWeight:800,color:C.red,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:6}}>{t("Account Defense","Defensa de Cuenta")}</div>
<div style={{...S.pageTitle}}>{t("Protect Your Account","Protege Tu Cuenta")}</div>
<div style={{fontSize:13,color:C.text2,marginTop:4,lineHeight:1.6}}>{t("Habits, appeal scripts, checklists, and notes — by platform.","Hábitos, cartas de apelación, listas y notas — por plataforma.")}</div>
</div>
{(()=>{
const sevColor={high:C.red,medium:C.amber,low:C.green};
const previewUpdate=pick(lang,POLICY_WATCH,POLICY_WATCH_ES).updates[0];
const newCount=pick(lang,POLICY_WATCH,POLICY_WATCH_ES).updates.filter(u=>u.isNew).length;
return(
<div style={{background:"rgba(244,63,94,0.06)",border:`1px solid ${pro?"rgba(244,63,94,0.35)":"rgba(244,63,94,0.18)"}`,borderRadius:18,overflow:"hidden"}}>
<div style={{padding:"14px 16px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(244,63,94,0.12)"}}>
<div>
<div style={{fontSize:11,fontWeight:800,color:C.red,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:2,display:"flex",alignItems:"center",gap:6}}>
<span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 0 4px rgba(16,185,129,0.18)"}} />{t("📡 Policy Watch","📡 Cambios de Política")}</div>
<div style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{fontSize:13,color:C.text2}}>{pick(lang,POLICY_WATCH,POLICY_WATCH_ES).month} · {t("Last updated","Última actualización")}{" "}{pick(lang,POLICY_WATCH,POLICY_WATCH_ES).lastUpdated}</span>
{newCount>0&&<span style={{background:"rgba(245,166,35,0.15)",border:"1px solid rgba(245,166,35,0.35)",borderRadius:6,padding:"2px 7px",fontSize:10,fontWeight:800,color:C.amber}}>{newCount}{" "}{t("new","nuevas")}</span>}
</div>
</div>
{pro?(
<div style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:800,color:C.green}}>Included</div>
):(
<div style={{background:"rgba(244,63,94,0.1)",border:"1px solid rgba(244,63,94,0.25)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:800,color:C.red}}>Elite</div>
)}
</div>
{pro?(
/* Elite — show all updates */
<div style={{display:"flex",flexDirection:"column",gap:0}}>
<div style={{padding:"10px 16px 4px",fontSize:12,color:C.text2,lineHeight:1.5}}>{t("What changed this month across your platforms — and what to do about it.","Lo que cambió este mes en tus plataformas — y qué hacer al respecto.")}</div>
{pick(lang,POLICY_WATCH,POLICY_WATCH_ES).updates.map((u,i)=>(
<div key={i} style={{padding:"14px 16px",borderBottom:i<pick(lang,POLICY_WATCH,POLICY_WATCH_ES).updates.length-1?"1px solid rgba(244,63,94,0.08)":"none"}}>
<div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
<div style={{display:"flex",alignItems:"center",gap:4,background:`${u.color}12`,border:`1px solid ${u.color}30`,borderRadius:6,padding:"3px 8px"}}>
<span style={{fontSize:11}}>{u.e}</span>
<span style={{fontSize:11,fontWeight:700,color:u.color}}>{u.label}</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:6,background:`${sevColor[u.severity]}12`,border:`1px solid ${sevColor[u.severity]}30`,borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:700,color:sevColor[u.severity]}}>
<span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:sevColor[u.severity]}} />
{u.category}
</div>
{u.isNew&&<div style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:800,color:"#10B981"}}>{t("New","Nuevo")}</div>}
</div>
<div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:6}}>{u.title}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.65}}>{u.body}</div>
{u.action&&(
<div style={{marginTop:10,background:"rgba(244,63,94,0.07)",borderLeft:`3px solid ${C.red}`,borderRadius:8,padding:"10px 12px"}}>
<div style={{fontSize:11,fontWeight:800,color:C.red,letterSpacing:"1px",textTransform:"uppercase",marginBottom:4}}>→ What to do</div>
<div style={{fontSize:13,color:C.text,lineHeight:1.55}}>{u.action}</div>
</div>
)}
{u.source&&(
<div style={{marginTop:8,fontSize:11,color:C.text3}}>Source · {u.source}</div>
)}
</div>
))}
</div>
):(
/* Not Elite — teaser + CTA */
<div>
<div style={{padding:"14px 16px",filter:"blur(4px)",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",WebkitMaskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)",maskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)"}}>
<div style={{display:"flex",gap:6,marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:4,background:`${previewUpdate.color}12`,border:`1px solid ${previewUpdate.color}30`,borderRadius:6,padding:"3px 8px"}}>
<span style={{fontSize:11}}>{previewUpdate.e}</span>
<span style={{fontSize:11,fontWeight:700,color:previewUpdate.color}}>{previewUpdate.label}</span>
</div>
<div style={{background:`${sevColor[previewUpdate.severity]}12`,border:`1px solid ${sevColor[previewUpdate.severity]}30`,borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:700,color:sevColor[previewUpdate.severity]}}>{previewUpdate.category}</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:6}}>{previewUpdate.title}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.65}}>{previewUpdate.body.substring(0,80)}...</div>
</div>
<div style={{padding:"14px 16px",borderTop:"1px solid rgba(244,63,94,0.12)"}}>
<div style={{fontSize:13,color:C.text2,marginBottom:12,lineHeight:1.5}}>{t("Platform policies change without warning. Policy Watch tracks what changed, what it means for your account, and what to do — updated every month. Included with Elite.","Las políticas cambian sin aviso. Policy Watch rastrea qué cambió, qué significa para tu cuenta y qué hacer — actualizado cada mes. Incluido con Elite.")}</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"14px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>
{t("Unlock Elite — $10 one time","Desbloquear Elite — $10 una vez")}
</button>
<div style={{fontSize:11,color:C.text3,textAlign:"center",marginTop:8}}>{t("One-time · Lifetime access · All platforms covered","Una vez · Acceso de por vida · Todas las plataformas incluidas")}</div>
</div>
</div>
)}
</div>
);
})()}
{!pro?(
<div style={{display:"flex",flexDirection:"column",gap:12}}>
<div style={{fontSize:13,fontWeight:800,color:C.green,letterSpacing:"1px",textTransform:"uppercase",paddingLeft:2}}>{t("🛡️ Free protection habits","🛡️ Hábitos de protección gratis")}</div>
{[
{e:"📸",t:t("Photo every drop-off before you leave","Foto de cada entrega antes de irte"),d:t("A timestamped photo proves the order arrived in good condition. If a customer claims non-delivery, this is your strongest evidence.","Una foto con hora demuestra que el pedido llegó en buen estado. Si un cliente reclama no haberlo recibido, esta es tu mejor evidencia."),urgent:true},
{e:"💬",t:t("Text the customer on every order","Envía mensaje al cliente en cada pedido"),d:t("One quick text — 'on my way' or 'left at your door' — creates a written record and makes false complaints much harder to stick.","Un mensaje rápido — 'en camino' o 'dejado en tu puerta' — crea un registro escrito y hace que las quejas falsas sean mucho más difíciles de sostener."),urgent:true},
{e:"📍",t:t("Keep GPS on the entire shift","Mantén el GPS encendido todo el turno"),d:t("Location history proves you were at the drop-off address at the right time. Turn it off and you lose your alibi.","El historial de ubicación demuestra que estuviste en la dirección de entrega a la hora correcta. Si lo apagas, pierdes tu coartada."),urgent:true},
{e:"🖼️",t:t("Screenshot your delivery confirmation","Captura tu confirmación de entrega"),d:t("Save the app's confirmation screen after every delivery. If the platform's records glitch, your screenshot is the backup.","Guarda la pantalla de confirmación de la app después de cada entrega. Si los registros de la plataforma fallan, tu captura es el respaldo.")},
{e:"💎",t:t("Doing your best always pays off","Dar lo mejor siempre vale la pena"),d:t("Consistent care — hot food hot, careful handling, warm attitude — is what turns one-time orders into loyal tippers and 5-star streaks.","El cuidado constante — comida caliente, manejo cuidadoso, actitud amable — es lo que convierte pedidos únicos en clientes fieles y rachas de 5 estrellas.")},
{e:"📋",t:t("Note the order number on problem deliveries","Anota el número de orden en entregas problemáticas"),d:t("When anything goes wrong, write down the order number, time, and what happened. Appeals without specifics almost never win.","Cuando algo sale mal, anota el número de orden, la hora y lo que pasó. Las apelaciones sin detalles casi nunca ganan.")},
].map((h,i)=>{
const hLocked=!pro&&i>=3;
return(
<div key={i} onClick={hLocked?()=>{setShowPay(true);setPayStep("offer");}:undefined} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,padding:"15px 16px",marginBottom:12,opacity:hLocked?0.55:1,cursor:hLocked?"pointer":"default"}}>
<div style={{display:"flex",alignItems:"flex-start",gap:12}}>
<div style={{width:40,height:40,borderRadius:12,background:h.urgent?"rgba(244,63,94,0.12)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{h.e}</div>
<div style={{flex:1}}>
{h.urgent&&<span style={{fontSize:12,fontWeight:800,color:C.red,background:"rgba(244,63,94,0.12)",borderRadius:4,padding:"2px 6px",marginBottom:4,display:"inline-block"}}>{t("CRITICAL","CRÍTICO")}</span>}
<div style={{fontSize:14,fontWeight:700,marginBottom:5,marginTop:h.urgent?4:0}}>{h.t}</div>
{hLocked?(
<div style={{marginTop:8}}><span style={{fontSize:11,fontWeight:700,color:C.amber,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:6,padding:"3px 8px"}}>Elite</span></div>
):(
<div style={{fontSize:13,color:C.text2,lineHeight:1.6}}>{h.d}</div>
)}
</div>
</div>
</div>
);})}
<div style={{background:"linear-gradient(160deg,#0e0a1a,#0d0f13)",border:"1px solid rgba(244,63,94,0.35)",borderRadius:18,padding:"22px 20px",textAlign:"center"}}>
<div style={{fontSize:38,marginBottom:10}}>🛡️</div>
<div style={{fontSize:16,fontWeight:900,marginBottom:6}}>{t("Want the full defense kit?","¿Quieres el kit de defensa completo?")}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.6,marginBottom:14}}>{t("Word-for-word appeal letters, per-platform checklists, and a private notes log — for DoorDash, Uber Eats, Spark, Instacart & Flex.","Cartas de apelación palabra por palabra, listas por plataforma y un registro privado de notas — para DoorDash, Uber Eats, Spark, Instacart y Flex.")}</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"14px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>{t("Unlock Elite — $10 one time","Desbloquear Elite — $10 una vez")}</button>
<div style={{fontSize:11,color:C.text3,marginTop:8}}>{t("One-time · Lifetime access · Free updates forever","Una vez · Acceso de por vida · Actualizaciones gratis para siempre")}</div>
</div>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:20}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
{PLATFORMS_DEFEND.map((p,pi)=>{
const active=defPlatform===p.id;
return(
<button key={p.id} className={`card-in c${pi}`} onClick={()=>selectPlatform(p.id)}
style={{background:active?`linear-gradient(135deg,${p.color}20,${p.color}0A)`:C.s1,border:`1.5px solid ${active?p.color:"rgba(255,255,255,0.07)"}`,borderRadius:18,padding:"18px 12px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:10,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",boxShadow:active?`inset 0 1px 0 rgba(255,255,255,0.05),0 0 0 1px ${p.color}30,0 4px 18px ${p.color}40,0 14px 36px ${p.color}33,0 28px 64px ${p.color}1f,0 4px 20px rgba(0,0,0,0.25)`:"inset 0 1px 0 rgba(255,255,255,0.03),0 2px 8px rgba(0,0,0,0.2)",WebkitTapHighlightColor:"transparent"}}>
<div style={{width:52,height:52,borderRadius:16,background:`linear-gradient(135deg,${p.color},${p.color}99)`,boxShadow:active?`0 0 0 1px ${p.color}40,0 4px 14px ${p.color}66,0 14px 32px ${p.color}55,0 24px 56px ${p.color}22`:`0 4px 12px ${p.color}40,0 12px 28px ${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:900,color:"#fff",fontFamily:C.sans,transition:"box-shadow 0.25s cubic-bezier(0.22,1,0.36,1)"}}>{p.label[0]}</div>
<div style={{textAlign:"center"}}>
<div style={{fontSize:13,fontWeight:800,color:active?p.color:C.text,lineHeight:1.2}}>{p.label}</div>
{active&&<div style={{fontSize:10,fontWeight:700,color:p.color,marginTop:3,letterSpacing:"0.5px",textTransform:"uppercase",opacity:0.8}}>{t("Selected","Seleccionado")}</div>}
</div>
</button>
);
})}
</div>
{defPlatform&&(()=>{
const plat=pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===defPlatform);
const habits=pick(lang,PLATFORM_HABITS,PLATFORM_HABITS_ES)[defPlatform]||[];
const appeals=pick(lang,PLATFORM_APPEALS,PLATFORM_APPEALS_ES)[defPlatform]||[];
return(
<div style={{display:"flex",flexDirection:"column",gap:12,animation:"slideUp 0.3s cubic-bezier(0.22,1,0.36,1)"}}>
<div style={{display:"flex",gap:6,background:C.s1,borderRadius:12,padding:4}}>
{[["habits","🛡️ Habits"],["appeals","📋 Appeals"],["checklist","✅ Checklist"],["notes","📝 Notes"]].map(([id,label])=>(
<button key={id} onClick={()=>setDefSection(id)} style={{flex:1,background:defSection===id?plat.color:"transparent",border:"none",borderRadius:9,padding:"9px 2px",fontSize:12,fontWeight:700,cursor:"pointer",color:defSection===id?"#000":C.text3,transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",boxShadow:defSection===id?`0 0 0 1px ${plat.color}40,0 0 14px ${plat.color}55,0 0 32px ${plat.color}33`:"none"}}>{label}</button>
))}
</div>
{defSection==="habits"&&habits.map((h,i)=>(
<div key={i} className={`card-in c${Math.min(i,9)}`} style={{background:h.urgent?"rgba(244,63,94,0.06)":C.s1,border:`1px solid ${h.urgent?"rgba(244,63,94,0.25)":C.border}`,borderLeft:h.urgent?`3px solid ${C.red}`:`1px solid ${C.border}`,borderRadius:14,padding:"15px 16px"}}>
<div style={{display:"flex",alignItems:"flex-start",gap:12}}>
<div style={{width:40,height:40,borderRadius:12,background:h.urgent?"rgba(244,63,94,0.12)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{h.e}</div>
<div style={{flex:1}}>
{h.urgent&&<div style={{fontFamily:C.display,fontSize:11,fontWeight:800,color:C.red,letterSpacing:"1.6px",marginBottom:4}}>{t("CRITICAL","CRÍTICO")}</div>}
<div style={{fontSize:14,fontWeight:700,marginBottom:5}}>{h.t}</div>
<p style={{fontSize:13,color:C.text2,lineHeight:1.75,margin:0}}>{h.why}</p>
</div>
</div>
</div>
))}
{defSection==="appeals"&&appeals.map((ap,ai)=>{
const apOpen=appealOpen===ai;
return(
<div key={ai} className={`card-in c${Math.min(ai,9)}`} style={{background:C.s1,border:`1px solid ${apOpen?ap.color+"50":C.border}`,borderRadius:16,overflow:"hidden",transition:"border-color 0.18s"}}>
<div onClick={()=>{setAppealOpen(apOpen?null:ai);setAppealSub(null);}} style={{padding:"15px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
<span style={{fontSize:22}}>{ap.e}</span>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{ap.t}</div><div style={{fontSize:12,fontWeight:700,color:ap.color,marginTop:3}}>{ap.urgency}</div></div>
<div style={{color:C.text3,fontSize:13,transition:"transform 0.18s",transform:apOpen?"rotate(180deg)":"none"}}>▾</div>
</div>
{apOpen&&(
<div style={{padding:"0 12px 12px",display:"flex",flexDirection:"column",gap:10,animation:"slideUp 0.25s cubic-bezier(0.22,1,0.36,1)"}}>
{ap.secs.map((sec,si)=>{
const subKey=`ap${ai}-${si}`;
const subOpen2=appealSub===subKey;
return(
<div key={si} style={{background:C.s2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,overflow:"hidden"}}>
<div onClick={()=>setAppealSub(subOpen2?null:subKey)} style={{padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<span style={{fontSize:13,fontWeight:700}}>{sec.h}</span>
<div style={{color:C.text3,fontSize:12,transition:"transform 0.18s",transform:subOpen2?"rotate(180deg)":"none",flexShrink:0}}>▾</div>
</div>
{subOpen2&&(()=>{
const isFilling=fillKey===subKey;
const phs=getPlaceholders(sec.msg);
const hasPhs=phs.length>0;
const preview=isFilling?applyFill(sec.msg,fillVals):sec.msg;
return(
<div style={{padding:"0 14px 14px",animation:"slideUp 0.2s cubic-bezier(0.22,1,0.36,1)"}}>
{sec.timing&&<div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(245,166,35,0.08)",border:"1px solid rgba(245,166,35,0.2)",borderRadius:8,padding:"7px 10px",marginBottom:10,fontSize:12,color:C.amber,fontWeight:600}}>🕐 {sec.timing}</div>}
<div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"12px 13px",marginBottom:10,fontSize:12,color:C.text,lineHeight:1.75,whiteSpace:"pre-wrap",fontFamily:C.mono}}>{preview}</div>
{hasPhs&&!isFilling&&(
<button onClick={()=>{setFillKey(subKey);setFillVals({});}} style={{background:`${ap.color}15`,border:`1px solid ${ap.color}40`,borderRadius:10,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:ap.color,width:"100%",marginBottom:8}}>{t("✏️ Fill In & Copy","✏️ Completa y Copia")}</button>
)}
{hasPhs&&isFilling&&(
<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"14px",marginBottom:10}}>
<div style={{fontSize:12,fontWeight:800,color:C.text2,marginBottom:10,letterSpacing:"0.5px",textTransform:"uppercase"}}>{t("Fill in your details","Completa tus datos")}</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{phs.map(ph=>(
<div key={ph}>
<div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:4}}>{ph}</div>
<input value={fillVals[ph]||""} onChange={e=>setFillVals(v=>({...v,[ph]:e.target.value}))} placeholder={`Enter ${ph.toLowerCase()}...`} style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"12px 12px",color:C.text,fontSize:16,width:"100%"}}/>
</div>
))}
</div>
<div style={{display:"flex",gap:8,marginTop:12}}>
<button onClick={()=>{copyMsg(applyFill(sec.msg,fillVals),subKey);setFillKey(null);}} style={{background:C.green,border:"none",borderRadius:10,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:"#000",flex:1}}>{t("Copy Filled Letter","Copiar Carta Completa")}</button>
<button onClick={()=>setFillKey(null)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:C.text3}}>✕</button>
</div>
</div>
)}
{(!hasPhs||!isFilling)&&<button onClick={()=>copyMsg(sec.msg,subKey)} style={{background:C.green,border:"none",borderRadius:10,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:"#000",width:"100%",marginBottom:8}}>{copied===subKey?t("✓ Copied!","✓ ¡Copiado!"):t("Copy Appeal Script","Copiar Guion de Apelación")}</button>}
<div style={{fontSize:12,color:C.text3,lineHeight:1.6,background:`${ap.color}08`,borderRadius:8,padding:"9px 11px",borderLeft:`2px solid ${ap.color}40`}}>{sec.w}</div>
</div>
);
})()}
</div>
);
})}
</div>
)}
</div>
);
})}
{defSection==="checklist"&&(
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{checks.length>0&&(()=>{
const done=checks.filter(c=>c.done).length;
const pct=Math.round(done/checks.length*100);
const col=pct>=100?C.green:pct>=60?C.amber:C.red;
return(
<div style={{background:`${col}0D`,border:`1px solid ${col}30`,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
<div style={{width:52,height:52,borderRadius:"50%",background:`conic-gradient(${col} 0deg, ${col}cc ${pct*3.6}deg, rgba(255,255,255,0.06) ${pct*3.6}deg)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 0 1px ${col}25,0 0 24px ${col}40,0 0 56px ${col}1f`}}>
<div style={{width:38,height:38,borderRadius:"50%",background:C.s1,display:"flex",alignItems:"center",justifyContent:"center"}}>
<span style={{fontSize:13,fontWeight:900,color:col}}>{pct}%</span>
</div>
</div>
<div>
<div style={{fontSize:14,fontWeight:800,color:col}}>{pct>=100?"Fully Protected":"Safety Score"}</div>
<div style={{fontSize:12,color:C.text3,marginTop:2}}>{done} of {checks.length} habits done this delivery</div>
</div>
</div>
);
})()}
<div style={{fontSize:13,color:C.text2,textAlign:"center",marginBottom:4,lineHeight:1.6}}>{t("Check these off after every delivery. Your progress is saved per platform.","Márcalas después de cada entrega. Tu progreso se guarda por plataforma.")}</div>
{checks.map((item,i)=>(
<button key={i} className={`card-in c${Math.min(i,9)}`} onClick={()=>toggleCheck(i)} style={{background:item.done?"rgba(16,185,129,0.08)":C.s1,border:`1px solid ${item.done?"rgba(16,185,129,0.3)":C.border}`,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left",transition:"background 0.25s cubic-bezier(0.22,1,0.36,1),border 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s cubic-bezier(0.22,1,0.36,1)",boxShadow:item.done?`inset 0 0 0 1px rgba(16,185,129,0.15),0 0 18px rgba(16,185,129,0.22),0 0 40px rgba(16,185,129,0.10)`:"none"}}>
<div style={{width:26,height:26,borderRadius:8,border:`2px solid ${item.done?C.green:"rgba(255,255,255,0.15)"}`,background:item.done?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.18s"}}>
{item.done&&<span style={{color:"#000",fontSize:14,fontWeight:900}}>✓</span>}
</div>
<span style={{fontSize:14,fontWeight:600,color:item.done?C.green:C.text,flex:1}}>{item.e} {item.t}</span>
</button>
))}
{checks.length>0&&(
<button onClick={()=>{const reset=checks.map(c=>({...c,done:false}));setChecks(reset);if(defPlatform)save(`dp3-checks-${defPlatform}`,reset);}} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",color:C.text3,marginTop:4}}>{t("Reset Checklist","Reiniciar Lista")}</button>
)}
</div>
)}
{defSection==="notes"&&(
<div style={{display:"flex",flexDirection:"column",gap:12}}>
<div style={{fontSize:13,color:C.text2,lineHeight:1.6}}>{t("Log problem addresses, difficult customers, or anything worth remembering. Private to you.","Registra direcciones problemáticas, clientes difíciles o lo que valga recordar. Privado para ti.")}</div>
<textarea value={noteInput} onChange={e=>setNoteInput(e.target.value)} placeholder={t("e.g. 123 Main St — gate code never works, always text ahead...","ej. Calle Principal 123 — el código nunca funciona, avisa siempre...")} rows={3} style={{background:C.s1,border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 14px",color:C.text,fontSize:13,resize:"none",lineHeight:1.6,width:"100%"}}/>
<button onClick={addNote} style={{background:C.red,border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:800,cursor:"pointer",color:"#fff",boxShadow:"0 0 0 1px rgba(244,63,94,0.30),0 4px 12px rgba(244,63,94,0.32),0 12px 32px rgba(244,63,94,0.32),0 24px 56px rgba(244,63,94,0.18)"}}>{t("Add Note","Agregar Nota")}</button>
{notes.length===0&&<div style={{textAlign:"center",padding:"20px",color:C.text3,fontSize:13}}>{t("No notes yet. Add your first one above.","Aún no hay notas. Agrega la primera arriba.")}</div>}
{notes.map((note,i)=>(
<div key={i} className={`card-in c${Math.min(i,9)}`} style={{background:C.s1,border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"13px 15px",display:"flex",gap:10}}>
<div style={{flex:1}}>
<div style={{fontSize:13,color:C.text,lineHeight:1.65}}>{note.text}</div>
<div style={{fontSize:12,color:C.text3,marginTop:5}}>{note.date}</div>
</div>
<button onClick={()=>deleteNote(i)} style={{background:"none",border:"none",color:C.text3,cursor:"pointer",fontSize:16,padding:"0 4px",flexShrink:0}}>✕</button>
</div>
))}
</div>
)}
</div>
);
})()}
</div>
)}
<div style={{padding:"12px 14px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12}}>
<div style={{fontSize:11,color:C.text3,lineHeight:1.6,textAlign:"center"}}>
{t("DropPilot is an independent tool created for gig drivers. It is ","DropPilot es una herramienta independiente creada para conductores de apps. ")}<span style={{fontWeight:700}}>{t("not affiliated with, endorsed by, or connected to","no está afiliada, respaldada ni conectada con")}</span>{t(" DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft, or Amazon Flex. All templates, advice, and content are provided as-is for informational purposes only."," DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft o Amazon Flex. Todas las plantillas, consejos y contenido se proporcionan tal cual, solo con fines informativos.")}
</div>
</div>
</div>
)}
{!shiftMode&&tab==="train"&&(
<div className="page" style={{padding:16,display:"flex",flexDirection:"column",gap:20}}>
<div style={{textAlign:"center",padding:"8px 0 4px"}}>
<div style={{fontSize:13,fontWeight:800,color:C.amber,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:6}}>{t("Training Series","Serie de Capacitación")}</div>
<div style={{...S.pageTitle}}>{t("The DropPilot Method","El Método DropPilot")}</div>
<div style={{fontSize:13,color:C.text2,marginTop:4,lineHeight:1.6}}>{t("Five short training lessons on customer service skills that drive ratings and income.","Cinco lecciones cortas de servicio al cliente que mejoran tus calificaciones e ingresos.")}</div>
</div>
{(pro||activeVideo===0||true)?(
<div style={{display:"flex",flexDirection:"column",gap:12}}>
{!pro&&(
<div style={{background:"rgba(245,166,35,0.07)",border:"1px solid rgba(245,166,35,0.2)",borderRadius:12,padding:"11px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
<span style={{fontSize:16,flexShrink:0}}>🎓</span>
<div style={{fontSize:12,color:C.text2,lineHeight:1.6}}><span style={{color:C.amber,fontWeight:800}}>{t("Free preview:","Vista gratis:")}</span>{t("Watch the first video free. Upgrade to Elite to unlock all 5.","Mira el primer video gratis. Mejora a Elite para desbloquear los 5.")}</div>
</div>
)}
<div style={{display:"flex",flexDirection:"column",gap:6}}>
{pick(lang,VIDEOS,VIDEOS_ES).map((v,i)=>{
const locked=!pro&&i>0;
return(
<button key={i} onClick={()=>{if(locked){setShowPay(true);setPayStep("offer");return;}setActiveVideo(i);}} style={{background:activeVideo===i?`${v.color}15`:C.s1,border:`1px solid ${activeVideo===i?v.color:C.border}`,borderRadius:14,padding:"11px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left",transition:"all 0.15s",opacity:locked?0.5:1}}>
<div style={{width:38,height:38,borderRadius:11,background:`${v.color}15`,border:`1px solid ${v.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{locked?"🔒":v.icon}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:12,fontWeight:800,color:activeVideo===i?v.color:C.text,marginBottom:1}}>{v.title}</div>
<div style={{fontSize:12,color:C.text3,lineHeight:1.3}}>{v.desc}</div>
</div>
{locked&&<span style={{fontSize:11,fontWeight:700,color:C.amber,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:6,padding:"2px 7px",flexShrink:0}}>Elite</span>}
</button>
);
})}
</div>
<VideoPlayer video={pick(lang,VIDEOS,VIDEOS_ES)[activeVideo]} lang={lang}/>
</div>
):(
<div style={{position:"relative"}}>
<div style={{filter:"blur(5px)",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",WebkitMaskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)",maskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)"}}>
{pick(lang,VIDEOS,VIDEOS_ES).map((v,i)=>(
<div key={i} style={{position:"relative",borderRadius:18,overflow:"hidden",border:`1px solid ${v.color}35`,background:`linear-gradient(135deg,${v.color}08,rgba(7,8,10,0.9))`,marginBottom:12}}>
<div style={{padding:"16px 18px",display:"flex",alignItems:"center",gap:14}}>
<div style={{width:46,height:46,borderRadius:14,background:`${v.color}20`,border:`1px solid ${v.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{v.icon}</div>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:v.color,marginBottom:4}}>{v.title}</div><div style={{fontSize:13,color:C.text3,lineHeight:1.4}}>{v.desc}</div></div>
</div>
<div style={{height:3,background:"rgba(255,255,255,0.06)",margin:"0 16px 12px"}}>
<div style={{height:"100%",width:"0%",background:`linear-gradient(90deg,${v.color},#fff)`,borderRadius:99}}/>
</div>
</div>
))}
{[["📈",t("Bonus: The Compound Rating Effect","Bonus: El Efecto Compuesto de la Calificación")],["💡",t("Bonus: Door Presence & Body Language","Bonus: Presencia en la Puerta y Lenguaje Corporal")],["🎯",t("Bonus: Platform-Specific Habits","Bonus: Hábitos por Plataforma")]].map(([e,t],i)=>(
<div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
<span style={{fontSize:20}}>{e}</span>
<span style={{fontSize:14,fontWeight:700,color:C.text}}>{t}</span>
</div>
))}
</div>
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"linear-gradient(180deg,rgba(7,8,10,0) 0%,rgba(7,8,10,0.6) 18%,rgba(7,8,10,0.97) 38%)",borderRadius:16,padding:"20px 16px"}}>
<div className="train-pulse" style={{borderRadius:22,padding:"24px 20px",textAlign:"center",background:"linear-gradient(160deg,#1a0f00,#0e0a16,#07080A)",border:"2px solid rgba(245,166,35,0.4)",width:"100%",position:"relative"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.amber},transparent)`}}/>
<div className="train-float" style={{fontSize:44,marginBottom:12,display:"block"}}>🎓</div>
<div style={{fontSize:19,fontWeight:900,marginBottom:8,background:`linear-gradient(135deg,${C.text} 20%,${C.amber})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t("Full Training Suite","Curso Completo")}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.75,marginBottom:16}}>{t("6 training lessons, 8 real-world scenarios with feedback, and a complete guide to mistakes that kill your rating. Not theory — applied to real deliveries.","6 lecciones, 8 escenarios reales con retroalimentación y una guía completa de errores que matan tu calificación. No es teoría — aplicado a entregas reales.")}</div>
<div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18,textAlign:"left"}}>
{[["📈",t("Why customer service makes you more money — with the math","Por qué el servicio al cliente te hace ganar más — con números")],["💬",t("The exact words that earn tips — phrase by phrase","Las palabras exactas que generan propinas — frase por frase")],["🏆",t("What top earners do differently","Qué hacen diferente los que más ganan")],["👁️",t("Reading people in 10 seconds","Leer a la gente en 10 segundos")],["🎯",t("Scenario Trainer — 8 real situations with feedback","Entrenador de Escenarios — 8 situaciones reales con retroalimentación")],["🚫",t("What not to do — 8 mistakes that cost you ratings","Qué no hacer — 8 errores que te cuestan calificaciones")]].map(([e,f],i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(245,166,35,0.06)",borderRadius:9,padding:"9px 12px",border:"1px solid rgba(245,166,35,0.12)"}}>
<span style={{fontSize:14,flexShrink:0}}>{e}</span>
<span style={{fontSize:12,color:C.text2}}>{f}</span>
</div>
))}
</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,background:`linear-gradient(135deg,${C.amber},${C.amberD},${C.amberL})`,borderRadius:C.r.lg,padding:"16px",fontSize:15,width:"100%",letterSpacing:0}}>{t("Unlock Elite Access — $10","Desbloquear Acceso Elite — $10")}</button>
<div style={{fontSize:12,color:C.text3,marginTop:9}}>{t("Lifetime access · Free updates forever","Acceso de por vida · Actualizaciones gratis para siempre")}</div>
</div>
</div>
</div>
)}
<div style={{background:"rgba(245,166,35,0.04)",border:"1px solid rgba(245,166,35,0.15)",borderRadius:18,overflow:"hidden"}}>
<div style={{padding:"14px 16px 12px",borderBottom:"1px solid rgba(245,166,35,0.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div>
<div style={{fontSize:11,fontWeight:800,color:C.amber,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:2}}>{t("🎯 Scenario Trainer","🎯 Entrenador de Escenarios")}</div>
<div style={{fontSize:13,color:C.text2}}>{t("Real situations — pick the right response","Situaciones reales — elige la respuesta correcta")}</div>
</div>
{!pro&&<div style={{background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:800,color:C.amber}}>Elite</div>}
</div>
{pro?(
<div style={{padding:"16px"}}>
<ScenarioTrainer lang={lang}/>
</div>
):(
<div style={{padding:"16px"}}>
<div style={{fontSize:13,color:C.text2,lineHeight:1.6,marginBottom:14}}>{t(`${pick(lang,SCENARIOS,SCENARIOS_ES).length} real-world gig driver situations. Pick a response, get instant feedback on why it works — or doesn't. Covers false complaints, angry customers, rating threats, de-escalation, and more.`,`${pick(lang,SCENARIOS,SCENARIOS_ES).length} situaciones reales de conductores de reparto. Elige una respuesta y recibe comentarios instantáneos sobre por qué funciona — o no. Cubre quejas falsas, clientes molestos, amenazas de calificación, desescalada y más.`)}</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"14px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>{t("Unlock Elite — $10 one time","Desbloquear Elite — $10 una vez")}</button>
</div>
)}
</div>
<div style={{background:"rgba(244,63,94,0.06)",border:"1px solid rgba(244,63,94,0.18)",borderRadius:18,overflow:"hidden"}}>
<div style={{padding:"14px 16px 12px",borderBottom:"1px solid rgba(244,63,94,0.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div>
<div style={{fontSize:11,fontWeight:800,color:C.red,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:2}}>{t("🚫 What Not To Do","🚫 Lo Que No Debes Hacer")}</div>
<div style={{fontSize:13,color:C.text2}}>{t("8 mistakes that silently kill your rating","8 errores que matan tu calificación en silencio")}</div>
</div>
{!pro&&<div style={{background:"rgba(244,63,94,0.1)",border:"1px solid rgba(244,63,94,0.25)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:800,color:C.red}}>Elite</div>}
</div>
{pro?(
<div style={{display:"flex",flexDirection:"column",gap:0}}>
{pick(lang,MISTAKES,MISTAKES_ES).map((m,i)=>(
<div key={i} style={{padding:"14px 16px",borderBottom:i<pick(lang,MISTAKES,MISTAKES_ES).length-1?"1px solid rgba(244,63,94,0.07)":"none"}}>
<div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:5}}>{m.e} {m.t}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.65}}>{m.why}</div>
</div>
))}
</div>
):(
<div style={{padding:"16px"}}>
<div style={{fontSize:13,color:C.text2,lineHeight:1.6,marginBottom:14}}>{t("The specific habits that hurt your rating without you realizing it — asking for stars, over-apologizing, opening sealed bags, arguing back. Know them so you stop doing them.","Los hábitos específicos que dañan tu calificación sin que te des cuenta — pedir estrellas, disculparte de más, abrir bolsas selladas, discutir. Conócelos para dejar de hacerlos.")}</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{...S.btnPrimary,borderRadius:C.r.md,padding:"14px",fontSize:14,fontWeight:800,width:"100%",letterSpacing:0}}>{t("Unlock Elite — $10 one time","Desbloquear Elite — $10 una vez")}</button>
</div>
)}
</div>
</div>
)}
{!shiftMode&&tab==="basics"&&(
<div className="page" style={{padding:16,display:"flex",flexDirection:"column",gap:20}}>
<div style={{textAlign:"center",padding:"8px 0 4px"}}>
<div style={{fontSize:13,fontWeight:800,color:C.amber,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:6}}>{t("New to This?","¿Nuevo en Esto?")}</div>
<div style={{...S.pageTitle}}>{t("Start Here","Empieza Aquí")}</div>
<div style={{fontSize:13,color:C.text2,marginTop:4,lineHeight:1.6}}>{t("Everything explained in plain English — no experience needed.","Todo explicado en español sencillo — no necesitas experiencia.")}</div>
</div>
{!pro?(
<div style={{position:"relative"}}>
<div style={{filter:"blur(5px)",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",WebkitMaskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)",maskImage:"linear-gradient(180deg,#000 0%,#000 55%,transparent 100%)"}}>
{pick(lang,BASICS_CATS,BASICS_CATS_ES).map((cat,i)=>(
<div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:18,padding:"16px 18px",marginBottom:12}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:44,height:44,borderRadius:13,background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat.e}</div>
<div style={{flex:1}}><div style={{fontSize:15,fontWeight:700}}>{cat.t}</div><div style={{fontSize:13,color:C.text2,marginTop:2}}>{cat.sub}</div></div>
<div style={{color:C.text3,fontSize:13}}>▾</div>
</div>
</div>
))}
</div>
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"linear-gradient(180deg,rgba(7,8,10,0) 0%,rgba(7,8,10,0.6) 15%,rgba(7,8,10,0.97) 33%)",borderRadius:16,padding:"20px 16px"}}>
<div style={{borderRadius:22,padding:"24px 20px",textAlign:"center",background:`linear-gradient(160deg,#071418,#0d0f13)`,border:`1px solid rgba(6,182,212,0.35)`,width:"100%",position:"relative",animation:"defenderPulse 2.4s ease-in-out infinite"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.amber},transparent)`}}/>
<div style={{fontSize:44,marginBottom:12}}>🤝</div>
<div style={{fontSize:19,fontWeight:900,marginBottom:8,background:`linear-gradient(135deg,${C.text} 20%,${C.amber})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t("New to Gig Work?","¿Nuevo en Este Trabajo?")}</div>
<div style={{fontSize:13,color:C.text2,lineHeight:1.75,marginBottom:16}}>{t("Everything explained from scratch. Whether you just started or have questions no one ever answered — no jargon, no assumptions, just plain English.","Todo explicado desde cero. Ya sea que apenas empieces o tengas preguntas que nadie respondió — sin jerga, sin suposiciones, en lenguaje simple.")}</div>
<div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18,textAlign:"left"}}>
{[["🚀",t("How gig delivery works — pay, ratings, accepting orders","Cómo funciona el reparto — pago, calificaciones, aceptar pedidos")],["📱",t("Phone basics — GPS, battery, what to do when it crashes","Básicos del teléfono — GPS, batería, qué hacer si falla")],["🏃",t("Step-by-step walkthrough of your very first delivery","Guía paso a paso de tu primera entrega")],["💸",t("How you get paid, what boosts mean, why tips vary","Cómo te pagan, qué son los boosts, por qué varían las propinas")],["🔴",t("DoorDash — ratings, completion rate, Top Dasher","DoorDash — calificaciones, tasa de completitud, Top Dasher")],["🟢",t("Uber Eats — Trip IDs, ratings, Uber Pro levels","Uber Eats — IDs de viaje, calificaciones, niveles Uber Pro")],["🔵",t("Spark — scanning items, substitutions, on-time rate","Spark — escanear artículos, sustituciones, puntualidad")],["🟩",t("Instacart — batch IDs, replacements, the 4.7 rating","Instacart — IDs de lote, reemplazos, la calificación 4.7")],["📦",t("Flex — blocks, TBA numbers, what standing means","Flex — bloques, números TBA, qué significa tu nivel")]].map(([e,f],i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(6,182,212,0.07)",borderRadius:9,padding:"9px 12px",border:"1px solid rgba(6,182,212,0.13)"}}>
<span style={{fontSize:14,flexShrink:0}}>{e}</span>
<span style={{fontSize:12,color:C.text2}}>{f}</span>
</div>
))}
</div>
<button onClick={()=>{setShowPay(true);setPayStep("offer");}} style={{background:`linear-gradient(135deg,${C.amber},#C8820A)`,border:"none",borderRadius:C.r.lg,padding:"16px",fontSize:15,fontWeight:900,cursor:"pointer",width:"100%",color:"#000",fontFamily:C.sans,boxShadow:C.sh.accent(C.amber),transition:`transform 0.25s ${C.ease.out}, box-shadow 0.25s ${C.ease.out}`,WebkitTapHighlightColor:"transparent"}}>{t("Unlock Elite Access — $10","Desbloquear Acceso Elite — $10")}</button>
<div style={{fontSize:12,color:C.text3,marginTop:9}}>{t("Lifetime access · Free updates forever","Acceso de por vida · Actualizaciones gratis para siempre")}</div>
</div>
</div>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:14}}>
<div style={{background:`rgba(6,182,212,0.07)`,border:`1px solid rgba(6,182,212,0.2)`,borderRadius:14,padding:"13px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
<span style={{fontSize:20,flexShrink:0}}>💡</span>
<div style={{fontSize:13,color:C.text2,lineHeight:1.7}}>{t("This section covers everything from scratch. Whether you're brand new or just need a refresher — start wherever makes sense for you.","Esta sección cubre todo desde cero. Ya sea que seas nuevo o solo necesites un repaso — empieza donde tenga sentido para ti.")}</div>
</div>
{pick(lang,BASICS_CATS,BASICS_CATS_ES).map((cat,ci)=>{
const catOpen=basicsOpen===ci;
return(
<div key={ci} className={`card-in c${Math.min(ci,9)}`} style={{background:C.s1,border:`1px solid ${catOpen?`rgba(6,182,212,0.4)`:C.border}`,borderRadius:18,overflow:"hidden",transition:"border-color 0.18s"}}>
<div onClick={()=>{setBasicsOpen(catOpen?null:ci);setBasicsSub(null);}} style={{padding:"16px 18px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div style={{width:44,height:44,borderRadius:13,background:catOpen?`rgba(6,182,212,0.12)`:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat.e}</div>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:700}}>{cat.t}</div>
<div style={{fontSize:13,color:C.text2,marginTop:2}}>{cat.sub}</div>
</div>
<div style={{color:C.text3,fontSize:13,transition:"transform 0.18s",transform:catOpen?"rotate(180deg)":"none"}}>▾</div>
</div>
{catOpen&&(
<div style={{padding:"0 14px 14px",display:"flex",flexDirection:"column",gap:10,animation:"slideUp 0.25s cubic-bezier(0.22,1,0.36,1)"}}>
{cat.secs.map((sec,si)=>{
const key=`b${ci}-${si}`;
const open2=basicsSub===key;
return(
<div key={si} style={{background:C.s2,border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,overflow:"hidden"}}>
<div onClick={()=>setBasicsSub(open2?null:key)} style={{padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
<span style={{fontSize:14,fontWeight:700,flex:1}}>{sec.h}</span>
<div style={{color:C.text3,fontSize:12,transition:"transform 0.18s",transform:open2?"rotate(180deg)":"none",flexShrink:0}}>▾</div>
</div>
{open2&&(
<div style={{padding:"0 15px 15px",animation:"slideUp 0.2s cubic-bezier(0.22,1,0.36,1)"}}>
<p style={{fontSize:14,color:C.text2,lineHeight:1.85,margin:0}}>{sec.body}</p>
</div>
)}
</div>
);
})}
</div>
)}
</div>
);
})}
</div>
)}
</div>
)}
</div>
<button onClick={()=>{if(!pro){setShowPay(true);setPayStep("offer");return;}setShowQuickHelp(true);setQhActive(null);setQhCopied(false);}} aria-label={t("Quick Help","Ayuda rápida")} style={{position:"fixed",bottom:74,right:16,zIndex:90,width:52,height:52,borderRadius:C.r.full,background:`linear-gradient(135deg,${C.blue},#1d4ed8)`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:C.sh.accent(C.blue),WebkitTapHighlightColor:"transparent",transition:`transform 0.25s ${C.ease.out}, box-shadow 0.25s ${C.ease.out}`}}>⚡</button>
{showQuickHelp&&(
<div style={{position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
<div onClick={()=>{setShowQuickHelp(false);setQhActive(null);}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.78)"}}/>
<div style={{position:"relative",background:"linear-gradient(180deg,#12151a,#0d0f13)",borderTop:"1px solid rgba(255,255,255,0.08)",borderRadius:"24px 24px 0 0",padding:20,paddingBottom:36,width:"100%",maxWidth:430,zIndex:1,maxHeight:"80vh",overflowY:"auto"}}>
<div style={{width:40,height:4,borderRadius:99,background:"rgba(255,255,255,0.15)",margin:"0 auto 18px"}}/>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
<div>
<div style={{fontSize:16,fontWeight:900}}>⚡ {t("Quick Scripts","Scripts Rápidos")}</div>
<div style={{fontSize:12,color:C.text3,marginTop:2}}>{t("What's happening right now?","¿Qué está pasando ahora?")}</div>
</div>
<button onClick={()=>{setShowQuickHelp(false);setQhActive(null);}} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:C.r.sm,width:32,height:32,cursor:"pointer",color:C.text3,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
</div>
{qhActive===null?(
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{pick(lang,QUICK_SITUATIONS,QUICK_SITUATIONS_ES).map((s,i)=>{
const cats=lang==="en"?MSG_CATS:MSG_CATS_ES;
const sec=cats[s.ci]?.secs[s.si];
if(!sec) return null;
return(
<button key={i} onClick={()=>setQhActive(i)} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 12px",minHeight:80,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6,cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent"}}>
<span style={{fontSize:22}}>{s.e}</span>
<span style={{fontSize:12,fontWeight:700,color:C.text,lineHeight:1.3}}>{lang==="en"?s.l:s.le}</span>
</button>
);
})}
</div>
):(()=>{
const s=pick(lang,QUICK_SITUATIONS,QUICK_SITUATIONS_ES)[qhActive];
const cats=lang==="en"?MSG_CATS:MSG_CATS_ES;
const sec=cats[s.ci]?.secs[s.si];
if(!sec) return null;
const phs=getPlaceholders(sec.msg);
const filled=applyFill(sec.msg,fillVals);
return(
<div>
<button onClick={()=>{setQhActive(null);setFillVals({});setQhCopied(false);}} style={{background:"transparent",border:"none",color:C.text3,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",gap:5,marginBottom:14,padding:"8px 0",WebkitTapHighlightColor:"transparent"}}>← {t("Back","Atrás")}</button>
<div style={{fontSize:15,fontWeight:800,marginBottom:4}}>{s.e} {lang==="en"?s.l:s.le}</div>
<div style={{background:"rgba(0,0,0,0.3)",borderRadius:12,padding:"13px 14px",marginBottom:12,fontSize:13,color:C.text,lineHeight:1.75,whiteSpace:"pre-wrap",fontFamily:C.mono}}>{filled}</div>
{phs.length>0&&(
<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:12,marginBottom:12}}>
<div style={{fontSize:11,fontWeight:800,color:C.text3,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px"}}>{t("Fill in details","Completa los detalles")}</div>
<div style={{display:"flex",flexDirection:"column",gap:7}}>
{phs.map(ph=>(
<input key={ph} value={fillVals[ph]||""} onChange={e=>setFillVals(v=>({...v,[ph]:e.target.value}))} placeholder={ph} style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"12px 12px",color:C.text,fontSize:16,width:"100%"}}/>
))}
</div>
</div>
)}
<button onClick={()=>{
if(navigator.clipboard){navigator.clipboard.writeText(filled).then(()=>{setQhCopied(true);setTimeout(()=>{setShowQuickHelp(false);setQhActive(null);setFillVals({});setQhCopied(false);},800);});}
else{setQhCopied(true);setTimeout(()=>{setShowQuickHelp(false);setQhActive(null);setFillVals({});setQhCopied(false);},800);}
}} style={{background:qhCopied?C.green:C.blue,border:"none",borderRadius:13,padding:"14px",fontSize:14,fontWeight:800,cursor:"pointer",color:qhCopied?"#000":"#fff",width:"100%",transition:"background 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s cubic-bezier(0.22,1,0.36,1)",boxShadow:qhCopied?`0 0 0 1px ${C.green}40,0 4px 14px ${C.green}50,0 14px 36px ${C.green}40`:`0 0 0 1px ${C.blue}30,0 4px 14px ${C.blue}40,0 14px 36px ${C.blue}38,0 28px 64px ${C.blue}1f`}}>
{qhCopied?t("✓ Copied!","✓ ¡Copiado!"):t("Copy & Close","Copiar y cerrar")}
</button>
</div>
);
})()}
</div>
</div>
)}
{shiftMode?(
<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(8,10,13,0.97)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderTop:`1px solid ${pick(lang,PLATFORMS_DEFEND,PLATFORMS_DEFEND_ES).find(p=>p.id===shiftPlatform)?.color||C.amber}40`,display:"flex",gap:10,zIndex:100,padding:"10px 14px 20px"}}>
<button onClick={()=>{if(!pro){setShowPay(true);setPayStep("offer");return;}setShowQuickHelp(true);setQhActive(null);setQhCopied(false);}} style={{flex:1,background:`${C.blue}15`,border:`1.5px solid ${C.blue}35`,borderRadius:15,padding:"14px 10px",display:"flex",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
<span style={{fontSize:20}}>⚡</span>
<span style={{fontSize:14,fontWeight:800,color:C.blue}}>{t("Quick Script","Script Rápido")}</span>
</button>
<button onClick={endShift} style={{flex:1,background:"rgba(244,63,94,0.1)",border:"1.5px solid rgba(244,63,94,0.3)",borderRadius:15,padding:"14px 10px",display:"flex",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
<span style={{fontSize:20}}>🏁</span>
<span style={{fontSize:14,fontWeight:800,color:C.red}}>{t("End Shift","Fin de Turno")}</span>
</button>
</div>
):(
<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(8,10,13,0.96)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",zIndex:100,paddingBottom:6,paddingTop:4}}>
{[{id:"tips",l:t("Earn","Ganar"),e:"⭐",ac:C.amber},{id:"templates",l:t("Scripts","Mensajes"),e:"💬",ac:C.blue},{id:"basics",l:t("Basics","Básicos"),e:"📖",ac:C.amber},{id:"defend",l:t("Defend","Defensa"),e:"🛡️",ac:C.red},{id:"train",l:t("Training","Capacitación"),e:"🎓",ac:C.amber}].map(n=>{
const active=tab===n.id;
const popping=navPop===n.id;
return(
<button key={n.id} onClick={()=>changeTab(n.id)} style={{flex:1,background:"transparent",border:"none",cursor:"pointer",padding:"6px 1px 3px",display:"flex",flexDirection:"column",alignItems:"center",gap:1,position:"relative",transition:"all 0.18s"}}>
{active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:28,height:2,borderRadius:"0 0 4px 4px",background:n.ac,boxShadow:`0 0 8px ${n.ac},0 0 18px ${n.ac}80,0 2px 12px ${n.ac}60`}}/>}
<div className={popping?"nav-pop":""} style={{width:40,height:28,borderRadius:10,background:active?`${n.ac}18`:"transparent",border:active?`1px solid ${n.ac}30`:"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.18s,border 0.18s"}}>
<span style={{fontSize:active?18:15,transition:"font-size 0.18s"}}>{n.e}</span>
</div>
<span style={{fontSize:11,fontWeight:active?800:600,color:active?n.ac:C.text3,fontFamily:C.sans,letterSpacing:"0.1px"}}>{n.l}</span>
</button>
);
})}
</div>
)}
{showPay&&<PaywallModal lang={lang} setShowPay={setShowPay} payStep={payStep} setPayStep={setPayStep} setTab={setTab}/>}
{showPlatformPicker&&<PlatformPicker lang={lang} setShowPlatformPicker={setShowPlatformPicker} startShift={startShift}/>}
</div>
);
}
class ErrorBoundary extends React.Component {
constructor(p){super(p); this.state={err:null};}
static getDerivedStateFromError(err){return{err};}
componentDidCatch(err,info){if(window.console)console.error("DropPilot error:",err,info);}
render(){
if(this.state.err){
var _lang="en"; try{ var _raw=localStorage.getItem("dp3-lang"); _lang=_raw?JSON.parse(_raw):"en"; if(typeof _lang!=="string")_lang="en"; }catch(e){ try{ _lang=localStorage.getItem("dp3-lang")||"en"; }catch(e2){} }
var _isEs=_lang!=="en";
return React.createElement("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px",background:"#07080A",color:"#EDF0F7",fontFamily:"system-ui,sans-serif",textAlign:"center"}},
React.createElement("div",{style:{maxWidth:380}},
React.createElement("div",{style:{fontSize:48,marginBottom:16}},"⚠️"),
React.createElement("div",{style:{fontSize:20,fontWeight:800,marginBottom:8}},_isEs?"Algo salió mal":"Something went wrong"),
React.createElement("div",{style:{fontSize:14,color:"#8B95A8",lineHeight:1.6,marginBottom:24}},_isEs?"La app encontró un error inesperado. Tu progreso está a salvo — intenta recargar. Si sigue pasando, escribe a support@droppilot.app.":"The app hit an unexpected error. Your saved progress is fine — try reloading. If this keeps happening, email support@droppilot.app."),
React.createElement("button",{onClick:()=>window.location.reload(), style:{background:"linear-gradient(135deg,#F5A623,#C8820A)",border:"none",borderRadius:99,padding:"12px 28px",fontSize:14,fontWeight:800,color:"#000",cursor:"pointer"}},"Reload")
)
);
}
return this.props.children;
}
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(ErrorBoundary,null,React.createElement(App)));