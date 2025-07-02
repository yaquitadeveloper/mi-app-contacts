//Espera para que el DOM cargue

document.addEventListener("DOMContentLoaded", () => {
  const DEBUG = false; // cambiar a true para ver los logs
  const form = document.getElementById("formContacto");
  const lista = document.getElementById("listaContactos");

  function guardarEnLocalStorage() {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }

  function cargarDesdeLocalStorage() {
    const datos = localStorage.getItem("contactos");
    return datos ? JSON.parse(datos) : [];
  }

  let modoEdicion = false;
  let idEditar = null;

  //Lista de contactos (array en memoria)
  let contactos = cargarDesdeLocalStorage();
  contactos.forEach((contacto) => mostrarContactoEnDOM(contacto));

  // Función mostrarToast dentro del DOMContentLoaded
  function mostrarToast(mensaje, tipo = "info") {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;

    toast.className =
      "fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50";
    if (tipo === "success") toast.classList.add("bg-green-500");
    if (tipo === "error") toast.classList.add("bg-red-500");
    if (tipo === "info") toast.classList.add("bg-blue-500");

    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }

  // ✅ Aquí defines la función plantillaHTML
  function plantillaHTML(contacto) {
    return `
    <div>
      <p class="font-bold">${contacto.nombre}</p>
      <p class="text-sm">${contacto.correo}</p>
      <p class="text-sm">${contacto.telefono}</p>
    </div>
    <div class="space-x-2">
      <button class="editar text-blue-500">Editar</button>
      <button class="eliminar text-red-500">Eliminar</button>
    </div>
  `;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    const nombreValido = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(nombre);
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    const telefonoValido = /^\+?[0-9\s-]{7,15}$/.test(telefono);

    if (!nombreValido) {
      mostrarToast("Nombre inválido: solo letras y espacios.", "error");
      return;
    }

    if (!correoValido) {
      mostrarToast(
        "Correo inválido: debe tener formato nombre@dominio.com",
        "error"
      );
      return;
    }

    if (!telefonoValido) {
      mostrarToast("Teléfono inválido: solo dígitos, con o sin +.", "error");
      return;
    }

    if (modoEdicion) {
      const index = contactos.findIndex((c) => c.id === idEditar);
      if (index !== -1) {
        contactos[index] = {
          ...contactos[index],
          nombre,
          correo,
          telefono,
        };

        guardarEnLocalStorage();

        // Actualizar en el DOM
        actualizarContactoEnDOM(contactos[index]);
        mostrarToast("Contacto actualizado correctamente", "success");
      }

      // Reset estado edición
      modoEdicion = false;
      idEditar = null;
      form.reset();
      return;
    }

    // Crear objeto con ID unico
    const contacto = {
      id: Date.now(),
      nombre,
      correo,
      telefono,
    };

    contactos.push(contacto);
    guardarEnLocalStorage();

    //Agregar lista de contactos
    mostrarContactoEnDOM(contacto);

    //Limpiar formulario
    form.reset();

    //mensaje de agregacion de contacto exitosa
    mostrarToast("Contacto agregado correctamente", "success");
  });

  // funcion que recibe un objeto y lo inserta en un DOM
  function mostrarContactoEnDOM(contacto) {
    if (DEBUG) console.log("contacto insertado:", contacto);
    const div = document.createElement("div");
    div.className =
      "bg-white p-4 rounded shadow flex justify-between items-center";
    div.dataset.id = contacto.id; // guarda el id como atributo para futuras operaciones

    div.innerHTML = plantillaHTML(contacto);
    lista.appendChild(div);
  }

  function actualizarContactoEnDOM(contacto) {
    const div = lista.querySelector(`div[data-id="${contacto.id}"]`);
    if (div) {
      div.innerHTML = plantillaHTML(contacto);
    }
  }

  lista.addEventListener("click", (e) => {
    // Eliminar
    if (e.target.classList.contains("eliminar")) {
      const divContacto = e.target.closest("div[data-id]");
      const id = parseInt(divContacto.dataset.id);

      //eliminar del array
      const index = contactos.findIndex((c) => c.id === id);
      if (index !== -1) {
        contactos.splice(index, 1); // lo elimina del array
        guardarEnLocalStorage();

        divContacto.remove(); // lo elimina del DOM
        if (DEBUG) console.log("Ejecutando eliminar...");
        mostrarToast("contacto eliminado", "success");
      } else {
        mostrarToast("Contacto no encontrado", "info");
      }
    }

    // Editar
    if (e.target.classList.contains("editar")) {
      const divContacto = e.target.closest("div[data-id]");
      const id = Number(divContacto.dataset.id);
      const contacto = contactos.find((c) => c.id === id);

      if (contacto) {
        // Cargar datos en formulario
        document.getElementById("nombre").value = contacto.nombre;
        document.getElementById("correo").value = contacto.correo;
        document.getElementById("telefono").value = contacto.telefono;

        modoEdicion = true;
        idEditar = id;

        mostrarToast("Editando contacto", "info");
      }
    }
  });
});
