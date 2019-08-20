import React from "react";

const Jumbotron = ({ children }) => (
  <div className="jumbotron jumbotron-fluid blue-grey lighten-5 text-center py-5 px-0 my-0" >
  {/* <div className="jumbotron jumbotron-fluid text-dark text-bold text-center py-5 px-0 my-0" style={{ backgroundImage: `url(books.png)`, backgroundPosition: 'center', backgroundRepeat: 'no reapeat', backgroundSize: 'contain'}}> */}
  {/* <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${bg-img})`, backgroundSize: 'cover' }}> */}
    <div 
      style={{ height: 200, clear: "both", paddingTop: 20, paddingBottom: 20, textAlign: "Center"}}
      className="container my-5">
      {children}
    </div>
  </div>
);

export default Jumbotron;