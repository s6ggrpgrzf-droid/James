// DropPilot content data (extracted from app.html). Loaded before the app script.

// Do not edit structure; content edits go through the normal content workflow.

var POLICY_WATCH = {
  month: "May 2026",
  lastUpdated: "May 6, 2026",
  updates: [
    {platform:"doordash",label:"DoorDash",color:"#FF3008",e:"🔴",isNew:false,
     category:"Deactivation",severity:"high",
     title:"In-app deactivation appeals now resolve in days, not weeks",
     body:"DoorDash's revamped appeal flow lets you file directly inside the Dasher app and watch status update in real time. Reviews team capacity has been expanded and the stated goal is for the vast majority of appeals to resolve within a few business days.",
     action:"File from the in-app appeal screen the moment the deactivation email lands — every hour the case sits open is an hour you're not earning.",
     source:"DoorDash News · 2026"},
    {platform:"ubereats",label:"Uber Eats",color:"#06C167",e:"🟢",isNew:false,
     category:"Standing",severity:"medium",
     title:"Uber Eats Pro reshuffled — on-time rate is now scored in select markets",
     body:"Uber Eats Pro has added on-time rate as a scored metric in select markets and adjusted thresholds for cancellation rate, satisfaction rate, and points. Long restaurant waits now hurt status, not just acceptance rate.",
     action:"Check your Pro Hub — if you see an on-time number, that market is live. Walk out and unassign on stalls of 8+ minutes.",
     source:"Uber blog · 2026"},
    {platform:"instacart",label:"Instacart",color:"#43B02A",e:"🟩",isNew:false,
     category:"Earnings",severity:"high",
     title:"NYC shoppers: $21.44/hr floor, batch caps, and online windows now fully enforced",
     body:"NYC's grocery delivery law is fully live: $21.44/hr minimum (excluding tips), capped concurrent shoppers, online windows, and one-batch-at-a-time offers — the full batch list is gone in NYC. A $5.99 customer-side 'Regulatory Response Fee' is also being charged in NYC.",
     action:"If you shop NYC, schedule online windows in advance and don't wait for 'the list' — it's gone. Outside NYC, nothing has changed.",
     source:"Instacart Shopper Community · 2026"},
    {platform:"amazonflex",label:"Amazon Flex",color:"#FF9900",e:"📦",isNew:false,
     category:"Appeals",severity:"medium",
     title:"Amazon Flex appeal review window is now 7–14 days, not 3–5",
     body:"Driver reports and Amazon's own support guidance now point to a 7–14 business day review window for deactivation appeals. The 10-day window to file an appeal is unchanged.",
     action:"Email amazonflex-support@amazon.com the same day, attach evidence, and don't escalate before day 14 — escalating early can reset the queue.",
     source:"Amazon Flex Support · 2026"},
    {platform:"lyft",label:"Lyft",color:"#FF00BF",e:"🩷",isNew:false,
     category:"Standing",severity:"medium",
     title:"Lyft Tier Points reset at 5 AM on the 1st — banked Shop points expire after 12 months",
     body:"Tier Points officially reset at 5 AM local on the first of the month. Banked Shop points (Silver+ only) carry over but expire 12 months after they're earned. Acceptance rate multipliers (2–3×) still only apply in supported regions.",
     action:"Spend or convert Shop points before the 12-month mark. Check the redemption page on the 1st of each month — that's when your tier resets.",
     source:"Lyft Driver Rewards Terms · 2026"},
    {platform:"spark",label:"Walmart Spark",color:"#0071CE",e:"⚡",isNew:false,
     category:"Identity",severity:"high",
     title:"Spark selfie checks are stricter — hats and sunglasses can auto-lock you",
     body:"Random in-shift selfie checks are firing more often and the matcher is rejecting faces partially covered by hats, sunglasses, or masks. The app also now requires iOS 16 / Android 13 minimum — older phones are being locked out. Walmart's $100M FTC settlement over Spark earnings claims closed in February; pay-disclosure changes are rolling out.",
     action:"Take selfies face-on, in good light, hat and sunglasses off. Confirm your phone is on iOS 16+ / Android 13+ before your next shift.",
     source:"FTC + Spark Driver Help · 2026"},
    {platform:"uber",label:"Uber",color:"#1D1D1D",e:"🚗",isNew:false,
     category:"Deactivation",severity:"high",
     title:"You can now see and respond to safety reports in the app — before any decision",
     body:"Uber's 'Fairness in the Driver's Seat' rollout makes eligible safety reports visible in-app with a window to respond before review. Uber will also cover a third-party drug test if you challenge a false impairment claim, and Record My Ride / dashcam footage can be used to dismiss bad-faith reports.",
     action:"When a report appears, respond inside 24 hours. Attach Record My Ride or dashcam clip and any in-app messages. First response speed still beats length.",
     source:"Uber blog (Fairness in the Driver's Seat) · 2026"},
    {platform:"gopuff",label:"GoPuff",color:"#4338CA",e:"🟣",isNew:false,
     category:"Policy",severity:"low",
     title:"Facility-side evidence still your best dispute defense — no new written policy this cycle",
     body:"No new written policy this month, but support continues to lean on facility-side evidence when reviewing non-delivery disputes. A photo of sealed bags at the facility is being accepted as supporting evidence.",
     action:"Confirm bag count against the app manifest before leaving every facility, and snap a quick photo of the sealed bags at the door before you drive off.",
     source:"Gopuff Community Guidelines · 2026"},
  ]
};

