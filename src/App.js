import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home/Home';
import Footer from './Components/Shared/Footer/Footer';
import Header from './Components/Shared/Header/Header';
import NotFound from './Components/Shared/NotFound/NotFound';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='./' element={<Home />}></Route>

        <Route path='*' element={<NotFound />} ></Route>
      </Routes>

      <Footer />


    </div>
  );
}

export default App;
