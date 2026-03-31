// DropPilot — Data (UPDATED WITH LEGAL SAFEGUARDS)
// Edit content here. No JSX — plain JS objects only.

var C = { /* ... your original C object unchanged ... */ };

// ─── Free Tips ────────────────────────────────────────────────────────────────
var ALL_TIPS = [ /* ... your original ALL_TIPS unchanged ... */ ];

// ─── Educational Content ──────────────────────────────────────────────────────
var LEARN_CATS = [ /* ... your original LEARN_CATS unchanged ... */ ];

// ─── Message Templates ────────────────────────────────────────────────────────
var MSG_CATS = [ /* ... your original arrival/late/problem scripts unchanged ... */ ];

// ─── PLATFORM-SPECIFIC APPEAL LETTERS (DEFEND TAB) ────────────────────────────
// UPDATED: Added strong disclaimers + neutral language
var APPEAL_TEMPLATES = {
  spark: [
    {e:"🚫",t:"False Non-Delivery Complaint",urgency:"HIGH",color:"#F43F5E",
     disclaimer:"⚠️ Only use this if you truly completed the delivery and have photo/GPS proof. Edit every detail to match your exact situation.",
     secs:[
      {h:"Standard non-delivery dispute",
       msg:"Hello Spark Support,\n\nI am writing to dispute a non-delivery complaint on delivery #[DELIVERY ID] from [DATE].\n\nI completed this delivery successfully. My evidence includes:\n- Delivery photo showing all bags at the customer’s door\n- GPS data confirming I was at the delivery location\n- App delivery confirmation record\n\nI respectfully request that this complaint be reviewed against my delivery photo and GPS data and removed from my record.\n\nThank you.",
       w:"Directs support to verifiable records (photo + GPS)."}
    ]},
    {e:"📦",t:"Missing Item or Wrong Item Dispute",urgency:"HIGH",color:"#F43F5E",
     disclaimer:"⚠️ Only use this if you followed the app’s out-of-stock / substitution protocol exactly.",
     secs:[
      {h:"Item was out of stock — you followed protocol",
       msg:"Hello Spark Support,\n\nI am disputing a complaint about a missing item on delivery #[DELIVERY ID] from [DATE].\n\nThe item [ITEM NAME] was not available. I handled this correctly:\n- Marked the item as unavailable in the Spark app\n- Followed the customer’s substitution preference (or left it unfulfilled per instructions)\n- Messaged the customer through the app before checkout\n\nMy in-app actions for this batch show I followed Spark’s protocol. Please review my batch activity and remove this complaint.\n\nThank you.",
       w:"Points support to the exact app log they can see."}
    ]},
    {e:"🔄",t:"Escalation — Appeal Was Denied",urgency:"USE AFTER A FIRST DENIAL",color:"#8B5CF6",
     disclaimer:"⚠️ Only send this if your first appeal was denied and you still have clear evidence.",
     secs:[
      {h:"Escalate to senior review",
       msg:"Hello,\n\nI am following up on a previous Spark Driver support request about delivery #[DELIVERY ID] from [DATE].\n\nMy initial request was denied. I am requesting a senior review because my delivery photo and GPS record appear to be inconsistent with the complaint.\n\nI have been a Spark Driver since [DATE] with a positive record. I am asking for a full review.\n\nThank you.",
       w:"Requests escalation without accusing the platform."}
    ]}
  ],
  instacart: [
    {e:"🚫",t:"False Non-Delivery Complaint",urgency:"HIGH — Can affect Shopper access",color:"#F43F5E",
     disclaimer:"⚠️ Only use this if you truly completed the batch and have photo/GPS proof. Edit every detail to match your exact situation.",
     secs:[
      {h:"Standard non-delivery dispute",
       msg:"Hello Instacart Support,\n\nI am writing to dispute a non-delivery complaint on batch #[BATCH ID] from [DATE].\n\nI completed this delivery successfully. My evidence includes:\n- Delivery photo showing the bags at [ADDRESS]\n- GPS data confirming I was at the delivery location at [TIME]\n- App delivery confirmation record\n- All items in this batch were scanned and verified\n\nI respectfully request that this complaint be reviewed against my delivery photo and GPS data and any impact on my Shopper rating be reversed.\n\nThank you.",
       w:"Instacart-specific Batch ID + scan record."}
    ]},
    {e:"📦",t:"Missing Item or Wrong Item Dispute",urgency:"HIGH — Most common Instacart complaint",color:"#F43F5E",
     disclaimer:"⚠️ Only use this if you followed Instacart’s out-of-stock / substitution protocol exactly.",
     secs:[
      {h:"Item was out of stock — you followed protocol",
       msg:"Hello Instacart Support,\n\nI am disputing a complaint about a missing item on batch #[BATCH ID] from [DATE].\n\nThe item [ITEM NAME] was not available at [STORE NAME]. I handled this correctly:\n- Marked the item as out of stock in the Instacart app at [TIME]\n- Selected an approved replacement / left the item unfulfilled per the customer’s preference\n- Messaged the customer through the app before checking out\n\nMy in-app actions for this batch show I followed Instacart’s protocol. Please review my batch activity and remove this complaint.\n\nThank you.",
       w:"Directs support to the verifiable batch activity log."}
    ]},
    {e:"🔄",t:"Escalation — First Appeal Denied",urgency:"USE AFTER A FIRST DENIAL",color:"#8B5CF6",
     disclaimer:"⚠️ Only send this if your first appeal was denied and you still have clear evidence.",
     secs:[
      {h:"Senior review request",
       msg:"Hello,\n\nI am following up on a previous Instacart support request about batch #[BATCH ID] from [DATE].\n\nMy first appeal was denied. I am requesting escalation to a senior Shopper support specialist because my delivery photo and batch activity log appear to be inconsistent with the complaint.\n\nI have been an active Instacart Shopper since [DATE] with a strong record. I am asking for a complete review.\n\nThank you.",
       w:"Neutral escalation language."}
    ]}
  ]
};

// ─── PLATFORM CHECKLISTS (unchanged) ─────────────────────────────────────────
var PLATFORM_CHECKLISTS = { /* ... your original unchanged ... */ };

// ─── Beginner Content (BASICS_CATS) ──────────────────────────────────────────
var BASICS_CATS = [ /* ... your original unchanged ... */ ];

// Export the new appeal templates so the app can use them
// (In your index.html Defend tab, change any hard-coded appeals to use APPEAL_TEMPLATES)