var VIDEOS = [
  {id:0,title:"Why Customer Service Makes You More Money",dur:35000,icon:"📈",color:"#10B981",desc:"The simple math of one extra dollar per delivery adding up fast.",
    scenes:[
      {t:0,tag:"the truth about gig work",emoji:"💸",hed:"Most drivers are\nleaving money\non the table.",sub:"Every single shift."},
      {t:4000,tag:"the silent income killer",emoji:"⭐",hed:"One unfair 1-star\ncan cost you\nbetter orders.",sub:"Platforms show high-paying orders to high-rated drivers first. Low rating = worse orders. It compounds fast.",hi:{color:"#F43F5E",text:"Low rating → worse orders → less money → harder to recover. The cycle is very real."}},
      {t:9500,tag:"the math is simple",emoji:"🧮",hed:"Just $1 more tip.\nEvery delivery.",sub:null,math:[["20 deliveries a day","+$20/day"],["5 days a week","+$100/week"],["Every month","+$430","big"]]},
      {t:16000,tag:"what drives the extra dollar",emoji:"💡",hed:"Tips are emotional,\nnot logical.",sub:"Customers tip based on how they felt during the delivery — not how fast you were.",hi:{color:"#10B981",text:"A warm smile and a genuine 'enjoy your meal' makes people feel cared for. That feeling is worth real money."}},
      {t:22500,tag:"the compound effect",emoji:"📊",hed:"Better service.\nBetter rating.\nBetter orders.\nMore money.",sub:"It all starts with how you treat people at the door."},
      {t:28000,tag:"your next delivery",emoji:"🎯",hed:"Pick one thing.\nDo it next shift.",sub:"Text ahead. Smile at the door. Say 'enjoy your meal.' Just one habit. That's how it starts.",hi:{color:"#10B981",text:"Drivers who focus on one habit at a time build a streak. A streak becomes a rating. A rating becomes income. Pick one thing. Do it on every delivery this week."}},
    ]},
  {id:1,title:"Why the Words You Choose Actually Matter",dur:36000,icon:"💬",color:"#3B82F6",desc:"The simple psychology behind exact words that earn more tips and better ratings.",
    scenes:[
      {t:0,tag:"it's not just what you say",emoji:"🧠",hed:"The words you\nchoose matter\nmore than\nyou think.",sub:"Not because of politeness. Because of basic human psychology."},
      {t:4500,tag:"phrase #1",emoji:"🙌",hed:'"Thank you for\nyour patience."',sub:null,vs:{bad:["Instead of","Sorry for the wait"],good:["Say this","Thank you for your patience"]},why:{color:"#3B82F6",text:"Apologizing puts you in a guilty position. Thanking them for their patience credits the customer instead. People respond better to being appreciated than to apologies."}},
      {t:11000,tag:"phrase #2",emoji:"🤝",hed:'"I\'ll make sure\neverything is\ntaken care of."',sub:"Vague reassurances feel empty. Taking personal ownership feels trustworthy.",hi:{color:"#F5A623",text:"'I'll make sure' signals personal responsibility. Customers give more goodwill to people who own their role."}},
      {t:17500,tag:"phrase #3",emoji:"💬",hed:"Text first.\nNever call first.",sub:"A call from an unknown number feels intrusive. A text respects their time.",vs2:[["📞","Calling","Interrupts. Creates anxiety. Often ignored.","#F43F5E"],["💬","Texting","Non-intrusive. They respond when ready. Much higher response rate.","#10B981"]]},
      {t:24000,tag:"phrase #4",emoji:"🌙",hed:'"Enjoy your meal!"\nNot "here you go."',sub:"How an interaction ends determines how people remember the entire experience.",hi:{color:"#8B5CF6",text:"The ending rewrites the whole delivery in a customer's memory. A warm ending = a positive memory = a tip and 5 stars."}},
      {t:30000,tag:"your four phrases",emoji:"📋",hed:"Memorise these\nbefore your\nnext shift.",sub:null,listGood:[["🙌","'Thank you for your patience' — not 'sorry for the wait'"],["🤝","'I'll make sure everything is taken care of'"],["💬","Text first — always text, never call first"],["🌙","'Enjoy your meal!' — not 'here you go'"]]},
    ]},
  {id:2,title:"What Top Earners Do Differently",dur:36000,icon:"🏆",color:"#F5A623",desc:"The 60-second habit gap between average drivers and top earners.",
    scenes:[
      {t:0,tag:"the gap is smaller than you think",emoji:"🔍",hed:"Top earners are\nnot faster.\nThey are smarter\nat the door.",sub:"Here is exactly what they do."},
      {t:5000,tag:"what most drivers do",emoji:"❌",hed:"The silent drop-off.",sub:null,listBad:["Pull up. Pick up. Drop off. Leave.","No greeting. No eye contact.","No text. No confirmation.","Just a bag on a doorstep."]},
      {t:11000,tag:"what top earners do",emoji:"✅",hed:"The 60-second\ndifference.",sub:null,listGood:[["💬","Text when 3 minutes away"],["😊","Smile and greet at the door"],["📸","Photo every drop-off without fail"],["✅","Confirm delivery in the app"]]},
      {t:18000,tag:"the habit gap",emoji:"📊",hed:"Same roads.\nSame apps.\nVery different\nincome.",sub:"0.4 stars separates average from top earner. That's not luck. That's habit.",bars:[["Average driver","~4.5 ⭐",62,"#F43F5E"],["Top earner","~4.9 ⭐",96,"#F5A623"]]},
      {t:25000,tag:"your photo is your protection",emoji:"📸",hed:"A photo is not\njust courtesy.\nIt is evidence.",sub:"False non-delivery complaints are a top cause of deactivation. A timestamped photo wins almost every dispute.",hi:{color:"#F5A623",text:"Drivers who photo every drop-off win almost every false complaint. Drivers who don't — lose almost every one."}},
      {t:30500,tag:"the four-habit checklist",emoji:"✅",hed:"Text. Greet.\nPhoto. Confirm.",sub:"Every delivery. No exceptions.",listGood:[["💬","Text: 'I'm 3 min away with your order'"],["😊","Greet: make eye contact, be warm"],["📸","Photo: bag at door with address visible"],["✅","Confirm: mark delivered in the app"]]},
    ]},
  {id:3,title:"Please, Thank You, and You're Welcome",dur:40000,icon:"🙏",color:"#8B5CF6",desc:"Three simple phrases backed by real research that measurably increase tips.",
    scenes:[
      {t:0,tag:"backed by real research",emoji:"🔬",hed:"Three phrases.\nProven results.",sub:"Please. Thank you. You're welcome.\nNot just good manners — measurable income."},

      {t:5000,tag:"the word 'please'",emoji:"🙏",hed:'"Please" makes\npeople more\nlikely to help.',sub:"Research shows adding 'please' to a request increases compliance by up to 18%.",hi:{color:"#F5A623",text:"'Could you buzz me in?' gets ignored.\n'Could you please buzz me in?' gets answered.\nSame words. One addition. Very different result."},cite:"Source: Langer, Blank & Chanowitz — Journal of Personality and Social Psychology"},
      {t:12500,tag:"the words 'thank you'",emoji:"🙌",hed:'"Thank you"\nmakes people\nwant to give back.',sub:"When someone expresses real gratitude, people feel an urge to reciprocate — to give something back.",hi:{color:"#3B82F6",text:"A sincere 'thank you for your order' at the door triggers a natural urge to tip. It's a basic human response."},cite:"Source: Cialdini — Influence: The Psychology of Persuasion"},
      {t:20000,tag:"a real study on tips",emoji:"💰",hed:null,stat:"23%",statSub:"more in tips",sub:"A Cornell University study found servers who gave a genuine, personal thank you received 23% more in tips than those who didn't.",cite:"Source: Leodoro & Lynn — Cornell Hotel and Restaurant Administration Quarterly"},
      {t:27000,tag:"the most underused phrase",emoji:"💬",hed:'"You\'re welcome"\nvs\n"No problem."',sub:null,vs:{bad:["No problem","Implies it could have been a problem. Subtly weakens the interaction."],good:["You're welcome","Confirms something of value was given. Ends the exchange properly."]},why:{color:"#8B5CF6",text:"'You're welcome' tells the customer their delivery mattered. 'No problem' minimizes it. People tip more when they feel the delivery was meaningful."},cite:"Source: Lakoff — Language and Woman's Place"},
      {t:34000,tag:"practice before your shift",emoji:"🎤",hed:"Say them out loud.\nIn your car.\nRight now.",sub:"Please. Thank you. You're welcome. Say them before every shift until they feel completely natural.",hi:{color:"#10B981",text:"The phrases that come out smoothly at the door are the ones you practiced when nobody was watching. 60 seconds in your car changes how you say them at the door."}},
    ]},
  {id:4,title:"How to Handle Difficult Situations",dur:38000,icon:"🛡️",color:"#F43F5E",desc:"The professional recovery framework that turns bad moments into 5-star ratings.",
    scenes:[
      {t:0,tag:"where professionals are made",emoji:"🏨",hed:"Anyone can deliver\nwhen everything\ngoes right.",sub:"The difference between good and great is what you do when it doesn't."},
      {t:5500,tag:"the 3-second rule",emoji:"⏱️",hed:"Before you respond\nto a difficult\ncustomer — pause.",sub:"Three seconds. Breathe. This is what hotel front desk managers teach every new hire on day one.",hi:{color:"#F43F5E",text:"Your first instinct when someone is upset is to defend yourself. That instinct is almost always wrong. Three seconds changes what comes out of your mouth."}},
      {t:13000,tag:"the recovery formula",emoji:"🔄",hed:"Feel.\nFelt.\nFound.",sub:null,listGood:[["💙","'I understand how you feel' — you heard them"],["🤝","'Others have felt the same way' — they're not being dramatic"],["✅","'What I've found is...' — here's the path forward"]]},
      {t:20500,tag:"the counterintuitive truth",emoji:"📊",hed:"A well-handled\nmistake beats\na perfect delivery.",sub:"Hospitality research shows customers rate a service higher after a mistake handled with full ownership than after a smooth experience.",hi:{color:"#F5A623",text:"'That was completely my fault and I'm sorry.' Then stop. No excuses. No explanations. Customers forgive people who own it. They don't forgive people who deflect."}},
      {t:28000,tag:"when you can't fix it",emoji:"🎯",hed:"Redirect.\nDon't argue.",sub:"Some things are outside your control. Your job is to give the customer the fastest path to a solution — not to win the argument.",vs:{bad:["Don't say","That's not my fault / The restaurant did that / The app glitched"],good:["Say this","I understand that's frustrating — reach out to [platform] support. They fix this fast."]}},
      {t:34000,tag:"the professional's mindset",emoji:"🏆",hed:"You can't control\nwhat happens.\nYou control\nhow you respond.",sub:"Every difficult customer is a chance to practice the skill most drivers don't have.",hi:{color:"#10B981",text:"Next time a delivery goes wrong — use Feel, Felt, Found. Own it briefly. Redirect calmly. That's the whole framework. Professionals practice it until it's automatic."}},
    ]},
  {id:5,title:"Reading People in 10 Seconds",dur:34000,icon:"👁️",color:"#8B5CF6",desc:"The skill behind the job — how to read a customer before you've said a word.",
    scenes:[
      {t:0,tag:"the real skill",emoji:"👁️",hed:"Customer service\nstarts before\nyou say\na word.",sub:"Most drivers miss this entirely."},
      {t:5500,tag:"reading the text",emoji:"📱",hed:"Their first text\ntells you\neverything.",sub:null,vs:{bad:["Short and direct","'Where is my order' — low patience. Match their pace — be brief and fast."],good:["Warm and casual","'Hey! Just checking on my order :)' — they want a human moment, not just a transaction."]}},
      {t:12500,tag:"the door moment",emoji:"🚪",hed:"You have\n10 seconds\nat the door.",sub:"What they do in those 10 seconds tells you exactly what they need.",hi:{color:"#8B5CF6",text:"Opens immediately = they were waiting. Brief, warm interaction welcome. Cracks the door = cautious, keep it short. Doesn't answer first knock = low engagement, quiet drop-off preferred."}},
      {t:20000,tag:"three customer modes",emoji:"🧑‍🤝‍🧑",hed:"Warm. Efficient.\nDistracted.",sub:"Every customer is in one of three modes — and each wants something different from you.",listGood:[["😊","Warm — wants a human moment. Brief eye contact, smile, say something genuine."],["⚡","Efficient — wants the food and nothing else. Smile, hand it over, done."],["😔","Distracted — not really present. Don't try to connect. Be calm, quiet, and kind."]]},
      {t:27000,tag:"match the energy",emoji:"🎯",hed:"Read. Match.\nMirror.",sub:"Being warm with someone who wants efficiency feels intrusive. Being efficient with someone who wants warmth feels cold.",hi:{color:"#8B5CF6",text:"This one habit — read the customer, match their mode, mirror it back — is worth more than any script. You can't memorize it. You practice it on every delivery starting today."}},
    ]},
];

