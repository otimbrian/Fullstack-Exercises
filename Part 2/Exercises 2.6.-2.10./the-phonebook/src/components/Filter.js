import React from 'react'

const Filter = ({infor,formVal, handler}) => {
    return(
        <div>
            {infor} : <input value={formVal} onChange={handler}/>
        </div>
    )
}

export default Filter;