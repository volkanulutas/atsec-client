import Dashboard from './pages/Dashboard';
import Buttons from './elements/Buttons';
import Alerts from './elements/Alerts';
import Grid from './elements/Grid';
import Typography from './elements/Typography';
import Cards from './elements/Cards';
import Tabs from './elements/Tabs';
import Tables from './elements/Tables';
import Breadcrumbs from './elements/Breadcrumbs';
import Forms from './elements/Forms';
import Loaders from './elements/Loaders';
import Avatars from './elements/Avatars';
import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import CmsPage from './pages/Cms';
import Widgets from './pages/Widgets';
import BlankPage from './pages/BlankPage';
import SubNav from './pages/SubNav';
import Feed from './pages/Feed';
import Modals from './elements/Modals';
import ProgressBars from './elements/ProgressBars';
import PaginationPage from './elements/Pagination';
import ErrorPage from './pages/404';

import ListUserComponent from '../components/user/ListUserComponent';
import CreateUserComponent from '../components/user/CreateUserComponent';
import ViewUserComponent from '../components/user/ViewUserComponent';

import ListRoleComponent from '../components/role/ListRoleComponent';
import CreateRoleComponent from '../components/role/CreateRoleComponent';
import ViewRoleComponent from '../components/role/ViewRoleComponent';

import ListPermissionComponent from '../components/permission/ListPermissionComponent';
import CreatePermissionComponent from '../components/permission/CreatePermissionComponent';
import ViewPermissionComponent from '../components/permission/ViewPermissionComponent';

import ListDonorComponent from '../components/donor/ListDonorComponent';
import CreateDonorComponent from '../components/donor/CreateDonorComponent';
import ViewDonorComponent from '../components/donor/ViewDonorComponent';

import ListCustomerComponent from '../components/customer/ListCustomerComponent';
import CreateCustomerComponent from '../components/customer/CreateCustomerComponent';
import ViewCustomerComponent from '../components/customer/ViewCustomerComponent';

import ListProductComponent from '../components/product/ListProductComponent';
import CreateProductComponent from '../components/product/CreateProductComponent';
import ViewProductComponent from '../components/product/ViewProductComponent';

import ListRawProductComponent from '../components/rawproduct/ListRawProductComponent';
import CreateRawProductComponent from '../components/rawproduct/CreateRawProductComponent';
import ViewRawProductComponent from '../components/rawproduct/ViewRawProductComponent';

