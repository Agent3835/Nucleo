const rol = localStorage.getItem('idRol');
export const user = localStorage.getItem('username') || 'Invitado';

export const menu = {
  ADM: [
    {
      title: 'Dispositivos', icon: 'microchip', component: 'shared/devices'
    },
    {
      title: 'Dashboard', icon: 'chart-simple', component: 'shared/dashboard'
    },
    {
      title: 'Usuarios', icon: 'circle-user', submenu: [
        { title: 'Alta', icon: 'user-plus', component: 'admin/addUser/addUser' },
        { title: 'Ver todos', icon: 'users', component: 'shared/viewUsers' },
        { title: 'Baja', icon: 'user-slash', component: 'admin/deleteUser/deleteUser' }
      ]
    },
    { title: 'Límites', icon: 'chart-line', component: 'shared/device/graphs/graphs' },
    { title: 'Configuración', icon: 'sliders', component: 'shared/alerts/alerts' }
  ],

  SUP: [
    {
      title: 'Dispositivos', icon: 'microchip', component: 'shared/devices'
    },
    {
      title: 'Dashboard', icon: 'chart-simple', component: 'admin/dashboard/dashboard'
    },
    {
      title: 'Usuarios', icon: 'circle-user', submenu: [
        { title: 'Alta', icon: 'user-plus', component: 'admin/addUser/addUser' },
        { title: 'Ver todos', icon: 'users', component: 'shared/viewUsers' }
      ]
    },
    { title: 'Límites', icon: 'chart-line', component: 'shared/device/graphs/graphs' },
    { title: 'Configuración', icon: 'sliders', component: 'shared/alerts/alerts' }
  ],


  OPM: [
    {
      title: 'Dashboard', icon: 'chart-simple', component: 'operator/dashboard/dashboard'
    },
    {
      title: 'Configuración', icon: 'user-circle', component: 'operator/profile/profile' 
    }
  ],

  GUEST: [
    { title: 'Acceso denegado', icon: 'ban', component: 'shared/accessDenied/accessDenied' }
  ]
};

const componentsByRole = {
  ADM: [
    { parent: 'header', url: 'shared/header' },
    { parent: 'sidemenu', url: 'shared/sidemenu' },
  ],
  SUP: [
    { parent: 'header', url: 'shared/header' },
    { parent: 'sidemenu', url: 'shared/sidemenu' }
  ],
  OPM: [
    { parent: 'header', url: 'shared/header' },
    { parent: 'sidemenu', url: 'shared/sidemenu' }
  ],
  GUEST: [
    { parent: 'header', url: 'shared/header' },
    { parent: 'sidemenu', url: 'shared/sidemenu' }
  ]
};

export const settings = {
   apiUrl: 'http://172.18.2.149:5103', // Change this to your API URL
  load: {
    components: componentsByRole[rol]
  }
};
