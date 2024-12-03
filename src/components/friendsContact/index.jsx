/* eslint-disable react/prop-types */
import avatarImage from "../../assets/defaultImage/avatar.png";

const FriendsContact = ({ friendsData }) => {
  return (
    <>
      <div className="mb-5">
        <h4 className="text-lg text-black font-gilroyBold">All Friends</h4>
      </div>
      {friendsData?.length > 0 ? (
        friendsData?.map((friend) => (
          <div className="flex items-center mb-3 gap-x-3" key={friend?._id}>
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                src={friend?.profilePicture || avatarImage}
                className="object-cover w-full h-full"
                alt=""
              />
            </div>
            <div className="w-4/5">
              <h4 className="text-base text-black font-gilroyBold">
                {friend?.fName} {friend?.lName}
              </h4>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <span className="text-lg font-gilroyBold text-Black">
            No Friends available
          </span>
        </div>
      )}
    </>
  );
};

export default FriendsContact;
