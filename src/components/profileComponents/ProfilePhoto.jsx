/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import avater from "../../../src/defaultImage/avatar.png";
import { Camera } from "../../svg/Camera";
import ProfilePhotoUpload from "./profilePhotoUpload";
import FriendShip from "./FriendShip";

const ProfilePhoto = ({ profile, visitor, imageData }) => {
  const [show, setShow] = useState(false);
  const profilePhotoRef = useRef();

  return (
    <div>
      {show && (
        <ProfilePhotoUpload
          imageData={imageData}
          profilePhotoRef={profilePhotoRef}
          show={show}
          setShow={setShow}
        />
      )}
      <div className="flex justify-between">
        <div className="flex flex-col text-center w-[340px] md:w-auto gap-x-4 md:flex-row md:text-left ">
          <div className="relative ">
            <div
              ref={profilePhotoRef}
              className="mx-auto border-4 border-white rounded-full md:mx-0 w-36 h-36 bg-main_bg"
              style={{
                backgroundImage: `url(${profile?.profilePicture || avater})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {visitor ? (
              ""
            ) : (
              <div
                onClick={() => setShow(true)}
                className="absolute flex items-center justify-center bg-white rounded-full cursor-pointer bottom-2 right-[7rem] md:right-1 w-9 h-9"
              >
                <Camera />
              </div>
            )}
          </div>

          <div className="mt-3 md:mt-5">
            <h1 className="text-2xl text-black md:text-white-100 font-gilroyBold ">
              {profile?.fName + " " + profile?.lName}
            </h1>
            <h5 className="text-black md:text-white-100 font-gilroyBold ">
              OtherInformation
            </h5>
          </div>
        </div>
        <div className="w-2/5 flex gap-x-3 items-center mb-10 justify-end mr-5" >
        {visitor && 
         <FriendShip friendShips={profile?.friendShip} profileId={profile?._id} />
        }
      </div>
      </div>

      
    </div>
  );
};

export default ProfilePhoto;
