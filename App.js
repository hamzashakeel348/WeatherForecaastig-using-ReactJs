import React,{useState} from 'react';


const api={
  key:"ba50a51737545110e97566ec102bb897",
  base:"https://api.openweathermap.org/data/2.5/"
}
const datebuilder=(d)=>{
  let months=["Jan,uary","February","March","April","May","June","July","August","september","october","November","December"];
  let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day=days[d.getDay()];
  let date=d.getDate();
  let month=months[d.getMonth()];
  let year=d.getFullYear();
  return `${day} ${date} ${month} ${year}`
}


function App() {
  const[Query,setQuery]= useState('');
  const[weather,setweather]=useState({});
  const search = evt=>{
  if(evt.key==="Enter")
  {
    fetch(`${api.base}weather?q=${Query}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(result =>{
      setweather(result);
      setQuery('');
      console.log(result);
  });
  }
  }
  return (
    <div className="App">
      <main>
        <div className="Searchbox">
          <input
          type="text"
          className="Searchbar"
          placeholder="Search."
          onChange={e=>setQuery(e.target.value)}
          value={Query}
          onKeyPress={search}
          />
        </div>
 {(typeof weather.main !="undefined")?(
     <div>
     <div className="Locationbox">
  <div className="Location">{weather.name}, {weather.sys.country}</div>
  <div className="date">{datebuilder(new Date())}</div>
  </div>
      <div className="weatherbox">
 <div className="temperature">{Math.round(weather.main.temp)}°c</div>
 <div className="others">FeelsLike:    {weather.main.feels_like}
 </div>
 <div className="others">WindSpeed:{weather.wind.speed}
 </div>
 <div className="others">
 Pressure:{weather.main.pressure}
  
 </div>
 <div className="others">
 Humidity:{weather.main.humidity}
  
 </div>
 <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>
      ):('')}
      </main>
      </div>
     
  );
}

export default App;
