import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const detailPage = () => {
    navigate(`/product/${product?._id}`);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div onClick={detailPage} className="w-[250px] bg-gray-100">
      <Slider {...settings}>
        {product?.images?.map((image, i) => (
          <img key={i} src={image?.url} />
        ))}
      </Slider>
      <div className="text-xl px-3">{product?.name}</div>
      <div className="text-2xl px-3">{product?.price} ₺</div>
    </div>
  );
};

export default ProductCard;
