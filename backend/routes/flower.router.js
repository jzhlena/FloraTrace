import express from "express";

import { getAllFlowers, getFlowerById, addFlowerToDb, removeFlowerById, updateFlowerById } from "../controllers/flower.controller.js";

const router = express.Router();


router.get("/hello", (req, res) => {
    res.send("Server is ready")
})

router.get("/", getAllFlowers)

router.get("/:id", getFlowerById)

router.post("/", addFlowerToDb)

router.delete("/:id", removeFlowerById )

router.put("/:id", updateFlowerById)

export default router;