var SCENARIOS = [
  {e:"🚪",tag:"False non-delivery",difficulty:"high",
   rule:"Photo first. Then report.",
   situation:"You drop off an order, take a delivery photo, and mark it complete. Twenty minutes later the customer messages: 'Where's my food? I never got it.' What do you do first?",
   choices:[
     {text:"Reply and apologize — let them know you'll contact support on their behalf",correct:false,why:"Apologizing implies fault before facts are established. Lead with evidence, not regret."},
     {text:"Reply with your delivery photo and the exact time you dropped off, then report through the app",correct:true,why:"Photo and GPS timestamp are your strongest defense. Reply with the facts, then open a support case to document everything. Right sequence."},
     {text:"Don't respond — you have a photo and the app shows it delivered, so you're covered",correct:false,why:"Silence leaves the complaint one-sided. Your response needs documentation too. Reply with proof, then report."},
   ]},
  {e:"⭐",tag:"Rating threat",difficulty:"medium",
   rule:"Acknowledge. Exit warm.",
   situation:"You're finishing a Lyft ride. The passenger says 'I'm giving you 1 star because you took a different route than my GPS.' What do you say?",
   choices:[
     {text:"'I'm so sorry — I should have followed your GPS.'",correct:false,why:"Conceding fault on a professional navigation call without knowing if it was wrong puts you in a losing position."},
     {text:"'I hear you — I took that route because [reason]. I hope the rest of your day goes well.'",correct:true,why:"Brief, calm, factual. Acknowledge, one sentence of context, wish them well, end it. Short and done."},
     {text:"Show them the map and explain in detail why your route was faster",correct:false,why:"Proving someone wrong in the last 60 seconds almost always makes things worse. People want to feel heard, not corrected."},
   ]},
  {e:"📦",tag:"Sealed bag request",difficulty:"medium",
   rule:"Never open a sealed bag.",
   situation:"A customer messages mid-delivery: 'The bag is sealed but this place always forgets my drink — can you check?' What do you do?",
   choices:[
     {text:"Pull over and open the sealed bag to check",correct:false,why:"The moment you open a sealed bag, you own what's inside. Don't take that responsibility from the restaurant."},
     {text:"Message back: 'I picked up the sealed bag from the restaurant — everything inside was packed by them. If something's missing, support can get it sorted quickly.'",correct:true,why:"Factual, helpful, redirects responsibility correctly. Documents that you handled it professionally."},
     {text:"Ignore the message and finish the delivery",correct:false,why:"No response means no record. If they complain, there's no proof you handled it professionally. Always reply."},
   ]},
  {e:"😤",tag:"Angry customer at door",difficulty:"high",
   rule:"Acknowledge. Effort. Warmth. Exit.",
   situation:"You deliver an order and the customer opens the door visibly frustrated: 'This took 45 minutes! I ordered an hour ago!' What do you say?",
   choices:[
     {text:"'I'm so sorry — the restaurant was really backed up, I came as fast as I could!'",correct:false,why:"Over-apologizing makes you the target and keeps the focus on the problem. Doesn't actually help them."},
     {text:"'I hear you — I got here as fast as I could. I hope the food makes up for the wait. Enjoy your evening.'",correct:true,why:"Acknowledge, state effort briefly, close warm, exit. Four sentences and done. You're ending the interaction, not debating the wait."},
     {text:"Explain the restaurant's wait time so they understand it wasn't your fault",correct:false,why:"Frustrated people want acknowledgment, not explanations. Detail almost always escalates things."},
   ]},
  {e:"🚗",tag:"Uncomfortable passenger",difficulty:"high",
   rule:"One boundary, calmly.",
   situation:"Mid-ride, a passenger starts making comments that make you uncomfortable. Nothing explicit yet, but the vibe is off. What do you do?",
   choices:[
     {text:"Stay silent and get them to their destination as fast as possible",correct:false,why:"Silence can be misread as acceptance and gives you no documentation if things escalate."},
     {text:"Say calmly: 'I'd prefer to keep things professional.' Continue the ride, but be ready to end it early if needed.",correct:true,why:"One calm boundary sets the tone without escalating. On record that you addressed it. If they continue, you have grounds to end."},
     {text:"End the ride immediately without saying anything",correct:false,why:"End without warning only if you feel genuinely unsafe. For 'vibe off,' one boundary statement first is the right sequence."},
   ]},
  {e:"🔄",tag:"Appeal denied",difficulty:"medium",
   rule:"Senior account specialist.",
   situation:"You appealed a false non-delivery complaint. Support replied: 'After reviewing, we are unable to change the outcome.' What do you do?",
   choices:[
     {text:"Accept it — they reviewed the evidence and denied it, there's nothing more to do",correct:false,why:"First-tier denials are often scripted, not full reviews. Most drivers give up here. Don't."},
     {text:"Reply requesting escalation to a senior specialist and briefly restate your evidence",correct:true,why:"'I am requesting escalation to a senior account specialist' is the exact language that triggers a routing change to a different reviewer."},
     {text:"File a brand new appeal from scratch with the same evidence",correct:false,why:"A fresh appeal on the same issue usually gets the same first-tier response. Escalation in the existing thread works better."},
   ]},
  {e:"📱",tag:"Proactive communication",difficulty:"low",
   rule:"Don't leave them in the dark.",
   situation:"You pick up an order. The restaurant was slow and the food has been sitting 10 minutes. The customer hasn't messaged you. Do you reach out?",
   choices:[
     {text:"No — messaging about a delay might make them anxious when they weren't thinking about it",correct:false,why:"Customers left in the dark assume the worst. A brief message reduces anxiety, not increases it."},
     {text:"Yes — a short message: 'Got your order — had a slight wait at the restaurant but on my way now. See you soon!'",correct:true,why:"One sentence sets expectations. Customers who get this message almost never rate low for wait times — they've been acknowledged."},
     {text:"Yes — send a detailed explanation of exactly what happened at the restaurant",correct:false,why:"Over-communicating a problem makes it bigger. One short forward-looking sentence is enough."},
   ]},
  {e:"🌧️",tag:"Difficult conditions",difficulty:"low",
   rule:"Document the weather.",
   situation:"It's raining. You're delivering to a house with a long driveway and the bag might get wet. What do you do?",
   choices:[
     {text:"Run to the door fast and hope the bag stays dry",correct:false,why:"No documentation, no message. If the bag gets wet and they complain, you have nothing to show for your effort."},
     {text:"Keep the bag protected on the walk, take a clear photo at the door, and message: 'Delivered safely — kept your order dry on the way up. Enjoy!'",correct:true,why:"Documented, protected, and turned a bad-weather drop-off into genuine service. That message changes how they remember it."},
     {text:"Message the customer first to ask if you should wait for the rain to stop",correct:false,why:"Asking for weather permission adds delay and puts an unfair decision on them. Protect the food and deliver."},
   ]},
];

