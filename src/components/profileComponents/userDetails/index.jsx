/* eslint-disable react/prop-types */
import ProfileInfoDetails from "./ProfileInfoDetails";

const UserInformation = ({profile,visitor}) => {
  return <div>
    <ProfileInfoDetails profile={profile} visitor={visitor} />
  </div>;
};

export default UserInformation;
