<template>
    <div class="listar table-wrapper">
      <h2>Listado de Cursos</h2>
      <div v-if="ifCurso">
        <h3>Cargando...</h3>
      </div>
      <table v-if="!ifCurso">
        <tr class="titulo">
          <th width="2%">Nombre</th>
          <th width="25%">Descripcion</th>
          <th width="20%">Costo</th>
          <th colspan="3" width="20%">Acción</th>
        </tr>
        <tbody>
          <tr v-for="(curso, index) in cursos" :key="curso.id">
            <DetalleCurso
              :fila="index"
              :nombre="curso.nombre"
              :descricpion="curso.descripcion"
              :costo="curso.costo"
              :activo="profesor.activo"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import DetalleCurso from "@/components/cursos/DetalleCursos.vue";
  import Seach from "../servicios/Seach.vue";
  const url = "http://localhost:5000/api";
  
  const cursos = ref([]);
  const ifCurso = ref(false);
  onMounted(async () => {
    ifCurso.value = true;
    let sendMethod = "GET";
    let api = `${url}/curso`;
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        cursos.value = data;
        ifCurso.value = false;
      })
      .catch((error) =>
        console.error("Error al cargar la Tabla de Cursos:", error)
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
  