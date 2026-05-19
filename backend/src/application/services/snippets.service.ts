import { stripDates, isUUID } from "../../domain/utils.js";
import { uow } from "../../infrastructure/repositories/drizzle-unit-of-work.js";

export class SnippetsService {
  static async getAll(userId: string) {
    return await uow.snippets.findByUserId(userId);
  }

  static async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await uow.snippets.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await uow.snippets.update(safeId!, data);
      return r;
    } else {
      const r = await uow.snippets.create({
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

    return await uow.snippets.createMany(values);
  }

  static async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const snip = await uow.snippets.findById(id);
    if (snip && snip.userId === userId) {
      await uow.snippets.delete(id);
    }
    return true;
  }
}
