import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute=({children})=>{
    // const user=localStorage.getItem('token');
    let location = useLocation();
    // console.log(user);
    const isAuthenticated=useSelector((state)=>state.authReducer.isAuthenticated);
    
    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children;

};

export default ProtectedRoute;