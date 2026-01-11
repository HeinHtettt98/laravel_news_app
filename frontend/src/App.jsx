import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./Page/HomePage";
import { useProfileQuery } from "./store/services/endpoint/userEndpoint";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInform } from "./store/services/slice/userSlice";

const App = () => {
  const { data } = useProfileQuery();
  const dispath = useDispatch();
  useEffect(() => {
    if (data) {
      dispath(getUserInform(data));
    }
  }, [data]);
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
