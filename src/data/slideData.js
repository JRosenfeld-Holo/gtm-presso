export const CAPABILITIES = [
  {
    num: '01',
    title: 'BIG DATA',
    body: 'Always-on pipelines ingest behavioral, firmographic, technographic, and intent signals from across the web and Hologram\'s own product, unified into a single real-time profile per account. Signal quality improves continuously as win/loss data and engagement patterns feed back into the model.',
  },
  {
    num: '02',
    title: 'AI',
    body: 'A proprietary scoring model continuously ranks accounts and contacts by conversion probability, surfacing the highest-likelihood opportunities for immediate action. Signals are mapped to funnel stage — from early awareness through active evaluation — so every touchpoint matches the buyer\'s actual moment, not a generic cadence.',
  },
  {
    num: '03',
    title: 'AUTOMATION',
    body: 'When a qualifying signal fires, the system automatically initiates the appropriate outreach sequence with no manual handoff required. AI-generated context informs hyper-personalized outreach across email, phone, and social. Every rep executes with the same quality of insight regardless of tenure.',
  },
  {
    num: '04',
    title: 'SOFTWARE & TOOLS',
    body: 'Proprietary tooling and integrations connect data, AI, and automation into a unified GTM system. Custom-built workflows across HubSpot, Clay, and other platforms ensure the stack compounds over time rather than operating as a collection of disconnected point solutions.',
  },
]

export const FLOW_NODES = [
  {
    label: 'INTELLIGENCE',
    subs: ['ICP REFRESH'],
  },
  {
    label: 'PLANNING',
    subs: ['CONTENT ENGINEERING', 'CAMPAIGN STRATEGY'],
  },
  {
    label: 'TARGETING',
    subs: ['FIND ICP', 'LEAD LIST ENRICHMENT'],
    branch: ['CAMPAIGN + OUTBOUND', 'INBOUND (CHATBOT)'],
  },
  {
    label: 'ACTIVATION',
    subs: ['PAID · SEO', 'AEO · SEM'],
  },
  {
    label: 'ENGAGEMENT',
    subs: ['CAMPAIGN + OUTBOUND', 'INBOUND (CHATBOT)'],
  },
  {
    label: 'PIPELINE',
    subs: ['QUALIFY', 'CONVERT', 'DEAL VELOCITY'],
    isOutput: true,
  },
]

export const FLOW_LAYERS = [
  { label: 'BIG DATA', color: 'rgba(191,253,17,0.18)', textColor: '#bffd11' },
  { label: 'AI', color: 'rgba(83,242,250,0.12)', textColor: '#53F2FA' },
  { label: 'AUTOMATION', color: 'rgba(16,100,104,0.25)', textColor: '#53F2FA' },
  { label: 'SOFTWARE & TOOLS', color: 'rgba(58,60,70,0.4)', textColor: 'rgba(255,255,255,0.5)' },
]

export const PILLARS = [
  {
    title: 'TARGETING & ICP',
    items: ['Web enrichment', 'Account lists + enrichment', 'De-anonymization', 'Scoring', 'ICP intelligence'],
  },
  {
    title: 'CONTENT & BRAND',
    items: ['Content engineering', 'AEO + SEO optimization', 'Brand voice + assets', 'LLM + Custom MCP', 'ABM decks + pages'],
  },
  {
    title: 'PROSPECTING & OUTREACH',
    items: ['LinkedIn sequences', 'Email cadences', 'Automated cold calling', 'Call intelligence', 'Workflow automation'],
  },
  {
    title: 'CONVERSION',
    items: ['Chatbot', 'Email cadences', 'CRM', 'Meeting scheduler', 'Deal signal alerts', 'Inbound'],
  },
  {
    title: 'DEAL PROGRESSION',
    items: ['Pipeline', 'Call recording + intel', 'ABM decks/pages/MAPs', 'Deal velocity'],
  },
]

export const HOW_PILLARS = [
  {
    abbr: 'LEAN',
    title: 'LEAN AND FAST',
    body: 'A deliberately lean team structure eliminates organizational drag. Fewer layers means faster decisions, faster experiments, and faster iteration — compressing the time between insight and execution.',
  },
  {
    abbr: '∞',
    title: 'CONSTANT MEASUREMENT',
    body: 'Every won deal, lost deal, and engagement signal flows back into the model, making each cycle smarter and more accurate. ICP definitions tighten as patterns emerge. The result is a revenue organization that gets structurally better every quarter, not just bigger.',
  },
  {
    abbr: 'BUILD',
    title: 'BUILDERS, NOT OPERATORS',
    body: 'Engineers, BDRs, and marketers operate as builders — designing, deploying, and iterating on the systems that generate pipeline. Workflow integrations deepen over time and automation absorbs volume without adding headcount, producing operational leverage that widens with scale.',
  },
  {
    abbr: 'GROW',
    title: 'INVEST IN GROWTH',
    body: 'Learning is treated as infrastructure. The team continuously invests in new capabilities across AI, automation, and data tooling, alongside the institutional knowledge that accumulates from running a high-velocity GTM motion at scale.',
  },
]

export const LTV_CAC_SNAPSHOTS = [
  { quarter: "Q3'23", ltv: 16100, cac: 2400, ratio: 6.7, payback: 13.8 },
  { quarter: "Q3'24", ltv: 17700, cac: 2100, ratio: 8.4, payback: 11.2 },
  { quarter: "Q3'25", ltv: 21800, cac: 2200, ratio: 9.9, payback: 9.3 },
]

export const LTV_CAC_TREND = [
  { period: "Q1'24", ratio: 9.9 },
  { period: "Q2'24", ratio: 7.6 },
  { period: "Q3'24", ratio: 8.4 },
  { period: "Q4'24", ratio: 8.4 },
  { period: "Q1'25", ratio: 6.5 },
  { period: "Q2'25", ratio: 9.1 },
  { period: "Q3'25", ratio: 9.9 },
]

export const CAC_PAYBACK = [
  { quarter: "Q3'23", months: 13.8 },
  { quarter: "Q3'24", months: 11.2 },
  { quarter: "Q3'25", months: 9.3 },
]

export const VISIBILITY_METRICS = [
  { label: 'VISIBILITY (SEO)',       value: '20.01%', delta: '+2.00%', positive: true  },
  { label: 'MENTION RATE (LLM)',     value: '20.5%',  delta: '-0.7%',  positive: false },
  { label: 'CITATION RATE (LLM)',    value: '21.9%',  delta: '-6.3%',  positive: false },
  { label: 'CPC',                    value: '$0.16',  delta: '+2.6%',  positive: true  },
]
