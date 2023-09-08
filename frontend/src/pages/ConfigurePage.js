import { useEffect, useState } from 'react';
import "./ConfigurePage.css"
import * as api from '../api';

function ConfigureBot(){

    const [configData,setConfigData]=useState({});

    useEffect(()=>{
        // const jwtToken = localStorage.getItem('token');
        // axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        // const url='http://localhost:5000';
    
        api.getBotConfig()
        .then((response)=>{
            setConfigData(response.data);
            console.log(response);
            console.log(configData);
            localStorage.setItem('checkboxStatus',JSON.stringify(response.data));
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])

    const storedCheckBoxStatus=JSON.parse(localStorage.getItem('checkboxStatus'));
    // console.log(storedCheckBoxStatus);

    const [checkboxStatus,setCheckboxStatus]=useState(storedCheckBoxStatus);
    console.log(checkboxStatus);

    const submitHandler=async (event)=>{
        event.preventDefault();
        console.log(event);
        await api.postBotConfig(checkboxStatus)
        
        await api.getBotConfig()
        .then((response)=>{
            localStorage.setItem('checkboxStatus',JSON.stringify(response.data));
            alert('Bot configuration successfully saved.');
        })
    }

    const checkboxChangeHandler=(key)=>{
        const newCheckboxStatus={...checkboxStatus};
        newCheckboxStatus[key].isIncluded=!checkboxStatus[key].isIncluded;
        setCheckboxStatus(newCheckboxStatus);
        console.log('new checkbox status',checkboxStatus);
    }


    return <div id='configure-container'>
    <div id='configure-card'>
    <h2>Configure your bot</h2>
    <p>Select the weather properties to be included in the alert </p>
    <form onSubmit={submitHandler}>
        <ul className='weather-properties'>
        {Object.keys(configData).map((key)=>(
        
        <li key={key}>
            <label htmlFor={configData[key].name}>{configData[key].name}</label>
            <input type='checkbox' id={configData[key].name} checked={checkboxStatus[key].isIncluded} onChange={()=>checkboxChangeHandler(key)}></input>
        </li>
        ))}
        </ul>
        <div id='button-container'>
            <button>Apply Changes</button>
        </div>
        
    </form>
    </div>
    </div>
    
}

export default ConfigureBot;