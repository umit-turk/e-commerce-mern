import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../redux/userSlice";

const Login = () => {
  const {user, isAuth} = useSelector(state => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" });
  const [preview, setPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHZh0aF5Og2DF4G19yPVx_QGjXfaBByFZA&usqp=CAU"
  );
  
  const loginFunc = () => {
    dispatch(login(data))
  };

  const handleChange = (e) => {
    setData(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  useEffect(() => {
    if(isAuth){
      navigate("/")
    }
  },[isAuth])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3 border p-4 rounded-md">
        <div className="text-2xl">Giriş Yap</div>
        <Input onChange={handleChange} type={"text"} name={"email"} placeholder={"Email"} />
        <Input onChange={handleChange} type={"password"} name={"password"} placeholder={"Şifre"} />
        <div className="pb-2 text-red-500 cursor-pointer underline" onClick={() => navigate("/register")}>Kayıt Ol</div>
        <Button text={"Giriş Yap"} onClick={loginFunc} />
      </div>
    </div>
  );
};

export default Login;
