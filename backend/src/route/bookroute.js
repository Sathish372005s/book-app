import express from "express";
import { createbook, deletebook, getbooks } from "../controller/bookcontroller.js";
import protectedroute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",protectedroute,createbook);
router.get("/getbooks",protectedroute,getbooks);
router.delete("/delete/:id",protectedroute,deletebook);


export default router;