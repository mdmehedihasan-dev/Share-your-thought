/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import PostHome from "../HomeComponents/PostHome";
import ProfilePost from "./ProfilePost";
import ShowPost from "../HomeComponents/PostHome/showPost";
import { useSelector } from "react-redux";
import GridView from "./GridView";

const ProfileRight = ({ setVisiable, posts, profile,visitor }) => {
  const { userInfo } = useSelector((state) => state.registration);

  const [postVisible, setPostVisible] = useState("list");

  return (
    <>
    
      <div>
          {
            visitor ? "" :
            <PostHome setVisiable={setVisiable} posts={posts} />
          }
       
      </div>
      <div className="mt-5">
        <ProfilePost
          postVisible={postVisible}
          setPostVisible={setPostVisible}
          profile={profile}
        />
      </div>

      <div className="pb-5">
        {profile?.posts && profile?.posts.length ? (
          <div>
            {postVisible === "list" ? (
              <div className="mt-5">
                {profile?.posts?.map((item) => (
                  <ShowPost profile={profile} key={item._id} post={item} userInfo={userInfo} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-between mt-5">
                {profile?.posts?.map((item) => (
                  <GridView key={item._id} post={item} userInfo={userInfo} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 text-center">
            <h1 className="text-3xl font-gilroyBold text-yellow">
              You haven't posted anything!
            </h1>
            <span className="text-2xl text-single_color font-gilroyBold ">
              Please post something and get reach more people 🙋‍♂️
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileRight;
