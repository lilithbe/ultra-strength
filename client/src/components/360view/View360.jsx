import React from 'react'
import ThreeSixty from 'react-360-view-lilith'
import styled from 'styled-components'
const ThreeView = styled.div`
max-width: 835px;
 max-height: 835px;
  margin:0 auto;
 
  canvas{
    width: 150%;
        height: 150%;
        display: block;
        object-fit: cover;
  }

`

const View360 = ({ url,fullscreen,isWheelZoom }) => {
  return (
    <ThreeView>
      <ThreeSixty
      fullscreen={fullscreen}
      isWheelZoom={isWheelZoom}
        spinReverse={false}
        amount={14}
        imagePath={url}
        fileName="{index}.png"
        loog={3}
      />
    </ThreeView>

  )
}

export default View360