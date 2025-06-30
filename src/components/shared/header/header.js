export function init() {
  console.log("✅ Header cargado");

  const rol = localStorage.getItem('idRol') || 'Invitado';
  const nombre = localStorage.getItem('nombre') || 'Invitado';
  const roleDisplay = {
    ADM: "Administrador",
    SUP: "Supervisor",
    OPM: "Operador",
  };

  document.getElementById('user-name').textContent = nombre;
  document.getElementById('user-role').textContent = roleDisplay[rol] || "Invitado";

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "../../src/pages/login.html";
  });
}
