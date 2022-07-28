import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Dashbord from './Components/Pages/Dashbord/Dashbord';
import Footer from './Components/Shared/Footer/Footer';
import AddProducts from './Components/Pages/Dashbord/AddProducts/AddProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './Components/Hooks/RequireAuth';
import MyProfile from './Components/Pages/Dashbord/MyProfile/MyProfile';
import MyOrders from './Components/Pages/Dashbord/MyOrders/MyOrders';
import ManageOrders from './Components/Pages/Dashbord/ManageOrders/ManageOrders';
import AllUsers from './Components/Pages/Dashbord/AllUsers/AllUsers';
import ManageProducts from './Components/Pages/Dashbord/ManageProducts/ManageProducts';
import AddReview from './Components/Pages/Dashbord/AddReview/AddReview';
import ManageReview from './Components/Pages/Dashbord/ManageReview/ManageReview';
import NotFound from './Components/Shared/NotFound/NotFound';
import Payment from './Components/Pages/Dashbord/Payment/Payment';
import RequireUser from './Components/Hooks/RequireUser';
import UpdateProduct from './Components/Pages/Dashbord/UpdateProduct/UpdateProduct'
import Header from './Components/Shared/Header/Header';
import PurchasParts from './Components/Pages/Home/PurchasParts/PurchasParts';
import Signup from './Components/Login/SignUp/Signup';
import SignIn from './Components/Login/SignIn/SignIn';
import RequireAdmin from './Components/Hooks/RequireAdmin';

function App() {
  return (
    <div >
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <PurchasParts />
          </RequireAuth>


        }></Route>

        <Route path='/dashbord' element={
          <RequireAuth>
            <Dashbord />
          </RequireAuth>
        }>

          <Route index element={<MyProfile />}></Route>
          <Route path='payment/:orderid' element={<Payment />} />
          <Route path='addproducts' element={
            <RequireAdmin>
              <AddProducts />
            </RequireAdmin>
          }></Route>



          <Route path='updateproducts/:productId' element={
            <RequireAdmin>
              <UpdateProduct />
            </RequireAdmin>
          }></Route>


          <Route path='myprofile' element={<MyProfile />}></Route>
          <Route path='myorders' element={
            <RequireUser>
              <MyOrders />
            </RequireUser>
          }></Route>


          <Route path='addreview' element={
            <RequireUser>
              <AddReview />
            </RequireUser>
          }></Route>

          <Route path='manageAllorders' element={
            <RequireAdmin>
              <ManageOrders />
            </RequireAdmin>
          }></Route>
          <Route path='makeAdmin' element={
            <RequireAdmin>
              <AllUsers />
            </RequireAdmin>
          }></Route>
          <Route path='manageProducts' element={
            <RequireAdmin>
              <ManageProducts />
            </RequireAdmin>
          }></Route>
          <Route path='manageReview' element={
            <RequireAdmin>
              <ManageReview />
            </RequireAdmin>
          }></Route>
        </Route>
        <Route path='/singin' element={<SignIn />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='*' element={<NotFound />}></Route>

      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
