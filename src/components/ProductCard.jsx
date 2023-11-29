import Star from "../assets/images/star.svg";
import { EyeIcon, HeartIcon, Trash2Icon } from "lucide-react";
const ProductCard = ({
  image,
  discount,
  name,
  discount_price,
  actual_price,
  section = "",
}) => {
  return (
    <div className="box max-w-md w-[300px] py-3">
      <div className="product-image-section mb-5">
        <div className="upper bg-gray-100 flex flex-col justify-center items-center object-contain rounded-lg relative group">
          <div className="image p-10 pt-20">
            <img src={image} alt="" />
          </div>
          <div
            className={`add-to-cart ${
              section === "Wishlist" || section === "JustForYou" ? "" : "invisible group-hover:visible"
            } cursor-pointer animate-none bg-black text-white w-full font-medium text-xl flex justify-center items-center rounded-b-lg px-auto py-2`}
          >
            Add To Cart
          </div>
          <div className="discount-percentage bg-red-500 px-4 py-1 font-light text-white rounded-md absolute top-5 left-3">
            {discount}
          </div>
          {section === "Wishlist" ? (
            <div className="fill-dustbin bg-white p-3 flex justify-center items-center rounded-full absolute top-5 right-3">
              <Trash2Icon />
            </div>
          ) : (
            <>
              {section === "JustForYou" ? (
                <div className="fill-eye bg-white p-3 flex justify-center items-center rounded-full absolute top-5 right-3">
                  <EyeIcon />
                </div>
              ) : (
                <>
                  <div className="fill-heart bg-white p-3 flex justify-center items-center rounded-full absolute top-5 right-3">
                    <HeartIcon />
                  </div>
                  <div className="fill-eye bg-white p-3 flex justify-center items-center rounded-full absolute top-20 right-3">
                    <EyeIcon />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="product-info-section flex flex-col gap-1">
        <h3 className="font-medium text-lg">{name}</h3>
        <div className="price-section flex gap-5 font-medium text-lg">
          <h1 className="text-rose-500">${discount_price}</h1>
          <h1 className="text-slate-500">
            <del>${actual_price}</del>
          </h1>
        </div>
        <div>
          {section !== "Wishlist" && (
            <div className="stars flex font-medium">
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <span className="count pl-3 text-slate-500 ">(88)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
