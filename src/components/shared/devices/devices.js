// components/admin/devices/devices.js

// Ajusta la ruta relativa según dónde esté tu settings.js
import { settings } from '../../../../js/settings.js';

export function init() {
  const container = document.getElementById('devices-list');
  container.innerHTML = '<p>Cargando dispositivos…</p>';

  fetch(`${settings.apiUrl}dispositivos`)
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then(dispositivos => {
      if (dispositivos.length === 0) {
        container.innerHTML = '<p>No hay dispositivos registrados.</p>';
        return;
      }
      // Renderizamos una lista simple; puedes cambiar a tabla o tarjetas
      const lista = document.createElement('ul');
      dispositivos.forEach(d => {
        const li = document.createElement('li');
        li.textContent = `${d.nombre} (ID: ${d._id})`;
        lista.appendChild(li);
      });
      container.innerHTML = '';
      container.appendChild(lista);
    })
    .catch(err => {
      container.innerHTML = `<p class="error">No se pudieron cargar: ${err.message}</p>`;
      console.error(err);
    });
}
