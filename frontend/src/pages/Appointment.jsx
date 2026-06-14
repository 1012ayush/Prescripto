import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)  // creates a temporary variable and store the find id from the global docId
    setDocInfo(docInfo)  // it makes the find doctor to save and all info. related to present in this field .
  }

  const getAvailableSlots = async () => { // Declares a variable holding our scheduling function.and async is used as it takes time load 7 days.
    setDocSlots([])  // Clears out any old data from our time-slots array. This is a crucial reset step. If you switch from
    //  looking at Doctor A to Doctor B, you want to immediately wipe out Doctor A's calendar slots so they don't accidentally mix together.

    let today = new Date()  // it takes exact moment time , hour , date of the users screen 

    for (let i = 0; i < 7; i++) {  // 0 represents the today
      let currentDate = new Date(today)  //Creates a temporary working clock clone for our loop calculation.
      currentDate.setDate(today.getDate() + i)  //Advances our working clock forward by i days.

      // FIX: Set dynamic end time matching loop index 'i'
      let endTime = new Date();
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)   //sets the closing time .

      // Setting baseline hours safely
      if (today.getDate() === currentDate.getDate()) { //it checks whether the date we check is equals to todays date .
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10) // if less than 10 then 10 visible  otherwise current time  +1 visible .
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)  // if greater than 30 then 30 otherwise 0 ( of next hour is visible)
      } else {
        currentDate.setHours(10)  // 10 as initial time visible
        currentDate.setMinutes(0)  // 0 is starting of minutes
      }

      let timeSlots = []  // i am creating a variable which i change later .

      while (currentDate < endTime) {  // loops until night end time of 9PM  is not reached of that date .
        // FIX: Changed 'hours' to 'hour'
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  // this changed the ugly computer time in good looking

        timeSlots.push({  // Pushing the things in the tie slots .
          dateTime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return docInfo && (
    <div className="p-4 md:px-20 text-gray-600">
      {/*-------------------------------- Doctor Details ------------------------- */}
      <div className="flex flex-col sm:flex-row gap-4 ">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>

        {/*------------------------------- Doc Info: name, degree , experience -------------------- */}
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-6 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality} </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          {/*--------------- Doctors About -------------------------- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About
              <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600 ">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/*--------------------------------- Booking slots CONTAINER ----------------- */}
      {/* FIX: Corrected the wrapper tag structure and styled it properly */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
        <p className="text-lg font-semibold text-gray-800 mb-4">Booking slots</p>
        
        {/* Horizontal scroll container for the 7 days calendar view */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 pb-2 scrollbar-none">
          {
            docSlots.length > 0 && docSlots.map((item, index) => (
              <div 
                onClick={() => setSlotIndex(index)} 
                key={index} 
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-200 ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
              >
                {/* FIX: Changed lowercase 'datetime' to camelCase 'dateTime' */}
                <p className="text-xs font-bold">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p className="text-lg mt-1">{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots[slotIndex].map((item ,index)=> (
<p onClick={()=>setSlotTime(item.time) } className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white ' : 'text-gray-400 border border-gray-300'}`} key={index} >
  {item.time.toLowerCase()}
</p>
          ))}
        </div>
        <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
          Book an Appointment
        </button>
      </div> 

      {/*------------------------ Listing Related Doctors ---------------------------- */}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment