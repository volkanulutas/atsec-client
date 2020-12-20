export default {
  top: [
    {
      name: 'Anasayfa',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Kullanıcı Yönetimi',
      icon: 'Users',
      children: [
        {
          name: 'Kullanıcılar',
          url: '/users/',
        },
        {
          name: 'Roller',
          url: '/roles/',
        },
        {
          name: 'Yetkiler',
          url: '/permissions/',
        },
      ]
    },
    {
      name: 'Ürün Yönetimi',
      icon: 'Layers',
      children: [
        {
          name: 'Ürünler',
          url: '/products/',
          icon: 'Home',
        },
        {
          name: 'Donor',
          url: '/donors/',
          icon: 'Home',
        },
      ]
    },
    {
      name: 'Satış Yönetimi',
      icon: 'Home',
      children: [
        {
          name: 'Müşteriler',
          url: '/customers/',
          icon: 'Home',
        },
      ]
    },
    {
      divider: true,
    },

  ],
  bottom: [
    {
      name: 'Profil',
      url: '/dashboard',
      icon: 'User',
      badge: {
        variant: 'success',
        text: '3',
      },
    },
  ],
};
