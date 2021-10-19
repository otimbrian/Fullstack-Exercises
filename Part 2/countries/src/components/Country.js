import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Country = ({country}) => {
    const [weather, setweather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const location = country.capital[0]

    useEffect(
        () => {
          console.log(location)
            axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`).then(
                response => {
                    console.log(response.data)
                    setweather(response.data)
                    
                }
            )
        }
    )
    return(
        <div>
                <div><h2>{country.name.common}</h2></div>
                <div>
                    <p>Capial : {country.capital[0]}</p>
                    <p>Population : {country.population}</p>
                </div>
                <div>
                    <h4>Languages</h4>
                    <div>
                        <ul>
                            {Object.values(country.languages).map(language => <li>{language}</li>)}
                        </ul>
                    </div>
                    <div>
                        <img alt='' src={country.flags.png} />
                    </div>
                    <div>
                        <h4>Weather in {country.capital[0]}</h4>
                        <div>
                            <h5>Temperature : {weather.current.temperature}</h5>
                        </div>
                        <div>
                            <img alt='' src={weather.current.weather_icons[0]}/>
                        </div>
                        <div>
                            <h6>Wind</h6>
                            <p>{weather.current.wind_speed} kmph</p>
                            <h6>Direction</h6>
                            <p>{weather.current.wind_dir}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Country;