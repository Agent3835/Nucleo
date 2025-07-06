// src/js/providers/components.js

export async function loadComponent({ parent, url }) {
  // url ejemplo: 'shared/header/header'
  const parts    = url.split('/');
  const name     = parts[parts.length - 1];
  const baseDir  = window.location.pathname.replace(/\/[^\/]*$/, '/');

  const htmlUrl  = `${baseDir}${url}/${name}.html?a=${Date.now()}`;
  const jsUrl    = `${baseDir}${url}/${name}.js`;

  // 1) Fetch del HTML
  const res = await fetch(htmlUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Error al cargar ${htmlUrl}`);
  const html = await res.text();
  document.getElementById(parent).innerHTML = html;

  // 2) Import dinámico del JS y llamada a init()
  const module = await import(jsUrl);
  if (module.init) module.init();
}
