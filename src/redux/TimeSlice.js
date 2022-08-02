import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
    name: "time",
    initialState: {
        isStarted: false,
        isStopped: false,
        isLap: false,
        overallTimes: [0],
        timeValue: 0,
        lapValue: 0,
        stoppedTime: 0,
        stoppedLapTime:0,
    },
    reducers:{
        start: (state,action)=>{
            state.isStarted = true;
            state.timeValue = action.payload;
            state.lapValue = action.payload -state.overallTimes[state.overallTimes.length-1];
        },
        stop: (state,action)=>{
            state.isStopped = true;
            state.stoppedTime = state.timeValue;
            state.stoppedLapTime = state.lapValue;
        },
        resume: (state,action)=>{
            state.isStopped =false;
            state.timeValue = state.stoppedTime + action.payload
            state.lapValue = action.payload -state.overallTimes[state.overallTimes.length-1] + state.stoppedTime;
        },
        lap: (state,action)=>{
            state.isLap =true;
            state.overallTimes.push(state.timeValue);
        },
        reset: (state,action)=>{
            state.isStarted = false;
            state.isStopped = false;
            state.isLap = false;
            state.timeValue = 0;
            state.stoppedTime = 0;
            state.lapValue = 0;
            state.overallTimes = [0];
        }
    }
});

export default timeSlice.reducer;
export const timeActions= timeSlice.actions;

export const convertTimeFunc = (dataMs)=>{
    return  {
            mSeconds: `00${Math.floor(dataMs % 1000)}`.slice(-3),
            seconds: `0${Math.floor((dataMs/1000)) % 60}`.slice(-2),
            minutes: `0${Math.floor(dataMs/60000) % 60}`.slice(-2),
            hours: `0${Math.floor(dataMs/3600000) % 24}`.slice(-2),
        } 
};