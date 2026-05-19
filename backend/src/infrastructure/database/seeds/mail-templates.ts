const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export interface MailTemplateSeed {
  id: string;
  channel: "cover-letter" | "gmail" | "whatsapp";
  subject?: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export const seedMailTemplates: MailTemplateSeed[] = [
  {
    id: "mail_1",
    channel: "cover-letter",
    subject: "Application — Senior Full-Stack Engineer",
    content: `Hi {{hiring_manager_name}},\n\nI'm reaching out about the {{role_title}} position at {{company_name}}. I've been following your work on {{company_product}} and I'm excited by the problems you're solving in {{company_domain}}.\n\nI'm a full-stack engineer with {{years_experience}} years of experience, primarily working with {{tech_stack}}. Most recently, I {{recent_achievement}}.\n\nWhat draws me to {{company_name}} specifically is {{specific_reason}}. I think my background in {{relevant_skill}} would let me contribute meaningfully from day one.\n\nI'd love to learn more about the team and the role. Are you open to a 20-minute call this week?\n\nBest,\n{{your_name}}`,
    createdAt: d(30),
    updatedAt: d(5),
  },
  {
    id: "mail_2",
    channel: "cover-letter",
    subject: "Freelance Proposal — {{project_type}} Project",
    content: `Hi {{client_name}},\n\nThanks for reaching out about the {{project_type}} project. Based on your description, I have a clear picture of what you need and I'm confident I can deliver it.\n\nHere's how I'd approach it:\n\nPhase 1 — {{phase_1}} (~{{phase_1_duration}})\nPhase 2 — {{phase_2}} (~{{phase_2_duration}})\nPhase 3 — {{phase_3}} (~{{phase_3_duration}})\n\nTimeline: {{total_timeline}}\nBudget: {{budget_range}}\n\nI've done similar work for {{past_client_example}} — happy to share details on a quick call.\n\nTo get started, I'd need:\n- {{requirement_1}}\n- {{requirement_2}}\n\nDoes this align with what you had in mind? Let me know a good time to connect.\n\n{{your_name}}`,
    createdAt: d(20),
    updatedAt: d(8),
  },
  {
    id: "mail_3",
    channel: "gmail",
    subject: "Following up — {{original_topic}}",
    content: `Hi {{name}},\n\nFollowing up on my previous message about {{original_topic}}.\n\nI know things get busy — just wanted to make sure this didn't fall through the cracks.\n\n{{follow_up_context}}\n\nHappy to adjust the approach if needed. What works best for you?\n\n{{your_name}}`,
    createdAt: d(15),
    updatedAt: d(3),
  },
  {
    id: "mail_4",
    channel: "gmail",
    subject: "Introduction — {{your_name}} / {{their_name}}",
    content: `Hi {{recipient_name}},\n\n{{mutual_contact}} suggested I reach out — they thought we'd have a lot to talk about given your work on {{their_project}} and mine on {{your_project}}.\n\nI'm particularly interested in {{topic_of_interest}}. I've been thinking about {{shared_problem}} and I'd love to hear your perspective.\n\nWould you be open to a 15-minute chat sometime this week or next?\n\n{{your_name}}`,
    createdAt: d(12),
    updatedAt: d(6),
  },
  {
    id: "mail_5",
    channel: "whatsapp",
    content: `Hey {{name}} 👋\n\nQuick update on {{project_name}} — {{status_update}}.\n\nNext step: {{next_step}}. I'll have that ready by {{deadline}}.\n\nAny questions in the meantime just ping me here.`,
    createdAt: d(7),
    updatedAt: d(1),
  },
  {
    id: "mail_6",
    channel: "whatsapp",
    content: `Hi {{name}}! \n\nWanted to check in on {{topic}}. {{context}}.\n\nWhen's a good time to jump on a quick call to align? 📞`,
    createdAt: d(4),
    updatedAt: d(2),
  },
];
