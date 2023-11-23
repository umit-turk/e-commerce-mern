import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { getKeyword } from "../redux/generalSlice";
const Header = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const menuItems = [
        {
            name: "Profil",
            url: "/profile"
        },
        {
            name: "Admin",
            url: "/admin"
        },
        {
            name: "Çıkış",
            url: "/logout"
        },
    ]

    const keywordFunc = () => {
        if(!keyword) return
        dispatch(getKeyword(keyword));
        setKeyword("");
        navigate("/products");
    }

    return (
        <div className="bg-gray-100 h-16 px-5 flex justify-between items-center">
            <div onClick={() => navigate("/")} className="text-3xl cursor-pointer">e.com</div>
            <div className="flex items-center gap-5">
                <div className="flex items-center">
                <input value={keyword} onChange={e => setKeyword(e.target.value)} className="p-2 outline-none" type="text" placeholder="Arama yap" />
                <div onClick={keywordFunc} className="p-2 ml-1 bg-white cursor-pointer">Ara</div>
                </div>
                <div className="relative">
                    <img onClick={() => setOpenMenu(!openMenu)} className="w-8 h-8 rounded-full cursor-pointer" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHZh0aF5Og2DF4G19yPVx_QGjXfaBByFZA&usqp=CAU" alt="" />
                 {openMenu &&  <div className="absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-100">
                        {menuItems.map((item, i) => (
                            <div className="px-2 py-1 cursor-pointer hover:bg-gray-100" key={i}>{item.name}</div>
                        ))}
                    </div>}
                </div>
                <div className="relative">
                <SlBasket size={30} />
                <div className="absolute -top-2 -righ-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">4</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
