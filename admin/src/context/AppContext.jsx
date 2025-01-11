import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const calculateAge = (dob) =>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }
    const slotDateFormat = (slotDate) => {

    }
    const value = {
        calculateAge,
        slotDateFormat
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider