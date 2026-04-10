import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, Alert, Platform, Animated, Dimensions,
  KeyboardAvoidingView, Modal, StatusBar, SafeAreaView,
  FlatList, Clipboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  bg: '#07080A', s1: '#0D0F13', s2: '#12151A', s3: '#1A1E26',
  border: 'rgba(255,255,255,0.08)',
  amber: '#F5A623', amberD: '#C8820A', amberL: '#ffc84a',
  green: '#10B981', teal: '#06B6D4', blue: '#3B82F6',
  red: '#F43F5E', purple: '#8B5CF6',
  text: '#EDF0F7', text2: '#8B95A8', text3: '#4B5563',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt$ = n => `$${parseFloat(n || 0).toFixed(2)}`;
const fmtK = n => parseFloat(n || 0) >= 1000 ? `$${(n / 1000).toFixed(1)}k` : fmt$(n);
const fmtH = n => { const h = Math.floor(n || 0), m = Math.round(((n || 0) - h) * 60); return m ? `${h}h ${m}m` : `${h}h`; };
const tod = () => new Date().toISOString().split('T')[0];
const sumf = (a, fn) => a.reduce((t, x) => t + parseFloat(fn(x) || 0), 0);
const thisMonth = a => { const n = new Date(); return a.filter(x => { const d = new Date(x.date); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }); };
const todayArr = a => a.filter(x => x.date === tod());