var MISTAKES = [
  {e:"🙏",t:"Never ask for 5 stars or a tip",why:"It violates platform rules and almost always lowers your rating, not raises it. Customers feel uncomfortable. Not directly, not as a hint, not as a joke."},
  {e:"😔",t:"Don't over-apologize for things outside your control",why:"Apologizing for restaurant delays, missing items, or app problems makes you look responsible for things you didn't do. Acknowledge frustration. Don't take blame."},
  {e:"📞",t:"Don't call when you can text",why:"A call from an unknown number feels intrusive. Text first, always. Customers respond to texts at twice the rate they answer calls from strangers."},
  {e:"💬",t:"Don't over-explain when something goes wrong",why:"Long explanations make problems feel bigger. Customers want to feel heard, not given a full account. One calm sentence is almost always enough."},
  {e:"🛍️",t:"Never open a sealed bag",why:"The moment you open it, whatever's inside is your responsibility. The answer to every 'can you check?' is the same: 'Sealed bag from the restaurant — support can fix anything missing fast.'"},
  {e:"🕐",t:"Don't wait silently at a door",why:"Silent waiting looks like inattention. A quick 'I'm at your door' text creates a timestamp and gives them a chance to respond. If no one answers, you're documented."},
  {e:"😤",t:"Never argue with a customer",why:"You cannot win an argument with a customer. Even when you're right, arguing reads as unprofessional and usually escalates. Say your piece once, calmly, then stop."},
  {e:"📷",t:"Never skip the delivery photo — not even once",why:"The one delivery you don't photo will be the one with a complaint. Every delivery, every time. Good weather, bad weather, empty driveway, crowded door."},
];

