/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from "../../svg/Grid";
import { List } from "../../svg/List";

const ProfilePost = ({ postVisible, setPostVisible }) => {
  return (
    <>
      <div className="w-full rounded-md shadow-md">
        <div className="border-b border-lnline_color">
          <h1 className="pl-5 text-lg text-black font-gilroyBold">Posts</h1>
        </div>
        <div className="flex items-center justify-between py-5">
          <div
            onClick={() => setPostVisible("list")}
            className={`w-[48%] flex items-center border-b-2 border-white justify-center gap-x-2 cursor-pointer ${
              postVisible === "list" ? "border-b-2 border-blue" : ""
            }`}
          >
            <div className={`${postVisible === "list" ? "text-blue" : ""}`}>
              <List />
            </div>
            <span className={`text-base text-black font-gilroyMedium ${postVisible === "list" && "text-blue" }`}>List</span>
          </div>
          <div
            onClick={() => setPostVisible("grid")}
            className={`w-[48%] flex items-center border-b-2 border-white justify-center gap-x-2 cursor-pointer ${
              postVisible === "grid" ? "border-b-2 border-blue" : ""
            }`}
          >
            <div className={`${postVisible === "grid" ? "text-blue" : ""}`}>
              <Grid />
            </div>
            <span className={`text-base text-black font-gilroyMedium ${postVisible === "grid" && "text-blue" }`}>Grid</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
