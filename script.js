/* Calculate time remaining with set MB/s and set MB to download */

const dlSizeEl = document.querySelector("#mb-amount")
const dlSpeedEl = document.querySelector("#mbps")
const calculateBtnEl = document.querySelector("#form-button")
const timeRemainingEl = document.querySelector("#time-remaining")

function calculateSecondsRemaining() {
  let dlSize = Math.abs(dlSizeEl.value)
  let dlSpeed = Math.abs(dlSpeedEl.value)
  
  let secondsRemaining = dlSize / dlSpeed
  return secondsRemaining
}

function formatTimeRemaining() {
  let secondsRemaining = calculateSecondsRemaining()
  let timeRemainingObject = toHoursAndMinutes(secondsRemaining)
  
  //console.log(secondsRemaining, timeRemainingObject)
  
  let formattedTimeRemainingArray = [];
  
  for (const timeUnit in timeRemainingObject) {    
    let timeUnitValue = timeRemainingObject[timeUnit]
    
    if (timeUnitValue > 1) {
      formattedTimeRemainingArray.push(`${timeUnitValue} ${timeUnit}${timeUnitValue > 1 ? "s" : ""}`)
    }
  }
  
  //console.log(formattedTimeRemainingArray)
  
  let formattedTimeRemaining;
  
  switch (formattedTimeRemainingArray.length) {
    case 3:
      formattedTimeRemaining = formattedTimeRemainingArray[0] + ", " + formattedTimeRemainingArray[1] + " and" + formattedTimeRemainingArray[2];
      break;
    case 2:
      formattedTimeRemaining = formattedTimeRemainingArray[0] + " and " + formattedTimeRemainingArray[1];
      break;
    case 1:
      formattedTimeRemaining = formattedTimeRemainingArray[0];
      break;
  }
  
  formattedTimeRemaining += " remaining."
      
  return formattedTimeRemaining
}

function displayFormattedTimeRemaining() {
  if(!dlSizeEl.value && !dlSpeedEl.value) return
  
  timeRemainingEl.innerText = ``
  let formattedTimeRemaining = formatTimeRemaining()

  timeRemainingEl.innerText = formattedTimeRemaining
}

calculateBtnEl.addEventListener("click", displayFormattedTimeRemaining)

// Allows the user of the Enter key to "submit the form"
document.body.addEventListener("keydown", event => {
    if (event.key !== "Enter") return
    displayFormattedTimeRemaining()
})

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = Math.floor(totalSeconds % 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hour: hours, minute: minutes, second: seconds }
}
