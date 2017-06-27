import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { translate } from 'react-i18next'

import Button from '../common/button'
import AspectImg from '../common/aspect-image'
import currencyFormat from '../../utils/currency-format'
import { propertyUrl } from '../../utils/property'

const Card = styled.div`
  margin-bottom: 60px;
  border: none;
`

const PropertyTitle = styled.div`
  font-family: "SFText";
  font-size: 20px;
  font-weight: 500;
  color: #4a4a4a;
  margin: 5px 0 7px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  @media(max-width: 720px) {
    white-space: normal;
  }
`

const Price = styled.div`
  font-family: "SFText";
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #777777;
  margin-top: 10px;
`

const ButtonsContainer = styled.div`
  margin: 14px 0 13px 0;
`

const PropertyCard = ({
  property: { distance },
  origin,
  property,
  t,
  query,
}) => {
  const url = propertyUrl(property)
  const queryObj = { origin, query }
  return (
    <Card className="card">
      <Link to={url(queryObj)}>
        <AspectImg
          style={{
            width: '100%',
          }}
          className="card-img-top img-fluid"
          src={
            property.mediaUrl ||
            `https://maps.googleapis.com/maps/api/streetview?key=AIzaSyDGzfDHQ0FkzxpTC04zi60ItnfEn55Ya0U&size=600x600&sensor=false&location=${property.address}`
          }
          alt={property.address}
        />
      </Link>
      <div>
        <PropertyTitle>{property.address.split(',')[0]}</PropertyTitle>
        <PropertyTitle>
          {distance && distance.status !== 'NOT_FOUND'
            ? `${distance.distance.text} ${distance.duration.text}`
            : '\u00a0'}
        </PropertyTitle>
        <ButtonsContainer>
          <div className="row">
            <div className="col text-center">
              <Button block primary to={url({ ...queryObj, tab: 'buy' })}>
                {t('property.buy')}
              </Button>
              <Price>{currencyFormat(property.purchasePrice)}</Price>
              <Price>
                {t('price.from', { value: currencyFormat(property.rentPrice) })}
              </Price>
            </div>
            <div className="col text-center">
              <Button block to={url({ ...queryObj, tab: 'rent' })}>
                {t('property.rent')}
              </Button>
              <Price>
                {t('price.from', { value: currencyFormat(property.rentPrice) })}
              </Price>
            </div>
          </div>
        </ButtonsContainer>
      </div>
    </Card>
  )
}

export default translate()(PropertyCard)
