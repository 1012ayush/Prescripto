import { createContext } from "react"; // it basically used to create empty data pipeline
import { doctors } from "../assets/assets";

export const AppContext = createContext() // saved that empty pipeline with the variable and export 

const AppContextProvider = (props) => {  // it is created as if we do normal props then it creates the russian nesting doll problem . 

    const currencySymbol = '$'

    const value = {
        doctors,currencySymbol  // anything we will put in the value it is broadcasted to entire application , 
    }

    return (
        <AppContext.Provider value={value}> {/* .provider is the transmitter */}
            {props.children} {/* Whatever components are wrapped inside  render them right here */}
        </AppContext.Provider>
    )
}
export default AppContextProvider