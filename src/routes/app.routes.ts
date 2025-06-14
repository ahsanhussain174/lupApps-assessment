import { Router } from "express";
import { fetchBoardItems, fetchBoards, fetchConnectedBoardItems } from "../controllers/app.controllers";
import { asyncHandler } from "../utils/app.utils";

const router = Router();

router.get("/boards", asyncHandler(fetchBoards));
router.get("/boards/fetch-items/:boardId", asyncHandler(fetchBoardItems));
router.get("/boards/fetch-connected-items", asyncHandler(fetchConnectedBoardItems));

export default router;