import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
import { GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
import { translate } from 'react-i18next'

import { propertyUrl } from '../../utils/property'
import Button from '../common/button'
import RentTab from './rent-tab'
import BuyTab from '../containers/property/buy-tab'

const PropertyContainer = styled.div`
  padding-top: 27px;
  padding-bottom: 27px;
`

const PropertyTitle = styled.div`
  font-size: 36px;
  color: #4a4a4a;
`

const PropertyAddress = styled.div`
  padding: 23px 0;
  font-family: SFText;
	font-size: 24px;
	font-weight: 500;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	color: #4a4a4a;
`

const Tabs = styled.ul`
  margin: 0;
  padding: 0;
  font-size: 0;
`

const Tab = styled.li`
  display: inline-block;
	height: 40px;
	font-family: "SFText";
	font-size: 14px;
  line-height: 40px;
  text-transform: uppercase;
	font-weight: bold;
	font-style: normal;
	font-stretch: normal;
	letter-spacing: normal;
	text-align: center;
	color: #ffffff;
  margin-right: 8px;
  & > a {
    color: #fff;
    display: block;
    padding: 0 40px;
    border-radius: 4px;
    background-color: ${props => (props.active ? '#517db1' : '#9b9b9b')};
    box-shadow: ${props =>
      props.active
        ? 'inset 0 1px 4px 0 #2f5484, inset 0 1px 1px 0 rgba(0, 0, 0, 0.05)'
        : '0 3px 4px 0 #9b9b9b, 0 4px 0 0 #706f70'};
    position: relative;
    top: ${props => (props.active ? '0' : '-4px')};
    text-decoration: none !important;
  }
  &:first-child > a {
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:last-child > a {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

function Property({ property, distance, direction, t, ...props }) {
  const { location: { query: { tab = 'rent', ...query } } } = props
  const markerPosition = property.latitude && property.longitude
    ? {
        lat: property.latitude,
        lng: property.longitude,
      }
    : null
  let mapContent
  if (direction) {
    mapContent = <DirectionsRenderer directions={direction} />
  } else if (markerPosition) {
    mapContent = <Marker position={markerPosition} />
  }
  const url = propertyUrl(property)
  return (
    <PropertyContainer className="container">
      <div className="row">
        <div className="col-md-3">
          {query.query
            ? <Button
                style={{ marginBottom: 20 }}
                primary
                to={`/search?query=${query.query}`}
              >
                {t('backToSearch')}
              </Button>
            : null}
        </div>
        <div className="col-md-9 text-right">
          <PropertyTitle>{t('no')}: {property.name}</PropertyTitle>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <img
            style={{ width: '100%' }}
            alt={property.address}
            src={
              property.mediaUrl ||
              `https://maps.googleapis.com/maps/api/streetview?key=AIzaSyDGzfDHQ0FkzxpTC04zi60ItnfEn55Ya0U&size=600x600&sensor=false&location=${property.address}`
            }
            className="img-fluid"
          />
        </div>
        <div className="col-md">
          <GoogleMap
            center={markerPosition}
            containerProps={{
              style: {
                width: '100%',
                height: 540,
              },
            }}
            defaultZoom={18}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
          >
            {mapContent}
          </GoogleMap>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <PropertyAddress>
            {property.address}
          </PropertyAddress>
        </div>
        <div className="col-6 text-right">
          <PropertyAddress>
            {distance && distance.status === 'OK'
              ? `${distance.distance.text}, ${distance.duration.text}`
              : ''}
          </PropertyAddress>
        </div>
      </div>
      <Tabs>
        <Tab active={tab === 'buy'}>
          <Link to={url({ ...query, tab: 'buy' })}>{t('property.buy')}</Link>
        </Tab>
        <Tab active={tab === 'rent'}>
          <Link to={url({ ...query, tab: 'rent' })}>{t('property.rent')}</Link>
        </Tab>
      </Tabs>
      <div className="row">
        <div className="col-12">
          {tab === 'rent' ? <RentTab /> : <BuyTab property={property} />}
        </div>
      </div>
    </PropertyContainer>
  )
}

export default translate()(Property)
