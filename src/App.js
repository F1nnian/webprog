import './App.css';
import Navigation from './components/Navigation';
import MainRoutes from './components/MainRoutes';
import { BrowserRouter as Router } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation />
        </header>
        <main>
          <MainRoutes />
        </main>
      </div>
    </Router>

  );
}

export default App;
