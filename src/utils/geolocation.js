import canUseDOM from 'can-use-dom'

export default (canUseDOM && navigator.geolocation
  ? navigator.geolocation
  : {
      getCurrentPostion(_, failure) {
        failure({ message: "Your browser doesn't support geolocation" })
      },
    })
