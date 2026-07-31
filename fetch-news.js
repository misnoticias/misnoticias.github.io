// fetch-news.js
// Descarga titulares del día usando la API gratuita de GNews.io
// y genera index.html a partir de template.html

const fs = require('fs');

const API_KEY = process.env.GNEWS_API_KEY;
const LANG = 'es';
const COUNTRY = 'es';
const MAX_ARTICLES = 10;

if (!API_KEY) {
  console.error('ERROR: falta la variable de entorno GNEWS_API_KEY');
  process.exit(1);
}

async function main() {
  const url = `https://gnews.io/api/v4/top-headlines?lang=${LANG}&country=${COUNTRY}&max=${MAX_ARTICLES}&apikey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error al llamar a GNews API: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const articles = data.articles || [];

  if (articles.length === 0) {
    console.warn('No se recibieron artículos. Se mantiene el index.html anterior.');
    return;
  }

  const cardsHtml = articles.map(article => {
    const title = escapeHtml(article.title || 'Sin título');
    const description = escapeHtml(article.description || '');
    const sourceName = escapeHtml(article.source?.name || 'Fuente desconocida');
    const publishedAt = article.publishedAt
      ? new Date(article.publishedAt).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })
      : '';
    const image = article.image
      ? `<img src="${article.image}" alt="${title}" loading="lazy">`
      : '';

    return `
  <article class="news-card">
    ${image}
    <h2>${title}</h2>
    <div class="meta">${sourceName} · ${publishedAt}</div>
    <p>${description}</p>
    <a href="${article.url}" target="_blank" rel="noopener noreferrer">Leer noticia completa &rarr;</a>
  </article>`;
  }).join('\n');

  const template = fs.readFileSync('template.html', 'utf8');
  const updatedDate = new Date().toLocaleString('es-ES', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid'
  });

  const finalHtml = template
    .replace('{{NEWS_CONTENT}}', cardsHtml)
    .replace('{{UPDATED_DATE}}', updatedDate);

  fs.writeFileSync('index.html', finalHtml, 'utf8');
  console.log(`index.html generado con ${articles.length} noticias.`);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
