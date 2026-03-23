// ─── Updates ─────────────────────────────────────────────────────────────────
var LATEST_UPDATE_ID = "2025-01-001";
var UPDATES = [
  {
    id:"2025-01-001",
    date:"Jan 2025",
    title:"Backup & Restore + Secure Paywall",
    items:[
      "Download a backup of your data any time from Settings",
      "Restore your data on a new device in seconds",
      "Paywall is now more secure — unlock code can no longer be found in DevTools",
      "Settings now has a visible gear button in the top right",
    ]
  },
];

// ─── Training Videos Data ─────────────────────────────────────────────────────
var VIDEOS = [
  {id:0,title:"Why Customer Service Makes You More Money",dur:36000,icon:"📈",color:"#10B981",desc:"The simple math of one extra dollar per delivery adding up fast.",
    scenes:[
      {t:0,tag:"the truth about gig work",emoji:"💸",hed:"Most drivers are\nleaving money\non the table.",sub:"Every single shift.",narr:"Most drivers are leaving money on the table. Every single shift. Not because they are bad drivers — because they do not know what is actually costing them."},
      {t:4500,tag:"the silent income killer",emoji:"⭐",hed:"One low rating\ncuts you off\nfrom better orders.",sub:"Platforms show high-paying orders to high-rated drivers first.",hi:{color:"#F43F5E",text:"Low rating → worse orders → less money → harder to recover."},narr:"Platforms show the high-paying orders to high-rated drivers first. If your rating drops you see worse orders and less money."},
      {t:10000,tag:"the math is simple",emoji:"🧮",hed:"Just $1 more tip.\nEvery delivery.",sub:null,math:[["20 deliveries a day","+$20/day"],["5 days a week","+$100/week"],["Every month","+$400","big"]],narr:"One extra dollar in tips every delivery. Twenty deliveries a day — twenty dollars. Five days a week — a hundred dollars. Every month — four hundred extra dollars."},
      {t:17000,tag:"what drives the extra dollar",emoji:"💡",hed:"Tips are emotional,\nnot logical.",sub:"Customers tip based on how they felt — not how fast you were.",hi:{color:"#10B981",text:"A warm smile and a genuine enjoy your meal makes people feel cared for. That feeling is worth real money."},narr:"Tips are not about speed. Customers tip based on how they felt during the delivery."},
      {t:24000,tag:"the compound effect",emoji:"📊",hed:"Better service.\nBetter rating.\nBetter orders.\nMore money.",sub:"Every shift, it builds.",bars:[["Lower service","-$400/mo",42,"#F43F5E"],["One extra dollar","+$400/mo",94,"#10B981"]],narr:"Better service leads to a better rating. A better rating leads to better orders. Better orders lead to more money."},
      {t:30500,tag:"your takeaway",emoji:"🎯",hed:"One dollar more.\nEvery delivery.\nThat is the goal.",sub:null,takeaway:"Set your intention before your next shift: one dollar more per delivery.",narr:"One dollar more. Every delivery. That is the goal."},
    ]},
  {id:1,title:"Why the Words You Choose Actually Matter",dur:38000,icon:"💬",color:"#3B82F6",desc:"The simple psychology behind exact words that earn more tips and better ratings.",
    scenes:[
      {t:0,tag:"it is not just what you say",emoji:"🧠",hed:"The words you\nchoose change\nhow people\nfeel about you.",sub:"Not politeness. Basic human psychology.",narr:"The words you choose matter more than you think. Not because of politeness. Because of basic human psychology."},
      {t:5000,tag:"phrase 1 — running late",emoji:"🙌",hed:"Thank you for your patience.\nNot Sorry for the wait.",sub:null,vs:{bad:["Instead of","Sorry for the wait"],good:["Say this","Thank you for your patience"]},why:{color:"#3B82F6",text:"Thanking them credits the customer. People respond better to being appreciated than to apologies."},narr:"Instead of sorry for the wait — say thank you for your patience."},
      {t:12500,tag:"phrase 2 — when something is wrong",emoji:"🤝",hed:"I will make sure\neverything is\ntaken care of.",sub:"Use this when a customer seems worried. Own it immediately.",hi:{color:"#F5A623",text:"Personal ownership builds trust instantly. These words stop an escalation before it starts."},narr:"When something goes wrong say: I will make sure everything is taken care of."},
      {t:19500,tag:"phrase 3 — cannot reach them",emoji:"💬",hed:"Text first.\nNever call first.",sub:"A call from an unknown number feels intrusive.",vs2:[["📞","Calling","Interrupts. Creates anxiety. Often ignored.","#F43F5E"],["💬","Texting","Non-intrusive. Much higher response rate.","#10B981"]],narr:"Always text first. Never call first."},
      {t:26500,tag:"phrase 4 — the handoff",emoji:"🌟",hed:"Enjoy your meal!\nNot here you go.",sub:"How an interaction ends is how people remember the whole experience.",hi:{color:"#8B5CF6",text:"A warm ending rewrites the whole delivery in a customer memory."},narr:"End every handoff with enjoy your meal — not here you go."},
      {t:32500,tag:"your takeaway",emoji:"🎯",hed:"Four phrases.\nMemorize them.",sub:null,takeaway:"Thank you for your patience · I will make sure it is taken care of · Text do not call · Enjoy your meal",narr:"Four phrases. Thank you for your patience. Text do not call. Enjoy your meal."},
    ]},
  {id:2,title:"What Top Earners Do Differently",dur:37000,icon:"🏆",color:"#F5A623",desc:"The 60-second habit gap between average drivers and top earners.",
    scenes:[
      {t:0,tag:"the gap is smaller than you think",emoji:"🔍",hed:"Top earners are\nnot faster.\nThey are smarter\nat the door.",sub:"Here is exactly what they do.",narr:"Top earners are not faster. They are smarter at the door."},
      {t:5500,tag:"what most drivers do",emoji:"❌",hed:"The silent drop-off.",sub:null,listBad:["Pull up. Pick up. Drop off. Leave.","No greeting. No eye contact.","No text. No confirmation.","Just a bag on a doorstep."],narr:"The average driver does this. Pull up. Pick up. Drop off. Leave."},
      {t:11500,tag:"what top earners do",emoji:"✅",hed:"The 60-second\ndifference.",sub:null,listGood:[["💬","Text when 3 minutes away"],["😊","Greet them at the door"],["🤲","Two hands on the bag, chest height"],["📸","Photo every drop-off without fail"],["🌟","Enjoy your meal before you leave"]],narr:"Top earners text three minutes before arriving, greet at the door, hold the bag with two hands, take a photo every time, and say enjoy your meal."},
      {t:18500,tag:"the habit gap",emoji:"📊",hed:"Same roads.\nSame apps.\nVery different\nincome.",sub:"0.4 stars separates average from top earner.",bars:[["Average driver","~4.5 stars",62,"#F43F5E"],["Top earner","~4.9 stars",96,"#F5A623"]],narr:"Zero point four stars separates the average driver from the top earner. Same roads. Same apps."},
      {t:26000,tag:"your photo is your protection",emoji:"📸",hed:"A photo is not\njust courtesy.\nIt is evidence.",sub:"False non-delivery complaints are a top cause of deactivation.",hi:{color:"#F5A623",text:"Drivers who photo every drop-off win almost every false complaint. Drivers who do not — lose almost every one."},narr:"Your delivery photo is not just courtesy. It is evidence."},
      {t:31500,tag:"your takeaway",emoji:"🎯",hed:"Text. Greet.\nTwo hands.\nPhoto.\nEnjoy your meal.",sub:null,takeaway:"Five habits. Sixty seconds. Do all five on your very next delivery.",narr:"Text. Greet. Two hands. Photo. Enjoy your meal. Five habits. Sixty seconds."},
    ]},
  {id:3,title:"Please, Thank You, and You are Welcome",dur:42000,icon:"🙏",color:"#8B5CF6",desc:"Three simple phrases backed by real research that measurably increase tips.",
    scenes:[
      {t:0,tag:"backed by real research",emoji:"🔬",hed:"Three phrases.\nProven results.",sub:"Not just manners — measurable income.",narr:"Please. Thank you. You are welcome. Not just good manners — measurable income."},
      {t:5500,tag:"the word please",emoji:"🙏",hed:"Please makes\npeople more\nlikely to help.",sub:"Adding please increases compliance by up to 18%.",hi:{color:"#F5A623",text:"Could you buzz me in gets ignored. Could you please buzz me in gets answered."},cite:"Langer, Blank & Chanowitz — Journal of Personality and Social Psychology",narr:"The word please. Research shows adding please to a request increases compliance by up to eighteen percent."},
      {t:13500,tag:"the words thank you",emoji:"🙌",hed:"Thank you\ntriggers the\nurge to give back.",sub:"Real gratitude makes people want to reciprocate.",hi:{color:"#3B82F6",text:"A sincere thank you for your order at the door triggers a natural urge to tip."},cite:"Cialdini — Influence: The Psychology of Persuasion",narr:"When someone expresses real gratitude people feel a natural urge to give something back."},
      {t:21000,tag:"a real study on tips",emoji:"💰",hed:null,stat:"23%",statSub:"more in tips",sub:"Cornell University: servers who gave a genuine personal thank you earned 23% more.",cite:"Leodoro & Lynn — Cornell Hotel and Restaurant Administration Quarterly",narr:"A Cornell University study found that servers who gave a genuine personal thank you received twenty three percent more in tips."},
      {t:28500,tag:"the most underused phrase",emoji:"💬",hed:"You are welcome\nvs\nNo problem.",sub:null,vs:{bad:["No problem","Implies it could have been a problem. Weakens the interaction."],good:["You are welcome","Confirms something of value was given. Ends the exchange right."]},why:{color:"#8B5CF6",text:"You are welcome tells the customer the delivery mattered. No problem minimizes it."},narr:"You are welcome versus no problem. No problem implies there could have been a problem."},
      {t:35500,tag:"your takeaway",emoji:"🎯",hed:"Please.\nThank you.\nYou are welcome.",sub:null,takeaway:"Three words. Use all three on your next shift. The research says your tips go up.",narr:"Please when you need something. Thank you at the door. You are welcome when they thank you."},
    ]},
  {id:4,title:"The Door — Good vs Bad",dur:42000,icon:"🚪",color:"#06B6D4",desc:"The same delivery, two ways. Watch the difference play out.",
    scenes:[
      {t:0,tag:"same house. same food.",emoji:"🏠",hed:"Two deliveries.\nOne door.\nTwo very\ndifferent outcomes.",sub:null,narr:"Same house. Same food. Same driver on different days."},
      {t:5000,tag:"delivery 1 — the silent drop",emoji:"😶",hed:"No text.\nNo greeting.\nBag on the step.\nGone.",sub:null,listBad:["No heads-up text sent","Silent walk to the door","Bag dropped, no eye contact","No photo taken","Gone before the door opens"],narr:"Delivery one. No text. Silent walk to the door. Bag dropped. No photo. Gone."},
      {t:12000,tag:"the result",emoji:"💔",hed:"3 stars.\nNo tip.\nAccount\nslowly declining.",sub:null,hi:{color:"#F43F5E",text:"The customer felt like a transaction, not a person. That feeling costs you every single shift."},narr:"The result. Three stars. No tip. The customer felt like a transaction."},
      {t:19000,tag:"delivery 2 — 60 seconds more",emoji:"✅",hed:"Same door.\nCompletely\ndifferent\napproach.",sub:null,listGood:[["💬","Text sent 3 minutes out"],["😊","Greeted by name at the door"],["🤲","Two hands, bag at chest height"],["📸","Photo taken before leaving"],["🌟","Enjoy your meal as a goodbye"]],narr:"Delivery two. Text three minutes out. Greeted by name. Two hands on the bag. Photo before leaving. Enjoy your meal."},
      {t:29000,tag:"the result",emoji:"⭐",hed:"5 stars.\nTip added.\nAccount\ngrowing.",sub:null,hi:{color:"#10B981",text:"The customer felt seen and cared for. That feeling is worth real money every single shift."},narr:"The result. Five stars. Tip added. Same roads. Same food. Sixty extra seconds."},
      {t:35500,tag:"your takeaway",emoji:"🎯",hed:"Text. Smile.\nTwo hands.\nPhoto.\nEnjoy your meal.",sub:null,takeaway:"Five steps. Sixty seconds. The whole difference is right there.",narr:"Text. Smile. Two hands. Photo. Enjoy your meal. Five steps. Sixty seconds."},
    ]},
  {id:5,title:"When Things Go Wrong",dur:44000,icon:"⚠️",color:"#F43F5E",desc:"Wrong address, upset customer, late order. Here is exactly what to do.",
    scenes:[
      {t:0,tag:"it will happen to you",emoji:"⚠️",hed:"Wrong address.\nUpset customer.\nLate order.\nHere is exactly\nwhat to do.",sub:null,narr:"Something will go wrong on your shift today. Here is exactly what to do in each one."},
      {t:6000,tag:"cannot find the address",emoji:"📍",hed:"You cannot\nfind them.\nDo not panic.\nDo not leave.",sub:null,steps:[["1","Double-check the address in the app","#F5A623"],["2","Text them where you are and ask for help","#3B82F6"],["3","Wait 2 to 3 minutes for a reply","#06B6D4"],["4","Still nothing? Call support before leaving","#10B981"]],narr:"You cannot find the address. Check it. Text them. Wait two to three minutes. Call support before you leave."},
      {t:14000,tag:"customer opens the door angry",emoji:"😤",hed:"They are angry.\nDo not match it.\nAbsorb it.",sub:null,vs:{bad:["Wrong move","Explain yourself. Defend yourself. List reasons why it was not your fault."],good:["Right move","I am really sorry about that. I hope the rest of your evening is better."]},why:{color:"#8B5CF6",text:"You cannot win an argument at a doorstep. But you can end it with your rating intact."},narr:"They are angry. Do not explain yourself. Say sorry and wish them well. Then leave."},
      {t:23000,tag:"order running very late",emoji:"⏰",hed:"You are late.\nOne text\nchanges everything.",sub:null,hi:{color:"#F5A623",text:"Hi running a little behind tonight — on my way and will be there as soon as I can. Really appreciate your patience. Send this before they text you."},narr:"The order is running late. Send a text before they message you. That one text turns a frustrated customer into a patient one."},
      {t:31000,tag:"the rule for everything",emoji:"🧭",hed:"Acknowledge.\nApologize once.\nPoint to\nthe solution.",sub:"Every problem. Every platform. Every situation.",hi:{color:"#10B981",text:"Do not over-apologize. Do not argue. One acknowledgment, one apology, one next step."},narr:"One rule covers every situation. Acknowledge. Apologize once. Point to the solution."},
      {t:37500,tag:"your takeaway",emoji:"🎯",hed:"Cannot find them?\nText first.\nAngry customer?\nAbsorb and leave.\nRunning late?\nText before they do.",sub:null,takeaway:"Acknowledge. Apologize once. Point to the solution. Every time.",narr:"Text first. Absorb it and leave. Text before they text you."},
    ]},
];

