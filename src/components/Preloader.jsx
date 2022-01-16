import React from 'react';
import preloader from './../assets/img/preloader.gif'

const Preloader = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img style={{width: 'calc(1vw + .6em)'}} src={preloader}/>
        </div>
    )
}

export default Preloader;