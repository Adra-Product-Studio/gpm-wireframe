import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sun, Lightbulb, Route, ArrowLeftRight, MessageCircle, Target, TrendingUp, TrendingDown, Eye, BookOpen, Search, PenTool, Calendar, RefreshCw, Zap, Scale, AlertTriangle, Clock, Wallet, Sparkles, ChevronDown, Check, Plus, ArrowRight, Droplets, BarChart3, Shield, Brain, Flag, CheckCircle2 } from "lucide-react";

const T = {
  bg:"#F4F5F9",card:"#FFFFFF",nav:"#0C0E16",navS:"#13151F",navA:"#1A1D2A",
  primary:"#4F6DF5",primaryDark:"#3B55D4",primaryMuted:"#4F6DF510",
  primaryGlow:"#4F6DF518",text:"#15171E",textSec:"#5C6178",textTri:"#9298B0",
  green:"#12946B",greenSoft:"#E6F5EE",red:"#CF3838",redSoft:"#FDF0F0",
  amber:"#B8850F",amberSoft:"#FBF5E6",orange:"#C95D28",
  purple:"#6F4FF2",purpleSoft:"#F0EDFE",teal:"#0E847A",tealSoft:"#E8F5F3",
  border:"#E4E6EE",borderL:"#EDEFF5",borderF:"#4F6DF530",
  shadow:"0 1px 2px rgba(0,0,0,0.03)",
  shadowMd:"0 4px 16px rgba(0,0,0,0.06)",
  shadowLg:"0 16px 48px rgba(0,0,0,0.12)",r:12,rs:8,rxs:5,
};

const TC = {
  "US AI Infrastructure":"#4F6DF5","Japan Tech Revival":"#0E847A",
  "Indian Consumer Boom":"#6F4FF2","European Defense":"#C95D28",
  "Global Fintech":"#12946B","Clean Energy":"#B8850F"
};

const taskIcons = {
  watch:{Icon:Eye,c:T.primary},read:{Icon:BookOpen,c:T.purple},
  evaluate:{Icon:Search,c:T.amber},define:{Icon:PenTool,c:T.teal},
  plan:{Icon:Calendar,c:T.orange},buy:{Icon:TrendingUp,c:T.green},
  sell:{Icon:TrendingDown,c:T.orange},review:{Icon:RefreshCw,c:T.primary},
  respond:{Icon:Zap,c:T.red},rebalance:{Icon:Scale,c:T.amber}
};

function Label({children,style}){
  return <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",color:T.textTri,marginBottom:8,...style}}>{children}</div>;
}

function Card({children,style,onClick,hover,glow}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick}
    style={{background:T.card,borderRadius:T.r,
      border:"1px solid "+(h&&hover?T.borderF:T.border),padding:20,
      boxShadow:h&&hover?T.shadowMd:glow?("0 0 0 1px "+glow+"15, "+T.shadow):T.shadow,
      transition:"all .25s ease",cursor:onClick?"pointer":"default",...style}}>
    {children}
  </div>;
}

function Badge({children,color,soft,small,glow}){
  return <span style={{fontSize:small?9:10,fontWeight:600,
    padding:small?"1px 7px":"3px 10px",borderRadius:20,
    background:soft?(color+"12"):T.borderL,color:color||T.textSec,
    whiteSpace:"nowrap",letterSpacing:"0.02em",
    boxShadow:glow?("0 0 8px "+color+"20"):undefined}}>
    {children}
  </span>;
}

function Btn({children,onClick,variant="primary",style,disabled}){
  const[h,setH]=useState(false);
  const styles = {
    primary:{background:h?T.primaryDark:("linear-gradient(135deg,"+T.primary+","+T.primaryDark+")"),color:"#fff",border:"none",boxShadow:"0 2px 8px "+T.primary+"20"},
    green:{background:h?"#0D7F5C":("linear-gradient(135deg,"+T.green+",#0D7F5C)"),color:"#fff",border:"none",boxShadow:"0 2px 8px "+T.green+"20"},
    ghost:{background:h?T.borderL:"transparent",color:T.textSec,border:"1px solid "+T.border,boxShadow:"none"},
    danger:{background:h?"#FDE8E8":T.redSoft,color:T.red,border:"1px solid "+T.red+"15",boxShadow:"none"},
    subtle:{background:h?T.primaryMuted:"transparent",color:T.primary,border:"none",boxShadow:"none"}
  };
  return <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    onClick={disabled?undefined:onClick}
    style={{fontSize:12,fontWeight:600,padding:"8px 18px",borderRadius:T.rs,
      cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.4:1,
      transition:"all .2s ease",...styles[variant],...style}}>
    {children}
  </button>;
}

function StatCard({label,value,sub,accent}){
  return <Card style={{flex:1,minWidth:0,padding:"16px 18px",position:"relative",overflow:"hidden"}}>
    {accent && <div style={{position:"absolute",top:0,left:0,right:0,height:2,
      background:"linear-gradient(90deg,"+accent+","+accent+"40)"}}/>}
    <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",
      letterSpacing:".08em",color:T.textTri,marginBottom:6}}>{label}</div>
    <div style={{fontSize:24,fontWeight:700,color:accent||T.text,
      lineHeight:1.1,letterSpacing:"-.03em"}}>{value}</div>
    {sub && <div style={{fontSize:11,color:accent?(accent+"CC"):T.textTri,
      marginTop:4,fontWeight:500}}>{sub}</div>}
  </Card>;
}

function StageBadge({stage}){
  const m={Thesis:T.green,"Toe Dip":T.teal,Idea:T.purple,Snoozed:T.textTri};
  return <Badge color={m[stage]} soft glow>{stage}</Badge>;
}

function Chev({open}){
  return <ChevronDown size={14} style={{transition:"transform .25s ease",
    transform:open?"rotate(180deg)":"none",opacity:0.3}}/>;
}

