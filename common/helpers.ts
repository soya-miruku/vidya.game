export const groupByKey = (list, key, {omitKey=false}) => list.reduce((hash, {[key]:value, ...rest}) => ({...hash, [value]:( hash[value] || [] ).concat(omitKey ? {...rest} : {[key]:value, ...rest})} ), {})
export const classNames = (...classes) => classes.filter(Boolean).join(' ');
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
