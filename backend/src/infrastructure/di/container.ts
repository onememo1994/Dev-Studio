import { DrizzleUnitOfWork } from "../repositories/drizzle-unit-of-work.js";
import { OpenAILLMService } from "../services/openai-llm.service.js";
import { JobScraperService } from "../services/job-scraper.service.js";
import { ChatService } from "../../application/services/chat.service.js";

// Instantiated Infrastructure dependencies
export const uow = new DrizzleUnitOfWork();
export const llmService = new OpenAILLMService();
export const scraperService = new JobScraperService();

// Instantiated Application services
export const chatService = new ChatService(llmService);