var QUIZZES = {
  0:[
    {q:"Tips are primarily driven by…",options:["Speed of delivery","How professional you look","How the customer feels about the interaction","Order accuracy"],correct:2,explain:"Tips are emotional. Warmth earns more than speed."},
    {q:"$1 more per delivery × 2 deliveries/hour × 200 hours =",options:["$200","$400","$600","$800"],correct:1,explain:"$400 per 200 hours \u2014 about a month of full-time driving, or roughly $4,800 a year. Small changes compound fast."},
  ],
  1:[
    {q:"Which phrase shows personal ownership?",options:["I'll try to check on that","I'll see what I can do","I'll make sure everything is taken care of","That should be fine"],correct:2,explain:"'I'll make sure' commits to an outcome. 'I'll try' signals doubt."},
    {q:"To reach a customer first, you should…",options:["Call — it's more personal","Text — less intrusive, they respond when ready","Wait to see if they contact you","Only message through the app's call feature"],correct:1,explain:"Text first, never call first. Calls from unknown numbers interrupt and create anxiety."},
  ],
  2:[
    {q:"The rating gap between average and top earners is roughly…",options:["0.1 stars","0.2 stars","0.4 stars","1 full star"],correct:2,explain:"4.5 vs 4.9 — small gap, real money. It decides which orders you see."},
    {q:"The four-habit checklist for every delivery is…",options:["Smile, drive fast, photo, leave","Text, Greet, Photo, Confirm","Greet, hand-off, leave, repeat","Photo, knock, wait, leave"],correct:1,explain:"Text. Greet. Photo. Confirm. Every delivery. No exceptions."},
  ],
  3:[
    {q:"'No problem' vs 'you're welcome' — which closes better?",options:["No problem — it sounds casual","You're welcome — it acknowledges the exchange","They're equivalent","Depends on the customer's age"],correct:1,explain:"'No problem' implies the interaction could have been a burden. 'You're welcome' closes the loop."},
    {q:"Adding 'please' to a request increases compliance by roughly…",options:["5%","18%","35%","50%"],correct:1,explain:"From Langer, Blank & Chanowitz\u2019s classic study. One word, measurable effect."},
  ],
  4:[
    {q:"The first step when a customer is upset is…",options:["Apologize immediately","Explain what happened","Pause for 3 seconds before responding","Ask them to calm down"],correct:2,explain:"Three seconds. Breathe. The pause prevents reactive responses."},
    {q:"In Feel / Felt / Found, what does the third step do?",options:["Apologizes again","Explains what went wrong","Offers a path forward","Redirects to support"],correct:2,explain:"Validate, normalize, then offer a way forward. Step 3 is the path, not more explanation."},
  ],
};

