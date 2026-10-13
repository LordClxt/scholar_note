import React from 'react'
import { Checkbox } from './ui/checkbox'

const CheckBoxComponent = ({text, value, onChange}:{text:string, value:boolean, onChange:()=>void}) => {
  return (
    <div className="flex items-center space-x-2">
            <Checkbox onClick={onChange} checked={value} id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {text}
            </label>
          </div>
  )
}

export default CheckBoxComponent