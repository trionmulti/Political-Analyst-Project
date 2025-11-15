import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, Users, AlertCircle, Globe, BarChart3, MessageCircle, Clock, CheckCircle, XCircle, ChevronLeft, Hash, Info, Lightbulb, MessageSquare, Server, Database, Cloud, Settings, Sliders, BellRing, EyeOff, Eye, Newspaper, Cpu, HardDrive } from 'lucide-react';

// Tailwind CSS is assumed to be available

// --- Mock Data Simulation (Replace with actual API calls in a real application) ---
// This section simulates a backend providing real-time data from various sources.

const mockKeyFigures = [
  // Top Political Leaders
  {
    id: 'william-ruto',
    name: "William Ruto",
    type: "Politician",
    position: "President",
    party: "UDA",
    twitterHandle: "@WilliamsRuto",
    imageUrl: "https://placehold.co/100x100/A0C4FF/000000?text=WR",
    currentSentiment: "neutral",
    sentimentHistory: [
      { time: "00:00", score: 0.55 }, { time: "06:00", score: 0.60 },
      { time: "12:00", score: 0.50 }, { time: "18:00", score: 0.58 }
    ],
    topThemes: ["Economy", "Jobs", "Agriculture", "Housing", "Taxation"],
    recentMentions: [
      { id: 101, source: "X", content: "President Ruto's new housing initiative is a game-changer for many Kenyans.", sentiment: "positive", confidence: 0.88, timestamp: new Date(Date.now() - 10000).toISOString() },
      { id: 102, source: "News Article", content: "Concerns raised over the implementation speed of Ruto's economic agenda.", sentiment: "negative", confidence: 0.75, timestamp: new Date(Date.now() - 60000).toISOString() },
    ]
  },
  {
    id: 'raila-odinga',
    name: "Raila Odinga",
    type: "Politician",
    position: "Opposition Leader",
    party: "ODM (Azimio la Umoja-One Kenya)",
    twitterHandle: "@RailaOdinga",
    imageUrl: "https://placehold.co/100x100/FFD700/000000?text=RO",
    currentSentiment: "neutral",
    sentimentHistory: [
      { time: "00:00", score: 0.48 }, { time: "06:00", score: 0.52 },
      { time: "12:00", score: 0.45 }, { time: "18:00", score: 0.50 }
    ],
    topThemes: ["Electoral Reform", "Cost of Living", "Healthcare", "National Dialogue"],
    recentMentions: [
      { id: 103, source: "X", content: "Baba's call for dialogue gaining traction among civil society groups.", sentiment: "positive", confidence: 0.80, timestamp: new Date(Date.now() - 20000).toISOString() },
      { id: 104, source: "News Article", content: "Opposition leader Odinga criticizes government's handling of recent protests.", sentiment: "negative", confidence: 0.90, timestamp: new Date(Date.now() - 90000).toISOString() },
    ]
  },
  {
    id: 'rigathi-gachagua',
    name: "Rigathi Gachagua",
    type: "Politician",
    position: "Deputy President",
    party: "UDA",
    twitterHandle: "@rigathi",
    imageUrl: "https://placehold.co/100x100/C0C0C0/000000?text=RG",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Agriculture", "Mount Kenya Politics", "Economy"],
    recentMentions: [
      { id: 105, source: "News Article", content: "DP Gachagua addresses farmers on coffee reforms.", sentiment: "positive", confidence: 0.82, timestamp: new Date(Date.now() - 30000).toISOString() },
    ]
  },
  {
    id: 'kalonzo-musyoka',
    name: "Kalonzo Musyoka",
    type: "Politician",
    position: "Azimio Co-Principal",
    party: "Wiper Democratic Movement",
    twitterHandle: "@skmusyoka",
    imageUrl: "https://placehold.co/100x100/DDA0DD/000000?text=KM",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["National Unity", "Dialogue", "Regional Politics"],
    recentMentions: [
      { id: 106, source: "X", content: "Kalonzo emphasizes the need for bipartisan talks on national issues.", sentiment: "neutral", confidence: 0.70, timestamp: new Date(Date.now() - 40000).toISOString() },
    ]
  },
  {
    id: 'musalia-mudavadi',
    name: "Musalia Mudavadi",
    type: "Politician",
    position: "Prime Cabinet Secretary",
    party: "ANC (Kenya Kwanza)",
    twitterHandle: "@MusaliaMudavadi",
    imageUrl: "https://placehold.co/100x100/F0E68C/000000?text=MM",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Government Coordination", "Economic Policy", "Western Kenya Politics"],
    recentMentions: [
      { id: 107, source: "News Article", content: "Mudavadi chairs key cabinet meeting on development projects.", sentiment: "positive", confidence: 0.78, timestamp: new Date(Date.now() - 50000).toISOString() },
    ]
  },
  // Other Prominent Politicians/Leaders
  {
    id: 'martha-karua',
    name: "Martha Karua",
    type: "Politician",
    position: "Azimio Co-Principal",
    party: "Narc Kenya (Azimio la Umoja-One Kenya)",
    twitterHandle: "@MarthaKarua",
    imageUrl: "https://placehold.co/100x100/FFB6C1/000000?text=MK",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Justice", "Rule of Law", "Gender Equality"],
    recentMentions: [
      { id: 108, source: "X", content: "Karua speaks out on judicial independence.", sentiment: "neutral", confidence: 0.85, timestamp: new Date(Date.now() - 60000).toISOString() },
    ]
  },
  {
    id: 'kipchumba-murkomen',
    name: "Kipchumba Murkomen",
    type: "Politician",
    position: "CS Roads & Transport",
    party: "UDA",
    twitterHandle: "@kipmurkomen",
    imageUrl: "https://placehold.co/100x100/B0E0E6/000000?text=KMK",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Infrastructure", "Development", "Government Policy"],
    recentMentions: [
      { id: 109, source: "News Article", content: "Murkomen inspects ongoing road construction projects.", sentiment: "positive", confidence: 0.79, timestamp: new Date(Date.now() - 70000).toISOString() },
    ]
  },
  {
    id: 'narc-kenya',
    name: "Opiyo Wandayi",
    type: "Politician",
    position: "Minority Leader, National Assembly",
    party: "ODM (Azimio la Umoja-One Kenya)",
    twitterHandle: "@OpiyoWandayi",
    imageUrl: "https://placehold.co/100x100/ADD8E6/000000?text=OW",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Parliamentary Oversight", "Opposition Strategy", "Legislation"],
    recentMentions: [
      { id: 110, source: "News Article", content: "Wandayi questions government's transparency on public debt.", sentiment: "negative", confidence: 0.88, timestamp: new Date(Date.now() - 80000).toISOString() },
    ]
  },
  // Activists/Influencers
  {
    id: 'boniface-mwangi',
    name: "Boniface Mwangi",
    type: "Activist/Influencer",
    position: "Social Justice Advocate",
    party: "N/A",
    twitterHandle: "@bonifacemwangi",
    imageUrl: "https://placehold.co/100x100/FFB6C1/000000?text=BM",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Human Rights", "Accountability", "Youth Empowerment", "Police Brutality"],
    recentMentions: [
      { id: 201, source: "X", content: "Boniface Mwangi speaks truth to power on police brutality. #JusticeForVictims", sentiment: "positive", confidence: 0.92, timestamp: new Date(Date.now() - 15000).toISOString() },
    ]
  },
  {
    id: 'david-ndii',
    name: "David Ndii",
    type: "Economist/Advisor",
    position: "Chief Economic Advisor to the President",
    party: "N/A",
    twitterHandle: "@DavidNdii",
    imageUrl: "https://placehold.co/100x100/DDA0DD/000000?text=DNd",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Economic Policy", "Fiscal Reforms", "Development Strategy"],
    recentMentions: [
      { id: 202, source: "X", content: "David Ndii explains government's long-term economic vision.", sentiment: "neutral", confidence: 0.75, timestamp: new Date(Date.now() - 25000).toISOString() },
    ]
  },
  // Journalists/Commentators
  {
    id: 'mutahi-ngunyi',
    name: "Mutahi Ngunyi",
    type: "Political Analyst",
    position: "Political Commentator",
    party: "N/A",
    twitterHandle: "@MutahiNgunyi",
    imageUrl: "https://placehold.co/100x100/DDA0DD/000000?text=MN",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Political Strategy", "Governance", "Electoral Dynamics"],
    recentMentions: [
      { id: 203, source: "X", content: "Mutahi Ngunyi's analysis on the shifting political alliances is spot on.", sentiment: "neutral", confidence: 0.78, timestamp: new Date(Date.now() - 25000).toISOString() },
    ]
  },
  {
    id: 'gathara',
    name: "Patrick Gathara",
    type: "Journalist/Cartoonist",
    position: "Columnist",
    party: "N/A",
    twitterHandle: "@gathara",
    imageUrl: "https://placehold.co/100x100/ADD8E6/000000?text=PG",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Media Freedom", "Governance", "Satire", "Human Rights"],
    recentMentions: [
      { id: 204, source: "News Article", content: "Gathara's latest cartoon perfectly captures the public mood on current affairs.", sentiment: "positive", confidence: 0.85, timestamp: new Date(Date.now() - 35000).toISOString() },
    ]
  },
  {
    id: 'makau-mutua',
    name: "Makau Mutua",
    type: "Political Commentator/Lawyer",
    position: "Professor of Law",
    party: "N/A",
    twitterHandle: "@makaumutua",
    imageUrl: "https://placehold.co/100x100/FFDAB9/000000?text=MMt",
    currentSentiment: "neutral",
    sentimentHistory: [],
    topThemes: ["Law", "Human Rights", "Constitutionalism", "Political Commentary"],
    recentMentions: [
      { id: 205, source: "X", content: "Makau Mutua weighs in on the implications of recent court rulings.", sentiment: "neutral", confidence: 0.72, timestamp: new Date(Date.now() - 45000).toISOString() },
    ]
  },
  // Digital Influencers (already mostly covered, but adding a few more specific ones)
  { id: 'cyprian-nyakundi', name: "Cyprian Nyakundi", type: "Blogger/Influencer", twitterHandle: "@C_NyaKundiH", imageUrl: "https://placehold.co/100x100/FFDAB9/000000?text=CN" },
  { id: 'robert-alai', name: "Robert Alai", type: "Blogger/MCA", twitterHandle: "@RobertAlai", imageUrl: "https://placehold.co/100x100/D8BFD8/000000?text=RA" },
  { id: 'edgar-obare', name: "Edgar Obare", type: "Blogger/Influencer", twitterHandle: "@edgarobare", imageUrl: "https://placehold.co/100x100/E6E6FA/000000?text=EO" },
];

