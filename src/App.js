import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoComponent from './components/TodoComponent';
import AboutComponent from './components/Abouit';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TodoComponent />} />
          <Route path="/about" element={<AboutComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
