import { PulseLoader } from "react-spinners";

/* eslint-disable react/prop-types */
const Editbio = ({ infos,max,handleUpdateInfos,loading, setShowBio, handleChange, placeholder }) => {
  return (
    <>
      <div>
        <textarea
          onChange={handleChange}
          value={infos?.[name]}
          placeholder={placeholder}
          // name={name}
          className="box-border w-full h-24 p-1 text-sm border rounded-md outline-none resize-none border-line_color font-gilroyNormal text-secondary_color"
          maxLength="100"
        />
         <div className="mb-3 text-right">
          <span className="text-sm font-gilroyNormal text-secondary_color">
            {infos && `${max} Character Remaining`}
          
          </span>
        </div>

        <div className="mb-3 text-right">
          <span className="text-sm font-gilroyNormal text-secondary_color"></span>
        </div>
        <div className="flex justify-end gap-x-2">
          <button
            onClick={() => setShowBio(false)}
            className="px-4 py-2 text-sm text-black border rounded-full border-2-black font-gilroyBold"
          >
            Cancel
          </button>
          <button disabled={loading} onClick={()=>handleUpdateInfos()} className="px-4 py-2 text-sm text-white bg-black rounded-full font-gilroyBold">
             {loading ?  <PulseLoader color="#fff" size={5} /> : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Editbio;
