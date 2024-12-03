/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import { CircleCloseIcon } from "../../../svg/CircleClose";
import Cropper from "react-easy-crop";
import { Plus } from "../../../svg/Plus";
import { Minus } from "../../../svg/Minus";
import getCroppedImg from "../../../helpers/getCroppedimg";
import PostError from "../../HomeComponents/PostHome/createPostPopup/PostError";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePostMutation,
  useUploadImageMutation,
  useUploadProfilePhotoMutation,
} from "../../../features/api/authApi";
import { PulseLoader } from "react-spinners";

const UploadProfilePhoto = ({show,setShow, setImage, image,profilePhotoRef }) => {
  const { userInfo } = useSelector((state) => state.registration);
  const [uploadImage] = useUploadImageMutation();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixles] = useState(null);
  const zoomRef = useRef(null);
  const [uploadProfilePhoto] = useUploadProfilePhotoMutation();
  const [createPost] = useCreatePostMutation();
  const dispatch = useDispatch()

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixles(croppedAreaPixels);
  }, []);

  const zoomOut = () => {
    zoomRef.current.stepDown();
    setZoom(zoomRef.current.value);
  };

  const zoomIn = () => {
    zoomRef.current.stepUp();
    setZoom(zoomRef.current.value);
  };

  const getCropImage = useCallback(
    async (show) => {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setImage(croppedImage);
        } else {
          return croppedImage;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const handleImageUpload = async () => {
    try {
      setLoading(true);
      const img = await getCropImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${userInfo.username.replace(/\s+/g, "_")}/profile_photos`;
      // console.log(blob);
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const resProfilePhoto = await uploadImage({ formData, path }).unwrap();
      const uploadProfile = await uploadProfilePhoto({
        url: resProfilePhoto[0].url,
      }).unwrap();
      if (uploadProfile.status === "done") {
        setLoading(false);
        setShow(false)
        const profilePhoto = await createPost({
          type: "profilePicture",
          images: resProfilePhoto,
          text,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();

        if(profilePhoto.status === "done"){
          setLoading(false)
          profilePhotoRef.current.style.backgroundImage = `url(${resProfilePhoto[0].url})`
          localStorage.setItem('user',JSON.stringify({...userInfo, profilePicture:resProfilePhoto[0].url}))
          dispatch(loggedInUsers({...userInfo,profilePicture:resProfilePhoto[0].url}))
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed p-5  h-[600px] w-1/3 mx-auto bg-white shadow-md -translate-y-2/4 -translate-x-2/4 top-2/4 left-2/4">
      <div className="relative p-2 border-b border-white-100">
        {/* {error && <PostError error={error} setError={setError} />} */}

        <div
          onClick={() => setImage("")}
          className="absolute cursor-pointer top-2 right-3 text-secondary_color"
        >
          <CircleCloseIcon />
        </div>
        <h3 className="text-lg text-center text-black font-gilroyBold">
          Profile Photos
        </h3>
      </div>

      <div className="px-3 my-2">
        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Caption"
          className="w-full px-2 border-2 border-solid rounded-md outline-none h-28 border-white-100 "
        />
      </div>

      <div className="relative flex items-center justify-center w-full mt-5 h-72 profile_cropper">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="flex items-center justify-center mt-1 gap-x-2">
        <div
          onClick={zoomOut}
          className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-white-100"
        >
          <Minus />
        </div>

        <input
          ref={zoomRef}
          className="w-96 customize_range"
          type="range"
          min={1}
          max={3}
          step={0.2}
          onChange={(e) => setZoom(e.target.value)}
        />

        <div
          onClick={zoomIn}
          className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-white-100"
        >
          <Plus />
        </div>
      </div>

      <div className="flex items-center justify-center py-2 gap-x-2">
        <button
          disabled={loading}
          onClick={() => getCropImage("show")}
          className="px-3 py-2 font-semibold rounded-md bg-[#d7d2d2] "
        >
          Crop Image
        </button>
        <button 
           disabled={loading}
          onClick={() => handleImageUpload()}
          className="px-3 py-2 font-semibold rounded-md text-white-100 bg-blue "
        >
          {loading ?  <PulseLoader color={"#fff"} size={5} /> : "Upload Image" } 
        </button>
      </div>
    </div>
  );
};

export default UploadProfilePhoto;
