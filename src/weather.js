import React, { useEffect, useState } from 'react';
import { BsThermometerHalf } from 'react-icons/bs'
import cloud_1 from './pages/images/clouds-svgrepo-com(1).svg';
import cloud_2 from './pages/images/hand-drawn-clouds-svgrepo-com.svg';
import cloud_3 from './pages/images/ufo-or-airplane-frontal-outline-between-clouds-svgrepo-com.svg';

export default function Weather() {

    const [location , setLocation] = useState([]);
    const [current , setCurrent] = useState([]);
    const [icon , setIcon] = useState([]);

    useEffect(() => {
        fetch("https://api.weatherapi.com/v1/current.json?key=c379f3114aa5430bbc7165817231303&q=Canada&aqi=no")
        .then(res => res.json())
        .then((data) => {
            setLocation(data.location);
            setCurrent(data.current);
            setIcon(data.current.condition)
    })
    } ,[])
  return (
    <>
        {/* <div className='cloud_1 z-20 absolute'>
            <img src={cloud_1} alt="" className='w-[200px] h-[200px]' />
        </div>
        <div className='cloud_2 z-10 absolute'>
            <img src={cloud_2} alt="" className='w-[50px] h-[50px] drop-shadow-lg ' />
        </div>
        <div className='cloud_3 z-30 absolute'>
            <img src={cloud_3} alt="" className='w-[50px] h-[50px] drop-shadow-lg ' />
        </div> */}
        <section className='relative z-50 w-screen h-screen'>
            <div className='section absolute top-0 bottom-0 left-0 right-0'></div>
            <div className='absolute top-0 bottom-0 left-0 right-0 backdrop-blur-lg text-xl text-white bg-white/3'>
                <div className=' px-3 py-4 text-2xl z-50 font-semibold'>
                    Cloud x
                </div>
                <br />
                <div className='w-10/12 h-[40%] mx-auto rounded-[20px] information '>

                    <div className='text-black font-bold text-2xl text-center py-3'>
                        {location.name}, {location.country}
                    </div>
                    <div className='flex items-center justify-center'>
                        <span><img src={icon.icon} alt="" /></span>
                        
                    </div>
                    <div className='font-bold flex items-center text-3xl p-3 rounded-[20px] w-[fit-content] mx-auto'>
                        <span><BsThermometerHalf color='red' className='mx-auto mb-5 text-5xl' /> </span>
                        <span className='border-r-2 border-gray pr-3 mr-3'>{current.temp_c}&#8451;</span>
                        <span>{current.temp_f}&#8457;</span>
                    </div>
                    {/* <div className='text-center'>
                        <span className='font-semibold text-3xl  '>{current.condition.text}</span>
                    </div> */}
                </div>
            </div>
        </section>
    </>
  )
}
