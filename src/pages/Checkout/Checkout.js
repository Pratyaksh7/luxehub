import Image1 from "../../assets/images/gamepad.png";
import Image2 from "../../assets/images/672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat 1.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  fetchCartTotalPrice,
} from "../../features/carts/cartSlice";
import { placeOrder } from "../../features/orders/orderSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    first_name: "",
    email: "",
    phone: "",
    street_address: "",
    apartment: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isDetailsEmpty, setIsDetailsEmpty] = useState(false);

  const { userData } = useSelector((state) => state.auth);
  const usercart = useSelector((state) => state.carts);
  const [cartData, setCartData] = useState([]);
  const { error, loading, message, rqstStatus } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchCartItems(userData?._id));
    dispatch(fetchCartTotalPrice(userData?._id));

    setCartData(usercart?.cartData);
  }, [dispatch]);
  console.log({ cartData });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsDetailsEmpty(
      Object.values(billingDetails).some((value) => value === "")
    );

    if (!isDetailsEmpty) {
      try {
        const data = {
          userId: userData?._id,
          orderDetails: {
            items: cartData?.map((item) => {
              return { productId: item?._id, quantity: item?.quantity };
            }),
            shipping_address: {
              street: billingDetails?.street_address,
              city: billingDetails?.apartment,
              state: billingDetails?.state,
              zip: billingDetails?.zip,
              country: billingDetails?.country,
            },
            contact_details: {
              email: billingDetails?.email,
              phone: billingDetails?.phone,
            },
            total_price: parseFloat(usercart?.cartTotalPrice),
            first_name: billingDetails?.first_name,
          },
        };
        await dispatch(placeOrder(data));
        if (error) {
          toast.error(message);
        } else if (rqstStatus === "ok") {
          toast.success(message);
          navigate("/");
        }
      } catch (error) {
        console.error("Error during Placing error:", error);
      }
    } else {
      toast.error("All fields are required");
    }
  };

  const handleNewPlaceOrder = async (e) => {
    e.preventDefault();
    setIsDetailsEmpty(
      Object.values(billingDetails).some((value) => value === "")
    );

    if (!isDetailsEmpty) {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:5000/payments/getkey");
      const data = {
        userId: userData,
        orderDetails: {
          items: cartData?.map((item) => {
            return { productId: item?._id, quantity: item?.quantity };
          }),
          shipping_address: {
            street: billingDetails?.street_address,
            city: billingDetails?.apartment,
            state: billingDetails?.state,
            zip: billingDetails?.zip,
            country: billingDetails?.country,
          },
          contact_details: {
            email: billingDetails?.email,
            phone: billingDetails?.phone,
          },
          total_price: parseFloat(usercart?.cartTotalPrice),
          first_name: billingDetails?.first_name,
        },
      };
      console.log("1")
      const {
        data: { success, order },
      } = await axios.post("http://localhost:5000/payments/checkout", {
        amount: parseFloat(usercart?.cartTotalPrice),
        checkoutData: data,
      });
      console.log({success, order})
      if (success === false && order === null) {
        toast.error("Something is not right!.");
        return;
      }
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Luxehub",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/53914703?v=4",
        order_id: order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:5000/payments/paymentverification",
        redirect: true,
        prefill: {
          name: billingDetails?.first_name, // Info of loggedIn user
          email: billingDetails?.email,
          contact: billingDetails?.phone,
        },
        notes: data,
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {

      console.error("Error during Placing error:", error);
    }
    } else {
      toast.error("All fields are required");
    }
  };
  return (
    <>
      <div className="p-5 pt-0 w-full md:w-[80%] md:mx-auto mb-10 md:mb-20">
        <div className="hamburger text-sm my-8 md:my-16 mx-14 md:mx-20">
          <span className="text-gray-500">
            Account / My Account / Product / View Cart /
          </span>{" "}
          CheckOut
        </div>
        <div className="data md:flex flex flex-col md:flex-row px-4 md:px-10">
          <div className="billing-form flex-2 md:pr-10 px-10">
            <h2 className="text-xl md:text-3xl font-medium mb-5 md:mb-10">
              Billing Details
            </h2>
            <form className="w-full md:max-w-md ">
              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-gray-100 p-2 outline-none"
                  required
                  value={billingDetails?.first_name}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      first_name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  {" "}
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  value={billingDetails?.street_address}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      street_address: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                  required
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Apartment, floor, city etc.{" "}
                </label>
                <input
                  value={billingDetails?.apartment}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      apartment: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  value={billingDetails?.state}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      state: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                  required
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Zip <span className="text-red-500">*</span>
                </label>
                <input
                  value={billingDetails?.zip}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      zip: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                  required
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  value={billingDetails?.country}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      country: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                  required
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  value={billingDetails?.phone}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      phone: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                  required
                />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  value={billingDetails?.email}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      email: e.target.value,
                    })
                  }
                  className="bg-gray-100 p-2 outline-none"
                  required
                />
              </div>

              <div className="checkbox flex items-center gap-3">
                <input type="checkbox" className="accent-red-500 w-4 h-4" />
                Save this information for faster check-out next time
              </div>
            </form>
          </div>
          <div className="place-order-section mt-10 flex-2 max-w-md md:max-w-lg p-4 md:p-8 mx-auto flex flex-col md:justify-center gap-3 md:gap-6">
            {cartData?.length > 0 &&
              cartData?.map((cartItem) => (
                <div className="item flex gap-4 items-center justify-between">
                  <div className="name flex gap-5 items-center">
                    <img
                      className="h-10 w-10"
                      src={cartItem?.images[0]}
                      alt=""
                    />
                    <p className="text-sm font-normal">{cartItem?.name}</p>
                  </div>
                  <div className="price">
                    <p className="float-right">
                      ₹ {(cartItem?.price * cartItem?.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

            <div className="py-2 flex justify-between border-b-2 border-black/50">
              <span>Subtotal:</span>
              <span>₹ {usercart?.cartTotalPrice}</span>
            </div>

            <div className="py-2 flex justify-between border-b-2 border-black/50">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Total:</span>
              <span>₹ {usercart?.cartTotalPrice}</span>
            </div>

            <div className="radio flex items-center gap-3">
              <input type="radio" className="accent-black w-4 h-4" />
              Bank
            </div>

            <div className="radio flex items-center gap-3">
              <input type="radio" className="accent-black w-4 h-4" />
              Cash On Delivery
            </div>

            <div className="coupon flex justify-start md:items-start gap-3">
              <input
                type="text"
                className="border border-black/50 outline-none px-2 py-2 rounded-sm"
                placeholder="Coupon Code"
              />
              <button className="bg-red-500/90 w-fit text-white py-2 px-4 md:px-8  rounded-sm border border-black/20">
                Apply Coupon
              </button>
            </div>

            <button
              // onClick={handlePlaceOrder}
              onClick={handleNewPlaceOrder}
              className="bg-red-500/90 w-fit text-white py-2 px-4 md:px-8 rounded-sm border border-black/20"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