// DropPilot — Data
// Edit content here. No JSX — plain JS objects only.

var C = {
  bg:"#07080A", s1:"#0D0F13", s2:"#12151A", s3:"#1A1E26",
  border:"rgba(255,255,255,0.08)",
  amber:"#F5A623", amberD:"#C8820A", amberL:"#ffc84a",
  green:"#10B981", teal:"#06B6D4", blue:"#3B82F6",
  red:"#F43F5E", purple:"#8B5CF6",
  text:"#EDF0F7", text2:"#8B95A8", text3:"#6B7A8D",
  sans:"'Outfit',system-ui,sans-serif", mono:"'JetBrains Mono','Courier New',monospace"
};

// ─── Free Tips ────────────────────────────────────────────────────────────────
var ALL_TIPS = [
  {e:"👋",t:"Greet with a smile",s:"First impressions decide your rating.",d:"Make brief eye contact and say something simple — 'Hi, here's your order!' You don't need to be chatty. Just be warm. Customers rate drivers who feel like real people much higher than ones who silently hand over the bag and walk away."},
  {e:"🔔",t:"Don't knock on contactless orders",s:"This is one of the top causes of surprise 1-star ratings.",d:"If the customer chose Leave at Door, do NOT knock or ring the bell. Set the food down neatly, take a photo, and mark it delivered. The customer chose contactless for a reason. Respecting that choice shows you read their instructions — and that earns 5 stars."},
  {e:"📸",t:"Take a photo on every single delivery",s:"Your photo is your protection. No exceptions.",d:"Take a clear photo that shows the food AND the door or house number together. This protects you if a customer ever says they didn't get their order. Make it a habit every single time — good weather, bad weather, day or night."},
  {e:"💬",t:"Text when you're 3-4 minutes away",s:"This one message earns more 5-star ratings than almost anything else.",d:"A quick heads-up like 'Hi! About 3 minutes away with your order!' sets a professional tone before you even arrive. Customers who know you're coming almost always rate higher. It only takes 10 seconds to send."},
  {e:"🌡️",t:"Handle the food like it's your own meal",s:"How you carry the bag tells them everything.",d:"Hot food should arrive hot. Bags shouldn't be crushed. Drinks should be upright. These small details tell the customer whether you cared. The drivers who treat every order carefully are the ones who get the best tips."},
  {e:"⚡",t:"Always double-check the address before you walk up",s:"Speed means nothing if you're at the wrong door.",d:"A delivery to the wrong address is one of the fastest ways to lose your account. Take 5 seconds to confirm the address before you get out of your car. That 5 seconds protects your entire standing on the platform."},
  {e:"🤐",t:"Never complain to the customer",s:"Your bad day is not their problem.",d:"Long restaurant wait, bad traffic, app issues — the customer didn't cause any of it and doesn't want to hear about it. Keep every interaction warm and professional no matter how the shift is going. They're just happy their food arrived."},
  {e:"🎁",t:"Small extras earn bigger tips",s:"Extra napkins. A level bag. A steady hand. It adds up.",d:"Grabbing a few extra napkins, keeping the bag level, making sure drinks are secured — none of these take more than a few seconds. But customers notice, and they tip the drivers who clearly paid attention."},
  {e:"🚪",t:"Contactless means zero contact",s:"No knock. No ring. Just deliver cleanly.",d:"Leave at Door means exactly that. Set the food down neatly, take your photo, and confirm the delivery. A knock on a contactless order is one of the most common reasons good drivers get unexpected 1-star ratings."},
  {e:"📞",t:"When something goes wrong, text first",s:"One proactive message prevents a bad review.",d:"Gate code missing? Can't find the unit? Nobody answering? Always text before you call or leave. A calm, simple text gives the customer a chance to help — and it shows you tried. That effort almost always protects your rating."},
];

