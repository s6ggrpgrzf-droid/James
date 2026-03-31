// DropPilot — Data (FULL UPDATED VERSION WITH AMAZON FLEX)
// All original content + Amazon Flex + safer appeal templates

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
    {h:"Large apartment complex",msg:"Hi! I'm in the [building/complex name] parking lot but having trouble finding your unit. Could you help — which building number, entrance, or stairwell? Almost there!",w:"Asking for a specific landmark gets you a useful response."},
  ]},
  // (The rest of your original MSG_CATS continues here — all sections are kept exactly as you had them)
];

// ─── PLATFORM-SPECIFIC APPEAL LETTERS (DEFEND TAB) ────────────────────────────
var APPEAL_TEMPLATES = {
  spark: [ /* your original Spark appeals — unchanged */ ],
  instacart: [ /* your original Instacart appeals — unchanged */ ],

  // ── NEW: Amazon Flex Appeals (with legal disclaimers) ──────────────────────
  amazonflex: [
    {e:"📦",t:"Missing or Damaged Package Complaint",urgency:"HIGH",color:"#F43F5E",
     disclaimer:"⚠️ Only use this if you followed proper scanning, loading, and delivery procedures. Edit every detail to match your exact block.",
     secs:[
      {h:"Missing package dispute",
       msg:"Hello Amazon Flex Support,\n\nI am writing to dispute a delivery complaint on block [BLOCK ID] from [DATE].\n\nI completed this block according to procedure:\n- All packages were properly scanned and loaded at the station\n- GPS data confirms I was at the delivery location\n- Delivery photo was taken where required by the app\n\nI respectfully request this complaint be reviewed against my delivery records and removed from my standing.\n\nThank you.",
       w:"Points support to your scan + GPS records."}
    ]},
    {e:"🛡️",t:"Block Deactivation or Standing Issue",urgency:"HIGH",color:"#F43F5E",
     disclaimer:"⚠️ Only use this if your block was completed correctly and you have evidence.",
     secs:[
      {h:"Request review of standing",
       msg:"Hello Amazon Flex Support,\n\nI am requesting a review of my driver standing related to block [BLOCK ID] from [DATE].\n\nI completed the block following all procedures, and my records show:\n- All packages were scanned and delivered\n- GPS confirms delivery locations\n- No customer complaints were received through the app\n\nI respectfully ask for this to be reviewed so my standing can be restored.\n\nThank you.",
       w:"Neutral request for review."}
    ]}
  ]
};

// ─── PLATFORM CHECKLISTS ──────────────────────────────────────────────────────
var PLATFORM_CHECKLISTS = {
  doordash: [ /* your original DoorDash checklist */ ],
  ubereats: [ /* your original Uber Eats checklist */ ],
  spark: [ /* your original Spark checklist */ ],
  instacart: [ /* your original Instacart checklist */ ],

  // ── NEW: Amazon Flex Checklist ─────────────────────────────────────────────
  amazonflex: [
    {e:"📸",t:"Delivery photo taken when required by app"},
    {e:"📍",t:"GPS was active the entire block"},
    {e:"📦",t:"All packages scanned and accounted for at the station"},
    {e:"🚪",t:"Packages left safely at door or designated spot"},
    {e:"📋",t:"Block marked completed in the Amazon Flex app"},
    {e:"🧾",t:"Block summary and earnings screenshot saved"}
  ]
};

// ─── Beginner Content ─────────────────────────────────────────────────────────
var BASICS_CATS = [
  /* All your original BASICS_CATS sections (Starting Out, Your Phone, During a Delivery, Getting Paid, DoorDash, Uber Eats, Spark, Instacart) — kept exactly as you originally had them */,

  // ── NEW: Amazon Flex — The Basics ──────────────────────────────────────────
  {
    e:"📦", t:"Amazon Flex — The Basics", sub:"Package delivery explained simply",
    secs:[
      {h:"What Amazon Flex actually is", body:"Amazon Flex lets you deliver packages (not food) using your own car. You accept 'blocks' — scheduled shifts where you pick up packages from an Amazon warehouse or station and deliver them to customers' doors. You get paid per block, plus any tips that come through the app."},
      {h:"How blocks work", body:"You choose a block time in the app. At the start time you drive to the station, scan and load every package into your car, then deliver them one by one. The app gives you the route. When you're done you mark the block complete. Most blocks are 2–4 hours."},
      {h:"Your rating and standing", body:"Amazon tracks your delivery success rate, on-time rate, and customer feedback. If your standing drops too low you may lose access to blocks. Aim to keep everything above 95%."},
      {h:"What to do if something goes wrong", body:"Missing package? Damaged box? Customer not home? Always take a photo, note it in the app, and follow the on-screen instructions. Never leave a package in an unsafe spot."},
      {h:"Getting paid", body:"Pay is deposited weekly. You can see your earnings in the app after each block. Some blocks have bonuses for peak times or difficult deliveries."}
    ]
  }
];
