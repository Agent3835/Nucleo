import { menu } from '../../../js/settings.js';
import { loadComponent } from '../../../js/providers/components.js';

export function init() {
  console.log('sidemenu loaded...');
  const rol = localStorage.getItem('idRol') || 'GUEST';
  const items = menu[rol] || [];
  document.getElementById('menu-list').innerHTML = items.map(renderItem).join('');
  attachMenuEvents();
  attachToggleEvent();
}

function renderItem(item) {
  if (item.submenu) {
    return `
      <li class="menu-item has-submenu">
        <div class="menu-label">
            <i class="fas fa-${item.icon}"></i>
              <span>${item.title}</span>
            <i class="fas fa-chevron-down submenu-arrow"></i>
        </div>
        <ul class="submenu">
          ${item.submenu.map(sub => `
            <li class="submenu-item" data-component="${sub.component}">
             <i class="fas fa-${sub.icon || 'circle'}"></i>
             <span>${sub.title}</span>
          </li>`).join('')}
        </ul>
      </li>`;
  } else {
    return `
      <li class="menu-item" data-component="${item.component}">
        <div class="menu-label">
          <i class="fas fa-${item.icon}"></i>
          <span>${item.title}</span>
        </div>
      </li>`;
  }
}

// This function attaches click events to menu items and submenus

function attachMenuEvents() {
  document.querySelectorAll('.has-submenu').forEach(li => {
    li.addEventListener('click', e => {
      e.stopPropagation();
      li.classList.toggle('open');
    });
  });
  document.querySelectorAll('[data-component]').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-component');
      loadComponent({ parent: 'content', url });
    });
  });
}


// This function attaches the toggle event to the menu button

function attachToggleEvent() {
  console.log("attaching toggle event...");
  const menuEl = document.getElementById('sidemenu');
  const btn    = document.getElementById('sidemenu-toggle');

  btn.addEventListener('click', () => {
    // Alterna la clase collapsed en el sidemenu
    const collapsed = menuEl.classList.toggle('collapsed');
    // Alterna la clase global en <body> para que el header responda
    document.body.classList.toggle('sidemenu-collapsed', collapsed);
    // Actualiza el aria-label del botón
    btn.setAttribute(
      'aria-label',
      collapsed ? 'Expandir menú' : 'Colapsar menú'
    );
  });
}

// Asegúrate de llamar a esta función tras cargar el DOM:
document.addEventListener('DOMContentLoaded', attachToggleEvent);
document.addEventListener('DOMContentLoaded', init);
