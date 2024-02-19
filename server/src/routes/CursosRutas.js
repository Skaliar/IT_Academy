const express = require("express");
const router = express.Router();
const {
    getCursos,
    getCursosid,
    AddCurso,
} = require("../controller/cursos");

/* *******************************************************  */
/*             Ruta de acceso a archivos Students           */
/* *******************************************************  */

router.get("/cursos", getCursos);
router.get("/cursoid/:id", getCursosid);
router.post("/curso", validarData, AddCurso);

function validarData(req, res, next) {
    console.log("Body....", req.body);
    const { nombre, descripcion } = req.body;
  
    if (!descripcion) {
     return res.status(400).json({
       message: "Ingrese una descripcion del Curso...",
       exito: false,
     });
    }
    if (!nombre) {
      return res.status(400).json({
        message: "El nombre, del Curso está vacío..",
        exito: false,
      });
    }
    next();
  }
  
  module.exports = router;