import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCoursePage from './pages/CreateCoursePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CreateCoursePage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
