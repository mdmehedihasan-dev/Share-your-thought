/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import avaterImage from "../../../../assets/defaultImage/avatar.png";
import Feeling from "../../../../svg/Feeling";
import { Media } from "../../../../svg/Media";
import EmojiPicker from "emoji-picker-react";
import { CircleCloseIcon } from "../../../../svg/CircleClose";

const CreateComments = ({
  userInfo,
  text,
  setText,
  commentImages,
  setCommentImages,
  error,
  setError,
  textRef,
}) => {
  const [picker, setPicker] = useState(false);
  const [curserPosition, setCursorPosition] = useState("");
  const chooseFile = useRef(null);

  // function for emoji picker
  const handelEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    textRef.current.selectionEnd = curserPosition;
  }, [curserPosition]);
  // function for emoji picker end

  // function for comment image
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
      setCommentImages(finishedRead.target.result);
    };
  };

  

  return (
    <div className="relative">
    <div className="flex items-center justify-between gap-x-2">
      <div className="w-10 h-10 rounded-full">
        <img
          className="w-full overflow-hidden"
          src={userInfo.profilePhoto || avaterImage}
          alt=""
        />
      </div>
      <div className="w-[92%] flex rounded-full bg-white-100">
        <input
          className="hidden"
          type="file"
          ref={chooseFile}
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
        />
        <input
          ref={textRef}
          className="w-[90%] px-4 py-2 bg-transparent roun focus:outline-none"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder={`comment as ${userInfo.username}`}
        />
        <div className="relative flex items-center gap-x-2">
          <div
            onClick={() => setPicker((prev) => !prev)}
            className="cursor-pointer"
          >
            <Feeling />
          </div>
          {picker && (
            <div className="absolute  -left-[270px] md:left-0 top-[-550px] z-10">
              <EmojiPicker onEmojiClick={handelEmoji} />
            </div>
          )}
          <div onClick={()=>chooseFile.current.click()} className="cursor-pointer">
            <Media />
          </div>
        </div>
      </div>
    </div>
      {commentImages && (
    <div className="relative w-48 mt-2 overflow-hidden rounded-md">
         <img className="object-cover w-full" src={commentImages} />
        <div>
          <div onClick={()=>setCommentImages('')} className="absolute top-0 right-0 flex items-center justify-center text-black cursor-pointer" >
            

          <CircleCloseIcon />
          </div>
        </div>
    </div>
      )}
      
     {
      error && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full h-full font-semibold bg-blur gap-x-4 text-red font-gilroyMedium">
          <h1>{error}</h1>
          <button onClick={()=>setError('')} className="px-4 py-1 text-white rounded-md bg-blue font-gilroyMedium">try again</button>
        </div>
      )
     }
   
    </div>
  );
};

export default CreateComments;
