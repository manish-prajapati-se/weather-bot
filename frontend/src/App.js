import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './components/common/Header';
import ConfigureBot from './pages/ConfigurePage';
import { useEffect } from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Subscribers from './pages/SubscribersPage';
function App() {
  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
      
  //   }
  // },[])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/configure" element={<ProtectedRoute><ConfigureBot/></ProtectedRoute>}/>
        <Route path="/subscribers" element={<ProtectedRoute><Subscribers/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
