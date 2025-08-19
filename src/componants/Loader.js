 import React from 'react';
 import '../styles/loader.css';

 const Loader = ({ size = 40 }) => {
   return (
     <div className="loader-wrapper" role="status" aria-label="Loading">
       <div className="loader" style={{ width: size, height: size }} />
     </div>
   );
 };

 export default Loader;


