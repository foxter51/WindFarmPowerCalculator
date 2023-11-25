import React, { useState } from "react"
import DateComponent from "../DateComponent"
import regression from "regression"

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
        // const approximation = getApproximationFunction(windFarmPassport)

        const windFarmPowers = []

        for (const timeForecast of forecast) {
            const windSpeed = timeForecast.wind_speed
            const densityIndex = forecast.indexOf(timeForecast)
            const density = densitiesAtMoment[densityIndex]

            let currentPower = 0

            // Find matching wind speed range in passport
            const passportEntry = windFarmPassport.slice(1, windFarmPassport.length).find(entry => +entry.wind_speed === windSpeed)

            currentPower = passportEntry ? +passportEntry.power : (0.5 * density * rotorArea)

            windFarmPowers.push(+(currentPower.toFixed(2)))
        }

        setWindFarmPowersAtMoment(windFarmPowers)
    }

    // function getApproximationFunction(windFarmPassport) {
    //
    //     const farmPassport = structuredClone(windFarmPassport)
    //     farmPassport.shift()
    //
    //     // Витягуємо дані для побудови апроксимації
    //     const points = farmPassport.map(item => ([item.wind_speed, item.power]))
    //
    //     // Ступінь поліному для апроксимації
    //     // Можна змінювати для підлаштування
    //     const degree = 3
    //
    //     // Будуємо поліном
    //     const result = regression.polynomial(points, {order: degree})
    //     const coefficients = result.equation
    //
    //     // Повертаємо функцію для обчислення апроксимованої потужності
    //     return (windSpeed) => {
    //
    //         // Обчислюємо значення поліному в заданій точці
    //         let approximatedPower = 0
    //         for (let i = 0; i <= degree; i++) {
    //             approximatedPower += coefficients[i] * Math.pow(windSpeed, degree - i)
    //         }
    //
    //         return approximatedPower
    //     }
    // }

    const calcWindFarmPowerSum = () => {
        const powerSum = windFarmPowersAtMoment.reduce((acc, power) => acc + power, 0).toFixed(2)
        setWindFarmPowerSum(powerSum)
    }

    const calcWindFarmPowerAvg = () => {
        const powerAvg = +(windFarmPowerSum / forecast.length).toFixed(2)
        setWindFarmPowerAvg(powerAvg)
    }

    const calcWindFarmEnergyProduced = () => {
        setWindFarmEnergyProduced(windFarmPowerSum * 3)
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
                                <td>{forecast.wind_speed}</td>
                                <td>{windFarmPowersAtMoment[index]}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Потужність за період</td>
                            <td></td>
                            <td>{windFarmPowerAvg}</td>
                        </tr>
                        <tr>
                            <td>Прогноз виробництва електроенергії</td>
                            <td></td>
                            <td>{windFarmEnergyProduced}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}