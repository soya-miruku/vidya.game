import { classNames } from "../common/helpers"

export const VButton = ({children, rounded=true, special=false, primary=false, secondary=false, className, onClick=undefined, ...props}) => {
  return (
    <button 
    className={classNames('text-white py-3 px-10 font-normal shadow-md',
    special ? 'bg-gradient-to-r from-accent-dark-200 to-accent-light-100' : '',
    primary ? 'bg-primary-100' : '',
    secondary ? '' : '',
    rounded ? 'rounded-[10px]' : '',
    className)}
    onClick={onClick} 
    {...props}> {children} </button>
  )
}