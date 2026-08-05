import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <BrowserRouter>
      {admin && <Topbar />}

      <div className="container">
        {admin && <Sidebar />}
        <Routes>
          <Route path="/" element={admin ? <Home /> : <Login />} />
          {admin && (
            <>
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newProduct" element={<NewProduct />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
