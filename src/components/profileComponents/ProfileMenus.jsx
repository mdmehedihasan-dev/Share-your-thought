/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const ProfileMenus = ({ profile }) => {
  return (
    <div className="flex justify-end px-4 py-5 gap-x-5">
      <div className="text-center ">
        <h1 className="text-base font-gilroySemiBold">Friends</h1>
        <p className="text-base font-gilroyBold">
          {profile?.friends?.length
            ? profile?.friends?.length.toString().padStart(2, 0)
            : "0"}
        </p>
      </div>
      <div className="text-center ">
        <h1 className="text-base font-gilroySemiBold">Posts</h1>
        <p className="text-base font-gilroyBold">
          {profile?.posts?.length
            ? profile?.posts?.length.toString().padStart(2, 0)
            : "0"}
        </p>
      </div>
      <div className="text-center ">
        <h1 className="text-base font-gilroySemiBold">Followers</h1>
        <p className="text-base font-gilroyBold">
          {profile?.followers?.length.toString().padStart(2, 0)}
        </p>
      </div>
      <div className="text-center ">
        <h1 className="text-base font-gilroySemiBold">Following</h1>
        <p className="text-base font-gilroyBold">
          {profile?.following?.length.toString().padStart(2, 0)}
        </p>
      </div>
    </div>
  );
};

export default ProfileMenus;
