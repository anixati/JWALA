import React from 'react';
import { AuthProvider } from './core/providers';
import { AppRoutes } from './pages/routes';
import {  BrowserRouter as Router} from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
export default App;