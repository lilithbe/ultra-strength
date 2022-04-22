import React from 'react'
import ThreeSixty from 'react-360-view-lilith'
import styled from 'styled-components'
const ThreeView = styled.div`
max-width: 835px;
 max-height: 835px;
  margin:0 auto;
  .v360-fullscreen-toggle{
    display:none;
  }
  canvas{
    width: 150%;
        height: 150%;
        display: block;
        object-fit: cover;
  }

`



const TestView360 = ({url}) => {
    
  return (
    <ThreeView>
      <ThreeSixty
        spinReverse={false}
        amount={14}
        imagePath={url}
        fileName="{index}.png"
        loog={3}
        isWheelZoom={false}
      />
    </ThreeView>
  )
}

export default TestView360