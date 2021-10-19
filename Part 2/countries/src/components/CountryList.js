import React from "react";
import Country from "./Country";


const CountryList = ({render, action, weather}) => {

    if(render.length > 10){
        return(
            <div><h2>Too Many Matches Found Specify Another Filter</h2></div>
        )
    }
    else if(render.length > 1 && render.length < 10){
        return(
            <div>
                <ul>
                    {render.map(
                        country => <li key={country.name.common}>
                            {country.name.common} : <button onClick={() => action(country.name.common, country.capital[0]) }>Show</button>
                        </li>)}
                </ul>
            </div>
        )
    }
    else if(render.length === 1){
        const country = render[0]
        return(
           <Country country={country} weather={weather}/>
        )
    }
    else{
        return(
            <div>
                <h2>Search Another Country</h2>
            </div>
            
        )
    }
}

export default CountryList;