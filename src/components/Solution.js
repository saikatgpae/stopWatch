// import { time } from 'console';
import React, { useRef, useState } from 'react';


function Solution() {
    const [min, setMin] = useState('00');
    const [sec, setSec] = useState('00');
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


    // Handle the Start button
    const start = () => {
        setInterval(() => {
            setSec((prevCount) => {
                return String(parseInt(prevCount) + 1).padStart(2, '0');
            });
          }, 1000);
        
    }

    // Handel button
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
        <button>PAUSE / RESUME</button>
        <button onClick={reset}>RESET</button>
  
        <h1 data-testid="running-clock">{min}:{sec}</h1>
      </div>
    );
  }
  
  export default Solution;
  