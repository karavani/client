import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Spot from './pages/Spot';
import AddReview from './pages/AddReview';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/spot/:id" element={<Spot />} />
          <Route path="/add-review/:id" element={<AddReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
