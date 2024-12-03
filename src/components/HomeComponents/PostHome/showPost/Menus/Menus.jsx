/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import OutSideClick from "../../../../../functions/click";
import PostMenu from "./PostMenu";
import { PinPost } from "../../../../../svg/PinPost";
import { SavePost } from "../../../../../svg/SavePost";
import { EditPost } from "../../../../../svg/EditPost";
import { EnterFullScreen } from "../../../../../svg/EnterFullScreen";
import { Download } from "../../../../../svg/Download";
import { Trash } from "../../../../../svg/Trash";

const Menus = ({ setMenuShow, userInfo, postUserId, postImages }) => {
  const [show, setShow] = useState(postUserId === userInfo.id ? true : false);
  const postMenuShow = useRef(null);

  OutSideClick(postMenuShow, () => {
    setMenuShow(false);
  });
  // console.log(userInfo.id)
  // console.log(postUserId)

  return (
    <div
      ref={postMenuShow}
      className="absolute rounded-md  px-4 py-2 right-0 z-10 bg-white shadow-sm top-8 w-[350px]"
    >
      {show && <PostMenu icon={PinPost} title="Pin the Post" />}
       
      <PostMenu icon={SavePost} title="Save the Post" />
      {show && <PostMenu icon={EditPost} title="Edit the Post" />}

      {postImages && (
        <PostMenu icon={EnterFullScreen} title="Enter full Screen" />
      )}
      {postImages && <PostMenu icon={Download} title="Downoad  Photo" />}
       {show && <PostMenu icon={Trash} title="Remove the Post" />}
    </div>
  );
};

export default Menus;
