/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";
import PostHome from "../../components/HomeComponents/PostHome";
import ReAuth from "../../components/reAuth";
import { useSelector } from "react-redux";
import ShowPost from "../../components/HomeComponents/PostHome/showPost";

const Home = ({setVisiable,posts}) => {
  const { userInfo } = useSelector((state) => state.registration);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {userInfo.verified == false && <ReAuth userInfo={userInfo} />}
      <PostHome setVisiable={setVisiable} posts={posts} />
      <div className="mt-5">
     {posts?.map((item, i) => (
        <ShowPost key={i} post={item} />
      ))}
     </div>
    </>
  );
};

export default Home;
