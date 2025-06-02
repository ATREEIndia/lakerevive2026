'use client'
import { error } from "console";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type languageprobs={
    isEng: boolean;
    setisEng: (m:boolean)=>void;

}

export const Languagecontex=createContext< languageprobs | undefined>(undefined);

export const Languageprovider=({children}:{children:ReactNode})=>{

    const [isEng,setisEng]=useState(true);

    useEffect(()=>{
        console.log('Current langauge is= '+ isEng)

    },[isEng])


    return <Languagecontex.Provider value={{isEng, setisEng}}>{children}</Languagecontex.Provider> 

}

export const currentlanguage=()=>{
    const language=useContext(Languagecontex);

    if( language === undefined){
        throw new Error('Language is undefined')
    }

    return language;

}

