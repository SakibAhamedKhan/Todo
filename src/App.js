import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/LoginSignup/Login';
import Signup from './pages/LoginSignup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import RequireAuth from './pages/Shared/RequireAuth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }></Route>
        <Route path='/profile' element={
          <RequireAuth>
            <Profile></Profile>
          </RequireAuth>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