// ─── Educational Content ──────────────────────────────────────────────────────
var LEARN_CATS = [
  {
    e:"🧠", t:"Reading People", sub:"Simple psychology you can use right now", free:true,
    secs:[
      {h:"The 2 Moments That Decide Your Rating", body:"People don't judge a delivery by the whole experience. They remember two things: the moment you handed them their food, and the last thing you said before you left. That's it. If you nail those two moments, customers will rate you 5 stars even after a long wait. Focus every delivery on two things: a great handoff and a warm goodbye.", tip:"Before every delivery, remind yourself: handoff and goodbye. Those two moments decide almost everything."},
      {h:"Use Their First Name — Once", body:"Your app shows you the customer's first name. Most drivers never use it. Big mistake. Hearing your own name makes people feel seen instead of just handled. Use it exactly once: 'Here you go, Marcus — enjoy your meal!' That's all it takes. Once feels warm and personal. Twice feels weird. Three times feels creepy.", tip:"Try it on your next 5 deliveries. You'll notice the difference immediately."},
      {h:"Match How They Talk to You", body:"Some customers text casually: 'yo food almost here??' Others are more formal: 'Could you provide an estimated arrival time?' Most drivers send the same message to everyone. That's a mistake. When you match someone's style, they feel understood without knowing why. Casual customer → casual reply. Formal customer → polite reply. It takes 3 extra seconds and it works.", tip:"Read their texts or delivery notes before you arrive. It tells you everything about how they want to be talked to."},
    ]
  },
  {
    e:"🚪", t:"At The Door", sub:"Small habits that change how customers see you", free:true,
    secs:[
      {h:"Where to Stand When the Door Opens", body:"Don't stand dead center in the doorway — it feels aggressive, like you're blocking them. Stand slightly to the side instead. Hold the bag out. This position says 'I'm here to give you something' not 'I'm in your way.' If there are steps, stand one step below the top. Being slightly lower than the customer feels natural and friendly.", tip:"Practice this on your next door delivery. You'll see customers visibly relax."},
      {h:"How You Hold the Bag Matters More Than You Think", body:"One hand, bag swinging at your side = it looks like you're carrying garbage. Two hands, bag level, held at chest height = it shows you cared about their food the whole way here. Customers notice this even when they don't realize they're noticing it. For anything with drinks — always two hands, always level. The extra 5 seconds is worth every penny of the tip.", tip:"Two hands, chest height. Make it your default. No exceptions on drinks."},
      {h:"Wait One Beat Before You Leave", body:"After you hand over the bag and say goodbye, pause for half a second. Make brief eye contact one more time. Then leave. This tiny pause makes customers feel like the delivery was a real human interaction — not just a bag being dropped off by a stranger in a hurry. Drivers who do this are described as 'really nice.' Drivers who don't are described as 'rushed' — even when times were identical.", tip:"Count 'one' in your head after your sign-off. Then go."},
    ]
  },
  {
    e:"🔥", t:"Handling Difficult Situations", sub:"What to say when things go wrong", free:false,
    secs:[
      {h:"The 3-Step Formula When Someone Is Upset", body:"When a customer is frustrated, use this: Step 1 — 'I understand how you feel.' This shows you heard them. Step 2 — 'A lot of customers feel the same way.' This makes their frustration feel normal, not dramatic. Step 3 — 'What I've found is...' — now give them a next step. Example for a late delivery: 'I completely understand how you feel — waiting is frustrating. A lot of customers feel the same after a long wait. What I've found is that a quick message to support usually fixes this fast.' You're not saying it's your fault. You're saying their frustration makes sense. That's all they need.", tip:"Memorize: Feel, Felt, Found. Three steps. Works every time."},
      {h:"Slow Down When Someone Is Angry", body:"When a customer is angry, your brain wants to talk faster to explain yourself. Don't. Slow down instead. Take a breath before you respond. Lower your voice slightly. This works because calm is contagious — just like anger is. You can't out-argue an angry person. But you can out-calm them. Don't interrupt. Don't list reasons it isn't your fault. Just be steady and slow. Most people will follow your lead within 30 seconds.", tip:"The moment you feel defensive, that's your cue to speak slower and quieter — not faster and louder."},
      {h:"When the Customer Is Wrong — And You Can't Say So", body:"Sometimes a customer insists something happened that you know didn't. You cannot tell them they're wrong — that just creates a fight you can't win. Instead, redirect them to support. 'I'm really sorry to hear that — reach out to [platform] support directly. They deal with this all the time and they'll make it right fast.' You're not admitting fault. You're not arguing. You're pointing them at the fastest solution. That's the only smart move here.", tip:"Your job is not to win the argument. Your job is to end the interaction with a calm customer who has a path forward."},
    ]
  },
  {
    e:"💰", t:"The Science of Tips", sub:"Why people tip — and how to make it happen", free:false,
    secs:[
      {h:"The Two-Handed Handoff", body:"Research on service and tipping found that a brief, real moment of physical exchange during a transaction increases tips significantly. You can't manufacture extra contact at someone's door. But a two-handed bag presentation is the delivery version of this. When you use two hands to present the bag — facing the customer, at chest height — it creates a real exchange instead of a drop-off. Customers feel the difference without knowing why. Try it for one week straight and track your tips.", tip:"Two hands every time. It's not just about the bag staying level — it's about what it communicates."},
      {h:"Mention the Bad Weather", body:"Studies show that briefly mentioning the weather in an empathetic way — not complaining, just acknowledging — increases tips. 'Stayed moving fast for you out there — cold one tonight!' Or: 'Kept it as dry as I could!' This works because it creates a human moment. You went through something to get their food here. Saying it (without whining) makes customers feel grateful. The key is empathy, not complaint. Empathy earns tips. Complaints ask for sympathy. Those are very different things.", tip:"One sentence. Warm, not whiny. 'Kept it moving fast for you out there!'"},
      {h:"Small Unexpected Extras Trigger Tipping", body:"When someone gives you something you didn't expect — even something tiny — you feel an urge to give something back. This is one of the most reliable patterns in human behavior. Extra napkins you grabbed = unexpected gift. Keeping drinks perfectly upright and mentioning it = unexpected gift. A warm confirmation text after a drop-off = unexpected gift. Here's the key: you have to mention it out loud. 'Grabbed a few extra napkins in case you need them!' If you don't say it, they might not notice. If you do, you've created a gift — and gifts make people tip.", tip:"The mention is as important as the gesture. Say it out loud."},
      {h:"Protecting Tips That Were Pre-Set", body:"Many platforms now let customers tip before the delivery. That tip was based on their hope that you'd do a good job. Your job is to confirm that hope. A customer who pre-tipped and then gets a warm handoff and a clean drop-off photo almost never changes their tip. A customer who pre-tipped and feels like their food was handled carelessly sometimes does. Every delivery, you're either confirming or breaking the promise they made when they added that tip.", tip:"Think of every delivery as confirming a promise the customer already made when they tipped upfront."},
    ]
  },
  {
    e:"📋", t:"Recovery Scripts", sub:"Exactly what to say when there's a problem", free:false,
    secs:[
      {h:"Cold Food — Without Blaming the Restaurant", body:"Cold food is almost always the restaurant's fault — but saying that out loud makes the customer feel like you're making excuses. Don't do it. Instead: 'I'm really sorry about that. I'd contact [platform] support directly — they take temperature issues seriously and usually fix it fast.' You're not taking the blame. You're giving them the fastest path to a solution. That's what they actually want.", tip:"Never say 'the restaurant had it sitting out.' Even if it's true. Redirect to support every time."},
      {h:"Missing Item — What Not to Say", body:"Never say 'I checked the bag and everything was in there.' Even if you believe it. The moment you say that, you're in an unwinnable argument. Instead: 'I'm so sorry — I picked up the sealed bag right from the restaurant. The fastest fix is to contact [platform] support right now — they'll sort it out for you.' Let the platform handle it. That's literally what they're there for. Your rating stays clean and the customer gets their problem solved.", tip:"Never claim you checked the bag. Always redirect to support. Every time."},
      {h:"When You Actually Made the Mistake", body:"If the mistake was genuinely yours — wrong address, took too long, dropped something — own it fully and briefly. 'That was completely my fault and I'm sorry. I should have [done X] and I didn't.' Then stop talking. No 'but traffic was bad.' No 'my app was glitching.' Full ownership, no excuses, short. Studies on customer service show that customers rate a service higher after a mistake that's handled with real ownership than after a delivery where nothing went wrong at all. Own it and they'll respect you for it.", tip:"Own it fully. One sentence. Then stop. No explanations."},
    ]
  },
  {
    e:"🗺️", t:"Know Your Delivery", sub:"Different situations need different approaches", free:false,
    secs:[
      {h:"Grocery Orders vs. Restaurant Orders — Very Different", body:"Restaurant customers want their food fast and hot. That's it. Be efficient and warm. Grocery customers are completely different — they care about whether you picked good produce, whether you handled their eggs carefully, and whether you communicated about anything that was out of stock. They're stocking their kitchen, not feeding a craving right now. With grocery: be thorough, communicate everything, handle items with care. With restaurant: be fast, keep it warm, nail the handoff.", tip:"Ask yourself before each delivery: is this a 'speed and warmth' order or a 'care and communication' order?"},
      {h:"Apartments vs. Houses", body:"Houses are straightforward: walk to the door like you belong there, knock once, step back, wait. If contactless: place the bag neatly, photograph the door number, confirm. Apartments are completely different. Always text before trying to get in: 'Hi! At the main entrance with your order — could you buzz me in or meet me in the lobby?' Never stand silently outside. The customer has no idea you're there. If you can't get in, say so immediately. Quick communication in apartments earns better ratings than a slow, silent delivery every single time.", tip:"Apartment rule: text first, always. Don't assume — communicate."},
      {h:"Time of Day Changes Everything", body:"Lunch (11am–2pm): Customers are on a work break. Be fast. Keep it brief. Dinner (5pm–9pm): Customers are relaxed at home. Warmth matters most here. A genuine 'enjoy your meal' earns more at dinner than any other time. Late night (10pm–2am): Be quiet. No loud knocks. Clean drop, good photo, fast confirm. These customers tip well when you exceed their low expectations. Morning (5am–10am): Be upbeat. The bar is low early in the day and a little friendliness stands out.", tip:"Read the time like it's an instruction. It tells you how to adjust your approach before you even arrive."},
    ]
  },
  {
    e:"🏆", t:"Staying Sharp", sub:"How to keep earning more over the long run", free:true,
    secs:[
      {h:"Every Delivery Is a Fresh Start", body:"In a regular job, one bad day doesn't ruin your whole career. In gig delivery, every single order is rated on its own — by a different person who knows absolutely nothing about your last delivery. That's actually good news. A bad delivery doesn't have to affect the next one — unless you carry the frustration with you. The most valuable skill in this job isn't driving. It's starting fresh every single time.", tip:"The customer you're about to deliver to has never met you. They're ready to give you 5 stars. Don't bring someone else's frustration to their door."},
      {h:"The 60-Second Reset Between Bad Deliveries", body:"After a rough delivery, take 60 seconds before accepting the next order. Don't look at your rating. Don't replay what happened. Do this: 1. Breathe. It's over. You can't change it. 2. Remind yourself the next customer is a completely different person. 3. Pick one small thing to do well on the next delivery — just one. That's the whole reset. Drivers who do something like this are more consistent, rate higher, and earn more over time. 60 seconds is worth it.", tip:"Set one small intention before each delivery. 'I'm going to nail the handoff on this one.'"},
      {h:"Burnout Warning Signs", body:"Burnout doesn't usually hit all at once. It sneaks up. Watch for these: You stop texting customers proactively. The bag handoff becomes a drop-and-go. Low ratings make you angry instead of motivated. You're not making eye contact at the door anymore. If any of these sound familiar, the fix is usually not quitting — it's adjusting. Fewer hours. A different zone. Tracking your weekly tip average instead of every single rating. Consistency over time is where the real money is.", tip:"Track your weekly tip average — not individual ratings. Trends motivate. Single data points just hurt."},
    ]
  },
];

