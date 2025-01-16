import React, { useState, useContext } from 'react';
import "./list.css";
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from "../../hooks/useFetch";
import { SearchContext } from '../../context/SearchContext';

function List() {
  const location = useLocation();
  
  // Initialize states with location data
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [dates, setDates] = useState(location.state?.dates || [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });
  const [openOptions, setOpenOptions] = useState(false); // Control the visibility of the options
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const { dispatch } = useContext(SearchContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleClick = () => {
    // Update the state and perform the search action
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    reFetch();
  };
  

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input 
                type="text" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                placeholder="Enter your destination"
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <span onClick={() => setOpenOptions(!openOptions)} className="lsOptionText">
                {`${options.adult} adult . ${options.children} children . ${options.room} room`}
              </span>
              {openOptions && (
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <div className="lsOptionCounter">
                      <button 
                        disabled={options.adult <= 1} 
                        className="lsOptionCounterButton" 
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="lsOptionCounterNumber">{options.adult}</span>
                      <button 
                        className="lsOptionCounterButton" 
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <div className="lsOptionCounter">
                      <button 
                        disabled={options.children <= 0} 
                        className="lsOptionCounterButton" 
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="lsOptionCounterNumber">{options.children}</span>
                      <button 
                        className="lsOptionCounterButton" 
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <div className="lsOptionCounter">
                      <button 
                        disabled={options.room <= 1} 
                        className="lsOptionCounterButton" 
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="lsOptionCounterNumber">{options.room}</span>
                      <button 
                        className="lsOptionCounterButton" 
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* New section for Min and Max price inputs */}
            <div className="lsItem">
              <label>Price Range (per night)</label>
              <div className="lsPriceRange">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price</span>
                  <input 
                    type="number" 
                    onChange={(e) => setMin(e.target.value)} 
                    className="lsOptionInput" 
                    placeholder=""
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price</span>
                  <input 
                    type="number" 
                    onChange={(e) => setMax(e.target.value)} 
                    className="lsOptionInput" 
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading" : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
