import { stripDates, isUUID } from "../../domain/utils.js";
import { uow } from "../../infrastructure/repositories/drizzle-unit-of-work.js";

export class SocialService {
  static async getAll(userId: string) {
    return await uow.socialDrafts.findByUserId(userId);
  }

  static async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await uow.socialDrafts.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await uow.socialDrafts.update(safeId!, data);
      return r;
    } else {
      const r = await uow.socialDrafts.create({
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

    return await uow.socialDrafts.createMany(values);
  }

  static async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const draft = await uow.socialDrafts.findById(id);
    if (draft && draft.userId === userId) {
      await uow.socialDrafts.delete(id);
    }
    return true;
  }
}
