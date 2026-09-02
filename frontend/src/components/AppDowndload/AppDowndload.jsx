import React from 'react'
import './AppDowndload.css'
import { assets } from '../../assets/assets'

const AppDowndload = () => {
  return (
    <div className='app-downdload' id='app-downdload'>
      <p>For better Experience Download <br/> Tomato App</p>
      <div className="app-downdload-pateforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDowndload
