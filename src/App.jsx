import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sun, Lightbulb, Route, ArrowLeftRight, MessageCircle, Target, TrendingUp, TrendingDown, Eye, BookOpen, Search, PenTool, Calendar, RefreshCw, Zap, Scale, AlertTriangle, Clock, Wallet, Sparkles, ChevronDown, Check, Plus, ArrowRight, Droplets, BarChart3, Shield, Brain, Flag, CheckCircle2, FileText } from "lucide-react";

const T = {
  bg: "#F4F5F9", card: "#FFFFFF", nav: "#0C0E16", navS: "#13151F", navA: "#1A1D2A",
  primary: "#4F6DF5", primaryDark: "#3B55D4", primaryMuted: "#4F6DF510", primaryGlow: "#4F6DF518",
  text: "#15171E", textSec: "#5C6178", textTri: "#9298B0",
  green: "#12946B", greenSoft: "#E6F5EE", red: "#CF3838", redSoft: "#FDF0F0",
  amber: "#B8850F", amberSoft: "#FBF5E6", orange: "#C95D28",
  purple: "#6F4FF2", purpleSoft: "#F0EDFE", teal: "#0E847A", tealSoft: "#E8F5F3",
  border: "#E4E6EE", borderL: "#EDEFF5", borderF: "#4F6DF530",
  shadow: "0 1px 2px rgba(0,0,0,0.03)", shadowMd: "0 4px 16px rgba(0,0,0,0.06)",
  shadowLg: "0 16px 48px rgba(0,0,0,0.12)", r: 12, rs: 8, rxs: 5,
};
const TC = { "US AI Infrastructure": "#4F6DF5", "Japan Tech Revival": "#0E847A", "Indian Consumer Boom": "#6F4FF2", "European Defense": "#C95D28", "Global Fintech": "#12946B", "Clean Energy": "#B8850F" };

const taskIcons = {
  watch: { Icon: Eye, c: T.primary }, read: { Icon: BookOpen, c: T.purple },
  evaluate: { Icon: Search, c: T.amber }, define: { Icon: PenTool, c: T.teal },
  plan: { Icon: Calendar, c: T.orange }, buy: { Icon: TrendingUp, c: T.green },
  sell: { Icon: TrendingDown, c: T.orange }, review: { Icon: RefreshCw, c: T.primary },
  respond: { Icon: Zap, c: T.red }, rebalance: { Icon: Scale, c: T.amber },
};

