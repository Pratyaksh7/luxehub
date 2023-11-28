import { Table } from "antd";
import Image1 from "../../assets/images/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png";
import Image2 from "../../assets/images/gamepad.png";
import Footer from "../../components/Footer";
const columns = [
  {
    title: "Product",
    dataIndex: "product",
    width: 400,
    render: (x, dataObject) => {
      return (
        <div className="flex items-center gap-5 p-3">
          <img src={dataObject?.product_image} alt="" className="h-[50px]" />
          <p>{dataObject?.product_name}</p>
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
    render: () => {
      return (
        <div className="">
          <input
            type="number"
            className="w-[55px] border  border-slate-400 outline-none cursor-none px-2 py-1 rounded-md"
            defaultValue={"1"}
          />
        </div>
      );
    },
  },
  {
    title: "SubTotal",
    dataIndex: "subtotal",
  },
];

const data = [
  {
    key: "1",
    product_name: "Hand Bag",
    product_image: Image1,
    price: "$650",
    quantity: "01",
    subtotal: "$650",
  },
  {
    key: "2",
    product_name: "H1 Gamepad",
    product_image: Image2,
    price: "$550",
    quantity: "02",
    subtotal: "$1100",
  },
];

const Cart = () => {
  return (
    <>
      <div className="p-5 w-[80%] mx-auto">
        <div className="hamburger text-sm my-16">
          <span className="text-gray-500">Home / </span> Cart
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={data.length > 10}
        />
        <div className="buttons py-5 flex justify-between items-center">
          <button className=" py-3 px-8 rounded-sm border border-black/20">
            Return To Shop
          </button>
          <button className=" py-3 px-8 rounded-sm border border-black/20">
            Update Cart
          </button>
        </div>

        <div className="totalCart flex justify-between my-16">
          <div className="coupon flex justify-start items-start gap-5 w-1/2">
            <input
              type="text"
              className="border border-black/50 outline-none px-2 py-2 rounded-sm"
              placeholder="Coupon Code"
            />
            <button className="bg-red-500/90 text-white py-2 px-8 rounded-sm border border-black/20">
              Apply Coupon
            </button>
          </div>
          <div className="cart-total flex flex-col border border-black w-2/5 py-10 px-5">
            <div>
              <h3 className="text-2xl font-medium mb-5">Cart Total</h3>
              <div className="py-3 flex justify-between border-b-2 border-black/50">
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
              <div className="py-3 flex justify-between border-b-2 border-black/50">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Total:</span>
                <span>$1750</span>
              </div>
              <center>
                <button className="bg-red-500/90 text-white py-2 px-8 mx-auto rounded-sm border border-black/20">
                  Proceed to checkout
                </button>
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
