import queryString from 'query-string'

export const propertyUrl = property => query => {
  return `/properties/${property.id}?${queryString.stringify(query)}`
}
