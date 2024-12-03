/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { SearchIcon } from "../../../../svg/SearchIcon";
import SearchBox from "./SearchBox";
import OutSideClick from "../../../../functions/click";
import { LeftData } from "../../LeftPart/Data";
import LeftMenu from "../../LeftPart/LeftMenu";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ location }) => {
  const [show, setShow] = useState(false);
  const clickOutSide = useRef(null);
  const { username } = useParams();
  const { userInfo } = useSelector((state) => state.registration);


  OutSideClick(clickOutSide, () => {
    setShow(false);
  });

  const getTitles = () => {
    if (location.pathname === "/") {
      return "News Feed";
    } else if (location.pathname === "/friends") {
      return "Friends";
    } else if (location.pathname === "/profile") {
      return "Profile";
    } else if (location.pathname.startsWith("/profile/") && username) {
      return "Profile";
    } else {
      return "/";
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-3 pt-3 pb-5 bg-white ${
        location.pathname === "/profile" ? "px-0" : ""
      }`}
    >
      <div>
        <h4 className="z-30 hidden text-4xl lg:block font-gilroyBold">
          {getTitles()}
        </h4>
        <div  style={{
          backgroundImage: `url(${userInfo.profilePicture})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backegroundPosition: "center",
        }} className="block bg-black rounded-full w-14 h-14 lg:hidden"></div>
      </div>

      <div className="flex items-center lg:hidden lg:gap-x-4">
        {LeftData.map((data, index) => (
          <LeftMenu key={index} data={data} />
        ))}
      </div>

      <div className=" w-10 lg:w-[28%] xl:w-[32%]  relative">
        <div
          onClick={() => setShow(true)}
          className="flex items-center justify-center border rounded-full xl:w-[260px] lg:w-[230px] w-11 h-11 lg:px-4 lg:py-3 border-secondary_color gap-x-3"
        >
          <div className="cursor-pointer text-secondary_color ">
            <SearchIcon />
          </div>
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none font-gilroyRegular"
            />
          </div>
        </div>
        <div
          className=" -top-2  lg:-left-[30px] -left-64  absolute"
          ref={clickOutSide}
        >
          {show && <SearchBox />}
        </div>
      </div>
    </div>
  );
};

export default Header;
