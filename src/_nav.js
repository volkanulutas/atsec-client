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
          icon: 'User',
        },
        {
          name: 'Roller',
          url: '/roles/',
          icon: 'User',
        },
        {
          name: 'Yetkiler',
          url: '/permissions/',
          icon: 'User',
        },
      ]
    },
    {
      name: 'Ham Ürün Yönetimi',
      icon: 'Layers',
      children: [
        {
          name: 'Ham Ürünler',
          url: '/rawproducts/',
          icon: 'Home',
        },
        {
          name: 'Donor',
          url: '/donors/',
          icon: 'Home',
        },
        {
          name: 'Donor Kurumları',
          url: '/donorinstitutes/',
          icon: 'Home',
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
