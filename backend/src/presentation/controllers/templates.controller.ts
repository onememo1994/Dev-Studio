import { Router, Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { TemplatesService } from "../../application/services/templates.service.js";
import { TemplateDto } from "../dtos/core.dto.js";
import { z } from "zod";
import { IdParamDto } from "../dtos/common.dto.js";


export const getAll = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await TemplatesService.getAll(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

export const create = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const result = await TemplatesService.create(uid, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create template" });
  }
};

export const createBulk = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const items = Array.isArray(req.body) ? req.body : [];
    const result = await TemplatesService.createBulk(uid, items);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bulk templates" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await TemplatesService.deleteById(uid, id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete template" });
  }
};

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(TemplateDto), create);
router.post("/bulk", validateBody(z.array(TemplateDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);
export default router;
