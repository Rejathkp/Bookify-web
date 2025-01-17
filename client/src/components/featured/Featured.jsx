// import React from 'react'
// import "./featured.css"
// import useFetch from '../../hooks/useFetch.js'

// function Featured() {

//   const { data, loading, error } = useFetch("/hotels/countByCity?cities=delhi,bangalore,mumbai")

//   return (
//     <div className='featured'>
//         {loading ? (
//           "Loading please wait"
//         ) : (
//         <>
//         <div className="featuredItem">
//           <img 
//           src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" 
//           alt="" 
//           className="featuredImg" />
//           <div className="featuredTitles">
//             <h1>Delhi</h1>
//             <h2>{data[0]} properties</h2>
//           </div>
//         </div>
//         <div className="featuredItem">
//           <img 
//           src="https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" 
//           alt="" 
//           className="featuredImg" />
//           <div className="featuredTitles">
//             <h1>Bangalore</h1>
//             <h2>{data[1]} properties</h2>
//           </div>
//         </div>
//         <div className="featuredItem">
//           <img 
//           src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" 
//           alt="" 
//           className="featuredImg" />
//           <div className="featuredTitles">
//             <h1>Mumbai</h1>
//             <h2>{data[2]} properties</h2>
//           </div>
//         </div>
//       </>
//       )}

//     </div>
//   )
// }

// export default Featured




import React from 'react';
import "./featured.css";
import useFetch from '../../hooks/useFetch.js';

function Featured() {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=delhi,bangalore,mumbai");

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : error ? (
        <div>Error loading data</div>
      ) : (
        <>
          <div className="featuredItem">
            <img 
              src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" 
              alt="Delhi" 
              className="featuredImg" 
            />
            <div className="featuredTitlesBelow">
              <h1>Delhi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img 
              src="https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" 
              alt="Bangalore" 
              className="featuredImg" 
            />
            <div className="featuredTitlesBelow">
              <h1>Bangalore</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img 
              src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" 
              alt="Mumbai" 
              className="featuredImg" 
            />
            <div className="featuredTitlesBelow">
              <h1>Mumbai</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured;
