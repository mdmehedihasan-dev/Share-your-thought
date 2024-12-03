import { useEffect, useState } from "react";
import FriendCard from "../../components/friendCard";
import { useGetAllFriendsListQuery } from "../../features/api/authApi";
import { useLocation } from "react-router-dom";

const Friend = () => {
  const { data: friendsData, refetch } = useGetAllFriendsListQuery();
  const [count, setCount] = useState(1);
  const location = useLocation();
//   console.log(friendsData);

  useEffect(() => {
    if (location.pathname === "/friends") {
      refetch();
    }
  }, [location.pathname, refetch]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-line_color ">
          <h1 className="text-base text-black font-gilroyBold">All Friends</h1>
          {count < friendsData?.friends?.length && (
            <button
              className="px-3 py-2 text-sm text-white bg-black rounded-md font-gilroyMedium"
              onClick={() => setCount((prev) => prev + 4)}
            >
              See All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {friendsData?.friends?.slice(0, count).map((friend) => (
            <div key={friend?._id}>
              <FriendCard friend={friend} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between pb-2 border-b border-line_color ">
          <h1 className="text-base text-black font-gilroyBold">Request</h1>
          {count < friendsData?.request?.length && (
            <button
              className="px-3 py-2 text-sm text-white bg-black rounded-md font-gilroyMedium"
              onClick={() => setCount((prev) => prev + 4)}
            >
              See All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {friendsData?.request?.map((friend) => (
            <div key={friend?._id}>
              <FriendCard friend={friend} type="request" refetch={refetch} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between pb-2 border-b border-line_color ">
          <h1 className="text-base text-black font-gilroyBold">Sent Request</h1>
          {count < friendsData?.sentRequest?.length && (
            <button
              className="px-3 py-2 text-sm text-white bg-black rounded-md font-gilroyMedium"
              onClick={() => setCount((prev) => prev + 4)}
            >
              See All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {friendsData?.sentRequest?.map((friend) => (
            <div key={friend?._id}>
              <FriendCard
                friend={friend}
                type="sentRequest"
                refetch={refetch}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Friend;