// ─── Message Templates ────────────────────────────────────────────────────────
var MSG_CATS = [
  {e:"📲",t:"What to Say When You Arrive",sub:"Texts that get 5-star ratings",secs:[
    {h:"Standard arrival",msg:"Hey! Pulling up now with your order from [restaurant]. I'll leave it at your door. Enjoy! 😊",w:"Sets expectations before they open the app. Customers often rate you before they even see the food."},
    {h:"A few minutes away",msg:"Hi! Just a heads up — about 3-4 minutes away with your food. See you soon!",w:"Advance notice means they meet you at the door or are ready when you arrive. Cuts your wait time too."},
    {h:"Apartment building",msg:"Hi! I'm at the main entrance with your order. Could you buzz me in or meet me at the lobby? Thanks!",w:"Always text before calling for apartments. Most people respond in under 30 seconds when their food is outside."},
    {h:"Leave at door confirmation",msg:"Your order has been left at your door. Enjoy your meal! 🍕",w:"A quick confirmation nearly eliminates false non-delivery complaints."},
    {h:"Office or business",msg:"Hi! Downstairs at [building] with your order. Happy to leave it at the front desk or you can meet me!",w:"Offering options signals professionalism and saves you a wasted trip."},
  ]},
  {e:"⏰",t:"When You Are Running Late",sub:"How to turn a bad situation into a 5-star",secs:[
    {h:"Restaurant taking forever",msg:"Hey! Your order is still being prepared at the restaurant. I'm here and will head your way as soon as it's ready. Sorry for the wait!",w:"Customers who hear nothing assume you forgot them. One text flips that completely."},
    {h:"Stuck in traffic",msg:"Hi! Running a little behind due to traffic. On my way and will be there as soon as I can — thanks for your patience!",w:"Never blame the app or restaurant. Own it briefly and stay positive."},
    {h:"Significantly late",msg:"Hi! Really sorry for the delay tonight. Dealing with [traffic / long restaurant wait] and I'll be there in about [X] minutes. I truly appreciate your patience.",w:"Bigger delays need a bigger acknowledgment. Be direct, give a real ETA."},
    {h:"Follow up after a late delivery",msg:"Just dropped off your order — really sorry for the wait tonight. Hope everything still tastes great! Have a good evening.",w:"Almost no drivers do this. It often turns a 3-star into a 5-star."},
  ]},
  {e:"🚨",t:"When Something Goes Wrong",sub:"Scripts that protect your rating",secs:[
    {h:"Cannot find the address",msg:"Hi! Having a little trouble locating you. I'm near [landmark]. Could you help with directions or a gate code?",w:"Always text before calling. Give them something specific to work with."},
    {h:"Need a gate code",msg:"Hi! At the gate but need a code to get in. Could you send it over? Right here!",w:"People respond in seconds when their food is right outside."},
    {h:"No one answers the door",msg:"Hi! At your door and knocked. I'll wait a couple minutes — if I don't hear back I may need to leave it at the door. Just want to make sure you get it!",w:"Documents your attempt and gives them a chance to respond."},
    {h:"Safe drop-off with photo",msg:"Your order has been left at your door. Took a photo as confirmation. Enjoy!",w:"Mentioning the photo casually shields you from false complaints."},
    {h:"Large apartment complex",msg:"Hi! I'm in the [building/complex name] parking lot but having trouble finding your unit. Could you help — which building number, entrance, or stairwell? Almost there!",w:"Asking for a specific landmark gets you a useful answer fast."},
  ]},
  {e:"⭐",t:"How to Get Better Tips and Ratings",sub:"What to say — and what never to say",secs:[
    {h:"Natural sign-off that earns tips",msg:"Enjoy your meal! If anything ever comes up feel free to reach out through the app. Have a great night! 😊",w:"Positions you as someone who cares — without ever asking for anything."},
    {h:"When you went above and beyond",msg:"Thanks for the order! Made sure to keep everything upright and warm on the way. Hope you enjoy every bite!",w:"Pointing out your care makes them look in the bag with appreciation, not suspicion."},
    {h:"When you added something extra",msg:"Hi! The bag was light on napkins so I grabbed a few extras. Everything else looks good — enjoy!",w:"If you don't mention it they might not notice. If you do, it's memorable."},
    {h:"What you should NEVER say",caution:true,msg:"Please leave me 5 stars! / I really need a good rating this week. / Could you add a tip? / This order was really far.",w:"Asking for ratings or tips is against platform rules and makes customers deeply uncomfortable. It almost always results in a worse rating, not a better one."},
  ]},
  {e:"🏢",t:"Tricky Delivery Situations",sub:"Word-for-word scripts for the hard ones",secs:[
    {h:"Hotel delivery",msg:"Hi! In the lobby of [hotel] with your order. The front desk can't accept deliveries — would you be able to come down? Happy to wait!",w:"Always announce from the lobby, not the room floor."},
    {h:"Gated community, no code",msg:"Hi! At the gate but did not get a code with the order. Could you send it or buzz me in? Right here!",w:"Don't wait. Text immediately. Every minute at the gate is wasted."},
    {h:"Customer seems upset at the door",msg:"I'm really sorry about that. Got here as fast as I could. I hope the rest of your evening is better!",w:"Don't defend yourself. Acknowledge, apologize briefly, wish them well, leave."},
  ]},
];

