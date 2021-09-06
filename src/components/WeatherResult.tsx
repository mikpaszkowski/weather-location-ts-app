import * as React from 'react'
import { CurrentWeatherDetails } from './CurrentWeatherDetails'
import CurrentWeatherInfo from './CurrentWeatherInfo'
import { WeeklyForecast } from './WeeklyForecast'
import styled from 'styled-components'

const WeatherResultWrapper = styled.div``

type WeatherResultProp = {
  searchResult: Object | null
}

const WeatherResult = ({ searchResult }: WeatherResultProp) => {
  return (
    <WeatherResultWrapper>
      {searchResult ? (
        <>
          {<CurrentWeatherInfo />}
          <CurrentWeatherDetails />
          <WeeklyForecast />
        </>
      ) : null}
    </WeatherResultWrapper>
  )
}

export default WeatherResult
