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
    <div onClick={handleClick}>
      <img
        src="https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg"
        alt="upload"
        className="w-20"
      />
      <div>Click to upload image</div>

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
