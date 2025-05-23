Documentación: Landing Page del Proyecto "diplomadov2"
1. Propósito de la Landing Page
La Landing Page (Página de Inicio) sirve como el punto de entrada principal al proyecto "diplomadov2". Su objetivo es presentar de manera atractiva e interactiva las tres aplicaciones desarrolladas ("Gestor de Tareas", "Catálogo de Productos" y "Blog Personal"), permitiendo a los usuarios navegar fácilmente a cada una de ellas.

2. Creación del Componente LandingPageComponent
Para implementar la Landing Page, se genera un componente específico en Angular utilizando Angular CLI:

```bash
ng generate component landing-page
```
Este comando crea los siguientes archivos dentro de ```src/app/landing-page/```:
* landing-page.component.html: Contiene la estructura HTML de la página.
* landing-page.component.scss (o .css): Contiene los estilos específicos para este componente.
* landing-page.component.ts: Contiene la lógica del componente.
* landing-page.component.spec.ts: Para pruebas unitarias.
El componente se declara automáticamente en app.module.ts.

3. Estructura HTML y ContenidoEl archivo landing-page.component.html se estructura para ser visualmente atractivo y funcional. El diseño proporcionado utiliza Tailwind CSS para un desarrollo rápido y moderno de la interfaz.

**Elementos Clave del HTML:**

* Cabecera ```(<header>)```:
    * Título principal del proyecto ("DiplomadoV2") y un subtítulo.
    * Descripción breve del proyecto.
    * Estilo con gradiente y efecto de desenfoque de fondo (backdrop-blur).
* Sección Principal de Aplicaciones ```(<main>)```:
    * Un contenedor con una cuadrícula (grid) que presenta cada una de las tres aplicaciones.Tarjetas de Aplicación ```(<div class="app-card">)```: Cada aplicación se representa mediante una tarjeta que incluye:
        * Un ícono SVG representativo.
        * El nombre de la aplicación (ej: "Gestor de Tareas").
        * Una breve descripción de la funcionalidad de la aplicación.
        * Un botón de acción (ej: "Acceder a la App") que navega a la ruta correspondiente de la aplicación.
        * Efectos visuales al pasar el cursor (hover) para mejorar la interactividad.
* Pie de Página ```(<footer>)```:
    * Información de copyright y año actual (actualizado dinámicamente con un pequeño script).
    * Mención a las tecnologías utilizadas.

**Ejemplo de la estructura de una tarjeta de aplicación (simplificado):**

```html
<div class="app-card bg-slate-800/70 rounded-xl ...">
    <div class="p-8">
        <div class="flex items-center mb-4">
            <h2 class="text-2xl font-semibold text-teal-300">Gestor de Tareas</h2>
        </div>
        <p class="text-slate-400 mb-6">Organiza tu día a día...</p>
        <a href="/gestor-tareas" class="inline-block bg-gradient-to-r from-teal-500 ...">
            Acceder a la App
        </a>
    </div>
</div>
```
4. Integración con el Enrutamiento PrincipalLa LandingPageComponent se establece como la ruta por defecto de la aplicación en app-routing.module.ts.// src/app/app-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'; // Asegúrate de importar el componente

const routes: Routes = [
  // La Landing Page es la ruta raíz
  { path: '', component: LandingPageComponent, pathMatch: 'full' },

  // Rutas para las aplicaciones (lazy loaded)
  {
    path: 'gestor-tareas',
    loadChildren: () => import('./gestor-tareas/gestor-tareas.module').then(m => m.GestorTareasModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo-productos/catalogo-productos.module').then(m => m.CatalogoProductosModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog-personal/blog-personal.module').then(m => m.BlogPersonalModule)
  },
  // Redirección para rutas no encontradas
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
El AppComponent (app.component.html) debe contener ```<router-outlet></router-outlet>``` para que el enrutador de Angular renderice el LandingPageComponent (o cualquier otro componente de ruta activa).

5. Estilos
    
    * Tailwind CSS (vía CDN): El ejemplo de HTML proporcionado incluye Tailwind CSS a través de su CDN:

    ```html
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    ``` 

    Esto permite utilizar las clases de utilidad de Tailwind directamente en el HTML para un estilizado rápido.

    * **Estilos Personalizados Adicionales**: Se pueden añadir estilos específicos en ```landing-page.component.scss``` o en un bloque ```<style>``` dentro del HTML para complementar Tailwind, como se muestra en el ejemplo para la fuente 'Inter' y las transiciones de las tarjetas.
    
    * **Alternativa con Angular Material y SCSS**: Si se prefiere no usar Tailwind CSS o integrarlo de forma más profunda, la Landing Page se puede estilizar utilizando componentes de Angular Material y SCSS personalizado en ```landing-page.component.scss```.

6. Funcionalidad 
    * AdicionalActualización Dinámica del Año: Un pequeño script en el HTML actualiza el año en el pie de página:

    ```html
    <script>
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    </script>
    ```
    
    
Esta documentación cubre los aspectos clave de la implementación y configuración de la Landing Page para el proyecto "diplomadov2".