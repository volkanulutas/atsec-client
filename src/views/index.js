import Dashboard from "./pages/Dashboard";
import Buttons from "./elements/Buttons";
import Alerts from "./elements/Alerts";
import Grid from "./elements/Grid";
import Typography from "./elements/Typography";
import Cards from "./elements/Cards";
import Tabs from "./elements/Tabs";
import Tables from "./elements/Tables";
import Breadcrumbs from "./elements/Breadcrumbs";
import Forms from "./elements/Forms";
import Loaders from "./elements/Loaders";
import Avatars from "./elements/Avatars";
import Invoice from "./pages/Invoice";
import Analytics from "./pages/Analytics";
import CmsPage from "./pages/Cms";
import Widgets from "./pages/Widgets";
import BlankPage from "./pages/BlankPage";
import SubNav from "./pages/SubNav";
import Feed from "./pages/Feed";
import Modals from "./elements/Modals";
import ProgressBars from "./elements/ProgressBars";
import PaginationPage from "./elements/Pagination";
import ErrorPage from "./pages/404";

import ListUserComponent from "../components/user/ListUserComponent";
import CreateUserComponent from "../components/user/CreateUserComponent";

import ListRoleComponent from "../components/role/ListRoleComponent";
import CreateRoleComponent from "../components/role/CreateRoleComponent";

import ListPermissionComponent from "../components/permission/ListPermissionComponent";
import CreatePermissionComponent from "../components/permission/CreatePermissionComponent";

import ListDonorComponent from "../components/donor/ListDonorComponent";
import CreateDonorComponent from "../components/donor/CreateDonorComponent";

import ListCustomerComponent from "../components/customer/ListCustomerComponent";
import CreateCustomerComponent from "../components/customer/CreateCustomerComponent";

import ListProductComponent from "../components/product/ListProductComponent";
import ListPackingProductComponent from "../components/packingproduct/ListPackingProductComponent";

import CreatePackingProductComponent from "../components/packingproduct/CreatePackingProductComponent";


import CreateProductComponent from "../components/product/CreateProductComponent";

import ListRawProductComponent from "../components/rawproduct/ListRawProductComponent";
import CreateRawProductComponent from "../components/rawproduct/CreateRawProductComponent";


import MasterRawProduct from "../components/keyproduct/MasterRawProduct";

import ListDonorInstituteComponent from "../components/donorinstitute/ListDonorInstituteComponent";
import CreateDonorInstituteComponent from "../components/donorinstitute/CreateDonorInstituteComponent";

import ListTissueTypeComponent from "../components/tissuetype/ListTissueTypeComponent";
import CreateTissueTypeComponent from "../components/tissuetype/CreateTissueTypeComponent";

import ListLocationComponent from "../components/location/ListLocationComponent";
import CreateLocationComponent from "../components/location/CreateLocationComponent";

import ChangePasswordComponent from "../components/auth/ChangePassword";
import LoginComponent from "../components/auth/LoginComponent";

import ListRejectArchiveComponent from "../components/rawproduct/rejectarchive/ListRejectArchiveComponent";
import ViewRejectArchiveComponent from "../components/rawproduct/rejectarchive/ViewRejectArchiveComponent";

import AuthService from "../services/AuthService";


const pageList = [];

