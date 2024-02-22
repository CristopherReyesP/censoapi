import { Router } from "express";
import {
  getVotantes,
  createVotantes,
  updateVotantesById,
  deleteVotantesById,
  getVotantesById,
} from "../controllers/Votantes.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getVotantess);

router.get("/:VotantesId", getVotantesById);

router.post("/", [verifyToken, isModerator], createVotantes);

router.put("/:VotantesId", [verifyToken, isModerator], updateVotantesById);

router.delete("/:VotantesId", [verifyToken, isAdmin], deleteVotantesById);

export default router;
