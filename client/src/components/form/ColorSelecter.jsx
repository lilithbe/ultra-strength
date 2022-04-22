import React ,{ useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import PropTypes from 'prop-types';

import {Sketch as ColorPicker} from '@uiw/react-color'

const ColorSelecter = ({color,callback ,buttonClassName,tooltip,tooltipOptions, deleteCallback,isDeleteButton}) => {
    const op = useRef(null);
    const [colorValue, setColorValue] = useState(color)
  return (
    <div>
    <Button 
    tooltip={tooltip}
    tooltipOptions={tooltipOptions}
     className={`${buttonClassName} p-button-sm`}
        icon={"bi bi-color"}
        style={{ backgroundColor: color }}
        onClick={(e) => {
            e.preventDefault()
            op.current.toggle(e)
        }} />
    <OverlayPanel showCloseIcon ref={op} >
        <div className='card'>
        <div className='card-body p-0'>
        <ColorPicker color={color} onChange={(color)=>{
            callback(color.hexa)
            setColorValue(color.hexa)
        }} />
        </div>
        {isDeleteButton?
        <div className='card-footer'>
        <Button label="delete" className='p-button-sm p-button-dnager' icon="bi bi-trash" 
        onClick={(e)=>{
            deleteCallback(colorValue)
            op.current.hide()
      }}
      />
        <Button label="save" className='p-button-sm' icon="bi bi-save" onClick={(e)=>{
              callback(colorValue)
              op.current.hide()
        }}/>
    </div>:null}
        
        </div>
       
    </OverlayPanel>

</div>
  )
}

export default ColorSelecter

ColorSelecter.propTypes = {
    isDeleteButton: PropTypes.bool,
    deleteCallback:PropTypes.func,
  };

  ColorSelecter.defaultProps = {
    isDeleteButton:false,
    deleteCallback:()=>{}
  };