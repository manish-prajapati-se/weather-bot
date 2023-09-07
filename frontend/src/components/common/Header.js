import './Header.css';
import CloudIcon from '@mui/icons-material/Cloud';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate,Link} from 'react-router-dom';

function Header(){
    const dispatch=useDispatch();

    const isAuthenticated=useSelector((state)=>state.authReducer.isAuthenticated);
    
    
    const navigate=useNavigate();

    function logoutHandler(){
        try{
            dispatch({type:'LOGOUT'});
            navigate('/login');

        }catch(error){
            console.log(error);
        }
    }


    return (
        <nav className="navbar">
        <div><CloudIcon/><h1>WeatherBOT</h1></div>
        <ul className="nav-list">
            {!isAuthenticated && <li className='nav-item'><Link to='/login'>Login</Link></li>}
            {isAuthenticated &&<li className="nav-item"><Link to='/configure'>Configure Bot</Link></li>}
            {isAuthenticated &&<li className="nav-item"><Link to='/users'>Manage Users</Link></li>}
            {isAuthenticated && <li className="nav-item logout"><Link to='/login' className="logout" onClick={logoutHandler}>Logout</Link></li>}
        </ul>
        </nav>
    )
}

export default Header;
