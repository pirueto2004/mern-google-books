import React from "react"
import "./BookBtn.css"

const BookBtn = props => (
  <button className={`btn book-btn btn-${props.btntype}`} {...props}>
    {props.children}
  </button>
)

export default BookBtn
