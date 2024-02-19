const fs = require("fs").promises;
const profesoresFile = "src/json/profesores.json";

//* *************************************************************** *//
//       definición de rutas  de acceso a archivo Students           //
//* *************************************************************** *//

const getProfesores = async (req, res) => {
  try {
    const datos = await fs.readFile(profesoresFile, "utf-8");
    const profesores = JSON.parse(datos);
    setTimeout(() => {
      res.send(profesores).status(200);
    }, 3000);
    //  await res.send(students).status(200);
    return;
  } catch (error) {
    console.log("Este es el error....:", error);
  }
};


const getProfesorDni = async (req, res) => {
  let dni = parseInt(req.params.dni);
  try {
    const datos = await fs.readFile(profesoresFile, "utf-8");
    const profesores = JSON.parse(datos);
    const profesor = profesores.find((profesor) => profesor.dni == dni);
    let messageResult = "";
    let status = false;
    if (profesor === undefined) {
      messageResult = "El Dni ingresado no existe";
      status = false;
    } else {
      messageResult = "Consulta Exitosa";
      status = true;
    }
    return res
      .status(200)
      .json({ profesor, message: messageResult, exito: status });
  } catch (error) {
    console.log("Error en consilta...", error);
  }
};

const AddProfesor = async (req, res) => {
  let nuevoProfesor = {

    dni: req.body.dni,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    email: req.body.email,
    telefono: req.body.telefono,
    activo: req.body.activo,
  };

  try {
    const datos = await fs.readFile(profesoresFile, "utf-8");
    const profesores = JSON.parse(datos);
    const profesor = profesores.find((profesor) => profesor.dni == req.body.dni);
    if (profesor) {
      return res.status(404).send({
        message: "El Número de documento ingresado, ya está registrado..",
        exito: false,
      });
    }

    profesores.push(nuevoProfesor);
    await fs.writeFile(profesoresFile, JSON.stringify(profesores));
    return res
      .status(201)
      .send({ message: "Registro agregado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProfesores,
  getProfesorDni,
  AddProfesor,
};