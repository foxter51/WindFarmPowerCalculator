import React, { useState } from "react"
import DateComponent from "../DateComponent"

export default function WindFarmPowerCalculationBlock({ forecast, windFarmPassport, rotorArea }) {

    const [densitiesAtMoment, setDensitiesAtMoment] = useState([])
    const [windFarmPowersAtMoment, setWindFarmPowersAtMoment] = useState([])
    const [windFarmPowerSum, setWindFarmPowerSum] = useState(0)
    const [windFarmPowerAvg, setWindFarmPowerAvg] = useState(0)
    const [windFarmEnergyProduced, setWindFarmEnergyProduced] = useState(0)

    const calc = () => {
        calcDensitiesAtMoment()
        calcWindFarmPowersAtMoment()
        calcWindFarmPowerSum()
        calcWindFarmPowerAvg()
        calcWindFarmEnergyProduced()
    }

    const calcDensitiesAtMoment = () => {
        const densities = []
        const R = 8.314
        const M = 29

        for(const timeForecast of forecast) {
            const density = (timeForecast.pressure * M) / (R * (timeForecast.temp + 273.15))
            densities.push(density)
        }

        setDensitiesAtMoment(densities)
    }
    const calcWindFarmPowersAtMoment = () => {
        const windFarmPowers = []

        for (const timeForecast of forecast) {
            const windSpeed = timeForecast.wind_speed
            const densityIndex = forecast.indexOf(timeForecast)
            const density = densitiesAtMoment[densityIndex]

            const approxPower = getPower(windSpeed)

            windFarmPowers.push(approxPower)
        }

        setWindFarmPowersAtMoment(windFarmPowers)
    }

    const getPower = (windSpeed) => {

        if(windSpeed < windFarmPassport[0].wind_speed) {
            return 0
        }

        let maxPower = windFarmPassport[windFarmPassport.length - 1].power

        for(let i = 0; i < windFarmPassport.length - 1; i++) {

            let lower = windFarmPassport[i]
            let upper = windFarmPassport[i+1]

            if(windSpeed >= lower.wind_speed && windSpeed < upper.wind_speed) {
                const fraction = (windSpeed - lower.wind_speed) / (upper.wind_speed - lower.wind_speed)
                return +lower.power + (+upper.power - +lower.power) * fraction
            }
        }

        return maxPower
    }

    const calcWindFarmPowerSum = () => {
        const powerSum = windFarmPowersAtMoment.reduce((acc, power) => acc + +power, 0)
        setWindFarmPowerSum(powerSum)
    }

    const calcWindFarmPowerAvg = () => {
        const powerAvg = +(+windFarmPowerSum / forecast.length)
        setWindFarmPowerAvg(powerAvg)
    }

    const calcWindFarmEnergyProduced = () => {
        setWindFarmEnergyProduced(+windFarmPowerSum * 3)
    }

    return (
        <div>
            <div className="h2">
                Розрахунок потужності вітроелектростанції та прогнозу виробництва електроенергії за
                <div className="d-flex justify-content-between">
                    <DateComponent
                        date={forecast[0].date}
                        className="h2"
                    />
                    <div className="h2">
                        -
                    </div>
                    <DateComponent
                        date={forecast[forecast.length - 1].date}
                        className="h2"
                    />
                </div>
            </div>
            <div>
                <button className="btn btn-primary" onClick={calc}>Розрахувати</button>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Швидкість вітру м/с</th>
                            <th>Потужність ВЕУ кВт</th>
                        </tr>
                        </thead>
                        <tbody>
                        {forecast.map((forecast, index) => (
                            <tr key={forecast}>
                                <td><DateComponent date={forecast.date}/></td>
                                <td>{Number(forecast.wind_speed).toFixed(2)}</td>
                                <td>{Number(windFarmPowersAtMoment[index]).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Потужність за період</td>
                            <td></td>
                            <td>{Number(windFarmPowerAvg).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Прогноз виробництва електроенергії</td>
                            <td></td>
                            <td>{Number(windFarmEnergyProduced).toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}