import React from "react";
import { Link } from "react-router-dom";
import Star from "../assets/images/star.svg";
import { EyeIcon, HeartIcon, Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  addtocart,
  deleteFromWishlist,
  fetchCartItems,
  fetchWishlistItems,
} from "../features/carts/cartSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface Product {
  name: string;
  description: string;
  categories: string[];
  price: number;
  currencies: string[];
  stock_qty: number;
  manufacturer: string;
  images: string[];
  attributes: any[];
  tags: string[];
  rating: number;
  reviews: any[];
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  id: string;
  image: string;
  discount: number;
  name: string;
  discount_price: number;
  actual_price: number;
  section: string;
  rating: number;
}

interface ItemData {
  userId: string;
  id: string;
  name: string;
  description: string;
  categories: string[];
  price: number;
  currencies: string[];
  stock_qty: number;
  manufacturer: string;
  images: string[];
  attributes: any[];
  tags: string[];
  rating: number;
  reviews: any[];
  quantity: number;
}
interface DeleteWishlistData {
  userId: string;
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  id = "",
  image,
  discount,
  name,
  discount_price,
  actual_price,
  section = "",
  rating = 0,
}) => {
  const { userData } = useSelector((state) => state.auth);
  const { error, loading, message, rqstStatus } = useSelector(
    (state) => state.carts
  );
  const dispatch = useDispatch();
  const handleAddToCart = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (id !== "") {
      const data: ItemData = {
        userId: userData?._id,
        id,
        name: product?.name,
        description: product?.description,
        categories: product?.categories,
        price: actual_price,
        currencies: product?.currencies,
        stock_qty: product?.stock_qty,
        manufacturer: product?.manufacturer,
        images: product?.images,
        attributes: product?.attributes,
        tags: product?.tags,
        rating: product?.rating,
        reviews: product?.reviews,
        quantity: 1,
      };
      await dispatch(addtocart(data));
      await dispatch(fetchCartItems(userData?._id));
      if (error) {
        toast.error(message);
      } else if (rqstStatus === "ok") {
        toast.success(message);
      }
    } else {
      // do noting
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (id !== "") {
      const data: ItemData = {
        userId: userData?._id,
        id,
        name: product?.name,
        description: product?.description,
        categories: product?.categories,
        price: actual_price,
        currencies: product?.currencies,
        stock_qty: product?.stock_qty,
        manufacturer: product?.manufacturer,
        images: product?.images,
        attributes: product?.attributes,
        tags: product?.tags,
        rating: product?.rating,
        reviews: product?.reviews,
        quantity: 1,
      };
      await dispatch(addToWishlist(data));
      await dispatch(fetchWishlistItems(userData?._id));
      if (error) {
        toast.error(message);
      } else if (rqstStatus === "ok") {
        toast.success(message);
      }
    } else {
      // do noting
    }
  };

  
  const handleDeleteFromWishlist = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (id !== "") {
      const data: DeleteWishlistData = {
        userId: userData?._id,
        productId: id,
      };
      await dispatch(deleteFromWishlist(data));
      await dispatch(fetchWishlistItems(userData?._id));
      setTimeout(() => {
        if (error) {
          toast.error(message);
        } else if (rqstStatus === "ok") {
          toast.success(message);
        }
      }, 2000);
    } else {
      // do noting
    }
  };
  return (
    <div className="box max-w-sm w-[200px] md:max-w-md md:w-[300px] md:py-3 py-1 ">
      <div className="product-image-section mb-5 ">
        <div className="upper bg-gray-100 flex flex-col justify-center items-center object-contain rounded-lg relative group">
          <div className="image p-10 pt-20">
            <img src={image} alt={name} />
          </div>
          <div
            className={`add-to-cart ${section === "Wishlist" || section === "JustForYou"
                ? ""
                : "invisible group-hover:visible"
              } cursor-pointer animate-none bg-black text-white w-full font-medium text-md md:text-xl flex justify-center items-center rounded-b-lg px-auto py-2`}
            onClick={handleAddToCart}
          >
            Add To Cart
          </div>
          <div className="discount-percentage bg-red-500 px-2 md:px-4 py-1 font-light text-white rounded-md absolute top-2 md:top-5 left-2 md:left-3">
            {discount}
          </div>
          {section === "Wishlist" ? (
            <div
              className="fill-dustbin bg-white p-1 md:p-3 flex justify-center items-center rounded-full absolute top-2 right-2 md:top-5 md:right-3"
              onClick={handleDeleteFromWishlist}
            >
              <Trash2Icon />
            </div>
          ) : (
            <>
              {section === "JustForYou" ? (
                <div className="fill-eye bg-white p-1 md:p-3 flex justify-center items-center rounded-full absolute top-2 right-2 md:top-5 md:right-3">
                  <EyeIcon />
                </div>
              ) : (
                <>
                  <div
                    onClick={handleAddToWishlist}
                    className="fill-heart cursor-pointer bg-white p-1 md:p-3 flex justify-center items-center rounded-full absolute top-2 right-2 md:top-5 md:right-3"
                  >
                    <HeartIcon />
                  </div>
                  <div className="fill-eye bg-white p-1 md:p-3 flex justify-center items-center rounded-full absolute top-12 right-2 md:top-20 md:right-3">
                    <EyeIcon />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="product-info-section flex flex-col gap-1">
        <Link to={`/product-detail/${id}`}>
          <h3 className="font-medium text-md md:text-lg hover:text-blue-800/90">
            {name}
          </h3>
        </Link>

        <div className="price-section flex gap-5 font-medium text-lg">
          <h1 className="text-rose-500 sm:text-sm">${discount_price}</h1>
          <h1 className="text-slate-500 sm:text-sm">
            <del>${actual_price}</del>
          </h1>
        </div>
        <div>
          {section !== "Wishlist" && (
            <div className="stars flex font-medium">
              {Array.from({ length: rating }).map((_, i) => (
                <img key={i} src={Star} alt="" />
              ))}

              <span className="count pl-3 text-slate-500 ">(88)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
