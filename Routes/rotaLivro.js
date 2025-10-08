import { Router } from "express";

import LivroController from "../Controllers/livroController.js";

const livroRouter = Router();
const livroCtrl = new LivroController();

livroRouter.get("/", livroCtrl.consultar)
.get("/:id", livroCtrl.consultar)
.post("/", livroCtrl.gravar)
.put("/:id", livroCtrl.alterar)
.delete("/:id", livroCtrl.excluir);

export default livroRouter;