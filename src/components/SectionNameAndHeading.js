const SectionNameAndHeading = ({name, heading}) => {
  return (
    <>
      <div className="l-left-upper flex gap-3 items-center">
        <div className="highlighter h-8 w-4 rounded bg-red-500" />
        <p className="text-xs text-red-500 font-semibold">{name}</p>
      </div>
      <div className="l-left-lower mt-5">
        <div className="bigHeading text-5xl w-full">{heading}</div>
      </div>
    </>
  );
};

export default SectionNameAndHeading;
