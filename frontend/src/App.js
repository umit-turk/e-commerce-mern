import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import { profile } from "./redux/userSlice";
import {useDispatch, useSelector} from 'react-redux';
import Profile from "./pages/Profile";

function App() {
  const {user} = useSelector(state => state.user);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(profile());
  },[dispacth])


  return (
    <Router>
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<Detail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
