import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import ReactPaginate from 'react-paginate';
const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({min:0, max:30000})
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState("")
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 2;
  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products.length / 2);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * 2) % products?.products.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(search({keyword, price, rating, category}));
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="">
      <div className="flex gap-3">
        <Filter setPrice={setPrice} setRating={setRating} setCategory={setCategory} />
        <div>
          {loading ? (
            "loading..."
          ) : (
            <div>
              {products?.products && (
                <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                  {currentItems?.map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  );
};

export default Products;
