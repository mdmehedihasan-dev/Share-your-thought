import { Outlet, useLocation } from "react-router-dom";
import LeftPart from "../components/HomeComponents/LeftPart";
import RightPart from "../components/HomeComponents/RightPart";
import Header from "../components/HomeComponents/PostHome/Header";

const RootLayOut = () => {
  const location = useLocation()
 
  return (
    <div className="grid gap-x-5 mx-5 grid-cols-1 xl:mx-10 mt-5 lg:grid-cols-[70px,1fr] xl:grid-cols-[1fr,3fr,1fr] ">
      <div className="sticky left-0 hidden top-4 h-[calc(100vh-60px)] lg:block">
        <LeftPart />
      </div>
      <div>
        <div className="sticky top-0 left-0 z-10">
          <Header location={location} />
        </div>
      <Outlet />
      </div>
      <div  className="hidden sticky left-0  top-4 h-[calc(100vh-60px)] xl:block">
        <RightPart />
      </div>
    </div>
  );
};

export default RootLayOut;
