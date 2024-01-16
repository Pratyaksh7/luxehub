import ProductCard from "../../components/ProductCard";
import GamePad from "../../assets/images/gamepad.png";
import Keyboard from "../../assets/images/ak-900-01-500x500 1.png";
import LCD from "../../assets/images/g27cq4-500x500 1.png";
import Chair from "../../assets/images/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png";
import SectionNameAndHeading from "../../components/SectionNameAndHeading";
import Game1 from "../../assets/images/productDetails/image 57.png";
import Game2 from "../../assets/images/productDetails/image 58.png";
import Game3 from "../../assets/images/productDetails/image 61.png";
import Game4 from "../../assets/images/productDetails/image 59.png";
import Game5 from "../../assets/images/productDetails/image 63.png";
import Star from "../../assets/images/star.svg";
import { Minus, Plus } from "lucide-react";
import Delivery from "../../assets/images/icon-delivery.png";
import Return from "../../assets/images/Icon-return.png";
import Footer from "../../components/Footer";
import MiniDeliveryComponent from "./components/MiniDeliveryComponent";
import Navbar from "../../components/Navbar";
import { Divider } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/products/productsSlice";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const SizeData = [
    { size: "XS", isActive: true },
    { size: "S", isActive: false },
    { size: "M", isActive: true },
    { size: "L", isActive: false },
    { size: "XL", isActive: false },
  ];
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { error, loading, productInfo, message } = useSelector(
    (state) => state.products
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="p-10 pt-0 flex-2 md:p-5 md:w-[90%] md:mx-auto mb-20 flex flex-col gap-20">
        <div className="hamburger text-sm my-1 md:my-5">
          <span className="text-gray-500">Account / Gaming /</span>{" "}
          {productInfo?.name}
        </div>

        <div class="flex flex-col md:flex md:flex-row gap-10 mb-10">
          <div class="col-1 flex-2 order-2 md:order-1 flex md:flex-col gap-3">
            {productInfo?.images?.map((image, i) => (
              <div
                className={`image bg-slate-100 w-[150px] h-auto p-4 cursor-pointer ${selectedImageIndex === i ? "border border-black":""}`}
                onClick={() => handleImageClick(i)}
              >
                <img key={i} src={image} alt={`Image ${i + 1}`} />
              </div>
            ))}

            {/* <div className="image bg-slate-100 w-[150px] h-auto p-4">
              <img src={Game2} alt="" />
            </div>

            <div className="image bg-slate-100 w-[150px] h-auto p-4">
              <img src={Game3} alt="" />
            </div>

            <div className="image bg-slate-100 w-[150px] h-auto p-4">
              <img src={Game4} alt="" />
            </div> */}
          </div>
          <div class="col-2 flex-1 order-1 md:order-2 bg-slate-100 flex justify-center items-center">
            {selectedImageIndex !== null && (
              <div className="image p-4">
                <img src={productInfo?.images && productInfo?.images[selectedImageIndex]} alt={`Selected Image ${selectedImageIndex + 1}`} />
              </div>
            )}
          </div>
          <div class="col-3 flex-1 order-3 p-4">
            <div className="name-price-desc border-b border-black pb-2 pr-5">
              <h1 className="text-3xl font-medium mb-2">{productInfo?.name}</h1>
              <div className="rating flex items-center gap-5 mb-2">
                <div className="stars flex font-medium">
                  {Array.from({ length: productInfo?.rating })?.map((_, i) => (
                    <img key={i} src={Star} alt="" />
                  ))}
                </div>
                <p className="count pl-3 text-slate-500 ">
                  ({productInfo?.reviews?.length || 0} Reviews)
                </p>
                {productInfo.stock_qty > 0 ? (
                  <p className="border-l pl-4 border-black text-green-400">
                    In Stock
                  </p>
                ) : (
                  <p className="border-l pl-4 border-black text-red-400">
                    Out of Stock
                  </p>
                )}
              </div>
              <h2 className="text-3xl font-light mb-2">
                {" "}
                ₹ {productInfo?.price}{" "}
              </h2>
              <p className="max-w-md leading-6 tracking-wider">
                {productInfo?.description}
              </p>
            </div>
            <div className="color-size-buynow flex flex-col gap-4 my-2">
              <div className="colors flex items-center w-fit">
                <h4 className="mr-2 text-xl">Colours:</h4>
                <div className="w-[15px] h-[15px] rounded-lg bg-red-500 mx-2 " />
                <div className="w-[15px] h-[15px] rounded-lg bg-blue-400 border border-black" />
              </div>

              <div className="size flex items-center w-fit gap-5">
                <h4 className="mr-2 text-xl">Size:</h4>

                {SizeData.map((size) => (
                  <div
                    className={`m flex-1 border ${
                      size.isActive
                        ? "border-red-600 bg-red-500 text-white"
                        : "border-black"
                    } px-3 py-2 rounded-md`}
                  >
                    {size.size}
                  </div>
                ))}
              </div>

              <div className="flex gap-5">
                <div className="flex">
                  <button
                    type="button"
                    className="inline-flex p-4 justify-center items-center gap-2 border border-black rounded-l-md"
                  >
                    <Minus />
                  </button>
                  <input
                    type="text"
                    defaultValue={"2"}
                    className="py-3 text-center font-normal text-xl flex justify-center items-center w-[100px] border-t-2 border-b-2 border-black"
                  />

                  <button
                    type="button"
                    className="inline-flex p-4 bg-red-500 text-white justify-center items-center gap-2 border border-red-600 rounded-r-md"
                  >
                    <Plus />
                  </button>
                </div>
                <button className="bg-red-500 w-fit font-normal text-lg text-white py-2 px-20 rounded-md border border-black/20">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="delivery border border-black rounded-md mt-6">
              <div className="upper p-4 border-b-2 border-black">
                <MiniDeliveryComponent
                  image={Delivery}
                  heading={"Free Delivery"}
                  para={"Enter your postal code for Delivery Availability"}
                />
              </div>
              <div className="lower p-4">
                <MiniDeliveryComponent
                  image={Return}
                  heading={"Return Delivery"}
                  para={"Free 30 Days Delivery Returns. Details"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="data">
          <div className="details flex items-center justify-evenly h-100">
            <div className="col-2 flex items-stretch bg-red-500 h-100"></div>
          </div>
          <div className="related-items">
            <div className="left w-1/2 flex-col gap-1">
              <SectionNameAndHeading name="Related Item" heading="" />
            </div>
            <div className="product-list px-2 md:px-5 flex gap-10 justify-evenly md:justify-start md:gap-5 flex-wrap">
              <ProductCard
                image={GamePad}
                discount="-40%"
                name="HAVIT HV-G92 Gamepad"
                discount_price="120"
                actual_price="160"
              />
              <ProductCard
                image={Keyboard}
                discount="-35%"
                name="AK-900 Wired Keyboard"
                discount_price="960"
                actual_price="1160"
              />
              <ProductCard
                image={LCD}
                discount="-30%"
                name="IPS LCD Gaming Monitor"
                discount_price="370"
                actual_price="400"
              />
              <ProductCard
                image={Chair}
                discount="-25%"
                name="S-Series Comfort Chair "
                discount_price="375"
                actual_price="400"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
