const NotificationCard = ({ message, onRespond, onClick }) => {
  return (
    <div
      className="flex flex-col w-60 sm:w-72 text-[10px] sm:text-xs z-50 my-0.5 group"
      onClick={onClick}
    >
      <div className="info-alert cursor-pointer flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#ffffff] group-hover:bg-[#d2e3fdbb] px-[10px]">
        <div className="flex gap-2">
          <div className="text-[#1c56be] bg-white backdrop-blur-xl p-1 rounded-lg group-hover:bg-[#d2e3fdbb]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              className="w-6 h-6 shadow-[#1c569e]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-orange-400 group-hover:text-blue-800">
              Message Sent
            </p>
            <p className="text-gray-900 group-hover:text-orange-600 text-h5">
              {message}
            </p>
          </div>
        </div>
        <button
          className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
          onClick={(e) => {
            e.stopPropagation();
            onRespond("seen");
          }} // Prevent click event from bubbling up
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 group-hover:text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