function Label({ children, style }) {
  return <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textTri, marginBottom: 8, ...style }}>{children}</div>;
}
function Card({ children, style, onClick, hover, glow }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick} style={{ background: T.card, borderRadius: T.r, border: `1px solid ${h && hover ? T.borderF : T.border}`, padding: 20, boxShadow: h && hover ? T.shadowMd : glow ? `0 0 0 1px ${glow}15, ${T.shadow}` : T.shadow, transition: "all 0.25s cubic-bezier(.25,.46,.45,.94)", cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>;
}
function Badge({ children, color, soft, small, glow }) {
  return <span style={{ fontSize: small ? 9 : 10, fontWeight: 600, padding: small ? "1px 7px" : "3px 10px", borderRadius: 20, background: soft ? color + "12" : T.borderL, color: color || T.textSec, whiteSpace: "nowrap", letterSpacing: "0.02em", boxShadow: glow ? `0 0 8px ${color}20` : undefined }}>{children}</span>;
}
function Btn({ children, onClick, variant = "primary", style, disabled }) {
  const [h, setH] = useState(false);
  const s = {
    primary: { background: h ? T.primaryDark : `linear-gradient(135deg,${T.primary},${T.primaryDark})`, color: "#fff", border: "none", boxShadow: `0 2px 8px ${T.primary}20` },
    green: { background: h ? "#0D7F5C" : `linear-gradient(135deg,${T.green},#0D7F5C)`, color: "#fff", border: "none", boxShadow: `0 2px 8px ${T.green}20` },
    ghost: { background: h ? T.borderL : "transparent", color: T.textSec, border: `1px solid ${T.border}`, boxShadow: "none" },
    danger: { background: h ? "#FDE8E8" : T.redSoft, color: T.red, border: `1px solid ${T.red}15`, boxShadow: "none" },
    subtle: { background: h ? T.primaryMuted : "transparent", color: T.primary, border: "none", boxShadow: "none" },
  };
  return <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={disabled ? undefined : onClick} style={{ fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: T.rs, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "all .2s ease", ...s[variant], ...style }}>{children}</button>;
}
function StatCard({ label, value, sub, accent }) {
  return <Card style={{ flex: 1, minWidth: 0, padding: "16px 18px", position: "relative", overflow: "hidden" }}>{accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},${accent}40)` }} />}<div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: T.textTri, marginBottom: 6 }}>{label}</div><div style={{ fontSize: 24, fontWeight: 700, color: accent || T.text, lineHeight: 1.1, letterSpacing: "-.03em" }}>{value}</div>{sub && <div style={{ fontSize: 11, color: accent ? accent + "CC" : T.textTri, marginTop: 4, fontWeight: 500 }}>{sub}</div>}</Card>;
}
function StageBadge({ stage }) {
  const m = { Thesis: T.green, "Toe Dip": T.teal, Idea: T.purple, Snoozed: T.textTri };
  return <Badge color={m[stage]} soft glow>{stage}</Badge>;
}
function Chev({ open }) {
  return <ChevronDown size={14} style={{ transition: "transform .25s cubic-bezier(.25,.46,.45,.94)", transform: open ? "rotate(180deg)" : "none", opacity: 0.3 }} />;
}
function Acc({ title, defaultOpen = false, badge, children, accent }) {
  const [open, setOpen] = useState(defaultOpen);
  return <div style={{ borderRadius: T.rxs, marginBottom: 4, background: open ? T.bg : T.card, border: `1px solid ${open ? T.border : T.borderL}`, borderLeft: accent ? `2px solid ${accent}` : undefined }}><div onClick={() => setOpen(!open)} style={{ padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}><span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{title}</span>{badge}</div><Chev open={open} /></div>{open && <div style={{ padding: "0 12px 12px" }}>{children}</div>}</div>;
}

const thesesData = [
  { name: "US AI Infrastructure", value: "$4.20M", pnl: "+34.2%", pnlNum: 34.2, stocks: ["NVDA", "MSFT", "AMD", "SMCI"], alert: true },
  { name: "Japan Tech Revival", value: "$3.10M", pnl: "+12.1%", pnlNum: 12.1, stocks: ["Sony", "SoftBank", "Keyence"], stale: true },
  { name: "Indian Consumer Boom", value: "$2.80M", pnl: "+28.4%", pnlNum: 28.4, stocks: ["HDFC", "BajFin", "AsianPaint"] },
  { name: "European Defense", value: "$1.90M", pnl: "+41.3%", pnlNum: 41.3, stocks: ["Airbus", "Rheinmetall", "SAAB"] },
  { name: "Global Fintech", value: "$1.40M", pnl: "-8.2%", pnlNum: -8.2, stocks: ["Nu", "Adyen", "Wise"] },
  { name: "Clean Energy", value: "$0.90M", pnl: "-3.1%", pnlNum: -3.1, stocks: ["ENPH", "NEE", "Vestas"] },
];

const tStocks = [
  { ticker: "NVDA", name: "NVIDIA", value: "$2.13M", pnl: "+66.3%", pnlNum: 66.3, weight: "50.7%", shares: "1,900", avgCost: "$674", alert: true, color: "#4F6DF5" },
  { ticker: "MSFT", name: "Microsoft", value: "$1.18M", pnl: "+22.7%", pnlNum: 22.7, weight: "28.1%", shares: "2,800", avgCost: "$343", color: "#7B93F7" },
  { ticker: "AMD", name: "AMD", value: "$0.59M", pnl: "+17.6%", pnlNum: 17.6, weight: "14.0%", shares: "4,000", avgCost: "$125", color: "#A8B8FA" },
  { ticker: "SMCI", name: "Super Micro", value: "$0.30M", pnl: "-21.8%", pnlNum: -21.8, weight: "7.3%", shares: "800", avgCost: "$488", color: "#C8D2FC" },
];

const attn = [
  { p: "critical", thesis: "US AI Infrastructure", ticker: "NVDA", amount: "$2.13M", pct: "8.6%", tt: "Invalidation", hl: "Q4 guidance miss 12% — core DC growth assumption broken", detail: "Thesis assumed sustained DC revenue growth >25%. Q4 guidance at +14%, breaking 6-quarter trend. Position is $2.13M (1,900 shares), your largest single holding.", logic: "Largest position ($2.13M, 8.6% of AUM) + invalidation trigger fired on core revenue assumption.", action: "Review Thesis", time: "2h", target: "US AI Infrastructure" },
  { p: "high", thesis: "Japan Tech Revival", ticker: "Portfolio", amount: "$3.10M", pct: "12.6%", tt: "Staleness", hl: "23 days stale — ¥ at 158.4, above 145–155 range", detail: "Thesis assumed ¥145–155. Now ¥158.4, eroding USD returns ~2.2% across all 3 positions (Sony, SoftBank, Keyence).", logic: "$3.10M (12.6% of AUM) + macro regime shift + no thesis update in 23 days.", action: "Update Thesis", time: "23d", target: "Japan Tech Revival" },
  { p: "medium", thesis: "Indian Consumer Boom", ticker: "HDFC", amount: "$1.40M", pct: "5.7%", tt: "Plan Overdue", hl: "DCA add overdue 4d — HDFC at ₹1,680 (in ₹1,650–1,700 range)", detail: "Planned ₹25L add at ₹1,650–1,700. HDFC at ₹1,680 for 4 days. Position currently $1.40M.", logic: "Conditions met but not executed. Builds discipline debt.", action: "Execute Plan", time: "4d", target: "Indian Consumer Boom" },
  { p: "medium", thesis: "India SaaS Exports", ticker: "No position", amount: "$0", pct: "0%", tt: "Momentum", hl: "4 thoughts accumulated — promotion review due", detail: "4 coherent thoughts over 3 weeks. Pattern-matches Indian Consumer Boom at promotion (also 4 thoughts, now +28.4%).", logic: "Forward opportunity. Historical pattern: Indian Consumer promoted at same conviction level.", action: "Review", time: "1d", target: "India SaaS Exports" },
];
const pC = { critical: T.red, high: T.orange, medium: T.amber };

const stackData = Array.from({ length: 26 }, (_, i) => {
  const m = i / 25;
  return { date: `W${i + 1}`, "US AI Infrastructure": 2800 + m * 1400 + Math.sin(i * .5) * 200, "Japan Tech Revival": 2400 + m * 700 + Math.cos(i * .3) * 150, "Indian Consumer Boom": 1800 + m * 1000 + Math.sin(i * .4) * 100, "European Defense": 1100 + m * 800 + Math.cos(i * .6) * 80, "Global Fintech": 1600 - m * 200 + Math.sin(i * .7) * 120, "Clean Energy": 1000 - m * 100 + Math.cos(i * .5) * 60 };
});

const sPrices = { NVDA: [480, 510, 545, 590, 640, 700, 780, 860, 940, 1050, 1120, 1060, 980, 1020, 1080, 1120], MSFT: [345, 350, 358, 365, 372, 380, 390, 398, 405, 410, 420, 415, 408, 418, 425, 421], AMD: [110, 115, 120, 128, 135, 142, 138, 145, 152, 148, 155, 140, 130, 138, 145, 147], SMCI: [280, 310, 350, 420, 480, 520, 580, 620, 550, 480, 420, 380, 340, 360, 385, 381] };
const sEvents = {
  NVDA: [{ i: 0, t: "T", c: T.purple, Icon: MessageCircle }, { i: 3, t: "L", c: T.amber, Icon: Lightbulb }, { i: 4, t: "B", c: T.green, Icon: TrendingUp }, { i: 5, t: "◎", c: T.teal, Icon: Target }, { i: 6, t: "B", c: T.green, Icon: TrendingUp }, { i: 10, t: "S", c: T.orange, Icon: TrendingDown }, { i: 12, t: "B", c: T.green, Icon: TrendingUp }, { i: 15, t: "!", c: T.red, Icon: AlertTriangle }],
  MSFT: [{ i: 5, t: "B", c: T.green, Icon: TrendingUp }, { i: 9, t: "B", c: T.green, Icon: TrendingUp }],
  AMD: [{ i: 6, t: "B", c: T.green, Icon: TrendingUp }, { i: 11, t: "B", c: T.green, Icon: TrendingUp }],
  SMCI: [{ i: 4, t: "B", c: T.green, Icon: TrendingUp }, { i: 7, t: "B", c: T.green, Icon: TrendingUp }, { i: 10, t: "S", c: T.orange, Icon: TrendingDown }],
};

const tTimeline = [
  { date: "Oct '23", type: "thought", Icon: MessageCircle, color: T.purple, title: "Call with Rajesh K — DC buildout", detail: "Data center buildout accelerating. Hyperscaler capex plans suggest 2–3× current run rate.", stocks: [] },
  { date: "Oct '23", type: "thought", Icon: MessageCircle, color: T.purple, title: "Jensen keynote — inference demand", detail: "Inference now matching training workloads. Revenue durability stronger than one-cycle narrative.", stocks: [] },
  { date: "Nov '23", type: "thought", Icon: MessageCircle, color: T.purple, title: "TSMC supply chain check", detail: "CoWoS capacity booked through Q3 '24. NVDA packaging moat widening.", stocks: [] },
  { date: "Nov '23", type: "idea", Icon: Lightbulb, color: T.amber, title: "Idea formed: AI Infra Buildout", detail: "Grouped 3 thoughts into hypothesis: AI infrastructure is a multi-year cycle, not one quarter.", stocks: [] },
  { date: "Jan '24", type: "buy", Icon: TrendingUp, color: T.green, title: "NVDA Toe Dip — 500 @ $480", detail: "Testing thesis. $240K skin in the game before Q4 earnings.", badge: "Neutral", size: "$240K", stocks: ["NVDA"] },
  { date: "Feb '24", type: "thesis", Icon: Target, color: T.teal, title: "Thesis created: US AI Infrastructure", detail: "Q4 confirmed >25% DC growth. Plan: scale to $4M across NVDA, MSFT, AMD, SMCI over 3 months.", stocks: [] },
  { date: "Feb '24", type: "buy", Icon: TrendingUp, color: T.green, title: "MSFT — 1,400 @ $380", detail: "Azure AI revenue acceleration. Copilot enterprise traction.", badge: "Confident", size: "$532K", stocks: ["MSFT"] },
  { date: "Mar '24", type: "buy", Icon: TrendingUp, color: T.green, title: "NVDA Full conviction — 800 @ $640", detail: "Blackwell demand confirmed via channel checks.", badge: "Confident", size: "$512K", stocks: ["NVDA"] },
  { date: "Mar '24", type: "buy", Icon: TrendingUp, color: T.green, title: "AMD — 2,500 @ $125", detail: "MI300X gaining traction. Diversifying GPU exposure in thesis.", size: "$313K", stocks: ["AMD"] },
  { date: "Mar '24", type: "buy", Icon: TrendingUp, color: T.green, title: "SMCI — 500 @ $480", detail: "Server rack buildout play. Higher risk within thesis.", size: "$240K", stocks: ["SMCI"] },
  { date: "May '24", type: "buy", Icon: TrendingUp, color: T.green, title: "SMCI Add — 500 @ $540", detail: "Revenue beat confirmed server demand.", size: "$270K", stocks: ["SMCI"] },
  { date: "Jun '24", type: "trim", Icon: TrendingDown, color: T.orange, title: "NVDA Trim — 200 @ $1,120", detail: "Position exceeded 8% of AUM. Selling into strength, thesis unchanged.", badge: "Neutral", size: "$224K", stocks: ["NVDA"] },
  { date: "Jul '24", type: "buy", Icon: TrendingUp, color: T.green, title: "MSFT Add — 1,400 @ $307", detail: "Azure growth re-accelerating after pullback.", size: "$430K", stocks: ["MSFT"] },
  { date: "Sep '24", type: "buy", Icon: TrendingUp, color: T.green, title: "NVDA Dip — 800 @ $660", detail: "Export control selloff = sentiment, not fundamentals.", badge: "Confident", size: "$528K", stocks: ["NVDA"] },
  { date: "Oct '24", type: "trim", Icon: TrendingDown, color: T.orange, title: "SMCI Trim — 200 @ $420", detail: "Accounting red flags. Reducing speculative exposure.", badge: "Fearful", size: "$84K", stocks: ["SMCI"] },
  { date: "Nov '24", type: "thought", Icon: MessageCircle, color: T.purple, title: "AMD MI300X competitive concern", detail: "Mixed reviews. NVDA Blackwell widening gap. Rethink AMD weighting?", stocks: ["AMD"] },
  { date: "Nov '24", type: "buy", Icon: TrendingUp, color: T.green, title: "AMD Dip add — 1,500 @ $125", detail: "Valuation compelling despite competitive concern.", size: "$188K", stocks: ["AMD"] },
  { date: "Jan '25", type: "alert", Icon: AlertTriangle, color: T.red, title: "Alert: NVDA Q4 guidance miss 12%", detail: "DC revenue guidance +14% vs >25% thesis assumption. Core thesis challenged.", stocks: ["NVDA"] },
];

const thTasks = [
  { id: "t1", type: "respond", title: "Respond to NVDA invalidation", stock: "NVDA", due: "Today", dueStatus: "overdue", done: false, detail: "Q4 guidance missed by 12%. Thesis requires >25% DC growth. Decide: wait for Q1 confirmation, trim $500K, or exit.", context: "This is the trade your past self told you to make. 1,900 shares, $2.13M exposed.", action: "Open Trade Gate" },
  { id: "t2", type: "review", title: "Reassess SMCI accounting risk", stock: "SMCI", due: "This week", dueStatus: "urgent", done: false, detail: "10-K delayed, auditor resigned. 800 shares held at -21.8%. Is $305K worth the thesis risk?", context: "Smallest position but highest loss. Already trimmed 200 shares in Oct." },
  { id: "t3", type: "evaluate", title: "AMD vs NVDA weighting", stock: "AMD", due: "2 weeks", done: false, detail: "AMD +17.6% vs NVDA +66.3%. MI300X concerns. 4,000 shares ($588K) — concentrate into NVDA winner?" },
  { id: "t4", type: "plan", title: "Update DCA plan post-invalidation", due: "Jan 31", done: false, detail: "Original plan: scale to $4M. Now at $4.2M. Does invalidation trigger mean reduce, hold, or continue?" },
  { id: "t5", type: "watch", title: "Monitor Q1 for 2nd-quarter confirmation", stock: "NVDA", due: "Apr '25", done: false, detail: "Invalidation needs 2 consecutive quarters <25%. Q1 results in April are the confirmation or relief." },
  { id: "t6", type: "read", title: "Blackwell supply chain analysis", done: true, detail: "Completed Jan 8." },
  { id: "t7", type: "rebalance", title: "Post-trim rebalance verification", done: true, detail: "Verified Jun '24 — no position >8%." },
];
const tdTasks = [
  { id: "td1", type: "watch", title: "Adyen take rate — Q4 results", stock: "Adyen", due: "Feb 12", dueStatus: "urgent", done: false, detail: "Take rate declining: 0.232→0.218%. Your threshold is 0.20%. Q4 on Feb 12.", context: "Below 0.20% = re-evaluate Adyen ($380K, 27% of toe dip)." },
  { id: "td2", type: "evaluate", title: "Run promotion assessment", due: "This month", done: false, detail: "4 months in, $1.40M deployed. Formally evaluate: thesis statement, exit conditions, sizing plan." },
  { id: "td3", type: "define", title: "Write invalidation conditions", due: "Before promotion", done: false, detail: "No exit triggers defined. What makes you abandon fintech? NPL blow-up? Take rate collapse?" },
  { id: "td4", type: "read", title: "Nu Q3 credit quality report", stock: "Nu", due: "Overdue", dueStatus: "overdue", done: false, detail: "NPL 5.2%, up from 4.8%. Within your 7% threshold but trending wrong." },
  { id: "td5", type: "buy", title: "Nu Q3 add complete", done: true, detail: "Added 3,500 @ $13.50. Total now 6,500 shares ($820K)." },
];
const idTasks = {
  "India SaaS Exports": [
    { id: "i1", type: "read", title: "Freshworks Q3 10-Q deep dive", stock: "Freshworks", due: "This week", dueStatus: "urgent", done: false, detail: "22% ARR growth re-accelerating. Need: enterprise mix, net dollar retention, FCF.", context: "Most likely toe dip entry. Currently ~$15.80/share." },
    { id: "i2", type: "evaluate", title: "India vs US SaaS valuation gap", due: "2 weeks", done: false, detail: "Thesis assumes structural discount. Verify Freshworks EV/Rev vs Salesforce, ServiceNow." },
    { id: "i3", type: "define", title: "Draft toe dip entry criteria", due: "Before any trade", done: false, detail: "What price? What earnings milestone? Write it before FOMO." },
    { id: "i4", type: "watch", title: "Zoho private market signals", stock: "Zoho", due: "Ongoing", done: false, detail: "Monitor secondary transactions for IPO timeline." },
    { id: "i5", type: "read", title: "McKinsey IT→SaaS talent report", done: true, detail: "Confirms structural shift from services to products." },
  ],
  "Quantum Adjacent": [
    { id: "q1", type: "read", title: "Google Willow technical paper", due: "This week", done: false, detail: "105-qubit error correction. Implications for infrastructure timeline." },
    { id: "q2", type: "evaluate", title: "Map QC supply chain (3–5 companies)", due: "Next month", done: false, detail: "Find picks-and-shovels: cryogenic cooling, interconnect, error correction." },
    { id: "q3", type: "watch", title: "IONQ valuation vs fundamentals", stock: "IONQ", due: "Ongoing", done: false, detail: "Trading at 80× revenue. Watch for acceleration or compression." },
  ],
};

const ideaMap = {
  "India SaaS Exports": { hyp: "Indian SaaS capturing global enterprise share at structurally lower cost — talent density, delivery economics, and product maturity.", wl: ["Freshworks", "Zoho", "Druva", "Postman"], tl: [{ date: "Dec '24", type: "thought", Icon: MessageCircle, color: T.purple, title: "Freshworks ARR re-acceleration", detail: "Q3: 22% ARR growth. Enterprise mix 48%, up from 31%." }, { date: "Dec '24", type: "thought", Icon: MessageCircle, color: T.purple, title: "Zoho deep-dive", detail: "$1B+ revenue, 45%+ margins, bootstrapped. Full enterprise stack." }, { date: "Jan '25", type: "thought", Icon: MessageCircle, color: T.purple, title: "IT services → SaaS talent rotation", detail: "Infosys/TCS slowing. Talent flowing to product companies faster." }, { date: "Jan '25", type: "thought", Icon: MessageCircle, color: T.purple, title: "Postman API economy", detail: "30M+ developers. Monetization starting. Pre-IPO." }], sig: [{ l: "Thought coherence", v: "High", c: T.green, d: "4 in 3 weeks, all reinforcing. No contradictions." }, { l: "Pattern match", v: "Strong", c: T.green, d: "Indian Consumer promoted at 4 thoughts. Now +28.4%." }, { l: "Actionability", v: "Medium", c: T.amber, d: "2 public stocks. Freshworks-only toe dip likely." }, { l: "Risk clarity", v: "Low", c: T.red, d: "No invalidation conditions defined yet." }], rel: ["US AI Infrastructure"] },
  "Quantum Adjacent": { hyp: "Quantum infrastructure picks-and-shovels — profit regardless of qubit architecture winner.", wl: ["IONQ", "Rigetti", "Quantinuum"], tl: [{ date: "Jan '25", type: "thought", Icon: MessageCircle, color: T.purple, title: "Google Willow breakthrough", detail: "105-qubit error correction below threshold." }, { date: "Jan '25", type: "thought", Icon: MessageCircle, color: T.purple, title: "Cryogenic cooling market sizing", detail: "$2B addressable by 2028. Only 3 players." }, { date: "Feb '25", type: "thought", Icon: MessageCircle, color: T.purple, title: "IONQ × Hyundai commercial deal", detail: "First enterprise deal. Revenue still tiny vs valuation." }], sig: [{ l: "Coherence", v: "Medium", c: T.amber, d: "3 thoughts, thesis direction unclear." }, { l: "Pattern", v: "Weak", c: T.orange, d: "No prior thesis promoted at 3 thoughts." }, { l: "Actionability", v: "Low", c: T.red, d: "Targets speculative/pre-revenue." }], rel: ["US AI Infrastructure"] },
};

const tdMap = {
  "Global Fintech": { hyp: "LatAm + European digital banking at US-2015 penetration. Nu and Adyen are the asymmetric bets.", stk: [{ ticker: "Nu", name: "Nu Holdings", value: "$820K", pnl: "-5.1%", pnlNum: -5.1, shares: "6,500", avgCost: "$13.30", color: T.green }, { ticker: "Adyen", name: "Adyen", value: "$380K", pnl: "-14.2%", pnlNum: -14.2, shares: "250", avgCost: "$1,768", color: "#4FC78A" }, { ticker: "Wise", name: "Wise", value: "$200K", pnl: "-3.8%", pnlNum: -3.8, shares: "18,000", avgCost: "$11.55", color: "#8FD8B4" }], tl: [{ date: "Aug '24", type: "thought", Icon: MessageCircle, color: T.purple, title: "LatAm unbanked opportunity", detail: "Brazil: 40M+ new accounts in 3 years. Nu leading.", stocks: [] }, { date: "Sep '24", type: "idea", Icon: Lightbulb, color: T.amber, title: "Idea: Global Fintech", detail: "Grouped LatAm + Europe digital banking.", stocks: [] }, { date: "Oct '24", type: "buy", Icon: TrendingUp, color: T.green, title: "Nu — 3,000 @ $13.10", detail: "Starting small. $39K.", badge: "Neutral", size: "$39K", stocks: ["Nu"] }, { date: "Oct '24", type: "buy", Icon: TrendingUp, color: T.green, title: "Adyen — 100 @ $1,720", detail: "Margin compression dip.", size: "$172K", stocks: ["Adyen"] }, { date: "Nov '24", type: "buy", Icon: TrendingUp, color: T.green, title: "Wise — 10,000 @ $11.40", detail: "Cross-border payments.", size: "$114K", stocks: ["Wise"] }, { date: "Jan '25", type: "thought", Icon: MessageCircle, color: T.purple, title: "Adyen margin concern", detail: "Take rate declining. May need longer timeline.", stocks: ["Adyen"] }, { date: "Jan '25", type: "buy", Icon: TrendingUp, color: T.green, title: "Wise Add — 8,000 @ $11.70", detail: "Growing conviction.", size: "$94K", stocks: ["Wise"] }], pc: [{ l: "Thesis statement", d: false }, { l: "Exit conditions", d: false }, { l: "Sizing plan", d: false }, { l: "6-month observation", d: true }, { l: "Conviction check", d: false }], wm: [{ l: "Nu NPL ratio", cur: "5.2%", th: "< 7%", ok: true }, { l: "Adyen take rate", cur: "0.218%", th: "> 0.20%", ok: false }, { l: "Wise volume YoY", cur: "+32%", th: "> 25%", ok: true }] },
};

const ideas = [
  { name: "US AI Infrastructure", stage: "Thesis", hyp: "AI infrastructure multi-year super-cycle driven by hyperscaler capex.", value: "$4.20M", pnl: "+34.2%", stocks: ["NVDA", "MSFT", "AMD", "SMCI"], thoughts: 12, updated: "2d" },
  { name: "Indian Consumer Boom", stage: "Thesis", hyp: "Rising middle class + digital payments adoption.", value: "$2.80M", pnl: "+28.4%", stocks: ["HDFC", "BajFin"], thoughts: 8, updated: "5d" },
  { name: "European Defense", stage: "Thesis", hyp: "NATO structural spending decade-long tailwind.", value: "$1.90M", pnl: "+41.3%", stocks: ["Airbus", "Rheinmetall"], thoughts: 6, updated: "1w" },
  { name: "Japan Tech Revival", stage: "Toe Dip", hyp: "Governance reform + weak ¥ = re-rating.", value: "$3.10M", pnl: "+12.1%", stocks: ["Sony", "SoftBank"], thoughts: 5, updated: "23d", stale: true },
  { name: "Global Fintech", stage: "Toe Dip", hyp: "LatAm + Europe digital banking early innings.", value: "$1.40M", pnl: "-8.2%", stocks: ["Nu", "Adyen", "Wise"], thoughts: 4, updated: "3d" },
  { name: "India SaaS Exports", stage: "Idea", hyp: "Indian SaaS global enterprise capture.", stocks: ["Freshworks", "Zoho"], thoughts: 4, updated: "1d" },
  { name: "Quantum Adjacent", stage: "Idea", hyp: "Quantum infrastructure picks-and-shovels.", stocks: ["IONQ"], thoughts: 3, updated: "4d" },
  { name: "Brazil Agri Infra", stage: "Snoozed", hyp: "$200B agri modernization opportunity.", stocks: ["SLC"], thoughts: 2, updated: "45d", snoozeDate: "Apr '25", todo: "Monitor Lula trade policy" },
  { name: "Genomics 2.0", stage: "Snoozed", hyp: "CRISPR therapeutics commercial viability.", stocks: ["CRSP"], thoughts: 2, updated: "30d", snoozeDate: "Jun '25", todo: "FDA sickle cell panel" },
];

function MChart({ stocks, pd, ed, active }) {
  const W = 540, H = 195, PX = 42, PY = 18;
  const av = active.flatMap(tk => pd[tk] || []);
  if (!av.length) return null;
  const mn = Math.min(...av) * 0.92, mx = Math.max(...av) * 1.04;
  const x = i => PX + (i / 15) * (W - PX * 2);
  const y = v => PY + (1 - (v - mn) / (mx - mn)) * (H - PY * 2);
  const ln = a => a.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p)}`).join(" ");
  const la = ["Oct'23", "", "Dec", "", "Feb'24", "", "Apr", "", "Jun", "", "Aug", "", "Oct", "", "Dec", "Jan'25"];
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 24}`} style={{ fontFamily: "Inter,system-ui" }}>
      <defs>{active.map(tk => { const s = stocks.find(st => st.ticker === tk); return s ? <linearGradient key={tk} id={`g-${tk}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={s.color} stopOpacity=".12" /><stop offset="1" stopColor={s.color} stopOpacity=".01" /></linearGradient> : null; })}</defs>
      {[0, 1, 2, 3].map(i => { const v = mn + (mx - mn) * i / 3; return (<g key={i}><line x1={PX} x2={W - PX} y1={y(v)} y2={y(v)} stroke={T.border} strokeWidth=".5" strokeDasharray="3,6" /><text x={PX - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={T.textTri} fontWeight="500">${Math.round(v)}</text></g>); })}
      {la.map((l, i) => l ? <text key={i} x={x(i)} y={H - PY + 16} textAnchor="middle" fontSize="9" fill={T.textTri} fontWeight="500">{l}</text> : null)}
      {active.length === 1 && active.map(tk => { const s = stocks.find(st => st.ticker === tk), p = pd[tk]; return p && s ? <path key={`a-${tk}`} d={ln(p) + `L${x(15)},${y(mn)}L${x(0)},${y(mn)}Z`} fill={`url(#g-${tk})`} /> : null; })}
      {active.map(tk => { const s = stocks.find(st => st.ticker === tk), p = pd[tk]; return p && s ? <path key={tk} d={ln(p)} fill="none" stroke={s.color} strokeWidth={active.length === 1 ? 2.5 : 1.8} strokeLinejoin="round" strokeLinecap="round" opacity={active.length === 1 ? 1 : .8} /> : null; })}
      {active.map(tk => (ed[tk] || []).map((e, idx) => { const p = pd[tk]; if (!p) return null; const r = active.length === 1 ? 7 : 5; return (<g key={`${tk}-${idx}`}><circle cx={x(e.i)} cy={y(p[e.i])} r={r + 5} fill={e.c} opacity=".06" /><circle cx={x(e.i)} cy={y(p[e.i])} r={r} fill={e.c} /><text x={x(e.i)} y={y(p[e.i]) + (r === 7 ? 3.5 : 2.5)} textAnchor="middle" fontSize={r === 7 ? 8 : 7} fill="#fff" fontWeight="700">{e.t}</text></g>); }))}
    </svg>
  );
}

function TL({ events, filter, stocks }) {
  const f = filter === "all" ? events : events.filter(e => !e.stocks?.length || e.stocks?.includes(filter));
  return (
    <div style={{ position: "relative" }}>
      {f.map((ev, i) => {
        const EIcon = ev.Icon;
        return (
          <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
            {i < f.length - 1 && <div style={{ position: "absolute", left: 13, top: 30, bottom: 0, width: 1, background: f[i + 1].type === "alert" ? T.red + "40" : T.borderL }} />}
            <div style={{ width: 28, height: 28, borderRadius: T.rxs, background: ev.color + "10", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, border: `1px solid ${ev.color}15` }}><EIcon size={13} color={ev.color} strokeWidth={2.5} /></div>
            <div style={{ flex: 1, paddingBottom: 14, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{ev.title}</span>
                  {(ev.stocks || []).map(s => { const st = stocks?.find(x => x.ticker === s); return <span key={s} style={{ fontSize: 9, fontWeight: 600, padding: "1px 5px", borderRadius: T.rxs, background: st ? st.color + "10" : T.purpleSoft, color: st?.color || T.purple }}>{s}</span>; })}
                </div>
                <span style={{ fontSize: 10, color: T.textTri, fontWeight: 500, flexShrink: 0 }}>{ev.date}</span>
              </div>
              <div style={{ fontSize: 11, color: T.textSec, lineHeight: 1.6 }}>{ev.detail}</div>
              {(ev.badge || ev.size) && <div style={{ display: "flex", gap: 5, marginTop: 5 }}>{ev.badge && <Badge color={T.teal} soft small>{ev.badge}</Badge>}{ev.size && <Badge color={T.green} soft small>{ev.size}</Badge>}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AL({ tasks, onToggle }) {
  const [exp, setExp] = useState(null);
  const pend = tasks.filter(t => !t.done), comp = tasks.filter(t => t.done);
  function renderTask(t) {
    const ti = taskIcons[t.type] || taskIcons.watch;
    const TIcon = ti.Icon;
    const isO = exp === t.id, od = t.dueStatus === "overdue", urg = t.dueStatus === "urgent";
    return (
      <div key={t.id} style={{ borderRadius: T.rxs, marginBottom: 4, background: t.done ? T.bg : T.card, border: `1px solid ${od ? T.red + "25" : urg ? T.amber + "25" : T.borderL}`, borderLeft: `2px solid ${t.done ? T.border : ti.c}`, opacity: t.done ? .5 : 1 }}>
        <div style={{ padding: "9px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <div onClick={() => onToggle?.(t.id)} style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${t.done ? T.green : T.border}`, background: t.done ? T.greenSoft : T.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{t.done && <Check size={10} color={T.green} strokeWidth={2.5} />}</div>
          <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => setExp(isO ? null : t.id)}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <TIcon size={12} color={ti.c} strokeWidth={2} style={{ opacity: .6 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: t.done ? T.textTri : T.text, textDecoration: t.done ? "line-through" : "none" }}>{t.title}</span>
              {t.stock && <span style={{ fontSize: 9, fontWeight: 600, padding: "1px 5px", borderRadius: T.rxs, background: T.primaryMuted, color: T.primary }}>{t.stock}</span>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            {t.due && <span style={{ fontSize: 10, fontWeight: 600, color: od ? T.red : urg ? T.amber : T.textTri }}>{od ? "Overdue" : t.due}</span>}
            <div style={{ cursor: "pointer" }} onClick={() => setExp(isO ? null : t.id)}><Chev open={isO} /></div>
          </div>
        </div>
        {isO && <div style={{ padding: "0 10px 10px 36px" }}>
          <div style={{ fontSize: 11, color: T.textSec, lineHeight: 1.6, paddingTop: 4 }}>{t.detail}</div>
          {t.context && <div style={{ marginTop: 6, padding: "6px 10px", background: T.bg, borderRadius: T.rxs, fontSize: 10, color: T.textTri, fontStyle: "italic", borderLeft: `2px solid ${T.primary}25` }}>{t.context}</div>}
          {t.action && <div style={{ marginTop: 8 }}><Btn variant="subtle" style={{ fontSize: 10, padding: "5px 12px" }}>{t.action} →</Btn></div>}
        </div>}
      </div>
    );
  }
  return (
    <Card style={{ marginBottom: 16, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Label style={{ marginBottom: 0 }}>Action List</Label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: T.textTri, fontWeight: 500 }}>{comp.length}/{tasks.length}</span>
          <div style={{ width: 40, height: 3, background: T.borderL, borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${tasks.length ? (comp.length / tasks.length) * 100 : 0}%`, height: "100%", background: `linear-gradient(90deg,${T.green},${T.teal})`, borderRadius: 2 }} /></div>
        </div>
      </div>
      {pend.map(renderTask)}
      {comp.length > 0 && <Acc title={`${comp.length} completed`} badge={<CheckCircle2 size={12} color={T.green} />}><div style={{ paddingTop: 4 }}>{comp.map(renderTask)}</div></Acc>}
    </Card>
  );
}

function BC({ stage, name, en, setEn }) {
  const all = {
    thoughts: { Icon: MessageCircle, l: "Thoughts", s: "Oct–Nov '23", c: T.purpleSoft, d: "Rajesh call · Jensen keynote · TSMC supply check · Competitor analysis" },
    idea: { Icon: Lightbulb, l: "Idea", s: name, c: T.amberSoft, d: "Hypothesis formed from clustered thoughts." },
    toedip: { Icon: Droplets, l: "Toe Dip", s: stage === "Idea" ? "—" : "Small positions", c: T.tealSoft, d: stage === "Idea" ? "No capital deployed." : "Testing conviction with real capital." },
    thesis: { Icon: Target, l: "Thesis", s: stage === "Thesis" ? name : "—", c: T.greenSoft, d: stage === "Thesis" ? "Full conviction with exit conditions and plan." : "Requires promotion from Toe Dip." },
    trades: { Icon: BarChart3, l: stage === "Thesis" ? "18 Trades" : stage === "Toe Dip" ? "7 Trades" : "—", s: stage === "Thesis" ? "14 buys · 4 trims" : "", c: T.greenSoft, d: "Trade history across the basket." },
  };
  const ac = stage === "Idea" ? ["thoughts", "idea"] : stage === "Toe Dip" ? ["thoughts", "idea", "toedip", "trades"] : ["thoughts", "idea", "toedip", "thesis", "trades"];
  const fu = stage === "Idea" ? ["toedip", "thesis", "trades"] : stage === "Toe Dip" ? ["thesis"] : [];
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
        {[...ac, ...fu].map((k, i, arr) => {
          const n = all[k], iF = fu.includes(k), isA = en === k;
          const NIcon = n.Icon;
          return (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div onClick={() => !iF && setEn(isA ? null : k)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 20, background: iF ? "transparent" : isA ? n.c : T.card, border: `1px solid ${iF ? T.borderL : isA ? "transparent" : T.border}`, cursor: iF ? "default" : "pointer", opacity: iF ? .25 : 1, boxShadow: isA ? `0 0 0 1px ${T.primary}20` : undefined }}>
                <NIcon size={13} color={iF ? T.textTri : T.textSec} strokeWidth={2} style={{ opacity: .6 }} />
                <div><div style={{ fontSize: 10, fontWeight: 600, color: iF ? T.textTri : T.text, lineHeight: 1.2 }}>{n.l}</div><div style={{ fontSize: 9, color: T.textTri, lineHeight: 1.2 }}>{n.s}</div></div>
              </div>
              {i < arr.length - 1 && <ArrowRight size={10} color={T.textTri} style={{ opacity: .2 }} />}
            </div>
          );
        })}
      </div>
      {en && all[en] && <div style={{ marginTop: 8, padding: "10px 14px", background: T.bg, borderRadius: T.rxs, borderLeft: `2px solid ${T.primary}`, fontSize: 11, color: T.textSec, lineHeight: 1.5 }}>{all[en].d}</div>}
    </div>
  );
}

function SS({ stocks, active, onToggle }) {
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
      {stocks.map(s => {
        const on = active.includes(s.ticker);
        return (
          <div key={s.ticker} onClick={() => onToggle(s.ticker)} style={{ flex: 1, padding: "10px 10px 8px", borderRadius: T.rs, cursor: "pointer", background: on ? T.card : T.bg, border: `1px solid ${on ? s.color + "30" : T.borderL}`, opacity: on ? 1 : .4, transition: "all .25s ease", boxShadow: on ? `0 0 0 1px ${s.color}15, 0 2px 8px ${s.color}08` : undefined }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}30` }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{s.ticker}</span>
                {s.alert && <AlertTriangle size={10} color={T.red} />}
              </div>
              {s.weight && <span style={{ fontSize: 9, color: T.textTri }}>{s.weight}</span>}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
              <span style={{ fontWeight: 600, color: T.text }}>{s.value}</span>
              <span style={{ fontWeight: 600, color: s.pnlNum >= 0 ? T.green : T.red }}>{s.pnl}</span>
            </div>
            <div style={{ fontSize: 9, color: T.textTri }}>{s.shares} @ {s.avgCost}</div>
          </div>
        );
      })}
    </div>
  );
}

function JI({ target, setScreen, setJT }) {
  const [en, setEn] = useState(null);
  const [tasks, setTasks] = useState(idTasks[target] || []);
  const data = ideaMap[target];
  if (!data) return <div style={{ padding: 60, textAlign: "center", color: T.textTri }}>No data</div>;
  const idea = ideas.find(it => it.name === target);
  return (
    <div>
      <BC stage="Idea" name={target} en={en} setEn={setEn} />
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em" }}>{target}</span><StageBadge stage="Idea" /></div>
          <div style={{ display: "flex", gap: 6 }}><Btn onClick={() => setScreen("trade")}>Promote to Toe Dip</Btn><Btn variant="ghost">Snooze</Btn></div>
        </div>
        <div style={{ borderLeft: `2px solid ${T.purple}30`, paddingLeft: 14, marginTop: 14, fontSize: 12, color: T.textSec, lineHeight: 1.7, fontStyle: "italic" }}>{data.hyp}</div>
        <div style={{ display: "flex", gap: 5, marginTop: 12, alignItems: "center" }}><Label style={{ marginBottom: 0, marginRight: 4 }}>Watchlist</Label>{data.wl.map(s => <Badge key={s} color={T.primary} soft small>{s}</Badge>)}</div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 252px", gap: 16 }}>
        <div>
          <AL tasks={tasks} onToggle={id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))} />
          <Card style={{ marginBottom: 16 }}>
            <Label>Promotion Readiness</Label>
            {data.sig.map(s => <Acc key={s.l} title={s.l} badge={<Badge color={s.c} soft small glow>{s.v}</Badge>} accent={s.c}><div style={{ fontSize: 11, color: T.textSec, lineHeight: 1.6, paddingTop: 6 }}>{s.d}</div></Acc>)}
          </Card>
          <Card><Label>Thought Stream</Label><TL events={data.tl} filter="all" /></Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${T.purple},${T.purple}30)` }} />
            <Label>Conviction</Label>
            <div style={{ textAlign: "center", padding: "16px 0 10px" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: T.purple, letterSpacing: "-.04em", lineHeight: 1 }}>{idea?.thoughts || 0}</div>
              <div style={{ fontSize: 10, color: T.textTri, marginTop: 4 }}>thoughts</div>
            </div>
            <div style={{ height: 4, background: T.borderL, borderRadius: 2, marginTop: 8, overflow: "hidden" }}><div style={{ width: `${Math.min(100, (idea?.thoughts || 0) / 6 * 100)}%`, height: "100%", borderRadius: 2, background: `linear-gradient(90deg,${T.purple},${T.primary})` }} /></div>
            <div style={{ fontSize: 10, color: T.textTri, marginTop: 6 }}>Promote at ~5–6</div>
          </Card>
          {data.rel?.length > 0 && <Card><Label>Related Theses</Label>{data.rel.map(t => <div key={t} onClick={() => setJT(t)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer" }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: TC[t] }} /><span style={{ fontSize: 11, fontWeight: 600, color: T.text, flex: 1 }}>{t}</span><ArrowRight size={12} color={T.primary} /></div>)}</Card>}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Sparkles size={12} color={T.purple} /><Label style={{ marginBottom: 0 }}>AI Suggestions</Label><Badge color={T.textTri} small>non-binding</Badge></div>
            <div style={{ background: T.purpleSoft, borderRadius: T.rxs, padding: 10, border: `1px solid ${T.purple}08` }}>
              <div style={{ fontSize: 11, color: T.text, lineHeight: 1.5, marginBottom: 4 }}>Freshworks clearest entry. Single-stock toe dip.</div>
              <span style={{ fontSize: 10, color: T.purple, fontWeight: 600, cursor: "pointer" }}>Start →</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function JTD({ target, setScreen, setJT }) {
  const [en, setEn] = useState(null);
  const [asS, setAsS] = useState(null);
  const [tf, setTf] = useState("all");
  const [tasks, setTasks] = useState(tdTasks);
  const data = tdMap[target];
  if (!data) return <div style={{ padding: 60, color: T.textTri }}>No data for {target}. <br/><br/>Try "Global Fintech" which has full Toe Dip data.</div>;
  const sl = data.stk, act = asS || sl.map(s => s.ticker);
  const ts = t => { if (act.length === 1 && act[0] === t) setAsS(sl.map(s => s.ticker)); else if (act.includes(t) && act.length > 1) setAsS(act.filter(s => s !== t)); else setAsS([...act, t]); };
  const tp = useMemo(() => { const r = {}; sl.forEach((s, si) => { const b = parseFloat(s.avgCost.replace(/[$,]/g, "")); r[s.ticker] = Array.from({ length: 16 }, (_, i) => b * (0.95 + Math.sin(i * .4 + si) * .08 + (s.pnlNum / 100) * (i / 15))); }); return r; }, []);
  const te = useMemo(() => { const r = {}; sl.forEach(s => { r[s.ticker] = [{ i: 6, t: "B", c: T.green, Icon: TrendingUp }, { i: 10, t: "B", c: T.green, Icon: TrendingUp }]; }); return r; }, []);
  const dn = data.pc.filter(c => c.d).length;
  return (
    <div>
      <BC stage="Toe Dip" name={target} en={en} setEn={setEn} />
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em" }}>{target}</span><StageBadge stage="Toe Dip" /></div>
          <div style={{ display: "flex", gap: 6 }}><Btn variant="green">Promote to Thesis</Btn><Btn variant="ghost">Abandon</Btn></div>
        </div>
        <div style={{ borderLeft: `2px solid ${T.teal}30`, paddingLeft: 14, marginTop: 12, fontSize: 12, color: T.textSec, lineHeight: 1.7, fontStyle: "italic" }}>{data.hyp}</div>
        <SS stocks={sl} active={act} onToggle={ts} />
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 252px", gap: 16 }}>
        <div>
          <AL tasks={tasks} onToggle={id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))} />
          <Card style={{ marginBottom: 16 }}><Label>Price & Trades</Label><MChart stocks={sl} pd={tp} ed={te} active={act} /></Card>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><Label style={{ marginBottom: 0 }}>Promotion Checklist</Label><span style={{ fontSize: 10, fontWeight: 600, color: dn >= 4 ? T.green : T.amber }}>{dn}/{data.pc.length}</span></div>
            {data.pc.map(c => <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${T.borderL}` }}><div style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${c.d ? T.green : T.border}`, background: c.d ? T.greenSoft : T.card, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.d && <Check size={9} color={T.green} strokeWidth={2.5} />}</div><span style={{ fontSize: 11, fontWeight: 500, color: c.d ? T.textTri : T.text }}>{c.l}</span></div>)}
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Label style={{ marginBottom: 0 }}>Reasoning Chain</Label>
              <div style={{ display: "flex", gap: 3 }}>
                <span onClick={() => { setTf("all"); setAsS(null); }} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: T.rxs, background: tf === "all" ? T.primary : T.bg, color: tf === "all" ? "#fff" : T.textTri, cursor: "pointer" }}>All</span>
                {sl.map(s => <span key={s.ticker} onClick={() => { setTf(s.ticker); setAsS([s.ticker]); }} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: T.rxs, background: tf === s.ticker ? s.color : T.bg, color: tf === s.ticker ? "#fff" : T.textTri, cursor: "pointer" }}>{s.ticker}</span>)}
              </div>
            </div>
            <TL events={data.tl} filter={tf} stocks={sl} />
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card>{data.wm.map((m, i) => <div key={m.l} style={{ padding: "9px 0", borderBottom: i < data.wm.length - 1 ? `1px solid ${T.borderL}` : undefined }}><div style={{ fontSize: 10, color: T.textTri, marginBottom: 3 }}>{m.l}</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ fontSize: 16, fontWeight: 700, color: m.ok ? T.green : T.amber, letterSpacing: "-.02em" }}>{m.cur}</span><span style={{ fontSize: 9, color: T.textTri }}>{m.th}</span></div>{!m.ok && <div style={{ fontSize: 9, color: T.amber, marginTop: 2, fontWeight: 500, display: "flex", alignItems: "center", gap: 3 }}><AlertTriangle size={9} />Approaching threshold</div>}</div>)}</Card>
          <Card style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${T.teal},${T.teal}30)` }} />
            <Label>Capital Deployed</Label>
            <div style={{ textAlign: "center", padding: "10px 0" }}><div style={{ fontSize: 30, fontWeight: 700, color: T.teal, letterSpacing: "-.04em" }}>$1.40M</div><div style={{ fontSize: 10, color: T.textTri, marginTop: 2 }}>5.7% of $24.7M AUM</div></div>
            <div style={{ fontSize: 10, color: T.textTri, textAlign: "center", fontStyle: "italic" }}>Typical thesis: $2–4M (8–16%)</div>
          </Card>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Brain size={12} color={T.primary} /><Label style={{ marginBottom: 0 }}>Ask AI</Label></div>
            <div style={{ background: T.bg, borderRadius: T.rxs, padding: "9px 11px", fontSize: 11, color: T.textTri, marginBottom: 8, border: `1px solid ${T.borderL}` }}>Ask about this position…</div>
            {["Is Adyen dragging conviction?", "Ready for promotion?", "Compare to Indian Consumer at this stage"].map(q => <div key={q} style={{ fontSize: 10, color: T.primary, padding: "6px 10px", background: T.primaryGlow, borderRadius: T.rxs, cursor: "pointer", marginBottom: 3, fontWeight: 500 }}>{q}</div>)}
          </Card>
        </div>
      </div>
    </div>
  );
}

function JTh({ target, setScreen }) {
  const [en, setEn] = useState(null);
  const [as, setAs] = useState(tStocks.map(s => s.ticker));
  const [tf, setTf] = useState("all");
  const [tasks, setTasks] = useState(thTasks);
  const ts = t => { if (as.length === 1 && as[0] === t) setAs(tStocks.map(s => s.ticker)); else if (as.includes(t) && as.length > 1) setAs(as.filter(s => s !== t)); else setAs([...as, t]); };
  return (
    <div>
      <BC stage="Thesis" name={target} en={en} setEn={setEn} />
      <div style={{ background: `linear-gradient(135deg,${T.redSoft},#FFF5F5)`, border: `1px solid ${T.red}15`, borderRadius: T.r, padding: 18, marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${T.red},${T.red}40)` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.red, marginBottom: 5, display: "flex", alignItems: "center", gap: 7 }}><AlertTriangle size={14} />Invalidation Trigger Fired</div>
            <div style={{ fontSize: 11, color: T.text, lineHeight: 1.65 }}>Thesis assumed DC revenue growth &gt;25%. Q4 guidance came in at +14% (miss of 12%). Your story and the numbers have diverged.</div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 18 }}><Btn onClick={() => setScreen("trade")} variant="danger" style={{ fontSize: 11 }}>Record Response</Btn><Btn variant="ghost" style={{ fontSize: 11 }}>Update Thesis</Btn></div>
        </div>
      </div>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em" }}>{target}</span><StageBadge stage="Thesis" /></div>
          <div style={{ display: "flex", gap: 18, fontSize: 12 }}><div><span style={{ color: T.textTri }}>Value </span><span style={{ fontWeight: 700 }}>$4.20M</span></div><div><span style={{ color: T.textTri }}>Cost </span><span style={{ fontWeight: 700 }}>$3.13M</span></div><div><span style={{ color: T.textTri }}>P&L </span><span style={{ fontWeight: 700, color: T.green }}>+$1.07M (+34.2%)</span></div></div>
        </div>
        <SS stocks={tStocks} active={as} onToggle={ts} />
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 252px", gap: 16 }}>
        <div>
          <AL tasks={tasks} onToggle={id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))} />
          <Card style={{ marginBottom: 16 }}>
            <Label>Price & Trades</Label>
            <MChart stocks={tStocks} pd={sPrices} ed={sEvents} active={as} />
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              {[[TrendingUp, "Buy", T.green], [TrendingDown, "Trim", T.orange], [MessageCircle, "Thought", T.purple], [Lightbulb, "Idea", T.amber], [Target, "Thesis", T.teal], [AlertTriangle, "Alert", T.red]].map(([Icon, l, c]) => <span key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: T.textTri }}><Icon size={10} color={c} />{l}</span>)}
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Label style={{ marginBottom: 0 }}>Reasoning Chain</Label>
              <div style={{ display: "flex", gap: 3 }}>
                <span onClick={() => { setTf("all"); setAs(tStocks.map(s => s.ticker)); }} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: T.rxs, background: tf === "all" ? T.primary : T.bg, color: tf === "all" ? "#fff" : T.textTri, cursor: "pointer" }}>All</span>
                {tStocks.map(s => <span key={s.ticker} onClick={() => { setTf(s.ticker); setAs([s.ticker]); }} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: T.rxs, background: tf === s.ticker ? s.color : T.bg, color: tf === s.ticker ? "#fff" : T.textTri, cursor: "pointer" }}>{s.ticker}</span>)}
              </div>
            </div>
            <TL events={tTimeline} filter={tf} stocks={tStocks} />
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${T.primary},${T.primary}30)` }} />
            <Label>Thesis</Label>
            <div style={{ borderLeft: `2px solid ${T.primary}30`, paddingLeft: 12, fontStyle: "italic", fontSize: 12, color: T.text, lineHeight: 1.7, marginBottom: 14 }}>"AI infrastructure spending is a multi-year super-cycle. Hyperscaler capex points to &gt;25% DC revenue growth through 2026."</div>
            <Label style={{ marginTop: 4 }}>Basket Performance</Label>
            {tStocks.map(s => <div key={s.ticker} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} /><span style={{ fontSize: 11, fontWeight: 600, color: T.text, width: 38 }}>{s.ticker}</span><div style={{ flex: 1, height: 3, background: T.borderL, borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${Math.min(100, Math.max(5, (s.pnlNum + 25) * 1.2))}%`, height: "100%", borderRadius: 2, background: s.pnlNum >= 0 ? `linear-gradient(90deg,${T.green},${T.teal})` : T.red }} /></div><span style={{ fontSize: 10, fontWeight: 600, color: s.pnlNum >= 0 ? T.green : T.red, width: 44, textAlign: "right" }}>{s.pnl}</span></div>)}
          </Card>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Shield size={12} color={T.red} /><Label style={{ marginBottom: 0 }}>Exit Conditions</Label></div>
            {[{ ty: "Invalidation", d: "DC growth <25% for 2 consecutive quarters. Currently 1 of 2.", f: true }, { ty: "Position Size", d: "Trim 25% if any stock exceeds 10% of AUM ($2.47M)." }, { ty: "Time Review", d: "Full basket review at 18-month mark (Apr 2025)." }].map(t => <Acc key={t.ty} title={t.ty} defaultOpen={t.f} badge={t.f ? <AlertTriangle size={11} color={T.red} /> : null} accent={t.f ? T.red : undefined}><div style={{ fontSize: 11, color: T.textSec, paddingTop: 6, lineHeight: 1.55 }}>{t.d}</div></Acc>)}
          </Card>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Brain size={12} color={T.primary} /><Label style={{ marginBottom: 0 }}>Ask AI</Label></div>
            <div style={{ background: T.bg, borderRadius: T.rxs, padding: "9px 11px", fontSize: 11, color: T.textTri, marginBottom: 8, border: `1px solid ${T.borderL}` }}>Ask about this thesis…</div>
            {["Which stock drags thesis P&L?", "What would past-me say now?", "Entry timing across all 4 stocks"].map(q => <div key={q} style={{ fontSize: 10, color: T.primary, padding: "6px 10px", background: T.primaryGlow, borderRadius: T.rxs, cursor: "pointer", marginBottom: 3, fontWeight: 500 }}>{q}</div>)}
          </Card>
        </div>
      </div>
    </div>
  );
}

function JV({ target, setScreen, setJT }) {
  const idea = ideas.find(it => it.name === target);
  if (idea?.stage === "Idea") return <JI target={target} setScreen={setScreen} setJT={setJT} />;
  if (idea?.stage === "Toe Dip") return <JTD target={target} setScreen={setScreen} setJT={setJT} />;
  return <JTh target={target} setScreen={setScreen} />;
}

function Dash({ setScreen, setJT }) {
  const [ei, setEi] = useState(null);
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        <StatCard label="Total AUM" value="$24.7M" sub="4 accounts" />
        <StatCard label="Today" value="+$183K" sub="+0.74%" accent={T.green} />
        <StatCard label="vs QQQ YTD" value="+8.2%" accent={T.green} />
        <StatCard label="Attention" value="4" sub="1 critical · 1 high · 2 medium" accent={T.amber} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 282px", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><Label style={{ marginBottom: 0 }}>What Needs Attention</Label><span style={{ fontSize: 9, color: T.textTri, fontWeight: 500 }}>Weight × Urgency</span></div>
            {attn.map((item, i) => {
              const o = ei === i;
              return (
                <div key={i} style={{ borderRadius: T.rs, overflow: "hidden", marginBottom: 5, border: `1px solid ${o ? pC[item.p] + "20" : T.borderL}`, background: o ? pC[item.p] + "06" : T.card }}>
                  <div onClick={() => setEi(o ? null : i)} style={{ padding: "11px 14px", cursor: "pointer", display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: T.rxs, background: pC[item.p] + "0A", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${pC[item.p]}12` }}>
                      {item.p === "critical" ? <AlertTriangle size={13} color={T.red} /> : item.p === "high" ? <Clock size={13} color={T.orange} /> : <Flag size={13} color={T.amber} />}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}><span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{item.ticker}</span><span style={{ fontSize: 10, color: T.textTri }}>{item.thesis}</span></div>
                      <div style={{ fontSize: 11, color: T.text, lineHeight: 1.4 }}>{item.hl}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}><Badge color={pC[item.p]} soft small>{item.tt}</Badge><span style={{ fontSize: 10, color: T.textTri }}>{item.time}</span></div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.amount}</div><div style={{ fontSize: 10, color: T.textTri }}>{item.pct}</div></div>
                    <Chev open={o} />
                  </div>
                  {o && <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${pC[item.p]}10` }}>
                    <div style={{ paddingTop: 10 }}>
                      <div style={{ fontSize: 11, color: T.textSec, lineHeight: 1.65, marginBottom: 10 }}>{item.detail}</div>
                      <Acc title="Priority logic"><div style={{ fontSize: 11, color: T.textSec, lineHeight: 1.6, paddingTop: 6, fontStyle: "italic" }}>{item.logic}</div></Acc>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}><Btn onClick={() => { setJT(item.target); setScreen("journey"); }} style={{ fontSize: 11 }}>{item.action} →</Btn></div>
                    </div>
                  </div>}
                </div>
              );
            })}
          </Card>
          <Card>
            <Label>Thesis NAV</Label>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={stackData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: T.textTri }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 9, fill: T.textTri }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: T.rs, border: `1px solid ${T.border}`, boxShadow: T.shadowMd }} formatter={v => [`$${(v / 1000).toFixed(1)}K`]} />
                {Object.entries(TC).reverse().map(([k, c]) => <Area key={k} type="monotone" dataKey={k} stackId="1" fill={c} stroke={c} fillOpacity={.6} strokeWidth={0} />)}
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              {thesesData.map(t => <span key={t.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: T.textTri, fontWeight: 500 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: TC[t.name], display: "inline-block" }} />{t.name}{t.alert && <AlertTriangle size={9} color={T.red} />}{t.stale && <Clock size={9} color={T.amber} />}</span>)}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card>
            <Label>Theses</Label>
            {thesesData.map(t => <div key={t.name} onClick={() => { setJT(t.name); setScreen("journey"); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${T.borderL}`, cursor: "pointer" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: TC[t.name], flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11, fontWeight: 600, color: T.text, display: "flex", alignItems: "center", gap: 4 }}>{t.name}{t.alert && <AlertTriangle size={9} color={T.red} />}{t.stale && <Clock size={9} color={T.amber} />}</div><div style={{ fontSize: 10, color: T.textTri }}>{t.stocks.slice(0, 3).join(", ")}</div></div>
              <div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontSize: 11, fontWeight: 700 }}>{t.value}</div><div style={{ fontSize: 10, fontWeight: 600, color: t.pnlNum >= 0 ? T.green : T.red }}>{t.pnl}</div></div>
            </div>)}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", fontSize: 11, color: T.textTri, alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 4 }}><Wallet size={12} />Cash</div><span style={{ fontWeight: 700, color: T.text }}>$10.4M</span></div>
          </Card>
          <Card>
            <Label>Ideas</Label>
            {ideas.filter(id => id.stage === "Idea").map(id => <div key={id.name} onClick={() => { setJT(id.name); setScreen("journey"); }} style={{ padding: "7px 0", borderBottom: `1px solid ${T.borderL}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{id.name}</span><StageBadge stage="Idea" /></div>
              <div style={{ fontSize: 10, color: T.textTri, marginTop: 2 }}>{id.thoughts} thoughts · {id.updated}</div>
            </div>)}
            <div onClick={() => {}} style={{ fontSize: 11, color: T.primary, fontWeight: 600, marginTop: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>All ideas <ArrowRight size={12} /></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TG({ setScreen, setJT }) {
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");
  const [ext, setExt] = useState(false);
  const [emo, setEmo] = useState(null);
  const [aTh, setATh] = useState("US AI Infrastructure");
  const demo = "I need to sell some NVDA. Q4 guidance missed by 12% — DC revenue at +14% vs my >25% assumption. Selling 400 shares (~$448K) to reduce exposure from 8.6% to 6.8% of AUM. This is the invalidation trigger I defined. Not panicking, following my rules.";
  const steps = ["Your Story", "Structure", "Self-Check", "Confirm"];
  const fs = e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 3px ${T.primary}12`; };
  const bs = e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = "none"; };
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
        {steps.map((s, i) => <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i + 1 ? T.green : step === i + 1 ? `linear-gradient(135deg,${T.primary},${T.primaryDark})` : T.bg, color: step > i + 1 || step === i + 1 ? "#fff" : T.textTri, fontSize: 11, fontWeight: 700, border: step <= i + 1 && step !== i + 1 ? `1px solid ${T.border}` : undefined, boxShadow: step === i + 1 ? `0 2px 8px ${T.primary}30` : undefined }}>{step > i + 1 ? <Check size={12} /> : i + 1}</div>
            <span style={{ fontSize: 11, fontWeight: step === i + 1 ? 700 : 500, color: step === i + 1 ? T.text : T.textTri }}>{s}</span>
          </div>
          {i < 3 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? T.green : T.borderL, margin: "0 10px" }} />}
        </div>)}
      </div>
      {step === 1 && <Card>
        <div style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em", marginBottom: 4 }}>Tell me about this trade</div>
        <div style={{ fontSize: 12, color: T.textSec, marginBottom: 20, lineHeight: 1.6 }}>In your own words. We'll extract structure together.</div>
        <textarea value={text} onChange={e => { setText(e.target.value); setExt(false); }} placeholder="What are you doing and why…" style={{ width: "100%", minHeight: 130, padding: 16, fontSize: 12, border: `1px solid ${T.border}`, borderRadius: T.rs, resize: "vertical", fontFamily: "inherit", lineHeight: 1.7, boxSizing: "border-box", color: T.text, outline: "none" }} onFocus={fs} onBlur={bs} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <span onClick={() => { setText(demo); setExt(true); }} style={{ fontSize: 11, color: T.primary, cursor: "pointer", fontWeight: 500 }}>Load example</span>
          <Btn onClick={() => setExt(true)} disabled={!text.trim()}>Extract →</Btn>
        </div>
        {ext && text && <div style={{ marginTop: 20, background: `linear-gradient(135deg,${T.purpleSoft},#F8F6FE)`, borderRadius: T.rs, padding: 18, border: `1px solid ${T.purple}10` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.purple, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Sparkles size={14} />AI Extraction</div>
          {[["Action", "Sell 400 shares"], ["Stock", "NVDA ($1,120)"], ["Value", "~$448K"], ["Trigger", "Invalidation — Q4 DC miss"], ["Tone", "Measured, rule-following"], ["Thesis", "US AI Infrastructure"]].map(([k, v]) => <div key={k} style={{ display: "flex", fontSize: 11, marginBottom: 6 }}><span style={{ width: 70, color: T.purple, fontWeight: 600, flexShrink: 0, opacity: .6 }}>{k}</span><span style={{ color: T.text, fontWeight: 500 }}>{v}</span></div>)}
          <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${T.border},transparent)`, margin: "12px 0" }} />
          <Btn onClick={() => setStep(2)} style={{ width: "100%" }}>Confirm & Continue</Btn>
        </div>}
      </Card>}
      {step === 2 && <Card>
        <div style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em", marginBottom: 20 }}>Confirm structure</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[["Stock", "NVDA"], ["Action", "Sell"], ["Shares", "400"], ["Price", "$1,120"]].map(([l, v]) => <div key={l}><Label>{l}</Label><input defaultValue={v} style={{ width: "100%", padding: "10px 12px", fontSize: 12, border: `1px solid ${T.border}`, borderRadius: T.rxs, fontFamily: "inherit", boxSizing: "border-box", color: T.text, outline: "none" }} onFocus={fs} onBlur={bs} /></div>)}
        </div>
        <Label>Thesis</Label>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 20 }}>
          {thesesData.map(t => <span key={t.name} onClick={() => setATh(t.name)} style={{ fontSize: 10, fontWeight: 600, padding: "6px 14px", borderRadius: 20, cursor: "pointer", background: aTh === t.name ? TC[t.name] + "12" : "transparent", color: aTh === t.name ? TC[t.name] : T.textTri, border: `1px solid ${aTh === t.name ? TC[t.name] + "30" : T.borderL}`, boxShadow: aTh === t.name ? `0 0 0 1px ${TC[t.name]}15` : undefined }}>{t.name}</span>)}
        </div>
        <Label>Reasoning</Label>
        <div style={{ background: T.bg, borderRadius: T.rxs, padding: 14, fontSize: 11, fontStyle: "italic", color: T.textSec, lineHeight: 1.7, borderLeft: `2px solid ${T.primary}30` }}>{text || demo}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}><Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn><Btn onClick={() => setStep(3)}>Continue</Btn></div>
      </Card>}
      {step === 3 && <Card>
        <div style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em", marginBottom: 20 }}>Self-check</div>
        <Label>Emotional state</Label>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {[["😰", "Fearful"], ["😐", "Neutral"], ["😎", "Confident"], ["🤑", "Greedy"], ["😤", "FOMO"]].map(([e, l]) => <div key={l} onClick={() => setEmo(l)} style={{ flex: 1, textAlign: "center", padding: "14px 0 10px", borderRadius: T.rs, cursor: "pointer", background: emo === l ? T.tealSoft : T.bg, border: `1px solid ${emo === l ? T.teal + "30" : T.borderL}`, boxShadow: emo === l ? `0 0 0 1px ${T.teal}20` : undefined }}><div style={{ fontSize: 24, marginBottom: 3 }}>{e}</div><div style={{ fontSize: 10, color: emo === l ? T.teal : T.textTri, fontWeight: 600 }}>{l}</div></div>)}
        </div>
        <div style={{ background: T.redSoft, borderRadius: T.rs, padding: 14, marginBottom: 10, border: `1px solid ${T.red}10` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.red, marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={12} />Position Impact</div>
          <div style={{ fontSize: 11, color: T.text, lineHeight: 1.55 }}>NVDA: 1,900 → 1,500 shares. Portfolio weight: 8.6% → 6.8% of AUM. Remaining value: ~$1.68M. Within 3–8% guideline.</div>
        </div>
        <div style={{ background: T.amberSoft, borderRadius: T.rs, padding: 14, border: `1px solid ${T.amber}10` }}><div style={{ fontSize: 11, fontWeight: 600, color: T.amber }}>Your future self reads this reasoning. Make it honest.</div></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}><Btn variant="ghost" onClick={() => setStep(2)}>Back</Btn><Btn onClick={() => setStep(4)}>Continue</Btn></div>
      </Card>}
      {step === 4 && <Card>
        <div style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-.02em", marginBottom: 4 }}>Review & confirm</div>
        <div style={{ fontSize: 12, color: T.textSec, marginBottom: 20 }}>Permanent entry in the reasoning chain.</div>
        <div style={{ background: T.bg, borderRadius: T.rs, padding: 18 }}>
          {[["Action", "Sell 400 shares NVDA"], ["Value", "~$448,000 (400 × $1,120)"], ["Thesis", "US AI Infrastructure"], ["Trigger", "Invalidation — Q4 DC revenue miss"], ["State", emo || "Neutral"], ["Impact", "8.6% → 6.8% of AUM"]].map(([k, v]) => <div key={k} style={{ display: "flex", padding: "8px 0", borderBottom: `1px solid ${T.borderL}` }}><span style={{ width: 80, fontSize: 11, color: T.textTri, flexShrink: 0, fontWeight: 500 }}>{k}</span><span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{v}</span></div>)}
          <div style={{ padding: "8px 0" }}><span style={{ fontSize: 11, color: T.textTri, fontWeight: 500 }}>Reasoning</span><div style={{ fontSize: 11, fontStyle: "italic", color: T.textSec, marginTop: 6, lineHeight: 1.65, borderLeft: `2px solid ${T.primary}25`, paddingLeft: 10 }}>{(text || demo).slice(0, 200)}…</div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}><Btn variant="ghost" onClick={() => setStep(3)}>Edit</Btn><Btn variant="green" onClick={() => { setStep(1); setText(""); setExt(false); setEmo(null); setJT("US AI Infrastructure"); setScreen("journey"); }} style={{ padding: "10px 30px", fontSize: 13 }}>Record Trade</Btn></div>
      </Card>}
    </div>
  );
}

function IS({ setScreen, setJT }) {
  const [tab, setTab] = useState("All");
  const fl = useMemo(() => { if (tab === "All") return ideas; const m = { Theses: "Thesis", "Toe Dips": "Toe Dip", Ideas: "Idea", Snoozed: "Snoozed" }; return ideas.filter(i => i.stage === m[tab]); }, [tab]);
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        <StatCard label="Theses" value="3" sub="$8.90M" accent={T.green} />
        <StatCard label="Toe Dips" value="2" sub="$4.50M" accent={T.teal} />
        <StatCard label="Ideas" value="2" sub="7 thoughts" accent={T.purple} />
        <StatCard label="Snoozed" value="2" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 262px", gap: 16 }}>
        <div>
          <div style={{ display: "flex", gap: 3, marginBottom: 14, background: T.card, borderRadius: T.rs, padding: 3, border: `1px solid ${T.border}`, width: "fit-content" }}>
            {["All", "Theses", "Toe Dips", "Ideas", "Snoozed"].map(t => <span key={t} onClick={() => setTab(t)} style={{ fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: T.rxs, cursor: "pointer", background: tab === t ? T.primary : "transparent", color: tab === t ? "#fff" : T.textTri }}>{t}</span>)}
          </div>
          {fl.map(idea => <Card key={idea.name} hover onClick={() => { setJT(idea.name); setScreen("journey"); }} style={{ marginBottom: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 14, fontWeight: 700, color: T.text, letterSpacing: "-.01em" }}>{idea.name}</span><StageBadge stage={idea.stage} />{idea.stale && <Clock size={11} color={T.amber} />}</div>
                <div style={{ fontSize: 11, color: T.textTri, fontStyle: "italic", marginBottom: 6, lineHeight: 1.45 }}>{idea.hyp}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>{idea.stocks.map(s => <Badge key={s} color={T.primary} soft small>{s}</Badge>)}</div>
                <div style={{ fontSize: 10, color: T.textTri }}>{idea.thoughts} thoughts · {idea.updated}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                {idea.value && <div style={{ fontSize: 15, fontWeight: 700, color: T.text, letterSpacing: "-.02em" }}>{idea.value}</div>}
                {idea.pnl && <div style={{ fontSize: 12, fontWeight: 600, color: idea.pnl.startsWith("+") ? T.green : T.red }}>{idea.pnl}</div>}
                {idea.snoozeDate && <Badge color={T.amber} soft small>↻ {idea.snoozeDate}</Badge>}
              </div>
            </div>
            {idea.todo && <div style={{ marginTop: 8, padding: "5px 10px", background: T.amberSoft, borderRadius: T.rxs, fontSize: 10, color: T.amber, fontWeight: 500 }}>{idea.todo}</div>}
          </Card>)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${T.purple},${T.teal} 50%,${T.green})` }} />
            <Label style={{ marginTop: 2 }}>Conviction Funnel</Label>
            {[{ l: "Thoughts", v: 47, p: 100, c: T.purple }, { l: "Ideas", v: 9, p: 58, c: T.amber }, { l: "Toe Dips", v: 2, p: 28, c: T.teal }, { l: "Theses", v: 3, p: 18, c: T.green }].map(f => <div key={f.l} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3 }}><span style={{ color: T.textTri, fontWeight: 500 }}>{f.l}</span><span style={{ fontWeight: 700, color: T.text }}>{f.v}</span></div>
              <div style={{ height: 4, background: T.borderL, borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${f.p}%`, height: "100%", background: `linear-gradient(90deg,${f.c},${f.c}80)`, borderRadius: 2 }} /></div>
            </div>)}
            <div style={{ fontSize: 10, color: T.textTri, marginTop: 4, fontWeight: 500 }}>22% → dip · 67% → thesis</div>
          </Card>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Sparkles size={12} color={T.purple} /><Label style={{ marginBottom: 0 }}>AI Suggestions</Label><Badge color={T.textTri} small>non-binding</Badge></div>
            {[{ t: "India SaaS has 4 thoughts — matches Indian Consumer at promotion (+28.4%).", n: "India SaaS Exports" }, { t: "Quantum Adjacent may overlap AI Infra thesis.", n: "Quantum Adjacent" }].map((s, i) => <div key={i} style={{ background: `linear-gradient(135deg,${T.purpleSoft},#F8F6FE)`, borderRadius: T.rxs, padding: 10, marginBottom: 5, border: `1px solid ${T.purple}08` }}>
              <div style={{ fontSize: 11, color: T.text, lineHeight: 1.5, marginBottom: 4 }}>{s.t}</div>
              <span onClick={e => { e.stopPropagation(); setJT(s.n); setScreen("journey"); }} style={{ fontSize: 10, color: T.purple, fontWeight: 600, cursor: "pointer" }}>Review →</span>
            </div>)}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [jt, setJt] = useState("US AI Infrastructure");
  const [co, setCo] = useState(false);
  const [ct, setCt] = useState("");
  const nav = [{ k: "dashboard", Icon: Sun, l: "Morning View" }, { k: "ideas", Icon: Lightbulb, l: "Ideas & Theses" }, { k: "journey", Icon: Route, l: "Journey View" }, { k: "trade", Icon: ArrowLeftRight, l: "Trade Gate" }];
  const ti = { dashboard: "Morning View", ideas: "Ideas & Theses", journey: `Journey — ${jt}`, trade: "Trade Gate" };
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter,-apple-system,system-ui,sans-serif", background: T.bg, overflow: "hidden", color: T.text }}>
      <div style={{ width: 200, background: `linear-gradient(180deg,${T.nav},${T.navS})`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-.03em" }}>GPM</div>
          <div style={{ fontSize: 9, color: "#5D6180", marginTop: 3, letterSpacing: ".08em", fontWeight: 600 }}>PORTFOLIO MANAGER</div>
        </div>
        <div style={{ flex: 1, padding: "4px 10px" }}>
          {nav.map(n => { const a = screen === n.k; const NIcon = n.Icon; return <div key={n.k} onClick={() => setScreen(n.k)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer", borderRadius: T.rs, background: a ? T.navA : "transparent", marginBottom: 1, position: "relative" }}>{a && <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2, borderRadius: 1, background: T.primary, boxShadow: `0 0 8px ${T.primary}60` }} />}<NIcon size={15} color={a ? "#8DA0FF" : "#5D6180"} strokeWidth={2} /><span style={{ fontSize: 12, fontWeight: a ? 600 : 400, color: a ? "#E2E6F4" : "#7E83A0" }}>{n.l}</span></div>; })}
        </div>
        <div style={{ padding: "14px 14px" }}>
          <button onClick={() => setCo(true)} style={{ width: "100%", padding: "11px 0", background: `linear-gradient(135deg,${T.primary},${T.primaryDark})`, color: "#fff", border: "none", borderRadius: T.rs, fontSize: 12, fontWeight: 600, cursor: "pointer", boxShadow: `0 2px 12px ${T.primary}30`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Plus size={14} />Capture Thought</button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "20px 30px 12px" }}><div style={{ fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: "-.03em" }}>{ti[screen]}</div></div>
        <div style={{ padding: "0 30px 48px" }}>
          {screen === "dashboard" && <Dash setScreen={setScreen} setJT={setJt} />}
          {screen === "journey" && <JV target={jt} setScreen={setScreen} setJT={setJt} />}
          {screen === "trade" && <TG setScreen={setScreen} setJT={setJt} />}
          {screen === "ideas" && <IS setScreen={setScreen} setJT={setJt} />}
        </div>
      </div>
      {co && <div style={{ position: "fixed", inset: 0, background: "rgba(12,14,22,.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setCo(false)}>
        <div onClick={e => e.stopPropagation()} style={{ background: T.card, borderRadius: 14, padding: 30, width: 440, boxShadow: T.shadowLg, border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 4, letterSpacing: "-.02em", display: "flex", alignItems: "center", gap: 8 }}><MessageCircle size={18} color={T.purple} />Capture Thought</div>
          <div style={{ fontSize: 12, color: T.textSec, marginBottom: 16 }}>Raw, unstructured. Tag and go.</div>
          <textarea value={ct} onChange={e => setCt(e.target.value)} placeholder="What's on your mind…" style={{ width: "100%", minHeight: 90, padding: 14, fontSize: 12, border: `1px solid ${T.border}`, borderRadius: T.rs, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", color: T.text, lineHeight: 1.6, outline: "none" }} onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 3px ${T.primary}12`; }} onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = "none"; }} />
          <Label style={{ marginTop: 14 }}>Type</Label>
          <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
            {["Info", "Trend", "Assumption", "Question", "Todo"].map(t => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "5px 12px", borderRadius: T.rs, background: T.bg, color: T.textTri, cursor: "pointer", border: `1px solid ${T.borderL}` }}>{t}</span>)}
          </div>
          {ct.length > 10 && <div style={{ background: `linear-gradient(135deg,${T.purpleSoft},#F8F6FE)`, borderRadius: T.rs, padding: 12, marginBottom: 14, border: `1px solid ${T.purple}08` }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.purple, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><Sparkles size={10} />AI suggestion</div>
            <div style={{ fontSize: 11, color: T.text }}>Matches "India SaaS Exports"</div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}><span style={{ fontSize: 10, color: T.purple, fontWeight: 600, cursor: "pointer" }}>Add →</span><span style={{ fontSize: 10, color: T.textTri, cursor: "pointer" }}>New</span><span style={{ fontSize: 10, color: T.textTri, cursor: "pointer" }}>Dismiss</span></div>
          </div>}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}><Btn variant="ghost" onClick={() => { setCo(false); setCt(""); }}>Cancel</Btn><Btn onClick={() => { setCo(false); setCt(""); }}>Save</Btn></div>
        </div>
      </div>}
    </div>
  );
}