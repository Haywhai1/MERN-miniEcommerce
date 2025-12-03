import Navbar from "./Navbar";

const AdminNavbar = () => {
  return (
    <Navbar
      className="fixed top-0 left-0 w-full" 
      themeColor="green"
      loginPath="/admin/login"
      brand="miniEcommerce Admin"
    />
  );
};

export default AdminNavbar;