var KEY_TAKEAWAYS = {
  0:["Warmth earns more than speed","$1 × 2/hr × 200 hrs ≈ $4,800/yr full-time","Pick one habit. Make it your default."],
  1:["'I'll make sure' beats 'I'll try'","Text first. Never call first.","Close with 'enjoy your meal.'"],
  2:["0.4 stars separates average from top","Text. Greet. Photo. Confirm.","Photo every drop-off — no exceptions"],
  3:["'Please' = 18% more compliance (Langer et al.)","'You're welcome' beats 'no problem'","Practice the phrases out loud before each shift"],
  4:["Three seconds. Breathe. Then respond.","Feel. Felt. Found.","Own a mistake in one sentence. Stop."],
};

var QUICK_SITUATIONS = [
  {e:"📍",l:"Can't find address",le:"No encuentro la dirección",ci:2,si:0},
  {e:"🔑",l:"Need gate code",le:"Necesito código de acceso",ci:2,si:1},
  {e:"🚪",l:"No one answers",le:"Nadie abre la puerta",ci:2,si:2},
  {e:"⏰",l:"Restaurant taking forever",le:"El restaurante tarda",ci:1,si:0},
  {e:"🚗",l:"Stuck in traffic",le:"Atascado en tráfico",ci:1,si:1},
  {e:"📸",l:"Confirm drop-off",le:"Confirmar entrega",ci:2,si:3},
  {e:"🏢",l:"Apartment building",le:"Edificio de apartamentos",ci:0,si:2},
  {e:"😤",l:"Customer upset",le:"Cliente molesto",ci:4,si:2},
  {e:"🏨",l:"Hotel delivery",le:"Entrega en hotel",ci:4,si:0},
  {e:"🌙",l:"Follow up after late",le:"Seguimiento tras retraso",ci:1,si:3},
];

