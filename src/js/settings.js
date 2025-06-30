// src/js/settings.js

const rol = localStorage.getItem('idRol');

const componentsByRole = {
  ADM: [
    { parent: 'header',  url: 'shared/header' },
    { parent: 'sidemenu',url: 'shared/sidemenu' },
    // { parent: 'content', url: 'admin/home' },
    // { parent: 'footer',  url: 'shared/footer' }
  ],
  SUP: [
    { parent: 'header',  url: 'shared/header' },
    { parent: 'sidemenu',url: 'shared/sidemenu' },
    // { parent: 'content', url: 'supervisor/home' },
    // { parent: 'footer',  url: 'shared/footer' }
  ],
  OPM: [
    { parent: 'header',  url: 'shared/header' },
    { parent: 'sidemenu',url: 'shared/sidemenu' },
    // { parent: 'content', url: 'operator/home' },
    // { parent: 'footer',  url: 'shared/footer' }
  ]
};

export const settings = {
  apiUrl: 'http://localhost:5103/api/',
  load: {
    components: componentsByRole[rol] || componentsByRole['GUEST']
  }
};
