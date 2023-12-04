import Footer from "../../components/Footer";
import AuthImage from "../../assets/images/auth/Side Image.png";
import GoogleIcon from "../../assets/images/auth/Icon-Google.png";

const LoginPage = () => {
  return (
    <div>
      <div className="md:w-[90%] px-2 mb-10 mx-auto flex md:flex-row flex-col">
        <div className="image flex-1 p-10 pb-0 md:w-3/5">
          <img src={AuthImage} alt="" />
        </div>
        <div className="section flex-1 md:w-2/5 flex pt-0 md:pt-24">
          <div className="content flex flex-col items-center md:pl-10 w-full ">
            <div className="text my-5 md:my-10 ">
              <h2 className="text-3xl md:text-4xl">Log in to Exclusive</h2>
              <p className="text-sm py-3">Enter your details below</p>
            </div>
            <form className="flex flex-col w-full gap-4">
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="border-b-2 py-2 max-w-md mx-20 md:max-w-sm md:mx-auto outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-b-2 py-2 max-w-md mx-20 md:max-w-sm md:mx-auto outline-none"
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
