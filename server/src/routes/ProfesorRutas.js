const express = require("express");
const router = express.Router();
const {
    getProfesores,
    getProfesorDni,
    AddProfesor,
} = require("../controller/profesores");

/* *******************************************************  */
/*             Ruta de acceso a archivos Students           */
/* *******************************************************  */

router.get("/profesor", getProfesores);
router.get("/profesordni/:dni", getProfesorDni);
router.post("/profesor", validarData, AddProfesor);

function validarData(req, res, next) {
    console.log("Body....", req.body);
    const { dni, nombre } = req.body;
  
    if (!dni) {
     return res.status(400).json({
       message: "Ingrese un Código de Profesor válido..",
       exito: false,
     });
    }
    if (!nombre) {
      return res.status(400).json({
        message: "El nombre, del Profesor está vacío..",
        exito: false,
      });
    }
    next();
  }
  
  module.exports = router;