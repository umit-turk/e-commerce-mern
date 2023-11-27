import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { register } from "../redux/userSlice";

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHZh0aF5Og2DF4G19yPVx_QGjXfaBByFZA&usqp=CAU"
  );
  const handleChange = (e) => {
    if(e.target.name === "avatar"){
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2){
          setData(prev => ({...prev, avatar: reader.result}));
          setPreview(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }else{
      setData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
  }
  const registerFunc = () => {
    dispatch(register(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3 border p-4 rounded-md">
        <div className="text-2xl">Kayıt Ol</div>
        <Input onChange={handleChange} value={data.name} type={"text"} name={"name"} placeholder={"Ad"} />
        <Input onChange={handleChange} value={data.email} type={"text"} name={"email"} placeholder={"Email"} />
        <Input onChange={handleChange} value={data.password} type={"password"} name={"password"} placeholder={"Şifre"} />
        <div className="flex items-center gap-2">
          <img className="w-10 h-10 rounded-full" src={preview} alt="" />
          <Input onChange={handleChange} type={"file"} name={"avatar"} placeholder={""} />
        </div>
        <div className="pb-2 text-red-500 cursor-pointer underline"  onClick={()=> navigate("/login")}>Giriş Yap</div>
        <Button text={"Kayıt Ol"} onClick={registerFunc} />
      </div>
    </div>
  );
};

export default Register;
