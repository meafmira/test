/* global google */
import React from 'react'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import Property from '../../property'
import PropertyActions from '../../../actions/property'
import DistanceActions from '../../../actions/distance'
import DirectionActions from '../../../actions/direction'

const mapStateToProps = (
  { property: properties, distance: { distances }, direction: { directions } },
  props
) => {
  const property = properties.find(
    property => property.id === Number.parseInt(props.params.propertyId)
  )
  const direction = property
    ? directions.find(direction => direction.propertyId === property.id)
    : null
  const distance = property
    ? distances.find(distance => distance.propertyId === property.id)
    : null
  return {
    ...props,
    propertyId: props.params.propertyId,
    property: property ? property : null,
    distance: distance ? distance.distance : null,
    direction: direction ? direction.direction : null,
  }
}

class PropertyContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleProps(props)
  }

  componentWillReceiveProps(props) {
    const { property } = props
    if (!equals(property, this.props.property)) {
      this.handleProps(props)
    }
    const origin = props.location.query.origin
    if (origin && origin !== this.props.location.query.origin) {
      this.handleProps(props)
    }
  }

  getLocation = property => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: property.address }, (results, status) => {
      if (status !== 'OK')
        return console.log('Geocoder failed due to: ', status)
      const result = results[0]
      if (result) {
        this.props.propertyChange({
          ...property,
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
        })
      } else {
        console.log('Geocoder found no results')
      }
    })
  }

  handleOrigin = (property, origin) => {
    if (property) {
      this.props.directionFetchRequested({ origin, property })
    }
  }

  handleProps = props => {
    const { property, distance } = props
    if (property) {
      if (property.location === null) {
        this.getLocation(props.property)
      }
      const { origin } = props.location.query
      if (origin) {
        const [lat, lng] = origin.split(',')
        this.handleOrigin(property, { lat, lng })
        if (distance === null) {
          props.distancesFetchRequested(new google.maps.LatLng(lat, lng), [
            props.property,
          ])
        }
      }
    } else {
      props.propertyFetchRequested(props.propertyId)
    }
  }

  render() {
    const { property } = this.props
    return property ? <Property {...this.props} /> : null
  }
}

export default connect(mapStateToProps, {
  ...PropertyActions,
  ...DistanceActions,
  ...DirectionActions,
})(PropertyContainer)
