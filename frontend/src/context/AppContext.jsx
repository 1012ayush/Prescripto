import { createContext, useEffect, useState } from "react"; // it basically used to create empty data pipeline
import { doctors } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext() // saved that empty pipeline with the variable and export 

const AppContextProvider = (props) => {  // it is created as if we do normal props then it creates the russian nesting doll problem . 

    const currencySymbol = '$'

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors , setDoctors] = useState([])

    const value = {
        doctors,currencySymbol  // anything we will put in the value it is broadcasted to entire application , 
    }


    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')

            if(data.success) {
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }

        }catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        getDoctorsData()
    },[])
    return (
        <AppContext.Provider value={value}> {/* .provider is the transmitter */}
            {props.children} {/* Whatever components are wrapped inside  render them right here */}
        </AppContext.Provider>
    )
}
export default AppContextProvider