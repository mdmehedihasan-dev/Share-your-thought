/* eslint-disable react/prop-types */
import avatarImage from "../../assets/defaultImage/avatar.png";


const FriendList = ({ friends }) => {
  const friendsCount = () => {
    const total_count = friends?.length || 0;
    return total_count === 0
      ? "0 friends"
      : total_count === 1
      ? "1 friends"
      : `${total_count} friends`;
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base text-black font-gilroyBold">Friends</h3>
          <span className="text-sm font-gilroyMedium text-secondary_color">
            {friendsCount()}
          </span>
        </div>
        {/* {friends?.length > 4 && (
          <button
            className="px-4 py-2 text-sm text-white rounded-md bg-blue font-gilroyMedium"
            onClick={handleShow}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )} */}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {friends?.length
          ? friends?.slice(0, 4).map((friend) => (
              <div key={friend._id}>
                <img
                  className="object-cover w-full"
                  src={friend.profilePicture || avatarImage}
                  alt=""
                />
                <h4 className="mt-2 text-base text-black font-gilroyMedium">
                  {friend.username}
                </h4>
              </div>
            ))
          : "No friends to show"}
      </div>
    </>
  );
};

export default FriendList;
