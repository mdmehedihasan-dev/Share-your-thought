import { useGetAllFriendsListQuery } from "../../../features/api/authApi";
import FriendsContact from "../../friendsContact";
import FriendsRightPart from "./FriendsRightPart";
import Stories from "./stories/Stories";

const RightPart = () => {
  const { data: friendsData, refetch } = useGetAllFriendsListQuery();

  return (
    <div>
      <div>
        <FriendsRightPart  friendsData={friendsData?.request} refetch={refetch}  />
      </div>
      <div className="mt-5">
        <Stories />
      </div>
      <div className="mt-5">
        <FriendsContact friendsData={friendsData?.friends}  />
      </div>
    </div>
  );
};

export default RightPart;
