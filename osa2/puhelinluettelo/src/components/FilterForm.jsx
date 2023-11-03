const FilterForm = ({ value, handler }) => {
  return (
    <div>
      filter with <input value={value} onChange={handler} />
    </div>
  )
}

export default FilterForm
