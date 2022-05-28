import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddReview from './Components/Dashboard/AddReview/AddReview';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import MyOrders from './Components/Dashboard/MyOrders/MyOrders';
import MyProfile from './Components/Dashboard/MyProfile/MyProfile';
import Home from './Components/Home/Home/Home';
import RequireUser from './Components/Hooks/RequireUser/RequireUser';
import Blog from './Components/Pages/Blog/Blog';
import Portfolio from './Components/Pages/Portfolio/Portfolio';
import RequireAuth from './Components/Pages/RequireAuth/RequireAuth';
import SignIn from './Components/Pages/SignIn/SignIn';
import SignUp from './Components/Pages/SignUP/SignUp';
import Footer from './Components/Shared/Footer/Footer';
import Header from './Components/Shared/Header/Header';
import NotFound from './Components/Shared/NotFound/NotFound';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>}>
          <Route index element={<MyProfile />}></Route>
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
        </Route>

        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/portfolio' element={<Portfolio />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>

        <Route path='*' element={<NotFound />} ></Route>
      </Routes>

      <Footer />


    </div>
  );
}

export default App;
