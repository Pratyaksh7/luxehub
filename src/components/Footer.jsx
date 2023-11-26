const Footer = () => {
  return (
    <div className="bg-black/95 text-white">
      <div className="flex justify-center gap-60 py-16">
        <div className="exclusive flex flex-col gap-4">
          <h3 className="text-xl font-medium">Exclusive</h3>
          <p className="text-lg font-normal">Subscribe</p>
          <p className="text-sm font-light">Get 10% off your first order</p>
        </div>
        <div className="support flex flex-col gap-4">
          <h3 className="font-medium">Support</h3>
          <p className="text-sm font-light">Udhampur, J&K, India.</p>
          <p className="text-sm font-light">exclusive@gmail.com</p>
          <p className="text-sm font-light">+88015-88888-9999</p>
        </div>
        <div className="Account flex flex-col gap-4">
          <h3 className="font-medium">Account</h3>
          <p className="text-sm font-light">My Account</p>
          <p className="text-sm font-light">Login / Register</p>
          <p className="text-sm font-light">Cart</p>
          <p className="text-sm font-light">Wishlist</p>
          <p className="text-sm font-light">Shop</p>
        </div>
        <div className="Quick Link flex flex-col gap-4">
          <h3 className="font-medium">Quick Link</h3>
          <p className="text-sm font-light">Privacy Policy</p>
          <p className="text-sm font-light">Terms Of Use</p>
          <p className="text-sm font-light">FAQ</p>
          <p className="text-sm font-light">Contact</p>
        </div>
      </div>
      <div className="border-t-2 border-gray-700/30 p-3 flex justify-center items-center">
        <p className="text-sm font-light text-gray-500">&copy; Copyright Rimel 2022. All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
