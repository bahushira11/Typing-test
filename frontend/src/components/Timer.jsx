import react from "react";
import { useState,useRef,useEffect } from "react";

function Timer(props){
    const [lapsed,setLapsed]=useState(Date.now());
    const intervalid=useRef(null);
    const [isrunning,setIsrunning]=useState(false);
    const starttime=useRef(0);
    const stop=props.limit*60*1000;

    useEffect(()=>{
        

        if (isrunning){
            intervalid.current=setInterval(()=>{
                setLapsed(Date.now()-starttime.current);
            },10)
        }
        return ()=>{clearInterval(intervalid.current)}

    },[isrunning])


    return(
        <>
        <span>{formatTime()}</span>
        </>
    )

}