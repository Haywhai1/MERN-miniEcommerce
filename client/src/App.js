import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

// Pages
import Home from "./pages/Home.jsx";

// User Auth
import UserLogin from "./pages/auth/UserLogin.jsx";
import UserRegister from "./pages/auth/UserRegister.jsx";

// Admin Auth
import AdminLogin from "./pages/auth/AdminLogin.jsx";
import AdminRegister from "./pages/auth/AdminRegister.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* User Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