import ListDonorInstituteComponent from '../components/donorinstitute/ListDonorInstituteComponent';
import CreateDonorInstituteComponent from '../components/donorinstitute/CreateDonorInstituteComponent';
import ViewDonorInstituteComponent from '../components/donorinstitute/ViewDonorInstituteComponent';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Anasayfa',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'Kullanıcılar',
    path: '/users/',
    component: ListUserComponent,
  },
  {
    name: 'Kullanıcı Ekle/Güncelle',
    path: '/add-user/:id',
    component: CreateUserComponent,
  },
  {
    name: 'Kullanıcı Detayı',
    path: '/view-user/:id',
    component: ViewUserComponent,
  },
  {
    name: 'Roller',
    path: `/roles/`,
    component: ListRoleComponent,
  },
  {
    name: 'Rol Ekle/Güncelle',
    path: '/add-role/:id',
    component: CreateRoleComponent,
  },
  {
    name: 'Rol Detayı',
    path: '/view-role/:id',
    component: ViewRoleComponent,
  },
  {
    name: 'Yetkiler',
    path: '/permissions/',
    component: ListPermissionComponent,
  },
  {
    name: 'Yetki Ekle/Güncelle',
    path: '/add-permission/:id',
    component: CreatePermissionComponent,
  },
  {
    name: 'Yetki Detayı',
    path: '/view-permission/:id',
    component: ViewPermissionComponent,
  },
  {
    name: 'Donor Listesi',
    path: '/donors/',
    component: ListDonorComponent,
  },
  {
    name: 'Donor Ekle/Güncelle',
    path: '/add-donor/:id',
    component: CreateDonorComponent,
  },
  {
    name: 'Donor Detayı',
    path: '/view-donor/:id',
    component: ViewDonorComponent,
  },
  {
    name: 'Müşteri Listesi',
    path: '/customers/',
    component: ListCustomerComponent,
  },
  {
    name: 'Müşteri Ekle/Güncelle',
    path: '/add-customer/:id',
    component: CreateCustomerComponent,
  },
  {
    name: 'Müşteri Detayı',
    path: '/view-customer/:id',
    component: ViewCustomerComponent,
  },
  {
    name: 'Ham Ürün Listesi',
    path: '/rawproducts/',
    component: ListRawProductComponent,
  },
  {
    name: 'Ham Ürün Ekle/Güncelle',
    path: '/add-rawproduct/:id',
    component: CreateRawProductComponent,
  },
  {
    name: 'Ham Ürün Görüntüle',
    path: '/view-rawproduct/:id',
    component: ViewRawProductComponent,
  },
  {
    name: 'Donor Kurum Listesi',
    path: '/donorinstitutes/',
    component: ListDonorInstituteComponent,
  },
  {
    name: 'Kurum Donor Ekle/Güncelle',
    path: '/add-donorinstitute/:id',
    component: CreateDonorInstituteComponent,
  },
  {
    name: 'Kurum Donor Detayı',
    path: '/view-donorinstitute/:id',
    component: ViewDonorInstituteComponent,
  },
  {
    name: 'Ürün Listesi',
    path: '/products/',
    component: ListProductComponent,
  },
  {
    name: 'Ürün Ekle/Güncelle',
    path: '/add-product/:id',
    component: CreateProductComponent,
  },
  {
    name: 'Ürün Görüntüle',
    path: '/view-product/:id',
    component: ViewProductComponent,
  },
  {
    name: 'Buttons',
    path: '/elements/buttons',
    component: Buttons,
  },
  {
    name: 'Alerts',
    path: '/elements/alerts',
    component: Alerts,
  },
  {
    name: 'Grid',
    path: '/elements/grid',
    component: Grid,
  },
  {
    name: 'Typography',
    path: '/elements/typography',
    component: Typography,
  },
  {
    name: 'Cards',
    path: '/elements/cards',
    component: Cards,
  },
  {
    name: 'Tabs',
    path: '/elements/tabs',
    component: Tabs,
  },
  {
    name: 'Tables',
    path: '/elements/tables',
    component: Tables,
  },
  {
    name: 'Progress Bars',
    path: '/elements/progressbars',
    component: ProgressBars,
  },
  {
    name: 'Pagination',
    path: '/elements/pagination',
    component: PaginationPage,
  },
  {
    name: 'Modals',
    path: '/elements/modals',
    component: Modals,
  },
  {
    name: 'Breadcrumbs',
    path: '/elements/breadcrumbs',
    component: Breadcrumbs,
  },
  {
    name: 'Forms',
    path: '/elements/forms',
    component: Forms,
  },
  {
    name: 'Loaders',
    path: '/elements/loaders',
    component: Loaders,
  },
  {
    name: 'Avatars',
    path: '/elements/avatars',
    component: Avatars,
  },
  {
    name: 'Blank',
    path: '/pages/blank',
    component: BlankPage,
  },
  {
    name: 'Sub Navigation',
    path: '/pages/subnav',
    component: SubNav,
  },
  {
    name: '404',
    path: '/pages/404',
    component: ErrorPage,
  },
  {
    name: 'Analytics',
    path: '/apps/analytics',
    component: Analytics,
  },
  {
    name: 'Activity Feed',
    path: '/apps/feed',
    component: Feed,
  },
  {
    name: 'Invoice',
    path: '/apps/invoice',
    component: Invoice,
  },
  {
    name: 'CMS',
    path: '/apps/cms',
    component: CmsPage,
  },
  {
    name: 'Widgets',
    path: '/widgets',
    component: Widgets,
  },
];

export default pageList;
