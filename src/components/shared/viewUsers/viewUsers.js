import { settings } from '../../../js/settings.js';

export async function init() {
  const listEl = document.getElementById('users-list');
  listEl.innerHTML = '<li>Cargando usuarios…</li>';

  try {
    const res = await fetch(`${settings.apiUrl}/api/Usuarios`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const users = await res.json();

    if (users.length === 0) {
      listEl.innerHTML = '<li>No hay usuarios registrados.</li>';
      return;
    }

    listEl.innerHTML = '';
    users.forEach(u => {
      const rolName = u.idRol === 'ADM' ? 'Administrador' :
        u.idRol === 'SUP' ? 'Supervisor' :
          u.idRol === 'OPM' ? 'Operador Móvil' : 'Desconocido';
      const item = document.createElement('li');
      item.className = 'user-item';
      item.innerHTML = `
        <div class="user-info">
          <h3>${u.nombre}</h3>
          <p><strong>Rol:</strong> ${rolName}</p>
        </div>
        <button class="delete-button" data-id="${u.id}">Eliminar</button>
      `;
      listEl.appendChild(item);
    });

    listEl.addEventListener('click', async e => {
      if (!e.target.classList.contains('delete-button')) return;
      const userId = e.target.dataset.id;
      if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

      try {
        const delRes = await fetch(`${settings.apiUrl}/api/Usuarios/${userId}`, {
          method: 'UPDATE'
        });
        if (!delRes.ok) throw new Error(`Error al eliminar: ${delRes.status}`);
        e.target.closest('.user-item').remove();
      } catch (err) {
        console.error(err);
        alert('No se pudo eliminar el usuario.');
      }
    });

  } catch (err) {
    console.error(err);
    listEl.innerHTML = '<li style="color:red;">No se pudieron cargar los usuarios.</li>';
  }
}
