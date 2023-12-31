import Image1 from "../../assets/images/gamepad.png";
import Image2 from "../../assets/images/672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat 1.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Divider } from "antd";

const Checkout = () => {
  return (
    <>
      <Navbar />
      <Divider />
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
                <input className="bg-gray-100 p-2 outline-none" required />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">Company Name </label>
                <input className="bg-gray-100 p-2 outline-none" />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  {" "}
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input className="bg-gray-100 p-2 outline-none" required />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Apartment, floor, etc. (optional){" "}
                </label>
                <input className="bg-gray-100 p-2 outline-none" />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Town/City <span className="text-red-500">*</span>
                </label>
                <input className="bg-gray-100 p-2 outline-none" required />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input className="bg-gray-100 p-2 outline-none" required />
              </div>

              <div className="field flex flex-col gap-2 my-4">
                <label className="text-gray-500 text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input className="bg-gray-100 p-2 outline-none" required />
              </div>

              <div className="checkbox flex items-center gap-3">
                <input type="checkbox" className="accent-red-500 w-4 h-4" />
                Save this information for faster check-out next time
              </div>
            </form>
          </div>
          <div className="place-order-section mt-10 flex-2 max-w-md md:max-w-lg p-4 md:p-8 mx-auto flex flex-col md:justify-center gap-3 md:gap-6">
            <div className="item flex gap-4 items-center justify-between">
              <div className="name flex gap-5 items-center">
                <img className="h-10 w-10" src={Image1} alt="" />
                <p className="text-sm font-normal">LCD Monitor</p>
              </div>
              <div className="price">
                <p className="float-right">$650</p>
              </div>
            </div>

            <div className="item flex gap-4 items-center justify-between">
              <div className="name flex gap-5 items-center">
                <img className="h-10 w-10" src={Image2} alt="" />
                <p className="text-sm font-normal">Hoodie</p>
              </div>
              <div className="price">
                <p className="float-right">$1100</p>
              </div>
            </div>

            <div className="py-2 flex justify-between border-b-2 border-black/50">
              <span>Subtotal:</span>
              <span>$1750</span>
            </div>

            <div className="py-2 flex justify-between border-b-2 border-black/50">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Total:</span>
              <span>$1750</span>
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

            <button className="bg-red-500/90 w-fit text-white py-2 px-4 md:px-8 rounded-sm border border-black/20">
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
