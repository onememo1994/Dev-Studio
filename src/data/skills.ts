import { AreaId, SkillAreaData, TechAreaId } from "../types/skills";
import {
  Globe,
  Server,
  Container,
  FlaskConical,
  Database,
  MessageCircle,
  Users,
  Lightbulb,
  Clock,
  Target,
  Sparkles,
  Heart,
  Mic,
  Handshake,
  Brain,
} from "lucide-react";

export const TECH_AREAS: Record<TechAreaId, SkillAreaData> = {
  frontend: {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    description: "HTML, CSS, JavaScript and modern frameworks — choose a framework to dive deep.",
    concepts: [], // Framework-specific
    resources: [], // Framework-specific
    checklist: [
      { id: "perf", label: "Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms)" },
      { id: "a11y", label: "Semantic HTML & ARIA — screen reader accessible" },
      { id: "resp", label: "Responsive layout (mobile-first, fluid typography)" },
      { id: "seo", label: "Meta tags, OG, structured data (schema.org)" },
      { id: "bundle", label: "Bundle analysis — no unnecessary dependencies" },
      { id: "lazy", label: "Lazy load routes & heavy components" },
      { id: "error", label: "Error boundaries & graceful fallbacks" },
      { id: "csp", label: "Content Security Policy headers set" },
      { id: "fonts", label: "Font optimization (preload, font-display: swap)" },
      { id: "img", label: "Images: WebP/AVIF, srcset, lazy loading" },
    ],
    subAreas: [
      {
        id: "react",
        label: "React",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["react"],
        concepts: [
          {
            title: "Composition over Inheritance",
            body: "Build complex UIs by nesting specialized components. Use children prop for layouts.",
          },
          {
            title: "Immutability",
            body: "Never mutate state directly. Use setState/dispatch. Enables fast comparisons and time-travel debugging.",
          },
          {
            title: "Hooks Pattern",
            body: "Logic reuse without classes. Custom hooks for data fetching, auth, and complex state.",
          },
          {
            title: "Server Components",
            body: "Move logic to the server. Zero-bundle size for static parts. Direct DB access.",
          },
        ],
        resources: [
          {
            label: "React Docs",
            url: "https://react.dev",
            desc: "The new official React documentation.",
          },
          {
            label: "Beta Docs — Hooks",
            url: "https://react.dev/reference/react",
            desc: "Deep dive into React Hooks API.",
          },
        ],
      },
      {
        id: "angular",
        label: "Angular",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["angular"],
      },
      {
        id: "vue",
        label: "Vue.js",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["vue"],
      },
      {
        id: "svelte",
        label: "Svelte",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["svelte"],
      },
      {
        id: "nextjs",
        label: "Next.js",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["nextjs"],
      },
    ],
  },
  backend: {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "APIs, databases, authentication, and scalable architecture — choose your stack.",
    concepts: [],
    resources: [],
    checklist: [
      { id: "auth", label: "Authentication & authorization (JWT/session, RBAC)" },
      { id: "valid", label: "Input validation & sanitization on every endpoint" },
      { id: "sql", label: "Parameterized queries — no string concatenation" },
      { id: "rate", label: "Rate limiting on auth and sensitive endpoints" },
      { id: "https", label: "HTTPS enforced; security headers set" },
      { id: "logs", label: "Structured logging with correlation IDs" },
      { id: "health", label: "Health check endpoint configured" },
      { id: "migrations", label: "DB migrations versioned and reversible" },
      { id: "secrets", label: "Secrets in env vars / vault — never hardcoded" },
      { id: "timeout", label: "Request timeouts & circuit breakers on external calls" },
    ],
    subAreas: [
      {
        id: "node",
        label: "Node.js",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["nodejs"],
      },
      {
        id: "aspnet",
        label: "ASP.NET Core",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["aspnet"],
      },
      {
        id: "python",
        label: "Python/FastAPI",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["python", "fastapi"],
      },
      {
        id: "go",
        label: "Go",
        color: "border-primary/40 bg-primary/10 text-primary",
        accent: "border-primary/30",
        tags: ["go"],
      },
      {
        id: "supabase",
        label: "Supabase",
        color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
        accent: "border-emerald-500/30",
        tags: ["supabase", "postgres", "baas"],
        concepts: [
          {
            title: "PostgreSQL Under the Hood",
            body: "Supabase is not a black-box NoSQL DB; it's a full Postgres database. Use triggers, functions, and RLS directly.",
          },
          {
            title: "Row Level Security (RLS)",
            body: "Secure data at the database layer. Policies determine who can read/write rows based on their JWT auth context.",
          },
          {
            title: "Realtime",
            body: "Listen to Postgres changes via WebSockets. Requires enabling Realtime on specific tables and proper RLS.",
          },
        ],
        resources: [
          {
            label: "Supabase Docs",
            url: "https://supabase.com/docs",
            desc: "Official documentation and guides.",
          },
        ],
      },
    ],
  },
  database: {
    id: "database",
    label: "Database",
    icon: Database,
    description:
      "SQL, NoSQL, Redis, indexing, transactions, schema design, and scaling — deeply covered.",
    concepts: [
      {
        title: "ACID Transactions",
        body: "Atomicity, Consistency, Isolation, Durability. Postgres is fully ACID.",
      },
      {
        title: "B-Tree Indexes",
        body: "Default index type. Sorted tree allowing O(log n) lookups and range scans.",
      },
      {
        title: "Query Planning",
        body: "Optimizer chooses between index scans, hash joins, etc. Use EXPLAIN ANALYZE.",
      },
      {
        title: "Normalization",
        body: "Reduce redundancy and maintain integrity. Denormalize only for performance.",
      },
    ],
    resources: [
      {
        label: "PostgreSQL Docs",
        url: "https://www.postgresql.org/docs/",
        desc: "Full PostgreSQL SQL reference.",
      },
      {
        label: "MongoDB Docs",
        url: "https://www.mongodb.com/docs/",
        desc: "Official MongoDB documentation.",
      },
      {
        label: "Use The Index, Luke",
        url: "https://use-the-index-luke.com",
        desc: "SQL indexing for developers.",
      },
    ],
    checklist: [
      { id: "migrate", label: "All schema changes via versioned migrations" },
      { id: "index", label: "Foreign keys and frequently-filtered columns indexed" },
      { id: "pool", label: "Connection pooling configured correctly" },
      { id: "backup", label: "Automated backups + restore tested" },
    ],
  },
  devops: {
    id: "devops",
    label: "DevOps",
    icon: Container,
    description: "CI/CD, containers, infrastructure as code, and observability.",
    concepts: [
      {
        title: "Infrastructure as Code",
        body: "Define resources in code (Terraform, CloudFormation). Versioned and reproducible.",
      },
      {
        title: "CI/CD Pipelines",
        body: "Automated build, test, and deploy. Use Github Actions or GitLab CI.",
      },
    ],
    resources: [
      { label: "Docker Docs", url: "https://docs.docker.com", desc: "Containerization reference." },
      {
        label: "Terraform Registry",
        url: "https://registry.terraform.io",
        desc: "Infrastructure modules.",
      },
    ],
    checklist: [
      { id: "pipeline", label: "Automated CI pipeline on every PR" },
      { id: "secrets", label: "Secrets managed in vault/env vars" },
      { id: "monitoring", label: "Real-time monitoring and alerting" },
    ],
  },
  testing: {
    id: "testing",
    label: "Testing",
    icon: FlaskConical,
    description: "Frontend, Backend, and End-to-End testing strategies.",
    concepts: [
      {
        title: "Testing Pyramid",
        body: "Many unit tests, fewer integration tests, even fewer E2E tests.",
      },
      { title: "TDD", body: "Test-Driven Development: Red, Green, Refactor." },
    ],
    resources: [
      { label: "Vitest", url: "https://vitest.dev", desc: "Modern frontend testing." },
      { label: "Playwright", url: "https://playwright.dev", desc: "Reliable E2E testing." },
    ],
    checklist: [
      { id: "coverage", label: "Critical paths covered by unit tests" },
      { id: "e2e", label: "E2E smoke tests for main user flows" },
    ],
  },
};

