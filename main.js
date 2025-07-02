//Espera para que el DOM cargue

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");
  const lista = document.getElementById("listaContactos");

  //Lista de contactos (array en memoria)
  const contactos = [];

  // Función mostrarToast dentro del DOMContentLoaded
  function mostrarToast(mensaje, tipo = "info") {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;

    toast.className =
      "fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white";
    if (tipo === "success") toast.classList.add("bg-green-500");
    if (tipo === "error") toast.classList.add("bg-red-500");
    if (tipo === "info") toast.classList.add("bg-blue-500");

    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); //Evite recargar la pagina

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

    // Crear objeto con ID unico
    const contacto = {
      id: Date.now(), //ID  unico basado en timestamp
      nombre,
      correo,
      telefono,
    };

    contactos.push(contacto);

    //Agregar lista de contactos
    mostrarContactoEnDOM(contacto);

    //Limpiar formulario
    form.reset();

    //mensaje de agregacion de contacto exitosa
    mostrarToast("Contacto agregado correctamente", "success");
  });

  // funcion que recibe un objeto y lo inserta en un DOM
  function mostrarContactoEnDOM(contacto) {
    console.log("contacto insertado:", contacto);
    const div = document.createElement("div");
    div.className =
      "bg-white p-4 rounded shadow flex justify-between items-center";
    div.dataset.id = contacto.id; // guarda el id como atributo para futuras operaciones

    div.innerHTML = `
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

    lista.appendChild(div);
  }
});
