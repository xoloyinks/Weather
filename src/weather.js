import React, { useEffect, useState } from 'react';
import { BsThermometerHalf, BsThermometerSun, BsThermometerSnow, BsThermometerLow } from 'react-icons/bs';
import { GiWhirlwind, GiSunRadiations } from 'react-icons/gi';
import cloud_1 from './pages/images/clouds-svgrepo-com(1).svg';
import cloud_2 from './pages/images/hand-drawn-clouds-svgrepo-com.svg';
import cloud_3 from './pages/images/ufo-or-airplane-frontal-outline-between-clouds-svgrepo-com.svg';
import partly from "./pages/images/pexels-pixabay-531756.jpg";
import snow from "./pages/images/pexels-burak-the-weekender-1978126.jpg";
import sun from "./pages/images/pexels-lisa-fotios-1107717.jpg";
import rain from "./pages/images/pexels-jack-redgate-2929290.jpg";
import thunder from "./pages/images/pexels-andre-furtado-1162251.jpg";
import moderate_rain from "./pages/images/pexels-artem-saranin-1202841.jpg";


export default function Weather() {

    const [location , setLocation] = useState([]);
    const [current , setCurrent] = useState([]);
    const [icon , setIcon] = useState([]);
    const [devCity, setDevcity] = useState("");
    const [city , setCity] = useState("Lagos");

    useEffect(() => {
        if(city === "") return;
        fetch(`https://api.weatherapi.com/v1/current.json?key=c379f3114aa5430bbc7165817231303&q=${city}&aqi=no`)
        .then(res => res.json())
        .then((data) => {
            setLocation(data.location);
            setCurrent(data.current);
            setIcon(data.current.condition)
    })
    } ,[city])
    const text = icon.text;
    const uv = current.uv;
    const wind = current.wind_kph;
    var temp;
    var bg_color;
    var back;
    var btn_color;
    switch (text) {
        case "Partly cloudy":
            temp = <BsThermometerHalf color='whitesmoke' />;
            back = partly;
            bg_color = "rgba(178, 178, 255, 0.5)";
            // btn_color = "white";
            break;
        case "Clear":
            temp = <BsThermometerHalf color='whitesmoke' />;
            back = partly;
            bg_color = "rgba(178, 178, 255, 0.5)";
            // btn_color = "white";
             break;
        case "Patchy light snow":
            temp = <BsThermometerSnow />;
            back = snow;
            bg_color = "rgba(255, 255, 255 , 0.5)";
            btn_color = "black";
            break;
        case "Sunny":
            temp = <BsThermometerSun color='red' />;
            back = sun;
            bg_color = "rgba(247, 255, 14, 0.3)"
            break;
        case "Light rain":
        case "Thundery outbreaks possible":
        case "Moderate or heavy rain with thunder":
        case "Patchy rain possible":
        case "Light rain shower":
            temp =<BsThermometerLow />;
            back = rain;
        case "Moderate rain":
            temp =<BsThermometerLow />;
            back = moderate_rain;
        case "Patchy light rain with thunder":
            temp =<BsThermometerLow />;
            bg_color = "rgba(93, 138, 192, 0.8)";
            // btn_color = ;
            back = thunder;
    }
  return (
    <>
        <section className='relative z-50 w-screen h-screen'>
            <div className='absolute top-0 bottom-0 left-0 right-0'><img src={back} alt="img" className='w-screen h-screen'/></div>
            <div className='absolute top-0 bottom-0 left-0 right-0 backdrop-blur-lg text-xl text-white bg-white/3'>
                <div className=' px-3 py-4 text-2xl z-50 font-semibold'>
                    Cloud x
                </div>
                <br />
                <div className='px-3 py-4 flex flex-col gap-3'>
                    <p><input type="text" onChange={(e) => setDevcity(e.target.value)} value={devCity} placeholder='Enter location here...' style={{backgroundColor:bg_color}} className='input p-3 text-sm text-black font-bold w-full rounded' /></p>
                    <button onClick={() => {setCity(devCity)}} className='px-8 py-4 w-[fit-content] mx-auto bg-transparent border-2 border-white rounded-full text-sm hover:bg-white hover:text-black' style={{color:btn_color}} >Check</button>
                </div>
                <div className='w-10/12 h-[auto] mx-auto rounded-[20px] information py-4 ' style={{backgroundColor:bg_color }}>

                    <div className='text-black font-bold text-2xl text-center py-3'>
                        {location.name} <br /> {location.country}
                    </div>
                    <div className='icon flex items-center justify-center'>
                        <span><img src={icon.icon} alt="" /></span>
                        
                    </div>
                    <div className='text-center'>
                        <span className='font-semibold text-sm  '>{text}</span>
                    </div>
                    <div className='font-bold flex items-center text-3xl p-3 rounded-[20px] w-[fit-content] mx-auto'>
                        <span>
                            {temp}
                        </span>
                        <span className='border-r-2 border-gray pr-3 mr-3'>{current.temp_c}&#8451;</span>
                        <span>{current.temp_f}&#8457;</span>
                        
                    </div>
                    <div className='text-sm text-center'>
                        <span>{location.localtime}</span>
                    </div>
                    
                </div>
                <div className='px-5 py-3 text-sm mt-10 mx-5 rounded-full flex justify-between items-center ' style={{backgroundColor:bg_color }}>
                <span className='flex items-center'>
                        <span className='rounded-full p-3 bg-black mr-2 text-xl'> <GiSunRadiations color='white' /></span> 
                        <span className='text-black font-bold'> UV index</span>
                    </span>
                    <span className='font-bold text-black'>{uv <= 2 ? "Low" : uv <= 7 ? "Moderate" : "High"  }</span>
                </div>
                <div className='px-5 py-3 text-sm mt-5 mx-5 rounded-full flex justify-between items-center' style={{backgroundColor:bg_color }}>
                    <span className='flex items-center'>
                        <span className='rounded-full p-3 bg-black mr-2 text-xl'> <GiWhirlwind color='white' /></span> 
                        <span className='text-black font-bold'> Wind</span>
                    </span>
                    <span className='font-bold text-black'>{wind}km/h</span>
                </div>
            </div>
        </section>
    </>
  )
}
