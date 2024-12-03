/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Followers from "../../svg/Followers";
import UnFollow from "../../svg/UnFollow";
import OutSideClick from "../../functions/click";
import { useAcceptRequestMutation, useAddFriendMutation, useCancelRequestMutation, useDeleteRequestMutation, useFollowMutation, useUnFollowMutation, useUnFriendMutation } from "../../features/api/authApi";
// import Frequest from "../../svg/Friends";
const FriendShip = ({friendShips,profileId}) => {
    const [friendMenu, setFriendMenu] = useState(false);
    const [respondMenu, setRespondMenu] = useState(false);
    const [friendShip, setFriendShip] = useState(friendShips);
    const [addFriend] = useAddFriendMutation();
    const [cancelRequest] = useCancelRequestMutation();
    const [unFollow] = useUnFollowMutation();
    const [follow] = useFollowMutation();
    const [acceptRequest] = useAcceptRequestMutation();
    const [unFriend] = useUnFriendMutation();
    const [deleteRequest] = useDeleteRequestMutation();

    const friendMenuRef = useRef(null)
    const respondMenuRef = useRef(null);


    OutSideClick(friendMenuRef, () => {
        setFriendMenu(false);
      });
      OutSideClick(respondMenuRef, () => {
        setRespondMenu(false);
      });


      
  const handleAddRequest = async () => {
    try {
      await addFriend(profileId).unwrap();
      setFriendShip({ ...friendShip, following: true, request: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await cancelRequest(profileId).unwrap();
      setFriendShip({ ...friendShip, following: false, request: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      await follow(profileId).unwrap();
      setFriendShip({ ...friendShip, following: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      await unFollow(profileId).unwrap();
      setFriendShip({ ...friendShip, following: false });
      setFriendMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptRequest(profileId).unwrap();
      setFriendShip({
        ...friendShip,
        friend: true,
        following: true,
        request: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfriend = async () => {
    try {
      await unFriend(profileId).unwrap();
      setFriendShip({
        ...friendShip,
        friend: false,
        following: false,
        request: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      await deleteRequest(profileId).unwrap();
      setFriendShip({
        ...friendShip,
        friend: false,
        following: false,
        request: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFriendShip(friendShips);
  }, [friendShips]);
  



  return (
 

  <>
  {friendShips?.friend ? (
    <div className="">
      <div className="relative">
        <div
          className="flex items-center gap-x-2 bg-white text-black px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setFriendMenu(true)}
        >
          <div className="">
            <Followers width={20} height={20} />
          </div>
          <span className="font-gilroyMedium text-base">Friends</span>
        </div>
        <div ref={friendMenuRef}>
          {friendMenu && (
            <div className="absolute top-12 left-0 w-56 bg-white shadow-md rounded-md p-3">
              <div
                className="flex items-center gap-x-1 text-black cursor-pointer hover:bg-white-100 px-3 py-2"
                onClick={() => handleUnfriend()}
              >
                <div>
                  <UnFollow width={18} height={18} />
                </div>
                <span className="font-gilroyMedium text-sm">Unfriend</span>
              </div>
              <div
                className="flex items-center gap-x-1 text-black cursor-pointer hover:bg-white-100 px-3 py-2"
                onClick={() => handleUnFollow()}
              >
                <div>
                  <UnFollow width={18} height={18} />
                </div>
                <span className="font-gilroyMedium text-sm">Unfollow</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    !friendShips?.request &&
    !friendShips?.requestReceived && (
      <div
        className="flex items-center gap-x-1 bg-blue text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => handleAddRequest()}
      >
        <div className="">
          {/* <Frequest width={20} height={20} /> */}
        </div>
        <span className="font-gilroyMedium text-base">Add Friend</span>
      </div>
    )
  )}
  {/* request part start */}
  {friendShips?.request ? (
    <div
      className="flex items-center gap-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer"
      onClick={() => handleCancelRequest()}
    >
      <div className="">
        <UnFollow width={20} height={20} />
      </div>
      <span className="font-gilroyMedium text-base">Cancel Request</span>
    </div>
  ) : (
    friendShips?.requestReceived && (
      <div className="relative">
        <div
          className="flex items-center gap-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setRespondMenu(true)}
        >
          <div className="">
            <Followers width={20} height={20} />
          </div>
          <span className="font-gilroyMedium text-base">Respond</span>
        </div>
        <div ref={respondMenuRef}>
          {respondMenu && (
            <div className="absolute top-12 left-0 w-56 bg-white shadow-md rounded-md p-3">
              <div
                className="flex items-center gap-x-1 text-black cursor-pointer hover:bg-white-100 px-3 py-2"
                onClick={() => handleAccept()}
              >
                <div>
                  <Followers width={18} height={18} />
                </div>
                <span className="font-gilroyMedium text-sm">Accept</span>
              </div>
              <div
                className="flex items-center gap-x-1 text-black cursor-pointer hover:bg-white-100 px-3 py-2"
                onClick={() => handleDeleteRequest()}
              >
                <div>
                  <UnFollow width={18} height={18} />
                </div>
                <span className="font-gilroyMedium text-sm">Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )}
  {friendShips?.following ? (
    <div
      className="flex items-center gap-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer"
      onClick={() => handleUnFollow()}
    >
      <div className="">
        <Followers width={20} height={20} />
      </div>
      <span className="font-gilroyMedium text-base">Following</span>
    </div>
  ) : (
    <div
      className="flex items-center gap-x-1 bg-blue text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={() => handleFollow()}
    >
      <div className="">
        <Followers width={20} height={20} />
      </div>
      <span className="font-gilroyMedium text-base">Follow</span>
    </div>
  )}
</>
  )
}

export default FriendShip