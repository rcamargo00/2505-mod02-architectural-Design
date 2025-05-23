# Proyecto "diplomadov2"

Este documento describe cómo desarrollar e implementar el presente proyecto en Angular con una página inicial que da acceso a tres "proyectos" o módulos de demostración. Utilizaremos una versión moderna de Angular y Angular CLI.

## Enfoque General:

Utilizaremos un “Espacio de Trabajo (Workspace)” de Angular con una aplicación principal. Esta aplicación principal contendrá:
1.	Una Página Inicial (Landing Page): Un componente que presenta los tres proyectos y permite la navegación hacia ellos.
2.	Tres Módulos de Demostración (Feature Modules) o conjuntos de componentes independientes: Cada uno representará un "proyecto" donde tendremos elementos específicos de Angular. Estos se cargarán mediante el sistema de enrutamiento de Angular, preferiblemente con carga diferida (lazy loading) para optimizar el rendimiento.

## Elementos y Componentes Clave de Angular que se Utilizan:
1.	Angular CLI (Command Line Interface): Herramienta fundamental para crear el espacio de trabajo, generar aplicaciones, componentes, servicios, y para construir y servir los proyectos.

2.	Componentes (@Component): Son los bloques de construcción principales de la interfaz de usuario en Angular. Cada proyecto y la página inicial estarán compuestos por varios componentes. Un componente incluye: 

* Una clase TypeScript con la lógica.
* Una plantilla HTML que define la vista.
* Estilos CSS (o SCSS, Less, etc.) para la apariencia.

3.	Módulos (@NgModule): Aunque con la introducción de componentes "standalone" su uso ha cambiado, siguen siendo importantes para la organización en proyectos más grandes o si no se usan componentes independientes). Organizan los componentes, directivas, pipes y servicios. La aplicación principal y cada subproyecto podrían tener sus propios módulos. Con componentes independientes (standalone: true), esta organización se maneja a nivel de las importaciones del componente.

4.	Enrutamiento (@angular/router): Esencial para la navegación. La página inicial utilizará el enrutador de Angular para dirigir al usuario a los diferentes "proyectos" (que pueden ser diferentes rutas que cargan módulos/componentes específicos o incluso aplicaciones separadas dentro del workspace).

5.	Servicios (@Injectable): Para la lógica de negocio que no está atada a una vista específica, como la obtención de datos o la comunicación entre componentes.

6.	Directivas (Estructurales como *ngIf, *ngFor y de Atributo): Para manipular el DOM y añadir comportamiento dinámico a las plantillas HTML.

7.	Binding de Datos (Interpolación {{ }}, Property Binding [], Event Binding () y Two-Way Binding [()]): Para la comunicación entre la lógica del componente (TypeScript) y su plantilla (HTML).

# Contenido del proyecto 

Proyecto "dimplomadov2"
1. Landin Page
   
![image](https://github.com/user-attachments/assets/45f13680-854a-422c-8523-b2d070d9d2c2)
<br>
3. Aplicación 1: “Gestor de Tareas”

Una aplicación para gestionar tareas (To-Do List) con funcionalidades como agregar, editar, eliminar y marcar tareas como completadas.

* Clase 1: Configuración del Proyecto y Primer Componente
* Clase 2: Componentes y Comunicación (Input/Output)
* Clase 3: Servicios para Manejo de Datos
* Clase 4: Formularios y Validaciones
* Clase 5: Rutas

![image](https://github.com/user-attachments/assets/1761dd7f-28a7-449b-af76-e272446d50da)
![image](https://github.com/user-attachments/assets/9bf9c1db-e60f-4fb9-9c7d-8a1a29c2a6eb)
<br>

3. Aplicación 2: “Catálogo de Productos” (ropa y calzados)

Una aplicación para listar productos con funcionalidades de búsqueda, detalles de productos y carrito de compras 
básico.

* Clase 2: Componentes y Comunicación
* Clase 3: Servicios y Almacenamiento Local
* Clase 4: Formularios de Búsqueda y Filtrado
* Clase 5: Rutas

![image](https://github.com/user-attachments/assets/de284a5e-424e-45c9-8fb0-03f46c6f4123)
![image](https://github.com/user-attachments/assets/4fd40477-6a44-4a59-8e8c-dc97adf21d82)
<br>

4. Aplicación 3: “Blog personal” (sobre ángular)

Un blog para crear, editar y mostrar publicaciones, con comentarios básicos y funcionalidad de búsqueda.

* Clase 4: Servicios para Manejo de Datos
* Clase 5: Rutas

![image](https://github.com/user-attachments/assets/27cbaf92-2a81-418c-aaba-b1569f1bca38)
![image](https://github.com/user-attachments/assets/ef94554f-09a0-4ea9-8cb2-7b0c30aa8662)
![image](https://github.com/user-attachments/assets/5a7aafc1-83a6-4a67-9c58-84de17ceb3de)
<br>

# Conclusiones

El desarrollo del proyecto "Diplomadov2" ha sido un viaje integral a través de las capacidades de Angular para la creación de aplicaciones web robustas y modulares. Desde la configuración inicial de un entorno de desarrollo con Angular CLI y la integración de Angular Material, hasta la implementación detallada de tres aplicaciones funcionales, cada fase ha demostrado la potencia y la estructura que Angular ofrece para el desarrollo FullStack.

A lo largo de este proceso, hemos enfrentado y superado diversos desafíos técnicos. Errores como la falta de reconocimiento de estilos SCSS en componentes de Material, la incapacidad de cargar imágenes debido a rutas incorrectas, o el ReferenceError: localStorage is not defined en entornos de no-navegador, han sido oportunidades clave para profundizar en la comprensión de la encapsulación de vista de Angular, la gestión de assets y la universalidad de las aplicaciones. 

La depuración metódica, el uso de las herramientas de desarrollo del navegador y la aplicación de las mejores prácticas (como la inyección de PLATFORM_ID para localStorage) han sido fundamentales para garantizar la funcionalidad y la estabilidad del proyecto.

La importancia de Angular en este proyecto es innegable. Su arquitectura basada en componentes y servicios ha facilitado una modularización limpia, permitiendo el desarrollo independiente y la integración fluida de cada aplicación. 

El sistema de enrutamiento ha proporcionado una navegación intuitiva y eficiente, mientras que Angular Material ha elevado significativamente la estética y la experiencia de usuario con sus componentes preconstruidos y su sistema de tematización. 

La reactividad de los servicios (con BehaviorSubject) ha demostrado ser vital para mantener la interfaz de usuario sincronizada con los datos del carrito o las listas de tareas en tiempo real.

Esta experiencia ha sido invaluable. No solo se ha ampliado el conocimiento sobre los pilares de Angular (componentes, servicios, módulos, enrutamiento, formularios reactivos), sino que también se ha fortalecido la habilidad para diagnosticar y resolver problemas complejos, una destreza crucial en el desarrollo de software. 

La satisfacción de ver cómo cada pieza del rompecabezas encaja y cómo la aplicación cobra vida, es un testimonio del poder de Angular como framework y de la gratificante curva de aprendizaje que ofrece a quienes se sumergen en él.