// ─── Defend Data ──────────────────────────────────────────────────────────────
var PLATFORMS_DEFEND = [
  {id:"doordash",  label:"DoorDash",  color:"#FF3008", e:"🔴"},
  {id:"ubereats",  label:"Uber Eats", color:"#06C167", e:"🟢"},
  {id:"spark",     label:"Spark",     color:"#0071CE", e:"🔵"},
  {id:"instacart", label:"Instacart", color:"#43B02A", e:"🟩"},
];

var PLATFORM_HABITS = {
  doordash:[
    {e:"📸",t:"Photo every drop-off before you leave",why:"Your delivery photo is your #1 protection. DoorDash support checks it against your GPS location. A clear photo showing the food at the door with the address visible wins almost every false non-delivery case. Without it, you have no case. Make it a habit every single time — no exceptions.",urgent:true},
    {e:"💬",t:"Text the customer on every order",why:"Your in-app message history is timestamped and visible to Dasher support. When a customer claims you never communicated, your message thread proves otherwise. Support agents check this on every dispute. One text per delivery protects you completely.",urgent:true},
    {e:"📍",t:"Keep GPS on the entire shift",why:"DoorDash logs your GPS location throughout the delivery. If a customer reports non-delivery, support pulls your GPS track to confirm you were at their address. Without GPS data, your word means nothing. Location must stay on — always.",urgent:true},
    {e:"🖼️",t:"Screenshot your delivery confirmation",why:"After the app shows delivery confirmed, screenshot it before moving on. This is the platform's own timestamped record that the order was completed. It's separate from your photo and equally important in a dispute."},
    {e:"💎",t:"Doing your best always pays off",why:"Drivers who genuinely care — who handle every bag carefully, who treat every door like it matters — build a track record that compounds over time. Better ratings, better tips, better orders. Doing your best isn't just the right thing. It's the most profitable thing."},
    {e:"📋",t:"Note the order number on any problem delivery",why:"If a restaurant has long wait times, a customer seems upset, or anything feels off — quickly note the DoorDash order number. This is what support agents use to pull your delivery record, and it makes any appeal far stronger."},
  ],
  ubereats:[
    {e:"📸",t:"Photo the drop-off — Uber requires it",why:"Uber Eats requires a photo for contactless deliveries. That photo is timestamped, geotagged, and stored in Uber's system. In any dispute, support pulls it immediately. If you didn't take one, you have no evidence. Take it every time.",urgent:true},
    {e:"💬",t:"Use in-app messaging only — never SMS",why:"Uber support can only see your in-app message history, not regular text messages. Always message through the Uber Eats app so every communication is logged. If a customer claims you ignored them, your in-app messages are your proof.",urgent:true},
    {e:"📍",t:"GPS must stay on — Uber uses it heavily",why:"Uber's dispute system relies on GPS trip data more than any other platform. Agents check your GPS track in every delivery complaint review. If GPS was off, they can't verify your delivery and they typically side with the customer.",urgent:true},
    {e:"🆔",t:"Screenshot your Trip ID on problem deliveries",why:"Uber identifies every delivery by a Trip ID. In any support appeal, you must include the Trip ID — without it agents can't find your record. Screenshot the trip summary screen after any delivery that felt off."},
    {e:"⭐",t:"Your rating affects which trips you see",why:"Uber shows higher-paying trips to drivers with better ratings. A rating below 4.7 on Uber Eats starts to reduce your trip quality. Uber's policy allows removal of ratings that reflect restaurant errors, navigation failures, or factors outside your control — request it when this happens."},
    {e:"🔄",t:"Document long restaurant waits with a message",why:"If you wait more than 10 minutes at a restaurant, send the customer an in-app message noting the delay. This creates a timestamped record that any wait time was the restaurant's fault, not yours — which matters if they leave a low rating about timing."},
  ],
  spark:[
    {e:"📸",t:"Photo every drop-off — required for every order",why:"Walmart Spark requires a delivery photo on every order. That photo is your proof of delivery and your protection against false claims. Take a clear photo showing the bags at the door with the house number visible. Without it, Spark support will almost always side with the customer.",urgent:true},
    {e:"📦",t:"Check and photograph the full order at the store",why:"Spark drivers are responsible for picking items. If an item is missing, customers can file a complaint against you. Before leaving the store, verify all items, note anything unavailable in the app, and photograph your cart on large orders. This documents that you fulfilled the order correctly.",urgent:true},
    {e:"💬",t:"Message customers about every substitution",why:"When an item is unavailable and you substitute it, always message the customer through the Spark app before you leave the store. This shows you followed the substitution process. Spark agents check your message history in every substitution dispute.",urgent:true},
    {e:"📍",t:"GPS must stay on the entire trip",why:"Spark uses GPS data to verify delivery location and timing. If your GPS confirms you were at their address, that is your strongest evidence. If GPS was off, you have no way to prove the delivery happened."},
    {e:"🧾",t:"Screenshot your delivery summary",why:"After completing an order, the Spark app shows a summary of what was delivered including substitutions and unavailable items. Screenshot this every time. If a customer claims items were missing, this screen shows what the system recorded as delivered."},
    {e:"⭐",t:"On-time rating is tracked separately",why:"Spark tracks your on-time delivery rate separately from your customer rating. Both affect your access to better batches. If a store delay makes you late, document it by messaging the customer and noting the wait. This gives you grounds to dispute a late delivery mark."},
  ],
  instacart:[
    {e:"📸",t:"Photo every drop-off — no exceptions",why:"Instacart requires a delivery photo and uses it in every non-delivery dispute. The photo must show the items at the door with the address or house number visible. Support agents look at this first. Without it, you cannot win any non-delivery case.",urgent:true},
    {e:"🛒",t:"Scan every item at the store",why:"Instacart tracks which items you scanned. If a customer says an item was missing and you scanned it, that scan record is your proof. If you didn't scan it, the system has no record you ever had it. Scan every single item, every time.",urgent:true},
    {e:"💬",t:"Message customers about every replacement",why:"When an item is out of stock and you make a replacement, always message the customer through the Instacart app before you check out. If they dispute the replacement later, your message shows you followed the right process.",urgent:true},
    {e:"📋",t:"Note your Batch ID on any problem order",why:"Instacart support identifies orders by Batch ID. For any delivery where something goes wrong, note or screenshot the Batch ID immediately. You cannot file an effective appeal without it."},
    {e:"⭐",t:"4.7 rating is the key number to protect",why:"Instacart shoppers rated below 4.7 see fewer and lower-paying batches. Some high-paying batches are only available above 4.8. Rating removal is possible for complaints caused by out-of-stock items, store errors, or app issues — but you must request it and frame it correctly."},
    {e:"🔄",t:"Document difficult customers before they complain",why:"If a customer is rude or makes unreasonable demands, note it in the Instacart app's feedback right away. This creates a record before any dispute is filed. It signals to support that the customer has a history — and that helps you if they later file a false complaint."},
  ],
};

