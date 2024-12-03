/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { CircleCloseIcon } from "../../svg/CircleClose";

const CoverPhotos = ({ setShow, imageData, setCoverPhoto }) => {
  const { userInfo } = useSelector((state) => state.registration);

  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen rounded-md bg-blur">
      <div className="fixed p-5   h-[400px] w-1/3 mx-auto bg-white shadow-md -translate-y-2/4 -translate-x-2/4 top-2/4 left-2/4 z-20">
        <div className="text-center border-b-2 border-white-100">
          <span className="text-lg text-center text-black font-gilroyBold">
            Select Cover Photos
          </span>
          <div
            onClick={() => setShow(false)}
            className="absolute cursor-pointer top-2 right-3 text-secondary_color"
          >
            <CircleCloseIcon />
          </div>
        </div>

        <div>
          <span>
          {
            imageData.filter(
              (img) =>
                img.folder ===
                `${userInfo.username.replace(/\s+/g, "_")}/cover_photos`
            ).length
          }
          </span>

          <span className="grid grid-cols-4 gap-3">
            {imageData
              .filter(
                (img) =>
                  img.folder !==
                  `${userInfo.username.replace(/\s+/g, "_")}/cover_photos`
              )
              .map((files) => (
                <img
                  key={files.public_id}
                  src={files.secure_url}
                  onClick={() => setCoverPhoto(files.secure_url)}
                  className="object-cover w-full cursor-pointer"
                />
              ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoverPhotos;
