const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) delete this._listado[id];
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // 1. Alma:: Completada | Pendiente
    this.listadoArr.forEach((tarea, index) => {
      const { completadoEn, desc } = tarea;
      console.log(
        `${index + 1}. ${desc}:: ${
          completadoEn ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  listarPendientesCompletadas(completadas = false) {
    const taskCompletadasPendientes = completadas
      ? this.listadoArr.filter((task) => {
          return task.completadoEn !== null;
        })
      : this.listadoArr.filter((task) => {
          return task.completadoEn === null;
        });

    taskCompletadasPendientes.forEach((task, i) => {
      const enumerador = i + 1;
      completadas
        ? console.log(
            ` ${String(enumerador).green}. ${task.desc} || ${
              "Completada".green
            } :: ${String(task.completadoEn).rainbow}`
          )
        : console.log(
            ` ${String(enumerador).green}. ${task.desc} || ${"Pendiente".red}`
          );
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
