# SaludExpress - Gestión de Resultados Médicos

¡Bienvenido a SaludExpress! Esta es una aplicación web MVP (Producto Mínimo Viable) diseñada para la gestión rápida y eficiente de resultados médicos, con un enfoque en diabetes y alérgenos.

## Arquitectura

- **Backend**: Node.js con Express y SQLite.
- **Frontend**: React con Tailwind CSS.
- **Base de Datos**: SQLite, un archivo simple (`medical.db`) ubicado en la carpeta `database`.

---

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### **1. Prerrequisitos**

- **Node.js**: Asegúrate de tener Node.js instalado (versión 14 o superior). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **npm**: Viene incluido con Node.js.

### **2. Clonar el Repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd salud-express
```

### **3. Configuración del Backend**

1.  **Navega a la carpeta del backend:**
    ```bash
    cd backend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicializa la base de datos:**
    Este comando creará las tablas necesarias y cargará datos de prueba.
    ```bash
    npm run db:setup
    ```

4.  **Inicia el servidor backend:**
    El servidor se ejecutará en `http://localhost:5000`.
    ```bash
    npm start
    ```

### **4. Configuración del Frontend**

1.  **Abre una nueva terminal** y navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia la aplicación de React:**
    La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`.
    ```bash
    npm start
    ```

---

## ✅ Verificación

Una vez que ambos servidores (backend y frontend) estén en funcionamiento:

1.  **Abre tu navegador** y visita `http://localhost:3000`.
2.  **Verás el dashboard de SaludExpress.**
3.  **Prueba las funcionalidades clave:**
    - **Registra un nuevo paciente** usando el formulario.
    - **Selecciona un paciente** de la lista para ver sus detalles.
    - **Añade un resultado de glucosa** para el paciente seleccionado.
    - **Si el nivel de glucosa es superior a 180 mg/dL**, aparecerá una nueva alerta en la sección "Alertas Recientes".

## Endpoints de la API (Backend)

- `GET /api/patients`: Obtiene la lista de todos los pacientes.
- `POST /api/patients`: Crea un nuevo paciente.
- `GET /api/results`: Obtiene todos los resultados médicos.
- `POST /api/results`: Añade un nuevo resultado médico.
- `GET /api/results/alerts`: Obtiene todas las alertas generadas.

¡Gracias por usar SaludExpress!
