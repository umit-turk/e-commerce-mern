import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../redux/productSlice";
import Slider from "react-slick";
import { MdOutlineStar } from "react-icons/md"
import Button from "../components/Button";
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);

  const addBasket = () => {
   
  }

  const increment = () => {
    if(quantity < product?.product?.stock){
        setQuantity(prev => prev + 1)
    }
  }
  const decrement = () => {
    if(quantity > 0){
        setQuantity(prev => prev - 1)
    }
  }

  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <div className="">
          <div className="flex mt-4 justify-center gap-5">
            {product?.product && (
              <div className="w-[500px]">
                <Slider {...settings}>
                  {product?.product?.images?.map((image, i) => (
                    <img key={i} src={image?.url} />
                  ))}
                </Slider>
              </div>
            )}
            <div className="space-y-3">
                <div className="text-3xl">{product?.product?.name}</div>
                <div className="text-xl">{product?.product?.description}</div>
               {product?.product?.stock ? <div className="text-xl">Stok sayısı: {product?.product?.stock}</div> : <div>Ürün stokta Kalmamıştır</div> }
               <div className="text-xl">Kategori : {product?.product?.category}</div>
               <div className="text-xl flex items-center gap-3">Rating : {product?.product?.rating} <MdOutlineStar /></div>
               <div className="flex items-center gap-4">
                <div onClick={decrement} className="text-3xl cursor-pointer">-</div>
                <div className="text-2-xl">{quantity}</div>
                <div onClick={increment} className="text-3xl cursor-pointer">+</div>
               </div>
               <Button text={'Sepete Ekle'} onClick={addBasket} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
