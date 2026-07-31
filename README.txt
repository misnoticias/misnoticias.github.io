# Cómo publicar esta web (todo desde el navegador, sin instalar nada)

## 1. Consigue tu clave gratuita de noticias
1. Entra en https://gnews.io y crea una cuenta gratis.
2. Copia tu **API Key** desde tu panel (plan gratuito: 100 peticiones/día, más que suficiente para 1 actualización diaria).

## 2. Crea tu repositorio en GitHub
1. Entra en https://github.com y crea una cuenta gratis (si no tienes).
2. Pulsa "New repository". Ponle un nombre, por ejemplo `mis-noticias`. Marca que sea **Public**.
3. Sube estos 4 archivos/carpetas usando el botón **"Add file" > "Upload files"** (arrastrando desde tu ordenador, sin usar terminal ni Git):
   - `template.html`
   - `fetch-news.js`
   - `.github/workflows/update-news.yml`
   - `README.md` (opcional)

   Importante: la carpeta `.github/workflows/` debe respetarse tal cual (GitHub la crea sola si arrastras el archivo con esa ruta, o puedes crear los archivos directamente en la web de GitHub con "Create new file" y escribir la ruta completa `.github/workflows/update-news.yml`).

## 3. Guarda tu clave de forma segura
1. En tu repositorio: **Settings > Secrets and variables > Actions > New repository secret**.
2. Nombre: `GNEWS_API_KEY`
3. Valor: pega tu clave de GNews.
4. Guarda.

## 4. Da permisos de escritura a las Actions
1. **Settings > Actions > General > Workflow permissions**.
2. Selecciona **"Read and write permissions"** y guarda.
   (Esto permite que el robot pueda subir el index.html actualizado cada día.)

## 5. Ejecuta el workflow por primera vez
1. Ve a la pestaña **Actions** de tu repositorio.
2. Selecciona "Actualizar noticias diarias" > **Run workflow**.
3. Espera 1-2 minutos: se generará tu primer `index.html` con noticias reales.

A partir de aquí, se ejecutará solo cada día a las 10:00 (hora de España, con la salvedad del cambio de horario invierno/verano indicada en el propio workflow).

## 6. Publica la web con GitHub Pages (tu dominio gratis)
1. **Settings > Pages**.
2. En "Source" elige la rama `main` y carpeta `/root`.
3. Guarda. En unos minutos tu web estará en:
   `https://TU-USUARIO.github.io/mis-noticias/`

Esa URL es 100% gratis y permanente.

## 7. (Opcional) Dominio propio tipo .com
No existen ya dominios .com gratis reales, pero si en el futuro quieres uno propio
(ej. `misnoticias.com`), puedes comprarlo barato (~1-12€/año en Namecheap o Porkbun)
y apuntarlo a tu GitHub Pages solo configurando un DNS desde su web, sin instalar nada tampoco.

## 8. Anuncios de Google AdSense
Cuando tu cuenta de AdSense esté aprobada, sustituye los bloques
`[ Bloque de anuncio AdSense ]` en `template.html` por el código real que te dé Google,
sube el cambio a GitHub, y aparecerán en la siguiente actualización automática.
