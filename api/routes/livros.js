import  express  from "express";
import { getLivros, addLivros, updateLivros, deleteLivros } from "../controllers/livro.js";

const router = express.Router()


router.get("/", getLivros)

router.post("/", addLivros)


router.put("/:id", updateLivros)


router.delete("/:id", deleteLivros)


export default router