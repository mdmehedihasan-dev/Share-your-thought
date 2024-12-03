/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import avatarImage from "../../../assets/defaultImage/avatar.png";
import {
  useAcceptRequestMutation,
  useDeleteRequestMutation,
} from "../../../features/api/authApi";

const FriendsRightPart = ({ friendsData, refetch }) => {
  const [acceptRequest] = useAcceptRequestMutation();
  const [deleteRequest] = useDeleteRequestMutation();

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

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="text-lg text-black font-gilroyBold">
              Friends Request
            </h4>
          </div>
          <div>
            <Link
              to="/friends"
              className="px-4 py-2 text-base text-black transition-all duration-100 ease-linear border border-black rounded-full font-gilroyMedium hover:bg-black hover:text-white"
            >
              Seel All
            </Link>
          </div>
        </div>
        {friendsData?.length > 0 ? (
          friendsData?.map((request) => (
            <div className="flex items-center mb-4 gap-x-3" key={request?._id}>
              <div className="flex items-center w-3/6 gap-x-3">
                <div className="w-10 h-10 overflow-hidden rounded-full bg-secondary_color">
                  <img
                    src={request?.profilePicture || avatarImage}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-[62%]">
                  <h5 className="text-base leading-none text-black font-gilroyBold">
                    {request?.fName} {request?.lName}
                  </h5>
                </div>
              </div>
              <div className="flex items-center w-3/6 gap-x-2">
                <button
                  className="px-4 py-2 text-sm text-white bg-black rounded-full font-gilroyNormal"
                  onClick={() => handleAccept(request?._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 text-sm text-white rounded-full bg-red font-gilroyNormal"
                  onClick={() => handleDeleteRequest(request?._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <span className="text-lg font-gilroyBold text-Black">
              No Request available
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default FriendsRightPart;
