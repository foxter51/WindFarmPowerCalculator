import React from "react"
import ForecastFetchBlock from "./ForecastFetchBlock"

export default function SelectionPreviewBlock({ city, lat, lon }) {
    return (
        <div>
            <div className="mb-2">
                <div className="fw-bold">Обране місто: {city}</div>
                <div className="fw-bold">Широта: {lat}</div>
                <div className="fw-bold">Довгота: {lon}</div>
            </div>
        </div>
    )
}