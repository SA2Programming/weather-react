/* 
1. Import React and hooks DONE
2. API details stored DONE
3. useState hooks for input and weather DONE
4. function for event handling when Entered
5. Date Builder function DONE
6. searchbox class with inputs
7. 
*/
import React, { useState } from 'react'

/*const API = {
	base: 'https://api.openweathermap.org/data/2.5/',
	key: 'b320b89c320743f2793a7b10750e9ad3'
} */
export default function App() {
	const [query, setQuery] = useState('')
	const [weather, setWeather] = useState({})

	const dateBuilder = d => {
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		
		let day = days[d.getDay()]
		let month = months[d.getMonth()]
		let date = d.getDate()
		let year = d.getFullYear()

		return `${day} ${date} ${month} ${year}`
	}

	const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=b320b89c320743f2793a7b10750e9ad3`)
				.then(res => res.json())
				.then(result => {
					setWeather(result)
					setQuery('')
					console.log(result)
				}) 
		} 
	}


  return (
    <div className={(typeof weather.main !='undefined') ? (typeof weather.main.temp > 15) ? 'app warm' : 'app' : 'app' }>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="City Name..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="location-box">
        <div className="location">{weather.name} {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}
