import './App.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import "./pages/Home"
import "./index.css";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index';
import Navbar from "./components/common/Navbar"


const store = configureStore({
  reducer: rootReducer
});


function App() {
  return (

    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">


      {/* go upward arrow */}

      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
