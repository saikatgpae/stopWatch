// import { time } from 'console';
import React, { useRef, useState } from 'react';


function Solution() {
    const [min, setMin] = useState('00');
    const [sec, setSec] = useState('00');
    const minInput = useRef(null);
    const secInput = useRef(null);

    // Always get the minutes value
    const minutesValue = (value) => {
        // const value = minInput.current.value;
        if (value < 10){
            setMin(String(value).padStart(2, '0'))
        }
        else if (value > 59) {
            const nValue = Math.floor(value/60);
            const remainSec = value % 60;
            setMin(String(nValue).padStart(2, '0'));
            setSec(String(remainSec).padStart(2, '0'));
        }
        else {
            setMin(value);
        }
    }

    // Handel the clicking of Reset button
    const reset = () => {
        setMin('00');
        setSec('00');
        minInput.current.value = '';
        secInput.current.value = '';
    }

    const start = () => {
        // setInterval(setSec(parseInt(sec) + 1), 1000);
    }

    // Handel min input onChange
    const handleMin = (event) => {
        const { value } = event.target;
        setSec('00')
        if (value < 10){
            setMin(String(value).padStart(2, '0'))
        }
        else if (value > 59) {
            const nValue = Math.floor(value/60);
            const remainSec = value % 60;
            setMin(String(nValue).padStart(2, '0'));
            setSec(String(remainSec).padStart(2, '0'));
        }
        else {
            setMin(value);
        }
    }


    // Handel the second input onChange
    const handsec = (event) => {
        const { value } = event.target;
        if (value < 59){
            setSec(String(value).padStart(2, '0'));
            setMin(String(minInput.current.value).padStart(2, '0'));
            minutesValue(minInput.current.value);
        } 
        
        else if (value > 59) {
            const nValue = Math.floor(value/60);
            const reminder = value % 60;
            if (reminder < 10) {
                setSec('0' + reminder);
                setMin(parseInt(min) + nValue)
            } else {
                setSec(reminder);
            }
        }
        
        else {
            setSec(value);
        }
    };

    return (
      <div className='p-4'>
        <label>
          <input type="number" onChange={handleMin} min={0} ref={minInput} autoFocus />
          Minutes
        </label>
        <label>
          <input type="number" onChange={handsec} min={0} ref={secInput} />
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
  