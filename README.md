# Explorador Interactivo del Programa Sintético NEM

## 🎯 Objetivo del Proyecto

El **Programa Sintético de la Nueva Escuela Mexicana (NEM)** presenta una estructura curricular compleja. Este proyecto nace de la necesidad de ofrecer a docentes, directivos y personal de apoyo una herramienta digital que facilite la consulta y exploración de dicho programa.

El objetivo principal es transformar la manera en que se accede a los contenidos y a los **Procesos de Desarrollo de Aprendizaje (PDA)**, pasando de documentos estáticos a una plataforma interactiva, ágil y eficiente que permita realizar búsquedas y filtrados complejos con facilidad.

## ✨ Características

-   **Filtrado Multinivel:** Permite combinar filtros de **Fase**, **Grado**, **Campo Formativo** y **Contenido** para localizar PDAs específicos de manera precisa.
-   **Resultados Instantáneos:** Los PDAs filtrados se muestran de forma inmediata en la misma interfaz, evitando recargas de página y agilizando la consulta.
-   **Navegación Intuitiva:** La interfaz está diseñada para ser clara y fácil de usar, con un flujo de trabajo lógico que guía al usuario a través de las distintas jerarquías del programa.
-   **Diseño Responsivo:** La aplicación es totalmente funcional en dispositivos de escritorio, tabletas y móviles.
-   **Exploración Rápida:** Además del filtrado, se pueden explorar los Campos Formativos directamente desde la página principal.

## 🛠️ Tecnologías Utilizadas

-   **Framework Frontend:** [React](https://react.dev/) 19 con [Vite](https://vitejs.dev/) como herramienta de construcción.
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un desarrollo robusto y tipado.
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para un diseño rápido y personalizable basado en utilidades.
-   **Iconos:** [React Icons](https://react-icons.github.io/react-icons/) para una librería de iconos consistente.

## 🚀 Cómo Empezar

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

2.  **Instalar dependencias:**
    Se utiliza `npm` como gestor de paquetes.
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    Este comando inicia la aplicación en modo de desarrollo con Hot-Module Replacement (HMR).
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite indique en la consola).

## NPM Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción (incluye chequeo de tipos de TypeScript).
-   `npm run lint`: Ejecuta el linter (ESLint) para analizar el código en busca de errores y problemas de estilo.
-   `npm run preview`: Inicia un servidor local para previsualizar la versión de producción generada por `npm run build`.
-   `npm run deploy`: Despliega la aplicación a GitHub Pages.

## 🌐 Deploy a GitHub Pages

El proyecto está configurado para deploy automático:

1. **Deploy automático**: Al hacer push a la rama `main`, GitHub Actions construye y despliega automáticamente
2. **Deploy manual**: Ejecuta `npm run deploy` para desplegar manualmente
3. **URL de producción**: https://mindtzijib.github.io/nem-plan-sintetico

### Configuración de GitHub Pages

1. Ve a Settings > Pages en tu repositorio
2. Selecciona "GitHub Actions" como fuente
3. El workflow se ejecutará automáticamente en cada push a main

## 📂 Estructura del Proyecto

```
plan-sintetico-nem/
├── public/
│   └── data.json       # Archivo JSON con todos los datos del programa.
├── src/
│   ├── assets/         # Recursos estáticos como imágenes (si aplica).
│   ├── components/     # Componentes reutilizables de React.
│   │   ├── App.tsx     # Componente raíz que gestiona el estado principal.
│   │   ├── Header.tsx  # Encabezado de la aplicación.
│   │   ├── HomePage.tsx # Página principal que contiene los filtros y tarjetas.
│   │   ├── QuickFilter.tsx # Componente con la lógica de filtrado.
│   │   ├── CampoCard.tsx   # Tarjeta para cada Campo Formativo.
│   │   └── PdaCard.tsx     # Tarjeta para mostrar un PDA.
│   ├── index.css       # Estilos globales.
│   └── main.tsx        # Punto de entrada de la aplicación React.
├── .gitignore
├── package.json
├── README.md
└── vite.config.ts
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes ideas para mejorar la herramienta, por favor abre un *issue* para discutir los cambios propuestos. Si deseas contribuir con código, puedes hacer un *fork* del repositorio y enviar un *pull request*.

---
*Este proyecto es una herramienta de apoyo y no reemplaza los documentos oficiales de la Nueva Escuela Mexicana.*