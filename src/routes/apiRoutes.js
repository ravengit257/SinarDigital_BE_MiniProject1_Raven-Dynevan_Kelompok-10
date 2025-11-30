import express from "express";
import { submitContact , movieRec} from "../controllers/apiController.js";

const router = express.Router();

router.post("/contact", submitContact);
router.post("/recommend", movieRec)

export default router;
