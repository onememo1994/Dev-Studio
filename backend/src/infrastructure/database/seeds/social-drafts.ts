const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export interface SocialDraftSeed {
  id: string;
  platform: "twitter" | "linkedin" | "instagram";
  content: string;
  mediaUrls: string[];
  createdAt: number;
  updatedAt: number;
}

export const seedSocialDrafts: SocialDraftSeed[] = [
  {
    id: "soc_1",
    platform: "linkedin",
    content: `Just shipped a feature I've been thinking about for weeks — a command palette (Cmd+K) for navigating between all your dev assets instantly.\n\nNo more clicking through tabs. Just start typing and jump straight to any prompt, agent, snippet, or component.\n\nBuilt with cmdk + TanStack Router + some Zustand magic. The trick was keeping the index in memory and debouncing the search.\n\nWhat QoL features do you build into your own tools first? 👇`,
    mediaUrls: [],
    createdAt: d(3),
    updatedAt: d(1),
  },
  {
    id: "soc_2",
    platform: "linkedin",
    content: `6 months of freelancing, 3 lessons learned:\n\n1. Scope creep is the enemy — put everything in writing before starting\n2. Hourly vs fixed: fixed is better for well-defined work, hourly for R&D\n3. Your best clients come from referrals, not cold outreach\n\nBuilding in public has been the single biggest lever for finding quality clients.\n\nWhat would you add to the list?`,
    mediaUrls: [],
    createdAt: d(10),
    updatedAt: d(8),
  },
  {
    id: "soc_3",
    platform: "twitter",
    content: `hot take: the best thing about TypeScript isn't type safety\n\nit's the tooling\n\nautocomplete that actually works, refactors that don't break things, IDE errors before you even run the code\n\nthe types are just how you unlock the tooling`,
    mediaUrls: [],
    createdAt: d(5),
    updatedAt: d(4),
  },
  {
    id: "soc_4",
    platform: "twitter",
    content: `things I wish I knew before going freelance as a dev:\n\n→ raise your rates sooner than you think\n→ always have 3 months runway before quitting your job  \n→ the proposal is half the work\n→ bad clients don't get better with time\n→ niching down doubles your close rate\n\ntook me 2 years to figure all of this out`,
    mediaUrls: [],
    createdAt: d(7),
    updatedAt: d(6),
  },
  {
    id: "soc_5",
    platform: "instagram",
    content: `My dev setup for 2026 ✦\n\nDark theme all day. Mechanical keyboard. Noise-cancelling headphones.\n\nThe tools change. The focus stays the same.\n\nWhat's in your setup? Drop it below 👇\n\n#developer #devsetup #coding #buildinpublic`,
    mediaUrls: [],
    createdAt: d(2),
    updatedAt: d(1),
  },
];
