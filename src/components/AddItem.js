const Name = ({ props }) => {
  return (
    <p className="text-sm text-gray-700 font-[600]">
      {props.p}
      {props.display && <span className="text-red-500">*</span>}
    </p>
  );
};
const InputSection = ({ props }) => {
  return (
    <input
      className={` p-2.5 pb-3.5 pl-2 text-sm bg-transparent border-b border-gray-300 ${
        props.display && !props.value
          ? props.display !== "none"
            ? "border-red-600"
            : "border-red-800 border-opacity-20"
          : null
      }  text-card-blue focus:outline-none ${
        props.value && "focus:border-blue-500 "
      } `}
      type={props.type || "text"}
      //  id={`${props.name}Text`}
      name={props.name}
      value={props.value}
      onChange={props.change}
    />
  );
};
const ErrorMessage = ({ props }) => {
  return (
    <p
      style={{ display: (!props.value ? props.display : "none") || "none" }}
      className="text-xs text-red-500 mt-1"
    >
      ⚠️ Please enter {props.name}
    </p>
  );
};
const InputBox = (props) => {
  return (
    <div className="p-[0.7em] m inline-block mt-0 mb-0 mr-12 ml-8">
      <Name props={props} />
      <InputSection props={props} />
      {props.msg && props.msg !== "" && (
        <p className="text-xs text-red-500 mt-1">{props.msg}</p>
      )}
    </div>
  );
};

export default InputBox;
