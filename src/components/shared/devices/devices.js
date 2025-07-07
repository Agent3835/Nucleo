// src/components/shared/devices/devices.js
import { settings } from '../../../js/settings.js';
import { loadComponent } from '../../../js/providers/components.js';


export async function init() {
  const container = document.querySelector('.devices-container');

  try {
    // devices.js
    const res = await fetch(`${settings.apiUrl}/api/Dispositivos`);

    if (!res.ok) throw new Error(`Error ${res.status}`);
    const devices = await res.json();

    // Vaciar contenedor
    container.innerHTML = '';

    // Crear una tarjeta por dispositivo
    devices.forEach(d => {
      // 1) Calcula la descripción del estado
      const estadoDesc = d.idEdoDispositivo === 'Enc'
        ? 'Encendido'
        : 'Apagado';
      const card = document.createElement('div');
      card.className = 'device-card';
      card.innerHTML = `
        <h2><strong>Área:</strong> ${d.idArea}</h2>
        <p><strong>Batería:</strong> ${d.nivelBateria}%</p>
        <p><strong>Estado:</strong> ${estadoDesc}</p>
      `;

     card.addEventListener('click', () => {
      localStorage.setItem('selectedDeviceId', d.id);
       loadComponent({ parent: 'content', url: 'shared/graphics' });
     });

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <p style="color:red; text-align:center;">
        No se pudieron cargar los dispositivos.
      </p>
    `;
  }
}
