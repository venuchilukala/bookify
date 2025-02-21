import { Route, Routes } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// Pages
import LoginPage from './pages/Login';
import Home from './pages/Home';
import RegisterPage from './pages/Register';
import NavHeader from './components/Navbar';
import ListingPage from './pages/List';

function App() {
  return (
    <>
      <NavHeader />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/book/list' element={<ListingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
