import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"

export default function PassportRow({ passportRows, setPassportRows, id}) {

    const [windSpeed, setWindSpeed] = useState("")
    const [power, setPower] = useState("")

    const addPassportRow = () => {
        const indexOfExistingRow = passportRows.findIndex(row => row.id === id)

        if(indexOfExistingRow !== -1) {
            setPassportRows(prevState => {
                prevState[indexOfExistingRow].wind_speed = windSpeed
                prevState[indexOfExistingRow].power = power
                return [...prevState]
            })
        } else {
            setPassportRows([...passportRows,
                {
                    id: id,
                    wind_speed: windSpeed,
                    power: power
                }
            ])
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <label htmlFor="windSpeed" className="form-label">Швидкість вітру (м/с):</label>
                    <input type="number"
                           id="windSpeed"
                           value={windSpeed}
                           className="form-control"
                           min="0"
                           max="40"
                           onChange={(e) => setWindSpeed(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="power" className="form-label">Потужність ВЕУ (кВт):</label>
                    <input type="number"
                           id="power"
                           value={power}
                           className="form-control"
                           onChange={(e) => setPower(e.target.value)}
                    />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <div className="d-flex justify-content-between">
                        {windSpeed !== "" && power !== "" &&
                            <FontAwesomeIcon icon={faPlus} onClick={addPassportRow}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}