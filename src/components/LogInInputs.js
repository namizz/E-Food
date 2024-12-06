const Input = (props) => {
  return (
    <input
      placeholder={`${props.msg || "(e.g 0991065050)"} `}
      className="bg-transparent border-b-2 border-[#ebf1f0] placeholder-[#000] text-[#000000] font-semibold text-[1em] placeholder-opacity-60 rounded-lg py-2 px-6 w-80 mb-4 focus:outline-none focus:border-[#ffd689] focus:text-lg transition-all hover:bg-[#ffffff1e]"
      type={props.type || "text"}
      name={props.name} // Added name to associate the input with the state
      value={props.value} // Value binding for controlled input
      onChange={props.onChange} // Handle change for both inputs
    />
  );
};
export default Input;
