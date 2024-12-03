/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllUserQuery, useListImageMutation } from "../../features/api/authApi";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CoverPhoto from "../../components/profileComponents/CoverPhoto";
import ProfilePhoto from "../../components/profileComponents/ProfilePhoto";
import ProfileMenus from "../../components/profileComponents/ProfileMenus";
import ProfileRight from "../../components/profileComponents/ProfileRight";
import ProfileLeft from "../../components/profileComponents/ProfileLeft";

const Profile = ({posts,setVisiable}) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.registration);
  let userName = username === undefined ? userInfo.username : username;
  const { data: profile } = useGetAllUserQuery(userName);
  const [listimage,{data:imageData, error:imageError , isLoading:imageLoading}] = useListImageMutation()

  const visitor = userName !== userInfo.username ? true : false
  
  const path = `${userName.replace(/\s+/g, "_")}/*`;
  const sort = 'desc';
  const max = 30


  
  useEffect(() => {
    if (profile && profile.ok === false) {
      navigate("/");
    }else{
      listimage({path,sort,max})
    }
  }, [profile]);

  console.log(imageLoading)
  console.log(imageError)
  // console.log(profile)

  
 
 


  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="rounded-md bg-white-100">
        <div className="relative">
          <CoverPhoto profileCover={profile?.cover} visitor={visitor} />
          <div className="w-full -mt-24 md:mt-0 md:z-10 md:absolute md:-bottom-16 md:left-0">
            <ProfilePhoto imageData={imageData?.resources} profile={profile} visitor={visitor} />
          </div>
        </div>
        <div className="w-1/2 ml-auto">
          <ProfileMenus posts={posts} profile={profile} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-x-2 ">
        <div className="w-full " >
         <ProfileLeft visitor={visitor} friends={profile?.friends} profile={profile?.details} imageData={imageData} />
        </div>
        <div className="w-full " >
        <ProfileRight visitor={visitor} setVisiable={setVisiable} posts={posts} profile={profile}  />
        </div>

      </div>
    </>
  );
};

export default Profile;
