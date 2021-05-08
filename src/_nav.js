
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
        {
          name: "Donör",
          url: "/donors/",
          permission: "DONOR_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          name: "Donör Kurumları",
          url: "/donorinstitutes/",
          permission: "DONORINSTITUTE_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          name: "Karantina Lokasyon",
          url: "/locations/",
          permission: "LOCATION_PAGE_PERMISSION",
          icon: "Home",
        },
        {
          name: "Doku Tipi",
          url: "/tissuetypes/",
          permission: "TISSUETYPE_PAGE_PERMISSION", 
          icon: "Home",
        },
      ],
    },
    {
      name: "Ürün Yönetimi",
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