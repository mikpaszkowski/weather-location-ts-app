import * as React from 'react'
import styled from 'styled-components'
import { RiEmotionSadLine } from 'react-icons/ri'
import WeatherResult from '../components/WeatherResult'
import { NotFound } from '../components/MessageContainer'
import { HeadlineSVG } from '../iconComponents/Headline'
import { SearchBar } from '../components/SearchBar'
import {
  getCurrentWeatherByCityName,
  getHourlyForecastByCoordinates
} from '../services/api/wetherAPI'
import { getGeocodingDataByCityName } from '../services/api/reverseAndForwardGeocodingAPI'
import { useDispatch, useSelector } from 'react-redux'
import {
  set,
  selectCurrentWeather
} from '../store/currentWeather/currentWeatherSlice'
import {
  setHourlyForecast,
  hourlyForecastSelector
} from '../store/hourlyForecast/hourlyForecastSlice'
import { useAppSelector, useAppDispatch } from '../hooks/storeHooks'
import { getCoordinates } from '../utils/coordinates'

const StyledNotFoundIcon = styled(RiEmotionSadLine)`
  display: block;
  height: 5rem;
  width: 5rem;
  margin-right: 2rem;
  font-size: 5.5rem;
`

const HomeWrapper = styled.div``

const { useState } = React

const Home = () => {
  const dispatch = useDispatch()
  const getCurrWeather = useAppSelector(selectCurrentWeather)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResult, setsearchResult] = useState<boolean | null>(null)
  const [searchError, setsearchError] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const weatherResponse = await getCurrentWeatherByCityName(searchValue)
      const geocodingData = await getGeocodingDataByCityName(searchValue)
      const forecastResponse = await getHourlyForecastByCoordinates(
        getCoordinates(geocodingData)
      )
      console.log(weatherResponse)
      setsearchResult(false)
      if (weatherResponse && forecastResponse) {
        dispatch(set(weatherResponse))
        dispatch(setHourlyForecast(forecastResponse))
        setsearchError(false)
        setsearchResult(true)
      }
    } catch (err) {
      setsearchError(true)
      setsearchResult(false)
      console.log(err)
    }
  }

  return (
    <HomeWrapper>
      <HeadlineSVG
        temporaryMode={true}
        staticMode={false}
        searchResult={searchResult}
      />
      <SearchBar
        name="searchValue"
        placeholder="Enter city"
        value={searchValue}
        onSubmit={handleSubmit}
        onChange={handleChange}
        searchResult={searchResult}
      />
      <NotFound
        active={searchError}
        message="The specified city was not found ..."
        icon={StyledNotFoundIcon}
      />
      <WeatherResult searchResult={searchResult} />
    </HomeWrapper>
  )
}

export default Home
