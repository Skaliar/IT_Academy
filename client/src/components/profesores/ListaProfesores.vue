<template>
    <div class="listar table-wrapper">
      <h2>Listado de Profesores</h2>
      <div v-if="ifProfesor">
        <h3>Cargando...</h3>
      </div>
      <table v-if="!ifProfesor">
        <tr class="titulo">
          <th width="2%">Documento</th>
          <th width="25%">Nombre</th>
          <th width="20%">Email</th>
          <th width="20">Teléfono</th>
          <th colspan="3" width="20%">Acción</th>
        </tr>
        <tbody>
          <tr v-for="(profesor, index) in profesores" :key="profesor.dni">
            <DetalleProfesor
              :fila="index"
              :dni="profesor.dni"
              :nombre="profesor.nombre"
              :direccion="profesor.direccion"
              :email="profesor.email"
              :telefono="profesor.telefono"
              :activo="profesor.activo"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import DetalleProfesor from "@/components/profesores/DetalleProfesor.vue";
  import Seach from "../servicios/Seach.vue";
  const url = "http://localhost:5000/api";
  
  const profesores = ref([]);
  const ifProfesor = ref(false);
  onMounted(async () => {
    ifProfesor.value = true;
    let sendMethod = "GET";
    let api = `${url}/profesor`;
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        profesores.value = data;
        ifProfesor.value = false;
      })
      .catch((error) =>
        console.error("Error al cargar la Tabla de Estudiantes:", error)
      );
  });
  </script>
  
  <style scoped>
  h3 {
    widows: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    margin-top: 3rem;
    animation: changeColor 2s linear infinite;
  }
  table > tbody > tr {
    height: 40px;
    background-color: rgb(220, 219, 219);
  }
  
  table > tbody > tr:hover {
    background-color: rgb(169, 165, 165);
  }
  .buscar {
    width: 100%;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  @keyframes changeColor {
    0% {
      color: #1fb161;
    }
    25% {
      color: #ff0000;
    }
    50% {
      color: #300fd4;
    }
    80% {
      color: #fef20d;
    }
  }
  </style>
  