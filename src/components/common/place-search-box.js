/* global google */
import React from 'react'
import Autocomplete from 'react-autocomplete'
import localforage from 'localforage'
import styled from 'styled-components'

import Suggestion from './suggestion'
import geolocation from '../../utils/geolocation'
import { getAddressPredictions } from '../../utils/api'
import Button from './button'

const geocoder = new google.maps.Geocoder()

const styles = {
  wrapper: {
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    maxWidth: '100%',
    display: 'inline-block',
    verticalAlign: 'bottom',
  },
  input(withSuggestions) {
    return {
      height: 36,
      width: '100%',
      borderRadius: 3,
      backgroundColor: '#ffffff',
      boxShadow: 'inset 0 1px 0 0 rgba(0, 0, 0, 0.1)',
      border: 'solid 1.5px #bbc8dd',
      borderBottomLeftRadius: withSuggestions ? 0 : 3,
      borderBottomRightRadius: withSuggestions ? 0 : 3,
      fontFamily: '"SFText"',
      fontSize: 20,
      lineHeight: '36px',
      color: '#4a4a4a',
      padding: '0 10px',
    }
  },
}

const AutoCompleteForm = styled.form`
  text-shadow: none;
  width: ${props => (props.hasButton ? 776 : 622)}px;
  padding-right: ${props => (props.hasButton ? 154 : 0)}px;
  white-space: nowrap;
  display: inline-block;
  @media(max-width: 720px) {
    width: 100%;
  }
`

export default class SearchBoxWithAutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.autocompleteService = new google.maps.places.AutocompleteService()
    const baseLocations = [
      {
        description: 'Your location...',
        predef: true,
      },
    ]
    this.state = {
      open: false,
      selected: false,
      baseLocations,
      suggestions: baseLocations,
      value: props.value ? props.value : '',
      currentLocation: null,
      geocodedLocation: null,
    }
    Promise.all([
      localforage.getItem('currentPosition'),
      localforage.getItem('currentLocation'),
    ]).then(([currentPosition, currentLocation]) => {
      if (currentPosition) this.getCurrentPosition()
      if (currentLocation) this.setState({ currentLocation })
    })
    this.mounted = true
    const prevSetState = this.setState.bind(this)
    this.setState = (...args) => {
      if (this.mounted) prevSetState(...args)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getCurrentPosition = () => {
    geolocation.getCurrentPosition(
      position => {
        localforage.setItem('currentPosition', true)
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        localforage.setItem('currentLocation', currentLocation)
        this.setState({ currentLocation })
      },
      reason => {
        localforage.removeItem('currentLocation')
        localforage.removeItem('currentPosition')
        localforage.removeItem('geocodedLocation')
        this.setState({ baseLocations: [] })
      }
    )
  }

  setBaseLocations = geocodedLocation => {
    const baseLocations = [
      {
        description: geocodedLocation.formatted_address,
        predef: true,
      },
    ]
    this.setState({
      geocodedLocation,
      baseLocations,
      suggestions: [...baseLocations, ...this.state.suggestions.splice(1)],
    })
  }

  componentWillUpdate(_, { currentLocation: location }) {
    if (this.state.currentLocation === null && location) {
      geocoder.geocode({ location }, (results, status) => {
        if (status !== 'OK')
          return console.log('Geocoder failed due to: ', status)
        const result = results[0]
        if (result) {
          this.setBaseLocations(result)
        } else {
          console.log('Geocoder found no results')
        }
      })
    }
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value })
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value })
    if (value === '')
      return this.setState({ ...this.state, value, suggestions: [] })
    const { currentLocation } = this.state
    const location = currentLocation
      ? new google.maps.LatLng(currentLocation)
      : null
    const radius = currentLocation ? 3000 : null
    getAddressPredictions({ input: value, location, radius }).then(
      this.handleSuggestions
    )
  }

  handleSuggestions = resp => {
    this.setState({
      ...this.state,
      suggestions: [...this.state.baseLocations, ...resp],
    })
  }

  handleSelect = (value, item) => {
    const { onSelect } = this.props
    if (item.predef && this.state.geocodedLocation === null) {
      this.getCurrentPosition()
    } else {
      this.setState({ value, open: false, selected: true })
      onSelect && onSelect(item, value)
    }
  }

  handleUseYourLocation = e => {
    const { geocodedLocation: { formatted_address: value } } = this.state
    this.setState({ value })
    e.preventDefault()
  }

  handleSubmit = e => {
    const { onSelect } = this.props
    const { value } = this.state
    e.preventDefault()
    onSelect && onSelect(value, value)
  }

  handleFocus = e => {
    setTimeout(() => this.setState({ open: true }))
  }

  render() {
    const { suggestions, geocodedLocation, open, selected, value } = this.state
    const { searchButton } = this.props
    let autocompleteProps = {}
    if (!selected && (geocodedLocation === null || open)) {
      autocompleteProps.open = open
    }
    const withSuggestions = suggestions.length > 0
    const menuStyle = {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      zIndex: 100,
    }
    return (
      <AutoCompleteForm onSubmit={this.handleSubmit} hasButton={searchButton}>
        <Autocomplete
          wrapperStyle={styles.wrapper}
          inputProps={{
            onFocus: () => {
              if (this.state.geocodedLocation === null)
                this.setState({ open: true })
            },
            onChange: () => this.setState({ selected: false }),
            style: styles.input(withSuggestions),
          }}
          menuStyle={menuStyle}
          value={value}
          items={suggestions}
          getItemValue={item => item.description}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
          renderItem={(item, isHighlighted) =>
            <Suggestion isPredef={item.predef} isHighlighted={isHighlighted}>
              {item.description}
            </Suggestion>}
          {...autocompleteProps}
        />
        {searchButton
          ? <Button
              inline
              primary
              style={{
                width: 144,
                marginLeft: 10,
                marginRight: -154,
              }}
              onClick={this.handleSubmit}
            >
              <span className="hidden-sm-down">Search</span>
              <span className="hidden-md-up">Go</span>
            </Button>
          : null}
      </AutoCompleteForm>
    )
  }
}