const mockDigitalInfluencersAndMedia = [
  // This list seems to be for general digital media, not necessarily individual figures
  { id: 'daily-nation-digital', name: "Daily Nation (Digital)", type: "Digital News Site", twitterHandle: "@dailynation", imageUrl: "https://placehold.co/100x100/B0E0E6/000000?text=DN" },
  { id: 'the-standard-digital', name: "The Standard (Digital)", type: "Digital News Site", twitterHandle: "@StandardKenya", imageUrl: "https://placehold.co/100x100/F0E68C/000000?text=TS" },
  { id: 'citizen-digital', name: "Citizen Digital", type: "Digital News Site", twitterHandle: "@citizentvkenya", imageUrl: "https://placehold.co/100x100/FFC0CB/000000?text=CD" },
  { id: 'the-star-digital', name: "The Star (Digital)", type: "Digital News Site", twitterHandle: "@TheStarKenya", imageUrl: "https://placehold.co/100x100/98FB98/000000?text=TS" },
  { id: 'k24-digital', name: "K24 Digital", type: "Digital News Site", twitterHandle: "@K24Tv", imageUrl: "https://placehold.co/100x100/E0BBE4/000000?text=K24" },
  { id: 'tuko', name: "Tuko.co.ke", type: "Digital News Site", twitterHandle: "@Tuko_co_ke", imageUrl: "https://placehold.co/100x100/DAA520/000000?text=TU" },
  { id: 'pulse-kenya', name: "Pulse Live Kenya", "type": "Digital News Site", twitterHandle: "@PulseLiveKenya", imageUrl: "https://placehold.co/100x100/B0C4DE/000000?text=PK" },
];

// Define major newspaper sources for headlines
const newspaperSources = [
  { id: 'daily-nation', name: 'Daily Nation', url: 'https://nation.africa/', type: 'daily' },
  { id: 'the-standard', name: 'The Standard', url: 'https://www.standardmedia.co.ke/', type: 'daily' },
  { id: 'the-star', name: 'The Star', url: 'https://www.the-star.co.ke/', type: 'daily' },
  { id: 'the-eastafrican', name: 'The EastAfrican', url: 'https://www.theeastafrican.co.ke/', type: 'weekly' },
  { id: 'taifa-leo', name: 'Taifa Leo', url: 'https://taifaleo.nation.africa/', type: 'daily' },
];


