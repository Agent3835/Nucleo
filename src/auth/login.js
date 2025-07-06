document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const nombre      = document.getElementById('nombre').value.trim();
  const contraseña  = document.getElementById('password').value;
  const errorDiv    = document.getElementById('error');

  // Usa tu IP local si vas a probar desde otro dispositivo:
  const API_HOST = 'http://192.168.1.14:5103'; 
  // O bien si sólo pruebas en tu máquina:
  // const API_HOST = 'http://localhost:5103';

  const LOGIN_EP = '/api/Usuarios/login';   

  try {
    const res = await fetch(`${API_HOST}${LOGIN_EP}`, {
      method: 'POST',
      mode:   'cors',             
      headers:{ 'Content-Type':'application/json' },
      body:    JSON.stringify({ Nombre: nombre, Contraseña: contraseña })
    });

    if (!res.ok) 
      throw new Error(`Status ${res.status}`);

    const { id, idRol } = await res.json();
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('id', id);
    localStorage.setItem('idRol', idRol);
    window.location.href = '../components/dashboard.html';

  } catch (err) {
    console.error(err);
    errorDiv.textContent = err.message.includes('404')
      ? 'Ruta no encontrada en el servidor'
      : 'No se pudo conectar al servidor';
    errorDiv.style.display = 'block';
  }
});