const allPageList = [
  {
    name: "Anasayfa",
    path: "/home",
    component: Dashboard,
  },
  {
    name: "Şifre Değiştir",
    path: "/change-password/:id",
    component: ChangePasswordComponent,
  },

  {
    name: "Kullanıcılar",
    path: "/users/",
    id: "USER_PAGE_PERMISSION", 
    component: ListUserComponent,
  },
  {
    name: "Kullanıcı Ekle/Güncelle",
    path: "/add-user/:state/:id",
    component: CreateUserComponent,
  },
  {
    name: "Kullanıcı Detayı",
    path: "/add-user/:state/:id",
    component: CreateUserComponent,
  },
  {
    name: "Roller",
    path: `/roles/`,
    id: "ROLE_PAGE_PERMISSION", 
    component: ListRoleComponent,
  },
  {
    name: "Rol Ekle/Güncelle",
    path: "/add-role/:state/:id",
    component: CreateRoleComponent,
  },
  {
    name: "Rol Detayı",
    path: "/add-role/:state/:id",
    component: CreateRoleComponent,
  },
  {
    name: "Yetkiler",
    path: "/permissions/",
    id: "PERMISSION_PAGE_PERMISSION", 
    component: ListPermissionComponent,
  },
  /*
  // TODO: Yetki eklemeye izin verilmemeli
  {
    name: "Yetki Ekle/Güncelle",
    path: "/add-permission/:state/:id",
    component: CreatePermissionComponent,
  },
  */
  {
    name: "Yetki Detayı",
    path: "/add-permission/:state/:id",
    component: CreatePermissionComponent,
  },
  {
    name: "Donör Listesi",
    path: "/donors/",
    id: "DONOR_PAGE_PERMISSION", 
    component: ListDonorComponent,
  },
  {
    name: "Donör Ekle/Güncelle",
    path: "/add-donor/:state/:id",
    component: CreateDonorComponent,
  },
  {
    name: "Donör Detayı",
    path: "/add-donor/:state/:id",
    component: CreateDonorComponent,
  },
  {
    name: "Müşteri Listesi",
    path: "/customers/",
    id: "CUSTOMER_PAGE_PERMISSION", 
    component: ListCustomerComponent,
  },
  {
    name: "Müşteri Ekle/Güncelle",
    path: "/add-customer/:state/:id",
    component: CreateCustomerComponent,
  },
  {
    name: "Müşteri Detayı",
    path: "/add-customer/:state/:id",
    component: CreateCustomerComponent,
  },
  {
    name: "Ham Ürün Listesi",
    path: "/rawproducts/",
    id: "RAWPRODUCT_PAGE_PERMISSION2", 
    component: ListRawProductComponent,
  },
  {
    name: "Ham Ürün Listesi",
    path: "/add-rawproduct/:state/:id",
    id: "RAWPRODUCT_PAGE_PERMISSION2", 
    component: MasterRawProduct,
  },
  {
    name: "Ham Ürün Ekle/Güncelle",
    path: "/add-rawproduct2/:state/:id",
    component: CreateRawProductComponent,
  },
  {
    name: "Ham Ürün Görüntüle",
    path: "/add-rawproduct2/:state/:id",
    component: CreateRawProductComponent,
  },
  {
    name: "Doku Tipi Listesi",
    path: "/tissuetypes/",
    id: "TISSUETYPE_PAGE_PERMISSION", 
    component: ListTissueTypeComponent,
  },
  {
    name: "Doku Tipi Ekle/Güncelle",
    path: "/add-tissuetype/:state/:id",
    component: CreateTissueTypeComponent,
  },
  {
    name: "Doku Tipi Detayı",
    path: "/add-tissuetype/:state/:id",
    component: CreateTissueTypeComponent,
  },
  {
    name: "Donör Kurum Listesi",
    path: "/donorinstitutes/",
    id: "DONORINSTITUDE_PAGE_PERMISSION", 
    component: ListDonorInstituteComponent,
  },
  {
    name: "Kurum Donör Ekle/Güncelle",
    path: "/add-donorinstitute/:id",
    component: CreateDonorInstituteComponent,
  },
  {
    name: "Kurum Donör Detayı",
    path: "/add-donorinstitute/:state/:id",
    component: CreateDonorInstituteComponent,
  },
  {
    name: "Ürün Listesi",
    path: "/products/",
    id: "PRODUCT_PAGE_PERMISSION", 
    component: ListProductComponent,
  },

  {
    name: "Paketlenmiş Ürün Listesi",
    path: "/packingproducts/",
    id: "PACKINGPRODUCT_PAGE_PERMISSION", 
    component: ListPackingProductComponent,
  },


  {
    name: "Paketlenmiş Ürün Ekle/Güncelle",
    path: "/add-packingproduct/:state/:id",
    component: CreatePackingProductComponent,
  },
  {
    name: "Paketlenmiş Ürün Görüntüle",
    path: "/add-packingproduct/:state/:id",
    component: CreatePackingProductComponent,
  },

  {
    name: "Ürün Ekle/Güncelle",
    path: "/add-product/:state/:id",
    component: CreateProductComponent,
  },
  {
    name: "Ürün Görüntüle",
    path: "/add-product/:state/:id",
    component: CreateProductComponent,
  },
  {
    name: "Lokasyon Listesi",
    path: "/locations/",
    id: "LOCAITON_PAGE_PERMISSION",
    component: ListLocationComponent,
  },
  {
    name: "Lokasyon Ekle/Güncelle",
    path: "/add-location/:state/:id",
    component: CreateLocationComponent,
  },
  {
    name: "Lokasyon Detayı",
    path: "/add-location/:state/:id",
    component: CreateLocationComponent,
  },
  {
    name: "Ham Ürün Red Arşivi",
    path: "/rejectarchives/",
    id: "RAWPRODUCTREJECT_PAGE_PERMISSION", 
    component: ListRejectArchiveComponent,
  },
  {
    name: "Ham Ürün Red Detayı",
    path: "/view-rejectarchive/:id",
    component: ViewRejectArchiveComponent,
  },
  {
    name: "Buttons",
    path: "/elements/buttons",
    component: Buttons,
  },
  {
    name: "Alerts",
    path: "/elements/alerts",
    component: Alerts,
  },
  {
    name: "Grid",
    path: "/elements/grid",
    component: Grid,
  },
  {
    name: "Typography",
    path: "/elements/typography",
    component: Typography,
  },
  {
    name: "Cards",
    path: "/elements/cards",
    component: Cards,
  },
  {
    name: "Tabs",
    path: "/elements/tabs",
    component: Tabs,
  },
  {
    name: "Tables",
    path: "/elements/tables",
    component: Tables,
  },
  {
    name: "Progress Bars",
    path: "/elements/progressbars",
    component: ProgressBars,
  },
  {
    name: "Pagination",
    path: "/elements/pagination",
    component: PaginationPage,
  },
  {
    name: "Modals",
    path: "/elements/modals",
    component: Modals,
  },
  {
    name: "Breadcrumbs",
    path: "/elements/breadcrumbs",
    component: Breadcrumbs,
  },
  {
    name: "Forms",
    path: "/elements/forms",
    component: Forms,
  },
  {
    name: "Loaders",
    path: "/elements/loaders",
    component: Loaders,
  },
  {
    name: "Avatars",
    path: "/elements/avatars",
    component: Avatars,
  },
  {
    name: "Blank",
    path: "/pages/blank",
    component: BlankPage,
  },
  {
    name: "Sub Navigation",
    path: "/pages/subnav",
    component: SubNav,
  },
  {
    name: "404",
    path: "/pages/404",
    component: ErrorPage,
  },
  {
    name: "Analytics",
    path: "/apps/analytics",
    component: Analytics,
  },
  {
    name: "Activity Feed",
    path: "/apps/feed",
    component: Feed,
  },
  {
    name: "Invoice",
    path: "/apps/invoice",
    component: Invoice,
  },
  {
    name: "CMS",
    path: "/apps/cms",
    component: CmsPage,
  },
  {
    name: "Widgets",
    path: "/widgets",
    component: Widgets,
  },
];

export default allPageList;
