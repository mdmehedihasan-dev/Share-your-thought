/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "../../svg/Camera";
import { Media } from "../../svg/Media";
import { Upload } from "../../svg/Upload";
import OutSideClick from "../../functions/click";
import defaultCover from "../../../src/defaultImage/defaultCoverPhoto.jpg";
import PostError from "../HomeComponents/PostHome/createPostPopup/PostError";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedimg";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePostMutation, useUploadCoverPhotoMutation, useUploadImageMutation } from "../../features/api/authApi";
import { loggedInUsers } from "../../features/user/authSlice";
import { PulseLoader } from "react-spinners";
import CoverPhotos from "./CoverPhotos";

const CoverPhoto = ({ profileCover, visitor }) => {
  const { userInfo } = useSelector((state) => state.registration);
  const [visible, setVisible] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState("");
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState("");
  const [loading, setLoading] = useState(false);
  const [createPost] = useCreatePostMutation();

  const [uploadCover] = useUploadCoverPhotoMutation()
  const [uploadImage] = useUploadImageMutation();

  // eslint-disable-next-line no-unused-vars
  const [croppedAreaPixels, setCroppedAreaPixles] = useState(null);
  const [show,setShow]=useState(false)
  const visibleRef = useRef(null);
  const coverRef = useRef(null);
  const withRef = useRef(null);
  const coverPhotoRef = useRef(null)
  const dispatch = useDispatch()

  OutSideClick(visibleRef, () => {
    setVisible(false);
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixles(croppedAreaPixels);
  }, []);

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
      setCoverPhoto(finishedRead.target.result);
    };
  };

  useEffect(() => {
    setWidth(withRef.current.clientWidth);
  }, [window.innerWidth]);


  const getCropImage = useCallback(
    async (show) => {
      try {
        const croppedImage = await getCroppedImg(coverPhoto, croppedAreaPixels);
        if (show) {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setCoverPhoto(croppedImage);
        } else {
          return croppedImage;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );


  const handleCoverPhoto = async () =>{
    try {
      setLoading(true);
      const img = await getCropImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${userInfo.username.replace(/\s+/g, "_")}/cover_photos`;
      // console.log(blob);
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const resCoverPhoto = await uploadImage({ formData, path }).unwrap();
      const uploadCoverPhoto = await uploadCover({
        url: resCoverPhoto[0].url,
      }).unwrap();
      if (uploadCoverPhoto.status === "done") {
        setLoading(false);
   
        const coverPhoto = await createPost({
          type: "cover",
          images: resCoverPhoto,
          text:null,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();

        if(coverPhoto.status === "done"){
          setLoading(false)
          setCoverPhoto("")
          coverPhotoRef.current.src = `${resCoverPhoto[0].url}`
          localStorage.setItem('user',JSON.stringify({...userInfo, cover:resCoverPhoto[0].url}))
          dispatch(loggedInUsers({...userInfo,cover:resCoverPhoto[0].url}))
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }




  return (
    <>
    
  
    <div
      ref={withRef}
      className="relative w-full overflow-hidden rounded-tl-md rounded-tr-md bg-white-100 h-96"
    >
      {error && <PostError error={error} setError={setError} />}
      <img
        ref={coverPhotoRef}
        src={profileCover || defaultCover}
        alt="Cover_Photo"
        className="object-cover w-full h-full"
      />
      <input
        type="file"
        ref={coverRef}
        onChange={handleImageUpload}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />

      <div className="cover_cropper">
        {coverPhoto && (
          <Cropper
            image={coverPhoto}
            crop={crop}
            zoom={zoom}
            aspect={width / 384}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
          />
        )}
      </div>

      {visitor ? (
        ""
      ) : (
        <div className="absolute md:top-5 top-2 right-2 md:right-5">
          <div
            onClick={() => setVisible(true)}
            className="flex items-center justify-center px-4 py-2 bg-white rounded-md cursor-pointer md:px-5 md:py-3 gap-x-2 w-36"
          >
            <div className="text-black">
              <Camera />
            </div>
            <span className="text-sm text-black font-gilroyRegular">
              Edit Photo
            </span>
          </div>

          <div ref={visibleRef}>
            {visible && (
              <div className="absolute top-0 right-0 md:top-2 ">
                {/* <div onClick={()=>setShow(true)} className="flex items-center w-48 px-5 py-3 bg-white rounded-md cursor-pointer group hover:bg-black gap-x-2">
                  <div className="text-black group-hover:text-white">
                    <Media />
                  </div>
                  <span className="text-sm text-black group-hover:text-white font-gilroyRegular">
                    select files
                  </span>
                </div> */}
                <div
                  onClick={() => coverRef.current.click()}
                  className="absolute right-0 flex items-center w-48 px-5 py-3 bg-white rounded-md cursor-pointer group hover:bg-black top-10 gap-x-2"
                >
                  <div className="text-black group-hover:text-white">
                    <Upload />
                  </div>
                  <span className="text-sm text-black group-hover:text-white font-gilroyRegular">
                    Upload image
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {
        coverPhoto && 
        <div className="absolute top-0 left-0 flex items-center justify-end w-full h-16 pr-5 gap-x-2 bg-blur">
          <button onClick={handleCoverPhoto} className="px-4 py-1 text-black transition-all duration-200 ease-in-out bg-white border rounded-full border-2-black hover:bg-black hover:text-white-100 ">
            {loading ? <PulseLoader/> : "Save"}
          </button>
          <button onClick={()=>setCoverPhoto("")} className="px-4 py-1 text-white transition-all duration-200 ease-in-out bg-black border rounded-full border-2-black hover:bg-white hover:text-black ">Cancel</button>

        </div>
      }
    </div>


    {
      show && <CoverPhotos setShow={setShow} setCoverPhoto={setCoverPhoto} />
    }



    </>
  );
};

export default CoverPhoto;
