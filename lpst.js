const sidebar = document.querySelector(".puzzle__side")
const timer = document.createElement("div")
let time = 0
let timerRef

/**
 * Formats a given time into a readable string.
 *
 * @param {Date} time - The time to format.
 * @returns {string} The formatted time string.
 */
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

function lpstStart() {
  const clock = document.getElementById("clock")

  lpstReset()
  timerRef = setInterval(() => {
    time++
    clock.innerHTML = formatTime(time)
  }, 1000)
}

function lpstReset() {
  const clock = document.getElementById("clock")

  clearInterval(timerRef)
  time = 0
  clock.innerHTML = formatTime(time)
}

timer.classList.add("puzzle__timer")
timer.innerHTML = `
    <h2>Timer: <span id="clock">${formatTime(time)}</span></h2>
    <div class="puzzle__timer__toggles">
        <a id="start" class="button">Start</button>
        <a id="reset" class="button button-empty"">Reset</button>
    </div>
`

sidebar.append(timer)
document.getElementById("start").addEventListener("click", lpstStart)
document.getElementById("reset").addEventListener("click", lpstReset)
