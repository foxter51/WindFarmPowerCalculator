import React, { useState } from "react"
import weatherService from "../service/weatherService"
import LoadingEffect from "./LoadingEffect"
import ForecastPreviewBlock from "./ForecastPreviewBlock"

export default function ForecastFetchBlock({ lat, lon, dateStart, dateEnd, setForecast }) {

    const [forecastPreview, setForecastPreview] = useState([])

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchForecast = async (lat, lon) => {
        try{
            setLoading(true)

            const response = await weatherService.getDailyForecast(lat, lon)

            const { startDate, endDate } = getFormattedDatesRange()
            const { firstIndexToPick, lastIndexToPick } = getFirstAndLastDateIndex(startDate, endDate)

            const dailyForecast = extractForecast(response, firstIndexToPick, lastIndexToPick, startDate)

            setForecastPreview(dailyForecast)
            setForecast(dailyForecast)
        } catch (error) {
            setError(error.response.data.message)
        }
        setLoading(false)
    }

    const extractForecast = (response, firstIndexToPick, lastIndexToPick, startDate) => {
        const dailyForecast = []

        let cycleDate = new Date()
        cycleDate.setDate(startDate.getDate() - 1)

        let dateIndex = 0
        let hourIndex = 0

        const hours = [0, 3, 6, 9, 12, 15, 18, 21]

        for (let i = firstIndexToPick; i < lastIndexToPick; i++) {
            if(dateIndex % 8 === 0) {  // next day
                cycleDate = getNewDateInstance(cycleDate, 1, 0)
                hourIndex = 0
            }

            cycleDate = getNewDateInstance(cycleDate, 0, hours[hourIndex])  // next time range

            const dayForecast = response.data.list[i]  //time range forecast

            dailyForecast.push({
                date: cycleDate,
                temp: dayForecast.main.temp,
                wind_speed: Number(dayForecast.wind.speed.toFixed(2)),
                pressure: dayForecast.main.pressure / 10
            })

            dateIndex++
            hourIndex++
        }

        return dailyForecast
    }

    const getNewDateInstance = (date, days, hours) => {
        const newDate = new Date()

        newDate.setDate(date.getDate() + days)
        newDate.setHours(hours, 0, 0, 0)

        return newDate
    }

    const getFirstAndLastDateIndex = (startDate, endDate) => {
        const currDate = new Date()
        currDate.setHours(0, 0, 0, 0)

        const diffTimeBetweenStartAndCurrDate = startDate.getTime() - currDate.getTime()
        const firstIndexToPick = diffTimeBetweenStartAndCurrDate / (1000 * 60 * 60 * 24) * 8

        const diffTimeBetweenEndAndCurrDate = endDate.getTime() - currDate.getTime()
        const lastIndexToPick = diffTimeBetweenEndAndCurrDate / (1000 * 60 * 60 * 24) * 8 + 8

        return { firstIndexToPick, lastIndexToPick }
    }

    const getFormattedDatesRange = () => {
        const startDate = new Date(dateStart)
        const endDate = new Date(dateEnd)

        startDate.setHours(0, 0, 0, 0)
        endDate.setHours(0, 0, 0, 0)

        return { startDate, endDate }
    }

    if(loading) {
        return <LoadingEffect/>
    }

    return (
        <div>
            {error}

            {forecastPreview?.length === 0 &&
                <button className="btn btn-primary" onClick={() => fetchForecast(lat, lon)}>Отримати прогноз</button>
            }

            {forecastPreview?.length !== 0 &&
                <div>
                    <button className="btn btn-danger mb-2" onClick={() => {setForecastPreview([]); setForecast([])}}>Очистити</button>
                    <ForecastPreviewBlock
                        forecast={forecastPreview}
                    />
                </div>
            }
        </div>
    )
}