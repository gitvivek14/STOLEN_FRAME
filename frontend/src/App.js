
import './App.css';
import { Route,Routes, useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {

    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  return (
    
    <GoogleOAuthProvider clientId='218213012749-o72d5ktdnkg333unlcvlo2e77aisuno1.apps.googleusercontent.com'>
     
      <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<Home/>}/>
   </Routes>
    
     
    </GoogleOAuthProvider>
    
   
  );
}

export default App;
