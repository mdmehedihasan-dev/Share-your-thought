/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import OutSideClick from "../../../functions/click";
import { PlusCircle } from "../../../svg/PlusCircle";
import { CircleCloseIcon } from "../../../svg/CircleClose";
import UploadProfilePhoto from "./UploadProfilePhoto";
import { useSelector } from "react-redux";

const ProfilePhotoUpload = ({ setShow, profilePhotoRef, show, imageData }) => {
  const chooseFile = useRef(null);
  const showRef = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.registration);

  OutSideClick(showRef, () => {
    setShow(false);
  });

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    if (
      files.type !== "image/jpeg" &&
      files.type !== "image/png" &&
      files.type !== "image/webp" &&
      files.type !== "image/gif"
    ) {
      setError(`${files.name} unsupported file!`);
      return;
    } else if (files.size > 1024 * 1024 * 5) {
      setError(`${files.name}  file is to large`);
      return;
    }
    const readFile = new FileReader();
    readFile.readAsDataURL(files);
    readFile.onload = (finishedRead) => {
      setImage(finishedRead.target.result);
    };
  };

  // console.log(imageData);
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen rounded-md -z-0 bg-blur">
      <div ref={showRef} className="relative w-[90%] md:w-1/3 bg-white shadow-md">
        <div className="relative p-2 border-b border-white-100">
          <div
            onClick={() => setShow(false)}
            className="absolute cursor-pointer top-2 right-3 text-secondary_color"
          >
            <CircleCloseIcon />
          </div>
          <h3 className="text-lg text-center text-black font-gilroyBold">
            CreatePost
          </h3>
        </div>
        <div
          onClick={() => chooseFile.current.click()}
          className="flex items-center justify-center w-1/2 gap-2 py-2 mx-auto text-white bg-black rounded-md cursor-pointer"
        >
          <PlusCircle />
          <span className="font-semibold transition-all ease-in-out hover:font-bold">
            Upload Photo
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            ref={chooseFile}
            onChange={handleImageUpload}
          />
        </div>

        <div className="p-5 overflow-y-auto h-72">
          
          <div >
          <span className="text-base mr-2 font-gilroyMedium text-primary_bg leading-[0.5] ">
          Total Photos :
          </span>
            {
              imageData.filter(
                (img) =>
                  img.folder !==
                  `${userInfo.username.replace(/\s+/g, "_")}//profile_photos`
              ).length
            }

            <span className="grid grid-cols-4 gap-3">
              {imageData
                .filter(
                  (img) =>
                    img.folder !==
                    `${userInfo.username.replace(/\s+/g, "_")}//profile_photos`
                )
                .map((files) => (
                  <img key={files.public_id} src={files.secure_url} onClick={()=>setImage(files.secure_url)} className="object-cover w-full cursor-pointer" />
                ))}
            </span>
          </div>
        </div>

        {image && (
          <UploadProfilePhoto
            show={show}
            setShow={setShow}
            setImage={setImage}
            profilePhotoRef={profilePhotoRef}
            image={image}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
