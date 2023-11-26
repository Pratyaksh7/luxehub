const ServiceCard = ({ image, heading, text }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src={image} alt="" />
      <center>
        <h2 className="font-medium">{heading}</h2>
        <p><small>{text}</small></p>
      </center>
    </div>
  );
};

export default ServiceCard;
