import React from 'react'
import sc from './MyButton.module.scss'

const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className={sc.button}>{children}</button>
  )
}

export default MyButton