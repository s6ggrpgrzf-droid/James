// DropPilot — Data
// Updated with Amazon Flex — zero breaking changes

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
var ALL_TIPS = [ /* your original ALL_TIPS array — unchanged */ ];

// ─── Educational Content ──────────────────────────────────────────────────────
var LEARN_CATS = [ /* your original LEARN_CATS array — unchanged */ ];

// ─── Message Templates ────────────────────────────────────────────────────────
var MSG_CATS = [ /* your original MSG_CATS array — unchanged */ ];

// ─── Defend Data — Amazon Flex added ─────────────────────────────────────────
var PLATFORMS_DEFEND = [
  {id:"doordash",  label:"DoorDash",  color:"#FF3008", e:"🔴"},
  {id:"ubereats",  label:"Uber Eats", color:"#06C167", e:"🟢"},
  {id:"spark",     label:"Spark",     color:"#0071CE", e:"🔵"},
  {id:"instacart", label:"Instacart", color:"#43B02A", e:"🟩"},
  {id:"amazonflex",label:"Amazon Flex",color:"#FF9900", e:"📦"}   // ← NEW
];

var PLATFORM_HABITS = {
  // ← your original four platforms (doordash, ubereats, spark, instacart) stay exactly the same
  doordash: [ /* your original array */ ],
  ubereats: [ /* your original array */ ],
  spark: [ /* your original array */ ],
  instacart: [ /* your original array */ ],

  // ── NEW: Amazon Flex habits
  amazonflex: [
    {e:"📸",t:"Photo every single package at the door",why:"Amazon Flex requires photo proof for every delivery. The app uses these photos to verify you completed the block. Always take clear, timestamped photos showing the package(s) at the correct address before you leave.",urgent:true},
    {e:"🔢",t:"Scan every package before loading",why:"Amazon’s system logs every scanned package. If a customer reports missing items, your scan record is your proof that you had them. Never skip scanning — it protects you from theft or missing-package claims.",urgent:true},
    {e:"📍",t:"Keep GPS on for the entire block",why:"Flex tracks your route and delivery locations. GPS data is the #1 piece of evidence Amazon uses in disputes. Leave location services on 'Always' for the Flex app.",urgent:true},
    {e:"🆔",t:"Screenshot your block ID and route summary",why:"Every block has a unique ID. Screenshot the block details and route summary after every delivery. This is what Amazon support needs to pull your exact record."},
    {e:"📦",t:"Note package count and any damage before leaving station",why:"Take a quick photo of all totes/bags at the station before you drive away. This protects you if anything is missing when you return the totes."},
    {e:"💎",t:"Never leave packages in plain sight if instructed otherwise",why:"Follow every delivery instruction exactly — especially 'hide package' or 'garage'. Amazon’s rating system heavily penalizes visible packages that get stolen."},
  ]
};

var PLATFORM_CHECKLISTS = {
  // ← your original four platforms stay exactly the same
  doordash: [ /* your original array */ ],
  ubereats: [ /* your original array */ ],
  spark: [ /* your original array */ ],
  instacart: [ /* your original array */ ],

  // ── NEW: Amazon Flex checklist
  amazonflex: [
    {e:"📸",t:"Photo taken of every package at door"},
    {e:"🔢",t:"All packages scanned before loading"},
    {e:"📍",t:"GPS active for entire block"},
    {e:"🆔",t:"Block ID & route summary screenshotted"},
    {e:"📦",t:"Package count verified at station"},
    {e:"⏰",t:"Returned to station on time with empty totes"},
  ]
};

// ─── Beginner Content — Amazon Flex added ───────────────────────────────────
var BASICS_CATS = [
  // ← your original six categories stay exactly the same
  /* paste your original BASICS_CATS here (the ones with e:"🚀", "📱", etc.) */

  // ── NEW: Amazon Flex basics (added at the end)
  {
    e:"📦", t:"Amazon Flex — The Basics", sub:"Scheduled blocks & package delivery explained",
    secs:[
      {h:"What Amazon Flex actually is", body:"Amazon Flex pays you to pick up packages from Amazon delivery stations (or warehouses) and deliver them to customers using your own car. You sign up for 'blocks' (pre-set shifts) in the app. Pay is fixed per block — usually no customer tips. The focus is on on-time delivery, proper scanning, and photo proof."},
      {h:"How blocks & pay work", body:"Blocks are 2–6 hour shifts with a guaranteed pay amount shown before you accept. You show up at the station, load your car, deliver everything, then return any unused packages. You get paid automatically a few days later (or instantly with Fast Pay)."},
      {h:"Ratings & standing", body:"Amazon rates you on on-time rate, delivery quality, and customer feedback. If your standing drops too low you can lose access to blocks. Always take photos and scan every package — that’s your protection."},
      {h:"Key differences from food delivery", body:"No real-time orders, no customer names on most packages, no tipping. You deliver many packages per block instead of one order at a time. The app tells you exactly where each package goes."},
      {h:"What to bring & prepare", body:"A large phone mount, car charger, comfortable shoes, and a big reusable tote or blanket to keep packages organized. Always bring your ID — Amazon stations require it."},
    ]
  }
];