var PLATFORM_APPEALS = {
  doordash:[
    {e:"🚫",t:"False Non-Delivery Complaint",urgency:"HIGH — Can trigger deactivation",color:"#F43F5E",secs:[
      {h:"Standard non-delivery dispute",msg:"Hello Dasher Support,\n\nI am writing to dispute a false non-delivery complaint on Dasher order #[ORDER ID] from [DATE].\n\nThis delivery was completed successfully. My documentation:\n- Delivery photo showing the order placed at [ADDRESS] with the door visible\n- GPS data confirming my location at [ADDRESS] at [TIME]\n- App delivery confirmation timestamp\n\nThe customer's claim is inaccurate. I am requesting:\n1. This complaint be reviewed against my delivery photo and GPS data\n2. Any negative impact on my completion rate or Dasher standing be reversed\n3. The customer's account be reviewed if this is part of a pattern\n\nThank you.",w:"'Dasher order #' is the exact term DoorDash support uses to pull your record. List each piece of evidence as a separate bullet — agents check each one individually."},
      {h:"Same address filing multiple complaints",msg:"Hello Dasher Support,\n\nI am writing about a pattern of false complaints I believe is coming from the same location.\n\nComplaints from [ADDRESS]:\n- Order #[ORDER ID 1] on [DATE 1] — I have delivery photo proof\n- Order #[ORDER ID 2] on [DATE 2] — I have delivery photo proof\n\nI believe this customer is repeatedly filing false non-delivery complaints to receive refunds. I am asking for:\n1. A review of all complaints from this address against my delivery evidence\n2. This address to be flagged in DoorDash's system if a pattern is confirmed\n3. All negative effects on my account to be reversed\n\nThank you.",w:"The phrase 'pattern of false complaints' moves your ticket from an individual review to a fraud investigation — handled differently and more seriously."},
    ]},
    {e:"⭐",t:"Unfair Customer Rating",urgency:"MEDIUM — Affects order access and Top Dasher",color:"#F5A623",secs:[
      {h:"Rating caused by restaurant error",msg:"Hello Dasher Support,\n\nI am requesting removal of a 1-star rating on order #[ORDER ID] from [DATE].\n\nThis rating was caused by a restaurant error, not my performance:\n- I received a sealed bag from the restaurant\n- I had no ability to inspect or verify the contents\n- My delivery was completed correctly and on time\n\nDoorDash policy allows removal of ratings that reflect factors outside the Dasher's control. A restaurant packing error falls directly within that policy. My rating before this was [X stars].\n\nPlease review and remove this rating.\n\nThank you.",w:"'Factors outside the Dasher's control' is the exact language in DoorDash's internal rating review policy. Using it gives the agent the justification to approve the removal."},
      {h:"Rating caused by wait time",msg:"Hello Dasher Support,\n\nI am requesting removal of a rating on order #[ORDER ID] from [DATE].\n\nThe customer left a low rating due to delivery time. I want to note:\n- The order was not ready at the restaurant until [TIME]\n- I waited [X] minutes at [restaurant name] before the order was ready\n- I delivered the order as quickly as possible once I had it\n\nRestaurant preparation delays are outside a Dasher's control per DoorDash policy. I am asking for this rating to be removed.\n\nThank you.",w:"DoorDash can see your pickup timestamp versus the order ready time. Naming the restaurant and the wait time gives the agent something concrete to verify."},
    ]},
    {e:"📉",t:"Completion Rate Wrongly Affected",urgency:"HIGH — Impacts Dasher tier and access",color:"#F43F5E",secs:[
      {h:"Completion rate dispute",msg:"Hello Dasher Support,\n\nMy completion rate has been negatively affected by a complaint on order #[ORDER ID] from [DATE] that I believe is incorrect.\n\nProof of successful delivery:\n- Delivery photo at [ADDRESS]\n- GPS data confirming I was at the address at [TIME]\n- App delivery confirmation\n\nMy completion rate directly affects my Dasher status and access to Top Dasher benefits and priority orders. I am asking that this complaint be reviewed and reversed if it is not supported by the evidence.\n\nThank you.",w:"Naming 'Dasher status,' 'Top Dasher,' and 'priority orders' shows the agent this has a real financial impact on you. That makes them more likely to escalate a reversal."},
    ]},
    {e:"🔄",t:"Escalation — Appeal Was Denied",urgency:"USE AFTER A FIRST DENIAL",color:"#8B5CF6",secs:[
      {h:"Second appeal to senior agent",msg:"Hello,\n\nI am following up on a previous Dasher support request regarding order #[ORDER ID] from [DATE].\n\nMy original appeal was not resolved to my satisfaction. I am requesting escalation to a senior Dasher account specialist because:\n- My delivery photo evidence was not properly reviewed\n- The complaint directly contradicts my GPS track, photo timestamp, and app delivery record\n- This complaint is continuing to impact my account standing and income\n\nI have been an active Dasher since [DATE] with a strong record. I am asking for a thorough senior review.\n\nThank you.",w:"Asking for a 'senior Dasher account specialist' routes your ticket to a different tier of review. Most drivers don't know to ask for this. It significantly improves your odds."},
    ]},
  ],
  ubereats:[
    {e:"🚫",t:"False Non-Delivery Complaint",urgency:"HIGH — Can affect your account standing",color:"#F43F5E",secs:[
      {h:"Standard non-delivery dispute",msg:"Hello Uber Eats Support,\n\nI am writing to dispute a non-delivery complaint on trip #[TRIP ID] from [DATE].\n\nI completed this delivery successfully. My documentation:\n- Delivery photo taken at [ADDRESS] at [TIME] — geotagged and timestamped\n- GPS trip data showing my location at the delivery address\n- In-app delivery confirmation record\n\nI am requesting:\n1. This complaint be reviewed against my photo and GPS trip data\n2. Any negative effect on my account or completion rate be reversed\n3. A review of this customer's complaint history if this is a pattern\n\nThank you.",w:"Uber support works from Trip IDs — include it in the first line. 'Geotagged and timestamped' tells the agent exactly what to look for in your photo record."},
      {h:"Contactless delivery — no knock requested",msg:"Hello Uber Eats Support,\n\nI am disputing a complaint on trip #[TRIP ID] from [DATE].\n\nThe customer selected contactless delivery. Here is what happened:\n1. I arrived at [ADDRESS] at [TIME]\n2. I placed the order at the door as instructed — no knock or ring per the customer's preference\n3. I took and submitted a delivery photo\n4. The app confirmed delivery and a notification was sent\n\nI followed the customer's exact delivery instructions. Please review and remove this complaint.\n\nThank you.",w:"Uber Eats has a specific policy protecting drivers who follow contactless delivery instructions. Framing your appeal around 'the customer's delivery preference' invokes that policy directly."},
    ]},
    {e:"⭐",t:"Unfair Rating",urgency:"MEDIUM — Affects trip quality and earnings",color:"#F5A623",secs:[
      {h:"Rating caused by restaurant issue",msg:"Hello Uber Eats Support,\n\nI am requesting removal of a low rating on trip #[TRIP ID] from [DATE].\n\nThis rating does not reflect my service. The customer was dissatisfied with [missing item / food quality / wait time], which was caused by the restaurant, not by me.\n\nI picked up a sealed order from [RESTAURANT NAME]. I had no way to inspect or modify the contents. My delivery was completed correctly.\n\nUber policy allows removal of ratings caused by factors outside the delivery partner's control. My rating before this was [X]. Please review and remove this rating.\n\nThank you.",w:"'Factors outside the delivery partner's control' mirrors Uber's internal review language. Naming the restaurant specifically gives the agent something to verify independently."},
    ]},
    {e:"🔄",t:"Escalation — First Appeal Denied",urgency:"USE AFTER A FIRST DENIAL",color:"#8B5CF6",secs:[
      {h:"Escalate to senior specialist",msg:"Hello,\n\nI am following up on a previous request about Uber Eats trip #[TRIP ID] from [DATE].\n\nMy initial appeal was not resolved. I am requesting escalation to a senior account specialist for a full review because:\n- My photo and GPS evidence were not properly evaluated\n- The complaint contradicts my documented delivery record\n- This is continuing to affect my account and income\n\nI have been an Uber delivery partner since [DATE] with a strong track record. I am asking for a thorough review.\n\nThank you.",w:"Asking for 'senior account specialist' by name triggers a routing change. Most drivers exhaust themselves on first-tier agents — this one request often gets a different result."},
    ]},
  ],
  spark:[
    {e:"🚫",t:"False Non-Delivery Complaint",urgency:"HIGH — Can affect Spark Driver standing",color:"#F43F5E",secs:[
      {h:"Standard non-delivery dispute",msg:"Hello Spark Driver Support,\n\nI am writing to dispute a non-delivery complaint on delivery #[DELIVERY ID] from [DATE].\n\nThis delivery was completed successfully. My documentation:\n- Delivery photo showing the order placed at [ADDRESS]\n- GPS data confirming my location at the delivery address at [TIME]\n- App delivery confirmation timestamp\n\nI am requesting:\n1. This complaint be reviewed against my delivery photo and GPS record\n2. Any negative impact on my driver rating or standing be reversed\n\nThank you.",w:"Spark support uses Delivery IDs to pull records. Include it in the first line. Spark's team is smaller than DoorDash's — follow up after 48 hours if you don't hear back."},
    ]},
    {e:"📦",t:"Missing or Substituted Item Dispute",urgency:"HIGH — Common Spark-specific complaint",color:"#F43F5E",secs:[
      {h:"Item was out of stock — you followed protocol",msg:"Hello Spark Driver Support,\n\nI am writing to dispute a complaint about a missing item on delivery #[DELIVERY ID] from [DATE].\n\nThe item [ITEM NAME] was not available at the Walmart store. I handled this correctly:\n- Marked the item as unavailable in the Spark app\n- Selected an approved substitution / notified the customer of unavailability\n- Messaged the customer through the app before checking out\n\nI followed Spark's out-of-stock protocol exactly. Please review my in-app actions for this batch and remove this complaint.\n\nThank you.",w:"Spark agents can see exactly what you did in the app — when you marked items unavailable, when you messaged the customer, when you checked out. This appeal points them directly to that record."},
    ]},
    {e:"🔄",t:"Escalation — Appeal Was Denied",urgency:"USE AFTER A FIRST DENIAL",color:"#8B5CF6",secs:[
      {h:"Escalate to senior review",msg:"Hello,\n\nI am following up on a previous Spark Driver support request about delivery #[DELIVERY ID] from [DATE].\n\nMy initial request was denied. I am requesting a senior review because:\n- My delivery photo and GPS record were not properly evaluated\n- My in-app actions for this batch were not reviewed against the complaint\n- This complaint is unfairly affecting my driver rating and access to batches\n\nI have been a Spark Driver since [DATE] with a positive record. I am asking for a full review.\n\nThank you.",w:"Following up with a senior review request — and citing your tenure — often breaks through the first-tier denial cycle."},
    ]},
  ],
  instacart:[
    {e:"🚫",t:"False Non-Delivery Complaint",urgency:"HIGH — Can affect Shopper access",color:"#F43F5E",secs:[
      {h:"Standard non-delivery dispute",msg:"Hello Instacart Support,\n\nI am writing to dispute a non-delivery complaint on batch #[BATCH ID] from [DATE].\n\nI completed this delivery successfully. My evidence:\n- Delivery photo showing the bags at [ADDRESS]\n- GPS data confirming I was at the delivery location at [TIME]\n- App delivery confirmation record\n- All items in this batch were scanned and verified\n\nI am requesting:\n1. This complaint be reviewed against my delivery photo and GPS data\n2. Any impact on my Shopper rating or standing be reversed\n\nThank you.",w:"'Batch ID' is the Instacart-specific term. Including 'all items were scanned' adds a data point agents can verify against the scan record — unique to Instacart and very strong evidence."},
    ]},
    {e:"📦",t:"Missing Item or Wrong Item Dispute",urgency:"HIGH — Most common Instacart complaint",color:"#F43F5E",secs:[
      {h:"Item was out of stock — you followed protocol",msg:"Hello Instacart Support,\n\nI am disputing a complaint about a missing item on batch #[BATCH ID] from [DATE].\n\nThe item [ITEM NAME] was not available at [STORE NAME]. I handled this correctly:\n- Marked the item as out of stock in the Instacart app at [TIME]\n- Selected an approved replacement / left the item unfulfilled per the customer's preference\n- Messaged the customer through the app before checking out\n\nMy in-app actions for this batch show I followed Instacart's out-of-stock protocol exactly. Please review my batch activity and remove this complaint.\n\nThank you.",w:"Instacart's batch activity log shows every action you took. This appeal directs the agent to that log, which is far more convincing than a verbal account."},
    ]},
    {e:"🔄",t:"Escalation — First Appeal Denied",urgency:"USE AFTER A FIRST DENIAL",color:"#8B5CF6",secs:[
      {h:"Senior review request",msg:"Hello,\n\nI am following up on a previous Instacart support request about batch #[BATCH ID] from [DATE].\n\nMy first appeal was denied. I am requesting escalation to a senior Shopper support specialist because:\n- My delivery photo and batch activity log were not fully reviewed\n- The complaint contradicts my documented in-app actions\n- This is continuing to affect my Shopper rating and batch access\n\nI have been an active Instacart Shopper since [DATE] with a strong record. I am asking for a complete review.\n\nThank you.",w:"Requesting a 'senior Shopper support specialist' by that title moves your ticket past first-tier agents who use scripted responses."},
    ]},
  ],
};