export const SOFT_SKILLS_DATA: SkillAreaData = {
  id: "softskills",
  label: "Soft Skills",
  icon: Heart,
  description:
    "The human side of engineering — communication, leadership, and emotional intelligence.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "agenda", label: "Meeting has clear agenda & desired outcome" },
    { id: "feedback", label: "Feedback is specific, behavioral, and timely" },
    { id: "focus", label: "Deep work blocks scheduled in calendar" },
    { id: "listen", label: "Repeat back understanding before disagreeing" },
    { id: "write", label: "Key decisions documented in writing" },
    { id: "delegate", label: "Delegate the 'what', not the 'how'" },
  ],
  subAreas: [
    {
      id: "communication",
      label: "Communication",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["communication"],
      concepts: [
        {
          title: "Active Listening",
          body: "Repeat back what you heard before responding. Ask clarifying questions. In code review, comment on intent before style.",
        },
        {
          title: "Async Writing",
          body: "Lead with the conclusion (BLUF). Use bullet points for scanability. Record decisions and 'why' — future you will thank you.",
        },
        {
          title: "Technical Storytelling",
          body: "Frame trade-offs as 'option A buys X but costs Y'. Use diagrams for systems. Anchor numbers (latency, cost) before opinions.",
        },
        {
          title: "Stakeholder Translation",
          body: "Translate engineering jargon into business outcomes. 'Refactor' → 'reduces incident frequency'. 'Tech debt' → 'slowing feature velocity 30%'.",
        },
        {
          title: "1:1 Conversations",
          body: "Show up with one topic, not a status report. Ask open questions ('what's draining you?'). Silence is a tool — let people finish their thought.",
        },
        {
          title: "Disagree & Commit",
          body: "State your objection once, clearly, with evidence. If the team chooses otherwise, commit fully — no sabotage, no 'I told you so'.",
        },
        {
          title: "Written Standups",
          body: "Yesterday / Today / Blockers — kept under 5 lines. Tag people you need from. Async beats a 30-minute meeting for 6 people.",
        },
      ],
      resources: [
        {
          label: "Nonviolent Communication",
          url: "https://www.cnvc.org/",
          desc: "The foundational framework for empathy.",
        },
        {
          label: "Crucial Conversations",
          url: "https://cruciallearning.com/",
          desc: "Tools for talking when stakes are high.",
        },
        {
          label: "Never Split the Difference",
          url: "https://www.blackswanltd.com/",
          desc: "Tactical empathy and negotiation by an ex-FBI hostage negotiator.",
        },
      ],
    },
    {
      id: "speaking",
      label: "Public Speaking",
      icon: Mic,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["speaking", "presentations", "talks"],
      concepts: [
        {
          title: "Open With a Hook",
          body: "First 30 seconds decide whether the room listens. Start with a surprising number, a sharp question, or a 1-sentence story — never with 'My name is...'.",
        },
        {
          title: "Rule of Three",
          body: "Group ideas in threes: 3 problems, 3 reasons, 3 takeaways. The brain remembers triplets and forgets lists of seven.",
        },
        {
          title: "Slow Down, Then Slow Down Again",
          body: "Nerves push you to 1.5x speed. Mark deliberate pauses on your slides. A 2-second silence after a key point lands harder than any animation.",
        },
        {
          title: "Demo Discipline",
          body: "Record a backup video. Pre-stage data. Zoom your terminal to 18pt+. Never type a password on stage — paste from a notes file.",
        },
        {
          title: "Q&A Without Panic",
          body: "Repeat the question (buys time, helps the room). 'I don't know — I'll follow up' is a strong answer. Park hostile threads: 'great topic, let's chat after'.",
        },
      ],
      resources: [
        {
          label: "Talk Like TED",
          url: "https://www.ted.com/playlists",
          desc: "Watch 3 talks in your domain, copy what works, drop what doesn't.",
        },
        {
          label: "Presentation Zen",
          url: "https://presentationzen.com/",
          desc: "Slide design philosophy that kills bullet-heavy decks.",
        },
      ],
    },
    {
      id: "negotiation",
      label: "Negotiation",
      icon: Handshake,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["negotiation", "influence"],
      concepts: [
        {
          title: "Anchor First",
          body: "Whoever names the first number shapes the range. Research market data, then open at the high end of reasonable.",
        },
        {
          title: "Trade, Don't Concede",
          body: "Never give without getting. 'I can do that deadline if scope drops feature X' beats 'sure, no problem'.",
        },
        {
          title: "BATNA",
          body: "Know your Best Alternative To a Negotiated Agreement. If you have no walk-away option, you're not negotiating — you're begging.",
        },
      ],
    },
    {
      id: "leadership",
      label: "Leadership",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["leadership"],
      concepts: [
        {
          title: "Lead Without Authority",
          body: "Influence by demonstrating, not directing. Write the first RFC. Build the smallest reference implementation. Volunteer for the boring glue.",
        },
        {
          title: "Delegation",
          body: "Delegate outcomes, not steps. Give context, constraints, and a deadline. Trust the person to choose the path.",
        },
        {
          title: "Run Effective 1:1s",
          body: "Their agenda first, yours second. Weekly cadence, 30 minutes. Notes in a shared doc you both edit — career, blockers, feedback.",
        },
        {
          title: "Radical Candor",
          body: "Care personally + challenge directly. Praise in public, critique in private, always specific and timely.",
        },
      ],
      resources: [
        {
          label: "Extreme Ownership",
          url: "https://echelonfront.com/",
          desc: "Leadership principles from Navy SEALs.",
        },
        {
          label: "The Manager's Path",
          url: "https://www.oreilly.com/",
          desc: "Guide for tech leaders.",
        },
        {
          label: "Radical Candor",
          url: "https://www.radicalcandor.com/",
          desc: "Kim Scott's framework for honest, caring feedback.",
        },
      ],
    },
    {
      id: "problem-solving",
      label: "Problem Solving",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["problem-solving"],
      concepts: [
        {
          title: "First Principles",
          body: "Strip the problem to physical/logical truths. Rebuild from there. Avoid 'this is how we always do it' as a solution.",
        },
        {
          title: "5 Whys",
          body: "Ask 'why' five times to drive past symptoms to root cause. Pairs well with blameless post-mortems.",
        },
        {
          title: "Rubber Duck",
          body: "Explain the problem out loud to a duck (or a colleague who isn't even listening). The act of verbalizing exposes the gap.",
        },
        {
          title: "Inversion",
          body: "Instead of 'how do I succeed?', ask 'what guarantees failure?' — then avoid those. Often a faster path to the answer.",
        },
      ],
    },
    {
      id: "teamwork",
      label: "Teamwork",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["teamwork"],
      concepts: [
        {
          title: "Psychological Safety",
          body: "Reward 'I don't know' and 'I was wrong'. Punish blame, not mistakes.",
        },
        {
          title: "Assume Positive Intent",
          body: "Default to 'they had a reason' instead of 'they're an idiot'. Ask before you assume — 90% of the time it's missing context, not malice.",
        },
        {
          title: "Pair & Mob Programming",
          body: "Two brains catch bugs and spread knowledge in real time. Rotate the driver every 15 minutes. Use it for the hardest problems, not the easiest.",
        },
      ],
    },
    {
      id: "time",
      label: "Time Management",
      icon: Clock,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["time-management"],
      concepts: [
        {
          title: "Deep Work Blocks",
          body: "2–4 hour uninterrupted blocks for hard problems. No Slack, no meetings. Defend them ruthlessly.",
        },
        {
          title: "Eisenhower Matrix",
          body: "Urgent + Important = do now. Important + Not urgent = schedule. Urgent + Not important = delegate. Neither = delete.",
        },
        {
          title: "Say No (Politely)",
          body: "Every yes is a no to something else. 'I can't take this on without dropping X — which would you rather?' protects priorities.",
        },
      ],
    },
    {
      id: "growth",
      label: "Growth Mindset",
      icon: Sparkles,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["growth"],
      concepts: [
        {
          title: "Deliberate Practice",
          body: "Pick one weak area per quarter. Practice with feedback. Generic 'years of experience' is not skill.",
        },
        {
          title: "Feedback as Fuel",
          body: "Ask 'what's one thing I should do differently?' after every major project. Thank the giver, don't defend.",
        },
        {
          title: "Teach to Learn",
          body: "Write a blog post, give a brown-bag, or mentor a junior. Teaching forces you to confront what you only half-understand.",
        },
      ],
    },
    {
      id: "mental-models",
      label: "Mental Models",
      icon: Brain,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["thinking", "models"],
      concepts: [
        {
          title: "Second-Order Thinking",
          body: "'And then what?' — the obvious fix often creates the next problem. Cheap shortcut today, expensive migration in 18 months.",
        },
        {
          title: "Hanlon's Razor",
          body: "Never attribute to malice that which is adequately explained by neglect, miscommunication, or a missed Slack message.",
        },
        {
          title: "Chesterton's Fence",
          body: "Before removing 'weird' code or process, find out why it exists. The ugly hack is often guarding a production fire you can't see.",
        },
      ],
    },
  ],
};
