document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const contraseña = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    try {
      const res = await fetch('http://localhost:5103/api/Usuarios/login', {
        method: 'POST',
        mode: 'cors',               
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nombre: nombre, Contraseña: contraseña })
      });


      if (res.status === 401) {
        errorDiv.textContent = 'Credenciales inválidas';
        errorDiv.style.display = 'block';
        return;
      }

      if (!res.ok) throw new Error(res.statusText);

      const { id, idRol } = await res.json();

      // Guarda datos en localStorage
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('id', id);
      localStorage.setItem('idRol', idRol);

      // Redirige al dashboard único
      window.location.href = '../components/dashboard.html';

    } catch (err) {
      console.error(err);
      errorDiv.textContent = 'No se pudo conectar al servidor';
      errorDiv.style.display = 'block';
    }
  });
});
