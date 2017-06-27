import React from 'react'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import AuthShow from '../common/auth-show'

import SearchBox from '../common/search-box'
import PropertyCard from './property-card'
import PropertyCardPlaceholder from './property-card-placeholder'
import FacebookButton from '../common/facebook-button'

const SearchContainer = styled.div`
  padding: 27px 0 49px 0;
  text-align: center;
`

const CardCol = styled.div`
  padding: 0 40px;
  @media(max-width: 720px) {
    padding: 0 15px;
  }
`

const FacebookLoginContainer = styled.div`
  border-radius: 5px;
  background-color: #ebebeb;
  padding: 20px 45px;
  margin-bottom: 57px;
  text-align: center;
`

const FacebookLoginLabel = styled.div`
  font-family: "SFText";
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  margin-bottom: 28px;
`

function Search({
  router: { location: { query: { query } } },
  property,
  onSelect,
  token,
  origin,
  t,
}) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SearchContainer>
              <SearchBox value={query} onSelect={onSelect} />
            </SearchContainer>
          </div>
        </div>
        {property.length === 0
          ? <div className="row" key="property-row">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(key =>
                <CardCol className="col-md-4" key={key}>
                  <PropertyCardPlaceholder />
                </CardCol>
              )}
            </div>
          : <div className="row" key="property-row">
              {property.map((property, index) =>
                <CardCol className="col-md-4" key={index}>
                  <PropertyCard
                    property={property}
                    origin={origin}
                    query={query}
                  />
                </CardCol>
              )}
            </div>}
      </div>
      <AuthShow style={{ display: 'block' }}>
        <div className="row">
          <div className="col-12">
            <FacebookLoginContainer>
              <FacebookLoginLabel>
                {t('facebook.searchPageText', { address: query })}
              </FacebookLoginLabel>
              <FacebookButton>
                {t('facebook.login')}
              </FacebookButton>
            </FacebookLoginContainer>
          </div>
        </div>
      </AuthShow>
    </div>
  )
}

export default translate()(Search)
