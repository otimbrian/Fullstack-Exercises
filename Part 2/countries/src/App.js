import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'



const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  const actionOnclick = (name, capital) => {
      console.log(name)
      setSearch(name)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = countries.filter(
    function (country) {
          return country.name.common.toLowerCase().includes(search.toLowerCase())
      }
    )

  const render = search === ''
      ? []
      : filteredCountries

  useEffect(
    () => {
      axios.get('https://restcountries.com/v3.1/all').then(
        response => {
          console.log(response.data)
          setCountries(response.data)
        }
      )
    }, []
  )
  
  
  return(
    <div>
        <div>
            <form>
                <div>
                    Find Countries By name : <input value = {search} onChange={handleSearchChange} />
                </div>
            </form>
        </div>
      <div>
            <CountryList render={render} action={actionOnclick} />
      </div>
    </div>
  )
}

export default App;