var PLATFORM_CHECKLISTS = {
  doordash:[
    {e:"📸",t:"Delivery photo taken — door and bags visible"},
    {e:"💬",t:"Customer messaged through DoorDash app"},
    {e:"📍",t:"GPS was active the entire delivery"},
    {e:"📋",t:"Order marked delivered in the app"},
    {e:"🖼️",t:"Delivery confirmation screen screenshotted"},
    {e:"📝",t:"Order number noted if anything felt off"},
  ],
  ubereats:[
    {e:"📸",t:"Photo submitted through Uber Eats app"},
    {e:"💬",t:"Customer messaged in-app (not SMS)"},
    {e:"📍",t:"GPS active for the full trip"},
    {e:"🆔",t:"Trip ID screenshotted if anything went wrong"},
    {e:"📋",t:"Delivery confirmed in the Uber Eats app"},
    {e:"⏱️",t:"Long restaurant wait documented with a customer message"},
  ],
  spark:[
    {e:"📸",t:"Delivery photo taken showing all bags at door"},
    {e:"💬",t:"Customer messaged via Spark app about any changes"},
    {e:"📍",t:"GPS active throughout the trip"},
    {e:"📋",t:"Delivery confirmed in the Spark app"},
    {e:"🛒",t:"Any out-of-stock items marked in app before checkout"},
    {e:"🧾",t:"Delivery summary screenshotted after completion"},
  ],
  instacart:[
    {e:"📸",t:"Delivery photo submitted in the Instacart app"},
    {e:"🛒",t:"All available items scanned in store"},
    {e:"💬",t:"Customer messaged in-app about any substitutions"},
    {e:"📍",t:"GPS active throughout the entire batch"},
    {e:"📋",t:"Batch confirmed complete in the app"},
    {e:"🧾",t:"Batch summary screenshotted after delivery"},
  ],
};

