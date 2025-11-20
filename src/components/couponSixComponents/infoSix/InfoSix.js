import React from 'react'
import './InfoSix.css'
const InfoSix = ({ data }) => {
    const countries = data?.pluckCountries;
    const language = data?.data?.language;
  return (
    <div className='InfoSix'>
        <div className='info'>
            <h6>
                اخر استخدام
            </h6>
            <span>منذ 1 دقيقة</span>
        </div>
        <div className='info'>
            <h6>
                حالة الكوبون
            </h6>
            <span>فعال</span>
        </div>
        <div className='info'>
            <h6>
                متاح في
            </h6>
            <span>{countries}</span>
        </div>
    </div>
  )
}

export default InfoSix