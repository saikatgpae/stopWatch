/* eslint-disable */
import React, { useRef, useState } from 'react';
import './Solution.css';

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
    const totalSeconds = parseInt(mntvalue, 10) * 60 + parseInt(secvalue, 10);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainSeconds = totalSeconds % 60;
    setMin(String(totalMinutes).padStart(2, '0'));
    setSec(String(remainSeconds).padStart(2, '0'));
  };

  // start stop watch function
  const startWatch = () => {
    setSec((prevCount) => {
      if (parseInt(prevCount, 10) === 59) {
        setMin((prevCoun) => String(parseInt(prevCoun, 10) + 1).padStart(2, '0'));
        setSec('00');
      }
      return String(parseInt(prevCount, 10) + 1).padStart(2, '0');
    });
  };

  // Start the stop watch
  const start = () => {
    const newIntervalId = setInterval(startWatch, 1000);
    setIntervalId(newIntervalId);
  };

  // Pause the stop watch
  // const pauseStopatch = () => {
  //   // console.log('paused');
  //   if (intervalId) {
  //     clearInterval(intervalId);
  //     setIntervalId(0);
  //     return;
  //   }
  //   const newIntervalId = setInterval(startWatch, 1000);
  //   setIntervalId(newIntervalId);
  // };

  // Handel Reset button
  const reset = () => {
    setMin('00');
    setSec('00');
    minInput.current.value = '';
    secInput.current.value = '';
  };

  // Handel min and sec inputs onChange
  const handleInputs = () => {
    manageInputValues(minInput.current.value, secInput.current.value);
  };

  return (
    <div className="main p-4">
      <label>
        <input className="min" type="number" onChange={handleInputs} min={0} ref={minInput} autoFocus />
        <br />
        Minutes
      </label>
      <label>
        <input className="sec" type="number" onChange={handleInputs} min={0} ref={secInput} />
        <br />
        Seconds
      </label>
      <br />
      <br />
      <button className="start m-2" onClick={start} type="button">START</button>
      <button className="pause m-2" onClick={pauseStopatch} type="button">PAUSE / RESUME</button>
      <button className="reset m-2" onClick={reset} type="button">RESET</button>
      <br />
      <h1 className="display" data-testid="running-clock">
        {min}
        :
        {sec}
      </h1>
    </div>
  );
}

export default Solution;
