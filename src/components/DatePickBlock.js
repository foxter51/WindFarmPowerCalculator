import React from "react"

export default function DatePickBlock({ setDateStart, setDateEnd }) {
    const minDate = new Date()
    const maxDate = new Date(minDate.getTime() + (5 * 24 * 60 * 60 * 1000))

    return (
        <div className="mb-2">
            <div className="h2">Оберіть дату</div>

            <label className="form-label" htmlFor="date1">Дата початку</label>
            <input type="date" className="form-control" id="date1" onChange={(e) => setDateStart(e.target.value)}
                   min={minDate.toISOString().split("T")[0]} max={maxDate.toISOString().split("T")[0]}
            />

            <label className="form-label" htmlFor="date2">Дата кінця</label>
            <input type="date" className="form-control" id="date2" onChange={(e) => setDateEnd(e.target.value)}
                   min={minDate.toISOString().split("T")[0]} max={maxDate.toISOString().split("T")[0]}
            />
        </div>
    )
}