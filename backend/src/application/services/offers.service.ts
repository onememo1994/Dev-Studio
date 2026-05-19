import { stripDates, isUUID } from "../../domain/utils.js";
import { uow } from "../../infrastructure/repositories/drizzle-unit-of-work.js";

export class OffersService {
  static async getAll(userId: string) {
    return await uow.freelanceOffers.findByUserId(userId);
  }

  static async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;

    if (safeId) {
      const existing = await uow.freelanceOffers.findByUserAndId(userId, safeId);

      if (existing.length > 0) {
        const r = await uow.freelanceOffers.update(safeId, data);
        return r;
      }
    }

    const r = await uow.freelanceOffers.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);

    return r;
  }

  static async deleteById(userId: string, id: string) {
    if (!isUUID(id)) return true;
    const offer = await uow.freelanceOffers.findById(id);
    if (offer && offer.userId === userId) {
      await uow.freelanceOffers.delete(id);
    }
    return true;
  }
}
