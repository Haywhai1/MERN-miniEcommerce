import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import AdminRoute from "./components/ProtectedRoute.jsx";

import ProductForm from "./pages/product/ProductForm.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister/>} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/checkout" element={<CheckoutPage />} /> 

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Admin Protected Routes (nested) */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="create-product" element={<ProductForm />} />
            <Route path="/admin/edit-product/:id" element={<ProductForm />} />
            <Route index element={<Navigate to="dashboard" replace />} /> {/* /admin → /admin/dashboard */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
