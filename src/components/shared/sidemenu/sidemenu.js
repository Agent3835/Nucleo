// src/components/shared/sidemenu/sidemenu.js

import { menu } from '../../../js/settings.js';
import { loadComponent } from '../../../js/providers/components.js';

export function init() {
  const rol = localStorage.getItem('idRol') || 'GUEST';
  const items = menu[rol] || [];
  const container = document.getElementById('menu-list');
  container.innerHTML = items.map(renderItem).join('');
  attachEvents();
}

function renderItem(item) {
  if (item.submenu) {
    return `
      <li class="menu-item has-submenu" data-module="${item.title}">
        <i class="fas fa-${item.icon}"></i>
        <span>${item.title}</span>
        <ul class="submenu">
          ${item.submenu.map(sub => `
            <li class="submenu-item" data-component="${sub.component}">
              ${sub.title}
            </li>`).join('')}
        </ul>
      </li>
    `;
  } else {
    return `
      <li class="menu-item" data-component="${item.component}">
        <i class="fas fa-${item.icon}"></i>
        <span>${item.title}</span>
      </li>
    `;
  }
}

function attachEvents() {
  // Toggle submenus
  document.querySelectorAll('.has-submenu').forEach(li => {
    li.addEventListener('click', e => {
      e.stopPropagation();
      li.classList.toggle('open');
    });
  });

  // Carga componente en content al hacer click
  document.querySelectorAll('[data-component]').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-component');
      loadComponent({ parent: 'content', url });
    });
  });
}