function Acc({title,defaultOpen=false,badge,children,accent}){
  const[open,setOpen]=useState(defaultOpen);
  return <div style={{borderRadius:T.rxs,marginBottom:4,
    background:open?T.bg:T.card,
    border:"1px solid "+(open?T.border:T.borderL),
    borderLeft:accent?("2px solid "+accent):undefined}}>
    <div onClick={()=>setOpen(!open)} style={{padding:"10px 12px",cursor:"pointer",
      display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
        <span style={{fontSize:12,fontWeight:600,color:T.text}}>{title}</span>{badge}
      </div>
      <Chev open={open}/>
    </div>
    {open && <div style={{padding:"0 12px 12px"}}>{children}</div>}
  </div>;
}

/* === DATA === */
const thesesData = [
  {name:"US AI Infrastructure",value:"$4.20M",pnl:"+34.2%",pnlNum:34.2,
    stocks:["NVDA","MSFT","AMD","SMCI"],alert:true},
  {name:"Indian Consumer Boom",value:"$2.80M",pnl:"+28.4%",pnlNum:28.4,
    stocks:["HDFC","BajFin","AsianPaint"]},
  {name:"European Defense",value:"$1.90M",pnl:"+41.3%",pnlNum:41.3,
    stocks:["Airbus","Rheinmetall","SAAB"]},
  {name:"Clean Energy",value:"$0.90M",pnl:"-3.1%",pnlNum:-3.1,
    stocks:["ENPH","NEE","Vestas"]},
  {name:"Japan Tech Revival",value:"$340K",pnl:"+12.1%",pnlNum:12.1,
    stocks:["Sony","SoftBank","Keyence"],stale:true,toedip:true},
  {name:"Global Fintech",value:"$301K",pnl:"-5.3%",pnlNum:-5.3,
    stocks:["Nu","Adyen","Wise"],toedip:true},
];

const tStocks = [
  {ticker:"NVDA",name:"NVIDIA",value:"$2.13M",pnl:"+66.1%",pnlNum:66.1,
    weight:"50.7%",shares:"1,900",avgCost:"$674",alert:true,color:"#4F6DF5"},
  {ticker:"MSFT",name:"Microsoft",value:"$1.18M",pnl:"+22.7%",pnlNum:22.7,
    weight:"28.1%",shares:"2,800",avgCost:"$343",color:"#7B93F7"},
  {ticker:"AMD",name:"AMD",value:"$0.59M",pnl:"+20.2%",pnlNum:20.2,
    weight:"14.0%",shares:"4,000",avgCost:"$122",color:"#A8B8FA"},
  {ticker:"SMCI",name:"Super Micro",value:"$0.30M",pnl:"-23.8%",pnlNum:-23.8,
    weight:"7.3%",shares:"800",avgCost:"$500",color:"#C8D2FC"},
];

const attn = [
  {
    p:"critical",ticker:"NVDA",priceNow:"$1,120",pricePrev:"$1,192",
    priceChange:"-6.0%",priceDir:"down",period:"5d",
    thesis:"US AI Infrastructure",thesisColor:TC["US AI Infrastructure"],
    amount:"$2.13M",pct:"8.6%",
    hl:"NVDA down 6% in 5 days - largest single position",
    storyChain:[
      {label:"Your thesis says",
        text:"AI infrastructure spending is a multi-year super-cycle. Hyperscaler capex implies >25% DC revenue growth through 2026."},
      {label:"What this move touches",
        text:"NVDA is 50.7% of US AI thesis ($2.13M of $4.20M). This 6% drop wiped ~$128K in 5 days. The drop coincides with Q4 guidance showing DC revenue at +14% - below your >25% threshold."},
      {label:"Story chain context",
        text:"You bought NVDA in 3 tranches (Oct 23 to Sep 24) at avg $674. You trimmed 200 shares at $1,100 in Jun 24 when it hit 8% of AUM. Still up +66% overall, but the trend is against the core assumption for the first time."},
      {label:"Your exit condition",
        text:"DC growth <25% for 2 consecutive quarters triggers full review. This is quarter 1 of 2. Q1 earnings (Apr 25) is the deciding quarter."}
    ],
    action:"Review Thesis",target:"US AI Infrastructure"
  },
  {
    p:"high",ticker:"Rheinmetall",priceNow:"EUR714",pricePrev:"EUR648",
    priceChange:"+10.2%",priceDir:"up",period:"7d",
    thesis:"European Defense",thesisColor:TC["European Defense"],
    amount:"$0.72M",pct:"2.9%",
    hl:"Rheinmetall surging +10% in a week - thesis accelerating",
    storyChain:[
      {label:"Your thesis says",
        text:"NATO structural spending increase is a multi-year tailwind. European defense budgets moving from 1.5% to 2%+ of GDP creates a capex super-cycle for EU defense primes."},
      {label:"What this move touches",
        text:"Rheinmetall is ~38% of your European Defense thesis. The +10% move added ~$67K this week alone. Thesis is now your best performer at +41.3%."},
      {label:"Story chain context",
        text:"You entered Rheinmetall early in the NATO spend ramp. The acceleration is consistent with your thesis - but the position is now significantly above your original sizing plan."},
      {label:"Worth considering",
        text:"European Defense is at $1.90M (7.7% of AUM). If Rheinmetall keeps running, this thesis could approach your 10% concentration limit. You trimmed NVDA at similar weight. Same discipline here?"}
    ],
    action:"View Thesis",target:"European Defense"
  },
  {
    p:"medium",ticker:"ENPH",priceNow:"$68",pricePrev:"$78",
    priceChange:"-12.8%",priceDir:"down",period:"14d",
    thesis:"Clean Energy",thesisColor:TC["Clean Energy"],
    amount:"$0.35M",pct:"1.4%",
    hl:"ENPH sliding steadily - Clean Energy thesis now -3.1%",
    storyChain:[
      {label:"Your thesis says",
        text:"Green transition capex cycle creates structural demand for solar, wind, and grid infrastructure. Residential solar is the high-growth wedge."},
      {label:"What this move touches",
        text:"ENPH is ~39% of Clean Energy thesis. This is the 3rd consecutive down week. Thesis P&L has gone from +2.1% to -3.1% in a month."},
      {label:"Story chain context",
        text:"You started Clean Energy with high conviction on IRA tailwinds. But interest rates have pressured consumer solar financing - the demand driver you bet on. Your 5 thoughts have not been updated in 2 weeks."},
      {label:"Your exit condition",
        text:"No formal invalidation trigger set for Clean Energy. This is a gap - your other theses all have defined exit conditions. Consider writing one."}
    ],
    action:"Update Thesis",target:"Clean Energy"
  },
  {
    p:"medium",ticker:"Adyen",priceNow:"EUR1,520",pricePrev:"EUR1,574",
    priceChange:"-3.4%",priceDir:"down",period:"10d",
    thesis:"Global Fintech",thesisColor:TC["Global Fintech"],
    amount:"$61K",pct:"0.2%",
    hl:"Adyen drifting lower - take rate approaching your threshold",
    storyChain:[
      {label:"Your thesis says",
        text:"LatAm + European digital banking is at US-2015 penetration levels. Adyen represents the European payments infrastructure bet."},
      {label:"What this move touches",
        text:"Adyen is 20% of your Global Fintech toe dip ($61K of $301K). Your take rate watch metric is at 0.218%, approaching the 0.20% floor."},
      {label:"Story chain context",
        text:"You opened Adyen at $1,720 in Oct 24. Now -11.6%. Your Jan 25 thought flagged margin compression concerns. The price is confirming the worry."},
      {label:"Toe dip status",
        text:"Global Fintech: 4 months, no promotion checklist progress - no thesis statement, no exit conditions, no sizing plan. The drop is a prompt to decide: commit or cut."}
    ],
    action:"Review Toe Dip",target:"Global Fintech"
  },
  {
    p:"low",ticker:"SoftBank",priceNow:"$55",pricePrev:"$52",
    priceChange:"+5.8%",priceDir:"up",period:"3d",
    thesis:"Japan Tech Revival",thesisColor:TC["Japan Tech Revival"],
    amount:"$138K",pct:"0.6%",
    hl:"SoftBank bouncing +5.8% - but thesis is 23 days stale",
    storyChain:[
      {label:"Your thesis says",
        text:"Japanese corporate governance reform + weak yen = re-rating opportunity for tech/industrial names."},
      {label:"What this move touches",
        text:"SoftBank is 40% of the Japan Tech toe dip. The +5.8% bounce adds ~$8K. But yen is at 158.4, above your 145-155 comfort range."},
      {label:"Story chain context",
        text:"You have not updated this thesis in 23 days. The position is small ($340K) but going stale means you are holding without active conviction."},
      {label:"Worth considering",
        text:"A bounce in a stale thesis is a decision prompt: re-engage and update your view, or trim into strength while you are still up +12.1%."}
    ],
    action:"Update Thesis",target:"Japan Tech Revival"
  },
];

const pC = {critical:T.red,high:T.orange,medium:T.amber,low:T.textTri};

const stackData = Array.from({length:26},(_,i) => {
  const m = i/25;
  return {
    date:"W"+(i+1),
    "US AI Infrastructure":2800+m*1400+Math.sin(i*.5)*200,
    "Japan Tech Revival":240+m*70+Math.cos(i*.3)*15,
    "Indian Consumer Boom":1800+m*1000+Math.sin(i*.4)*100,
    "European Defense":1100+m*800+Math.cos(i*.6)*80,
    "Global Fintech":280-m*20+Math.sin(i*.7)*12,
    "Clean Energy":1000-m*100+Math.cos(i*.5)*60
  };
});

const sPrices = {
  NVDA:[480,510,545,590,640,700,780,860,940,1050,1120,1060,980,1020,1080,1120],
  MSFT:[345,350,358,365,372,380,390,398,405,410,420,415,408,418,425,421],
  AMD:[110,115,120,128,135,142,138,145,152,148,155,140,130,138,145,147],
  SMCI:[280,310,350,420,480,520,580,620,550,480,420,380,340,360,385,381]
};

const sEvents = {
  NVDA:[{i:0,t:"T",c:T.purple},{i:3,t:"L",c:T.amber},{i:4,t:"B",c:T.green},
    {i:5,t:"O",c:T.teal},{i:6,t:"B",c:T.green},{i:10,t:"S",c:T.orange},
    {i:12,t:"B",c:T.green},{i:15,t:"!",c:T.red}],
  MSFT:[{i:5,t:"B",c:T.green},{i:9,t:"B",c:T.green}],
  AMD:[{i:6,t:"B",c:T.green},{i:11,t:"B",c:T.green}],
  SMCI:[{i:4,t:"B",c:T.green},{i:7,t:"B",c:T.green},{i:10,t:"S",c:T.orange}]
};

const tTimeline = [
  {date:"Oct 23",type:"thought",Icon:MessageCircle,color:T.purple,
    title:"Call with Rajesh K - DC buildout",
    detail:"Data center buildout accelerating. Hyperscaler capex 2-3x current.",stocks:[]},
  {date:"Oct 23",type:"thought",Icon:MessageCircle,color:T.purple,
    title:"Jensen keynote - inference demand",
    detail:"Inference matching training workloads. Revenue durability.",stocks:[]},
  {date:"Nov 23",type:"thought",Icon:MessageCircle,color:T.purple,
    title:"TSMC supply chain check",
    detail:"CoWoS capacity booked through Q3 24. Packaging moat widening.",stocks:[]},
  {date:"Nov 23",type:"idea",Icon:Lightbulb,color:T.amber,
    title:"Idea formed: AI Infra Buildout",
    detail:"3 thoughts -> hypothesis: AI infrastructure is a multi-year cycle.",stocks:[]},
  {date:"Jan 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"NVDA Toe Dip - 500 @ $480",
    detail:"Testing thesis. $240K skin in the game.",badge:"Neutral",size:"$240K",stocks:["NVDA"]},
  {date:"Feb 24",type:"thesis",Icon:Target,color:T.teal,
    title:"Thesis created: US AI Infrastructure",
    detail:"Q4 confirmed >25% DC growth. Plan: scale to ~$4M.",stocks:[]},
  {date:"Feb 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"MSFT - 1,500 @ $380",
    detail:"Azure AI acceleration.",badge:"Confident",size:"$570K",stocks:["MSFT"]},
  {date:"Mar 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"NVDA Full conviction - 700 @ $780",
    detail:"Blackwell demand confirmed.",badge:"Confident",size:"$546K",stocks:["NVDA"]},
  {date:"Mar 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"AMD - 2,500 @ $125",
    detail:"MI300X gaining traction.",size:"$313K",stocks:["AMD"]},
  {date:"Mar 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"SMCI - 600 @ $480",
    detail:"Server rack buildout play.",size:"$288K",stocks:["SMCI"]},
  {date:"May 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"SMCI Add - 400 @ $530",
    detail:"Revenue beat confirmed server demand.",size:"$212K",stocks:["SMCI"]},
  {date:"Jun 24",type:"trim",Icon:TrendingDown,color:T.orange,
    title:"NVDA Trim - 200 @ $1,100",
    detail:"Position approaching 8% of AUM.",badge:"Neutral",size:"$220K",stocks:["NVDA"]},
  {date:"Jul 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"MSFT Add - 1,300 @ $301",
    detail:"Azure re-accelerating after pullback.",size:"$391K",stocks:["MSFT"]},
  {date:"Sep 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"NVDA Dip - 900 @ $700",
    detail:"Export control selloff = sentiment, not fundamentals.",badge:"Confident",size:"$630K",stocks:["NVDA"]},
  {date:"Oct 24",type:"trim",Icon:TrendingDown,color:T.orange,
    title:"SMCI Trim - 200 @ $420",
    detail:"Accounting red flags.",badge:"Fearful",size:"$84K",stocks:["SMCI"]},
  {date:"Nov 24",type:"thought",Icon:MessageCircle,color:T.purple,
    title:"AMD MI300X competitive concern",
    detail:"Mixed reviews. NVDA Blackwell widening gap.",stocks:["AMD"]},
  {date:"Nov 24",type:"buy",Icon:TrendingUp,color:T.green,
    title:"AMD Dip - 1,500 @ $117",
    detail:"Valuation compelling despite concern.",size:"$176K",stocks:["AMD"]},
  {date:"Jan 25",type:"alert",Icon:AlertTriangle,color:T.red,
    title:"Alert: NVDA Q4 guidance miss 12%",
    detail:"DC revenue guidance +14% vs >25% thesis.",stocks:["NVDA"]},
];

const thTasks = [
  {id:"t1",type:"respond",title:"NVDA -6.0% in 5d — revisit your $700 dip buy",
    stock:"NVDA",due:"Today",dueStatus:"overdue",done:false,
    price:{now:"$1,120",prev:"$1,192",chg:"-6.0%",period:"5d",dir:"down"},
    detail:"NVDA dropped from $1,192 to $1,120 this week. You hold 1,900 shares at avg $674, still up +66%, but the drop erased ~$137K in value.",
    context:"Sep 24: You bought 900 @ $700 writing \"Export control selloff = sentiment, not fundamentals. Confident.\" That conviction is being tested — is this another sentiment dip, or has something changed?",
    action:"Open Trade Gate"},
  {id:"t2",type:"review",title:"SMCI -4.1% in 3d — extends your worst position",
    stock:"SMCI",due:"Today",dueStatus:"urgent",done:false,
    price:{now:"$381",prev:"$397",chg:"-4.1%",period:"3d",dir:"down"},
    detail:"SMCI now at $381, down from your avg cost of $500. Position is -23.8% ($95K loss). Smallest holding at 7.3% of thesis but largest drag.",
    context:"Oct 24: You trimmed 200 shares @ $420 writing \"Accounting red flags. Fearful.\" Price has fallen another 9% since that trim. Your instinct to de-risk was right — but 800 shares remain."},
  {id:"t3",type:"evaluate",title:"AMD +3.2% while NVDA drops — divergence widening",
    stock:"AMD",due:"This week",done:false,
    price:{now:"$147",prev:"$142",chg:"+3.2%",period:"5d",dir:"up"},
    detail:"AMD up +3.2% in the same week NVDA fell -6%. Your AMD position is +20.2% vs NVDA +66.1%, but AMD is showing relative strength right now.",
    context:"Nov 24: You bought 1,500 more @ $117 despite writing \"MI300X competitive concern. Mixed reviews.\" You called it \"valuation compelling despite concern\" — the divergence from NVDA suggests the market may be rotating."},
  {id:"t4",type:"rebalance",title:"MSFT flat at $421 — thesis weight drifting",
    stock:"MSFT",due:"This week",done:false,
    price:{now:"$421",prev:"$418",chg:"+0.7%",period:"5d",dir:"up"},
    detail:"MSFT barely moved (+0.7%) while NVDA dropped 6%. NVDA is now 50.7% of the thesis vs your 40% target. The NVDA drop actually helped rebalance, but the thesis is still NVDA-heavy.",
    context:"Feb 24: You opened MSFT at $380 writing \"Azure AI acceleration. Confident.\" Jul 24: Added 1,300 more at $301 on \"Azure re-accelerating after pullback.\" Both entries were on Azure conviction — that story is intact at +22.7%."},
  {id:"t5",type:"watch",title:"NVDA approaching your Jun 24 trim level",
    stock:"NVDA",due:"Watch",done:false,
    price:{now:"$1,120",prev:"$1,192",chg:"-6.0%",period:"5d",dir:"down"},
    detail:"NVDA at $1,120, getting close to the $1,100 level where you trimmed 200 shares in Jun 24. If it falls below, your trim was well-timed. If it bounces, the pattern holds.",
    context:"Jun 24: You sold 200 @ $1,100 writing \"Position approaching 8% of AUM. Selling into strength. Neutral.\" That discipline preserved $220K. You are at 8.6% of AUM again now."},
  {id:"t6",type:"buy",title:"Reviewed NVDA Jan 24 toe dip entry at $480",
    done:true,
    price:{now:"$1,120",chg:"+133%",period:"since entry",dir:"up"},
    detail:"Your original 500 shares at $480 are now worth $560K, up 133%. The toe dip worked.",
    context:"Jan 24: \"Testing thesis. $240K skin in the game before Q4 earnings. Neutral.\""},
  {id:"t7",type:"rebalance",title:"Confirmed Jun 24 trim was correctly sized",
    done:true,
    price:{now:"$1,120",chg:"n/a",period:"",dir:"up"},
    detail:"Post-trim rebalance verified. NVDA went from 8.2% to 7.4% of AUM after the trim, then grew back to 8.6%.",
    context:"Jun 24 trim of 200 shares at $1,100 followed your position size rule."},
];

const tdTasks = [
  {id:"td1",type:"respond",title:"Adyen -3.4% in 10d — deepening your worst toe dip",
    stock:"Adyen",due:"Today",dueStatus:"overdue",done:false,
    price:{now:"EUR1,520",prev:"EUR1,574",chg:"-3.4%",period:"10d",dir:"down"},
    detail:"Adyen at EUR1,520, now -11.6% from your EUR1,720 entry. Position is $61K (20% of toe dip). This is the 3rd leg down since you opened.",
    context:"Oct 24: You bought 40 shares @ $1,720 writing \"Margin compression dip. Small size.\" Jan 25: You noted \"Adyen margin concern. Take rate declining. May need longer timeline.\" The price is confirming your own worry."},
  {id:"td2",type:"watch",title:"Nu flat at $12.62 — holding near your entry",
    stock:"Nu",due:"This week",dueStatus:"urgent",done:false,
    price:{now:"$12.62",prev:"$12.70",chg:"-0.6%",period:"5d",dir:"down"},
    detail:"Nu barely moved, hovering 3.7% below your $13.10 avg cost. Largest toe dip position at $151K (50% of total). NPL at 5.2%, up from 4.8%.",
    context:"Oct 24: You opened 12,000 shares @ $13.10 writing \"Starting position. Neutral.\" Your conviction was cautious from day one — but you sized it as the biggest piece. Credit quality drifting the wrong way while price goes nowhere."},
  {id:"td3",type:"evaluate",title:"Wise +1.8% in 5d — lone bright spot",
    stock:"Wise",due:"This week",done:false,
    price:{now:"$11.10",prev:"$10.90",chg:"+1.8%",period:"5d",dir:"up"},
    detail:"Wise ticking up slightly to $11.10, still -3.5% from your $11.50 entry. Volume growth at +32% YoY is the one metric clearly above threshold.",
    context:"Nov 24: You bought 8,000 @ $11.50 writing \"Cross-border payments test.\" Wise is the only position where the operating metrics match the thesis. Is this the one you should concentrate into if you promote?"},
  {id:"td4",type:"define",title:"All 3 positions below cost — write your exit line",
    due:"Before any add",done:false,
    price:{now:"$301K",prev:"$318K",chg:"-5.3%",period:"since entry",dir:"down"},
    detail:"Total toe dip cost $318K, now worth $301K. All three positions are underwater. You have been in this toe dip for 4 months with no exit conditions written.",
    context:"You opened all three positions in Oct-Nov 24 as a group test. At this stage of Indian Consumer (your best thesis), you had already written invalidation conditions and a sizing plan. This toe dip has neither."},
  {id:"td5",type:"buy",title:"Initial 3-position toe dip deployed",
    done:true,
    price:{now:"$301K",chg:"-5.3%",period:"4 months",dir:"down"},
    detail:"Nu $157K + Adyen $69K + Wise $92K = $318K deployed across 3 positions to test conviction.",
    context:"Entered as a group: LatAm consumer banking (Nu), European payments infra (Adyen), cross-border flow (Wise). Each testing a different angle of the fintech thesis."},
];

const idTasks = {
  "India SaaS Exports":[
    {id:"i1",type:"watch",title:"Freshworks +7.2% in 10d — approaching toe dip zone",
      stock:"Freshworks",due:"This week",dueStatus:"urgent",done:false,
      price:{now:"$15.80",prev:"$14.74",chg:"+7.2%",period:"10d",dir:"up"},
      detail:"Freshworks rallying to $15.80 on ARR re-acceleration. This is the stock you flagged as most likely toe dip entry. Moving away from you.",
      context:"Dec 24: You wrote \"Freshworks ARR re-acceleration. Q3: 22% ARR, enterprise mix 48%.\" You have not defined an entry price. If you wait for a pullback that does not come, you miss the setup your own research identified."},
    {id:"i2",type:"evaluate",title:"Zoho peer Freshworks diverging — validate gap",
      stock:"Zoho",due:"2 weeks",done:false,
      price:{now:"Private",prev:"n/a",chg:"n/a",period:"",dir:"up"},
      detail:"Freshworks (public) up 7.2% while Zoho remains private. Your thesis groups them, but you can only act on Freshworks. Is a single-stock toe dip enough to test this thesis?",
      context:"Dec 24: You wrote \"Zoho deep-dive. $1B+ rev, 45%+ margins, bootstrapped.\" Jan 25: \"Postman API economy. 30M+ devs.\" Three of your four thoughts are on private companies. Freshworks may be the only actionable entry."},
    {id:"i3",type:"define",title:"Freshworks running — write entry criteria before FOMO",
      due:"Before trade",done:false,
      price:{now:"$15.80",prev:"$14.74",chg:"+7.2%",period:"10d",dir:"up"},
      detail:"You have 4 coherent thoughts but no written entry price, position size, or invalidation trigger. Indian Consumer had all three before its first trade.",
      context:"Pattern from your best thesis: Indian Consumer Boom was promoted with 4 thoughts AND written criteria. You matched the thought count but not the discipline. Write the rules before the price forces your hand."},
    {id:"i4",type:"watch",title:"Zoho IPO signals — private market monitoring",
      stock:"Zoho",due:"Ongoing",done:false,
      price:{now:"Private",prev:"n/a",chg:"n/a",period:"",dir:"up"},
      detail:"No public price to track. Monitoring for IPO timeline or secondary market activity that would give you a second actionable stock for this thesis.",
      context:"Jan 25: \"IT services to SaaS rotation. Talent flowing to product companies.\" This structural shift supports both Freshworks and Zoho, but only one is tradeable today."},
    {id:"i5",type:"read",title:"Confirmed structural shift supports thesis",
      done:true,
      price:{now:"n/a",chg:"n/a",period:"",dir:"up"},
      detail:"McKinsey IT-to-SaaS report validates the talent and revenue rotation you identified.",
      context:"This was the background research that gave you confidence in thought #3 (IT services to SaaS rotation)."},
  ],
  "Quantum Adjacent":[
    {id:"q1",type:"watch",title:"IONQ -12.4% in 14d — speculative names pulling back",
      stock:"IONQ",due:"This week",done:false,
      price:{now:"$32.10",prev:"$36.65",chg:"-12.4%",period:"14d",dir:"down"},
      detail:"IONQ dropping from $36.65 to $32.10. Still at ~80x revenue. The pullback makes it less expensive but the valuation remains speculative.",
      context:"Jan 25: You noted \"IONQ x Hyundai. Commercial deal.\" A commercial partnership is real, but one deal does not justify 80x. Your own thought was observational, not conviction-building."},
    {id:"q2",type:"evaluate",title:"Map QC supply chain before any price chase",
      due:"Next month",done:false,
      price:{now:"n/a",chg:"n/a",period:"",dir:"up"},
      detail:"You want picks-and-shovels, not qubit bets. But you have not identified the supply chain companies yet. Until you do, price moves on IONQ and Rigetti are noise.",
      context:"Jan 25: \"Cryo cooling sizing. $2B market by 2028.\" This was your most investable thought — it points to infrastructure, not qubit makers. Find the cryo companies before watching stock tickers."},
    {id:"q3",type:"read",title:"Google Willow implications still unprocessed",
      due:"This week",done:false,
      price:{now:"n/a",chg:"n/a",period:"",dir:"up"},
      detail:"Your first thought (Google Willow 105-qubit error correction) was exciting but you have not done the deep read yet. 3 thoughts, direction unclear.",
      context:"Jan 25: \"Google Willow breakthrough. 105-qubit error correction.\" This is the thought that started the idea, but you flagged it as a headline, not analysis. Read the paper before the idea stalls."},
  ],
};

const ideaMap = {
  "India SaaS Exports":{
    hyp:"Indian SaaS capturing global enterprise share at structurally lower cost.",
    wl:["Freshworks","Zoho","Druva","Postman"],
    tl:[
      {date:"Dec 24",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"Freshworks ARR re-acceleration",detail:"Q3: 22% ARR, enterprise mix 48%."},
      {date:"Dec 24",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"Zoho deep-dive",detail:"$1B+ rev, 45%+ margins."},
      {date:"Jan 25",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"IT services to SaaS rotation",detail:"Talent flowing to product companies."},
      {date:"Jan 25",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"Postman API economy",detail:"30M+ devs."},
    ],
    sig:[
      {l:"Thought coherence",v:"High",c:T.green,d:"4 in 3 weeks, reinforcing."},
      {l:"Pattern match",v:"Strong",c:T.green,d:"Indian Consumer promoted at 4 thoughts."},
      {l:"Actionability",v:"Medium",c:T.amber,d:"2 public stocks."},
      {l:"Risk clarity",v:"Low",c:T.red,d:"No invalidation conditions."},
    ],
    rel:["US AI Infrastructure"]
  },
  "Quantum Adjacent":{
    hyp:"Quantum infrastructure picks-and-shovels.",
    wl:["IONQ","Rigetti","Quantinuum"],
    tl:[
      {date:"Jan 25",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"Google Willow breakthrough",detail:"105-qubit error correction."},
      {date:"Jan 25",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"Cryo cooling sizing",detail:"$2B market by 2028."},
      {date:"Feb 25",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"IONQ x Hyundai",detail:"Commercial deal."},
    ],
    sig:[
      {l:"Coherence",v:"Medium",c:T.amber,d:"3 thoughts, direction unclear."},
      {l:"Pattern",v:"Weak",c:T.orange,d:"No prior promoted at 3."},
      {l:"Actionability",v:"Low",c:T.red,d:"Speculative targets."},
    ],
    rel:["US AI Infrastructure"]
  },
};

const tdMap = {
  "Global Fintech":{
    hyp:"LatAm + European digital banking at US-2015 penetration.",
    stk:[
      {ticker:"Nu",name:"Nu Holdings",value:"$151K",pnl:"-3.7%",pnlNum:-3.7,
        shares:"12,000",avgCost:"$13.10",color:T.green},
      {ticker:"Adyen",name:"Adyen",value:"$61K",pnl:"-11.6%",pnlNum:-11.6,
        shares:"40",avgCost:"$1,720",color:"#4FC78A"},
      {ticker:"Wise",name:"Wise",value:"$89K",pnl:"-3.5%",pnlNum:-3.5,
        shares:"8,000",avgCost:"$11.50",color:"#8FD8B4"},
    ],
    tl:[
      {date:"Aug 24",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"LatAm unbanked opportunity",detail:"Brazil: 40M+ new accounts.",stocks:[]},
      {date:"Sep 24",type:"idea",Icon:Lightbulb,color:T.amber,
        title:"Idea: Global Fintech",detail:"Grouped LatAm + Europe.",stocks:[]},
      {date:"Oct 24",type:"buy",Icon:TrendingUp,color:T.green,
        title:"Nu - 12,000 @ $13.10",detail:"Starting position.",
        badge:"Neutral",size:"$157K",stocks:["Nu"]},
      {date:"Oct 24",type:"buy",Icon:TrendingUp,color:T.green,
        title:"Adyen - 40 @ $1,720",detail:"Margin compression dip.",
        size:"$69K",stocks:["Adyen"]},
      {date:"Nov 24",type:"buy",Icon:TrendingUp,color:T.green,
        title:"Wise - 8,000 @ $11.50",detail:"Cross-border payments test.",
        size:"$92K",stocks:["Wise"]},
      {date:"Jan 25",type:"thought",Icon:MessageCircle,color:T.purple,
        title:"Adyen margin concern",detail:"Take rate declining.",stocks:["Adyen"]},
    ],
    pc:[
      {l:"Thesis statement",d:false},{l:"Exit conditions",d:false},
      {l:"Sizing plan",d:false},{l:"6-month observation",d:true},
      {l:"Conviction check",d:false}
    ],
    wm:[
      {l:"Nu NPL ratio",cur:"5.2%",th:"< 7%",ok:true},
      {l:"Adyen take rate",cur:"0.218%",th:"> 0.20%",ok:false},
      {l:"Wise volume YoY",cur:"+32%",th:"> 25%",ok:true}
    ]
  },
};

const ideas = [
  {name:"US AI Infrastructure",stage:"Thesis",
    hyp:"AI infra multi-year super-cycle.",
    value:"$4.20M",pnl:"+34.2%",stocks:["NVDA","MSFT","AMD","SMCI"],
    thoughts:12,updated:"2d"},
  {name:"Indian Consumer Boom",stage:"Thesis",
    hyp:"Rising middle class + digital payments.",
    value:"$2.80M",pnl:"+28.4%",stocks:["HDFC","BajFin"],
    thoughts:8,updated:"5d"},
  {name:"European Defense",stage:"Thesis",
    hyp:"NATO structural spending tailwind.",
    value:"$1.90M",pnl:"+41.3%",stocks:["Airbus","Rheinmetall"],
    thoughts:6,updated:"1w"},
  {name:"Clean Energy",stage:"Thesis",
    hyp:"Green transition capex cycle.",
    value:"$0.90M",pnl:"-3.1%",stocks:["ENPH","NEE","Vestas"],
    thoughts:5,updated:"2w"},
  {name:"Japan Tech Revival",stage:"Toe Dip",
    hyp:"Governance reform + weak yen.",
    value:"$340K",pnl:"+12.1%",stocks:["Sony","SoftBank"],
    thoughts:5,updated:"23d",stale:true},
  {name:"Global Fintech",stage:"Toe Dip",
    hyp:"LatAm + Europe digital banking.",
    value:"$301K",pnl:"-5.3%",stocks:["Nu","Adyen","Wise"],
    thoughts:4,updated:"3d"},
  {name:"India SaaS Exports",stage:"Idea",
    hyp:"Indian SaaS global enterprise capture.",
    stocks:["Freshworks","Zoho"],thoughts:4,updated:"1d"},
  {name:"Quantum Adjacent",stage:"Idea",
    hyp:"Quantum infrastructure picks-and-shovels.",
    stocks:["IONQ"],thoughts:3,updated:"4d"},
  {name:"Brazil Agri Infra",stage:"Snoozed",
    hyp:"$200B agri modernization.",
    stocks:["SLC"],thoughts:2,updated:"45d",
    snoozeDate:"Apr 25",todo:"Monitor Lula trade policy"},
  {name:"Genomics 2.0",stage:"Snoozed",
    hyp:"CRISPR commercial viability.",
    stocks:["CRSP"],thoughts:2,updated:"30d",
    snoozeDate:"Jun 25",todo:"FDA sickle cell panel"},
];

/* === SPARKLINE === */
function Spark({dir,color,width=48,height=20}){
  const pts = dir==="down"
    ? [0,2,8,1,16,3,24,5,32,8,40,12,48,16]
    : [0,16,8,14,16,11,24,8,32,5,40,2,48,0];
  const d = pts.reduce((a,v,i) =>
    i%2===0 ? a+(i===0?"M":"L")+v+"," : a+v+" ", "");
  return (
    <svg width={width} height={height} viewBox={"0 0 "+width+" "+height}
      style={{display:"block"}}>
      <path d={d+"L"+width+","+height+" L0,"+height+" Z"} fill={color+"10"}/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* === SVG CHART === */
function MChart({stocks,pd,ed,active}){
  const W=540,H=195,PX=42,PY=18;
  const av = active.flatMap(tk => pd[tk]||[]);
  if(!av.length) return null;
  const mn = Math.min(...av)*.92, mx = Math.max(...av)*1.04;
  const x = i => PX+(i/15)*(W-PX*2);
  const y = v => PY+(1-(v-mn)/(mx-mn))*(H-PY*2);
  const ln = a => a.map((p,i) => (i===0?"M":"L")+x(i)+","+y(p)).join(" ");
  const la = ["Oct 23","","Dec","","Feb 24","","Apr","","Jun","","Aug","","Oct","","Dec","Jan 25"];

  return (
    <svg width="100%" viewBox={"0 0 "+W+" "+(H+24)} style={{fontFamily:"Inter,system-ui"}}>
      <defs>
        {active.map(tk => {
          const s = stocks.find(st => st.ticker===tk);
          return s ? (
            <linearGradient key={tk} id={"g-"+tk} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity=".12"/>
              <stop offset="1" stopColor={s.color} stopOpacity=".01"/>
            </linearGradient>
          ) : null;
        })}
      </defs>
      {[0,1,2,3].map(i => {
        const v = mn+(mx-mn)*i/3;
        return (
          <g key={i}>
            <line x1={PX} x2={W-PX} y1={y(v)} y2={y(v)}
              stroke={T.border} strokeWidth=".5" strokeDasharray="3,6"/>
            <text x={PX-6} y={y(v)+3} textAnchor="end" fontSize="9"
              fill={T.textTri} fontWeight="500">{"$"+Math.round(v)}</text>
          </g>
        );
      })}
      {la.map((l,i) => l ? (
        <text key={i} x={x(i)} y={H-PY+16} textAnchor="middle"
          fontSize="9" fill={T.textTri} fontWeight="500">{l}</text>
      ) : null)}
      {active.length===1 && active.map(tk => {
        const s=stocks.find(st=>st.ticker===tk), p=pd[tk];
        return p&&s ? <path key={"a-"+tk}
          d={ln(p)+"L"+x(15)+","+y(mn)+"L"+x(0)+","+y(mn)+"Z"}
          fill={"url(#g-"+tk+")"}/> : null;
      })}
      {active.map(tk => {
        const s=stocks.find(st=>st.ticker===tk), p=pd[tk];
        return p&&s ? <path key={tk} d={ln(p)} fill="none" stroke={s.color}
          strokeWidth={active.length===1?2.5:1.8} strokeLinejoin="round"
          strokeLinecap="round" opacity={active.length===1?1:.8}/> : null;
      })}
      {active.map(tk => (ed[tk]||[]).map((e,idx) => {
        const p=pd[tk]; if(!p) return null;
        const r = active.length===1?7:5;
        return (
          <g key={tk+"-"+idx}>
            <circle cx={x(e.i)} cy={y(p[e.i])} r={r+5} fill={e.c} opacity=".06"/>
            <circle cx={x(e.i)} cy={y(p[e.i])} r={r} fill={e.c}/>
            <text x={x(e.i)} y={y(p[e.i])+(r===7?3.5:2.5)}
              textAnchor="middle" fontSize={r===7?8:7}
              fill="#fff" fontWeight="700">{e.t}</text>
          </g>
        );
      }))}
    </svg>
  );
}

/* === TIMELINE === */
function TL({events,filter,stocks}){
  const f = filter==="all" ? events
    : events.filter(e => !e.stocks?.length || e.stocks?.includes(filter));
  return (
    <div style={{position:"relative"}}>
      {f.map((ev,i) => {
        const EIcon = ev.Icon;
        return (
          <div key={i} style={{display:"flex",gap:14,position:"relative"}}>
            {i<f.length-1 && <div style={{position:"absolute",left:13,top:30,
              bottom:0,width:1,
              background:f[i+1].type==="alert"?(T.red+"40"):T.borderL}}/>}
            <div style={{width:28,height:28,borderRadius:T.rxs,
              background:ev.color+"10",display:"flex",alignItems:"center",
              justifyContent:"center",flexShrink:0,zIndex:1,
              border:"1px solid "+ev.color+"15"}}>
              <EIcon size={13} color={ev.color} strokeWidth={2.5}/>
            </div>
            <div style={{flex:1,paddingBottom:14,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",marginBottom:2}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:12,fontWeight:600,color:T.text}}>
                    {ev.title}
                  </span>
                  {(ev.stocks||[]).map(s => {
                    const st = stocks?.find(x => x.ticker===s);
                    return <span key={s} style={{fontSize:9,fontWeight:600,
                      padding:"1px 5px",borderRadius:T.rxs,
                      background:st?(st.color+"10"):T.purpleSoft,
                      color:st?.color||T.purple}}>{s}</span>;
                  })}
                </div>
                <span style={{fontSize:10,color:T.textTri,fontWeight:500,
                  flexShrink:0}}>{ev.date}</span>
              </div>
              <div style={{fontSize:11,color:T.textSec,lineHeight:1.6}}>
                {ev.detail}
              </div>
              {(ev.badge||ev.size) && (
                <div style={{display:"flex",gap:5,marginTop:5}}>
                  {ev.badge && <Badge color={T.teal} soft small>{ev.badge}</Badge>}
                  {ev.size && <Badge color={T.green} soft small>{ev.size}</Badge>}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* === ACTION LIST === */
function AL({tasks,onToggle}){
  const[exp,setExp]=useState(null);
  const pend=tasks.filter(t=>!t.done), comp=tasks.filter(t=>t.done);

  function renderTask(t){
    const ti=taskIcons[t.type]||taskIcons.watch;
    const TIcon=ti.Icon;
    const isO=exp===t.id;
    const od=t.dueStatus==="overdue";
    const urg=t.dueStatus==="urgent";
    const pr=t.price;
    const prColor=pr?(pr.dir==="down"?T.red:T.green):null;
    return (
      <div key={t.id} style={{borderRadius:T.rxs,marginBottom:4,
        background:t.done?T.bg:T.card,
        border:"1px solid "+(od?(T.red+"25"):urg?(T.amber+"25"):T.borderL),
        borderLeft:"2px solid "+(t.done?T.border:ti.c),
        opacity:t.done?.5:1}}>
        <div style={{padding:"9px 10px",display:"flex",alignItems:"center",gap:8}}>
          <div onClick={()=>onToggle?.(t.id)} style={{width:16,height:16,
            borderRadius:4,border:"1.5px solid "+(t.done?T.green:T.border),
            background:t.done?T.greenSoft:T.card,display:"flex",
            alignItems:"center",justifyContent:"center",cursor:"pointer",
            flexShrink:0}}>
            {t.done && <Check size={10} color={T.green} strokeWidth={2.5}/>}
          </div>
          {pr && pr.chg && pr.chg!=="n/a" && !t.done && (
            <div style={{minWidth:44,padding:"3px 6px",borderRadius:T.rxs,
              background:prColor+"08",border:"1px solid "+prColor+"12",
              textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:10,fontWeight:700,color:prColor,
                letterSpacing:"-.02em"}}>{pr.chg}</div>
              {pr.period && <div style={{fontSize:7,color:T.textTri,
                marginTop:0}}>{pr.period}</div>}
            </div>
          )}
          <div style={{flex:1,minWidth:0,cursor:"pointer"}}
            onClick={()=>setExp(isO?null:t.id)}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <TIcon size={12} color={ti.c} strokeWidth={2} style={{opacity:.6}}/>
              <span style={{fontSize:11,fontWeight:600,
                color:t.done?T.textTri:T.text,
                textDecoration:t.done?"line-through":"none"}}>{t.title}</span>
              {t.stock && <span style={{fontSize:9,fontWeight:600,
                padding:"1px 5px",borderRadius:T.rxs,
                background:T.primaryMuted,color:T.primary}}>{t.stock}</span>}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            {pr && pr.now && !t.done && (
              <span style={{fontSize:9,color:T.textTri,fontWeight:500}}>
                {pr.now}
              </span>
            )}
            {t.due && <span style={{fontSize:10,fontWeight:600,
              color:od?T.red:urg?T.amber:T.textTri}}>
              {od?"Overdue":t.due}</span>}
            <div style={{cursor:"pointer"}} onClick={()=>setExp(isO?null:t.id)}>
              <Chev open={isO}/>
            </div>
          </div>
        </div>
        {isO && (
          <div style={{padding:"0 10px 10px 36px"}}>
            <div style={{fontSize:11,color:T.textSec,lineHeight:1.6,paddingTop:4}}>
              {t.detail}
            </div>
            {t.context && (
              <div style={{marginTop:8,borderRadius:T.rxs,overflow:"hidden",
                border:"1px solid "+T.purple+"12"}}>
                <div style={{padding:"5px 10px",background:T.purple+"08",
                  display:"flex",alignItems:"center",gap:5}}>
                  <MessageCircle size={10} color={T.purple} strokeWidth={2}/>
                  <span style={{fontSize:9,fontWeight:600,color:T.purple,
                    textTransform:"uppercase",letterSpacing:".06em"}}>
                    From your reasoning chain
                  </span>
                </div>
                <div style={{padding:"8px 10px",fontSize:10,color:T.textSec,
                  lineHeight:1.6,fontStyle:"italic",background:T.purpleSoft+"60"}}>
                  {t.context}
                </div>
              </div>
            )}
            {t.action && <div style={{marginTop:8}}>
              <Btn variant="subtle" style={{fontSize:10,padding:"5px 12px"}}>
                {t.action} {">"}
              </Btn>
            </div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card style={{marginBottom:16,padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",
        alignItems:"center",marginBottom:10}}>
        <Label style={{marginBottom:0}}>Action List</Label>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:10,color:T.textTri,fontWeight:500}}>
            {comp.length}/{tasks.length}
          </span>
          <div style={{width:40,height:3,background:T.borderL,borderRadius:2,
            overflow:"hidden"}}>
            <div style={{
              width:(tasks.length?(comp.length/tasks.length)*100:0)+"%",
              height:"100%",
              background:"linear-gradient(90deg,"+T.green+","+T.teal+")",
              borderRadius:2}}/>
          </div>
        </div>
      </div>
      {pend.map(renderTask)}
      {comp.length>0 && (
        <Acc title={comp.length+" completed"}
          badge={<CheckCircle2 size={12} color={T.green}/>}>
          <div style={{paddingTop:4}}>{comp.map(renderTask)}</div>
        </Acc>
      )}
    </Card>
  );
}

/* === STOCK SELECTOR === */
function SS({stocks,active,onToggle}){
  return (
    <div style={{display:"flex",gap:6,marginTop:14}}>
      {stocks.map(s => {
        const on = active.includes(s.ticker);
        return (
          <div key={s.ticker} onClick={()=>onToggle(s.ticker)}
            style={{flex:1,padding:"10px 10px 8px",borderRadius:T.rs,
              cursor:"pointer",background:on?T.card:T.bg,
              border:"1px solid "+(on?(s.color+"30"):T.borderL),
              opacity:on?1:.4,transition:"all .25s ease",
              boxShadow:on?("0 0 0 1px "+s.color+"15, 0 2px 8px "+s.color+"08"):undefined}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:4}}>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:7,height:7,borderRadius:"50%",
                  background:s.color,boxShadow:"0 0 6px "+s.color+"30"}}/>
                <span style={{fontSize:12,fontWeight:700,color:T.text}}>
                  {s.ticker}
                </span>
                {s.alert && <AlertTriangle size={10} color={T.red}/>}
              </div>
              {s.weight && <span style={{fontSize:9,color:T.textTri}}>
                {s.weight}</span>}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",
              fontSize:11,marginBottom:2}}>
              <span style={{fontWeight:600,color:T.text}}>{s.value}</span>
              <span style={{fontWeight:600,
                color:s.pnlNum>=0?T.green:T.red}}>{s.pnl}</span>
            </div>
            <div style={{fontSize:9,color:T.textTri}}>
              {s.shares} @ {s.avgCost}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* === BREADCRUMB === */
function BC({stage,name,en,setEn}){
  const all = {
    thoughts:{Icon:MessageCircle,l:"Thoughts",s:"Research phase",c:T.purpleSoft,
      d:"Rajesh call, Jensen keynote, TSMC check, Competitors"},
    idea:{Icon:Lightbulb,l:"Idea",s:"Hypothesis formed",c:T.amberSoft,
      d:"Clustered thoughts into investment hypothesis."},
    toedip:{Icon:Droplets,l:"Toe Dip",
      s:stage==="Idea"?"Not yet":"Small bet",c:T.tealSoft,
      d:stage==="Idea"?"No capital yet.":"Deployed small position to test conviction."},
    thesis:{Icon:Target,l:"Thesis",
      s:stage==="Thesis"?"Full conviction":"Not yet",c:T.greenSoft,
      d:stage==="Thesis"?"Scaled to full position. Exit conditions set.":"Requires promotion."},
    trades:{Icon:BarChart3,l:"Current",s:"Today",c:T.greenSoft,
      d:"Position evolved through trades to current value."},
  };
  const ac = stage==="Idea"?["thoughts","idea"]
    : stage==="Toe Dip"?["thoughts","idea","toedip","trades"]
    : ["thoughts","idea","toedip","thesis","trades"];
  const fu = stage==="Idea"?["toedip","thesis","trades"]
    : stage==="Toe Dip"?["thesis"]:[];

  return (
    <div style={{marginBottom:6}}>
      <div style={{display:"flex",gap:3,alignItems:"center",flexWrap:"wrap"}}>
        {[...ac,...fu].map((k,i,arr) => {
          const n=all[k], iF=fu.includes(k), isA=en===k;
          const NIcon = n.Icon;
          return (
            <div key={k} style={{display:"flex",alignItems:"center",gap:3}}>
              <div onClick={()=>!iF&&setEn(isA?null:k)}
                style={{display:"flex",alignItems:"center",gap:6,
                  padding:"5px 10px",borderRadius:20,
                  background:iF?"transparent":isA?n.c:T.card,
                  border:"1px solid "+(iF?T.borderL:isA?"transparent":T.border),
                  cursor:iF?"default":"pointer",opacity:iF?.25:1,
                  boxShadow:isA?("0 0 0 1px "+T.primary+"20"):undefined}}>
                <NIcon size={13} color={iF?T.textTri:T.textSec}
                  strokeWidth={2} style={{opacity:.6}}/>
                <div>
                  <div style={{fontSize:10,fontWeight:600,
                    color:iF?T.textTri:T.text,lineHeight:1.2}}>{n.l}</div>
                  <div style={{fontSize:9,color:T.textTri,lineHeight:1.2}}>{n.s}</div>
                </div>
              </div>
              {i<arr.length-1 && <ArrowRight size={10} color={T.textTri}
                style={{opacity:.2}}/>}
            </div>
          );
        })}
      </div>
      {en && all[en] && (
        <div style={{marginTop:8,padding:"10px 14px",background:T.bg,
          borderRadius:T.rxs,borderLeft:"2px solid "+T.primary,
          fontSize:11,color:T.textSec,lineHeight:1.5}}>{all[en].d}</div>
      )}
    </div>
  );
}

/* === JOURNEY: IDEA === */
function JI({target,setScreen,setJT}){
  const[en,setEn]=useState(null);
  const[tasks,setTasks]=useState(idTasks[target]||[]);
  const data=ideaMap[target];
  if(!data) return <div style={{padding:60,textAlign:"center",color:T.textTri}}>No data</div>;
  const idea=ideas.find(it=>it.name===target);
  return (
    <div>
      <BC stage="Idea" name={target} en={en} setEn={setEn}/>
      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18,fontWeight:700,color:T.text,
              letterSpacing:"-.02em"}}>{target}</span>
            <StageBadge stage="Idea"/>
          </div>
          <div style={{display:"flex",gap:6}}>
            <Btn onClick={()=>setScreen("trade")}>Promote to Toe Dip</Btn>
            <Btn variant="ghost">Snooze</Btn>
          </div>
        </div>
        <div style={{borderLeft:"2px solid "+T.purple+"30",paddingLeft:14,
          marginTop:14,fontSize:12,color:T.textSec,lineHeight:1.7,
          fontStyle:"italic"}}>{data.hyp}</div>
        <div style={{display:"flex",gap:5,marginTop:12,alignItems:"center"}}>
          <Label style={{marginBottom:0,marginRight:4}}>Watchlist</Label>
          {data.wl.map(s=><Badge key={s} color={T.primary} soft small>{s}</Badge>)}
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 252px",gap:16}}>
        <div>
          <AL tasks={tasks} onToggle={id=>setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t))}/>
          <Card style={{marginBottom:16}}>
            <Label>Promotion Readiness</Label>
            {data.sig.map(s => (
              <Acc key={s.l} title={s.l}
                badge={<Badge color={s.c} soft small glow>{s.v}</Badge>}
                accent={s.c}>
                <div style={{fontSize:11,color:T.textSec,lineHeight:1.6,
                  paddingTop:6}}>{s.d}</div>
              </Acc>
            ))}
          </Card>
          <Card>
            <Label>Thought Stream</Label>
            <TL events={data.tl} filter="all"/>
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,
              background:"linear-gradient(90deg,"+T.purple+","+T.purple+"30)"}}/>
            <Label>Conviction</Label>
            <div style={{textAlign:"center",padding:"16px 0 10px"}}>
              <div style={{fontSize:40,fontWeight:700,color:T.purple,
                letterSpacing:"-.04em",lineHeight:1}}>{idea?.thoughts||0}</div>
              <div style={{fontSize:10,color:T.textTri,marginTop:4}}>thoughts</div>
            </div>
            <div style={{height:4,background:T.borderL,borderRadius:2,
              marginTop:8,overflow:"hidden"}}>
              <div style={{width:Math.min(100,(idea?.thoughts||0)/6*100)+"%",
                height:"100%",borderRadius:2,
                background:"linear-gradient(90deg,"+T.purple+","+T.primary+")"}}/>
            </div>
            <div style={{fontSize:10,color:T.textTri,marginTop:6}}>
              Promote at ~5-6
            </div>
          </Card>
          {data.rel?.length>0 && (
            <Card>
              <Label>Related Theses</Label>
              {data.rel.map(t => (
                <div key={t} onClick={()=>setJT(t)}
                  style={{display:"flex",alignItems:"center",gap:8,
                    padding:"6px 0",cursor:"pointer"}}>
                  <div style={{width:7,height:7,borderRadius:"50%",
                    background:TC[t]}}/>
                  <span style={{fontSize:11,fontWeight:600,color:T.text,
                    flex:1}}>{t}</span>
                  <ArrowRight size={12} color={T.primary}/>
                </div>
              ))}
            </Card>
          )}
          <Card>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Sparkles size={12} color={T.purple}/>
              <Label style={{marginBottom:0}}>AI Suggestions</Label>
              <Badge color={T.textTri} small>non-binding</Badge>
            </div>
            <div style={{background:T.purpleSoft,borderRadius:T.rxs,padding:10,
              border:"1px solid "+T.purple+"08"}}>
              <div style={{fontSize:11,color:T.text,lineHeight:1.5,marginBottom:4}}>
                Freshworks clearest entry. Consider ~$50K single-stock toe dip.
              </div>
              <span style={{fontSize:10,color:T.purple,fontWeight:600,
                cursor:"pointer"}}>{"Start >"}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* === JOURNEY: TOE DIP === */
function JTD({target,setScreen,setJT}){
  const[en,setEn]=useState(null);
  const[asS,setAsS]=useState(null);
  const[tf,setTf]=useState("all");
  const[tasks,setTasks]=useState(tdTasks);
  const data=tdMap[target];
  if(!data) return <div style={{padding:60,color:T.textTri}}>No data</div>;
  const sl=data.stk, act=asS||sl.map(s=>s.ticker);
  const ts = t => {
    if(act.length===1&&act[0]===t) setAsS(sl.map(s=>s.ticker));
    else if(act.includes(t)&&act.length>1) setAsS(act.filter(s=>s!==t));
    else setAsS([...act,t]);
  };
  const tp = useMemo(()=>{
    const r={};
    sl.forEach((s,si)=>{
      const b=parseFloat(s.avgCost.replace(/[$,]/g,""));
      r[s.ticker]=Array.from({length:16},(_,i)=>
        b*(.95+Math.sin(i*.4+si)*.08+(s.pnlNum/100)*(i/15)));
    });
    return r;
  },[]);
  const te = useMemo(()=>{
    const r={};
    sl.forEach(s=>{r[s.ticker]=[{i:6,t:"B",c:T.green},{i:10,t:"B",c:T.green}]});
    return r;
  },[]);
  const dn=data.pc.filter(c=>c.d).length;

  return (
    <div>
      <BC stage="Toe Dip" name={target} en={en} setEn={setEn}/>
      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18,fontWeight:700,color:T.text,
              letterSpacing:"-.02em"}}>{target}</span>
            <StageBadge stage="Toe Dip"/>
            <span style={{fontSize:11,color:T.textTri}}>
              Testing with $301K (1.2% of AUM)
            </span>
          </div>
          <div style={{display:"flex",gap:6}}>
            <Btn variant="green">Promote to Thesis</Btn>
            <Btn variant="ghost">Abandon</Btn>
          </div>
        </div>
        <div style={{borderLeft:"2px solid "+T.teal+"30",paddingLeft:14,
          marginTop:12,fontSize:12,color:T.textSec,lineHeight:1.7,
          fontStyle:"italic"}}>{data.hyp}</div>
        <SS stocks={sl} active={act} onToggle={ts}/>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 252px",gap:16}}>
        <div>
          <AL tasks={tasks} onToggle={id=>setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t))}/>
          <Card style={{marginBottom:16}}>
            <Label>Price & Trades</Label>
            <MChart stocks={sl} pd={tp} ed={te} active={act}/>
          </Card>
          <Card style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:10}}>
              <Label style={{marginBottom:0}}>Promotion Checklist</Label>
              <span style={{fontSize:10,fontWeight:600,
                color:dn>=4?T.green:T.amber}}>{dn}/{data.pc.length}</span>
            </div>
            {data.pc.map(c => (
              <div key={c.l} style={{display:"flex",alignItems:"center",gap:8,
                padding:"7px 0",borderBottom:"1px solid "+T.borderL}}>
                <div style={{width:15,height:15,borderRadius:4,
                  border:"1.5px solid "+(c.d?T.green:T.border),
                  background:c.d?T.greenSoft:T.card,display:"flex",
                  alignItems:"center",justifyContent:"center"}}>
                  {c.d && <Check size={9} color={T.green} strokeWidth={2.5}/>}
                </div>
                <span style={{fontSize:11,fontWeight:500,
                  color:c.d?T.textTri:T.text}}>{c.l}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:10}}>
              <Label style={{marginBottom:0}}>Reasoning Chain</Label>
              <div style={{display:"flex",gap:3}}>
                <span onClick={()=>{setTf("all");setAsS(null)}}
                  style={{fontSize:10,fontWeight:600,padding:"3px 8px",
                    borderRadius:T.rxs,
                    background:tf==="all"?T.primary:T.bg,
                    color:tf==="all"?"#fff":T.textTri,cursor:"pointer"}}>All</span>
                {sl.map(s => (
                  <span key={s.ticker}
                    onClick={()=>{setTf(s.ticker);setAsS([s.ticker])}}
                    style={{fontSize:10,fontWeight:600,padding:"3px 8px",
                      borderRadius:T.rxs,
                      background:tf===s.ticker?s.color:T.bg,
                      color:tf===s.ticker?"#fff":T.textTri,cursor:"pointer"}}>
                    {s.ticker}
                  </span>
                ))}
              </div>
            </div>
            <TL events={data.tl} filter={tf} stocks={sl}/>
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card>
            {data.wm.map((m,i) => (
              <div key={m.l} style={{padding:"9px 0",
                borderBottom:i<data.wm.length-1?("1px solid "+T.borderL):undefined}}>
                <div style={{fontSize:10,color:T.textTri,marginBottom:3}}>{m.l}</div>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"baseline"}}>
                  <span style={{fontSize:16,fontWeight:700,
                    color:m.ok?T.green:T.amber,letterSpacing:"-.02em"}}>{m.cur}</span>
                  <span style={{fontSize:9,color:T.textTri}}>{m.th}</span>
                </div>
                {!m.ok && <div style={{fontSize:9,color:T.amber,marginTop:2,
                  fontWeight:500,display:"flex",alignItems:"center",gap:3}}>
                  <AlertTriangle size={9}/>Approaching
                </div>}
              </div>
            ))}
          </Card>
          <Card style={{position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,
              background:"linear-gradient(90deg,"+T.teal+","+T.teal+"30)"}}/>
            <Label>Skin in the Game</Label>
            <div style={{textAlign:"center",padding:"10px 0"}}>
              <div style={{fontSize:30,fontWeight:700,color:T.teal,
                letterSpacing:"-.04em"}}>$301K</div>
              <div style={{fontSize:10,color:T.textTri,marginTop:2}}>
                1.2% of $24.7M AUM
              </div>
              <div style={{fontSize:10,color:T.red,marginTop:2,fontWeight:600}}>
                -$17K (-5.3%)
              </div>
            </div>
            <div style={{fontSize:10,color:T.textTri,textAlign:"center",
              fontStyle:"italic",marginTop:4}}>Full thesis would be $1.5-3M</div>
          </Card>
          <Card>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Brain size={12} color={T.primary}/>
              <Label style={{marginBottom:0}}>Ask AI</Label>
            </div>
            <div style={{background:T.bg,borderRadius:T.rxs,padding:"9px 11px",
              fontSize:11,color:T.textTri,marginBottom:8,
              border:"1px solid "+T.borderL}}>Ask about this position...</div>
            {["Is Adyen dragging conviction?",
              "What would full thesis sizing look like?",
              "Compare to Indian Consumer at this stage"].map(q => (
              <div key={q} style={{fontSize:10,color:T.primary,padding:"6px 10px",
                background:T.primaryGlow,borderRadius:T.rxs,cursor:"pointer",
                marginBottom:3,fontWeight:500}}>{q}</div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* === JOURNEY: THESIS === */
function JTh({target,setScreen}){
  const[en,setEn]=useState(null);
  const[as,setAs]=useState(tStocks.map(s=>s.ticker));
  const[tf,setTf]=useState("all");
  const[tasks,setTasks]=useState(thTasks);
  const ts = t => {
    if(as.length===1&&as[0]===t) setAs(tStocks.map(s=>s.ticker));
    else if(as.includes(t)&&as.length>1) setAs(as.filter(s=>s!==t));
    else setAs([...as,t]);
  };

  return (
    <div>
      <BC stage="Thesis" name={target} en={en} setEn={setEn}/>
      <div style={{background:"linear-gradient(135deg,"+T.redSoft+",#FFF5F5)",
        border:"1px solid "+T.red+"15",borderRadius:T.r,padding:18,
        marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,
          background:"linear-gradient(90deg,"+T.red+","+T.red+"40)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",
          alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:T.red,marginBottom:5,
              display:"flex",alignItems:"center",gap:7}}>
              <AlertTriangle size={14}/>Invalidation Trigger Fired
            </div>
            <div style={{fontSize:11,color:T.text,lineHeight:1.65}}>
              {"Thesis assumed DC revenue growth >25%. Q4 guidance at +14%."}
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0,marginLeft:18}}>
            <Btn onClick={()=>setScreen("trade")} variant="danger"
              style={{fontSize:11}}>Record Response</Btn>
            <Btn variant="ghost" style={{fontSize:11}}>Update Thesis</Btn>
          </div>
        </div>
      </div>
      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",
          alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18,fontWeight:700,color:T.text,
              letterSpacing:"-.02em"}}>{target}</span>
            <StageBadge stage="Thesis"/>
          </div>
          <div style={{display:"flex",gap:18,fontSize:12}}>
            <div><span style={{color:T.textTri}}>Value </span>
              <span style={{fontWeight:700}}>$4.20M</span></div>
            <div><span style={{color:T.textTri}}>Cost </span>
              <span style={{fontWeight:700}}>$3.13M</span></div>
            <div><span style={{color:T.textTri}}>{"P&L"} </span>
              <span style={{fontWeight:700,color:T.green}}>+$1.07M (+34.2%)</span></div>
          </div>
        </div>
        <SS stocks={tStocks} active={as} onToggle={ts}/>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 252px",gap:16}}>
        <div>
          <AL tasks={tasks} onToggle={id=>setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t))}/>
          <Card style={{marginBottom:16}}>
            <Label>Price & Trades</Label>
            <MChart stocks={tStocks} pd={sPrices} ed={sEvents} active={as}/>
            <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
              {[[TrendingUp,"Buy",T.green],[TrendingDown,"Trim",T.orange],
                [MessageCircle,"Thought",T.purple],[Lightbulb,"Idea",T.amber],
                [Target,"Thesis",T.teal],[AlertTriangle,"Alert",T.red]].map(([Ic,l,c])=>
                <span key={l} style={{display:"flex",alignItems:"center",gap:4,
                  fontSize:9,color:T.textTri}}>
                  <Ic size={10} color={c}/>{l}
                </span>
              )}
            </div>
          </Card>
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:10}}>
              <Label style={{marginBottom:0}}>Reasoning Chain</Label>
              <div style={{display:"flex",gap:3}}>
                <span onClick={()=>{setTf("all");setAs(tStocks.map(s=>s.ticker))}}
                  style={{fontSize:10,fontWeight:600,padding:"3px 8px",
                    borderRadius:T.rxs,background:tf==="all"?T.primary:T.bg,
                    color:tf==="all"?"#fff":T.textTri,cursor:"pointer"}}>All</span>
                {tStocks.map(s => (
                  <span key={s.ticker}
                    onClick={()=>{setTf(s.ticker);setAs([s.ticker])}}
                    style={{fontSize:10,fontWeight:600,padding:"3px 8px",
                      borderRadius:T.rxs,background:tf===s.ticker?s.color:T.bg,
                      color:tf===s.ticker?"#fff":T.textTri,cursor:"pointer"}}>
                    {s.ticker}
                  </span>
                ))}
              </div>
            </div>
            <TL events={tTimeline} filter={tf} stocks={tStocks}/>
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,
              background:"linear-gradient(90deg,"+T.primary+","+T.primary+"30)"}}/>
            <Label>Thesis</Label>
            <div style={{borderLeft:"2px solid "+T.primary+"30",paddingLeft:12,
              fontStyle:"italic",fontSize:12,color:T.text,lineHeight:1.7,
              marginBottom:14}}>
              {"\"AI infrastructure spending is a multi-year super-cycle.\""}
            </div>
            <Label style={{marginTop:4}}>Basket Performance</Label>
            {tStocks.map(s => (
              <div key={s.ticker} style={{display:"flex",alignItems:"center",
                gap:8,padding:"5px 0"}}>
                <div style={{width:6,height:6,borderRadius:"50%",
                  background:s.color}}/>
                <span style={{fontSize:11,fontWeight:600,color:T.text,
                  width:38}}>{s.ticker}</span>
                <div style={{flex:1,height:3,background:T.borderL,borderRadius:2,
                  overflow:"hidden"}}>
                  <div style={{
                    width:Math.min(100,Math.max(5,(s.pnlNum+25)*1.2))+"%",
                    height:"100%",borderRadius:2,
                    background:s.pnlNum>=0
                      ?("linear-gradient(90deg,"+T.green+","+T.teal+")")
                      :T.red}}/>
                </div>
                <span style={{fontSize:10,fontWeight:600,
                  color:s.pnlNum>=0?T.green:T.red,width:44,
                  textAlign:"right"}}>{s.pnl}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Shield size={12} color={T.red}/>
              <Label style={{marginBottom:0}}>Exit Conditions</Label>
            </div>
            {[
              {ty:"Invalidation",
                d:"DC growth <25% for 2 consecutive quarters. Currently 1 of 2.",
                f:true},
              {ty:"Position Size",
                d:"Trim if any stock exceeds 10% of AUM. NVDA at 8.6%."},
              {ty:"Time Review",
                d:"Full basket review at 18-month mark (Apr 2025)."},
            ].map(t => (
              <Acc key={t.ty} title={t.ty} defaultOpen={t.f}
                badge={t.f?<AlertTriangle size={11} color={T.red}/>:null}
                accent={t.f?T.red:undefined}>
                <div style={{fontSize:11,color:T.textSec,paddingTop:6,
                  lineHeight:1.55}}>{t.d}</div>
              </Acc>
            ))}
          </Card>
          <Card>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Brain size={12} color={T.primary}/>
              <Label style={{marginBottom:0}}>Ask AI</Label>
            </div>
            <div style={{background:T.bg,borderRadius:T.rxs,padding:"9px 11px",
              fontSize:11,color:T.textTri,marginBottom:8,
              border:"1px solid "+T.borderL}}>Ask about this thesis...</div>
            {["Which stock drags P&L most?",
              "What would past-me say now?",
              "Show $240K to $4.2M journey stats"].map(q => (
              <div key={q} style={{fontSize:10,color:T.primary,padding:"6px 10px",
                background:T.primaryGlow,borderRadius:T.rxs,cursor:"pointer",
                marginBottom:3,fontWeight:500}}>{q}</div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function JV({target,setScreen,setJT}){
  const idea = ideas.find(it=>it.name===target);
  if(idea?.stage==="Idea") return <JI target={target} setScreen={setScreen} setJT={setJT}/>;
  if(idea?.stage==="Toe Dip") return <JTD target={target} setScreen={setScreen} setJT={setJT}/>;
  return <JTh target={target} setScreen={setScreen}/>;
}

/* === DASHBOARD === */
function Dash({setScreen,setJT}){
  const[ei,setEi]=useState(null);
  return (
    <div>
      <div style={{display:"flex",gap:12,marginBottom:22}}>
        <StatCard label="Total AUM" value="$24.7M" sub="4 accounts"/>
        <StatCard label="Today" value="+$183K" sub="+0.74%" accent={T.green}/>
        <StatCard label="vs QQQ YTD" value="+8.2%" accent={T.green}/>
        <StatCard label="Attention" value="5" sub="1 critical, 1 high, 3 others" accent={T.amber}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 282px",gap:16}}>
        <div>
          <Card style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:14}}>
              <Label style={{marginBottom:0}}>What Needs Attention</Label>
              <span style={{fontSize:9,color:T.textTri,fontWeight:500}}>
                Price moves {">"} thesis impact
              </span>
            </div>
            {attn.map((item,i) => {
              const o=ei===i;
              const isDown=item.priceDir==="down";
              const moveColor=isDown?T.red:T.green;
              return (
                <div key={i} style={{borderRadius:T.rs,overflow:"hidden",
                  marginBottom:5,
                  border:"1px solid "+(o?(pC[item.p]+"25"):T.borderL),
                  background:o?(pC[item.p]+"04"):T.card}}>
                  <div onClick={()=>setEi(o?null:i)}
                    style={{padding:"11px 14px",cursor:"pointer",
                      display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{minWidth:72,padding:"6px 10px",
                      borderRadius:T.rxs,background:moveColor+"08",
                      border:"1px solid "+moveColor+"12",textAlign:"center"}}>
                      <div style={{fontSize:14,fontWeight:700,color:moveColor,
                        letterSpacing:"-.02em"}}>{item.priceChange}</div>
                      <div style={{fontSize:9,color:T.textTri,marginTop:1}}>
                        {item.period}
                      </div>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,
                        marginBottom:2}}>
                        <span style={{fontSize:13,fontWeight:700,color:T.text}}>
                          {item.ticker}
                        </span>
                        <span style={{fontSize:10,color:T.textTri}}>
                          {item.priceNow}
                        </span>
                        <span style={{fontSize:9,color:T.textTri}}>
                          from {item.pricePrev}
                        </span>
                        <Spark dir={item.priceDir} color={moveColor}/>
                      </div>
                      <div style={{fontSize:11,color:T.text,lineHeight:1.4}}>
                        {item.hl}
                      </div>
                      <div style={{display:"flex",gap:6,marginTop:4,
                        alignItems:"center"}}>
                        <div style={{display:"flex",alignItems:"center",gap:4,
                          padding:"2px 8px",borderRadius:10,
                          background:item.thesisColor+"10",
                          border:"1px solid "+item.thesisColor+"15"}}>
                          <div style={{width:5,height:5,borderRadius:"50%",
                            background:item.thesisColor}}/>
                          <span style={{fontSize:9,fontWeight:600,
                            color:item.thesisColor}}>{item.thesis}</span>
                        </div>
                        <Badge color={pC[item.p]} soft small>{item.p}</Badge>
                      </div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:14,fontWeight:700,color:T.text}}>
                        {item.amount}
                      </div>
                      <div style={{fontSize:10,color:T.textTri}}>
                        {item.pct} of AUM
                      </div>
                    </div>
                    <Chev open={o}/>
                  </div>
                  {o && (
                    <div style={{padding:"0 14px 14px",
                      borderTop:"1px solid "+pC[item.p]+"10"}}>
                      <div style={{paddingTop:12}}>
                        <div style={{fontSize:10,fontWeight:600,
                          textTransform:"uppercase",letterSpacing:".08em",
                          color:T.textTri,marginBottom:10,display:"flex",
                          alignItems:"center",gap:6}}>
                          <div style={{width:7,height:7,borderRadius:"50%",
                            background:item.thesisColor}}/>
                          How this maps to your thesis
                        </div>
                        {item.storyChain.map((sc,si) => (
                          <Acc key={si} title={sc.label} defaultOpen={si===0}
                            accent={si===0?item.thesisColor:undefined}>
                            <div style={{fontSize:11,color:T.textSec,
                              lineHeight:1.65,paddingTop:6}}>{sc.text}</div>
                          </Acc>
                        ))}
                        <div style={{display:"flex",justifyContent:"flex-end",
                          marginTop:12,gap:8}}>
                          <Btn variant="ghost" style={{fontSize:11}}>Dismiss</Btn>
                          <Btn onClick={()=>{setJT(item.target);setScreen("journey")}}
                            style={{fontSize:11}}>
                            {item.action+" >"}
                          </Btn>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </Card>
          <Card>
            <Label>Thesis NAV</Label>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={stackData}
                margin={{top:0,right:0,left:-20,bottom:0}}>
                <XAxis dataKey="date" tick={{fontSize:9,fill:T.textTri}}
                  tickLine={false} axisLine={false} interval={4}/>
                <YAxis tick={{fontSize:9,fill:T.textTri}} tickLine={false}
                  axisLine={false}
                  tickFormatter={v=>"$"+(v/1000).toFixed(0)+"K"}/>
                <Tooltip contentStyle={{fontSize:11,borderRadius:T.rs,
                  border:"1px solid "+T.border,boxShadow:T.shadowMd}}
                  formatter={v=>["$"+(v/1000).toFixed(1)+"K"]}/>
                {Object.entries(TC).reverse().map(([k,c]) => (
                  <Area key={k} type="monotone" dataKey={k} stackId="1"
                    fill={c} stroke={c} fillOpacity={.6} strokeWidth={0}/>
                ))}
              </AreaChart>
            </ResponsiveContainer>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:10}}>
              {thesesData.map(t => (
                <span key={t.name} style={{display:"flex",alignItems:"center",
                  gap:4,fontSize:10,color:T.textTri,fontWeight:500}}>
                  <span style={{width:7,height:7,borderRadius:2,
                    background:TC[t.name]}}/>
                  {t.name}
                  {t.toedip && <Badge color={T.teal} soft small>dip</Badge>}
                  {t.alert && <AlertTriangle size={9} color={T.red}/>}
                  {t.stale && <Clock size={9} color={T.amber}/>}
                </span>
              ))}
            </div>
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card>
            <Label>Positions</Label>
            {thesesData.map(t => (
              <div key={t.name}
                onClick={()=>{setJT(t.name);setScreen("journey")}}
                style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",
                  borderBottom:"1px solid "+T.borderL,cursor:"pointer"}}>
                <div style={{width:7,height:7,borderRadius:"50%",
                  background:TC[t.name],flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:600,color:T.text,
                    display:"flex",alignItems:"center",gap:4}}>
                    {t.name}
                    {t.toedip && <Badge color={T.teal} soft small>dip</Badge>}
                    {t.alert && <AlertTriangle size={9} color={T.red}/>}
                    {t.stale && <Clock size={9} color={T.amber}/>}
                  </div>
                  <div style={{fontSize:10,color:T.textTri}}>
                    {t.stocks.slice(0,3).join(", ")}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:11,fontWeight:700}}>{t.value}</div>
                  <div style={{fontSize:10,fontWeight:600,
                    color:t.pnlNum>=0?T.green:T.red}}>{t.pnl}</div>
                </div>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",
              padding:"8px 0 0",fontSize:11,color:T.textTri,
              alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <Wallet size={12}/>Cash
              </div>
              <span style={{fontWeight:700,color:T.text}}>$14.3M</span>
            </div>
          </Card>
          <Card>
            <Label>Ideas</Label>
            {ideas.filter(id=>id.stage==="Idea").map(id => (
              <div key={id.name}
                onClick={()=>{setJT(id.name);setScreen("journey")}}
                style={{padding:"7px 0",borderBottom:"1px solid "+T.borderL,
                  cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center"}}>
                  <span style={{fontSize:11,fontWeight:600,color:T.text}}>
                    {id.name}
                  </span>
                  <StageBadge stage="Idea"/>
                </div>
                <div style={{fontSize:10,color:T.textTri,marginTop:2}}>
                  {id.thoughts} thoughts, {id.updated}
                </div>
              </div>
            ))}
            <div onClick={()=>setScreen("ideas")}
              style={{fontSize:11,color:T.primary,fontWeight:600,marginTop:8,
                cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
              All ideas <ArrowRight size={12}/>
            </div>
          </Card>
          <Card>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Sparkles size={12} color={T.purple}/>
              <Label style={{marginBottom:0}}>Price Signals</Label>
              <Badge color={T.textTri} small>auto</Badge>
            </div>
            <div style={{fontSize:10,color:T.textTri,marginBottom:8,lineHeight:1.5}}>
              Watching 18 stocks across 6 theses.
            </div>
            {[{t:"SAAB",move:"+4.1%",period:"5d",thesis:"European Defense",c:T.green},
              {t:"BajFin",move:"-3.2%",period:"5d",thesis:"Indian Consumer",c:T.red}
            ].map((s,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,
                padding:"6px 8px",background:T.bg,borderRadius:T.rxs,
                marginBottom:3}}>
                <span style={{fontSize:11,fontWeight:700,color:T.text,
                  width:52}}>{s.t}</span>
                <span style={{fontSize:11,fontWeight:600,color:s.c}}>
                  {s.move}
                </span>
                <span style={{fontSize:9,color:T.textTri}}>{s.period}</span>
                <span style={{fontSize:9,color:T.textTri,marginLeft:"auto"}}>
                  {s.thesis}
                </span>
              </div>
            ))}
            <div style={{fontSize:9,color:T.textTri,marginTop:6,
              fontStyle:"italic"}}>Below threshold - monitoring only</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* === TRADE GATE === */
function TG({setScreen,setJT}){
  const[step,setStep]=useState(1);
  const[text,setText]=useState("");
  const[ext,setExt]=useState(false);
  const[emo,setEmo]=useState(null);
  const[aTh,setATh]=useState("US AI Infrastructure");
  const demo = "I need to sell 400 shares of NVDA at ~$1,120. Q4 guidance missed by 12% - DC revenue at +14% vs my >25% assumption.";
  const stepNames = ["Your Story","Structure","Self-Check","Confirm"];
  const fs = e => {e.target.style.borderColor=T.primary;
    e.target.style.boxShadow="0 0 0 3px "+T.primary+"12";};
  const bs = e => {e.target.style.borderColor=T.border;
    e.target.style.boxShadow="none";};

  return (
    <div style={{maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",marginBottom:30}}>
        {stepNames.map((s,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:28,height:28,borderRadius:"50%",display:"flex",
                alignItems:"center",justifyContent:"center",
                background:step>i+1?T.green:step===i+1
                  ?("linear-gradient(135deg,"+T.primary+","+T.primaryDark+")")
                  :T.bg,
                color:step>i+1||step===i+1?"#fff":T.textTri,
                fontSize:11,fontWeight:700,
                border:step<=i+1&&step!==i+1?("1px solid "+T.border):undefined,
                boxShadow:step===i+1?("0 2px 8px "+T.primary+"30"):undefined}}>
                {step>i+1?<Check size={12}/>:i+1}
              </div>
              <span style={{fontSize:11,fontWeight:step===i+1?700:500,
                color:step===i+1?T.text:T.textTri}}>{s}</span>
            </div>
            {i<3 && <div style={{flex:1,height:1,
              background:step>i+1?T.green:T.borderL,margin:"0 10px"}}/>}
          </div>
        ))}
      </div>

      {step===1 && (
        <Card>
          <div style={{fontSize:18,fontWeight:700,color:T.text,
            letterSpacing:"-.02em",marginBottom:4}}>
            Tell me about this trade
          </div>
          <div style={{fontSize:12,color:T.textSec,marginBottom:20,
            lineHeight:1.6}}>In your own words. We will extract structure.</div>
          <textarea value={text}
            onChange={e=>{setText(e.target.value);setExt(false)}}
            placeholder="What are you doing and why..."
            style={{width:"100%",minHeight:130,padding:16,fontSize:12,
              border:"1px solid "+T.border,borderRadius:T.rs,resize:"vertical",
              fontFamily:"inherit",lineHeight:1.7,boxSizing:"border-box",
              color:T.text,outline:"none"}} onFocus={fs} onBlur={bs}/>
          <div style={{display:"flex",justifyContent:"space-between",
            alignItems:"center",marginTop:12}}>
            <span onClick={()=>{setText(demo);setExt(true)}}
              style={{fontSize:11,color:T.primary,cursor:"pointer",
                fontWeight:500}}>Load example</span>
            <Btn onClick={()=>setExt(true)} disabled={!text.trim()}>
              {"Extract >"}
            </Btn>
          </div>
          {ext && text && (
            <div style={{marginTop:20,
              background:"linear-gradient(135deg,"+T.purpleSoft+",#F8F6FE)",
              borderRadius:T.rs,padding:18,
              border:"1px solid "+T.purple+"10"}}>
              <div style={{fontSize:12,fontWeight:700,color:T.purple,
                marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                <Sparkles size={14}/>AI Extraction
              </div>
              {[["Action","Sell 400 shares"],["Stock","NVDA @ $1,120"],
                ["Value","$448K"],["Trigger","Invalidation - Q4 miss"],
                ["Tone","Measured, following rules"],
                ["Thesis","US AI Infrastructure"]].map(([k,v]) => (
                <div key={k} style={{display:"flex",fontSize:11,marginBottom:6}}>
                  <span style={{width:70,color:T.purple,fontWeight:600,
                    flexShrink:0,opacity:.6}}>{k}</span>
                  <span style={{color:T.text,fontWeight:500}}>{v}</span>
                </div>
              ))}
              <div style={{height:1,
                background:"linear-gradient(90deg,transparent,"+T.border+",transparent)",
                margin:"12px 0"}}/>
              <Btn onClick={()=>setStep(2)} style={{width:"100%"}}>
                {"Confirm & Continue"}
              </Btn>
            </div>
          )}
        </Card>
      )}

      {step===2 && (
        <Card>
          <div style={{fontSize:18,fontWeight:700,color:T.text,
            letterSpacing:"-.02em",marginBottom:20}}>Confirm structure</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,
            marginBottom:20}}>
            {[["Stock","NVDA"],["Action","Sell"],["Shares","400"],
              ["Price","$1,120"]].map(([l,v]) => (
              <div key={l}>
                <Label>{l}</Label>
                <input defaultValue={v} style={{width:"100%",padding:"10px 12px",
                  fontSize:12,border:"1px solid "+T.border,borderRadius:T.rxs,
                  fontFamily:"inherit",boxSizing:"border-box",color:T.text,
                  outline:"none"}} onFocus={fs} onBlur={bs}/>
              </div>
            ))}
          </div>
          <Label>Thesis</Label>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:20}}>
            {thesesData.filter(t=>!t.toedip).map(t => (
              <span key={t.name} onClick={()=>setATh(t.name)}
                style={{fontSize:10,fontWeight:600,padding:"6px 14px",
                  borderRadius:20,cursor:"pointer",
                  background:aTh===t.name?(TC[t.name]+"12"):"transparent",
                  color:aTh===t.name?TC[t.name]:T.textTri,
                  border:"1px solid "+(aTh===t.name?(TC[t.name]+"30"):T.borderL)}}>
                {t.name}
              </span>
            ))}
          </div>
          <Label>Reasoning</Label>
          <div style={{background:T.bg,borderRadius:T.rxs,padding:14,
            fontSize:11,fontStyle:"italic",color:T.textSec,lineHeight:1.7,
            borderLeft:"2px solid "+T.primary+"30"}}>{text||demo}</div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
            <Btn variant="ghost" onClick={()=>setStep(1)}>Back</Btn>
            <Btn onClick={()=>setStep(3)}>Continue</Btn>
          </div>
        </Card>
      )}

      {step===3 && (
        <Card>
          <div style={{fontSize:18,fontWeight:700,color:T.text,
            letterSpacing:"-.02em",marginBottom:20}}>Self-check</div>
          <Label>Emotional state</Label>
          <div style={{display:"flex",gap:6,marginBottom:24}}>
            {[["F","Fearful"],["N","Neutral"],["C","Confident"],
              ["G","Greedy"],["X","FOMO"]].map(([e,l]) => (
              <div key={l} onClick={()=>setEmo(l)}
                style={{flex:1,textAlign:"center",padding:"14px 0 10px",
                  borderRadius:T.rs,cursor:"pointer",
                  background:emo===l?T.tealSoft:T.bg,
                  border:"1px solid "+(emo===l?(T.teal+"30"):T.borderL)}}>
                <div style={{fontSize:20,marginBottom:3,fontWeight:700,
                  color:emo===l?T.teal:T.textTri}}>{e}</div>
                <div style={{fontSize:10,color:emo===l?T.teal:T.textTri,
                  fontWeight:600}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{background:T.redSoft,borderRadius:T.rs,padding:14,
            marginBottom:10,border:"1px solid "+T.red+"10"}}>
            <div style={{fontSize:11,fontWeight:700,color:T.red,marginBottom:3,
              display:"flex",alignItems:"center",gap:4}}>
              <AlertTriangle size={12}/>Position Impact
            </div>
            <div style={{fontSize:11,color:T.text,lineHeight:1.55}}>
              {"NVDA: 1,900 -> 1,500 shares. Value $2.13M -> $1.68M. Weight 8.6% -> 6.8%."}
            </div>
          </div>
          <div style={{background:T.amberSoft,borderRadius:T.rs,padding:14,
            border:"1px solid "+T.amber+"10"}}>
            <div style={{fontSize:11,fontWeight:600,color:T.amber}}>
              Your future self reads this. Make it honest.
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
            <Btn variant="ghost" onClick={()=>setStep(2)}>Back</Btn>
            <Btn onClick={()=>setStep(4)}>Continue</Btn>
          </div>
        </Card>
      )}

      {step===4 && (
        <Card>
          <div style={{fontSize:18,fontWeight:700,color:T.text,
            letterSpacing:"-.02em",marginBottom:4}}>
            {"Review & confirm"}
          </div>
          <div style={{fontSize:12,color:T.textSec,marginBottom:20}}>
            Permanent. Becomes part of the reasoning chain.
          </div>
          <div style={{background:T.bg,borderRadius:T.rs,padding:18}}>
            {[["Action","Sell 400 shares NVDA"],["Value","$448,000"],
              ["Thesis","US AI Infrastructure"],
              ["Trigger","Invalidation - Q4 DC miss"],
              ["State",emo||"Neutral"],
              ["Impact","8.6% -> 6.8%"]].map(([k,v]) => (
              <div key={k} style={{display:"flex",padding:"8px 0",
                borderBottom:"1px solid "+T.borderL}}>
                <span style={{width:80,fontSize:11,color:T.textTri,
                  flexShrink:0,fontWeight:500}}>{k}</span>
                <span style={{fontSize:11,fontWeight:600,color:T.text}}>{v}</span>
              </div>
            ))}
            <div style={{padding:"8px 0"}}>
              <span style={{fontSize:11,color:T.textTri,fontWeight:500}}>
                Reasoning
              </span>
              <div style={{fontSize:11,fontStyle:"italic",color:T.textSec,
                marginTop:6,lineHeight:1.65,
                borderLeft:"2px solid "+T.primary+"25",paddingLeft:10}}>
                {(text||demo).slice(0,200)}...
              </div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:22}}>
            <Btn variant="ghost" onClick={()=>setStep(3)}>Edit</Btn>
            <Btn variant="green" onClick={()=>{
              setStep(1);setText("");setExt(false);setEmo(null);
              setJT("US AI Infrastructure");setScreen("journey");
            }} style={{padding:"10px 30px",fontSize:13}}>Record Trade</Btn>
          </div>
        </Card>
      )}
    </div>
  );
}

/* === IDEAS SCREEN === */
function IS({setScreen,setJT}){
  const[tab,setTab]=useState("All");
  const fl = useMemo(()=>{
    if(tab==="All") return ideas;
    const m={Theses:"Thesis","Toe Dips":"Toe Dip",Ideas:"Idea",Snoozed:"Snoozed"};
    return ideas.filter(i=>i.stage===m[tab]);
  },[tab]);

  return (
    <div>
      <div style={{display:"flex",gap:12,marginBottom:22}}>
        <StatCard label="Theses" value="4" sub="$9.80M" accent={T.green}/>
        <StatCard label="Toe Dips" value="2" sub="$641K" accent={T.teal}/>
        <StatCard label="Ideas" value="2" sub="7 thoughts" accent={T.purple}/>
        <StatCard label="Snoozed" value="2"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 262px",gap:16}}>
        <div>
          <div style={{display:"flex",gap:3,marginBottom:14,background:T.card,
            borderRadius:T.rs,padding:3,border:"1px solid "+T.border,
            width:"fit-content"}}>
            {["All","Theses","Toe Dips","Ideas","Snoozed"].map(t => (
              <span key={t} onClick={()=>setTab(t)}
                style={{fontSize:11,fontWeight:600,padding:"6px 14px",
                  borderRadius:T.rxs,cursor:"pointer",
                  background:tab===t?T.primary:"transparent",
                  color:tab===t?"#fff":T.textTri}}>{t}</span>
            ))}
          </div>
          {fl.map(idea => (
            <Card key={idea.name} hover
              onClick={()=>{setJT(idea.name);setScreen("journey")}}
              style={{marginBottom:8,padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"flex-start"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,
                    marginBottom:4}}>
                    <span style={{fontSize:14,fontWeight:700,color:T.text,
                      letterSpacing:"-.01em"}}>{idea.name}</span>
                    <StageBadge stage={idea.stage}/>
                    {idea.stale && <Clock size={11} color={T.amber}/>}
                  </div>
                  <div style={{fontSize:11,color:T.textTri,fontStyle:"italic",
                    marginBottom:6,lineHeight:1.45}}>{idea.hyp}</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:4}}>
                    {idea.stocks.map(s =>
                      <Badge key={s} color={T.primary} soft small>{s}</Badge>
                    )}
                  </div>
                  <div style={{fontSize:10,color:T.textTri}}>
                    {idea.thoughts} thoughts, {idea.updated}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:16}}>
                  {idea.value && <div style={{fontSize:15,fontWeight:700,
                    color:T.text,letterSpacing:"-.02em"}}>{idea.value}</div>}
                  {idea.pnl && <div style={{fontSize:12,fontWeight:600,
                    color:idea.pnl.startsWith("+")?T.green:T.red}}>
                    {idea.pnl}</div>}
                  {idea.snoozeDate && <Badge color={T.amber} soft small>
                    {"R "+idea.snoozeDate}</Badge>}
                </div>
              </div>
              {idea.todo && <div style={{marginTop:8,padding:"5px 10px",
                background:T.amberSoft,borderRadius:T.rxs,fontSize:10,
                color:T.amber,fontWeight:500}}>{idea.todo}</div>}
            </Card>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,
              background:"linear-gradient(90deg,"+T.purple+","+T.teal+" 50%,"+T.green+")"}}/>
            <Label style={{marginTop:2}}>Conviction Funnel</Label>
            {[{l:"Thoughts",v:47,p:100,c:T.purple},
              {l:"Ideas",v:9,p:58,c:T.amber},
              {l:"Toe Dips",v:2,p:28,c:T.teal},
              {l:"Theses",v:4,p:18,c:T.green}].map(f => (
              <div key={f.l} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  fontSize:10,marginBottom:3}}>
                  <span style={{color:T.textTri,fontWeight:500}}>{f.l}</span>
                  <span style={{fontWeight:700,color:T.text}}>{f.v}</span>
                </div>
                <div style={{height:4,background:T.borderL,borderRadius:2,
                  overflow:"hidden"}}>
                  <div style={{width:f.p+"%",height:"100%",
                    background:"linear-gradient(90deg,"+f.c+","+f.c+"80)",
                    borderRadius:2}}/>
                </div>
              </div>
            ))}
            <div style={{fontSize:10,color:T.textTri,marginTop:4,fontWeight:500}}>
              22% to dip, 50% of dips to thesis
            </div>
          </Card>
          <Card>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Sparkles size={12} color={T.purple}/>
              <Label style={{marginBottom:0}}>AI Suggestions</Label>
              <Badge color={T.textTri} small>non-binding</Badge>
            </div>
            {[
              {t:"India SaaS has 4 thoughts - matches Indian Consumer at promotion (+28.4%).",
                n:"India SaaS Exports"},
              {t:"Quantum Adjacent may overlap AI Infra thesis stocks.",
                n:"Quantum Adjacent"}
            ].map((s,i) => (
              <div key={i} style={{
                background:"linear-gradient(135deg,"+T.purpleSoft+",#F8F6FE)",
                borderRadius:T.rxs,padding:10,marginBottom:5,
                border:"1px solid "+T.purple+"08"}}>
                <div style={{fontSize:11,color:T.text,lineHeight:1.5,
                  marginBottom:4}}>{s.t}</div>
                <span onClick={e=>{e.stopPropagation();
                  setJT(s.n);setScreen("journey")}}
                  style={{fontSize:10,color:T.purple,fontWeight:600,
                    cursor:"pointer"}}>{"Review >"}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* === APP === */
export default function App(){
  const[screen,setScreen]=useState("dashboard");
  const[jt,setJt]=useState("US AI Infrastructure");
  const[co,setCo]=useState(false);
  const[ct,setCt]=useState("");
  const nav = [
    {k:"dashboard",Icon:Sun,l:"Morning View"},
    {k:"ideas",Icon:Lightbulb,l:"Ideas & Theses"},
    {k:"journey",Icon:Route,l:"Journey View"},
    {k:"trade",Icon:ArrowLeftRight,l:"Trade Gate"},
  ];
  const titles = {
    dashboard:"Morning View",ideas:"Ideas & Theses",
    journey:"Journey - "+jt,trade:"Trade Gate"
  };

  return (
    <div style={{display:"flex",height:"100vh",
      fontFamily:"Inter,-apple-system,system-ui,sans-serif",
      background:T.bg,overflow:"hidden",color:T.text}}>
      <div style={{width:200,
        background:"linear-gradient(180deg,"+T.nav+","+T.navS+")",
        display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"24px 20px 22px"}}>
          <div style={{fontSize:15,fontWeight:800,color:"#fff",
            letterSpacing:"-.03em"}}>GPM</div>
          <div style={{fontSize:9,color:"#5D6180",marginTop:3,
            letterSpacing:".08em",fontWeight:600}}>PORTFOLIO MANAGER</div>
        </div>
        <div style={{flex:1,padding:"4px 10px"}}>
          {nav.map(n => {
            const a = screen===n.k;
            const NIcon = n.Icon;
            return (
              <div key={n.k} onClick={()=>setScreen(n.k)}
                style={{display:"flex",alignItems:"center",gap:10,
                  padding:"10px 12px",cursor:"pointer",borderRadius:T.rs,
                  background:a?T.navA:"transparent",marginBottom:1,
                  position:"relative"}}>
                {a && <div style={{position:"absolute",left:0,top:"20%",
                  bottom:"20%",width:2,borderRadius:1,background:T.primary,
                  boxShadow:"0 0 8px "+T.primary+"60"}}/>}
                <NIcon size={15} color={a?"#8DA0FF":"#5D6180"} strokeWidth={2}/>
                <span style={{fontSize:12,fontWeight:a?600:400,
                  color:a?"#E2E6F4":"#7E83A0"}}>{n.l}</span>
              </div>
            );
          })}
        </div>
        <div style={{padding:"14px 14px"}}>
          <button onClick={()=>setCo(true)}
            style={{width:"100%",padding:"11px 0",
              background:"linear-gradient(135deg,"+T.primary+","+T.primaryDark+")",
              color:"#fff",border:"none",borderRadius:T.rs,fontSize:12,
              fontWeight:600,cursor:"pointer",
              boxShadow:"0 2px 12px "+T.primary+"30",
              display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            <Plus size={14}/>Capture Thought
          </button>
        </div>
      </div>

      <div style={{flex:1,overflow:"auto"}}>
        <div style={{padding:"20px 30px 12px"}}>
          <div style={{fontSize:20,fontWeight:700,color:T.text,
            letterSpacing:"-.03em"}}>{titles[screen]}</div>
        </div>
        <div style={{padding:"0 30px 48px"}}>
          {screen==="dashboard" && <Dash setScreen={setScreen} setJT={setJt}/>}
          {screen==="journey" && <JV target={jt} setScreen={setScreen} setJT={setJt}/>}
          {screen==="trade" && <TG setScreen={setScreen} setJT={setJt}/>}
          {screen==="ideas" && <IS setScreen={setScreen} setJT={setJt}/>}
        </div>
      </div>

      {co && (
        <div style={{position:"fixed",inset:0,background:"rgba(12,14,22,.55)",
          backdropFilter:"blur(8px)",display:"flex",alignItems:"center",
          justifyContent:"center",zIndex:100}} onClick={()=>setCo(false)}>
          <div onClick={e=>e.stopPropagation()}
            style={{background:T.card,borderRadius:14,padding:30,width:440,
              boxShadow:T.shadowLg,border:"1px solid "+T.border}}>
            <div style={{fontSize:17,fontWeight:700,color:T.text,marginBottom:4,
              letterSpacing:"-.02em",display:"flex",alignItems:"center",gap:8}}>
              <MessageCircle size={18} color={T.purple}/>Capture Thought
            </div>
            <div style={{fontSize:12,color:T.textSec,marginBottom:16}}>
              Raw, unstructured. Tag and go.
            </div>
            <textarea value={ct} onChange={e=>setCt(e.target.value)}
              placeholder="What is on your mind..."
              style={{width:"100%",minHeight:90,padding:14,fontSize:12,
                border:"1px solid "+T.border,borderRadius:T.rs,resize:"vertical",
                fontFamily:"inherit",boxSizing:"border-box",color:T.text,
                lineHeight:1.6,outline:"none"}}
              onFocus={e=>{e.target.style.borderColor=T.primary;
                e.target.style.boxShadow="0 0 0 3px "+T.primary+"12";}}
              onBlur={e=>{e.target.style.borderColor=T.border;
                e.target.style.boxShadow="none";}}/>
            <Label style={{marginTop:14}}>Type</Label>
            <div style={{display:"flex",gap:5,marginBottom:14}}>
              {["Info","Trend","Assumption","Question","Todo"].map(t => (
                <span key={t} style={{fontSize:10,fontWeight:600,padding:"5px 12px",
                  borderRadius:T.rs,background:T.bg,color:T.textTri,
                  cursor:"pointer",border:"1px solid "+T.borderL}}>{t}</span>
              ))}
            </div>
            {ct.length>10 && (
              <div style={{
                background:"linear-gradient(135deg,"+T.purpleSoft+",#F8F6FE)",
                borderRadius:T.rs,padding:12,marginBottom:14,
                border:"1px solid "+T.purple+"08"}}>
                <div style={{fontSize:10,fontWeight:600,color:T.purple,
                  marginBottom:4,display:"flex",alignItems:"center",gap:4}}>
                  <Sparkles size={10}/>AI suggestion
                </div>
                <div style={{fontSize:11,color:T.text}}>
                  {"Matches \"India SaaS Exports\""}
                </div>
                <div style={{display:"flex",gap:8,marginTop:6}}>
                  <span style={{fontSize:10,color:T.purple,fontWeight:600,
                    cursor:"pointer"}}>{"Add >"}</span>
                  <span style={{fontSize:10,color:T.textTri,
                    cursor:"pointer"}}>New</span>
                  <span style={{fontSize:10,color:T.textTri,
                    cursor:"pointer"}}>Dismiss</span>
                </div>
              </div>
            )}
            <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
              <Btn variant="ghost" onClick={()=>{setCo(false);setCt("")}}>
                Cancel
              </Btn>
              <Btn onClick={()=>{setCo(false);setCt("")}}>Save</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}