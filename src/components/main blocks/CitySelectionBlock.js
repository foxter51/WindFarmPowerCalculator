import React, { useEffect, useState } from "react"
import weatherService from "../../service/weatherService"
import { Multiselect } from "multiselect-react-dropdown"
import LoadingEffect from "../LoadingEffect"
import SelectionPreviewBlock from "../SelectionPreviewBlock"
import ForecastFetchBlock from "../ForecastFetchBlock"
import DatePickBlock from "../DatePickBlock"

export default function CitySelectionBlock({ setForecast }) {
    const [citiesList, setCitiesList] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)

    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await weatherService.getCitiesList()
                setCitiesList(response.data)
            } catch (error) {
                setError(error.response.data.message)
            }
            setLoading(false)
        }
        fetchCities()
    }, [])

    if(loading) {
        return <LoadingEffect/>
    }

    return (
        <div className="mb-3">
            <div className="h2">Оберіть місто</div>
            {error}
            <Multiselect className="mb-2"
                options={citiesList.sort((a, b) => a.city.localeCompare(b.city))}
                singleSelect={true}
                selectedValues={[]}
                loading={loading}
                onSelect={(selectedList, selectedItem) => {
                    setSelectedCity(selectedItem.city)
                    setLat(selectedItem.lat)
                    setLon(selectedItem.lng)
                    }
                }
                displayValue="city"
            />
            {selectedCity &&
                <>
                    <SelectionPreviewBlock
                        city={selectedCity}
                        lat={lat}
                        lon={lon}
                    />

                    <DatePickBlock
                        setDateStart={setDateStart}
                        setDateEnd={setDateEnd}
                    />

                    {dateStart && dateEnd &&
                        <ForecastFetchBlock
                            lat={lat}
                            lon={lon}
                            dateStart={dateStart}
                            dateEnd={dateEnd}
                            setForecast={setForecast}
                        />
                    }
                </>
            }
        </div>
    )
}