import CountryDetails from "./CountryDetails"

const Countries = ({ countries, queryHandler }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }
  return (
    <div>
      {countries.map(country =>
        <div key={country.name.common}>
          {country.name.common} <button onClick={() => queryHandler(country.name.common)}>show</button>
        </div>
      )}
    </div>
  )
}

export default Countries
