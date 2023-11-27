import Footer from "../../components/Footer";
import AuthImage from "../../assets/images/auth/Side Image.png";
import GoogleIcon from "../../assets/images/auth/Icon-Google.png";

const LoginPage = () => {
  return (
    <div>
      <div className="flex min-w-[50%] mx-auto  p-20 pl-0">
        <div className="image w-3/5">
          <img src={AuthImage} alt="" />
        </div>
        <div className="section w-2/5 flex justify-center items-center">
          <div className="content flex flex-col items-center pl-10 w-full ">
            <div className="text my-10">
              <h2 className="text-4xl">Log in to Exclusive</h2>
              <p className="text-sm py-3">Enter your details below</p>
            </div>
            <form className="flex flex-col w-full gap-4">
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="border-b-2 py-2 w-[55%] mx-auto outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-b-2 py-2 w-[55%] mx-auto outline-none"
              />
              <div className="buttons flex gap-10 mt-6 px-8 justify-evenly mx-auto">
                <button className="bg-red-500 py-3 px-8 rounded-md text-white">
                  Login
                </button>
                <p className="text-sm text-red-500 my-4">
                  <a href="">Forget Password?</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
