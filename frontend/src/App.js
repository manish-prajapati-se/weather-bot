import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './components/common/Header';
import ConfigureBot from './pages/ConfigurePage';
import { useEffect } from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Users from './pages/UsersPage';
function App() {
  useEffect(()=>{
    if(localStorage.getItem('token')){
      
    }
  },[])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/configure" element={<ProtectedRoute><ConfigureBot/></ProtectedRoute>}/>
        <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
