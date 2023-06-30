import { NavLink } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="">
      <h1 className="py-8 text-center text-7xl text-gray-500  shadow-inner shadow-slate-400 ">
        We Bank
      </h1>
      <section className="flex justify-center align-middle">
        <NavLink to={"/home"} className="home-btn">
          Home - &#62;
        </NavLink>
      </section>
    </div>
  );
};

export default Welcome;
