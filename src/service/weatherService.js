import { request, localRequest } from '../utils/axios_helper'
import env from "react-dotenv"

class WeatherService {
    async getDailyForecast(lat, lon) {
        try {
            return await request(
                `GET`,
                `https://api.openweathermap.org/data/2.5/forecast?lat=${(+lat).toFixed(2)}&lon=${(+lon).toFixed(2)}&appid=${env.API_KEY}&units=metric`,
                {}
            )
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async getCitiesList() {
        try {
            return await localRequest('ua.json')
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

const weatherService = new WeatherService()
export default weatherService

