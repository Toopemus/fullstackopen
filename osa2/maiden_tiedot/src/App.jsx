import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import countriesService from './services/countriesService'

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
        .then(responseCountries => setCountries(responseCountries))
  }, [])

  const handleQueryInput = (event) => {
    setQuery(event.target.value)
  }

  const filterCountries = (countries) => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )
    return filtered
  }

  return (
    <div>
      find countries <input value={query} onChange={handleQueryInput} />
      
      <Countries countries={filterCountries(countries)} queryHandler={setQuery} />
    </div>
  )
}

export default App
