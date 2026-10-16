# Un pequeño detalle para ti 💌

Una pequeña carta digital de cumpleaños. Es un sitio estático hecho con
HTML5, CSS3 y JavaScript vanilla, sin frameworks, sin backend y sin
dependencias pesadas. Está pensado para publicarse gratis en GitHub Pages.

## Estructura del proyecto

```
mafer/
├── index.html          (la página principal)
├── css/
│   └── styles.css      (todos los estilos)
├── js/
│   └── main.js          (la lógica del sobre, la carta y las partículas)
├── assets/              (carpeta reservada para imágenes futuras, si hicieran falta)
└── README.md
```

## 1. Cómo abrir el proyecto en tu computador (local)

No necesitas instalar nada especial, pero algunos navegadores limitan las
rutas relativas cuando abres el `index.html` directamente con doble clic
(protocolo `file://`). Lo más seguro es levantar un pequeño servidor local.

**Opción A — con Python (ya viene instalado en la mayoría de sistemas):**

```bash
python -m http.server 4173
```

Luego abre en tu navegador: `http://localhost:4173`

**Opción B — con Node.js:**

```bash
npx serve .
```

y abre la URL que te indique la terminal.

**Opción C — directo:**
También puedes abrir `index.html` haciendo doble clic; en la mayoría de
navegadores modernos funciona igual, ya que el proyecto no depende de un
backend.

## 2. Cómo crear un repositorio en GitHub

Si partes de cero:

1. Entra a [github.com](https://github.com) e inicia sesión.
2. Haz clic en el botón **New** (o **Nuevo repositorio**).
3. Ponle un nombre, por ejemplo `carta-cumpleanos`.
4. Déjalo en **Public** (debe ser público para usar GitHub Pages gratis).
5. No marques la opción de agregar README, `.gitignore` ni licencia si ya
   tienes estos archivos localmente (para evitar conflictos).
6. Haz clic en **Create repository**.

Esta carpeta ya está conectada a un repositorio existente en
`https://github.com/TheLaico/mafer`, así que puedes saltarte este paso y
continuar directamente con el siguiente.

## 3. Cómo subir los archivos

Desde la carpeta del proyecto, en una terminal:

```bash
git add .
git commit -m "Primera versión de la carta"
git push
```

Si en algún momento necesitas conectar la carpeta a un repositorio nuevo
desde cero, el proceso completo sería:

```bash
git init
git add .
git commit -m "Primera versión de la carta"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## 4. Cómo habilitar GitHub Pages

1. Entra al repositorio en GitHub.
2. Ve a **Settings** (Configuración).
3. En el menú lateral, busca **Pages**.
4. En **Build and deployment**, selecciona como **Source**: `Deploy from a branch`.

## 5. Cómo seleccionar la rama y la carpeta correctas

1. En la sección **Branch**, elige la rama `main`.
2. En el selector de carpeta, elige `/ (root)` (la raíz del proyecto, ya que
   `index.html` está en la carpeta principal, no dentro de una subcarpeta).
3. Haz clic en **Save**.

## 6. Cómo identificar la URL publicada

Después de guardar, espera uno o dos minutos. GitHub mostrará un mensaje en
la misma página de **Pages** con la URL publicada, normalmente con este
formato:

```
https://TU-USUARIO.github.io/TU-REPOSITORIO/
```

Para este repositorio en particular, la URL publicada sería:

```
https://thelaico.github.io/mafer/
```

Esa es la URL que puedes compartir. El proyecto usa rutas relativas, así
que funcionará igual tanto en local como en esa ruta de subcarpeta.

## 7. Cómo actualizar el contenido y volver a publicarlo

Cada vez que quieras hacer un cambio (por ejemplo, editar el texto en
`index.html` o un color en `css/styles.css`):

```bash
git add .
git commit -m "Describe aquí tu cambio"
git push
```

GitHub Pages se actualiza automáticamente unos minutos después de cada
`push` a la rama `main`. No hace falta ningún proceso de compilación ni
GitHub Actions.

## Notas de privacidad

Esta página no recopila ni envía ningún dato personal: no tiene analítica,
no tiene formularios, no usa cookies ni cuenta cuántas veces se abrió el
enlace. El único "costo" de privacidad es que, al estar en GitHub Pages, el
enlace es accesible para cualquiera que lo tenga.
