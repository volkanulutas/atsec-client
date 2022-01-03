
const allNavList = {
  top: [
    {
      name: "Kullanıcı Yönetimi",
      icon: "Users",
      permission: "USER_MENU_PERMISSION",
      children: [
        {
          name: "Kullanıcılar",
          url: "/users/",
          permission: "USER_PAGE_PERMISSION",
          icon: "User",
        },
        {
          name: "Roller",
          url: "/roles/",
          permission: "ROLE_PAGE_PERMISSION",
          icon: "User",
        },
        {
          name: "Yetkiler",
          url: "/permissions/",
          permission: "PERMISSION_PAGE_PERMISSION", 
          icon: "User",
        },
      ],
    },
    {
      name: "Ham Ürün Yönetimi",
      icon: "Layers",
      permission: "RAWPRODUCT_MENU_PERMISSION",
      children: [
        {
          name: "Donör",
          url: "/donors/",
          permission: "DONOR_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          
          name: "Ham Ürünler",
          url: "/rawproducts/",
          permission: "RAWPRODUCT_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          name: "Ham Ürün Red Arşivi",
          url: "/rejectarchives/",
          permission: "RAWPRODUCTREJECT_PAGE_PERMISSION",  
          icon: "Home",
        },
      ],
    },
    {
      name: "Üretim Yönetimi",
      icon: "Layers",
      permission: "PRODUCT_MENU_PERMISSION",
      children: [
        {
          name: "Ön İşlem",
          url: "/products/",
          permission: "PRODUCT_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          name: "Paketlenmiş Ürünler",
          url: "/packingproducts/",
          permission: "PACKINGPRODUCT_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          name: "Müşteriler",
          url: "/customers/",
          permission: "CUSTOMER_PAGE_PERMISSION",   
          icon: "Home",
        },
      ],
    },
    {
      divider: true,
    },
  ],
  bottom: [
    {
      name: "Profil",
      url: "/dashboard",
      icon: "User",
      badge: {
        variant: "success",
        text: "3",
      },
    },
  ]
};

 export default allNavList;