import { pgTable, text, uuid, boolean, integer, real, jsonb, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  tags: text("tags").array().default([]),
  body: text("body").notNull(),
  variables: text("variables").array().default([]),
  model: text("model"),
  favorite: boolean("favorite").default(false),
  usageCount: integer("usage_count").default(0),
  versions: jsonb("versions").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  role: text("role"),
  systemPrompt: text("system_prompt").notNull(),
  tools: text("tools").array().default([]),
  model: text("model"),
  temperature: real("temperature").default(0.7),
  status: text("status").default("draft"),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const components = pgTable("components", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  tags: text("tags").array().default([]),
  code: text("code").notNull(),
  dependencies: text("dependencies").array().default([]),
  favorite: boolean("favorite").default(false),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  stack: text("stack").array().default([]),
  tags: text("tags").array().default([]),
  structure: text("structure"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const snippets = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  language: text("language").notNull(),
  description: text("description"),
  code: text("code").notNull(),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const connectors = pgTable("connectors", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const socialDrafts = pgTable("social_drafts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  platform: text("platform").notNull(),
  content: text("content").notNull(),
  mediaUrls: text("media_urls").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const mailTemplates = pgTable("mail_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  channel: text("channel").notNull(),
  subject: text("subject"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const interviewQuestions = pgTable("interview_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id"),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  difficulty: text("difficulty"),
  domain: text("domain").notNull(),
  tags: text("tags").array().default([]),
  isGlobal: boolean("is_global").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").notNull(),
  itemId: text("item_id").notNull(),
  areaId: text("area_id").notNull(),
  completed: boolean("completed").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [primaryKey({ columns: [t.userId, t.itemId] })]);
