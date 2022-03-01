import * as React from 'react'
import styled from 'styled-components'

const IMG = styled.img`
  width: ${(props: IconProps) => (props.width ? props.width : '6em')};
`

interface IconProps {
  width?: string
  alt: string
  src: string
}

export const CustomIcon = ({ src, alt, width }: IconProps) => {
  return (
    <IMG
      src={`${process.env.PUBLIC_URL}/weather-svg-images/${src}.svg`}
      alt={alt}
      width={width}
    />
  )
}
