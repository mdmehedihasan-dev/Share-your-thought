/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import FriendList from "./FriendList"
import Photos from "./Photos"
import UserInformation from "./userDetails"

const ProfileLeft = ({imageData,profile,visitor,friends}) => {
  return (
    <>
    <div className="w-full p-3 mb-5 rounded-md shadow-md">
      <UserInformation visitor={visitor} profile={profile} />
    </div>
    <div className="w-full p-3 mb-5 rounded-md shadow-md"> 
      <Photos imageData={imageData} />
    </div>
    <div className="w-full p-3 mb-5 rounded-md shadow-md">
      <FriendList friends={friends} />
    </div>
    </>
  )
}

export default ProfileLeft