const mockApi = {
  fetchDashboardMetrics: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const total = Math.floor(Math.random() * 1000) + 2500;
        const positive = Math.floor(Math.random() * 20) + 40;
        const negative = Math.floor(Math.random() * 15) + 20;
        const neutral = 100 - positive - negative;
        const activeTopics = Math.floor(Math.random() * 5) + 10;
        const alertsCount = Math.floor(Math.random() * 3);

        const trendingTopics = [
          "Finance Bill 2025", "Cost of Living", "Youth Employment",
          "Healthcare Reforms", "National Dialogue", "Police Brutality",
          "Devolution Funding", "Digital Economy", "Saba Saba Protests",
          "Education Sector", "Agriculture Subsidies", "Corruption Crackdown",
          "Climate Change Kenya", "Digital Rights", "Press Freedom"
        ];
        const selectedTrendingTopics = Array.from({ length: 5 }).map(() => ({
          name: trendingTopics[Math.floor(Math.random() * trendingTopics.length)],
          engagement: Math.floor(Math.random() * 5000) + 1000
        }));

        const alertTypes = ["Critical", "Warning", "Info"];
        const alertMessages = [
          "Spike in negative sentiment around 'Finance Bill'.",
          "Unusual activity detected from bot networks.",
          "Key public figure's mention count dropped sharply.",
          "Potential misinformation campaign detected.",
          "High engagement on 'Youth Employment' topic.",
          "Deepfake content identified in political video."
        ];
        const alerts = Array.from({ length: alertsCount }).map((_, i) => ({
          id: `alert-${Date.now() + i}`,
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
          timestamp: new Date(Date.now() - (i * 3600000)).toISOString()
        }));

        const serviceStatuses = ["Operational", "Degraded", "Offline", "Critical"];
        const getRandomStatus = () => serviceStatuses[Math.floor(Math.random() * serviceStatuses.length)];
        const getRandomLatency = () => Math.floor(Math.random() * 150) + 10;

        const systemServices = [
          { name: "Ingestion Service", status: getRandomStatus(), latency: getRandomLatency() },
          { name: "Preprocessing Service", status: getRandomStatus(), latency: getRandomLatency() },
          { name: "NLP Analysis Service", status: getRandomStatus(), latency: getRandomLatency() },
          { name: "Deepfake Detection Service", status: getRandomStatus(), latency: getRandomLatency() },
          { name: "Aggregation Service", status: getRandomStatus(), latency: getRandomLatency() },
          { name: "Database Service", status: getRandomStatus(), latency: getRandomLatency() },
        ];

        const dataSourceStatuses = ["Active", "Degraded", "Disconnected"];
        const getRandomDataSourceStatus = () => dataSourceStatuses[Math.floor(Math.random() * dataSourceStatuses.length)];

        const dataSources = [
          { name: "X (Twitter) Stream", status: getRandomDataSourceStatus() },
          { name: "News APIs (Local/Intl.)", status: getRandomDataSourceStatus() },
          { name: "Blog Aggregators", status: getRandomDataSourceStatus() },
          { name: "Government Portals", status: getRandomDataSourceStatus() },
          { name: "Forum Scrapers", status: getRandomDataSourceStatus() },
        ];


        resolve({
          totalMentions: total,
          positiveSentiment: positive,
          negativeSentiment: negative,
          neutralSentiment: neutral,
          activeTopics: activeTopics,
          alerts: alerts,
          trendingTopics: [...new Set(selectedTrendingTopics.map(t => t.name))].map(name => ({
            name,
            engagement: selectedTrendingTopics.find(t => t.name === name).engagement
          })),
          systemServices: systemServices,
          dataSources: dataSources
        });
      }, 1500);
    });
  },

  fetchRealTimeFeed: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const sources = ["X", "X", "X", "X", "Daily Nation", "The Standard", "The Star", "The EastAfrican", "Taifa Leo", "Blog Post", "Government Press Release", "Forum Discussion"]; // Prioritize X and Newspapers
        const sentiments = ["positive", "negative", "neutral"];
        const themesList = ["taxation", "economy", "education", "healthcare", "infrastructure", "governance", "corruption", "youth employment", "devolution", "elections", "protests", "cost of living", "digital rights", "press freedom"];
        const keyFiguresNames = mockKeyFigures.map(f => f.name);
        const bloggerNames = mockDigitalInfluencersAndMedia.filter(d => d.type === "Blogger/Influencer").map(b => b.name);
        const allEntities = [...keyFiguresNames, ...bloggerNames, "Gen Z", "Civil Society", "Media Council"];
        const kenyanTermsList = ["Baba", "Hustler", "Dynasty", "Finance Bill", "Handshake", "Mwananchi", "Saba Saba"];
        const hashtagsList = ["#KenyaPolitics", "#FinanceBill2025", "#CostOfLivingKE", "#YouthVoice", "#KOT", "#PressFreedomKE", "#JudiciaryKE"];

        const generateRandomContent = (source, sentiment, entity, term, hashtag) => {
          let content = "";
          const rand = Math.random();
          const theme = themesList[Math.floor(rand * themesList.length)];
          const chosenHashtag = hashtag || hashtagsList[Math.floor(rand * hashtagsList.length)];

          if (source === "X") {
            content = `Just saw a tweet about the new ${theme} policy. ${sentiment === 'positive' ? 'Seems promising!' : 'Facing criticism.'} ${chosenHashtag}`;
            if (entity && Math.random() > 0.5) content += ` @${entity.split(' ')[0].toLowerCase()}`;
          } else if (newspaperSources.map(n => n.name).includes(source)) { // Check if source is a newspaper
            content = `${source} reports: ${entity || 'Government'} ${sentiment === 'positive' ? 'announces major policy shift' : 'faces scrutiny'} on ${theme}.`;
            if (Math.random() > 0.3) content += ` Read more on their website.`;
          } else if (source === "Blog Post") {
            content = `Deep dive: Why '${term || kenyanTermsList[Math.floor(rand * kenyanTermsList.length)]}' narrative continues to ${sentiment === 'positive' ? 'resonate' : 'divide'} voters. By ${bloggerNames[Math.floor(rand * bloggerNames.length)] || 'A prominent blogger'}.`;
          } else if (source === "Government Press Release") {
            content = `Ministry of ${theme} releases new guidelines for ${sentiment === 'positive' ? 'improved service delivery' : 'budget cuts'}.`;
          } else if (source === "Forum Discussion") {
            content = `Debate on ${theme} heats up. Public opinion is ${sentiment}.`;
          }
          return content;
        };

        const newEntries = Array.from({ length: 20 }).map((_, i) => {
          const source = sources[Math.floor(Math.random() * sources.length)];
          const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
          const entity = Math.random() > 0.4 ? allEntities[Math.floor(Math.random() * allEntities.length)] : null;
          const term = Math.random() > 0.5 ? kenyanTermsList[Math.floor(Math.random() * kenyanTermsList.length)] : null;
          const hashtag = Math.random() > 0.6 ? hashtagsList[Math.floor(Math.random() * hashtagsList.length)] : null;
          const content = generateRandomContent(source, sentiment, entity, term, hashtag);

          return {
            id: Date.now() + i,
            timestamp: new Date(Date.now() - (i * 60000)).toISOString(),
            source: source,
            content: content,
            sentiment: sentiment,
            confidence: parseFloat((Math.random() * 0.3 + 0.6).toFixed(2)),
            themes: [themesList[Math.floor(Math.random() * themesList.length)]],
            entities: entity ? [entity] : [],
            hashtags: hashtag ? [hashtag] : [],
            bias_indicators: Math.random() > 0.8 ? ["emotional language"] : [],
            fact_check_needed: Math.random() > 0.9,
            is_misinformation: Math.random() > 0.95,
            regional_relevance: Math.random() > 0.7 ? "National" : "County"
          };
        });
        resolve(newEntries);
      }, 1000);
    });
  },

  fetchKeyFigures: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const updatedFigures = mockKeyFigures.map(figure => ({
          ...figure,
          currentSentiment: Math.random() > 0.6 ? "positive" : (Math.random() > 0.3 ? "negative" : "neutral"),
          recentMentions: figure.recentMentions.length > 0 ? figure.recentMentions : [
            { id: Date.now() + Math.random(), source: "X", content: `${figure.name} commented on the latest bill.`, sentiment: "neutral", confidence: 0.7, timestamp: new Date().toISOString() }
          ]
        }));
        resolve(updatedFigures);
      }, 700);
    });
  },

  // --- New: Simulated Newspaper Headlines Fetcher ---
  // Modified to generate more headlines for a given date, or for a range of dates
  fetchDailyNewspaperHeadlines: async (dateOrDateRange) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const headlines = [];
        const themes = ["Politics", "Governance", "Economy", "Legislation", "Elections", "Judiciary", "Security", "Public Service", "Devolution", "Foreign Relations", "Human Rights", "Youth Affairs", "Corruption"];
        const actions = ["passes bill", "faces crisis", "announces reforms", "criticizes opposition", "launches initiative", "holds talks", "investigates scandal", "approves budget", "rejects proposal", "calls for dialogue", "warns against unrest"];
        const actors = ["President", "Opposition Leader", "Parliament", "Judiciary", "Cabinet", "Counties", "Civil Society", "International Community", "Police IG", "CS Education", "Health CS"];
        const outcomes = ["amidst public outcry", "to boost economy", "sparking debate", "for national unity", "after heated session", "despite challenges", "drawing mixed reactions", "to curb corruption", "for sustainable development"];

        const generateHeadlinesForDate = (dateString, initialSeed) => {
          const dailyHeadlines = [];
          let currentSeed = initialSeed;

          const pseudoRandom = () => {
            currentSeed = (currentSeed * 9301 + 49297) % 233280;
            return currentSeed / 233280;
          };

          newspaperSources.forEach(source => {
            const numHeadlines = source.type === 'daily' ? (Math.floor(pseudoRandom() * 3) + 2) : 1; // 2-4 for daily, 1 for weekly
            for (let i = 0; i < numHeadlines; i++) {
              const theme = themes[Math.floor(pseudoRandom() * themes.length)];
              const action = actions[Math.floor(pseudoRandom() * actions.length)];
              const actor = actors[Math.floor(pseudoRandom() * actors.length)];
              const outcome = outcomes[Math.floor(pseudoRandom() * outcomes.length)];

              let headlineText;
              switch (source.id) {
                case 'daily-nation':
                  headlineText = `${actor} ${action} ${theme} ${outcome}.`;
                  break;
                case 'the-standard':
                  headlineText = `Standard Exclusive: ${actor} in ${theme} showdown ${outcome}.`;
                  break;
                case 'the-star':
                  headlineText = `BREAKING: ${theme} takes center stage as ${actor} ${action} ${outcome}.`;
                  break;
                case 'the-eastafrican':
                  headlineText = `Regional Focus: East African leaders eye ${theme} reforms ${outcome}.`;
                  break;
                case 'taifa-leo':
                  headlineText = `TAIFA LEO: Siasa moto! ${actor} ${action} kuhusu ${theme} ${outcome}.`;
                  break;
                default:
                  headlineText = `${theme} development: ${actor} ${action}.`;
              }

              dailyHeadlines.push({
                id: `${source.id}-${dateString}-${i}`,
                source: source.name,
                url: source.url, // Link to the actual newspaper homepage
                headline: headlineText,
                date: dateString,
                is_political: true
              });
            }
          });
          return dailyHeadlines;
        };

        if (Array.isArray(dateOrDateRange)) {
          // If a range of dates is requested (for "View All" functionality)
          dateOrDateRange.forEach(dateString => {
            const seed = dateString.replace(/-/g, '');
            const initialSeed = parseInt(seed.substring(seed.length - 8));
            headlines.push(...generateHeadlinesForDate(dateString, initialSeed));
          });
        } else {
          // If a single date is requested (for daily view)
          const dateString = dateOrDateRange;
          const seed = dateString.replace(/-/g, '');
          const initialSeed = parseInt(seed.substring(seed.length - 8));
          headlines.push(...generateHeadlinesForDate(dateString, initialSeed));
        }

        resolve(headlines);
      }, 500); // Simulate faster load for headlines
    });
  }
};

