import React from 'react'

const Footer =() => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return(
        <div style={footerStyle}>
            <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
        </div>
        </div>
    )

}

export default Footer;