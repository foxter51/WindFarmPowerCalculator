import React, { useState } from "react"
import CitySelectionBlock from "./main blocks/CitySelectionBlock"
import WindFarmPassportForm from "./main blocks/WindFarmPassportForm"
import WindFarmPowerCalculationBlock from "./main blocks/WindFarmPowerCalculationBlock"

export default function AppContent() {

    const [forecast, setForecast] = useState([])
    const [windFarmPassport, setWindFarmPassport] = useState([])
    const [rotorArea, setRotorArea] = useState(0)

    return (
        <div>
            <CitySelectionBlock
                setForecast={setForecast}
            />
            { forecast.length > 0 &&
                <WindFarmPassportForm
                setWindFarmPassport={setWindFarmPassport}
                setRotorArea={setRotorArea}
                />
            }
            { forecast.length > 0 && windFarmPassport.length > 1 && rotorArea > 0 &&
                <WindFarmPowerCalculationBlock
                    forecast={forecast}
                    windFarmPassport={windFarmPassport}
                    rotorArea={rotorArea}
                />
            }
        </div>
    )
}