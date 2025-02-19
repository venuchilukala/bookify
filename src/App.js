import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';


// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import RegisterPage from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
