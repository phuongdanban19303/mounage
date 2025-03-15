import { Route, Routes } from "react-router-dom";
import "./App.css";
import Listprdprovider from "./context/ListprdContext";
import Categories from "./page/Categories";
import Customers from "./page/Customers";
import Dashboar from "./page/Dashboar";
import Login from "./page/Login";
import Orders from "./page/Orders";
import Products from "./page/Products";
import UserRoles from "./page/UserRoles";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Listprdprovider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={<ProtectedRoute element={<Dashboar />} />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={<Orders />} />}
            />
            <Route
              path="/customers"
              element={<ProtectedRoute element={<Customers />} />}
            />
            <Route
              path="/products"
              element={<ProtectedRoute element={<Products />} />}
            />
            <Route
              path="/categories"
              element={<ProtectedRoute element={<Categories />} />}
            />
            <Route
              path="/roles"
              element={<ProtectedRoute element={<UserRoles />} />}
            />
          </Routes>
        </Listprdprovider>
      </AuthProvider>
    </>
  );
}

export default App;
