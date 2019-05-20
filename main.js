window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimeZone = document.querySelector('.location-timezone')


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/ca7a9281ca18b1588a1e60e0f0130fd2/${lat},${long}`

      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const {
            temperature,
            summary,
            icon
          } = data.currently

          temperatureDegree.textContent = temperature
          temperatureDescription.textContent = summary
          locationTimeZone.textContent = data.timezone
          setIcons(icon, document.querySelector('.icon'))
        })
    })
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: 'white'
    })
    const currentIcon = icon.replace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
  }
})
const main = () => {

}

document.addEventListener('DOMContentLoaded', main)