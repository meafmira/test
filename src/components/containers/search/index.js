/* global google */
import React from 'react'
import { connect } from 'react-redux'
import Search from '../../search'
import DistanceActions from '../../../actions/distance'
import PropertyActions from '../../../actions/property'
import { equals } from 'ramda'

const mapStateToProps = ({ property, distance: { distances } }) => {
  return {
    property: property.map(property => {
      const propertyDistance = distances.find(
        distance => distance.propertyId === property.id
      )
      return {
        ...property,
        distance: propertyDistance ? propertyDistance.distance : null,
      }
    }),
  }
}

class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isRequested = false
    this.count = 0
    this.handleProps(props)
    this.handleQuery(props.router.location.query.query)
    this.state = {
      origin: null,
    }
  }

  handleQuery = query => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: query }, (results, status) => {
      if (status !== 'OK')
        return console.log('Geocoder failed due to: ', status)
      const result = results[0]
      if (result) {
        const origin = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }
        this.setState({ origin })
        this.props.propertiesSearchRequested(origin)
      } else {
        console.log('Geocoder found no results')
      }
    })
  }

  componentWillReceiveProps(props) {
    if (!equals(props.property, this.props.property)) {
      this.handleProps(props)
    }
    const query = props.location.query.query
    if (query !== this.props.location.query.query) {
      this.handleQuery(query)
    }
  }

  handleSelect = (item, value) => {
    this.props.router.push(`/search?query=${value}`)
    this.props.clearDistances()
  }

  handleProps = props => {
    const { property, router: { location: { query: { query } } } } = props
    const isLoadedDistances = property.every(
      property =>
        property.hasOwnProperty('distance') && property.distance !== null
    )
    if (
      this.count !== 10 &&
      !isLoadedDistances &&
      property.length > 0 &&
      query !== ''
    ) {
      this.props.distancesFetchRequested(query, property)
    }
  }

  render() {
    const { origin } = this.state
    const strOrigin = origin ? `${origin.lat},${origin.lng}` : null
    return (
      <Search origin={strOrigin} onSelect={this.handleSelect} {...this.props} />
    )
  }
}

export default connect(mapStateToProps, {
  ...DistanceActions,
  ...PropertyActions,
})(SearchContainer)
