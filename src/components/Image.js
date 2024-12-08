import React from "react";
const Image = () => {
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileSelect = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };
  return (
    <div className="p-[0.7em]  mt-0 mb-0 mr-12 ml-10" onClick={handleClick}>
      <div className="text-sm text-gray-700 font-[600]">Upload image here</div>
      <img
        src="https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg"
        alt="upload"
        className="w-20 ml-6"
      />

      <input
        id="file"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Image;
