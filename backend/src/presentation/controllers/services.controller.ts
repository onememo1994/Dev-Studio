import { Router, Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { MyServicesService } from "../../application/services/services.service.js";
import { MyServiceDto } from "../dtos/career.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";


export const getAll = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await MyServicesService.getAll(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

export const create = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await MyServicesService.create(uid, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await MyServicesService.deleteById(uid, id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(MyServiceDto), create);
router.delete("/:id", validateParams(IdParamDto), deleteById);
export default router;
