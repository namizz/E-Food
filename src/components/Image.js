import React from "react";

const Image = ({ url, setImage, setURL }) => {
  const fileInputRef = React.useRef(null);
  const [imageurl, setImageURL] = React.useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setImageURL(null);
    setURL(null);
    setImage(null);
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImage(file);
      setURL(objectURL);
      setImageURL(objectURL);
      console.log("Image", objectURL);
    }
  };

  return (
    <div className="p-[0.7em] mt-0 mb-0 mr-12 ml-10" onClick={handleClick}>
      {imageurl === null && url === null ? (
        <div>
          <div className="text-sm text-gray-700 font-[600]">
            Upload image here
          </div>

          <img
            src="https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg"
            alt="upload"
            className="w-20 ml-6 "
          />
        </div>
      ) : (
        <div className="  w-40 h-cardH absolute">
          <img
            src={
              url == null ||
              "https://img.icons8.com/?size=48&id=8ax09IWlr80n&format=png"
            }
          />
        </div>
      )}
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
