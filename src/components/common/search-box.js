import React from 'react'
import { translate } from 'react-i18next'
import PlaceSearchBox from './place-search-box'
import styled from 'styled-components'

const SearchTitle = styled.h4`
  font-family: "SFText";
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #466fa0;
  color: inherit;
  text-align: center;
`

const SearchBox = ({ t, ...props }) =>
  <div>
    <SearchTitle>{t('search.whereToParkYourCar')}</SearchTitle>
    <PlaceSearchBox {...props} />
  </div>

export default translate()(SearchBox)