const KenyanPoliticalAnalyst = () => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'figures', 'system', 'analysis'
  const [activeView, setActiveView] = useState('main'); // 'main', 'politician-profile', 'all-headlines-detail'

  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalMentions: 0,
    positiveSentiment: 0,
    negativeSentiment: 0,
    neutralSentiment: 0,
    activeTopics: 0,
    alerts: [],
    trendingTopics: [],
    systemServices: [],
    dataSources: []
  });
  const [realTimeFeed, setRealTimeFeed] = useState([]);
  const [keyFigures, setKeyFigures] = useState([]);
  const [selectedFigure, setSelectedFigure] = useState(null);

  const [analysisData, setAnalysisData] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [topicToSummarize, setTopicToSummarize] = useState('');
  const [summarizedTopicData, setSummarizedTopicData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [statementToRespond, setStatementToRespond] = useState('');
  const [desiredSentiment, setDesiredSentiment] = useState('neutral');
  const [suggestedResponseData, setSuggestedResponseData] = useState(null);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const [selectedAIModel, setSelectedAIModel] = useState('General Political Analysis');

  // State for expandable dashboard sections
  const [showTotalMentionsDetail, setShowTotalMentionsDetail] = useState(false);
  const [showPositiveSentimentDetail, setShowPositiveSentimentDetail] = useState(false);
  const [showActiveTopicsDetail, setShowActiveTopicsDetail] = useState(false);
  const [showAlertsDetail, setShowAlertsDetail] = useState(false);

  // State for dashboard section visibility (User-Configurable Dashboard)
  const [dashboardSectionVisibility, setDashboardSectionVisibility] = useState({
    realTimeFeed: true,
    trendingTopics: true,
    // systemStatus: true, // Removed from dashboard
    // dataSources: true, // Removed from dashboard
    // keyFigures: true, // Removed from dashboard
    newspaperHeadlines: true,
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // State for Event Spike Analysis simulation
  const [eventAnalysisTopic, setEventAnalysisTopic] = useState('');
  const [eventAnalysisResult, setEventAnalysisResult] = useState(null);
  const [loadingEventAnalysis, setLoadingEventAnalysis] = useState(false);

  // State for Custom Alerts
  const [customAlertKeyword, setCustomAlertKeyword] = useState('');
  const [customAlertSentiment, setCustomAlertSentiment] = useState('any');
  const [customAlerts, setCustomAlerts] = useState([]);

  // State for Newspaper Headlines feature
  const [selectedHeadlineDate, setSelectedHeadlineDate] = useState(new Date());
  const [dailyHeadlines, setDailyHeadlines] = useState([]);
  const [loadingHeadlines, setLoadingHeadlines] = useState(false);

  // State for "All Headlines" view
  const [allHeadlines, setAllHeadlines] = useState([]);
  const [loadingAllHeadlines, setLoadingAllHeadlines] = useState(false);


  const availableAIModels = [
    { id: 'General Political Analysis', name: 'General Political Analysis', description: 'Broad analysis of sentiment, themes, and entities.' },
    { id: 'Kenya-Specific Bias Detector', name: 'Kenya-Specific Bias Detector', description: 'Focuses on identifying political and regional biases.' },
    { id: 'Policy Impact Predictor', name: 'Policy Impact Predictor', description: 'Simulates potential public reaction to policy statements.' },
    { id: 'Narrative Trend Identifier', name: 'Narrative Trend Identifier', description: 'Identifies evolving narratives and counter-narratives.' },
  ];


  // Kenyan political context data (static for now, but could be dynamic)
  const kenyaTerms = {
    "Baba": "Raila Odinga (a popular nickname)",
    "Hustler": "William Ruto's political narrative focusing on empowering ordinary citizens",
    "Dynasty": "Political families like Kenyatta and Odinga, often contrasted with 'Hustler'",
    "BBI": "Building Bridges Initiative (a constitutional reform proposal)",
    "Finance Bill": "Annual government budget legislation, often a source of public debate",
    "Handshake": "Refers to the 2018 reconciliation between President Uhuru Kenyatta and opposition leader Raila Odinga",
    "Mwananchi": "Swahili for 'citizen' or 'ordinary person', often used in political discourse"
  };

  // --- Data Fetching and Real-time Simulation ---
  useEffect(() => {
    const refreshDashboardData = async () => {
      try {
        const metrics = await mockApi.fetchDashboardMetrics();
        setDashboardMetrics(metrics);

        const feedEntries = await mockApi.fetchRealTimeFeed();
        setRealTimeFeed(prev => [...feedEntries, ...prev].slice(0, 20)); // Keep more for detailed views

        const figures = await mockApi.fetchKeyFigures();
        setKeyFigures(figures);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    refreshDashboardData();
    const intervalId = setInterval(refreshDashboardData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Effect for fetching daily newspaper headlines based on selected date
  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoadingHeadlines(true);
      setDailyHeadlines([]);
      try {
        const dateString = selectedHeadlineDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const headlines = await mockApi.fetchDailyNewspaperHeadlines(dateString);
        setDailyHeadlines(headlines);
      } catch (error) {
        console.error("Failed to fetch newspaper headlines:", error);
        setDailyHeadlines([{ id: 'error', source: 'System', headline: 'Failed to load headlines.', date: selectedHeadlineDate.toISOString().split('T')[0] }]);
      } finally {
        setLoadingHeadlines(false);
      }
    };
    fetchHeadlines();
  }, [selectedHeadlineDate]); // Re-fetch when date changes

  // Effect for fetching ALL (simulated) historical headlines for the dedicated view
  useEffect(() => {
    const fetchAllHistoricalHeadlines = async () => {
      setLoadingAllHeadlines(true);
      setAllHeadlines([]);
      try {
        const datesToFetch = [];
        const today = new Date();
        // Simulate fetching for the last 30 days
        for (let i = 0; i < 30; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          datesToFetch.push(d.toISOString().split('T')[0]);
        }
        const historicalHeadlines = await mockApi.fetchDailyNewspaperHeadlines(datesToFetch);
        // Sort by date descending
        historicalHeadlines.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllHeadlines(historicalHeadlines);
      } catch (error) {
        console.error("Failed to fetch all historical headlines:", error);
        setAllHeadlines([{ id: 'error-all', source: 'System', headline: 'Failed to load historical headlines.', date: new Date().toISOString().split('T')[0] }]);
      } finally {
        setLoadingAllHeadlines(false);
      }
    };

    if (activeView === 'all-headlines-detail') {
      fetchAllHistoricalHeadlines();
    }
  }, [activeView]); // Only run when activeView changes to 'all-headlines-detail'


  // --- Utility Functions ---
  const getSentimentColor = useCallback((sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case 'operational': return 'bg-green-500';
      case 'active': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'disconnected': return 'bg-red-500';
      case 'offline': return 'bg-red-500';
      case 'critical': return 'bg-red-700';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  }, []);

  const getSentimentIcon = useCallback((sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return <CheckCircle className="w-4 h-4" />;
      case 'negative': return <XCircle className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  }, []);

  const getAlertIcon = useCallback((type) => {
    switch (type?.toLowerCase()) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-700" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-700" />;
      case 'info': return <Info className="w-4 h-4 text-blue-700" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-700" />;
    }
  }, []);

  const cleanLLMResponse = (response) => {
    if (response.candidates && response.candidates.length > 0 &&
        response.candidates[0].content && response.candidates[0].content.parts &&
        response.candidates[0].content.parts.length > 0) {
      const jsonString = response.candidates[0].content.parts[0].text;
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse LLM response as JSON:", e);
        return { error: "LLM response format error", details: jsonString || "No text in response." };
      }
    } else {
      return { error: "LLM response empty or malformed.", details: JSON.stringify(response) };
    }
  };

  // --- LLM Interaction Functions ---
  const analyzeStatement = useCallback(async (statement, modelName) => {
    setLoadingAnalysis(true);
    setAnalysisData(null);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      let modelSpecificInstructions = "";
      if (modelName === 'Kenya-Specific Bias Detector') {
        modelSpecificInstructions = "Specifically focus on identifying political, regional, and media biases in the Kenyan context. Flag any loaded language or unfair framing.";
      } else if (modelName === 'Policy Impact Predictor') {
        modelSpecificInstructions = "Predict the potential public reaction and socio-economic impact of this statement in Kenya. Consider different demographics and regions.";
      } else if (modelName === 'Narrative Trend Identifier') {
        modelSpecificInstructions = "Identify the underlying narrative this statement supports or counters. Suggest related trending narratives in Kenyan politics.";
      }

      const prompt = `
        Analyze the following political statement in the context of Kenyan and global politics.
        Consider content from social media (like X/Twitter), digital news outlets, traditional news media, blog posts, forum discussions, and government communications.
        ${modelSpecificInstructions}

        Statement to analyze: "${statement}"

        Respond with a JSON object in this exact format:
        {
          "sentiment": "positive/negative/neutral",
          "confidence": 0.85,
          "key_themes": ["theme1", "theme2", "theme3"],
          "political_figures": ["Any mentioned political figures (e.g., William Ruto, Raila Odinga, vocal MPs, Senators, Governors)"],
          "kenyan_context": "Brief explanation of Kenyan-specific terms, references, and local implications",
          "global_context": "Brief explanation of relevant global political context or implications",
          "political_implications": "Analysis of political implications in Kenyan and global context",
          "target_audience": "Likely target demographic",
          "bias_indicators": ["Any potential bias indicators (e.g., emotional language, generalizations, framing)"],
          "fact_check_needed_claims": ["Claims that need verification (list of specific factual claims)"],
          "regional_relevance": "National/County/Local/International level relevance"
        }

        DO NOT INCLUDE ANY TEXT OUTSIDE THE JSON OBJECT. RESPOND ONLY WITH VALID JSON.
      `;

      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              sentiment: { type: "STRING" },
              confidence: { type: "NUMBER" },
              key_themes: { type: "ARRAY", items: { type: "STRING" } },
              political_figures: { type: "ARRAY", items: { type: "STRING" } },
              kenyan_context: { type: "STRING" },
              global_context: { type: "STRING" },
              political_implications: { type: "STRING" },
              target_audience: { type: "STRING" },
              bias_indicators: { type: "ARRAY", items: { type: "STRING" } },
              fact_check_needed_claims: { type: "ARRAY", items: { type: "STRING" } },
              regional_relevance: { type: "STRING" }
            }
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      const analysisResult = cleanLLMResponse(result);
      if (analysisResult.error) {
        setAnalysisData(analysisResult);
      } else {
        setAnalysisData(analysisResult);
        const newFeedEntry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          source: `User Analysis (${modelName})`,
          content: statement,
          sentiment: analysisResult.sentiment,
          confidence: analysisResult.confidence,
          themes: analysisResult.key_themes,
          entities: analysisResult.political_figures,
          bias_indicators: analysisResult.bias_indicators,
          fact_check_needed: analysisResult.fact_check_needed_claims.length > 0,
          regional_relevance: analysisResult.regional_relevance
        };
        setRealTimeFeed(prev => [newFeedEntry, ...prev.slice(0, 9)]);
      }

    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisData({
        error: "Failed to analyze statement. Please check the input and try again.",
        details: error.message || "Unknown error occurred."
      });
    } finally {
      setLoadingAnalysis(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      analyzeStatement(searchQuery.trim(), selectedAIModel);
    }
  }, [searchQuery, analyzeStatement, selectedAIModel]);

  // Summarize Trending Topic Feature
  const summarizeTopic = useCallback(async (topic, modelName) => {
    setLoadingSummary(true);
    setSummarizedTopicData(null);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      let modelSpecificInstructions = "";
      if (modelName === 'Kenya-Specific Bias Detector') {
        modelSpecificInstructions = "Focus on how different biases (political, regional, media) influence the discourse around this topic.";
      } else if (modelName === 'Policy Impact Predictor') {
        modelSpecificInstructions = "Predict the likely public and policy impacts of this topic's trends.";
      } else if (modelName === 'Narrative Trend Identifier') {
        modelSpecificInstructions = "Identify the main narratives and counter-narratives currently shaping this topic.";
      }

      const prompt = `
        Summarize the current political discourse surrounding the topic "${topic}" in Kenya.
        Highlight the dominant sentiment, key viewpoints from different political actors (including government, opposition, bloggers, digital media), and any emerging sub-topics.
        ${modelSpecificInstructions}
        Respond with a JSON object in this exact format:
        {
          "topic": "${topic}",
          "summary": "Concise summary of the discourse.",
          "dominant_sentiment": "positive/negative/neutral/mixed",
          "key_viewpoints": [
            {"actor": "Government/Ruling Party", "view": "..."},
            {"actor": "Opposition", "view": "..."},
            {"actor": "Bloggers/Digital Media", "view": "..."},
            {"actor": "Public/Civil Society", "view": "..."}
          ],
          "emerging_subtopics": ["subtopic1", "subtopic2"]
        }
        DO NOT INCLUDE ANY TEXT OUTSIDE THE JSON OBJECT. RESPOND ONLY WITH VALID JSON.
      `;

      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              topic: { type: "STRING" },
              summary: { type: "STRING" },
              dominant_sentiment: { type: "STRING" },
              key_viewpoints: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    actor: { type: "STRING" },
                    view: { type: "STRING" }
                  }
                }
              },
              emerging_subtopics: { type: "ARRAY", items: { type: "STRING" } }
            }
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      const summaryResult = cleanLLMResponse(result);
      if (summaryResult.error) {
        setSummarizedTopicData(summaryResult);
      } else {
        setSummarizedTopicData(summaryResult);
      }

    } catch (error) {
      console.error("Topic summary error:", error);
      setSummarizedTopicData({
        error: "Failed to summarize topic. Please try again.",
        details: error.message || "Unknown error occurred."
      });
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  const handleTopicClickForSummary = useCallback((topic) => {
    setTopicToSummarize(topic);
    setActiveTab('analysis');
    summarizeTopic(topic, selectedAIModel);
  }, [summarizeTopic, selectedAIModel]);

  // Generate Response Suggestion Feature
  const suggestResponse = useCallback(async (originalStatement, desiredTone, modelName) => {
    setLoadingResponse(true);
    setSuggestedResponseData(null);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      let modelSpecificInstructions = "";
      if (modelName === 'Policy Impact Predictor') {
        modelSpecificInstructions = "Craft the response to maximize the desired impact on public perception, considering the predicted reactions.";
      } else if (modelName === 'Narrative Trend Identifier') {
        modelSpecificInstructions = "Formulate the response to either reinforce a specific narrative or counter an opposing one, aligning with current trends.";
      }

      const prompt = `
        Generate a political response to the following original statement, aiming for a "${desiredTone}" sentiment.
        The response should be suitable for a Kenyan political context, considering common communication styles on platforms like X/Twitter, and addressing the core of the original statement.
        ${modelSpecificInstructions}

        Original Statement: "${originalStatement}"
        Desired Sentiment/Tone: "${desiredTone}"

        Respond with a JSON object in this exact format:
        {
          "suggested_response": "Generated response text.",
          "response_tone": "${desiredTone}",
          "key_message": "The main point of the suggested response."
        }
        DO NOT INCLUDE ANY TEXT OUTSIDE THE JSON OBJECT. RESPOND ONLY WITH VALID JSON.
      `;

      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              suggested_response: { type: "STRING" },
              response_tone: { type: "STRING" },
              key_message: { type: "STRING" }
            }
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      const responseResult = cleanLLMResponse(result);
      if (responseResult.error) {
        setSuggestedResponseData(responseResult);
      } else {
        setSuggestedResponseData(responseResult);
      }

    } catch (error) {
      console.error("Response suggestion error:", error);
      setSuggestedResponseData({
        error: "Failed to suggest response. Please try again.",
        details: error.message || "Unknown error occurred."
      });
    } finally {
      setLoadingResponse(false);
    }
  }, []);

  const handleSuggestResponse = useCallback(() => {
    if (statementToRespond.trim()) {
      suggestResponse(statementToRespond.trim(), desiredSentiment, selectedAIModel);
    }
  }, [statementToRespond, desiredSentiment, suggestResponse, selectedAIModel]);

  // Simulate Event Spike Analysis
  const simulateEventAnalysis = useCallback(async (topic) => {
    setLoadingEventAnalysis(true);
    setEventAnalysisResult(null);
    try {
      // Simulate API call to a backend event analysis service
      await new Promise(resolve => setTimeout(resolve, 2000));

      const sentimentChange = (Math.random() * 0.4 - 0.2).toFixed(2);
      const mentionSpike = Math.floor(Math.random() * 500) + 200;
      const newNarrative = Math.random() > 0.5 ? "shifting public focus" : "reinforcing existing divides";
      const affectedGroups = Math.random() > 0.5 ? ["Youth", "Civil Society"] : ["Business Community", "Rural Voters"];

      setEventAnalysisResult({
        topic: topic,
        sentiment_change: parseFloat(sentimentChange),
        mention_spike: mentionSpike,
        new_narrative_emerging: newNarrative,
        affected_demographics: affectedGroups,
        recommendations: "Monitor closely for further shifts. Engage key influencers in affected demographics."
      });
    } catch (error) {
      console.error("Event analysis error:", error);
      setEventAnalysisResult({ error: "Failed to run event analysis." });
    } finally {
      setLoadingEventAnalysis(false);
    }
  }, []);

  // Handle Custom Alert Creation
  const handleCreateCustomAlert = useCallback(() => {
    if (customAlertKeyword.trim()) {
      const newAlert = {
        id: Date.now(),
        keyword: customAlertKeyword.trim(),
        sentiment: customAlertSentiment,
        status: 'Active',
        created: new Date().toLocaleString()
      };
      setCustomAlerts(prev => [...prev, newAlert]);
      setCustomAlertKeyword('');
      setCustomAlertSentiment('any');
      console.log("Custom alert created:", newAlert);
    }
  }, [customAlertKeyword, customAlertSentiment]);

  // --- Utility for Date Navigation ---
  const formatDateForInput = (date) => date.toISOString().split('T')[0];
  const parseDateFromInput = (dateString) => new Date(dateString + 'T00:00:00'); // Ensure UTC for consistency

  const handleDateChange = (event) => {
    setSelectedHeadlineDate(parseDateFromInput(event.target.value));
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedHeadlineDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedHeadlineDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedHeadlineDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedHeadlineDate(newDate);
  };

  // --- Render Functions for Different Views ---

  // Renders a single feed item (used in multiple places)
  const renderFeedItem = useCallback((item) => (
    <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">{item.source}</span>
            <span className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleTimeString()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getSentimentColor(item.sentiment)}`}>
              {getSentimentIcon(item.sentiment)}
              {item.sentiment}
            </span>
            {item.is_misinformation && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Misinformation
              </span>
            )}
          </div>
          <p className="text-gray-800 mb-2 font-inter">{item.content}</p>
          <div className="flex flex-wrap gap-1">
            {item.themes?.map((theme, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {theme}
              </span>
            ))}
            {item.entities?.map((entity, idx) => (
              <span key={`entity-${idx}`} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                {entity}
              </span>
            ))}
            {item.hashtags?.map((hashtag, idx) => (
              <span key={`hashtag-${idx}`} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                {hashtag}
              </span>
            ))}
          </div>
          {item.bias_indicators && item.bias_indicators.length > 0 && (
            <div className="mt-2 text-xs text-yellow-700 flex items-center gap-1">
              <Info className="w-3 h-3" />
              <span>Bias Indicators: {item.bias_indicators.join(', ')}</span>
            </div>
          )}
          {item.fact_check_needed && (
            <div className="mt-2 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>Fact Check Needed!</span>
            </div>
          )}
        </div>
        <div className="text-right ml-4">
          <div className="text-sm font-medium text-gray-600">
            {Math.round(item.confidence * 100)}%
          </div>
          <div className="text-xs text-gray-500">confidence</div>
        </div>
      </div>
    </div>
  ), [getSentimentColor, getSentimentIcon]);

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Mentions Card */}
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <div
            className="bg-white p-4 rounded-lg shadow border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowTotalMentionsDetail(!showTotalMentionsDetail)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mentions</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalMentions.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          {showTotalMentionsDetail && (
            <div className="mt-2 p-4 bg-blue-50 rounded-lg shadow-inner border border-blue-200 animate-fade-in">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Top Entities Mentioned
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {/* Dynamically count and sort entities */}
                {
                  // Refactored to prevent TypeError: Cannot read properties of undefined (reading 'length')
                  (() => {
                    const entitiesData = realTimeFeed.flatMap(item => item.entities || []);
                    if (entitiesData.length > 0) {
                      return Object.entries(entitiesData.reduce((acc, entity) => {
                        acc[entity] = (acc[entity] || 0) + 1;
                        return acc;
                      }, {}))
                      .sort(([, countA], [, countB]) => countB - countA)
                      .slice(0, 5)
                      .map(([entity, count]) => (
                        <div key={entity} className="p-2 bg-white rounded-md border border-blue-100">
                          <p className="text-sm text-gray-800 font-medium">{entity}</p>
                          <p className="text-xs text-gray-600">{count} mentions</p>
                        </div>
                      ));
                    }
                    return <p className="text-sm text-gray-500 text-center">No mention data available.</p>;
                  })()
                }
              </div>
            </div>
          )}
        </div>

        {/* Positive Sentiment Card */}
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <div
            className="bg-white p-4 rounded-lg shadow border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowPositiveSentimentDetail(!showPositiveSentimentDetail)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Positive Sentiment</p>
                <p className="text-2xl font-bold text-green-600">{dashboardMetrics.positiveSentiment}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          {showPositiveSentimentDetail && (
            <div className="mt-2 p-4 bg-green-50 rounded-lg shadow-inner border border-green-200 animate-fade-in">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Top Positive Mentions
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {realTimeFeed
                  .filter(item => item.sentiment === 'positive')
                  .sort((a, b) => b.confidence - a.confidence)
                  .slice(0, 5)
                  .map((item) => (
                    <div key={item.id} className="p-2 bg-white rounded-md border border-green-100">
                      <p className="text-sm text-gray-800 line-clamp-2">{item.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                        <span>Source: {item.source}</span>
                        <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                      </div>
                    </div>
                  ))}
              </div>
              {realTimeFeed.filter(item => item.sentiment === 'positive').length === 0 && (
                <p className="text-sm text-gray-500 text-center">No positive mentions right now.</p>
              )}
            </div>
          )}
        </div>

        {/* Active Topics Card */}
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <div
            className="bg-white p-4 rounded-lg shadow border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowActiveTopicsDetail(!showActiveTopicsDetail)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Topics</p>
                <p className="text-2xl font-bold text-purple-600">{dashboardMetrics.activeTopics}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          {showActiveTopicsDetail && (
            <div className="mt-2 p-4 bg-purple-50 rounded-lg shadow-inner border border-purple-200 animate-fade-in">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Top Trending Hashtags/Topics
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {
                  // Refactored to prevent TypeError: Cannot read properties of undefined (reading 'length')
                  (() => {
                    const hashtagsData = realTimeFeed.flatMap(item => item.hashtags || []);
                    if (hashtagsData.length > 0) {
                      return Object.entries(hashtagsData.reduce((acc, hashtag) => {
                        acc[hashtag] = (acc[hashtag] || 0) + 1;
                        return acc;
                      }, {}))
                      .sort(([, countA], [, countB]) => countB - countA)
                      .slice(0, 5)
                      .map(([hashtag, count]) => (
                        <div key={hashtag} className="p-2 bg-white rounded-md border border-purple-100">
                          <p className="text-sm font-medium text-gray-800">{hashtag}</p>
                          <p className="text-xs text-gray-600">{count} mentions</p>
                        </div>
                      ));
                    }
                    return <p className="text-sm text-gray-500 text-center">No active topics right now.</p>;
                  })()
                }
              </div>
            </div>
          )}
        </div>

        {/* Alerts Card */}
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <div
            className="bg-white p-4 rounded-lg shadow border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowAlertsDetail(!showAlertsDetail)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-red-600">{dashboardMetrics.alerts.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          {showAlertsDetail && (
            <div className="mt-2 p-4 bg-red-50 rounded-lg shadow-inner border border-red-200 animate-fade-in">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Recent System Alerts
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {dashboardMetrics.alerts.length > 0 ? (
                  dashboardMetrics.alerts.map((alert) => (
                    <div key={alert.id} className="p-2 bg-white rounded-md border border-red-100">
                      <div className="flex items-center gap-2">
                        {getAlertIcon(alert.type)}
                        <span className={`font-medium text-sm ${alert.type === 'Critical' ? 'text-red-700' : alert.type === 'Warning' ? 'text-yellow-700' : 'text-blue-700'}`}>
                          {alert.type}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm text-gray-800 mt-1">{alert.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center">No active alerts.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Daily Newspaper Headlines */}
      {dashboardSectionVisibility.newspaperHeadlines && (
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-gray-700" />
              Daily Newspaper Headlines
            </h3>
            <p className="text-sm text-gray-600 mt-1">Simulated political and governance headlines from major Kenyan newspapers for the selected date.</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <button
                onClick={handlePreviousDay}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Previous Day
              </button>
              <input
                type="date"
                value={formatDateForInput(selectedHeadlineDate)}
                onChange={handleDateChange}
                className="px-3 py-1 border rounded-lg text-center flex-grow sm:flex-grow-0"
              />
              <button
                onClick={handleNextDay}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Next Day
              </button>
              <button
                onClick={() => setActiveView('all-headlines-detail')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ml-auto"
              >
                View All Headlines
              </button>
            </div>
            {loadingHeadlines ? (
              <p className="text-center text-gray-500">Loading headlines...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newspaperSources.map(source => {
                  const sourceHeadlines = dailyHeadlines.filter(h => h.source === source.name);
                  return (
                    <div key={source.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <img src={`https://placehold.co/20x20/E0E0E0/000000?text=${source.name.split(' ').map(n => n[0]).join('')}`} alt={source.name} className="rounded-full" />
                        {source.name}
                      </h4>
                      {sourceHeadlines.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {sourceHeadlines.map(h => (
                            <li key={h.id}>
                              <a href={h.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                                {h.headline}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No political headlines for this date from {source.name}.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}


      {/* Real-time Political Feed */}
      {dashboardSectionVisibility.realTimeFeed && (
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-700" />
              Real-time Political Feed (Latest 10)
            </h3>
            <p className="text-sm text-gray-600 mt-1">Primarily from X (Twitter) and News sources.</p>
          </div>
          <div className="divide-y divide-gray-100">
            {realTimeFeed.length > 0 ? (
              realTimeFeed.slice(0, 10).map(renderFeedItem)
            ) : (
              <p className="p-4 text-gray-500 text-center">No real-time data available. Simulating data...</p>
            )}
          </div>
        </div>
      )}

      {/* Trending Topics */}
      {dashboardSectionVisibility.trendingTopics && (
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-gray-700" />
              Trending Topics ✨
            </h3>
            <p className="text-sm text-gray-600 mt-1">Click a topic to get an AI-powered summary.</p>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {dashboardMetrics.trendingTopics.length > 0 ? (
              dashboardMetrics.trendingTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicClickForSummary(topic.name)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors duration-200"
                >
                  #{topic.name.replace(/\s/g, '')}
                </button>
              ))
            ) : (
              <p className="p-4 text-gray-500">No trending topics available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Politician/Figure Profile View
  const renderFigureProfile = () => (
    <div className="space-y-6">
      <button
        onClick={() => setActiveTab('figures')} // Go back to the figures list
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <ChevronLeft className="w-5 h-5" /> Back to All Figures
      </button>
      {selectedFigure && (
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <img
              src={selectedFigure.imageUrl}
              alt={selectedFigure.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/E0E0E0/000000?text=NA"; }}
            />
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">{selectedFigure.name}</h3>
              <p className="text-lg text-gray-700">{selectedFigure.type} • {selectedFigure.position || selectedFigure.party}</p>
              {selectedFigure.twitterHandle && (
                <p className="text-blue-600 text-sm mt-1">
                  Twitter: <a href={`https://twitter.com/${selectedFigure.twitterHandle.substring(1)}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{selectedFigure.twitterHandle}</a>
                </p>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(selectedFigure.currentSentiment)} mt-2 inline-block`}>
                Current Sentiment: {selectedFigure.currentSentiment}
              </span>
            </div>
          </div>

          {/* Sentiment Trend Chart Placeholder */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Sentiment Trend (Last 24h)</h4>
            <div className="h-48 flex items-center justify-center text-gray-500">
              <BarChart3 className="w-6 h-6 mr-2" />
              Chart Placeholder (Integrate a charting library here, e.g., Recharts)
            </div>
            <ul className="flex justify-around text-xs text-gray-600 mt-2">
              {selectedFigure.sentimentHistory.map((data, idx) => (
                <li key={idx}>{data.time}: {(data.score * 100).toFixed(0)}%</li>
              ))}
            </ul>
          </div>

          {/* Top Themes */}
          {selectedFigure.topThemes?.length > 0 && (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Top Themes</h4>
              <div className="flex flex-wrap gap-2">
                {selectedFigure.topThemes.map((theme, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Mentions */}
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Recent Mentions
              </h4>
            </div>
            <div className="divide-y divide-gray-100">
              {selectedFigure.recentMentions?.length > 0 ? (
                selectedFigure.recentMentions.map(renderFeedItem)
              ) : (
                <p className="p-4 text-gray-500 text-center">No recent mentions found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // All Headlines Detail View
  const renderAllHeadlinesDetail = () => (
    <div className="space-y-6">
      <button
        onClick={() => setActiveView('main')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-gray-700" />
          All Historical Newspaper Headlines (Simulated)
        </h3>
        <p className="text-sm text-gray-600 mb-4">Displaying political and governance headlines from the last 30 days.</p>
        {loadingAllHeadlines ? (
          <p className="text-center text-gray-500">Loading historical headlines...</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {allHeadlines.length > 0 ? (
              allHeadlines.map(h => (
                <div key={h.id} className="p-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-600">{h.source}</span>
                      <span className="text-xs text-gray-500">{h.date}</span>
                    </div>
                    <p className="text-gray-800 font-inter text-md">
                      <a href={h.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                        {h.headline}
                      </a>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">No historical headlines available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // New: Render Key Figures List Page
  const renderKeyFiguresList = () => (
    <div className="space-y-6">
      <button
        onClick={() => setActiveTab('dashboard')} // Go back to the dashboard
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-700" />
            All Key Public & Political Figures
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            A comprehensive list of influential individuals in Kenyan politics and public discourse.
            Click on a figure to view their detailed profile.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {keyFigures.map((figure) => (
            <div
              key={figure.id}
              className="p-4 bg-gray-50 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => { setSelectedFigure(figure); setActiveView('politician-profile'); }}
            >
              <img
                src={figure.imageUrl}
                alt={figure.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/E0E0E0/000000?text=NA"; }}
              />
              <div>
                <h4 className="font-medium text-gray-900">{figure.name}</h4>
                <p className="text-sm text-gray-600">{figure.type} • {figure.position || figure.party}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(figure.currentSentiment)} mt-1 inline-block`}>
                  {figure.currentSentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // New: Render System Status Detail Page
  const renderSystemStatusDetail = () => (
    <div className="space-y-6">
      <button
        onClick={() => setActiveTab('dashboard')} // Go back to the dashboard
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      {/* Backend System Status */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-gray-700" />
            Backend System Status (Mock)
          </h3>
          <p className="text-sm text-gray-600 mt-1">Simulated health of core microservices.</p>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardMetrics.systemServices.map((service, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <span className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></span>
              <div>
                <p className="font-medium text-gray-800">{service.name}</p>
                <p className="text-sm text-gray-600">Status: {service.status} ({service.latency}ms)</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-gray-700" />
            Configured Data Sources (Mock)
          </h3>
          <p className="text-sm text-gray-600 mt-1">Simulated status of data ingestion pipelines.</p>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboardMetrics.dataSources.map((source, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <span className={`w-3 h-3 rounded-full ${getStatusColor(source.status)}`}></span>
              <div>
                <p className="font-medium text-gray-800">{source.name}</p>
                <p className="text-sm text-gray-600">Status: {source.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  // Analysis Tab Content
  const renderAnalysis = () => (
    <div className="space-y-6">
      {/* AI Model Selection */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-gray-700" />
          AI Model Selection
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose a specialized AI model for your analysis tasks. This simulates using different backend AI capabilities.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="aiModelSelect" className="font-medium text-gray-700">Select Model:</label>
          <select
            id="aiModelSelect"
            value={selectedAIModel}
            onChange={(e) => setSelectedAIModel(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableAIModels.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {availableAIModels.find(model => model.id === selectedAIModel)?.description}
        </p>
      </div>

      {/* Summarize Trending Topic Feature */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          Summarize Trending Topic ✨
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={topicToSummarize}
            onChange={(e) => setTopicToSummarize(e.target.value)}
            placeholder="Enter a topic (e.g., 'Finance Bill 2025')"
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => summarizeTopic(topicToSummarize, selectedAIModel)}
            disabled={loadingSummary || !topicToSummarize.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
            {loadingSummary ? 'Summarizing...' : 'Summarize Topic'}
          </button>
        </div>

        {loadingSummary && (
          <div className="text-center text-purple-600 font-medium mt-4">
            <p>Generating summary, please wait...</p>
          </div>
        )}
        {summarizedTopicData && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            {summarizedTopicData.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <p className="font-medium">Error: {summarizedTopicData.error}</p>
                <p className="text-sm">{summarizedTopicData.details}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-semibold text-gray-800">Topic: {summarizedTopicData.topic}</p>
                <p className="text-gray-700">{summarizedTopicData.summary}</p>
                <p className="text-sm text-gray-600">Dominant Sentiment: <span className={`font-medium ${getSentimentColor(summarizedTopicData.dominant_sentiment)} px-2 py-0.5 rounded-full`}>{summarizedTopicData.dominant_sentiment}</span></p>
                {summarizedTopicData.key_viewpoints && summarizedTopicData.key_viewpoints.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700">Key Viewpoints:</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {summarizedTopicData.key_viewpoints.map((vp, idx) => (
                        <li key={idx}><strong>{vp.actor}:</strong> {vp.view}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {summarizedTopicData.emerging_subtopics && summarizedTopicData.emerging_subtopics.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700">Emerging Sub-topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {summarizedTopicData.emerging_subtopics.map((sub, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Generate Response Suggestion Feature */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-orange-600" />
          Generate Response Suggestion ✨
        </h3>
        <div className="flex flex-col gap-4 mb-4">
          <textarea
            value={statementToRespond}
            onChange={(e) => setStatementToRespond(e.target.value)}
            placeholder="Enter an original political statement to generate a response for..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[80px] resize-y"
            rows={3}
          />
          <div className="flex items-center gap-4">
            <label htmlFor="desiredSentiment" className="text-gray-700 font-medium">Desired Tone:</label>
            <select
              id="desiredSentiment"
              value={desiredSentiment}
              onChange={(e) => setDesiredSentiment(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
              <option value="conciliatory">Conciliatory</option>
              <option value="critical">Critical</option>
            </select>
            <button
              onClick={handleSuggestResponse}
              disabled={loadingResponse || !statementToRespond.trim()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200 ml-auto"
            >
              <Lightbulb className="w-4 h-4" />
              {loadingResponse ? 'Generating...' : 'Suggest Response'}
            </button>
          </div>
        </div>

        {loadingResponse && (
          <div className="text-center text-orange-600 font-medium mt-4">
            <p>Generating response, please wait...</p>
          </div>
        )}
        {suggestedResponseData && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            {suggestedResponseData.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <p className="font-medium">Error: {suggestedResponseData.error}</p>
                <p className="text-sm">{suggestedResponseData.details}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-semibold text-gray-800">Suggested Response:</p>
                <p className="text-gray-700 italic">"{suggestedResponseData.suggested_response}"</p>
                <p className="text-sm text-gray-600">Intended Tone: <span className={`font-medium ${getSentimentColor(suggestedResponseData.response_tone)} px-2 py-0.5 rounded-full`}>{suggestedResponseData.response_tone}</span></p>
                {suggestedResponseData.key_message && (
                  <p className="text-sm text-gray-600">Key Message: {suggestedResponseData.key_message}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Misinformation & Disinformation Alerts */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Misinformation & Disinformation Alerts
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Identified content with potential false information or deceptive patterns.
        </p>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {realTimeFeed.filter(item => item.is_misinformation).length > 0 ? (
            realTimeFeed.filter(item => item.is_misinformation).map((item) => (
              <div key={item.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 text-red-800 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>Misinformation Detected from {item.source}</span>
                  <span className="ml-auto text-xs text-gray-600">{new Date(item.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">{item.content}</p>
                <p className="text-xs text-gray-500 mt-1">Fact-check needed: {item.fact_check_needed ? 'Yes' : 'No'}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm">No misinformation alerts currently.</p>
          )}
        </div>
      </div>

      {/* Event-Driven Spike Analysis */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Event-Driven Spike Analysis
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Simulate analysis of public discourse around a specific political event.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={eventAnalysisTopic}
            onChange={(e) => setEventAnalysisTopic(e.target.value)}
            placeholder="Enter event topic (e.g., 'Judicial Ruling on BBI')"
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => simulateEventAnalysis(eventAnalysisTopic)}
            disabled={loadingEventAnalysis || !eventAnalysisTopic.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Sliders className="w-4 h-4" />
            {loadingEventAnalysis ? 'Analyzing Event...' : 'Analyze Event Impact'}
          </button>
        </div>

        {loadingEventAnalysis && (
          <div className="text-center text-indigo-600 font-medium mt-4">
            <p>Running event analysis, please wait...</p>
          </div>
        )}
        {eventAnalysisResult && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            {eventAnalysisResult.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <p className="font-medium">Error: {eventAnalysisResult.error}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">Event: {eventAnalysisResult.topic}</p>
                <p className="text-gray-700 text-sm">Sentiment Change: <span className={eventAnalysisResult.sentiment_change > 0 ? 'text-green-600' : 'text-red-600'}>{eventAnalysisResult.sentiment_change > 0 ? '+' : ''}{eventAnalysisResult.sentiment_change}%</span></p>
                <p className="text-gray-700 text-sm">Mention Spike: <span className="font-medium">{eventAnalysisResult.mention_spike.toLocaleString()} new mentions</span></p>
                <p className="text-gray-700 text-sm">New Narrative: {eventAnalysisResult.new_narrative_emerging}</p>
                <p className="text-gray-700 text-sm">Affected Demographics: {eventAnalysisResult.affected_demographics.join(', ')}</p>
                <p className="text-gray-700 text-sm">Recommendations: {eventAnalysisResult.recommendations}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Alert System */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BellRing className="w-5 h-5 text-teal-600" />
          Custom Alert System
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Set up custom alerts for specific keywords and sentiment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={customAlertKeyword}
            onChange={(e) => setCustomAlertKeyword(e.target.value)}
            placeholder="Keyword (e.g., 'Finance Bill', 'Gen Z')"
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={customAlertSentiment}
            onChange={(e) => setCustomAlertSentiment(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="any">Any Sentiment</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="critical_spike">Critical Spike</option>
          </select>
          <button
            onClick={handleCreateCustomAlert}
            disabled={!customAlertKeyword.trim()}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <BellRing className="w-4 h-4" />
            Create Alert
          </button>
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Active Custom Alerts:</h4>
          {customAlerts.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {customAlerts.map(alert => (
                <div key={alert.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <p className="font-medium">Keyword: "{alert.keyword}"</p>
                  <p>Sentiment: {alert.sentiment} | Status: {alert.status}</p>
                  <p className="text-xs text-gray-500">Created: {alert.created}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No custom alerts set up yet.</p>
          )}
        </div>
      </div>

      {/* General Political Statement Analyzer */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Political Statement Analyzer</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a political statement to analyze (e.g., 'President Ruto's new tax policy is hurting small businesses across Kenya')..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
            rows={4}
          />
          <button
            onClick={handleSearch}
            disabled={loadingAnalysis || !searchQuery.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
            {loadingAnalysis ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {loadingAnalysis && (
        <div className="bg-white rounded-lg shadow border p-6 text-center text-blue-600 font-medium">
          <p>Analyzing statement, please wait...</p>
        </div>
      )}
      {analysisData && (
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>

          {analysisData.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Analysis Error</span>
              </div>
              <p className="text-red-700 mt-2">{analysisData.error}</p>
              {analysisData.details && (
                <p className="text-red-600 text-sm mt-1">{analysisData.details}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Sentiment & Confidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getSentimentIcon(analysisData.sentiment)}
                    <span className="font-medium text-gray-700">Sentiment</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(analysisData.sentiment)}`}>
                    {analysisData.sentiment}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-gray-700" />
                    <span className="font-medium text-gray-700">Confidence</span>
                  </div>
                  <span className="text-lg font-semibold text-blue-600">
                    {Math.round(analysisData.confidence * 100)}%
                  </span>
                </div>
              </div>

              {/* Key Themes */}
              {analysisData.key_themes?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Key Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.key_themes.map((theme, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Political Figures */}
              {analysisData.political_figures?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Political Figures Mentioned</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.political_figures.map((figure, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {figure}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contextual Analysis */}
              {(analysisData.kenyan_context || analysisData.global_context || analysisData.political_implications || analysisData.target_audience) && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-medium text-sm text-gray-600">Contextual Analysis</h4>
                  {analysisData.kenyan_context && (
                    <div>
                      <p className="font-medium text-sm text-gray-600">Kenyan Context:</p>
                      <p className="text-gray-800">{analysisData.kenyan_context}</p>
                    </div>
                  )}
                  {analysisData.global_context && (
                    <div>
                      <p className="font-medium text-sm text-gray-600">Global Context:</p>
                      <p className="text-gray-800">{analysisData.global_context}</p>
                    </div>
                  )}
                  {analysisData.political_implications && (
                    <div>
                      <p className="font-medium text-sm text-gray-600">Political Implications:</p>
                      <p className="text-gray-800">{analysisData.political_implications}</p>
                    </div>
                  )}
                  {analysisData.target_audience && (
                    <div>
                      <p className="font-medium text-sm text-gray-600">Likely Target Audience:</p>
                      <p className="text-gray-800">{analysisData.target_audience}</p>
                    </div>
                  )}
                  {analysisData.regional_relevance && (
                    <div>
                      <p className="font-medium text-sm text-gray-600">Regional Relevance:</p>
                      <p className="text-gray-800">{analysisData.regional_relevance}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Bias Indicators */}
              {analysisData.bias_indicators?.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium mb-2 text-yellow-800">Potential Bias Indicators</h4>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1 text-sm">
                    {analysisData.bias_indicators.map((bias, idx) => (
                      <li key={idx}>{bias}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fact Check Needed */}
              {analysisData.fact_check_needed_claims?.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium mb-2 text-red-800">Claims Requiring Verification</h4>
                  <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                    {analysisData.fact_check_needed_claims.map((claim, idx) => (
                      <li key={idx}>{claim}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Kenyan Political Context Guide */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Kenyan Political Context Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(kenyaTerms).map(([term, definition]) => (
            <div key={term} className="bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-blue-600">{term}:</span>
              <span className="text-gray-700 ml-2">{definition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings Modal Component
  const SettingsModal = ({ isVisible, onClose, visibilitySettings, onToggleVisibility }) => {
    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-xl font-semibold text-gray-900">Dashboard Settings</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            {Object.entries(visibilitySettings).map(([key, isVisible]) => (
              <div key={key} className="flex items-center justify-between">
                <label htmlFor={key} className="text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace('Headlines', ' Headlines').trim()}
                </label>
                <button
                  onClick={() => onToggleVisibility(key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                    isVisible ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {isVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };


  // --- Main Render Logic ---
  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      {/* Header */}
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kenyan Political Analyst</h1>
                <p className="text-sm text-gray-600">AI-Powered Political Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title="Dashboard Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2 text-gray-500">
                <Globe className="w-5 h-5" />
                <span className="text-sm">Kenya & Global Politics</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => { setActiveTab('dashboard'); setActiveView('main'); }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'dashboard' && activeView === 'main'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('figures'); setActiveView('main'); }} // New tab for figures
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'figures'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Figures
            </button>
            <button
              onClick={() => { setActiveTab('system'); setActiveView('main'); }} // New tab for system status
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'system'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              System
            </button>
            <button
              onClick={() => { setActiveTab('analysis'); setActiveView('main'); }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'analysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analysis
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          activeView === 'main' ? renderDashboard() :
          activeView === 'all-headlines-detail' ? renderAllHeadlinesDetail() : null
        )}
        {activeTab === 'figures' && (
          activeView === 'main' ? renderKeyFiguresList() :
          activeView === 'politician-profile' ? renderFigureProfile() : null
        )}
        {activeTab === 'system' && renderSystemStatusDetail()}
        {activeTab === 'analysis' && renderAnalysis()}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isVisible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        visibilitySettings={dashboardSectionVisibility}
        onToggleVisibility={(key) =>
          setDashboardSectionVisibility(prev => ({ ...prev, [key]: !prev[key] }))
        }
      />
    </div>
  );
};

export default KenyanPoliticalAnalyst;
