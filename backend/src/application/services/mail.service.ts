import { stripDates, isUUID } from "../../domain/utils.js";
import { uow } from "../../infrastructure/repositories/drizzle-unit-of-work.js";

export class MailService {
  static async getAll(userId: string) {
    return await uow.mailTemplates.findByUserId(userId);
  }

  static async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await uow.mailTemplates.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await uow.mailTemplates.update(safeId!, data);
      return r;
    } else {
      const r = await uow.mailTemplates.create({
        ...data,
        userId,
        ...(safeId ? { id: safeId } : {}),
      } as any);
      return r;
    }
  }

  static async createBulk(userId: string, items: any[]) {
    if (!items.length) {
      return [];
    }
    const values = items.map(({ id, ...raw }) => {
      const data = stripDates(raw);
      const safeId = isUUID(id) ? id : undefined;
      return { ...data, userId, ...(safeId ? { id: safeId } : {}) } as any;
    });

    return await uow.mailTemplates.createMany(values);
  }

  static async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const mailTemplate = await uow.mailTemplates.findById(id);
    if (mailTemplate && mailTemplate.userId === userId) {
      await uow.mailTemplates.delete(id);
    }
    return true;
  }
}
