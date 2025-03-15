import './App.css';
import {
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
