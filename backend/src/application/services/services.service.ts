import { stripDates, isUUID } from "../../domain/utils.js";
import { uow } from "../../infrastructure/repositories/drizzle-unit-of-work.js";

export class MyServicesService {
  static async getAll(userId: string) {
    return await uow.myServices.findByUserId(userId);
  }

  static async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;

    if (safeId) {
      const existing = await uow.myServices.findByUserAndId(userId, safeId);

      if (existing.length > 0) {
        const r = await uow.myServices.update(safeId, data);
        return r;
      }
    }

    const r = await uow.myServices.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);

    return r;
  }

  static async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const serv = await uow.myServices.findById(id);
    if (serv && serv.userId === userId) {
      await uow.myServices.delete(id);
    }
    return true;
  }
}
