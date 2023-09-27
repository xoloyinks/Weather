import React, { useEffect, useState, useRef } from 'react';
import { BsThermometerHalf, BsThermometerSun} from 'react-icons/bs';
import { GiWhirlwind, GiSunRadiations } from 'react-icons/gi';
import partly from "./pages/images/pexels-pixabay-531756.jpg";
import sun from "./pages/images/pexels-lisa-fotios-1107717.jpg";
import def_back from "./pages/images/pexels-pixabay-314726.jpg";



export default function Weather() {

    const [location , setLocation] = useState([]);
    const [current , setCurrent] = useState([]);
    const [icon , setIcon] = useState([]);
    const [devCity, setDevcity] = useState("");
    const [city , setCity] = useState("");
    const [error , setError] = useState("");

    const [userLocation, setUserLocation] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

   


    // Geting User Location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })    
    })

    // Fetching user Location based on geolocation
    useEffect(() => {
        async function fetchLocation(){
            let detect_location = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_GET_LOCATION_KEY}`;
            let response = await fetch(detect_location);
            let response_data = await response.json();
            setCity(response_data[0].name);
            
        }
        fetchLocation();
   })

    // Fetching Weather conditions based on that location
    useEffect(() => {
            async function fetchData(){
                if(city === "") return;
                let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}=${city}&aqi=no`);
                let response_status = response.status;
                let data = await response.json();
                if(response_status === 200){
                    setLocation(data.location);
                    setCurrent(data.current);
                    setIcon(data.current.condition);
                    setError("");
                }else{
                    setError(data.error.message);
                }
            }
            fetchData();
    }, [city]);
        
        

    const text = icon.text;
    const uv = current.uv;
    const wind = current.wind_kph;
    var temp;
    var bg_color = "rgb(197, 183, 237)";
    var back = def_back;
    var btn_color;
    switch (uv) {
        case 0:
        case 1:
        case 2:
            temp = <BsThermometerHalf color='whitesmoke' />;
            back = partly;
            bg_color = "rgba(178, 178, 255, 0.5)";
             break;
        case 3:
        case 4:
            temp = <BsThermometerHalf color='whitesmoke' />;
            back = partly;
            bg_color = "rgba(178, 178, 255, 0.5)";
             break;
        case 5:
        case 6:
        case 7:
            temp = <BsThermometerSun color='red' />;
            back = sun;
            bg_color = "rgba(247, 255, 14, 0.3)"
            break;
        case 8:
        case 9:
        case 10:
            temp = <BsThermometerSun color='red' />;
            back = sun;
            bg_color = "rgba(247, 255, 14, 0.3)"
            break;
        
    }
  return (
    <>
    
        <section className='relative z-50 w-screen lg:h-screen h-fit'>
            
            <div className='absolute top-0 bottom-0 left-0 right-0 w-screen h-screen '>
                <img src={back} alt="img" className='w-screen h-screen'/>
            </div>
           
            <div className='absolute top-0 bottom-0 left-0 right-0 h-screen text-xl text-white backdrop-blur-lg bg-white/3'>
                <div className='md:flex md:justify-between md:items-center'>
                    <div className='z-50 px-3 py-10 max-[390px]:py-5 text-2xl font-semibold text-gray-200 max-[390px]:text-xl'>
                        Cloud x
                    </div>
                    <div className='flex flex-col gap-3 px-3 py-4 md:flex md:w-6/12 md:flex-row md:items-center'>
                        <p className='text-center md:w-9/12'><input type="text" onChange={(e) => setDevcity(e.target.value)} value={devCity} placeholder='Enter location here...' style={{backgroundColor:bg_color}} className='w-11/12 p-3 mx-auto text-sm max-[390px]:text-[11px] max-[390px]:py-2 font-bold text-black rounded input' /></p>
                       
                        <button onClick={() => setCity(devCity)} className='px-8 py-4 w-[fit-content] mx-auto bg-transparent border-2 border-white rounded-full text-sm hover:bg-white hover:text-black md:px-5 md:py-3 max-[390px]:py-2 max-[390px]:px-3 max-[390px]:text-[11px]' style={{color:btn_color}} >Check</button>
                    </div>
                </div>
                <p className='text-center mx-auto text-[11px] w-10/12  bg-black rounded-full md:w-5/12'>{error}</p>
                <br className='hidden md:block' />
                <div className='w-10/12 h-[auto] mx-auto rounded-[20px] information py-4 max-[390px]:py-2 md:w-5/12' style={{backgroundColor:bg_color }}>

                    <div className='py-3 text-2xl max-[390px]:text-xl font-bold text-center text-black md:flex md:justify-center'>
                        
                        <p>{location.name},</p>  <p className='md:ml-3'>{location.country}</p>
                    </div>
                    <div className='flex items-center justify-center icon'>
                        <span><img src={icon.icon} alt="" /></span>
                        
                    </div>
                    <div className='text-center'>
                        <span className='text-sm max-[390px]:text-[11px] font-semibold '>{text}</span>
                    </div>
                    <div className='font-bold flex items-center text-3xl max-[390px]:text-xl p-3 rounded-[20px] w-[fit-content] mx-auto'>
                        <span>
                            {temp}
                        </span>
                        <span className='pr-3 mr-3 border-r-2 border-gray'>{current.temp_c}&#8451;</span>
                        <span>{current.temp_f}&#8457;</span>
                        
                    </div>
                    <div className='text-sm max-[390px]:text-[11px] text-center'>
                        <span>{location.localtime}</span>
                    </div>
                    
                </div>
                <div className='flex items-center justify-between max-[390px]:text-[11px] max-[390px]:py-2 px-5 py-3 mx-5 mt-10 text-sm rounded-full md:w-5/12 md:mx-auto ' style={{backgroundColor:bg_color }}>
                    <span className='flex items-center'>
                        <span className='p-3 mr-2 text-xl max-[390px]:text-[11px] bg-black rounded-full'> <GiSunRadiations color='white' /></span> 
                        <span className='font-bold text-black '> UV index</span>
                    </span>
                    <span className='font-bold text-black'>{uv <= 2 ? "Low" : uv <= 7 ? "Moderate" : "High"  }</span>
                </div>
                <div className='flex items-center max-[390px]:text-[11px] max-[390px]:py-2 justify-between px-5 py-3 mx-5 mt-5 text-sm rounded-full md:w-5/12 md:mx-auto' style={{backgroundColor:bg_color }}>
                    <span className='flex items-center'>
                        <span className='p-3 mr-2 text-xl max-[390px]:text-[11px] bg-black rounded-full'> <GiWhirlwind color='white' /></span> 
                        <span className='font-bold text-black'> Wind</span>
                    </span>
                    <span className='font-bold text-black'>{wind}km/h</span>
                </div>
                <div className='absolute text-[10px] pt-6 bottom-0 left-0 right-0 text-center  text-black'>
                    <strong>&copy; XOLO 2023 </strong>
                    Powered by <strong>weatherapi.com</strong>
                </div>
            </div>
        </section>
    </>
  )
}
