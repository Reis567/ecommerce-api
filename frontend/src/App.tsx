import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      {location.pathname !== '/' && (
        <button className="back-button" onClick={handleBackClick}>Voltar</button>
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
