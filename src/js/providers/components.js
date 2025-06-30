export async function loadComponent(options) {
  const urlParts = options.url.split('/');
  const fileName = urlParts[urlParts.length - 1];

  // 1) Calcula la carpeta base de dashboard.html (/src/components/)
  const baseDir = window.location.pathname.replace(/\/[^\/]*$/, '/');

  // 2) Construye ruta completa a HTML y JS
  const htmlUrl = `${baseDir}${options.url}/${fileName}.html?a=${Date.now()}`;
  const jsUrl   = `${baseDir}${options.url}/${fileName}.js`;

  console.log('Loading component:', htmlUrl);
  const resp = await fetch(htmlUrl, { cache: "no-store" });
  if (!resp.ok) throw new Error(`Failed to load ${htmlUrl}`);
  const html = await resp.text();
  document.getElementById(options.parent).innerHTML = html;

  console.log('Importing module:', jsUrl);
  const module = await import(jsUrl);
  module.init();
}