var BASICS_CATS = [
  {
    e:"🚀", t:"Starting Out", sub:"What you need to know before your first delivery",
    secs:[
      {h:"What these apps actually are", body:"DoorDash, Uber Eats, Spark, and Instacart are apps that pay you to pick up orders and drop them off. A customer orders food or groceries on their phone. The app finds a driver nearby — that's you. You pick it up and deliver it. Simple as that. You work when you want, stop when you want. Nobody is your boss."},
      {h:"How you make money", body:"You earn a base pay for each delivery — the app sets this. On top of that, customers can add a tip. Tips are usually where the real money comes from. The better your service, the more tips you earn. Some apps also offer extra bonuses for delivering during busy times. These are called 'boosts' or 'surges' and they're worth taking advantage of."},
      {h:"What a rating is and why it matters", body:"4.7 or higher = the safe zone on every platform. Customers rate you 1–5 after every delivery; your score is the average. Too low and the app gives you fewer orders, worse orders, or removes you. Aim for 4.7 and protect it."},
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
      {h:"What to do if you can't find the address", body:"Don't panic and don't just leave. First: double-check the address in the app — make sure you're on the right street. Second: send a text through the app saying where you are and describing a visible landmark nearby, and ask for help. Third: if no response in 2-3 minutes, call the customer using the in-app call button. If they still don't answer, contact support through the app before leaving. Never just abandon an order without trying first."},
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
      {h:"The DoorDash rating system", body:"Below 4.2 = deactivation risk. Above 4.7 = good standing. Your score is the average of your last 100 deliveries — visible in the app under your profile. A bad rating that wasn't your fault (restaurant error, wrong item in a sealed bag) can often be removed by support — request a review."},
      {h:"Completion rate — what it is and why it matters", body:"Your completion rate is the percentage of orders you accept and then actually complete. If you accept an order and then unassign yourself from it, your completion rate goes down. DoorDash requires a minimum of 90% completion — this was raised from 80% in March 2024, so if you've been dashing for a while, update your habits around unassigning. To protect it: only accept orders you're sure you can complete, and if something goes wrong mid-delivery, contact support before unassigning."},
      {h:"Top Dasher — what it means", body:"Top Dasher is a status DoorDash gives to drivers who meet certain standards: 4.7+ rating, 70%+ acceptance rate, 95%+ completion rate, 100+ deliveries in the month, and at least 200 total deliveries. Top Dashers get to dash anytime without scheduling in advance. Note: DoorDash is rolling out a Dasher Rewards program (Silver, Gold, Platinum tiers) in major markets that replaces Top Dasher — check your local app to see which system applies to you."},
    ]
  },
  {
    e:"🟢", t:"Uber Eats — The Basics", sub:"Platform-specific things every Uber Eats driver needs to know",
    secs:[
      {h:"How Uber Eats orders work", body:"Go online in the app and orders will start coming to you. When one arrives: you see the restaurant, the drop-off, and the fare. Accept it and head to the restaurant. When you arrive, tap 'I'm here' so the customer knows you're waiting. Pick up the order when it's ready. Follow the map to the customer. For contactless: leave it at the door, take a photo through the app, and confirm delivery. Uber requires the in-app photo — not your camera app."},
      {h:"Your Uber Eats rating", body:"4.7 or higher = good standing. Below 4.7 = fewer high-paying trips. Your rating is the average across customer reviews. Uber allows removal of ratings caused by factors outside your control — restaurant errors, navigation problems, long wait times. Request it when this happens."},
      {h:"Trip ID — what it is and why you need it", body:"Every delivery on Uber Eats has a Trip ID — a unique code for that specific order. You can find it in your earnings history after a delivery. If you ever need to dispute something with support — bad rating, false complaint, missing payment — you must include the Trip ID. Without it, support agents can't find your record. Screenshot it any time a delivery feels off."},
      {h:"Uber Eats Pro — levels and what they mean", body:"Uber Eats has a tier system called Uber Eats Pro: Green (base), Gold, Platinum, Diamond. Higher tiers unlock Preferred Deliveries (priority access to better-paying orders), cash back on gas, and other perks. You move up by earning monthly points and meeting criteria: good acceptance rate, low cancellation rate, and high satisfaction rating. In select cities, on-time delivery rate is also required for Gold and above. Don't stress about tiers when you're starting — focus on consistent, reliable service first."},
    ]
  },
  {
    e:"🔵", t:"Spark — The Basics", sub:"Platform-specific things every Spark driver needs to know",
    secs:[
      {h:"What makes Spark different from food delivery", body:"Spark is Walmart's delivery service. Instead of picking up food from a restaurant, you go to a Walmart store and shop for a customer's grocery order. You scan each item as you pick it up, then deliver the bags to the customer's home. Because you're choosing the actual products, the customer is rating your shopping ability as much as your delivery. Handle items carefully — fragile items, cold items, heavy items all need attention."},
      {h:"How to handle out-of-stock items", body:"Sometimes an item a customer ordered isn't on the shelf. Don't just skip it. Open the Spark app, find the item, and mark it as unavailable. The app will give you options to substitute it with something similar. Always message the customer through the app before you check out to let them know. This protects you if they complain later — your message history shows you communicated."},
      {h:"Scanning every item — why it's critical", body:"Spark tracks which items you scanned. If a customer says an item is missing and your scan record shows you scanned it at the store, that's your proof. If you didn't scan it, there's no record you ever had it. Scan every single item, every time, no exceptions. It takes a few extra seconds per item and it protects you completely from missing item complaints."},
      {h:"Your Spark driver rating", body:"Two separate scores matter: customer rating and on-time rate. Both affect which batches you can access. Higher = bigger, better-paying batches. A low rating from a store-side issue (out-of-stock, produce quality) can be reviewed by support — request it."},
    ]
  },
  {
    e:"🟩", t:"Instacart — The Basics", sub:"Platform-specific things every Instacart shopper needs to know",
    secs:[
      {h:"What Instacart shoppers actually do", body:"Instacart pays you to shop for customers at grocery stores, then deliver the bags to their home. You get a list of items, you find them in the store, scan them, check out, and deliver. The customer set up their order in advance and chose whether to allow substitutions. You are both the shopper and the delivery driver. The whole thing — shopping and delivering — is called a 'batch.'"},
      {h:"How to handle replacements", body:"If an item isn't available, the Instacart app will show you approved replacements or let you suggest one. Before you check out, always message the customer to let them know what you're substituting. Something simple like 'Hi! The brand you ordered is out of stock — I'm grabbing [this one] instead, hope that works!' Most customers appreciate the heads up and it protects your rating if they're not happy with the sub."},
      {h:"Your Batch ID — always note it", body:"Every Instacart order has a Batch ID. This is what support uses to find your record if anything goes wrong. Any time a delivery feels off — unhappy customer, wrong items, difficulty finding the address — take a screenshot of the Batch ID before you move on. You cannot file a useful support request without it."},
      {h:"4.7 — the rating to protect", body:"Below 4.7 = fewer batches and lower pay. Above 4.7 = good standing. Your score is the last 100 customer ratings (not 100 orders) — Instacart automatically drops your two lowest. The Cart Star tier system (Gold, Platinum, Diamond, launched 2025) layers on a Shopping Quality Score that tracks fulfillment accuracy. Ratings caused by store conditions, out-of-stock items, or app errors can be removed — ask support and explain what happened."},
    ]
  },
  {
    e:"📦", t:"Flex — The Basics", sub:"Platform-specific things every Flex driver needs to know",
    secs:[
      {h:"What Flex delivery actually is", body:"Flex is a package delivery service where you work independently. Instead of food or groceries, you deliver boxes and packages in bulk batches called 'blocks.' You claim a block in the app for a specific time window, pick up packages from a delivery station, and deliver them to the addresses on your list. It's different from food delivery — you're covering a whole neighborhood in one shift, not one order at a time."},
      {h:"How blocks work and how to get them", body:"A 'block' is a scheduled delivery shift — usually 3 to 6 hours. You claim blocks in the Flex app ahead of time when they open up, or through 'instant offers' that appear last-minute. Popular blocks fill up fast, so check the app often. When you claim a block, you're committing to show up at the station at that time to pick up your packages. Missing a claimed block hurts your standing."},
      {h:"TBA numbers — what they are and why they matter", body:"Every package in your block has a TBA number — a unique tracking ID. These are how packages are identified in the system. If you ever have a problem with a delivery (missing package complaint, wrong address), support needs the TBA number to find the record. Get in the habit of photographing your manifest or noting TBA numbers on any delivery that feels off before you move on."},
      {h:"Your standing — and how to protect it", body:"Five levels: Fantastic, Great, Fair, At Risk, Deactivated. Updates daily; visible 48 hours after your first block. What hurts standing: missing blocks, cancelling within 45 minutes of start, failing to return undeliverables, missing-package complaints. At Risk → deactivation. Protection rule: show up for every block you claim, photo every drop-off in the app, return undeliverables same day with the right reason code."},
    ]
  },
  {
    e:"🚙", t:"Lyft — The Basics", sub:"Platform-specific things every Lyft driver needs to know",
    secs:[
      {h:"How Lyft is different from delivery apps", body:"Lyft is a ride-share service — you carry people, not packages or food. A passenger requests a ride through the Lyft app, you drive to their pickup location, they get in, and you drive them to their destination. The biggest difference from delivery: customer service happens face-to-face, in your car, for the entire ride. Your vehicle is your workspace. How it looks, smells, and feels directly determines your rating and your income."},
      {h:"The Lyft rating system for drivers", body:"4.6 minimum — below that, deactivation risk. Target 4.85+ to unlock priority access to better rides. Your score is the average of your last 100 rides. The three biggest rating drivers: car cleanliness, not forcing conversation, and confirming the passenger's name professionally at pickup."},
      {h:"Confirming your passenger — and why you must always do it", body:"Before any passenger gets in your car, ask: 'What's your name?' and wait for them to answer. Do NOT say their name first — if you ask 'Are you Sarah?' a stranger could say yes and get in. This is both a safety rule and Lyft's official policy. If the name doesn't match, politely decline: 'I'm waiting for [correct name] — your driver might be just nearby.' This protects you, the real passenger, and your standing."},
      {h:"Lyft tiers — what they are and how to reach them", body:"Lyft has a rewards program with four tiers: Silver, Gold, Platinum, and Elite. Tiers are based on Tier Points (earned as roughly $1 per dollar in ride earnings, with a multiplier up to 3x for high acceptance rates) and a Driving Score. Silver requires a 60% Driving Score minimum; Gold, Platinum, and Elite require 80%+. Elite is reserved for the top 5% of drivers and requires maintaining the status for 3 consecutive months. Higher tiers unlock priority airport queue access, bonus earnings, and dedicated support. Check the Lyft app for the exact point thresholds in your market — they vary by region."},
    ]
  },
  {
    e:"🚗", t:"Uber — The Basics", sub:"Platform-specific things every Uber rideshare driver needs to know",
    secs:[
      {h:"How Uber rideshare works", body:"Uber is a rideshare platform — you transport passengers, not packages or food. A passenger requests a ride through the Uber app, you see their pickup location and the upfront fare before you accept, then drive to pick them up and take them to their destination. Unlike delivery, customer service happens face-to-face for the full duration of the ride. Your vehicle — how it looks, smells, and feels — directly affects your rating and income."},
      {h:"The Uber rating system", body:"4.6 is the widely understood threshold — below that, deactivation risk. Uber automatically excludes some low ratings caused by factors outside your control: traffic delays, navigation issues, price complaints, and ratings from frequent low-raters. Your rating shows in the driver app under your profile."},
      {h:"Upfront pricing and surge — how you get paid", body:"Uber shows both you and the passenger the full trip fare before the ride begins. Surge pricing appears during busy periods as colored zones on your map — the closer you are to a high-demand area, the higher the multiplier. Working surge zones during peak hours (lunch, dinner, late Friday/Saturday night, bad weather) is one of the most reliable ways to significantly increase hourly earnings. You don't need to do anything special — just be logged in and accepting in a surge zone."},
      {h:"Confirming your passenger — always do this", body:"Before any passenger gets in your car, ask: 'What's your name?' and wait for them to answer. Never say the name first — if you ask 'Are you Mike?' a stranger could say yes and get in. This is both a safety practice and Uber's official policy. If the name doesn't match, politely decline: 'I'm waiting for [correct name].' This protects you, the real passenger, and your standing."},
      {h:"Uber Pro — levels and what they unlock", body:"Uber Pro has four tiers: Blue (all drivers), Gold, Platinum, and Diamond. You move up by earning points on trips and maintaining a 4.85+ rating with a cancellation rate below 4%. Higher tiers unlock cash back on gas, priority airport queue access, Costco membership, ASU tuition coverage, and dedicated support. Blue is where everyone starts — focus on clean, professional service first and the tiers will follow. Check the Uber app for current point thresholds, as they vary by market."},
    ]
  },
  {
    e:"🟣", t:"GoPuff — The Basics", sub:"Platform-specific things every GoPuff driver needs to know",
    secs:[
      {h:"How GoPuff delivery works", body:"GoPuff is different from DoorDash or Uber Eats. You don't pick up from restaurants. Instead, you collect pre-packed orders from a GoPuff facility (called a micro-fulfillment center) and deliver them to customers nearby. GoPuff stocks convenience items — snacks, drinks, household supplies, and alcohol in some markets. Orders are almost always packed and ready when you arrive at the facility. Your job is pickup, delivery, and documentation."},
      {h:"What to expect at the GoPuff facility", body:"When you arrive, check in through the app and collect the orders assigned to your run. Verify the bag or item count against what the app shows before you leave — GoPuff orders are pre-packed but errors happen, and a wrong or incomplete order creates complaints you'll be responsible for. GoPuff deliveries are typically short-distance (usually within a few miles of the facility), and you'll often complete multiple deliveries per run. Speed matters — GoPuff promises quick delivery."},
      {h:"GoPuff's standing system — how it works", body:"No published star threshold. Standing is judged against Community Guidelines: Safety, Respect, Integrity. Deactivation triggers: consistent complaints, failed or incomplete deliveries, guideline violations. Core protection on every delivery: photo every drop-off, keep GPS active."},
      {h:"Deactivation — causes and what to do", body:"The most common GoPuff deactivation causes are: background check errors (processed through Checkr), repeated customer complaints, or Community Guidelines violations. If your account is deactivated, contact GoPuff driver support and request a formal review, citing your delivery history and the specific situation. California drivers have a formal appeal right included in the deactivation email. If your deactivation was caused by a Checkr background check error, dispute it directly at consumer.checkr.com and reference that dispute in your GoPuff appeal — this creates a paper trail and gives the platform a reason to pause before making it permanent."},
    ]
  },
];
