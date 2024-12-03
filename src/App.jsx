import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/registration";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Login from "./pages/login";
import NotloggedIn from "./privateRoute/NotloggedIn";
import LoggedInUser from "./privateRoute/LoggedInUser";
import RootLayOut from "./RootLayOut";
import ActivatePage from "./pages/home/ActivatePage";
import ForgetPassword from "./pages/forgetPassword";
import CreatePostPopUp from "./components/HomeComponents/PostHome/createPostPopup";
import { useState } from "react";
import { useGetAllPostsQuery } from "./features/api/authApi";
import Profile from "./pages/userProfile";
import Friends from "./pages/friends";
import NotFound from "./pages/notfound";

function App() {

  const [visiable,setVisiable] = useState(false)
  const {data:posts} = useGetAllPostsQuery()


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUser />}>
          <Route element={<RootLayOut />}>
            <Route path="/" element={<Home setVisiable={setVisiable} posts={posts} />}></Route>
            <Route path="/activate/:token" element={<ActivatePage/>}></Route>
          <Route path="/profile" element={<Profile posts={posts} setVisiable={setVisiable} />}></Route>
          <Route path="/profile/:username" element={<Profile/>}></Route>
          <Route path="/friends" element={<Friends/>} ></Route>
          </Route>
          <Route path="*" element={<NotFound/>} />


        </Route>
        <Route element={<NotloggedIn />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="/forget" element={<ForgetPassword/>} />
      </Route>
    )
  );

  return (
    <>

    {
      visiable && 
     <CreatePostPopUp  setVisiable={setVisiable}/>
    }
      <RouterProvider router={router} />
    </>
  );
}

export default App;
