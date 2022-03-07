import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountriesToShow = (props) => {
  if (props.filter == "") {
    return (
      <>
      </>
    )
  }
  else if (props.countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (props.countries.length == 1) {
    return (
      <>
      <TheOne country={props.countries[0]}/>
      </>
    )
  }
  else {
    return (
    <>
      {props.countries.map(country=><IndividualCountry key={country.name.common} country={country}/>)}
    </>
    )
  }
}


const IndividualCountry = (props) => {
  const[state, setState] = useState(false)

  return (
    <div>
      {props.country.name.common} 
      <button onClick={()=>setState(!state)}>show</button>
      {state && <TheOne country={props.country}/>}
    </div>
  )
}

const TheOne = (props) => {

  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <div>capital {props.country.capital}</div>
      <div>area {props.country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(props.country.languages).map(language=><li key={language}>{language}</li>)}
      </ul>
      <img src={props.country.flags.png} />
      <Weather capital={props.country.capital}/>
    </div>
  )
}

const Weather = (props) => {
  const [weather, setWeather] = useState(
    {
      main: {
        temp: 'none'
      },
      weather: [
        {
          icon: '01n'
        }
      ],
      wind: {
        speed: 'none'
      }
    }
  )

  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect (() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&units=metric&appid=${api_key}`)
      .then(response=>{
        setWeather(response.data)
      })
  }, [])

  let temp = weather.main.temp
  let icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  let wind_speed = weather.wind.speed

  return (
  <div>
    <h2>Weather in {props.capital}</h2>
    <p>temperature {temp} Celsius</p>
    <img src={icon_url} alt="Weather icon"></img>
    <p>wind {wind_speed} m/s</p>
  </div>
  )
  
}


const App = () => {
  const[countries, setCountries] = useState([])
  const[newCountry, setNewCountry] = useState("")

  useEffect (() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response=>{
        setCountries(response.data)
      })
  }, [])

  const handleNewCountry = (event) => {
    setNewCountry(event.target.value)
  }

  const filterCountries = countries.filter(country=>country.name.common.toUpperCase().includes(newCountry.toUpperCase()))

  return (
    <div>
      <div>find countries <input value={newCountry} onChange={handleNewCountry}/></div>
      <div>
        <CountriesToShow key="countriesToShow" countries={filterCountries} filter={newCountry}/>
      </div>
    </div>
  );
}

export default App;
