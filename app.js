const { guardarDB, leerDB } = require("./helpers/fileSystem");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const { mostrarMenu, pause } = require("./helpers/mensajes");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareasDB = leerDB();
  const tareas = new Tareas();
  if (tareasDB) {
    // Establecer tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimir el menu
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        // completado || pendiente
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          // TODO: preguntar si esta seguro
          const ok = await confirmar("¿Estas seguro?");
          // console.log({ id });
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada exitosamente");
          }
        }

        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();

    /*
    Example de asignacion dinamica de propiedades en tiempo de ejecucion
    let obj = {}; // Un objeto vacío

    let clave = "nombre"; // Clave dinámica
    obj[clave] = "Juan";  // Usando la notación de corchetes
    console.log(obj); // { nombre: "Juan" }
    */
  } while (opt !== "0");
};

main();
