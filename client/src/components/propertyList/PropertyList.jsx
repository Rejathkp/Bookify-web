import React from 'react'
import "./propertyList.css"
import useFetch from '../../hooks/useFetch.js'

function PropertyList() {

    const { data, loading, error } = useFetch("/hotels/countByType")

    const images = [
        "https://cf.bstatic.com/xdata/images/hotel/square600/361061113.webp?k=3332d82055beea44a9fd401095ac7548b1edf637c68a68aacb4c87096f89fe8f&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/449946773.webp?k=d34550dc378bacdd44c483905ae7653cf58baf00254ed6e5722974e42de1343a&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/63526409.webp?k=7ee8fb71ff34b0a2bafa4038d443b459dab2d185818fe288b7a92ef1a3cfeb1a&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/472036509.webp?k=2c3f80f6f276045d369034b168e1f49d2d7c9de83c1d4913f365c8740b1ce79e&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/464507617.webp?k=1989210f34b9f2aa4a325f375e9ee355dd0e5fbf3c89f906efae1471b24ef2a2&o=",
    ]

  return (
    <div className='pList'>
        { loading ? (
            "loading"
        ) : (
        <>
            {data && images.map((img,i) =>(           
                <div className="pListItem" key={i}>
                    <img src={img}
                    alt="" 
                    className="pListImg" />
                    <div className="pListTitles">
                        <h1>{data[i]?.type}</h1>
                        <h2>{data[i]?.count} {data[i]?.type}</h2>
                    </div>
                </div>
            ))}
        </>
        )}
    </div>
  )
}

export default PropertyList