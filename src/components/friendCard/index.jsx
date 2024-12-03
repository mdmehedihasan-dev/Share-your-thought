/* eslint-disable react/prop-types */
import avatarImage from "../../assets/defaultImage/avatar.png";
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeleteRequestMutation,

} from "../../features/api/authApi";
import { useNavigate } from "react-router-dom";

const FriendsCard = ({ friend, type, refetch }) => {
  const [cancelRequest] = useCancelRequestMutation();
  const [acceptRequest] = useAcceptRequestMutation();
  const [deleteRequest] = useDeleteRequestMutation();
  const navigate = useNavigate();

  const handleCancelRequest = async (profileId) => {
    try {
      let res = await cancelRequest(profileId).unwrap();
      if (res.message === "Cancel request") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (profileId) => {
    try {
      let res = await acceptRequest(profileId).unwrap();
      if (res.message === "Request accepted") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRequest = async (profileId) => {
    try {
      let res = await deleteRequest(profileId).unwrap();
      if (res.message === "Request delete") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirect = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <div
        className="p-4 bg-white rounded-md shadow-md cursor-pointer"
        onClick={() => handleRedirect(friend?.username)}
      >
        <div className="w-full overflow-hidden h-44">
          <img
            src={friend?.profilePicture || avatarImage}
            alt="friend pic"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="mt-3">
          <h2 className="text-base text-black font-gilroyMedium">
            {friend?.fName} {friend?.lName}
          </h2>
        </div>
        <div className="mt-3">
          {type == "request" ? (
            <>
              <button
                className="w-full px-4 py-2 text-sm text-white bg-black rounded-md font-gilroyBold"
                onClick={() => handleAccept(friend?._id)}
              >
                Accept
              </button>{" "}
              <button
                className="w-full px-4 py-2 mt-3 text-sm text-white rounded-md bg-red font-gilroyBold"
                onClick={() => handleDeleteRequest(friend?._id)}
              >
                Reject
              </button>
            </>
          ) : type == "sentRequest" ? (
            <button
              className="w-full px-4 py-2 text-sm text-black rounded-md bg-white-100 font-gilroyBold"
              onClick={() => handleCancelRequest(friend?._id)}
            >
              Cancel Request
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsCard;
