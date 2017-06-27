import GoogleMapsLoader from 'google-maps'
import i18next from 'i18next'

GoogleMapsLoader.KEY = 'AIzaSyDGzfDHQ0FkzxpTC04zi60ItnfEn55Ya0U'
GoogleMapsLoader.LIBRARIES = ['places']

const google = new Promise((resolve, reject) => {
  i18next.on('languageChanged', lang => {
    GoogleMapsLoader.LANGUAGE = lang
    GoogleMapsLoader.load(google => {
      resolve(google)
    })
  })
}).then(google => {
  return google
})

export default {
  maps: {
    Geocoder() {
      this.geocode = (...args) => {
        google.then(google => {
          const geocoder = new google.maps.Geocoder()
          geocoder.geocode(...args)
        })
      }
    },
    places: {
      AutocompleteService() {
        this.getQueryPredictions = (...args) => {
          google.then(google => {
            const autocompleteService = new google.maps.places
              .AutocompleteService()
            autocompleteService.getQueryPredictions(...args)
          })
        }
      },
    },
  },
}
