const fs = require("fs").promises;
const CursosFile = "src/json/cursos.json";


const getCursos = async (req, res) => {
    try {
      const datos = await fs.readFile(CursosFile, "utf-8");
      const cursos = JSON.parse(datos);
      setTimeout(() => {
        res.send(cursos).status(200);
      }, 3000);
      return;
    } catch (error) {
      console.log("Este es el error....:", error);
    }
  };

  const getCursosid = async (req, res) => {
    let id = parseInt(req.params.dni);
    try {
      const datos = await fs.readFile(CursosFile, "utf-8");
      const Cursos = JSON.parse(datos);
      const Curso = Cursos.find((curso) => curso.id == id);
      let messageResult = "";
      let status = false;
      if (Curso === undefined) {
        messageResult = "El ID ingresado no existe";
        status = false;
      } else {
        messageResult = "Consulta Exitosa";
        status = true;
      }
      return res
        .status(200)
        .json({ Curso, message: messageResult, exito: status });
    } catch (error) {
      console.log("Error en consilta...", error);
    }
  };

  const AddCurso = async (req, res) => {
    let nuevoCurso = {
  
      id: req.body.id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      costo: req.body.costo,
      activo: req.body.activo,
    };
  
    try {
      const datos = await fs.readFile(CursosFile, "utf-8");
      const Cursos = JSON.parse(datos);
      const curso = Cursos.find((curso) => curso.id == req.body.id);
      if (curso) {
        return res.status(404).send({
          message: "El Número de documento ingresado, ya está registrado..",
          exito: false,
        });
      }
  
      Cursos.push(nuevoCurso);
      await fs.writeFile(CursosFile, JSON.stringify(Cursos));
      return res
        .status(201)
        .send({ message: "Registro agregado con éxito", exito: true });
    } catch (error) {
      console.log(error);
    }
  };

  function getNextId(data) {
    if (data.length === 0) {
      return 1;
    }
    const maxId = Math.max(...data.map((item) => item.id));
    return maxId + 1;
  }

  module.exports = {
    getCursos,
    getCursosid,
    AddCurso,
  };