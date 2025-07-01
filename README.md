# 📇 Administrador de Contactos Interactivos

Este proyecto es una aplicación web que simula una agenda de contactos. Permite a los usuarios agregar, editar, eliminar y buscar contactos con validación de datos y notificaciones interactivas.

## 🧩 Estructura del Proyecto

### 🔍 1. Análisis y Componentes Principales

| Módulo / Componente      | Funcionalidad                                       |
|--------------------------|-----------------------------------------------------|
| **Formulario de contacto** | Captura y valida datos (nombre, correo, teléfono)   |
| **Lista de contactos**     | Muestra contactos con opciones de editar y eliminar |
| **Búsqueda dinámica**      | Filtra contactos en tiempo real mientras se escribe |
| **Notificaciones (toast)** | Muestra mensajes temporales al agregar/editar/eliminar |
| **Interfaz móvil / estilos** | Adaptación responsive con Tailwind o CSS puro         |

---

### ⚙️ 2. Funcionalidades JavaScript necesarias

- Manipulación del **DOM**: `getElementById`, `querySelector`, `createElement`, etc.
- Manejo de **eventos**: `addEventListener`, `removeEventListener`, `submit`, `input`, etc.
- **Delegación de eventos** para elementos dinámicos.
- Uso del objeto `Event`: `preventDefault`, `stopPropagation`, `target`, etc.
- Manejo de estructuras de datos: **arreglos** y **objetos** para contactos.
- **Notificaciones** con `setTimeout`.
- (Opcional) Uso de `localStorage` para persistencia de datos.

---

### 🛠️ 3. Proceso de desarrollo (Fases Iterativas)

1. **Base HTML + Tailwind**
   - Inputs para nombre, correo, teléfono
   - Botón “Agregar”
   - Contenedor para la lista de contactos

2. **Captura y creación**
   - Evento `submit` para agregar contacto
   - Validación básica de campos
   - Generar elemento visual y agregarlo al DOM

3. **Editar y eliminar contactos**
   - Botones por cada contacto
   - Delegación de eventos
   - Edición: rellenar formulario
   - Eliminación: quitar del DOM

4. **Filtro de búsqueda**
   - Campo de texto para filtrar por nombre
   - Evento `input` + comparación dinámica

5. **Validación y notificaciones**
   - Validar email, teléfono, campos vacíos
   - Mostrar mensajes tipo “toast”

6. **Refactor y estilo móvil**
   - Separar archivos por responsabilidades
   - Añadir responsive con Tailwind
   - Añadir localStorage (opcional)

---

### 📁 Estructura de archivos sugerida

```bash
📁 proyecto-contactos/
├── index.html
├── style.css              # (o Tailwind vía CDN)
├── main.js                # Lógica general
├── contactManager.js      # (opcional) Manejo de contactos
└── toast.js               # (opcional) Notificaciones tipo toast
