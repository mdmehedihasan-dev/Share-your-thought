import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeftProfile = () => {
  // const {userInfo} = useSelector((state)=>state.registration)
  const { userInfo } = useSelector((state) => state.registration);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${userInfo.profilePicture})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backegroundPosition: "center",
        }}
        className="w-16 h-16 mx-auto rounded-full xl:w-28 xl:h-28 bg-cyan-100"
      ></div>
      <div className="hidden mt-3 text-center xl:block ">
        <Link to={"/profile"} className="text-lg text-black font-gilroyBold">
          {userInfo.fName} {userInfo.lName}
        </Link>
        {/* <h4 className="font-gilroyRegular text-secondary_color">
        { userInfo.email}
        </h4> */}
      </div>
    </>
  );
};

export default LeftProfile;
