import app from '@/app/Shared/firebaseConfig'
import React, { useEffect } from 'react'
import PinItem from './PinItem'

const PinList = ({ listOfPins }) => {

    console.log(listOfPins)

    return (

        <div className='gap-5 m-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5'>

            {listOfPins.map((item, index) => (

                <div key={index}>
                    <PinItem pin={item} />
                </div>

            ))}

        </div>
    )
}

export default PinList