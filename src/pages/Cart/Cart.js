import { Divider, Table } from "antd";
import Image1 from "../../assets/images/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png";
import Image2 from "../../assets/images/gamepad.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteFromCart,
  fetchCartItems,
  fetchCartTotalPrice,
  updateCartItemQuantity,
  updateItemQtyInCart,
} from "../../features/carts/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const usercart = useSelector((state) => state.carts);
  const { userData } = useSelector((state) => state.auth);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    dispatch(fetchCartItems(userData?._id));
    dispatch(fetchCartTotalPrice(userData?._id));

    if (Array.isArray(usercart?.cartData)) {
      setCartData(usercart?.cartData);
    } else {
      setCartData([]);
    }
  }, [dispatch]);

  const handleQuantityChange = (dataObject, newQuantity) => {
    // Update the local state
    setCartData((prevCartData) => {
      return prevCartData?.map((item) => {
        if (item._id === dataObject._id) {
          return {
            ...item,
            quantity: parseInt(newQuantity) < 0 ? 0 : parseInt(newQuantity, 10), // Ensure it's a valid number
          };
        }
        return item;
      });
    });

    // Dispatch the updated quantity to the Redux store
    dispatch(
      updateCartItemQuantity({
        userId: userData?._id,
        productId: dataObject._id,
        quantity: parseInt(newQuantity) < 0 ? 0 : parseInt(newQuantity, 10),
      })
    );
  };

  const handleUpdateCart = async (e) => {
    e.preventDefault();
    if (usercart?.cartData) {
      const data = {
        userId: userData?._id,
        productData: usercart?.cartData?.map((cartItem) => {
          return {
            productId: cartItem._id,
            quantity: cartItem.quantity,
          };
        }),
      };
      await dispatch(updateItemQtyInCart(data));
      await dispatch(fetchCartItems(userData?._id));
      await dispatch(fetchCartTotalPrice(userData?._id));
      if (usercart?.error) {
        toast.error(usercart?.message);
      } else if (usercart?.rqstStatus === "ok") {
        toast.success(usercart?.message);
      }
    } else {
      // do noting
    }
  };

  const handleDeleteFromCart = async (e, id) => {
    e.preventDefault();
    if (id !== "") {
      const data = {
        userId: userData?._id,
        productId: id,
      };
      await dispatch(deleteFromCart(data));
      await dispatch(fetchCartItems(userData?._id));
      await dispatch(fetchCartTotalPrice(userData?._id));
      setCartData((prevCartData) =>
        prevCartData.filter((item) => item._id !== id)
      );
      setTimeout(() => {
        if (usercart?.error) {
          toast.error(usercart?.message);
        } else if (usercart?.rqstStatus === "ok") {
          toast.success(usercart?.message);
        }
      }, 2000);
    } else {
      // do noting
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      width: 400,
      render: (x, dataObject) => {
        return (
          <div className="flex items-center gap-5 p-3">
            <img
              src={dataObject?.images[0]}
              alt={dataObject?.name}
              className="h-[50px]"
            />
            <p>{dataObject?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (x, dataObject) => {
        return (
          <div className="">
            <input
              type="number"
              className="w-[55px] border  border-slate-400 outline-none cursor-none px-2 py-1 rounded-md"
              value={dataObject?.quantity}
              onChange={(e) => handleQuantityChange(dataObject, e.target.value)}
            />
          </div>
        );
      },
    },
    {
      title: "SubTotal",
      dataIndex: "subtotal",
      render: (x, dataObject) => {
        return <p>₹ {(dataObject?.price * dataObject?.quantity).toFixed(2)}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (x, dataObject) => {
        console.log({ x, dataObject });
        return (
          <>
            <Trash2
              className="text-red-500 cursor-pointer"
              onClick={(e) => handleDeleteFromCart(e, dataObject?._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-5 md:w-[80%] md:mx-auto">
        <div className="hamburger text-sm md:my-16 my-8">
          <span className="text-gray-500">Home / </span> Cart
        </div>
        <Table
          columns={columns}
          dataSource={cartData && cartData}
          pagination={cartData?.length > 10}
        />
        <div className="buttons py-5 flex justify-between items-center">
          <button className=" py-3 px-8 rounded-sm border border-black/20">
            Return To Shop
          </button>
          <button
            className=" py-3 px-8 rounded-sm border border-black/20"
            onClick={handleUpdateCart}
          >
            Update Cart
          </button>
        </div>

        <div className="totalCart flex flex-col md:flex-row md:justify-between my-8 md:my-16 ">
          <div className="coupon flex justify-start items-start gap-5 pt-2">
            <input
              type="text"
              className="border border-black/50 outline-none px-2 py-2 rounded-sm flex-1"
              placeholder="Coupon Code"
            />
            <button className="bg-red-500/90 text-white py-2 px-8 rounded-sm border border-black/20">
              Apply Coupon
            </button>
          </div>
          <div className="cart-total flex flex-col border mt-5 md:mt-0 border-black md:w-2/5 py-10 px-5">
            <div>
              <h3 className="text-2xl font-medium mb-5">Cart Total</h3>
              <div className="py-3 flex justify-between border-b-2 border-black/50">
                <span>Subtotal:</span>
                <span>₹ {usercart?.cartTotalPrice}</span>
              </div>
              <div className="py-3 flex justify-between border-b-2 border-black/50">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Total:</span>
                <span>₹ {usercart?.cartTotalPrice}</span>
              </div>
              <center>
                <Link to="/checkout">
                  <button className="bg-red-500/90 text-white py-2 px-8 mx-auto rounded-sm border border-black/20">
                    Proceed to checkout
                  </button>
                </Link>
              </center>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
