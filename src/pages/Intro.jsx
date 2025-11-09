import MagneticButton from "../components/MagicButton.tsx";
import GuideLine from "../components/containers/GuideLine.jsx";

const Intro = () => {
  const data = [
    {
      title: "Log In/ Sign Up",
      steps: [
        {
          descripition:
            "Please enter your username and password to log in or sign up for a new account.",
          url: "https://i.pinimg.com/736x/1b/d8/d6/1bd8d6906906e291a1dbb85d036bcca3.jpg",
        },
        {
          descripition:
            "If you are a new user, click the 'Sign Up' button to create an account.",
        },
      ],
    },
    {
      title: "Profile Setup",
      steps: [
        {
          descripition:
            "Once logged in, set up your profile by adding your name, photo, and bio.",
          url: "https://i.pinimg.com/736x/8a/e4/27/8ae42732a75d11f39a48fb5f07070f82.jpg",
        },
      ],
    },
    {
      title: "Search for Products",
      steps: [
        {
          descripition:
            "Use the search bar to find products by name, category, or brand.",
          url: "https://i.pinimg.com/736x/1b/d8/d6/1bd8d6906906e291a1dbb85d036bcca3.jpg",
        },
      ],
    },
    {
      title: "Add to Cart",
      steps: [
        {
          descripition:
            "Once you've found a product, click 'Add to Cart' to place it in your shopping cart.",
          url: "https://i.pinimg.com/736x/8a/e4/27/8ae42732a75d11f39a48fb5f07070f82.jpg",
        },
      ],
    },
    {
      title: "Checkout and Payment",
      steps: [
        {
          descripition:
            "Proceed to checkout to enter your shipping information and payment details.",
        },
      ],
    },
  ];

  return (
    <div>
      <Nav />
      <FirstPanle />

      <GuideLine data={data} />
      <Footer />
    </div>
  );
};
const Nav = () => {
  return (
    <div className="bg-[#ff7e0517] w-full">
      <p className="bg-header text-[#f77d19] p-3 text-h1 text-center font-bold flex justify-center">
        <img
          src="https://img.icons8.com/?size=48&id=t0CwA6GDizrl&format=png"
          className="mx-2"
          alt="nav"
        />
        E-Food
      </p>
    </div>
  );
};
const FirstPanle = () => {
  return (
    <div className="relative h-screen ">
      {" "}
      <div className="absolute h-4/5 -z-10 w-full bg-[#000000] opacity-30"></div>
      <img
        className="absolute w-full h-4/5 -z-20 opacity-60"
        src="https://i.pinimg.com/736x/1b/d8/d6/1bd8d6906906e291a1dbb85d036bcca3.jpg"
        alt="first panel"
      />
      <div className="text-white text-fluid text-center font-bold">
        Enjoy Your Food
      </div>
      <div className="flex justify-center">
        <MagneticButton />
        <button>
          <p className="mx-10 text-h4 text-cyan-200 underline p-2">
            How to order Food ?
          </p>
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return <div>Footer</div>;
};

export default Intro;
