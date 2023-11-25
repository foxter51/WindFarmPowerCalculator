import React, { Fragment } from "react"
import DateComponent from "./DateComponent"

export default function ForecastPreviewBlock({ forecast }) {
    return (
        <div className="mb-2">
            {forecast.map((day, index) => (
                <Fragment key={index}>
                    <div className="d-flex">
                        <div className="fw-bold me-1">Дата:</div>
                        <DateComponent date={day.date} className="fw-bold"/>
                    </div>
                    <div className="fw-bold">Температура навколишнього середовища: {day.temp} C</div>
                    <div className="fw-bold">Швидкість вітру: {day.wind_speed} м/с</div>
                    <div className="fw-bold mb-2">Тиск: {day.pressure} кПа</div>
                </Fragment>
            ))}
        </div>
    )
}