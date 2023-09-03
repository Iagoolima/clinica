// // AppRoute.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from '../../pages/login';
import Dashboard from '../../pages/dashboard';
import FichaPDF from '../../pages/fichaPDF/cadastroPDF';

// import NotFound from '../notFound';

// import AuthProvider from '../../components/login/authContext'; //importação que faz o contextApi com 


export default function AppRoute() {
  return (
    
      <Router>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ficha-pdf" element={<FichaPDF />} />

          {/* <Route path="*" element={<NotFound />} /> */}

        </Routes>

      </Router>

    
  );
}