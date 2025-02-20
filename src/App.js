import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './components/Weather';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

const App = () => {
  const [mainClass, setMainClass] = useState('');

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark mb-3">
          <div className="container nabab-menu">
            <Link className="navbar-brand" to="/">🌤 Hava Durumu</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Anasayfa</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">Hakkında</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className={`flex-grow-1 d-flex align-items-center justify-content-center px-3 ${mainClass}`}>
          <Routes>
            <Route path="/" element={<Weather setMainClass={setMainClass} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-light text-center py-3 mt-auto">
          <div className="container">
            <span className="text-muted">© 2025 Hava Durumu Uygulaması - Furkan KAN</span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;