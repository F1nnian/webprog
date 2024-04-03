import './App.css';
import Navigation from './components/Navigation';
import MainRoutes from './components/MainRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </header>
        <main>
          <MainRoutes />
        </main>
      </div>
    </Router>

  );
}

export default App;
