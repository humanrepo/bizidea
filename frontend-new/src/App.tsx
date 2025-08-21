import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHomePage from "./pages/NewHomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import IdeaGeneratorPage from "./pages/IdeaGeneratorPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/idea-generator" element={<IdeaGeneratorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
