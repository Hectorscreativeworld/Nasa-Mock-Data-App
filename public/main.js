let index = 0
let countDown = null

// top daily picture api call
const dailyPictureImage = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })
    .then(message => {
      console.log(message)
      document.querySelector('.dailyPicture').style.backgroundImage =
        'url(' + message.url + ')'
      document.querySelector('.copyrightTextInfo').innerHTML =
        'copyright: ' + message.copyright + ' | title: ' + message.title
    })
}

// upcoming launches api call
const upcomingLaunches = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    })
    .then(launches => {
      console.log(launches)
      createCountDown(launches[0].launch_date_local)
      const starlink = launches[0]
      document.querySelector('.launchTitle').innerHTML = starlink.mission_name
      document.querySelector('.launchDescription').innerHTML = starlink.details
      document.querySelector('.launchLocation').innerHTML =
        starlink.launch_site.site_name_long

      // add event listener for the left button
      document
        .querySelector('.buttonLeft')
        .addEventListener('click', function(e) {
          if (index === 0) {
            index = launches.length - 1
          } else {
            index--
          }
          showLaunch(launches[index])
        })

      // add event listener for the right button
      document
        .querySelector('.buttonRight')
        .addEventListener('click', function(e) {
          if (index === launches.length - 1) {
            index = 0
          } else {
            index++
          }
          showLaunch(launches[index])
        })
    })
}
/*  count down code AKA "Beast of a code" - working with dates api*/
const createCountDown = launchDate => {
  const countDownDate = new Date(launchDate).getTime()
  clearInterval(countDown)
  countDown = setInterval(function() {
    // Get today's date and time
    let now = new Date().getTime()

    // Find the distance between now and the count down date
    let distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result in the element with Class="countDown"
    document.querySelector('.countDown').innerHTML =
      days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(countDown)
      document.querySelector('.countDown').innerHTML = 'launched'
    }
  }, 1000) // update count ever 1000ms "1 sec"
}

const showLaunch = launch => {
  createCountDown(launch.launch_date_local)
  document.querySelector('.launchTitle').innerHTML = launch.mission_name
  if (launch.details) {
    document.querySelector('.launchDescription').innerHTML = launch.details
  } else {
    document.querySelector('.launchDescription').innerHTML =
      'No description available yet.'
  }

  document.querySelector('.launchLocation').innerHTML =
    launch.launch_site.site_name_long
}

const main = () => {
  dailyPictureImage()
  upcomingLaunches()
}
document.addEventListener('DOMContentLoaded', main)
