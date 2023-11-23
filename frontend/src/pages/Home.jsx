import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import banner from "../images/trendyol-indirim.webp"
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div>
        <img className="w-full" src={banner} alt="" />
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div>
          {products?.products && (
            <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
              {products?.products?.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
