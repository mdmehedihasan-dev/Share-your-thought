/* eslint-disable react/prop-types */

import { useState } from "react";

const Photos = ({ imageData }) => {
  const [showMore , setShowMore] = useState(false)
  const photoCount = () => {
    const total_count = imageData?.total_count || 0;
    return total_count === 0
      ? "0 Photos"
      : total_count === 1
      ? "1 Photo"
      : `${total_count} Photos`;
  };


  const handleShowPhotos =()=>{
    setShowMore((prev)=>!prev)
  }

  return (
    <div className="w-full p-2 mt-5 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-sm font-gilroyMedium ">Photos</h1>
          <span className="text-sm text-primary_bg font-gilroySemiBold ">
            {photoCount()}
          </span>
        </div>
       {
        imageData?.resources?.length > 4 && 
        <button onClick={handleShowPhotos} className="px-3 py-1 border rounded-full border-black-2 font-gilroyBold">
        {showMore ? 'show less' : 'show more'}
      </button>
       }
      </div>
      <div className="grid grid-cols-2 gap-3">
        {imageData?.resources &&
          imageData?.resources.length &&
          imageData?.resources.slice(0,showMore ? imageData.resources.length : 4).map((img, i) => (
            <img key={i} src={img.secure_url} />
          ))}
      </div>
    </div>
  );
};

export default Photos;
