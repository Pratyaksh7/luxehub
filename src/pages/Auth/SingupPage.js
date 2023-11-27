import Footer from "../../components/Footer";
import AuthImage from "../../assets/images/auth/Side Image.png";
import GoogleIcon from "../../assets/images/auth/Icon-Google.png";

const SingupPage = () => {
  return (
    <div>
      <div className="flex max-w-[90%] mr-auto  p-20 pl-0">
        <div className="image w-3/5">
          <img src={AuthImage} alt="" />
        </div>
        <div className="section w-2/5 flex pt-24">
          <div className="content flex flex-col items-center pl-10 w-full ">
            <div className="text my-10">
              <h2 className="text-4xl">Create an account</h2>
              <p className="text-sm py-3">Enter your details below</p>
            </div>
            <form className="flex flex-col w-full gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border-b-2 py-2 max-w-sm mx-auto outline-none"
              />
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="border-b-2 py-2 max-w-sm mx-auto outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-b-2 py-2  mx-auto outline-none"
              />
              <button className="bg-red-500 py-3 px-8 rounded-md text-white w-[50%] mx-auto">
                Create Account
              </button>
              <button className="py-3 px-8 rounded-md w-[50%] mb-4 mx-auto flex items-center justify-evenly border border-gray-500">
                <img src={GoogleIcon} alt="" />
                <span>Sign up with Google</span>
              </button>
            </form>
            <p className="text-sm text-gray-500 my-4">
              <span>Already have account?</span> &nbsp;&nbsp;
              <span className=" font-medium border-b-2 border-transparent hover:border-b-2 hover:border-slate-400">
                <a href="">Log in</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingupPage;
