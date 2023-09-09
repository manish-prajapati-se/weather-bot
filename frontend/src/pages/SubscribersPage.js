import { useEffect,useState} from 'react';
import './SubscribersPage.css';
import * as api from '../api';

function SubscribersPage(){
    const [subscribers,setSubscribers]=useState({});

    useEffect(()=>{
        api.getSubscribers()
        .then((response)=>{
            console.log(response.data);
            setSubscribers(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    return (
    <div id='subscriber-container'>
    <div id='subscriber-card'>
    <h2>See who has subscribed to your bot</h2>
    {Object.keys(subscribers).map((key)=>(
        <div class='subscriber'>
        <div class='subscriber-image'>
            <img src={subscribers[key].profilePictureURL}></img>
        </div>
        <div class="grid-container">
        <div class="grid-item">
            <p class='heading'>First Name</p>
            <p>{subscribers[key].firstName}</p>
        </div>
        <div class="grid-item">
            <p class='heading'>Last Name</p>
            <p>{subscribers[key].lastName}</p>
        </div>
        <div class="grid-item">
            <p class='heading'>Subscriber ID</p>
            <p>{key}</p>
        </div>
        <div class="grid-item">
            <p class='heading'>Location</p>
            <p>{subscribers[key].location}</p>
        </div>
    </div>
    </div>
    ))}
    
    </div>
    </div>
    )
}

export default SubscribersPage;