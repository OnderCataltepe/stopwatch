import styles from "./Time.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertTimeFunc } from "../redux/TimeSlice";
const Time = ()=>{
    const timeValue = useSelector(state=>state.timeReducer.timeValue);
    const [showTime,setShowTime]= useState({
        mSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    });

    useEffect(()=>{
        setShowTime(()=>convertTimeFunc(timeValue))
    },[timeValue])

    return(
        <div className={styles.timeDiv}>
            <h2>{showTime.hours}:{showTime.minutes}:{showTime.seconds}.{showTime.mSeconds}</h2>
        </div>
    )
}
export default Time;