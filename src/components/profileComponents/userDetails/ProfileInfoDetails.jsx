/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Job } from "../../../svg/Job";
import { Location } from "../../../svg/Location";
import { HomeIcon } from "../../../svg/Home";
import { Learning } from "../../../svg/Learning";
import { Love } from "../../../svg/Love";
import { Instagram } from "../../../svg/Instagram";
import Editbio from "./Editbio";
import { useUpdateDetailsMutation } from "../../../features/api/authApi";

const ProfileInfoDetails = ({ profile, visitor }) => {
  const [details,setDetails] = useState(profile)
  const initialState = {
    bio: details?.bio ? details.bio : "",
    othername: details?.othername ? details.othername : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    currentcity: details?.currentcity
      ? details.currentcity
      : "",
    hometown: details?.hometown ? details.hometown : "",
    college: details?.college ? details.college : "",
    highschool: details?.highschool
      ? details.highschool
      : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initialState);
  const [showBio, setShowBio] = useState(false);
  const [loading, setLoading] = useState(false);

  const [max, setMax] = useState(100);
  const [updateDetails] = useUpdateDetailsMutation()


  const handleChange =(e)=>{
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  }

  useEffect(()=>{
    setDetails(profile)
    setInfos(profile)
  },[profile])

  const handleUpdateInfos = async ()=>{
    setLoading(true)
    try {
      const result = await updateDetails({infos}).unwrap()
      setDetails(result)
      setLoading(false)
      console.log(result)
      setShowBio(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {!showBio && (
        <div className="mb-3 text-center">
          {details?.bio && (
            <p className="mb-3 text-base text-black font-gilroyMedium">
              {details?.bio}
            </p>
          )}
          {!visitor && !details?.bio && (
            <button
              className="w-full py-1 mb-3 text-base text-black rounded-md bg-white-100 font-gilroySemiBold"
              onClick={() => setShowBio(true)}
            >
              Add Bio
            </button>
          )}
          {!visitor && details?.bio && (
            <button
              className="w-full py-1 mb-3 text-base text-black rounded-md bg-white-100 font-gilroySemiBold"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}

      {showBio && (
        <div>
          <Editbio infos={infos} setShowBio={setShowBio} handleChange={handleChange}
            name="bio"
            max={max}
            loading={loading}
            handleUpdateInfos={handleUpdateInfos}
            placeholder="Add your bio" />
        </div>
      )}

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <Job />
        </div>
        <div>
          {details?.job && details?.workplace ? (
            <span className="text-sm text-black font-gilroyNormal">
              Works as a <b>{details?.job}</b> at <b>{details?.workplace}</b>
            </span>
          ) : details?.job && !details?.workplace ? (
            <span className="text-sm text-black font-gilroyNormal">
              Works as a <b>{details?.job}</b>
            </span>
          ) : !details?.job && details?.workplace ? (
            <span className="text-sm text-black font-gilroyNormal">
              Works at <b>{details?.workplace}</b>
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Work place & job
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <Location />
        </div>
        <div>
          {details?.currentcity ? (
            <span className="text-sm text-black font-gilroyNormal">
              Lives in <b>{details?.currentcity}</b>
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Current city
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <HomeIcon />
        </div>
        <div>
          {details?.hometown ? (
            <span className="text-sm text-black font-gilroyNormal">
              From <b>{details?.hometown}</b>
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Home Town
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <Learning />
        </div>
        <div>
          {details?.college ? (
            <span className="text-sm text-black font-gilroyNormal">
              Studied at <b>{details?.college}</b>
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Add School or College
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <Learning />
        </div>
        <div>
          {details?.highschool ? (
            <span className="text-sm text-black font-gilroyNormal">
              Studied at <b>{details?.highschool}</b>
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Add High School
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <Love />
        </div>
        <div>
          {details?.relationship ? (
            <span className="text-sm text-black font-gilroyNormal">
              {details?.relationship}
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Relationship status
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3 gap-x-2">
        <div className="text-secondary_color">
          <Instagram />
        </div>
        <div>
          {details?.instagram ? (
            <span className="text-sm text-black font-gilroyNormal">
              {details?.instagram}
            </span>
          ) : (
            <span className="text-sm text-black font-gilroyNormal">
              Instagram account
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoDetails;
