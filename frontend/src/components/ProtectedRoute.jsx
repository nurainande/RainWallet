import { useEffect } from "react";
import { message } from "antd";
// import { GetUserInfo } from "../apicalls/users";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute(props) {
  const {user,ReloadUser} = useSelector(state=>state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(user)

  const getData = async () => {
    try {
      const response = await GetUserInfo();
      console.log(response)
      if (response.success) {
        console.log(response.data)
        dispatch(setUser(response.data))
        // dispatch(ReloadUser(false))
      } else {
        navigate('/login')
        message.error(response.message);
      }
      dispatch(ReloadUser(false))
    } catch (error) {
        navigate('/login')
      message.error(error.message);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
        if(!user){
            getData();
        }
    }else{
        navigate('/login');
    }
  }, []);

  useEffect(() => {
    if(ReloadUser){
    getData();
    }
  }, [ReloadUser]);
 
  return user && (
  <div>
    <DefaultLayout>
      {props.children}
    </DefaultLayout>
  </div>
    );
}

export default ProtectedRoute;
