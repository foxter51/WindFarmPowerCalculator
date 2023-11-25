import React, { useEffect, useState } from "react"
import PassportRow from "../PassportRow"

export default function WindFarmPassportForm({ setWindFarmPassport, setRotorArea }) {

    const [passportRows, setPassportRows] = useState([])
    const [rotorSquare, setRotorSquare] = useState(0)

    useEffect(() => {
        if(passportRows.length === 0) {
            setPassportRows([
                {
                    id: -1,
                    wind_speed: "",
                    power: ""
                }
            ])
        }
        setWindFarmPassport(passportRows)
    }, [passportRows.length])

    return (
        <div className="mb-3">
            <div className="h2">Паспортна характеристика потужності</div>

            <label htmlFor="rotorSquare" className="form-label">Площа перетину ротора вітроустановки (м^2):</label>
            <input type="number"
                   id="rotorSquare"
                   value={rotorSquare}
                   className="form-control"
                   min="0"
                   onChange={(e) => {setRotorSquare(+e.target.value); setRotorArea(+e.target.value)}}
            />

            {passportRows.map((passportRow, index) => (
                <PassportRow
                    key={passportRow.id}
                    passportRows={passportRows}
                    setPassportRows={setPassportRows}
                    id={index}
                />
            ))}
        </div>
    )
}