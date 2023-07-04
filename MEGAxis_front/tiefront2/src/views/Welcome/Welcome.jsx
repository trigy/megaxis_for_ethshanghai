import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import '../Welcome/Welcome.css'
import image from '../../assets/background/abc.png'

import PlusGPT from '../PlusGPT/PlusGPT copy'

const Welcome = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={image} alt="Background" />
      </div>
      <div className="chat-container">
        <PlusGPT />
      </div>
    </div>
  )
}

export default Welcome
