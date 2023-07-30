import React, { useRef, useState } from 'react';


function Solution() {
    const [min, setMin] = useState('00');
    const [sec, setSec] = useState('00');
    const [intervalId, setIntervalId] = useState(0);
    const minInput = useRef(null);
    const secInput = useRef(null);

    // Manage inputs
    const manageInputValues = (mntvalue, secvalue) => {
        mntvalue === '' ? mntvalue = 0 : mntvalue = mntvalue;
        secvalue === '' ? secvalue = 0 : secvalue = secvalue;
        const totalSeconds = parseInt(mntvalue) * 60 + parseInt(secvalue);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const remainSeconds = totalSeconds % 60;
        setMin(String(totalMinutes).padStart(2, '0'));
        setSec(String(remainSeconds).padStart(2, '0'));
    }


    // start stop watch function
    const startWatch = () => {
        setSec((prevCount) => {
            if (parseInt(prevCount) === 59) {
                setMin((prevCoun) => {
                    return String(parseInt(prevCoun) + 1).padStart(2, '0');
                });
                setSec('00');
            }
            return String(parseInt(prevCount) + 1).padStart(2, '0');
        });      
    }

    // Start the stop watch
    const start = () => {
        const newIntervalId = setInterval(startWatch, 1000);
        setIntervalId(newIntervalId);
    }

    // Pause the stop watch
    const pauseStopatch = () => {
        console.log('paused');
        if(intervalId) {
          clearInterval(intervalId);
          setIntervalId(0);
          return;
        }
        const newIntervalId = setInterval(startWatch, 1000);
        setIntervalId(newIntervalId);
    };

    // Handel Reset button
    const reset = () => {
        setMin('00');
        setSec('00');
        minInput.current.value = '';
        secInput.current.value = '';
    }


    // Handel min and sec inputs onChange
    const handleInputs = () => {
        manageInputValues(minInput.current.value, secInput.current.value);
    }

    return (
      <div className='p-4'>
        <label>
          <input type="number" onChange={handleInputs} min={0} ref={minInput} autoFocus />
          Minutes
        </label>
        <label>
          <input type="number" onChange={handleInputs} min={0} ref={secInput} />
          Seconds
        </label>
  
        <button onClick={start}>START</button>
        <button onClick={pauseStopatch}>PAUSE / RESUME</button>
        <button onClick={reset}>RESET</button>
  
        <h1 data-testid="running-clock">{min}:{sec}</h1>
      </div>
    );
  }
  
  export default Solution;
  