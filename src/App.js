import './App.css';
import Navigation from './components/Navigation';
import NavBar from './components/NavBar';
import MainRoutes from './components/MainRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


function decodeToken(token) {
  return jwtDecode(token);
}

function isTokenExpired(decoded) {
  try {
    if (!decoded || !decoded.exp) {
      return true;
    }
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return true;
  }
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      
      if (isTokenExpired(decodedToken)) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); 
  };
  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} onLogout={ handleLogout } position="sticky"/>
        <main>
          <MainRoutes onRegister={ handleLogin } onLogin={ handleLogin } isLoggedIn={ isLoggedIn }/>
        </main>
      </div>
    </Router>

  );
}

export default App;
