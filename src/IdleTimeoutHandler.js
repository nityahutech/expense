import React, { useEffect } from 'react';
import moment from 'moment'
import { notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const IdleTimeOutHandler = (props) =>{
    const navigate = useNavigate();
    let timer = undefined
    const events= ['click','load','keydown'];
    
    const eventHandler = (eventType) => {
        localStorage.setItem('lastInteractionTime', moment().format("x"))
        if (timer) {
            startTimer();
        }
    };

    const notify = () => {
        notification.open({
            message: "Idle Session",
            description: "Your session has been inactive for more than 5 hours. Please login once again.",
            duration: 3,
            icon: <LoadingOutlined />,
            onClose: () => {
                removeEvents();
                clearTimeout(timer);
                navigate("/");
                localStorage.removeItem('lastInteractionTime')
            }
        })
    }
    
    useEffect(() => {
        localStorage.setItem('lastInteractionTime', moment().format("x"))
        addEvents();
        return (() => {
            removeEvents();
            clearTimeout(timer);
        })
    }, [])
    
    const startTimer = () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            let lastInteractionTime = JSON.parse(localStorage.getItem('lastInteractionTime'))
            const diff = moment.duration(moment().diff(moment(lastInteractionTime, "x")));
            // console.log(lastInteractionTime);
            if (diff._milliseconds < 5*3600000) {
                startTimer();
            } else {
                notify()
            }
        }, 5*3600000+1000)
    }

    const addEvents=()=>{
        events.forEach(eventName => {
            window.addEventListener(eventName, eventHandler)
        })
        startTimer();
    }
    
    const removeEvents=()=>{
        events.forEach(eventName=>{
            window.removeEventListener(eventName, eventHandler)
        })
    };
    
    return
        
}
    
export default IdleTimeOutHandler;