<template>
    <div class="return">
      <button class="btn-back" @click="pageBack()"><font-awesome-icon icon="rotate-left" /></button>
    </div>
    <div class="form-marco">
      <h2 class="form-titulo">
        {{ edit ? "Editar Perfíl del Profesor" : "Regístro  de Profesor" }}
      </h2>
      <form @submit.prevent="guardarprofesor()">
        <div class="grupInput">
          <div>
            <label for="dni">Número de Documento (*) </label><br />
            <input
              type="text"
              v-model="profesor.dni"
              placeholder="Ingrese DNI de identificación"
              required
            />
          </div>
          <div>
            <label for="nombre">Nombres (*)</label>
            <input
              type="text"
              v-model="profesor.nombre"
              placeholder="Ingrese nombres"
              required
            />
          </div>
        </div>
        <div>
          <label for="direccion">Dirección (*) </label>
          <textarea
            id="direccion"
            v-model="profesor.direccion"
            rows="2"
            placeholder="Ingrese dirección completa"
            required
          >
          </textarea>
        </div>
        <div class="grupInput">
          <div>
            <label for="email">Correo Electrónico (*)</label>
            <input
              type="text"
              v-model="profesor.email"
              placeholder="Ingrese email de uso habitual"
              required
            />
          </div>
  
          <div>
            <label for="telefono">Teléfono (*)</label>
            <input
              type="text"
              v-model="profesor.telefono"
              placeholder="Ingrese núm. de celular de Uso corriente"
              required
            />
          </div>
        </div>
        <div class="grupSelect">
          <input type="checkbox" v-model="profesor.activo" class="checkbox" />
          <label for="condiciones">
            Acepta las condiciones y terminos de la Empresa</label
          >
        </div>
        <Message
          v-if="show"
          :message="message"
          :status="processStatus"
          @blockShow="showStatus"
        />
        <div class="botones">
          <button type="submit">{{ edit ? "Actualizar" : "Registrar" }}</button>
          <button type="button" @click="handlerLimpiar()">Limpiar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import Message from "../servicios/Mensaje.vue";
  import { useRouter } from "vue-router";
  const router = useRouter()
  
  const url = "http://localhost:5000/api";
  let edit = false;
  let message = ref("");
  let show = ref(false);
  let processStatus = ref("");
  let student = ref({
    dni: "",
    nombre: "",
    direccion: "",
    email: "",
    telefono: "",
    activo: false,
  });
  
  const handlerLimpiar = () => {
    (profesor.value.dni = ""),
      (profesor.value.nombre = ""),
      (profesor.value.direccion = ""),
      (profesor.value.email = ""),
      (profesor.value.telefono = ""),
      (profesor.value.activo = false);
  };
  
  const showStatus = (valor) => {
    show.value = valor;
  };
  const guardarprofesor = () => {
    if (camposObligatoriosIncompletos.value) {
      mostrarError("Los campos con (*) son requeridos", "warning");
    } else {
      if (emailNoValido.value) {
        mostrarError("El correo electrónico no es válido", "warning");
      } else {
        enviarDatosEstudiante();
      }
    }
  };
  
  const camposObligatoriosIncompletos = computed(() => {
    const camposObligatorios = [
      "dni",
      "nombre",
      "direccion",
      "email",
      "telefono",
      "activo",
    ];
    return camposObligatorios.some((campo) => !profesor.value[campo]);
  });
  
  const emailNoValido = computed(() => {
    return !/^\S+@\S+\.\S+$/.test(profesor.value.email);
  });
  
  const enviarDatosProfesor = async () => {
    const data = {
      dni: profesor.value.dni,
      nombre: profesor.value.nombre.trim(),
      direccion: profesor.value.direccion.trim(),
      email: profesor.value.email.trim(),
      telefono: profesor.value.telefono.trim(),
      condTermino: profesor.value.activo,
    };
  
    let sendMethod = "POST";
    let api = `${url}/profesor`;
    console.log(data)
    await fetch(api, {
      method: sendMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        message.value = data.message;
        console.log(data)
        if (data.exito) {
          processStatus.value = "success";
        } else {
          processStatus.value = "fail";
        }
        showStatus(true);
     ///   handlerLimpiar();
      })
      .catch((error) =>
        console.error("Error al grabar Info.del Profesor:", error)
      );
  };
  
  function mostrarError(mensaje, status) {
    message.value = mensaje;
    processStatus.value = status;
    showStatus(true);
  }
  
  const pageBack = () => {
    router.back(); 
  };
  </script>
  
  <style scoped>
  table {
    max-width: 100%;
    font-size: 1.2em;
  }
  .titulo {
    background-color: rgb(165, 171, 176);
  }
  
  table tr {
    height: 45px;
  }
  
  .form-marco {
    margin: 0em 7em 3em 7em;
    border: 1px solid black;
    border-radius: 10px;
  }
  
  .form-marco > form {
    margin: 20px;  
    border-radius: 0 0 10px 10 px;
  }
  .grupSelect {
    display: flex;
    justify-content: start;
    margin-top: 10px;
  }
  /* .form-titulo {
    background-color: black;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 10px 10px 0 0;
  } */
  .botones {
    margin: 0.6em 0;
    display: flex;
    justify-content: space-around;
    font-size: 1.3em;
    font-weight: 600;
  }
  
  .checkbox {
    width: auto;
  }
  
  @media (max-width: 740px) {
    .form-marco {
      margin: 3em 4em;
    }
  }
  @media (max-width: 370px) {
    .form-marco {
      margin: 3em 2em;
    }
  }
  </style>
  