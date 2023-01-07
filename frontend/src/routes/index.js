import Homepage from 'src/pages/Homepage';
import ProductInfo from 'src/pages/ProductInfo';
import ProductList from 'src/pages/ProductList';
import ShoppingCart from 'src/pages/ShoppingCart';
import CreateNewPassword from 'src/pages/CreateNewPassword';
import VerifyAccount from 'src/pages/VerifyAccount';
import AdminAddProduct from 'src/pages/AdminAddProduct';
import AdminOrders from 'src/pages/AdminOrders';
import AdminProducts from 'src/pages/AdminProducts';

export const publicRoutes = [
  { path: '/', component: Homepage },
  { path: '/productlist', component: ProductList },
  { path: '/createnewpassword', component: CreateNewPassword },
  { path: '/verifyaccount', component: VerifyAccount },
];

export const privateRoutes = [
  { path: '/productinfo/:id', component: ProductInfo },
  { path: '/shoppingcart', component: ShoppingCart },
];

export const adminRoutes = [
  { path: '/admin/orders', component: AdminOrders },
  { path: '/admin/products', component: AdminProducts },
  { path: '/admin/addproduct', component: AdminAddProduct },
];
