/* eslint-disable react/prop-types */
import { formatDistance } from "date-fns";
import avaterImage from "../../../../assets/defaultImage/avatar.png";
import { Link } from "react-router-dom";
import { Dot } from "../../../../svg/Dots";
import { Like } from "../../../../svg/Like";
import { Comment } from "../../../../svg/Comment";
import { Share } from "../../../../svg/Share";
import Reacts from "./Reacts";
import { useRef, useState } from "react";
import CreateComments from "./CreateComments";
import { useSelector } from "react-redux";
import Menus from "./Menus/Menus";
import defaultCover from "../../../../assets/defaultImage/defaultcover.jpg"
import defaultProfile from "../../../../assets/defaultImage/avatar.png"


const ShowPost = ({ post,profile }) => {
  const { userInfo } = useSelector((state) => state.registration);
  const [text, setText] = useState("");
  const [commentImages, setCommentImages] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const textRef = useRef(null);


  console.log(userInfo)
 
  return (
    <div className="w-full p-3 mb-4 rounded-md shadow-md">
      {/* header part  */}
      <div className="flex items-center justify-between mb-2 ">
        <div className={`${profile ? "flex items-center w-3/4 md:w-4/5 gap-x-2": "flex items-center w-3/5  md:w-3/4 gap-x-4"}`}>
          <div className={`${profile ? "w-9 h-9 ":"w-12 h-12 "}"overflow-hidden "`}>
            <Link to={`/profile/${post?.user?.username}`}>
              <img
                className="object-cover w-full h-full rounded-full"
                src={post?.user?.profilePicture || avaterImage}
                alt="profile Photo"
              />
            </Link>
          </div>

          <div className="flex gap-x-1 md:gap-x-3 ">
            <div>
              <Link
                className="font-gilroyMedium"
                to={`/profile/${post?.user?.username}`}
              >
                {post?.user?.username}
              </Link>
              <span className="block text-xs md:text-sm text-secondary_color font-gilroyRegular">
                {formatDistance(post.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div>
              <span className="font-gilroyRegular text-secondary_bg">
                {
                  post.type === "profilePicture" && 
                  `update ${userInfo.user?.gender === "male" ? "hie" : "his"} profile photo `
                }
                   {
                  post.type === "cover" && 
                  `update ${userInfo.user?.gender === "male" ? "her" : "his"} cover photo `
                }
              </span>
             
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            onClick={() => setMenuShow(true)}
            className="flex items-center justify-center w-10 h-10 hover:bg-[#F0F0F0] transition-all ease-in-out rounded-full cursor-pointer text-blue"
          >
            <Dot />
          </div>
          {menuShow && (
            <Menus
              setMenuShow={setMenuShow}
              postImages={post?.images}
              userInfo={userInfo}
              postUserId={post.user._id}
            />
          )}
        </div>
      </div>

      {/* header part end  */}

      {/* background nad text post  */}

      {post.background ? (
        <div
          className="h-[350px] flex px-10 text-center justify-center items-center"
          style={{
            backgroundImage: `url(${post.background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <h4 className="text-3xl text-white font-gilroyBold">{post.text}</h4>
        </div>
      ) : (
        <>
          <div>
            <h4 className="text-2xl text-black font-gilroyBold">{post.text}</h4>
          </div>

          <div>
            {post.images && post.images.length && (
              <div
                className={`relative ${
                  post.images.length === 1
                    ? "w-full h-full overflow-hidden"
                    : post.images.length === 2
                    ? "overflow-hidden h-full w-full grid grid-cols-2 gap-2"
                    : post.images.length === 3
                    ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                    : post.images.length === 4
                    ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                    : post.images.length >= 5
                    ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                    : "overflow-hidden"
                }`}
              >
                {
                  post.type === "profilePicture" 
                  ?
                  <>
                  <div className="w-full overflow-hidden">
                    <div className="w-full h-[280px]">
                      <img className="object-cover w-full h-full" src={post.user?.cover || defaultCover} alt="cover_photo" />
                    </div>

                    <div>
                    
                    <img className="object-cover mx-auto rounded-full -mt-36 w-72 h-72" src={post.user?.profilePicture || defaultProfile} alt="profile_photo" />
                    </div>


                  </div>
                  
                  </>
                  :
                  post.images.slice(0, 4).map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt="images"
                      className={`object-cover w-full h-full ${
                        post.images.length === 3
                          ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                          : post.images.length === 4 &&
                            "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"
                      }`}
                    />
                  ))
                }
                {post.images.length >= 5 && (
                  <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white-100 bottom-36 right-36 opacity-65 ">
                    <span className="text-base font-gilroyBold">
                      +{post.images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {/* post show part end  */}
      <div className="relative mt-2">
        <div className="flex items-center justify-end">
          <span className="text-lg cursor-pointer font-gilroyMedium text-secondary_color">
            13 comments
          </span>
        </div>
        <div className="border-t-2 border-[#F0F0F0] py-1"></div>
        {/* react for comments  */}
        {show && (
          <div className="rounded-full top-0 absolute py-1 bg-white w-[300px] shadow-md">
            <Reacts setShow={setShow} />
          </div>
        )}
        {/* react for comments  */}

        <div className="flex justify-center">
          <div
            onMouseOver={() =>
              setTimeout(() => {
                setShow(true);
              }, 500)
            }
            onMouseLeave={() =>
              setTimeout(() => {
                setShow(false);
              }, 500)
            }
            className="flex items-center gap-x-2 justify-center w-[30%] text-secondary_color cursor-pointer"
          >
            <Like />
            <span>Like</span>
          </div>
          <div
            onClick={() => textRef.current.focus()}
            className="flex items-center  gap-x-2 justify-center w-[30%] text-secondary_color cursor-pointer"
          >
            <Comment />
            <span>Comment</span>
          </div>
          <div className="flex items-center  gap-x-2 justify-center w-[30%] text-secondary_color cursor-pointer">
            <Share />
            <span>Share</span>
          </div>
        </div>

        <div className="border-b-2 border-[#F0F0F0] py-1"></div>
        {/* comment part  */}
        <div className="mt-2">
          <CreateComments
            userInfo={userInfo}
            text={text}
            setText={setText}
            commentImages={commentImages}
            setCommentImages={setCommentImages}
            error={error}
            setError={setError}
            textRef={textRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