// ─── Beginner Content ─────────────────────────────────────────────────────────
var BASICS_CATS = [
  {
    e:"🚀", t:"Starting Out", sub:"What you need to know before your first delivery",
    secs:[
      {h:"What these apps actually are", body:"DoorDash, Uber Eats, Spark, and Instacart are apps that pay you to pick up orders and drop them off. A customer orders food or groceries on their phone. The app finds a driver nearby — that's you. You pick it up and deliver it. Simple as that. You work when you want, stop when you want. Nobody is your boss."},
      {h:"How you make money", body:"You earn a base pay for each delivery — the app sets this. On top of that, customers can add a tip. Tips are usually where the real money comes from. The better your service, the more tips you earn. Some apps also offer extra bonuses for delivering during busy times. These are called 'boosts' or 'surges' and they're worth taking advantage of."},
      {h:"What a rating is and why it matters", body:"After every delivery, customers can rate you from 1 to 5 stars. 5 stars is perfect. 1 star is the worst. Your average rating across all deliveries is your score. This matters a lot — if your rating gets too low, the app will give you fewer orders, worse orders, or even remove you. Aim for 4.7 or higher on every platform. That's the safe zone."},
      {h:"How to accept an order", body:"When an order comes in, your phone will buzz and a screen will pop up showing you the details — where to pick up, where to drop off, and how much it pays. You have a short window to accept or decline. If you accept, follow the map to the restaurant, then to the customer. If you decline too many in a row, some apps may temporarily pause your ability to receive orders."},
      {h:"What happens if you make a mistake", body:"Everyone makes mistakes — wrong address, late delivery, dropped item. The most important thing is to stay calm and communicate. Text the customer right away. Be honest and apologize briefly. Don't overthink it. Most customers are understanding when you reach out. The ones who aren't — support can often reverse a bad rating if you have evidence you did your best."},
    ]
  },
  {
    e:"📱", t:"Your Phone", sub:"The tech stuff made simple",
    secs:[
      {h:"Why GPS must stay on — and how to turn it on", body:"GPS is what tells the app where you are. Every platform tracks your location during a delivery to confirm you went to the right address. If GPS is off and a customer claims you never arrived, you have no way to prove them wrong. To turn GPS on: go to your phone Settings, find Location, and make sure it's turned ON. Set it to 'Always' or 'While Using App' for delivery apps."},
      {h:"How to keep your battery alive on a long shift", body:"Running GPS and maps all day drains your battery fast. Before your shift: charge your phone to 100%. Bring a car charger — this is not optional, it's essential. In your phone settings, lower the screen brightness a little. Close any apps you're not using. If your battery hits 20%, plug it in immediately. A dead phone mid-delivery is one of the most stressful things that can happen."},
      {h:"How to switch between the delivery app and maps", body:"You'll often need to flip between your delivery app and Google Maps or Waze for directions. To switch: tap the little square or circle button at the bottom of your phone (this shows all open apps). Tap the one you need. Your place in the delivery app stays exactly where it was — nothing resets. Practice this a few times before your first shift so it feels natural."},
      {h:"What to do if the app freezes or crashes", body:"It happens to every driver. If the app freezes: press the home button, wait 5 seconds, then tap the app again to reopen it. If it crashes completely: close it fully (swipe it away in your recent apps), then reopen it. Your delivery will still be there. If the app is completely broken and you can't reopen it, call support immediately — their number is in the app or on the platform website."},
      {h:"Notifications — make sure they're turned on", body:"Your phone needs to be able to buzz and ring when a new order comes in. If notifications are turned off, you'll miss orders completely. Go to your phone Settings, find Notifications, find the delivery app, and make sure everything is switched ON. Also make sure your phone is NOT on silent mode during your shift. Many drivers lose dozens of orders just because their phone was on silent."},
    ]
  },
  {
    e:"🏃", t:"During a Delivery", sub:"What to do from start to finish",
    secs:[
      {h:"Step by step — your first delivery", body:"1. Accept the order when it pops up. 2. Drive to the restaurant — the app shows you the address and gives you a map. 3. Go inside, give them your name or show your phone, and wait for the order. 4. Pick up the bag — handle it carefully, keep drinks upright. 5. Drive to the customer's address. 6. Hand off the food or leave it at the door as instructed. 7. Take a photo. 8. Mark it as delivered in the app. That's it."},
      {h:"What 'Leave at Door' means", body:"Many customers choose contactless delivery. This means they do NOT want you to knock or ring the bell. They want you to leave the food at their door quietly. When you see 'Leave at Door': place the bag neatly at the door, take a clear photo showing the bag AND the door number, then mark it delivered in the app. Do not knock. Do not ring. Just leave it clean and move on."},
      {h:"Taking the delivery photo", body:"This is one of the most important habits you can build. After every delivery, take a photo before you walk away. Your photo should show the bag sitting at the door with the door number or address visible. This photo is your proof that you delivered. If a customer ever says they didn't get their order, this photo is what saves you. Take it every single time — rain, dark, fast or slow."},
      {h:"What to do if you can't find the address", body:"Don't panic and don't just leave. First: double-check the address in the app — make sure you're on the right street. Second: call the customer using the in-app call button. Third: if no answer, send a text through the app saying where you are and asking for help. Give them 2-3 minutes to respond. If they still don't answer, contact support through the app before leaving. Never just abandon an order without trying first."},
      {h:"What to do if the restaurant doesn't have your order", body:"This is more common than you'd think. Stay calm. Show the restaurant your app screen with the order details. Ask them to check under the customer's name or order number. If they truly don't have it, contact support through the app immediately — do not leave without notifying support. Support will either send you to a different location or cancel the order. You should not be penalized for a restaurant error."},
    ]
  },
  {
    e:"💸", t:"Getting Paid", sub:"How the money actually works",
    secs:[
      {h:"How and when you get paid", body:"Most platforms pay once a week, automatically deposited to your bank account. You can also cash out early (sometimes instantly, sometimes for a small fee) through a feature called Fast Pay or Instant Pay. To set this up: go to your app's Earnings section and add your bank account or debit card. Make sure your information is correct — wrong account details mean delayed payments."},
      {h:"What a boost or surge means", body:"During busy times — lunch, dinner, weekends, bad weather — apps offer extra money per delivery. This might show up as 'Peak Pay,' 'Surge,' or a dollar amount added on top of regular pay. These times are worth working if you can. You don't have to do anything special to earn it — just be logged in and accepting orders during the boost window. The app will tell you when one is active."},
      {h:"Why some orders pay more than others", body:"Longer distance = more pay. Harder deliveries (like a long drive or a big grocery order) = more pay. Busy times = more pay. Some orders also have bigger tips already added by the customer before you even accept. Over time you'll start to spot good orders quickly. A good rule of thumb: if the pay is less than $1 per mile, it may not be worth taking — but decide based on your own costs and situation."},
      {h:"Tips — when they show up and why they vary", body:"Some tips appear immediately after delivery. Others show up hours later because customers add them after they receive the food. Don't be alarmed if a tip isn't there right away. If a customer said they'd tip and it never appeared, there's nothing you can do — platforms don't force tipping. The best way to earn more tips is to focus on every delivery: warm greeting, careful handling, confirmation text. It compounds over time."},
    ]
  },
  {
    e:"🔴", t:"DoorDash — The Basics", sub:"Platform-specific things every DoorDash driver needs to know",
    secs:[
      {h:"How DoorDash orders work", body:"When an order comes in, you see the pickup restaurant, the drop-off address, the pay, and the distance. You have about 45 seconds to accept or decline. After you accept: drive to the restaurant, tap 'Arrived at Store' in the app, pick up the order, tap 'Picked Up,' then drive to the customer. When you arrive, tap 'Arrived at Customer,' complete the delivery, take your photo, and tap 'Delivered.' Every tap matters — they track your timing."},
      {h:"The DoorDash rating system", body:"DoorDash shows you your last 100 deliveries. Your score is based on those. A score below 4.2 puts you at risk of deactivation. A score above 4.7 keeps you in good standing. You can see your rating in the app under your profile. If you get a bad rating that wasn't your fault — restaurant error, wrong item in the bag — you can contact support and request a review."},
      {h:"Completion rate — what it is and why it matters", body:"Your completion rate is the percentage of orders you accept and then actually complete. If you accept an order and then unassign yourself from it, your completion rate goes down. DoorDash requires a minimum of 80% completion. To protect it: only accept orders you're sure you can complete, and if something goes wrong mid-delivery, contact support before unassigning."},
      {h:"Top Dasher — what it means", body:"Top Dasher is a status DoorDash gives to drivers who meet certain standards: 4.7+ rating, 95%+ acceptance rate, 95%+ completion rate, 100+ deliveries in the month, and at least 200 total deliveries. Top Dashers get to dash anytime without scheduling in advance. It's worth working toward once you're comfortable with the basics."},
    ]
  },
  {
    e:"🟢", t:"Uber Eats — The Basics", sub:"Platform-specific things every Uber Eats driver needs to know",
    secs:[
      {h:"How Uber Eats orders work", body:"Go online in the app and orders will start coming to you. When one arrives: you see the restaurant, the drop-off, and the fare. Accept it and head to the restaurant. When you arrive, tap 'I'm here' so the customer knows you're waiting. Pick up the order when it's ready. Follow the map to the customer. For contactless: leave it at the door, take a photo through the app, and confirm delivery. Uber requires the in-app photo — not your camera app."},
      {h:"Your Uber Eats rating", body:"Customers rate you after each delivery. Your rating shows as an average out of 5. Uber requires drivers to maintain a 4.7 or higher rating. Below that, you may see fewer high-paying trips. Uber does allow you to request removal of ratings caused by things outside your control — restaurant errors, navigation problems, long wait times that weren't your fault."},
      {h:"Trip ID — what it is and why you need it", body:"Every delivery on Uber Eats has a Trip ID — a unique code for that specific order. You can find it in your earnings history after a delivery. If you ever need to dispute something with support — bad rating, false complaint, missing payment — you must include the Trip ID. Without it, support agents can't find your record. Screenshot it any time a delivery feels off."},
      {h:"Uber Pro — levels and what they mean", body:"Uber has a tier system: Blue, Gold, Platinum, Diamond. Higher tiers unlock better benefits like priority support and cash back on gas. You move up by completing deliveries with a high rating. The Diamond tier requires a 4.85+ rating and 100 trips in a quarter. Don't stress about tiers when you're starting — focus on good service first and the levels will follow."},
    ]
  },
  {
    e:"🔵", t:"Spark — The Basics", sub:"Platform-specific things every Spark driver needs to know",
    secs:[
      {h:"What makes Spark different from food delivery", body:"Spark is Walmart's delivery service. Instead of picking up food from a restaurant, you go to a Walmart store and shop for a customer's grocery order. You scan each item as you pick it up, then deliver the bags to the customer's home. Because you're choosing the actual products, the customer is rating your shopping ability as much as your delivery. Handle items carefully — fragile items, cold items, heavy items all need attention."},
      {h:"How to handle out-of-stock items", body:"Sometimes an item a customer ordered isn't on the shelf. Don't just skip it. Open the Spark app, find the item, and mark it as unavailable. The app will give you options to substitute it with something similar. Always message the customer through the app before you check out to let them know. This protects you if they complain later — your message history shows you communicated."},
      {h:"Scanning every item — why it's critical", body:"Spark tracks which items you scanned. If a customer says an item is missing and your scan record shows you scanned it at the store, that's your proof. If you didn't scan it, there's no record you ever had it. Scan every single item, every time, no exceptions. It takes a few extra seconds per item and it protects you completely from missing item complaints."},
      {h:"Your Spark driver rating", body:"Customers rate you after delivery. Spark tracks both your customer rating and your on-time rate separately. Both affect which batches (orders) you can access. Better ratings = access to bigger, better-paying batches. If you get a low rating for something that was the store's fault — out-of-stock items, produce quality — you can request a review through support."},
    ]
  },
  {
    e:"🟩", t:"Instacart — The Basics", sub:"Platform-specific things every Instacart shopper needs to know",
    secs:[
      {h:"What Instacart shoppers actually do", body:"Instacart pays you to shop for customers at grocery stores, then deliver the bags to their home. You get a list of items, you find them in the store, scan them, check out, and deliver. The customer set up their order in advance and chose whether to allow substitutions. You are both the shopper and the delivery driver. The whole thing — shopping and delivering — is called a 'batch.'"},
      {h:"How to handle replacements", body:"If an item isn't available, the Instacart app will show you approved replacements or let you suggest one. Before you check out, always message the customer to let them know what you're substituting. Something simple like 'Hi! The brand you ordered is out of stock — I'm grabbing [this one] instead, hope that works!' Most customers appreciate the heads up and it protects your rating if they're not happy with the sub."},
      {h:"Your Batch ID — always note it", body:"Every Instacart order has a Batch ID. This is what support uses to find your record if anything goes wrong. Any time a delivery feels off — unhappy customer, wrong items, difficulty finding the address — take a screenshot of the Batch ID before you move on. You cannot file a useful support request without it."},
      {h:"The 4.7 rating — why it's the key number", body:"Instacart shoppers rated below 4.7 see fewer batches and lower-paying ones. Above 4.7 keeps you in good standing. Above 4.8 unlocks premium batches. Your rating is based on your last 100 deliveries. Bad ratings caused by store conditions, out-of-stock items, or app errors can sometimes be removed — but you need to ask support and explain clearly what happened."},
    ]
  },
];
