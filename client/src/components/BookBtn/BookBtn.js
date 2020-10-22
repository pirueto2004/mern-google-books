import React from "react"
import "./BookBtn.css"

const BookBtn = props => (
  <button className={`book-btn btn-${props.btntype} btn-lg`} {...props}>
    {props.children}
  </button>
)

export default BookBtn
