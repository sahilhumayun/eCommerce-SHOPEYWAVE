import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Homepage from './pages/home/homepage.jsx'
import SomeThingWentWrong from './pages/SomeThingWentWrong/SomeThingWentWrong.jsx';
import ProductInfo from './components/ProductInfo/ProductInfo.jsx';
import Cart from './components/Cart/Cart.jsx';
import AllProduct from './components/AllProduct/AllProduct.jsx';
import Login from './pages/Registration/Login.jsx';
import Signup from './pages/Registration/Signup.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import UpdateProduct from './pages/Admin/UpdateProduct.jsx';
import AddProductPage from './pages/Admin/AddProduct.jsx';
import { RouteForAdmin } from './Route/RouteForAdmin.jsx';
import { RouteForUser } from './Route/RouteForUser.jsx';
import CategoryPage from './pages/Category/CategoryPage.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/Store.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage />} />
      <Route path='/*' element={<SomeThingWentWrong />} />
      <Route path='/productinfo/:id' element={<ProductInfo />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path='/allproduct' element={<AllProduct />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Category/:Categoryname' element={<CategoryPage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/user-dashboard' element={
        <RouteForUser>
          <UserDashboard />
        </RouteForUser>} />
      <Route path='/admin-dashboard' element={
        <RouteForAdmin>
          <AdminDashboard />
        </RouteForAdmin>} />
      <Route path="/addproduct" element={
        <RouteForAdmin>
          <AddProductPage />
        </RouteForAdmin>} />
      <Route path="/updateproduct/:id" element={
        <RouteForAdmin>
          <UpdateProduct />
        </RouteForAdmin>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
    </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