async function load(k, fb) { try { const v = await AsyncStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
async function save(k, v) { try { await AsyncStorage.setItem(k, JSON.stringify(v)); } catch {} }

// ─── Platforms ────────────────────────────────────────────────────────────────
const PLATFORMS = ['DoorDash', 'Uber Eats', 'Spark', 'Instacart', 'GrubHub', 'Amazon Flex', 'Shipt', 'Other'];
const PLT = { 'DoorDash': '#FF3008', 'Uber Eats': '#06C167', 'Spark': '#0071CE', 'Instacart': '#43B02A', 'GrubHub': '#F63440', 'Amazon Flex': '#FF9900', 'Shipt': '#E31837', 'Other': '#6B7280' };

// ─── Tips Data ────────────────────────────────────────────────────────────────
const FREE_TIPS = [
  { e: '👋', t: 'Greet with a smile', s: 'First impressions set the tone for your rating.', d: 'Make brief eye contact and say something simple like Hi, here is your order! You do not need to be chatty — just warm. Customers rate drivers who feel human significantly higher than those who silently hand over the bag and walk away.' },
  { e: '🔔', t: 'Only knock if they ask you to', s: 'Most people want a quiet, contactless drop-off.', d: 'If the customer chose Leave at Door, do NOT knock or ring. Set the food down neatly, take a photo, and mark it delivered. Knocking on a contactless order is one of the top reasons good drivers get unexpected 1-star ratings.' },
  { e: '📸', t: 'Photo every single drop-off', s: 'Your photo is proof if anything goes wrong.', d: 'Snap a clear photo showing the food AND the door or house number. This protects you if a customer ever claims they never got their order. Make it a habit on every delivery, every time, without exception.' },
];

const LOCKED_TIPS = [
  { e: '💬', t: 'Text when you are close', s: 'Arrival messages get 5-star reactions.' },
  { e: '🌡️', t: 'Handle food like it is your own dinner', s: 'Hot food still hot equals bigger tips.' },
  { e: '⚡', t: 'Fast but always to the right address', s: 'A wrong delivery is worse than a slow one.' },
  { e: '🤐', t: 'Never complain to the customer', s: 'Keep it professional, always.' },
  { e: '🎁', t: 'Grab extra napkins when you can', s: 'Small gestures equal bigger tips.' },
  { e: '🚪', t: 'Contactless means zero contact', s: 'Do not knock. Do not ring. Just deliver.' },
  { e: '📞', t: 'When something goes wrong, text first', s: 'A quick message prevents a bad review.' },
];

const MSG_CATS = [
  {
    e: '📲', t: 'What to Say When You Arrive', sub: 'Texts that get 5-star ratings', secs: [
      { h: 'Standard arrival', msg: "Hey! Pulling up now with your order from [restaurant]. I'll leave it at your door. Enjoy! 😊", w: 'Sets expectations before they open the app. Customers often rate you before they see the food.' },
      { h: 'A few minutes away', msg: 'Hi! Just a heads up — about 3-4 minutes away with your food. See you soon!', w: 'Advance notice means they meet you at the door, cutting your wait time.' },
      { h: 'Apartment building', msg: "Hi! I'm at the main entrance with your order. Could you buzz me in or meet me at the lobby? Thanks!", w: 'Always text before calling for apartments. Most respond in under 30 seconds when food is outside.' },
      { h: 'Leave at door confirmation', msg: 'Your order has been left at your door. Enjoy your meal! 🍕', w: 'A quick confirmation nearly eliminates false non-delivery complaints.' },
      { h: 'Office or business', msg: 'Hi! Downstairs at [building] with your order. Happy to leave it at the front desk or you can meet me!', w: 'Offering options signals professionalism and saves you a wasted trip.' },
    ],
  },
  {
    e: '⏰', t: 'When You Are Running Late', sub: 'How to turn a bad situation into a 5-star', secs: [
      { h: 'Restaurant taking forever', msg: "Hey! Your order is still being prepared at the restaurant. I'm here and will head your way as soon as it's ready. Sorry for the wait!", w: 'Customers who hear nothing assume you forgot them. One text flips that completely.' },
      { h: 'Stuck in traffic', msg: 'Hi! Running a little behind due to traffic. On my way and will be there as soon as I can — thanks for your patience!', w: 'Never blame the app or restaurant. Own it briefly and stay positive.' },
      { h: 'Significantly late', msg: "Hi! Really sorry for the delay tonight. Dealing with [traffic / long restaurant wait] and I'll be there in about [X] minutes. I truly appreciate your patience.", w: 'Bigger delays need bigger acknowledgment. Be direct, give a real ETA.' },
      { h: 'Follow up after a late delivery', msg: "Just dropped off your order — really sorry for the wait tonight. Hope everything still tastes great! Have a good evening.", w: 'Almost no drivers do this. It often turns a 3-star into a 5-star.' },
    ],
  },
  {
    e: '🚨', t: 'When Something Goes Wrong', sub: 'Scripts that protect your rating', secs: [
      { h: 'Cannot find the address', msg: "Hi! Having a little trouble locating you. I'm near [landmark]. Could you help with directions or a gate code?", w: 'Always text before calling. Give them something to work with.' },
      { h: 'Need a gate code', msg: 'Hi! At the gate but need a code to get in. Could you send it over? Right here!', w: 'People respond in seconds when their food is right outside.' },
      { h: 'No one answers the door', msg: "Hi! At your door and knocked. I'll wait a couple minutes — if I don't hear back I may need to leave it at the door. Just want to make sure you get it!", w: 'Documents your attempt and gives them a chance to respond.' },
      { h: 'Safe drop-off with photo', msg: 'Your order has been left at your door. Took a photo as confirmation. Enjoy!', w: 'Mentioning the photo casually shields you from false complaints.' },
      { h: 'Large apartment complex — hard to navigate', msg: "Hi! I'm in the [building/complex name] parking lot but having trouble finding your unit. Could you help — which building number, entrance, or stairwell should I head to? Almost there!", w: 'Asking for a specific landmark gets you a useful answer fast.' },
    ],
  },
  {
    e: '⭐', t: 'How to Get Better Tips and Ratings', sub: 'What to say — and what never to say', secs: [
      { h: 'Natural sign-off that earns tips', msg: 'Enjoy your meal! If anything ever comes up feel free to reach out through the app. Have a great night! 😊', w: 'Positions you as someone who cares — without ever asking for anything.' },
      { h: 'When you went above and beyond', msg: 'Thanks for the order! Made sure to keep everything upright and warm on the way. Hope you enjoy every bite!', w: 'Pointing out your care makes them look in the bag with appreciation, not suspicion.' },
      { h: 'When you added something extra', msg: 'Hi! The bag was light on napkins so I grabbed a few extras. Everything else looks good — enjoy!', w: 'If you do not mention it they might not notice. If you do, it is memorable.' },
      { h: 'What you should NEVER say', caution: true, msg: 'Please leave me 5 stars! / I really need a good rating this week. / Could you add a tip? / This order was really far.', w: 'Asking for ratings or tips is against platform rules and makes customers deeply uncomfortable.' },
    ],
  },
  {
    e: '🏢', t: 'Tricky Delivery Situations', sub: 'Word-for-word scripts for the hard ones', secs: [
      { h: 'Hotel delivery', msg: "Hi! In the lobby of [hotel] with your order. The front desk can't accept deliveries — would you be able to come down? Happy to wait!", w: 'Always announce from the lobby, not the room floor.' },
      { h: 'Gated community, no code', msg: 'Hi! At the gate but did not get a code with the order. Could you send it or buzz me in? Right here!', w: 'Do not wait. Text immediately. Every minute at the gate is wasted.' },
      { h: 'Customer seems upset at the door', msg: "I'm really sorry about that. Got here as fast as I could. I hope the rest of your evening is better!", w: 'Do not defend yourself. Acknowledge, apologize briefly, wish them well, leave.' },
    ],
  },
];

// ─── Defend Data ──────────────────────────────────────────────────────────────
const PLATFORMS_DEFEND = [
  { id: 'doordash', label: 'DoorDash', color: '#FF3008', e: '🔴' },
  { id: 'ubereats', label: 'Uber Eats', color: '#06C167', e: '🟢' },
  { id: 'spark', label: 'Spark', color: '#0071CE', e: '🔵' },
  { id: 'instacart', label: 'Instacart', color: '#43B02A', e: '🟩' },
];

const PLATFORM_HABITS = {
  doordash: [
    { e: '📸', t: 'Photo every drop-off before leaving', why: 'Your delivery photo is your #1 defense. DoorDash support agents verify it against your GPS location. A clear photo showing the food at the door with the address visible wins almost every false non-delivery case. Without it you have no case. Take it every single time.', urgent: true },
    { e: '💬', t: 'Text the customer on every order', why: 'Your in-app message history is timestamped and visible to Dasher support. When a customer claims you never communicated, your message thread proves otherwise. Agents check this in every dispute.', urgent: true },
    { e: '📍', t: 'Keep GPS active the entire shift', why: 'DoorDash logs your GPS position throughout the delivery. If a customer reports non-delivery, support pulls your GPS track to verify you were at their address. Without GPS data your word means nothing.', urgent: true },
    { e: '🖼️', t: 'Screenshot the delivery confirmation', why: "After the app shows delivery confirmed, screenshot it before moving on. This is the platform's own timestamped record — separate from your photo and equally important in a dispute." },
    { e: '💎', t: 'Integrity and doing your best are always worth it', why: 'Drivers who genuinely care — who handle every bag carefully, who treat every door like it matters — build a reputation that compounds over time. Better ratings, better tips, better orders. Doing your best is the most profitable thing.' },
    { e: '📋', t: 'Note the order number on any problematic delivery', why: 'If a restaurant has long wait times, a customer seems upset, or anything feels off — quickly note the DoorDash order number. This is what support agents use to pull your delivery record.' },
  ],
  ubereats: [
    { e: '📸', t: 'Photo the drop-off — Uber requires it', why: "Uber Eats requires drivers to submit a photo for contactless deliveries. That photo is timestamped, geotagged, and stored in Uber's system. If you did not take one, you have no evidence.", urgent: true },
    { e: '💬', t: 'Use in-app messaging — never SMS', why: 'Uber support can only see your in-app message history, not SMS texts. Always message through the Uber Eats app so every communication is logged and visible to agents.', urgent: true },
    { e: '📍', t: 'GPS must stay on — Uber uses it heavily', why: "Uber's dispute system relies on GPS trip data more than any other platform. If GPS was off, they cannot verify your delivery and typically side with the customer.", urgent: true },
    { e: '🆔', t: 'Screenshot your Trip ID on problem deliveries', why: 'Uber identifies every delivery by a Trip ID, not an order name. In any support appeal you must include the Trip ID — without it agents cannot find your record.' },
    { e: '⭐', t: 'Your rating affects which trips you see', why: "Uber shows higher-paying trips to drivers with better ratings. A rating below 4.7 starts to reduce your trip quality. Uber's policy allows removal of ratings that reflect restaurant errors or factors outside your control." },
    { e: '🔄', t: 'Document long restaurant waits with a message', why: "If you wait more than 10 minutes at a restaurant, send the customer an in-app message noting the delay. This creates a timestamped record that any wait time was the restaurant's fault." },
  ],
  spark: [
    { e: '📸', t: 'Photo of every drop-off is mandatory', why: 'Walmart Spark requires a delivery photo for every order. Take a clear photo showing the bags at the door with the house number visible. Without it, Spark support will almost always side with the customer.', urgent: true },
    { e: '📦', t: 'Check and photograph the full order at the store', why: 'Spark drivers are responsible for picking items. Before leaving the store, verify all items, note any unavailable items in the app, and photograph your cart if the order is large.', urgent: true },
    { e: '💬', t: 'Message customers about every substitution', why: 'When an item is unavailable and you substitute it, always message the customer through the Spark app before you leave the store. Spark agents check your message history in substitution disputes.', urgent: true },
    { e: '📍', t: 'GPS must stay on the entire trip', why: 'Spark uses GPS data to verify delivery location and timing. If your GPS confirms you were there, that is your strongest evidence.' },
    { e: '🧾', t: 'Screenshot your delivery summary with all items', why: 'After completing an order, the Spark app shows a summary of what was delivered including substitutions and unavailable items. Screenshot this every time.' },
    { e: '⭐', t: 'On-Time rating is separate from overall rating', why: 'Spark tracks your on-time delivery rate separately from your customer rating. Both affect your access to better batches.' },
  ],
  instacart: [
    { e: '📸', t: 'Photo every drop-off — this is non-negotiable', why: 'Instacart requires a delivery photo and uses it in every non-delivery dispute. The photo must show the items at the door with the address or a house number visible.', urgent: true },
    { e: '🛒', t: 'Scan every item at the store', why: 'Instacart tracks which items you scanned. If a customer says an item was missing and you scanned it, that scan record is your proof.', urgent: true },
    { e: '💬', t: 'Message customers about every replacement', why: 'When an item is out of stock and you make a replacement, always message the customer through the Instacart app before you check out.', urgent: true },
    { e: '📋', t: 'Note your batch ID on any problem order', why: 'Instacart support identifies orders by Batch ID. For any delivery where something goes wrong, note or screenshot the Batch ID immediately.' },
    { e: '⭐', t: 'Your rating affects batch access — 4.7 is the key threshold', why: 'Instacart shoppers rated below 4.7 see fewer and lower-paying batches. Rating removal is possible for complaints caused by out-of-stock items, store errors, or app issues.' },
    { e: '🔄', t: 'Rate your customer interactions and document difficult ones', why: "If a customer is rude or makes unreasonable demands, note it in the Instacart app's feedback. This creates a record before any dispute is filed." },
  ],
};

const PLATFORM_APPEALS = {
  doordash: [
    {
      e: '🚫', t: 'False Non-Delivery Complaint', urgency: 'HIGH — Can trigger deactivation', color: '#F43F5E', secs: [
        { h: 'Standard non-delivery dispute', msg: "Hello Dasher Support,\n\nI am writing to dispute a false non-delivery complaint on Dasher order #[ORDER ID] from [DATE].\n\nThis delivery was completed successfully. My documentation:\n- Delivery photo showing the order placed at [ADDRESS] with the door visible\n- GPS data confirming my location at [ADDRESS] at [TIME]\n- App delivery confirmation timestamp\n\nThe customer's claim is inaccurate. I am requesting:\n1. This complaint be reviewed against my delivery photo and GPS data\n2. Any negative impact on my completion rate or Dasher standing be reversed\n3. The customer's account be reviewed if this is part of a pattern\n\nThank you.", w: "List each piece of evidence as a separate bullet — agents check each one individually." },
        { h: 'Same address filing multiple complaints', msg: "Hello Dasher Support,\n\nI am writing about a pattern of false complaints I believe is coming from the same location.\n\nComplaints from [ADDRESS]:\n- Order #[ORDER ID 1] on [DATE 1] — I have delivery photo proof\n- Order #[ORDER ID 2] on [DATE 2] — I have delivery photo proof\n\nI believe this customer is repeatedly filing false non-delivery complaints to receive refunds. I am asking for:\n1. A review of all complaints from this address against my delivery evidence\n2. This address to be flagged in DoorDash's system if a pattern is confirmed\n3. All negative effects on my account to be reversed\n\nThank you.", w: "The phrase 'pattern of false complaints' moves your ticket from an individual review to a fraud investigation." },
      ],
    },
    {
      e: '⭐', t: 'Unfair Customer Rating', urgency: 'MEDIUM — Affects order access', color: '#F5A623', secs: [
        { h: 'Rating caused by restaurant error', msg: "Hello Dasher Support,\n\nI am requesting removal of a 1-star rating on order #[ORDER ID] from [DATE].\n\nThis rating was caused by a restaurant error, not my performance:\n- I received a sealed bag from the restaurant\n- I had no ability to inspect or verify the contents\n- My delivery was completed correctly and on time\n\nDoorDash policy allows removal of ratings that reflect factors outside the Dasher's control. My rating before this was [X stars].\n\nPlease review and remove this rating.\n\nThank you.", w: "'Factors outside the Dasher's control' is the exact language in DoorDash's internal rating review policy." },
        { h: 'Rating after a Leave at Door delivery', msg: "Hello Dasher Support,\n\nRequesting removal of a rating on order #[ORDER ID] from [DATE].\n\nThis rating is inconsistent with the delivery record:\n1. The customer's instructions were set to Leave at Door\n2. I placed the order at their door at [TIME] exactly as instructed\n3. I took a delivery photo confirming placement\n4. A delivery notification was sent to the customer\n\nI followed the customer's own delivery instructions exactly. Please review and remove it.\n\nThank you.", w: "Leading with the numbered sequence of events closes every line of dispute before it opens." },
      ],
    },
    {
      e: '📉', t: 'Completion Rate Wrongly Affected', urgency: 'HIGH — Impacts Dasher tier', color: '#F43F5E', secs: [
        { h: 'Completion rate dispute', msg: "Hello Dasher Support,\n\nMy completion rate has been negatively affected by a complaint on order #[ORDER ID] from [DATE] that I believe is incorrect.\n\nProof of successful delivery:\n- Delivery photo at [ADDRESS]\n- GPS data confirming I was at the address at [TIME]\n- App delivery confirmation\n\nMy completion rate directly affects my Dasher status and access to Top Dasher benefits and priority orders. I am asking that this complaint be reviewed and reversed.\n\nThank you.", w: "Naming 'Top Dasher' and 'priority orders' signals the full business impact to the agent." },
      ],
    },
    {
      e: '🔄', t: 'Escalation — Appeal Was Denied', urgency: 'USE AFTER A FIRST DENIAL', color: '#8B5CF6', secs: [
        { h: 'Second appeal to senior agent', msg: "Hello,\n\nI am following up on a previous Dasher support request regarding order #[ORDER ID] from [DATE].\n\nMy original appeal was not resolved. I am requesting escalation to a senior Dasher account specialist because:\n- My delivery photo evidence was not properly reviewed\n- The complaint directly contradicts my GPS track, photo timestamp, and app delivery record\n- This complaint is continuing to impact my account standing and income\n\nI have been an active Dasher since [DATE] with a strong record. I am asking for a thorough senior review.\n\nThank you.", w: "Asking specifically for a 'senior Dasher account specialist' routes your ticket to a different tier of review." },
      ],
    },
  ],
  ubereats: [
    {
      e: '🚫', t: 'False Non-Delivery Complaint', urgency: 'HIGH — Can affect account standing', color: '#F43F5E', secs: [
        { h: 'Standard non-delivery dispute', msg: "Hello Uber Eats Support,\n\nI am writing to dispute a non-delivery complaint on trip #[TRIP ID] from [DATE].\n\nI completed this delivery successfully. My documentation:\n- Delivery photo taken at [ADDRESS] at [TIME] — geotagged and timestamped\n- GPS trip data showing my location at the delivery address\n- In-app delivery confirmation record\n\nI am requesting:\n1. This complaint be reviewed against my photo and GPS trip data\n2. Any negative effect on my account or completion rate be reversed\n\nThank you.", w: "Mentioning 'geotagged and timestamped' tells the agent exactly what to look for in your photo record." },
      ],
    },
    {
      e: '⭐', t: 'Unfair Rating', urgency: 'MEDIUM — Affects trip quality', color: '#F5A623', secs: [
        { h: 'Rating caused by restaurant issue', msg: "Hello Uber Eats Support,\n\nI am requesting removal of a low rating on trip #[TRIP ID] from [DATE].\n\nThis rating does not reflect my service. The customer was dissatisfied with [missing item / food quality / wait time], which was caused by the restaurant, not by me.\n\nI picked up a sealed order from [RESTAURANT NAME]. I had no way to inspect or modify the contents.\n\nUber policy allows removal of ratings caused by factors outside the delivery partner's control. My rating before this was [X].\n\nThank you.", w: "'Factors outside the delivery partner's control' mirrors Uber's internal review language." },
      ],
    },
    {
      e: '🔄', t: 'Escalation — First Appeal Denied', urgency: 'USE AFTER A FIRST DENIAL', color: '#8B5CF6', secs: [
        { h: 'Escalate to senior specialist', msg: "Hello,\n\nI am following up on a previous request about Uber Eats trip #[TRIP ID] from [DATE].\n\nMy initial appeal was not resolved. I am requesting escalation to a senior account specialist because:\n- My photo and GPS evidence were not properly evaluated\n- The complaint contradicts my documented delivery record\n- This is continuing to affect my account and income\n\nI have been an Uber delivery partner since [DATE] with a strong track record.\n\nThank you.", w: "Asking for 'senior account specialist' by name triggers a routing change to a different review tier." },
      ],
    },
  ],
  spark: [
    {
      e: '🚫', t: 'False Non-Delivery Complaint', urgency: 'HIGH — Can affect Spark standing', color: '#F43F5E', secs: [
        { h: 'Standard non-delivery dispute', msg: "Hello Spark Driver Support,\n\nI am writing to dispute a non-delivery complaint on delivery #[DELIVERY ID] from [DATE].\n\nThis delivery was completed successfully. My documentation:\n- Delivery photo showing the order placed at [ADDRESS]\n- GPS data confirming my location at the delivery address at [TIME]\n- App delivery confirmation timestamp\n\nI am requesting:\n1. This complaint be reviewed against my delivery photo and GPS record\n2. Any negative impact on my driver rating or standing be reversed\n\nThank you.", w: "Spark support uses Delivery IDs to pull records. Include it in the first line." },
      ],
    },
    {
      e: '📦', t: 'Missing or Substituted Item Dispute', urgency: 'HIGH — Common Spark complaint', color: '#F43F5E', secs: [
        { h: 'Item was out of stock — you followed protocol', msg: "Hello Spark Driver Support,\n\nI am writing to dispute a complaint about a missing item on delivery #[DELIVERY ID] from [DATE].\n\nThe item [ITEM NAME] was not available at the Walmart store. I handled this correctly:\n- Marked the item as unavailable in the Spark app\n- Selected an approved substitution / notified the customer of unavailability\n- Messaged the customer through the app before checking out\n\nI followed Spark's out-of-stock protocol exactly. Please review my in-app actions for this batch and remove this complaint.\n\nThank you.", w: "Spark agents can see exactly what you did in the app — this appeal points them to that record." },
      ],
    },
    {
      e: '🔄', t: 'Escalation — Appeal Was Denied', urgency: 'USE AFTER A FIRST DENIAL', color: '#8B5CF6', secs: [
        { h: 'Escalate to senior review', msg: "Hello,\n\nI am following up on a previous Spark Driver support request about delivery #[DELIVERY ID] from [DATE].\n\nMy initial request was denied. I am requesting a senior review because:\n- My delivery photo and GPS record were not properly evaluated\n- My in-app actions for this batch were not reviewed against the complaint\n- This complaint is unfairly affecting my driver rating\n\nI have been a Spark Driver since [DATE] with a positive record.\n\nThank you.", w: "Following up with a specific senior review request often breaks through the first-tier denial cycle." },
      ],
    },
  ],
  instacart: [
    {
      e: '🚫', t: 'False Non-Delivery Complaint', urgency: 'HIGH — Can affect Shopper access', color: '#F43F5E', secs: [
        { h: 'Standard non-delivery dispute', msg: "Hello Instacart Support,\n\nI am writing to dispute a non-delivery complaint on batch #[BATCH ID] from [DATE].\n\nI completed this delivery successfully. My evidence:\n- Delivery photo showing the bags at [ADDRESS]\n- GPS data confirming I was at the delivery location at [TIME]\n- App delivery confirmation record\n- All items in this batch were scanned and verified\n\nI am requesting:\n1. This complaint be reviewed against my delivery photo and GPS data\n2. Any impact on my Shopper rating or standing be reversed\n\nThank you.", w: "Including 'all items were scanned' adds a data point agents can verify against the scan record." },
      ],
    },
    {
      e: '📦', t: 'Missing Item or Wrong Item Dispute', urgency: 'HIGH — Most common Instacart complaint', color: '#F43F5E', secs: [
        { h: 'Item was out of stock — you followed protocol', msg: "Hello Instacart Support,\n\nI am disputing a complaint about a missing item on batch #[BATCH ID] from [DATE].\n\nThe item [ITEM NAME] was not available at [STORE NAME]. I handled this correctly:\n- Marked the item as out of stock in the Instacart app at [TIME]\n- Selected an approved replacement per the customer's preference\n- Messaged the customer through the app before checking out\n\nMy in-app actions for this batch show I followed Instacart's out-of-stock protocol exactly.\n\nThank you.", w: "Instacart's batch activity log shows every action you took — this appeal directs the agent to that log." },
      ],
    },
    {
      e: '🔄', t: 'Escalation — First Appeal Denied', urgency: 'USE AFTER A FIRST DENIAL', color: '#8B5CF6', secs: [
        { h: 'Senior review request', msg: "Hello,\n\nI am following up on a previous Instacart support request about batch #[BATCH ID] from [DATE].\n\nMy first appeal was denied. I am requesting escalation to a senior Shopper support specialist because:\n- My delivery photo and batch activity log were not fully reviewed\n- The complaint contradicts my documented in-app actions\n- This is continuing to affect my Shopper rating and batch access\n\nI have been an active Instacart Shopper since [DATE] with a strong record.\n\nThank you.", w: "Requesting a 'senior Shopper support specialist' by that title moves your ticket past first-tier agents." },
      ],
    },
  ],
};

const PLATFORM_CHECKLISTS = {
  doordash: [
    { e: '📸', t: 'Delivery photo taken — door and bags visible' },
    { e: '💬', t: 'Customer messaged through DoorDash app' },
    { e: '📍', t: 'GPS was active during the entire delivery' },
    { e: '📋', t: 'Order marked delivered in the app' },
    { e: '🖼️', t: 'Delivery confirmation screen screenshotted' },
    { e: '📝', t: 'Order number noted if anything felt off' },
  ],
  ubereats: [
    { e: '📸', t: 'Photo submitted through Uber Eats app' },
    { e: '💬', t: 'Customer messaged in-app (not SMS)' },
    { e: '📍', t: 'GPS active for the full trip' },
    { e: '🆔', t: 'Trip ID screenshotted if anything went wrong' },
    { e: '📋', t: 'Delivery confirmed in the Uber Eats app' },
    { e: '⏱️', t: 'Long restaurant wait documented with message' },
  ],
  spark: [
    { e: '📸', t: 'Delivery photo taken showing all bags at door' },
    { e: '💬', t: 'Customer messaged via Spark app about any changes' },
    { e: '📍', t: 'GPS active throughout the trip' },
    { e: '📋', t: 'Delivery confirmed in the Spark app' },
    { e: '🛒', t: 'Any out-of-stock items marked in app before checkout' },
    { e: '🧾', t: 'Delivery summary screenshotted after completion' },
  ],
  instacart: [
    { e: '📸', t: 'Delivery photo submitted in the Instacart app' },
    { e: '🛒', t: 'All available items scanned in store' },
    { e: '💬', t: 'Customer messaged in-app about any substitutions' },
    { e: '📍', t: 'GPS active throughout the entire batch' },
    { e: '📋', t: 'Batch confirmed complete in the app' },
    { e: '🧾', t: 'Batch summary screenshotted after delivery' },
  ],
};

// ─── Shared UI Components ─────────────────────────────────────────────────────
const Btn = ({ onPress, style, textStyle, children, color = C.amber }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[{
    backgroundColor: color, borderRadius: 14, padding: 16,
    alignItems: 'center', justifyContent: 'center',
  }, style]}>
    <Text style={[{ color: '#000', fontWeight: '900', fontSize: 15 }, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

const Card = ({ style, children }) => (
  <View style={[{
    backgroundColor: C.s2, borderRadius: 18,
    borderWidth: 1, borderColor: C.border, overflow: 'hidden',
  }, style]}>
    {children}
  </View>
);

const Tag = ({ children, color = C.amber }) => (
  <View style={{ backgroundColor: color + '20', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', borderWidth: 1, borderColor: color + '40' }}>
    <Text style={{ color, fontSize: 10, fontWeight: '800', letterSpacing: 1 }}>{children}</Text>
  </View>
);

// ─── Intro Animation ──────────────────────────────────────────────────────────
function IntroAnimation({ onDone }) {
  const [scene, setScene] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const TOTAL = 27000;
  const SCENES = [
    { id: 0, start: 0 },
    { id: 2, start: 3500 },
    { id: 3, start: 7000 },
    { id: 4, start: 10500 },
    { id: 5, start: 14000 },
    { id: 6, start: 17500 },
    { id: 7, start: 21000 },
    { id: 8, start: 24500 },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    Animated.timing(progress, { toValue: 1, duration: TOTAL, useNativeDriver: false }).start();

    const t0 = Date.now();
    const tick = () => {
      const elapsed = Date.now() - t0;
      for (let i = SCENES.length - 1; i >= 0; i--) {
        if (elapsed >= SCENES[i].start) { setScene(SCENES[i].id); break; }
      }
      if (elapsed < TOTAL) { setTimeout(tick, 100); }
      else { setTimeout(onDone, 400); }
    };
    tick();
  }, []);

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const scenes = {
    0: (
      <View style={s.introContent}>
        <Text style={s.introTag}>for gig delivery drivers</Text>
        <Animated.Text style={[s.introEmoji, { transform: [{ translateY: floatAnim }] }]}>🚗</Animated.Text>
        <Text style={s.introHeadline}>Your rating{'\n'}is your{'\n'}paycheck.</Text>
        <View style={s.introDivider} />
        <Text style={s.introSub}>Higher ratings = better orders{'\n'}= more money. Every single time.</Text>
      </View>
    ),
    2: (
      <View style={s.introContent}>
        <Text style={s.introTag}>tip #1</Text>
        <Text style={s.introEmoji}>👋</Text>
        <Text style={s.introHeadline}>Greet every{'\n'}customer.</Text>
        <View style={s.introDivider} />
        <Text style={s.introSub}>A simple "Hi, here's your order!" makes you feel human. Customers rate humans higher.</Text>
        <View style={[s.introHighlight, { borderColor: C.amber + '60' }]}>
          <Text style={[s.introHighlightText, { color: C.amber }]}>You don't need to be chatty. Just be warm.</Text>
        </View>
      </View>
    ),
    3: (
      <View style={s.introContent}>
        <Text style={s.introTag}>tip #2</Text>
        <Text style={s.introEmoji}>🙏</Text>
        <Text style={s.introHeadline}>Say please{'\n'}and thank you.</Text>
        <View style={s.introDivider} />
        <Text style={s.introSub}>You are a guest at their door. "Thank you for the order!" costs nothing and earns everything.</Text>
        <View style={[s.introHighlight, { borderColor: C.amber + '60' }]}>
          <Text style={[s.introHighlightText, { color: C.amber }]}>Basic courtesy is surprisingly rare. Stand out by using it.</Text>
        </View>
      </View>
    ),
    4: (
      <View style={s.introContent}>
        <Text style={s.introTag}>tip #3</Text>
        <Text style={s.introEmoji}>😊</Text>
        <Text style={s.introHeadline}>Smile when{'\n'}you hand it over.</Text>
        <View style={s.introDivider} />
        <Text style={s.introSub}>People tip more when they feel good at the door. A genuine smile earns real money.</Text>
        <View style={[s.introHighlight, { borderColor: C.green + '60' }]}>
          <Text style={[s.introHighlightText, { color: C.green }]}>Your face is part of the delivery.</Text>
        </View>
      </View>
    ),
    5: (
      <View style={s.introContent}>
        <Text style={s.introTag}>tip #4</Text>
        <Text style={s.introEmoji}>🤝</Text>
        <Text style={s.introHeadline}>Be respectful,{'\n'}every time.</Text>
        <View style={s.introDivider} />
        <Text style={s.introSub}>Treat every door like it matters. That customer controls your rating, your tips, and your access to better orders.</Text>
        <View style={[s.introHighlight, { borderColor: C.amber + '60' }]}>
          <Text style={[s.introHighlightText, { color: C.amber }]}>Every delivery is a job interview.</Text>
        </View>
      </View>
    ),
    6: (
      <View style={s.introContent}>
        <Text style={s.introTag}>tip #5</Text>
        <Text style={s.introEmoji}>☀️</Text>
        <Text style={s.introHeadline}>Stay positive{'\n'}no matter what.</Text>
        <View style={s.introDivider} />
        <Text style={s.introSub}>Long wait. Bad navigation. Heavy traffic. The customer sees none of that. They only see you at their door.</Text>
        <View style={[s.introHighlight, { borderColor: C.amber + '60' }]}>
          <Text style={[s.introHighlightText, { color: C.amber }]}>Good energy is contagious. So is bad energy.</Text>
        </View>
      </View>
    ),
    7: (
      <View style={s.introContent}>
        <Text style={s.introTag}>when you do all 5</Text>
        <Text style={{ fontSize: 28, letterSpacing: 4, marginBottom: 10 }}>⭐⭐⭐⭐⭐</Text>
        <Text style={s.introHeadline}>Your rating{'\n'}goes up.</Text>
        <Text style={[s.introSub, { marginBottom: 16 }]}>Your tips go up. Your orders get better. Your income grows.</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['📦 Better orders', '💰 Higher tips', '⚡ More earnings', '🛡️ Account safe'].map((item, i) => (
            <View key={i} style={{ backgroundColor: C.green + '15', borderWidth: 1, borderColor: C.green + '35', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 }}>
              <Text style={{ color: C.green, fontWeight: '700', fontSize: 12 }}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    ),
    8: (
      <View style={[s.introContent, { alignItems: 'center' }]}>
        <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: C.amber, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <Text style={{ fontSize: 32 }}>🚗</Text>
        </View>
        <Text style={{ fontSize: 34, fontWeight: '900', color: C.text, letterSpacing: -1, marginBottom: 4 }}>DropPilot</Text>
        <Text style={{ fontSize: 9, color: C.text3, letterSpacing: 2, fontWeight: '700', marginBottom: 14 }}>DRIVER COMMAND CENTER</Text>
        <View style={s.introDivider} />
        <Text style={[s.introSub, { marginBottom: 20 }]}>Customer service scripts, account protection, and order calculator — all in one place.</Text>
        <View style={{ backgroundColor: C.amber + '18', borderWidth: 2, borderColor: C.amber + '70', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 20 }}>
          <Text style={{ color: C.amber, fontWeight: '800', fontSize: 14, textAlign: 'center' }}>Free to use</Text>
          <Text style={{ color: C.text3, fontSize: 10, textAlign: 'center', marginTop: 3 }}>Pro account protection — $10 one time</Text>
        </View>
        <Btn onPress={onDone} style={{ paddingHorizontal: 32, borderRadius: 50 }}>Enter DropPilot →</Btn>
      </View>
    ),
  };

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: C.bg, zIndex: 999 }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, height: 3, width: progressWidth, backgroundColor: C.amber, zIndex: 10 }} />
      <TouchableOpacity onPress={onDone} style={{ position: 'absolute', top: 50, right: 16, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 }}>
        <Text style={{ color: C.text3, fontSize: 12, fontWeight: '700' }}>Skip</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 28 }}>
        {scenes[scene] || scenes[0]}
      </ScrollView>
    </View>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('home');
  const [shifts, setS_] = useState([]);
  const [cfg, setCfg_] = useState({ goal: 0, name: '', gasPrice: 3.50, mpg: 28, minRate: 15, stripeLink: '', unlockCode: '' });
  const [pro, setPro] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const [showPay, setShowPay] = useState(false);
  const [payStep, setPayStep] = useState('offer');
  const [codeIn, setCodeIn] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [showCfg, setShowCfg] = useState(false);
  const [tipOpen, setTipOpen] = useState(null);
  const [msgOpen, setMsgOpen] = useState(null);
  const [subOpen, setSubOpen] = useState(null);
  const [defSection, setDefSection] = useState('habits');
  const [defPlatform, setDefPlatform] = useState(null);
  const [appealOpen, setAppealOpen] = useState(null);
  const [appealSub, setAppealSub] = useState(null);
  const [checks, setChecks] = useState([]);
  const [copied, setCopied] = useState(null);
  const [calcCents, setCalcCents] = useState(0);
  const [calcMi, setCalcMi] = useState('');
  const [showCalcCfg, setShowCalcCfg] = useState(false);

  const blank = { date: tod(), platform: 'DoorDash', earnings: '', tips: '', hours: '', orders: '', notes: '' };
  const [sf, setSf] = useState(blank);
  const [shiftMsg, setShiftMsg] = useState('');

  useEffect(() => {
    Promise.all([
      load('dp3-shifts', []),
      load('dp3-cfg', { goal: 0, name: '', gasPrice: 3.50, mpg: 28, minRate: 15, stripeLink: '', unlockCode: '' }),
      load('dp3-pro', false),
      load('dp3-intro-seen', false),
    ]).then(([s, c, p, seen]) => {
      setS_(s); setCfg_(c); setPro(!!p); setLoaded(true);
      if (!seen) setShowIntro(true);
    });
  }, []);

  const setShifts = useCallback(d => { setS_(d); save('dp3-shifts', d); }, []);
  const setCfg = useCallback(d => { setCfg_(d); save('dp3-cfg', d); }, []);

  const mShifts = thisMonth(shifts);
  const tShifts = todayArr(shifts);
  const mEarn = sumf(mShifts, s => parseFloat(s.earnings || 0) + parseFloat(s.tips || 0));
  const mHours = sumf(mShifts, s => s.hours);
  const tEarn = sumf(tShifts, s => parseFloat(s.earnings || 0) + parseFloat(s.tips || 0));
  const allEarn = sumf(shifts, s => parseFloat(s.earnings || 0) + parseFloat(s.tips || 0));
  const perHr = mHours > 0 ? mEarn / mHours : 0;
  const goalPct = cfg.goal > 0 ? Math.min(mEarn / cfg.goal, 1) : 0;

  const gasPrice = parseFloat(cfg.gasPrice || 3.50);
  const mpg = parseFloat(cfg.mpg || 28);
  const minRate = parseFloat(cfg.minRate || 15);
  const costPerMi = gasPrice / mpg;
  const pay = calcCents / 100;
  const miles = parseFloat(calcMi) || 0;
  const fuelCost = miles * costPerMi;
  const netPay = pay - fuelCost;
  const estMins = miles > 0 ? Math.round(miles * 3 + 8) : 20;
  const estHrs = estMins / 60;
  const estHrRate = estHrs > 0 ? netPay / estHrs : 0;
  const hasCalc = calcCents > 0;
  const verdict = estHrRate >= minRate ? 'accept' : estHrRate >= minRate * 0.75 ? 'maybe' : 'decline';

  function addShift() {
    if (!sf.earnings && !sf.tips) { setShiftMsg('Please enter at least base pay or tips.'); return; }
    setShifts([{ ...sf, id: Date.now() }, ...shifts]);
    setSf(blank);
    setShiftMsg('Shift saved!');
    setTimeout(() => setShiftMsg(''), 3000);
  }

  function tryCode() {
    if (!codeIn.trim()) { setCodeErr('Please enter your unlock code.'); return; }
    if (cfg.unlockCode && codeIn.trim().toUpperCase() === cfg.unlockCode.trim().toUpperCase()) {
      setPro(true); save('dp3-pro', true); setPayStep('done');
    } else { setCodeErr('That code is not correct. Check the email from Stripe.'); }
  }

  function copyMsg(text, key) {
    Clipboard.setString(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function toggleCheck(i) {
    setChecks(checks.map((c, idx) => idx === i ? { ...c, done: !c.done } : c));
  }

  if (!loaded) return (
    <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <Text style={{ fontSize: 52, marginBottom: 16 }}>🚗</Text>
      <Text style={{ color: C.amber, fontSize: 17, fontWeight: '800' }}>Loading DropPilot...</Text>
    </View>
  );

  if (showIntro) return <IntroAnimation onDone={() => { setShowIntro(false); save('dp3-intro-seen', true); }} />;

  const isNew = shifts.length === 0;

  // ── Screens ────────────────────────────────────────────────────────────────
  const renderHome = () => (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      {isNew ? (
        <View style={[s.heroCard, { backgroundColor: '#0e1a0d' }]}>
          <Text style={{ fontSize: 64, textAlign: 'center', marginBottom: 18 }}>🚗</Text>
          <Text style={[s.heroTitle, { color: C.green }]}>Welcome to DropPilot</Text>
          <Text style={[s.bodySm, { textAlign: 'center', marginBottom: 20 }]}>Your delivery command center. Check orders, protect your account, and earn more.</Text>
          {[['⚡', 'Check an order in seconds'], ['🛡️', 'Platform-specific account protection'], ['⭐', 'Customer service tips that earn more'], ['🏠', 'Track your real hourly rate']].map(([em, tx], i) => (
            <View key={i} style={[s.featureRow, { marginBottom: 10 }]}>
              <Text style={{ fontSize: 20 }}>{em}</Text>
              <Text style={[s.bodySm, { flex: 1 }]}>{tx}</Text>
            </View>
          ))}
          <Btn onPress={() => setTab('log')} style={{ marginTop: 8 }} color={C.green}>
            <Text style={{ color: '#000', fontWeight: '900', fontSize: 15 }}>Log My First Shift</Text>
          </Btn>
        </View>
      ) : (
        <>
          <View style={[s.heroCard, { backgroundColor: '#1a1200' }]}>
            <Text style={s.label}>EARNED THIS MONTH</Text>
            <Text style={[s.heroMoney]}>{fmtK(mEarn)}</Text>
            <Text style={[s.bodySm, { marginBottom: cfg.goal > 0 ? 16 : 0 }]}>
              {mShifts.length} shift{mShifts.length !== 1 ? 's' : ''} · {fmtH(mHours)}{perHr > 0 ? ` · ${fmt$(perHr)}/hr` : ''}
            </Text>
            {cfg.goal > 0 && (
              <>
                <View style={s.goalRow}>
                  <Text style={s.label}>Monthly Goal</Text>
                  <Text style={[s.label, { color: C.amber }]}>{Math.round(goalPct * 100)}% of {fmtK(cfg.goal)}</Text>
                </View>
                <View style={s.progressBg}>
                  <View style={[s.progressFill, { width: `${goalPct * 100}%` }]} />
                </View>
                <Text style={[s.label, { marginTop: 6 }]}>
                  {goalPct >= 1 ? '🎉 Goal reached!' : `${fmt$(cfg.goal - mEarn)} left to goal`}
                </Text>
              </>
            )}
          </View>
          <View style={[s.row, { gap: 10, marginBottom: 14 }]}>
            {[{ l: 'Today', v: fmtK(tEarn), c: C.teal, ic: '☀️' }, { l: 'Per Hour', v: perHr > 0 ? fmt$(perHr) : '—', c: C.blue, ic: '⚡' }, { l: 'All Time', v: fmtK(allEarn), c: C.green, ic: '🏆' }].map(m => (
              <View key={m.l} style={[s.kpiCard, { flex: 1 }]}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>{m.ic}</Text>
                <Text style={[s.kpiVal, { color: m.c }]}>{m.v}</Text>
                <Text style={s.kpiLabel}>{m.l}</Text>
              </View>
            ))}
          </View>
          {shifts.length > 0 && (
            <Card style={{ marginBottom: 14 }}>
              <View style={s.cardHeader}>
                <Text style={s.cardTitle}>Recent Shifts</Text>
                <View style={s.badge}><Text style={s.badgeText}>{shifts.length} total</Text></View>
              </View>
              {shifts.slice(0, 6).map(sh => {
                const tot = parseFloat(sh.earnings || 0) + parseFloat(sh.tips || 0);
                const pc = PLT[sh.platform] || C.text3;
                return (
                  <View key={sh.id} style={s.shiftRow}>
                    <View style={[s.platformBadge, { backgroundColor: pc + '1A', borderColor: pc + '40' }]}>
                      <Text style={[s.platformBadgeText, { color: pc }]}>{sh.platform.slice(0, 2)}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.shiftPlatform}>{sh.platform}</Text>
                      <Text style={s.shiftMeta}>{sh.date}{sh.hours ? ` · ${fmtH(sh.hours)}` : ''}</Text>
                    </View>
                    <Text style={s.shiftAmt}>{fmt$(tot)}</Text>
                    <TouchableOpacity onPress={() => Alert.alert('Delete', 'Delete this shift?', [{ text: 'Cancel' }, { text: 'Delete', style: 'destructive', onPress: () => setShifts(shifts.filter(x => x.id !== sh.id)) }])}>
                      <Text style={{ color: C.red, fontSize: 13, fontWeight: '700', paddingHorizontal: 8 }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </Card>
          )}
          <View style={[s.row, { gap: 10 }]}>
            <TouchableOpacity onPress={() => setTab('calc')} style={[s.quickBtn, { borderColor: C.amber + '50', backgroundColor: C.amber + '10' }]}>
              <Text style={{ fontSize: 28 }}>⚡</Text>
              <Text style={[s.quickBtnTitle, { color: C.amber }]}>Check Order</Text>
              <Text style={s.quickBtnSub}>Accept or decline fast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab('log')} style={[s.quickBtn, { borderColor: C.green + '50', backgroundColor: C.green + '10' }]}>
              <Text style={{ fontSize: 28 }}>➕</Text>
              <Text style={[s.quickBtnTitle, { color: C.green }]}>Log a Shift</Text>
              <Text style={s.quickBtnSub}>Record what you earned</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );

  const renderCalc = () => (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginBottom: 14 }}>
          <View style={{ padding: 18 }}>
            <View style={[s.row, { justifyContent: 'space-between', marginBottom: 18 }]}>
              <View>
                <Text style={s.cardTitle}>⚡ Order Check</Text>
                <Text style={[s.bodySm, { marginTop: 2 }]}>Type payout — instant answer</Text>
              </View>
              <TouchableOpacity onPress={() => setShowCalcCfg(v => !v)} style={s.iconBtn}>
                <Text style={{ fontSize: 18 }}>⚙️</Text>
              </TouchableOpacity>
            </View>
            {showCalcCfg && (
              <View style={[s.infoBox, { marginBottom: 16 }]}>
                <Text style={[s.label, { marginBottom: 10 }]}>VEHICLE SETTINGS</Text>
                <View style={[s.row, { gap: 8 }]}>
                  {[{ l: 'Gas $/gal', k: 'gasPrice' }, { l: 'Car MPG', k: 'mpg' }, { l: 'Min $/hr', k: 'minRate' }].map(f => (
                    <View key={f.k} style={{ flex: 1 }}>
                      <Text style={[s.label, { marginBottom: 4 }]}>{f.l}</Text>
                      <TextInput
                        value={String(cfg[f.k] || '')}
                        onChangeText={v => setCfg({ ...cfg, [f.k]: v })}
                        keyboardType="decimal-pad"
                        style={s.input}
                        placeholderTextColor={C.text3}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
            <Text style={[s.label, { marginBottom: 8 }]}>ORDER PAYOUT</Text>
            <View style={s.payInputWrap}>
              <Text style={s.payDollar}>$</Text>
              <TextInput
                value={calcCents === 0 ? '' : (calcCents / 100).toFixed(2)}
                onChangeText={v => { const d = v.replace(/[^0-9]/g, ''); setCalcCents(d === '' ? 0 : parseInt(d, 10)); }}
                keyboardType="number-pad"
                placeholder="0.00"
                placeholderTextColor={C.text3}
                style={s.payInput}
                autoFocus
              />
            </View>
            <Text style={[s.label, { marginBottom: 8, marginTop: 14 }]}>MILES <Text style={{ fontWeight: '400', textTransform: 'none' }}>(optional)</Text></Text>
            <TextInput
              value={calcMi}
              onChangeText={setCalcMi}
              keyboardType="decimal-pad"
              placeholder="e.g. 4.2"
              placeholderTextColor={C.text3}
              style={[s.input, { fontSize: 20, fontWeight: '700' }]}
            />
            {hasCalc && (
              <View style={{ marginTop: 18 }}>
                <View style={[s.verdictCard, {
                  backgroundColor: verdict === 'accept' ? C.green + '18' : verdict === 'maybe' ? C.amber + '18' : C.red + '18',
                  borderColor: verdict === 'accept' ? C.green + '80' : verdict === 'maybe' ? C.amber + '80' : C.red + '80',
                }]}>
                  <Text style={{ fontSize: 36 }}>{verdict === 'accept' ? '✅' : verdict === 'maybe' ? '🤔' : '❌'}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.verdictTitle, { color: verdict === 'accept' ? C.green : verdict === 'maybe' ? C.amber : C.red }]}>
                      {verdict === 'accept' ? 'Take It' : verdict === 'maybe' ? 'Maybe' : 'Pass On It'}
                    </Text>
                    <Text style={s.bodySm}>
                      {verdict === 'accept' ? `Good order — ~${fmt$(estHrRate)}/hr` : verdict === 'maybe' ? `Borderline — ~${fmt$(estHrRate)}/hr` : `Below your ${fmt$(minRate)}/hr minimum`}
                    </Text>
                  </View>
                </View>
                <View style={[s.row, { flexWrap: 'wrap', gap: 8, marginTop: 12 }]}>
                  {[
                    { l: 'Est. $/hr', v: fmt$(estHrRate), c: verdict === 'accept' ? C.green : verdict === 'maybe' ? C.amber : C.red },
                    { l: 'Take-Home', v: fmt$(netPay), c: C.text },
                    { l: 'Fuel Cost', v: miles > 0 ? `-${fmt$(fuelCost)}` : 'Enter miles', c: C.red },
                    { l: 'Est. Time', v: `~${estMins} min`, c: C.text2 },
                  ].map(st => (
                    <View key={st.l} style={[s.statCard, { width: '47%' }]}>
                      <Text style={[s.statVal, { color: st.c }]}>{st.v}</Text>
                      <Text style={s.statLabel}>{st.l}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={() => { setCalcCents(0); setCalcMi(''); }} style={[s.clearBtn, { marginTop: 12 }]}>
                  <Text style={{ color: C.text3, fontWeight: '700', fontSize: 13 }}>Clear — Check Next Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        <View style={[s.infoBox, { marginBottom: 14 }]}>
          <Text style={{ fontSize: 13, color: C.text2, lineHeight: 20 }}>
            <Text style={{ color: C.blue, fontWeight: '800' }}>Tip: </Text>
            Most experienced drivers set their minimum at $15-18/hr. Set yours in ⚙️ above.
          </Text>
        </View>
        <Card>
          <View style={{ padding: 16 }}>
            <Text style={[s.cardTitle, { marginBottom: 12 }]}>Log This Shift</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {PLATFORMS.map(p => (
                <TouchableOpacity key={p} onPress={() => setSf({ ...sf, platform: p })} style={[s.platformChip, { backgroundColor: sf.platform === p ? PLT[p] + '22' : 'transparent', borderColor: sf.platform === p ? PLT[p] : C.border }]}>
                  <View style={[s.platformDot, { backgroundColor: PLT[p] }]} />
                  <Text style={[s.platformChipText, { color: sf.platform === p ? PLT[p] : C.text3 }]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={[s.row, { flexWrap: 'wrap', gap: 8 }]}>
              {[{ l: 'Base Pay', k: 'earnings', p: '0.00' }, { l: 'Tips', k: 'tips', p: '0.00' }, { l: 'Hours', k: 'hours', p: '4.5' }, { l: 'Orders', k: 'orders', p: '0' }].map(f => (
                <View key={f.k} style={{ width: '47%' }}>
                  <Text style={[s.label, { marginBottom: 4 }]}>{f.l}</Text>
                  <TextInput value={sf[f.k] || ''} onChangeText={v => setSf({ ...sf, [f.k]: v })} keyboardType="decimal-pad" placeholder={f.p} placeholderTextColor={C.text3} style={s.input} />
                </View>
              ))}
            </View>
            {shiftMsg ? <Text style={[s.successMsg, { marginTop: 10 }]}>{shiftMsg}</Text> : null}
            <Btn onPress={addShift} style={{ marginTop: 12 }}>Save Shift</Btn>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderLog = () => (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginBottom: 14 }}>
          <View style={{ padding: 18 }}>
            <Text style={s.cardTitle}>Record a Shift</Text>
            <Text style={[s.bodySm, { marginBottom: 16, marginTop: 4 }]}>Fill in what you earned. Just base pay is enough to start.</Text>
            <Text style={[s.label, { marginBottom: 8 }]}>WHICH APP?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {PLATFORMS.map(p => (
                <TouchableOpacity key={p} onPress={() => setSf({ ...sf, platform: p })} style={[s.platformChip, { backgroundColor: sf.platform === p ? PLT[p] + '22' : 'transparent', borderColor: sf.platform === p ? PLT[p] : C.border }]}>
                  <View style={[s.platformDot, { backgroundColor: PLT[p] }]} />
                  <Text style={[s.platformChipText, { color: sf.platform === p ? PLT[p] : C.text3 }]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={[s.row, { flexWrap: 'wrap', gap: 10 }]}>
              {[{ l: 'Date', k: 'date', t: 'default' }, { l: 'Base Pay $', k: 'earnings', t: 'decimal-pad' }, { l: 'Tips $', k: 'tips', t: 'decimal-pad' }, { l: 'Hours', k: 'hours', t: 'decimal-pad' }, { l: 'Orders', k: 'orders', t: 'number-pad' }, { l: 'Notes', k: 'notes', t: 'default' }].map(f => (
                <View key={f.k} style={f.k === 'notes' ? { width: '100%' } : { width: '47%' }}>
                  <Text style={[s.label, { marginBottom: 5 }]}>{f.l}</Text>
                  <TextInput value={sf[f.k] || ''} onChangeText={v => setSf({ ...sf, [f.k]: v })} keyboardType={f.t} placeholderTextColor={C.text3} style={s.input} />
                </View>
              ))}
            </View>
            {(sf.earnings || sf.tips) && sf.hours ? (
              <View style={[s.infoBox, { marginTop: 14, borderColor: C.green + '40' }]}>
                <Text style={[s.label, { color: C.green, marginBottom: 10 }]}>LIVE PREVIEW</Text>
                <View style={[s.row, { gap: 16 }]}>
                  {[{ l: 'Total', v: fmt$(parseFloat(sf.earnings || 0) + parseFloat(sf.tips || 0)) }, { l: 'Per Hour', v: fmt$((parseFloat(sf.earnings || 0) + parseFloat(sf.tips || 0)) / parseFloat(sf.hours)) }].map(p => (
                    <View key={p.l}>
                      <Text style={[s.statVal, { color: C.green, fontSize: 22 }]}>{p.v}</Text>
                      <Text style={s.statLabel}>{p.l}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        </Card>
        {shiftMsg ? <Text style={[s.successMsg, { marginBottom: 10 }]}>{shiftMsg}</Text> : null}
        <Btn onPress={addShift} style={{ marginBottom: 14 }}>Save This Shift</Btn>
        {tShifts.length > 0 && (
          <Card>
            <View style={s.cardHeader}><Text style={s.cardTitle}>Today's Shifts</Text></View>
            {tShifts.map(sh => {
              const tot = parseFloat(sh.earnings || 0) + parseFloat(sh.tips || 0);
              return (
                <View key={sh.id} style={s.shiftRow}>
                  <View style={[s.platformDot, { backgroundColor: PLT[sh.platform] || C.text3 }]} />
                  <Text style={[s.bodySm, { flex: 1 }]}>{sh.platform}{sh.hours ? ` · ${fmtH(sh.hours)}` : ''}</Text>
                  <Text style={s.shiftAmt}>{fmt$(tot)}</Text>
                  <TouchableOpacity onPress={() => setShifts(shifts.filter(x => x.id !== sh.id))}>
                    <Text style={{ color: C.text3, paddingHorizontal: 8, fontWeight: '700' }}>✕</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={[s.shiftRow, { backgroundColor: C.s1 }]}>
              <Text style={[s.bodySm, { flex: 1 }]}>Today total</Text>
              <Text style={s.shiftAmt}>{fmt$(tEarn)}</Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderTips = () => (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <View style={[s.heroCard, { backgroundColor: '#1a1000', marginBottom: 14 }]}>
        <Text style={{ fontSize: 36, marginBottom: 10, textAlign: 'center' }}>⭐</Text>
        <Text style={[s.heroTitle, { marginBottom: 8 }]}>Customer Service Tips</Text>
        <Text style={[s.bodySm, { textAlign: 'center' }]}>Higher ratings mean more orders, better zones, and more money.</Text>
      </View>
      <Text style={[s.label, { marginBottom: 10 }]}>FREE — START HERE</Text>
      {FREE_TIPS.map((tip, i) => (
        <TouchableOpacity key={i} onPress={() => setTipOpen(tipOpen === i ? null : i)} style={[s.tipCard, { borderColor: tipOpen === i ? C.amber + '80' : C.border, marginBottom: 10 }]} activeOpacity={0.85}>
          <View style={[s.row, { padding: 16 }]}>
            <Text style={{ fontSize: 26 }}>{tip.e}</Text>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={s.tipTitle}>{tip.t}</Text>
              <Text style={s.tipSub}>{tip.s}</Text>
            </View>
            <Text style={{ color: C.text3, fontSize: 14 }}>{tipOpen === i ? '▲' : '▼'}</Text>
          </View>
          {tipOpen === i && (
            <View style={{ paddingHorizontal: 16, paddingBottom: 16, borderTopWidth: 1, borderTopColor: C.border }}>
              <Text style={[s.bodySm, { marginTop: 12 }]}>{tip.d}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={{ borderTopWidth: 1, borderTopColor: C.border, paddingTop: 18, marginTop: 4 }}>
        <View style={[s.row, { marginBottom: 14, alignItems: 'center' }]}>
          <Text style={[s.cardTitle, { flex: 1 }]}>Pro Messaging Guide</Text>
          <Tag color={pro ? C.green : C.amber}>{pro ? 'UNLOCKED' : '$10 ONE-TIME'}</Tag>
        </View>
        {pro ? (
          MSG_CATS.map((cat, ci) => (
            <View key={ci} style={[s.tipCard, { borderColor: msgOpen === ci ? C.amber + '70' : C.border, marginBottom: 10 }]}>
              <TouchableOpacity onPress={() => setMsgOpen(msgOpen === ci ? null : ci)} style={[s.row, { padding: 16 }]} activeOpacity={0.85}>
                <View style={[s.catIcon, { backgroundColor: C.amber + '15', borderColor: C.amber + '30' }]}>
                  <Text style={{ fontSize: 22 }}>{cat.e}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={s.tipTitle}>{cat.t}</Text>
                  <Text style={s.tipSub}>{cat.sub}</Text>
                </View>
                <Text style={{ color: C.text3, fontSize: 14 }}>{msgOpen === ci ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {msgOpen === ci && cat.secs.map((sec, si) => {
                const key = `${ci}-${si}`;
                const open = subOpen === key;
                return (
                  <View key={si} style={{ borderTopWidth: 1, borderTopColor: C.border }}>
                    <TouchableOpacity onPress={() => setSubOpen(open ? null : key)} style={[s.row, { padding: 14, justifyContent: 'space-between' }]} activeOpacity={0.85}>
                      <Text style={[s.tipTitle, { flex: 1, fontSize: 13, color: sec.caution ? C.red : C.text }]}>
                        {sec.caution ? '⚠️ ' : ''}{sec.h}
                      </Text>
                      <Text style={{ color: C.text3 }}>{open ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {open && (
                      <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                        <View style={[s.msgBox, { borderColor: sec.caution ? C.red + '40' : 'rgba(255,255,255,0.1)', backgroundColor: sec.caution ? C.red + '0A' : 'rgba(0,0,0,0.3)' }]}>
                          <View style={[s.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
                            <Text style={[s.label, { color: sec.caution ? C.red : C.amber }]}>{sec.caution ? 'NEVER SAY THIS' : 'COPY AND SEND'}</Text>
                            {!sec.caution && (
                              <TouchableOpacity onPress={() => copyMsg(sec.msg, key)} style={[s.copyBtn, { backgroundColor: copied === key ? C.green + '25' : 'rgba(255,255,255,0.08)' }]}>
                                <Text style={[s.copyBtnText, { color: copied === key ? C.green : C.text3 }]}>{copied === key ? 'Copied!' : 'Copy'}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                          <Text style={[s.msgText, { color: sec.caution ? C.red : C.text }]}>"{sec.msg}"</Text>
                        </View>
                        <View style={[s.whyBox]}>
                          <Text style={{ fontSize: 14, marginRight: 8 }}>💡</Text>
                          <Text style={[s.bodySm, { flex: 1 }]}><Text style={{ color: C.blue, fontWeight: '800' }}>Why it works: </Text>{sec.w}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))
        ) : (
          <>
            <Text style={[s.bodySm, { marginBottom: 12 }]}>Unlock 7 more essential tips and 30 ready-to-send message templates for every situation.</Text>
            {LOCKED_TIPS.map((tip, i) => (
              <View key={i} style={[s.tipCard, { marginBottom: 8, opacity: 0.5 }]}>
                <View style={[s.row, { padding: 14 }]}>
                  <Text style={{ fontSize: 20 }}>{tip.e}</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={s.tipTitle}>{tip.t}</Text>
                    <Text style={s.tipSub}>{tip.s}</Text>
                  </View>
                  <Text style={{ fontSize: 16 }}>🔒</Text>
                </View>
              </View>
            ))}
            <View style={[s.heroCard, { marginTop: 14, backgroundColor: '#1a0f00', borderColor: C.amber + '60', borderWidth: 2 }]}>
              <Text style={{ fontSize: 44, textAlign: 'center', marginBottom: 10 }}>🔓</Text>
              <Text style={[s.heroTitle, { marginBottom: 8 }]}>Unlock Everything for $10</Text>
              <Text style={[s.bodySm, { textAlign: 'center', marginBottom: 16 }]}>One payment. Yours forever. No subscription, ever.</Text>
              {['7 more essential driver tips', '30 copy-paste message templates', 'Arrivals, delays, tricky situations', 'Full account protection scripts', 'Fight false complaints and deactivations'].map((f, i) => (
                <View key={i} style={[s.featureRow, { marginBottom: 8 }]}>
                  <Text style={{ color: C.amber, fontWeight: '900' }}>✓</Text>
                  <Text style={[s.bodySm, { flex: 1 }]}>{f}</Text>
                </View>
              ))}
              <Btn onPress={() => { setShowPay(true); setPayStep('offer'); }} style={{ marginTop: 8 }}>Unlock for $10 — One Time</Btn>
              <Text style={[s.label, { textAlign: 'center', marginTop: 8 }]}>One-time only · Yours forever · No subscription</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );

  const renderDefend = () => (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <View style={[s.heroCard, { backgroundColor: '#0a0a1a', borderColor: C.purple + '40', marginBottom: 14 }]}>
        <Text style={{ fontSize: 36, textAlign: 'center', marginBottom: 10 }}>🛡️</Text>
        <Text style={[s.heroTitle, { color: C.purple, marginBottom: 8 }]}>Account Defense</Text>
        <Text style={[s.bodySm, { textAlign: 'center' }]}>Platform-specific scripts and habits. Select your platform to get tools written for how their support actually works.</Text>
      </View>
      {!defPlatform ? (
        <>
          <Text style={[s.label, { marginBottom: 10 }]}>SELECT YOUR PLATFORM</Text>
          {PLATFORMS_DEFEND.map(p => (
            <TouchableOpacity key={p.id} onPress={() => { setDefPlatform(p.id); setChecks((PLATFORM_CHECKLISTS[p.id] || []).map(c => ({ ...c, done: false }))); }} style={[s.platformPickCard, { borderColor: p.color + '40', backgroundColor: p.color + '0D', marginBottom: 10 }]} activeOpacity={0.85}>
              <View style={[s.platformPickIcon, { backgroundColor: p.color + '20', borderColor: p.color + '40' }]}>
                <Text style={{ fontSize: 22 }}>{p.e}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.tipTitle, { color: p.color }]}>{p.label}</Text>
                <Text style={s.tipSub}>Habits, appeal scripts, and checklist</Text>
              </View>
              <Text style={{ color: p.color, fontSize: 18, opacity: 0.7 }}>›</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (() => {
        const plt = PLATFORMS_DEFEND.find(p => p.id === defPlatform);
        return (
          <>
            <View style={[s.row, { backgroundColor: plt.color + '12', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: plt.color + '35', justifyContent: 'space-between', alignItems: 'center' }]}>
              <View style={[s.row, { alignItems: 'center', gap: 10 }]}>
                <Text style={{ fontSize: 22 }}>{plt.e}</Text>
                <Text style={[s.tipTitle, { color: plt.color }]}>{plt.label}</Text>
              </View>
              <TouchableOpacity onPress={() => { setDefPlatform(null); setDefSection('habits'); }} style={[s.iconBtn]}>
                <Text style={s.bodySm}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={[s.row, { backgroundColor: C.s2, borderRadius: 14, padding: 4, marginBottom: 14, gap: 4 }]}>
              {[{ id: 'habits', l: 'Habits', e: '🛡️' }, { id: 'appeals', l: 'Scripts', e: '📋' }, { id: 'checklist', l: 'Checklist', e: '✅' }].map(sec => (
                <TouchableOpacity key={sec.id} onPress={() => setDefSection(sec.id)} style={[s.segBtn, { backgroundColor: defSection === sec.id ? C.purple : 'transparent', flex: 1 }]} activeOpacity={0.85}>
                  <Text style={{ fontSize: 14 }}>{sec.e}</Text>
                  <Text style={[s.segBtnText, { color: defSection === sec.id ? '#fff' : C.text3 }]}>{sec.l}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {defSection === 'habits' && (
              pro ? (
                <>
                  <View style={[s.alertBox, { marginBottom: 12 }]}>
                    <Text style={{ fontSize: 16 }}>⚠️</Text>
                    <Text style={[s.bodySm, { flex: 1, fontWeight: '700', color: C.text }]}>These 6 habits build a paper trail that wins disputes before they start.</Text>
                  </View>
                  {(PLATFORM_HABITS[defPlatform] || []).map((h, i) => (
                    <View key={i} style={[s.habitCard, { borderColor: h.urgent ? C.red + '40' : C.border, marginBottom: 10 }]}>
                      {h.urgent && <Tag color={C.red}>CRITICAL</Tag>}
                      <View style={[s.row, { marginBottom: 8, marginTop: h.urgent ? 8 : 0 }]}>
                        <Text style={{ fontSize: 24 }}>{h.e}</Text>
                        <Text style={[s.tipTitle, { flex: 1, marginLeft: 12 }]}>{h.t}</Text>
                      </View>
                      <Text style={s.bodySm}>{h.why}</Text>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  {(PLATFORM_HABITS[defPlatform] || []).map((h, i) => (
                    <View key={i} style={[s.habitCard, { opacity: 0.4, marginBottom: 10 }]}>
                      <View style={[s.row, { marginBottom: 6 }]}>
                        <Text style={{ fontSize: 22 }}>{h.e}</Text>
                        <Text style={[s.tipTitle, { flex: 1, marginLeft: 12 }]}>{h.t}</Text>
                        <Text style={{ fontSize: 16 }}>🔒</Text>
                      </View>
                    </View>
                  ))}
                  <Btn onPress={() => { setShowPay(true); setPayStep('offer'); }} color={C.purple} style={{ marginTop: 8 }}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Unlock Account Protection — $10</Text>
                  </Btn>
                </>
              )
            )}
            {defSection === 'appeals' && (
              pro ? (
                <>
                  <View style={[s.infoBox, { marginBottom: 12, borderColor: C.purple + '40' }]}>
                    <Text style={{ fontSize: 16 }}>💡</Text>
                    <Text style={[s.bodySm, { flex: 1 }]}>Written for how {plt.label} support agents actually process requests. Generic messages get generic denials.</Text>
                  </View>
                  {(PLATFORM_APPEALS[defPlatform] || []).map((cat, ci) => (
                    <View key={ci} style={[s.tipCard, { borderColor: appealOpen === ci ? cat.color + '80' : C.border, marginBottom: 10 }]}>
                      <TouchableOpacity onPress={() => setAppealOpen(appealOpen === ci ? null : ci)} style={[s.row, { padding: 16 }]} activeOpacity={0.85}>
                        <View style={[s.catIcon, { backgroundColor: cat.color + '15', borderColor: cat.color + '35' }]}>
                          <Text style={{ fontSize: 22 }}>{cat.e}</Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: 14 }}>
                          <Text style={[s.tipTitle, { color: cat.color }]}>{cat.t}</Text>
                          <Text style={s.tipSub}>{cat.urgency}</Text>
                        </View>
                        <Text style={{ color: C.text3 }}>{appealOpen === ci ? '▲' : '▼'}</Text>
                      </TouchableOpacity>
                      {appealOpen === ci && cat.secs.map((sec, si) => {
                        const key = `appeal-${ci}-${si}`;
                        const open = appealSub === key;
                        return (
                          <View key={si} style={{ borderTopWidth: 1, borderTopColor: C.border }}>
                            <TouchableOpacity onPress={() => setAppealSub(open ? null : key)} style={[s.row, { padding: 14, justifyContent: 'space-between' }]} activeOpacity={0.85}>
                              <Text style={[s.tipTitle, { flex: 1, fontSize: 13 }]}>{sec.h}</Text>
                              <Text style={{ color: C.text3 }}>{open ? '▲' : '▼'}</Text>
                            </TouchableOpacity>
                            {open && (
                              <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                                <View style={s.msgBox}>
                                  <View style={[s.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
                                    <Text style={[s.label, { color: C.purple }]}>COPY THIS MESSAGE</Text>
                                    <TouchableOpacity onPress={() => copyMsg(sec.msg, key)} style={[s.copyBtn, { backgroundColor: copied === key ? C.green + '25' : 'rgba(255,255,255,0.08)' }]}>
                                      <Text style={[s.copyBtnText, { color: copied === key ? C.green : C.text3 }]}>{copied === key ? 'Copied!' : 'Copy'}</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <Text style={s.msgText}>{sec.msg}</Text>
                                </View>
                                <View style={s.whyBox}>
                                  <Text style={{ fontSize: 14, marginRight: 8 }}>💡</Text>
                                  <Text style={[s.bodySm, { flex: 1 }]}><Text style={{ color: C.purple, fontWeight: '800' }}>Why this works: </Text>{sec.w}</Text>
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </>
              ) : (
                <>
                  {(PLATFORM_APPEALS[defPlatform] || []).map((cat, i) => (
                    <View key={i} style={[s.tipCard, { opacity: 0.4, marginBottom: 8 }]}>
                      <View style={[s.row, { padding: 14 }]}>
                        <View style={[s.catIcon, { backgroundColor: cat.color + '15', borderColor: cat.color + '35' }]}>
                          <Text style={{ fontSize: 18 }}>{cat.e}</Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Text style={[s.tipTitle, { color: cat.color }]}>{cat.t}</Text>
                          <Text style={s.tipSub}>{cat.urgency}</Text>
                        </View>
                        <Text style={{ fontSize: 16 }}>🔒</Text>
                      </View>
                    </View>
                  ))}
                  <Btn onPress={() => { setShowPay(true); setPayStep('offer'); }} color={C.purple} style={{ marginTop: 8 }}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Unlock Appeal Scripts — $10</Text>
                  </Btn>
                </>
              )
            )}
            {defSection === 'checklist' && (
              pro ? (
                <>
                  <View style={[s.infoBox, { marginBottom: 12, borderColor: C.green + '40' }]}>
                    <Text style={{ fontSize: 16 }}>✅</Text>
                    <Text style={[s.bodySm, { flex: 1 }]}>Run through this after every {plt.label} delivery. Tap each item to check it off.</Text>
                  </View>
                  <Card style={{ marginBottom: 14 }}>
                    {checks.map((c, i) => (
                      <TouchableOpacity key={i} onPress={() => toggleCheck(i)} style={[s.checkRow, { backgroundColor: c.done ? C.green + '0A' : 'transparent', borderBottomWidth: i < checks.length - 1 ? 1 : 0, borderBottomColor: C.border }]} activeOpacity={0.85}>
                        <View style={[s.checkbox, { borderColor: c.done ? C.green : 'rgba(255,255,255,0.2)', backgroundColor: c.done ? C.green : 'transparent' }]}>
                          {c.done && <Text style={{ fontSize: 14, color: '#000', fontWeight: '900' }}>✓</Text>}
                        </View>
                        <Text style={{ fontSize: 18 }}>{c.e}</Text>
                        <Text style={[s.tipTitle, { flex: 1, color: c.done ? C.green : C.text, textDecorationLine: c.done ? 'line-through' : 'none', marginLeft: 12 }]}>{c.t}</Text>
                      </TouchableOpacity>
                    ))}
                  </Card>
                  <View style={[s.row, { gap: 10, marginBottom: 14 }]}>
                    <View style={[s.statCard, { flex: 1, borderColor: C.green + '35' }]}>
                      <Text style={[s.statVal, { color: C.green }]}>{checks.filter(c => c.done).length}/{checks.length}</Text>
                      <Text style={s.statLabel}>Completed</Text>
                    </View>
                    <TouchableOpacity onPress={() => setChecks((PLATFORM_CHECKLISTS[defPlatform] || []).map(c => ({ ...c, done: false })))} style={[s.clearBtn, { flex: 1, justifyContent: 'center' }]}>
                      <Text style={{ color: C.text3, fontWeight: '700', fontSize: 12, textAlign: 'center' }}>Reset for Next Delivery</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[s.alertBox, { borderColor: C.red + '35' }]}>
                    <Text style={{ fontSize: 16 }}>⚠️</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[s.tipTitle, { color: C.red, marginBottom: 6 }]}>If a complaint is filed</Text>
                      <Text style={[s.bodySm, { marginBottom: 10 }]}>Go to Appeal Scripts immediately. File within 24 hours.</Text>
                      <TouchableOpacity onPress={() => setDefSection('appeals')} style={[s.clearBtn]}>
                        <Text style={{ color: C.red, fontWeight: '700', fontSize: 13 }}>Go to Appeal Scripts →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <View style={[s.heroCard, { backgroundColor: '#0a0815', borderColor: C.purple + '60', borderWidth: 2 }]}>
                  <Text style={{ fontSize: 36, textAlign: 'center', marginBottom: 10 }}>✅</Text>
                  <Text style={[s.heroTitle, { marginBottom: 8 }]}>{plt.label} Delivery Checklist</Text>
                  <Text style={[s.bodySm, { textAlign: 'center', marginBottom: 16 }]}>A tap-to-complete checklist tailored for {plt.label}. Each item is evidence that protects you if a complaint is filed.</Text>
                  <Btn onPress={() => { setShowPay(true); setPayStep('offer'); }} color={C.purple}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Unlock Checklist — $10</Text>
                  </Btn>
                </View>
              )
            )}
          </>
        );
      })()}
    </ScrollView>
  );

  // ── Settings Panel ─────────────────────────────────────────────────────────
  const renderSettings = () => (
    <Modal visible={showCfg} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowCfg(false)}>
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }]}>
              <Text style={{ fontSize: 19, fontWeight: '900', color: C.text }}>⚙️ Settings</Text>
              <TouchableOpacity onPress={() => setShowCfg(false)} style={s.iconBtn}>
                <Text style={s.bodySm}>Done</Text>
              </TouchableOpacity>
            </View>
            {[{ l: 'Your Name', k: 'name', t: 'default', p: 'e.g. James' }, { l: 'Monthly Goal $', k: 'goal', t: 'decimal-pad', p: 'e.g. 2000' }, { l: 'Gas Price $/gal', k: 'gasPrice', t: 'decimal-pad', p: '3.50' }, { l: 'Car MPG', k: 'mpg', t: 'decimal-pad', p: '28' }, { l: 'Min $/hr Target', k: 'minRate', t: 'decimal-pad', p: '15' }].map(f => (
              <View key={f.k} style={{ marginBottom: 14 }}>
                <Text style={[s.label, { marginBottom: 6 }]}>{f.l}</Text>
                <TextInput value={String(cfg[f.k] || '')} onChangeText={v => setCfg({ ...cfg, [f.k]: v })} keyboardType={f.t} placeholder={f.p} placeholderTextColor={C.text3} style={s.input} />
              </View>
            ))}
            <View style={{ borderTopWidth: 1, borderTopColor: C.border, paddingTop: 18, marginBottom: 14 }}>
              <Text style={[s.tipTitle, { color: C.amber, marginBottom: 14 }]}>💳 Payments (Stripe)</Text>
              <Text style={[s.bodySm, { marginBottom: 12 }]}>Create a $10 Payment Link at dashboard.stripe.com. After a customer pays, Stripe emails them an unlock code to enter in the app.</Text>
              {[{ l: 'Stripe Payment Link', k: 'stripeLink', p: 'https://buy.stripe.com/...' }, { l: 'Unlock Code', k: 'unlockCode', p: 'e.g. DROP2024' }].map(f => (
                <View key={f.k} style={{ marginBottom: 14 }}>
                  <Text style={[s.label, { marginBottom: 6 }]}>{f.l}</Text>
                  <TextInput value={cfg[f.k] || ''} onChangeText={v => setCfg({ ...cfg, [f.k]: v })} placeholder={f.p} placeholderTextColor={C.text3} style={s.input} autoCapitalize="none" autoCorrect={false} />
                </View>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );

  // ── Paywall Modal ──────────────────────────────────────────────────────────
  const renderPaywall = () => (
    <Modal visible={showPay} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => { setShowPay(false); setPayStep('offer'); }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: C.s1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ padding: 24 }}>
            <TouchableOpacity onPress={() => { setShowPay(false); setPayStep('offer'); setCodeIn(''); setCodeErr(''); }} style={{ alignSelf: 'flex-end', marginBottom: 8 }}>
              <Text style={[s.bodySm, { color: C.text3 }]}>✕ Close</Text>
            </TouchableOpacity>
            {payStep === 'offer' && (
              <>
                <Text style={{ fontSize: 44, textAlign: 'center', marginBottom: 10 }}>🔒</Text>
                <Text style={[s.heroTitle, { textAlign: 'center', marginBottom: 8 }]}>Protect Your Account</Text>
                <Text style={[s.bodySm, { textAlign: 'center', marginBottom: 20 }]}>Appeal scripts, pro tips, and message templates — everything you need to keep your account and earn more.</Text>
                <View style={[s.heroCard, { marginBottom: 20 }]}>
                  <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }]}>
                    <Text style={s.tipTitle}>DropPilot Pro</Text>
                    <Text style={[s.heroMoney, { fontSize: 28 }]}>$10</Text>
                  </View>
                  {['Full account protection appeal scripts', 'Fight false complaints and unfair deactivations', '30 customer message templates with Copy', '7 advanced customer service tips', 'One-time only — yours forever'].map((f, i) => (
                    <View key={i} style={[s.featureRow, { marginBottom: 8 }]}>
                      <Text style={{ color: C.green, fontWeight: '900', fontSize: 14 }}>✓</Text>
                      <Text style={[s.bodySm, { flex: 1 }]}>{f}</Text>
                    </View>
                  ))}
                </View>
                {cfg.stripeLink ? (
                  <>
                    <Btn onPress={() => { require('expo-linking').openURL(cfg.stripeLink); setPayStep('code'); }} style={{ marginBottom: 8 }}>
                      💳  Pay $10 with Stripe
                    </Btn>
                    <Text style={[s.label, { textAlign: 'center', marginBottom: 20 }]}>Your card info never touches this app</Text>
                    <View style={{ borderTopWidth: 1, borderTopColor: C.border, paddingTop: 16 }}>
                      <Text style={[s.bodySm, { marginBottom: 10 }]}>Already paid? Enter your unlock code:</Text>
                      <TextInput value={codeIn} onChangeText={v => { setCodeIn(v); setCodeErr(''); }} placeholder="Enter code from your receipt..." placeholderTextColor={C.text3} style={[s.input, { marginBottom: 8, borderColor: codeErr ? C.red + '80' : C.border }]} autoCapitalize="characters" autoCorrect={false} />
                      {codeErr ? <Text style={[s.bodySm, { color: C.red, marginBottom: 8 }]}>{codeErr}</Text> : null}
                      <Btn onPress={tryCode} color={C.green}>
                        <Text style={{ color: '#000', fontWeight: '900', fontSize: 15 }}>Unlock with Code</Text>
                      </Btn>
                    </View>
                  </>
                ) : (
                  <View style={[s.infoBox, { borderColor: C.amber + '40' }]}>
                    <Text style={[s.tipTitle, { color: C.amber, marginBottom: 6 }]}>Set up payments in Settings</Text>
                    <Text style={s.bodySm}>Add your Stripe Payment Link in Settings to start accepting payments.</Text>
                  </View>
                )}
              </>
            )}
            {payStep === 'code' && (
              <>
                <Text style={{ fontSize: 44, textAlign: 'center', marginBottom: 10 }}>💳</Text>
                <Text style={[s.heroTitle, { textAlign: 'center', marginBottom: 8 }]}>Finish Your Payment</Text>
                <Text style={[s.bodySm, { textAlign: 'center', marginBottom: 20 }]}>Stripe opened. After paying, Stripe emails you a receipt with your unlock code.</Text>
                <TextInput value={codeIn} onChangeText={v => { setCodeIn(v); setCodeErr(''); }} placeholder="Enter unlock code from receipt..." placeholderTextColor={C.text3} style={[s.input, { marginBottom: 8, borderColor: codeErr ? C.red + '80' : C.border }]} autoCapitalize="characters" autoCorrect={false} />
                {codeErr ? <Text style={[s.bodySm, { color: C.red, marginBottom: 8 }]}>{codeErr}</Text> : null}
                <Btn onPress={tryCode} color={C.green} style={{ marginBottom: 10 }}>
                  <Text style={{ color: '#000', fontWeight: '900', fontSize: 15 }}>Unlock My Account Protection</Text>
                </Btn>
                <TouchableOpacity onPress={() => setPayStep('offer')} style={{ alignItems: 'center', padding: 8 }}>
                  <Text style={s.bodySm}>Go back</Text>
                </TouchableOpacity>
              </>
            )}
            {payStep === 'done' && (
              <>
                <Text style={{ fontSize: 64, textAlign: 'center', marginBottom: 16 }}>🎉</Text>
                <Text style={[s.heroTitle, { textAlign: 'center', marginBottom: 8 }]}>You're protected!</Text>
                <Text style={[s.bodySm, { textAlign: 'center', marginBottom: 24 }]}>All appeal scripts and Pro features are now unlocked. You will never be charged again.</Text>
                <Btn onPress={() => { setShowPay(false); setPayStep('offer'); setTab('defend'); }} color={C.purple} style={{ marginBottom: 10 }}>
                  <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Go to Appeal Scripts</Text>
                </Btn>
                <Btn onPress={() => { setShowPay(false); setPayStep('offer'); setTab('tips'); }} color={C.s3}>
                  <Text style={{ color: C.text2, fontWeight: '900', fontSize: 15 }}>See Message Templates</Text>
                </Btn>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );

  const tabs = [
    { id: 'home', l: 'Home', e: '🏠' },
    { id: 'calc', l: 'Check', e: '⚡' },
    { id: 'tips', l: 'Tips', e: '⭐' },
    { id: 'defend', l: 'Defend', e: '🛡️' },
    { id: 'log', l: 'Log Pay', e: '➕' },
  ];

  const accentColor = tab === 'defend' ? C.purple : tab === 'calc' ? C.blue : C.amber;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={s.header}>
        <View style={[s.row, { alignItems: 'center', gap: 10 }]}>
          <View style={[s.appIcon, { backgroundColor: C.amber }]}>
            <Text style={{ fontSize: 20 }}>🚗</Text>
          </View>
          <View>
            <Text style={s.appName}>DropPilot</Text>
            <Text style={s.appSub}>DRIVER COMMAND CENTER</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowCfg(true)} style={s.iconBtn}>
          <Text style={{ fontSize: 18 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Screen */}
      <View style={{ flex: 1 }}>
        {tab === 'home' && renderHome()}
        {tab === 'calc' && renderCalc()}
        {tab === 'log' && renderLog()}
        {tab === 'tips' && renderTips()}
        {tab === 'defend' && renderDefend()}
      </View>

      {/* Bottom Nav */}
      <View style={s.nav}>
        {tabs.map(n => {
          const active = tab === n.id;
          const ac = n.id === 'defend' ? C.purple : n.id === 'calc' ? C.blue : C.amber;
          return (
            <TouchableOpacity key={n.id} onPress={() => setTab(n.id)} style={s.navBtn} activeOpacity={0.7}>
              {active && <View style={[s.navIndicator, { backgroundColor: ac }]} />}
              <View style={[s.navIconWrap, { backgroundColor: active ? ac + '18' : 'transparent', borderColor: active ? ac + '30' : 'transparent' }]}>
                <Text style={{ fontSize: active ? 20 : 17 }}>{n.e}</Text>
              </View>
              <Text style={[s.navLabel, { color: active ? ac : C.text3, fontWeight: active ? '800' : '600' }]}>{n.l}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {renderSettings()}
      {renderPaywall()}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Layout
  row: { flexDirection: 'row', alignItems: 'center' },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(10,12,16,0.97)' },
  appIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: 18, fontWeight: '900', color: C.text, letterSpacing: -0.5 },
  appSub: { fontSize: 8, color: C.text3, letterSpacing: 1.5, fontWeight: '700' },
  iconBtn: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)' },

  // Nav
  nav: { flexDirection: 'row', backgroundColor: 'rgba(8,10,13,0.97)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', paddingBottom: Platform.OS === 'ios' ? 4 : 8, paddingTop: 4 },
  navBtn: { flex: 1, alignItems: 'center', paddingVertical: 6, position: 'relative' },
  navIndicator: { position: 'absolute', top: 0, width: 28, height: 2, borderRadius: 2 },
  navIconWrap: { width: 38, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginBottom: 2 },
  navLabel: { fontSize: 8, letterSpacing: 0.2, textAlign: 'center', lineHeight: 12 },

  // Text
  label: { fontSize: 9, fontWeight: '800', color: C.text3, letterSpacing: 1, textTransform: 'uppercase' },
  bodySm: { fontSize: 13, color: C.text2, lineHeight: 20 },
  heroTitle: { fontSize: 20, fontWeight: '900', color: C.text, textAlign: 'center', letterSpacing: -0.5, marginBottom: 4 },
  heroMoney: { fontSize: 52, fontWeight: '900', color: C.amber, letterSpacing: -2, lineHeight: 58 },

  // Cards
  heroCard: { borderRadius: 22, padding: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 14 },
  kpiCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  kpiVal: { fontSize: 17, fontWeight: '900', letterSpacing: -0.5, marginBottom: 3 },
  kpiLabel: { fontSize: 9, color: C.text3, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' },
  cardTitle: { fontSize: 13, fontWeight: '800', color: C.text },
  badge: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 11, color: C.text3 },

  // Shifts
  shiftRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  platformBadge: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  platformBadgeText: { fontSize: 12, fontWeight: '800' },
  shiftPlatform: { fontSize: 13, fontWeight: '700', color: C.text, marginBottom: 2 },
  shiftMeta: { fontSize: 11, color: C.text3 },
  shiftAmt: { fontSize: 16, fontWeight: '900', color: C.amber, letterSpacing: -0.5 },

  // Quick buttons
  quickBtn: { flex: 1, borderRadius: 16, padding: 16, borderWidth: 1, alignItems: 'center', gap: 8 },
  quickBtnTitle: { fontSize: 13, fontWeight: '800' },
  quickBtnSub: { fontSize: 10, color: C.text3, textAlign: 'center', lineHeight: 14 },

  // Progress
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressBg: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 99, height: 8, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: C.amber, borderRadius: 99 },

  // Features
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },

  // Calculator
  payInputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245,166,35,0.07)', borderRadius: 16, borderWidth: 2, borderColor: 'rgba(245,166,35,0.3)', paddingLeft: 16 },
  payDollar: { fontSize: 28, fontWeight: '900', color: C.amber },
  payInput: { flex: 1, fontSize: 36, fontWeight: '900', color: C.amber, paddingVertical: 18, paddingHorizontal: 8, letterSpacing: -1 },
  verdictCard: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 18, padding: 18, borderWidth: 2, gap: 14 },
  verdictTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5, marginBottom: 4 },
  statCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  statVal: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5, marginBottom: 4 },
  statLabel: { fontSize: 9, color: C.text3, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  clearBtn: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },

  // Input
  input: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 11, padding: 12, color: C.text, fontSize: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)' },

  // Platform chips
  platformChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 11, borderWidth: 2, marginRight: 8 },
  platformChipText: { fontSize: 13, fontWeight: '700' },
  platformDot: { width: 7, height: 7, borderRadius: 99 },

  // Tips
  tipCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, borderWidth: 2, overflow: 'hidden' },
  tipTitle: { fontSize: 14, fontWeight: '700', color: C.text, lineHeight: 20 },
  tipSub: { fontSize: 12, color: C.text3, marginTop: 2 },
  catIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },

  // Messages
  msgBox: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  msgText: { fontSize: 13, color: C.text, lineHeight: 22, fontStyle: 'italic' },
  copyBtn: { borderRadius: 7, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  copyBtnText: { fontSize: 10, fontWeight: '700' },
  whyBox: { backgroundColor: 'rgba(59,130,246,0.08)', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)' },

  // Defend
  platformPickCard: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 16, padding: 16, borderWidth: 1 },
  platformPickIcon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  segBtn: { borderRadius: 10, paddingVertical: 10, alignItems: 'center', gap: 3 },
  segBtnText: { fontSize: 11, fontWeight: '700' },
  habitCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16, borderWidth: 1 },
  alertBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: 'rgba(244,63,94,0.08)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(244,63,94,0.25)' },
  infoBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: 'rgba(139,92,246,0.08)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(139,92,246,0.25)' },

  // Checklist
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 14 },
  checkbox: { width: 26, height: 26, borderRadius: 8, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },

  // Success / misc
  successMsg: { textAlign: 'center', fontSize: 14, fontWeight: '700', color: C.green, padding: 11, backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(16,185,129,0.25)' },

  // Intro
  introContent: { alignItems: 'center', paddingVertical: 20 },
  introTag: { fontSize: 10, fontWeight: '800', color: 'rgba(245,166,35,0.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  introEmoji: { fontSize: 72, marginBottom: 16, textAlign: 'center' },
  introHeadline: { fontSize: 40, fontWeight: '900', color: C.text, textAlign: 'center', letterSpacing: -1.5, lineHeight: 46, marginBottom: 16 },
  introDivider: { width: 40, height: 3, borderRadius: 99, backgroundColor: C.amber, marginBottom: 16 },
  introSub: { fontSize: 14, color: C.text2, textAlign: 'center', lineHeight: 22, marginBottom: 4 },
  introHighlight: { borderRadius: 14, padding: 14, marginTop: 14, borderWidth: 1, width: '100%' },
  introHighlightText: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
});
