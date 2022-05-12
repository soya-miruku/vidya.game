export const CounterComponent = ({value, onChange, isValid}) => {
  return (
    <div className='flex flex-wrap space-x-2 flex-col'>
      <h1 className="font-bold"> Current order {value}</h1>
      <button style={{backgroundColor: '#7133a1', color: 'white'}} className='p-2' onClick={(e) => onChange(value? value < -10 ? 2 : value-=1 : 1)}>Down</button>
      <button style={{backgroundColor: '#b356b8', color: 'white'}} className='p-2' onClick={(e) => onChange(value? value >= 10 ? 1 : value+=1 : 1)}>Up</button>
    </div>
  )
}