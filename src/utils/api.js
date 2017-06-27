import { API_URL, GOOGLE_MAPS_API_KEY } from '../constants/api'
import queryString from 'query-string'
import localforage from 'localforage'
import i18n from 'i18next'

export let token

export function setToken(newToken) {
  token = newToken
  return localforage.setItem('token', token)
}

export async function get(url, options) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
  return response.json()
}

export function getAddressPredictions({ input, location, radius }) {
  let params = {
    input,
    radius,
    types: 'geocode',
    key: GOOGLE_MAPS_API_KEY,
    language: i18n.language,
  }
  if (location) {
    params.location = `${location.lat()},${location.lng()}`
  }
  const url = `autocomplete?${queryString.stringify(params)}`
  return get(url).then(res => res.predictions)
}
