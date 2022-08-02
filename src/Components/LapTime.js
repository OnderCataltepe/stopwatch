import styles from "./LapTime.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertTimeFunc } from "../redux/TimeSlice";
const LapTime = ()=>{
    const lapValue = useSelector(state=>state.timeReducer.lapValue);
    const isLap = useSelector(state=>state.timeReducer.isLap);
    const [showLapTime,setShowLapTime]= useState({
        mSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    });

    useEffect(()=>{
        setShowLapTime(()=>convertTimeFunc(lapValue))
    },[lapValue])

    return( isLap &&
        <div className={styles.timeDiv}>
            <h3>{showLapTime.hours}:{showLapTime.minutes}:{showLapTime.seconds}.{showLapTime.mSeconds}</h3>
        </div>
    )
}
export default LapTime;