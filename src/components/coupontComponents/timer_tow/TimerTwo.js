import React from 'react'
import './TimerTwo.css'
import FlipCountdown from '@rumess/react-flip-countdown';
// import '@leenguyen/react-flip-clock-countdown/dist/index.css'
// import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown"

const TimerTwo = () => {
    const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  return (
    <div className='TimerTwo'>
        <div>
      <h1>Countdown</h1>
      <FlipCountdown
        // Pass the target date
        toDate={targetDate}
        // Optional props
        size="large" // or "small"
        hideYear
        hideMonth
        hideDay
        endAt={'2025-12-12 01:26:58'} // Date/Time
        theme='light'
        titlePosition='bottom'
        hourTitle='Hours'
        minuteTitle='Minutes'
        secondTitle='Seconds'
        

        // duration={0.5}  
        // to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
        // labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        // labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', color:'black' }}
      />
        {/* <FlipClockCountdown 
                     to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
                     labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                     labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
                     digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
                     dividerStyle={{ color: 'white', height: 1 }}
                     separatorStyle={{ color: 'black', size: '6px' }}
                     duration={0.5}
                 /> */}


    </div>
    </div>
  )
}

export default TimerTwo