const storage = window.localStorage

let time = storage.getItem("lpst-timer") || 0
let timerRef

/**
 * Formats a given time into a readable string.
 *
 * @param {Number} time - The time to format.
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
  const clock = document.getElementById("puzzle__timer__clock")

  document.getElementById("puzzle__timer__start").style.display = "none"
  document.getElementById("puzzle__timer__pause").style.display = "block"

  timerRef = setInterval(() => {
    time++
    storage.setItem("lpst-timer", time)
    clock.textContent = formatTime(time)
  }, 1000)
}

function lpstPause() {
  clearInterval(timerRef)
  document.getElementById("puzzle__timer__start").style.display = "block"
  document.getElementById("puzzle__timer__pause").style.display = "none"
}

function lpstReset() {
  const clock = document.getElementById("puzzle__timer__clock")

  document.getElementById("puzzle__timer__start").style.display = "block"
  document.getElementById("puzzle__timer__pause").style.display = "none"

  clearInterval(timerRef)
  time = 0
  storage.setItem("lpst-timer", time)
  clock.textContent = formatTime(time)
}

// HTML structure
// Target structure, but we can't use innerHTML attribute since it's an addon
// timer.innerHTML = `
//     <h2>Timer: <span class="puzzle__timer__clock">${formatTime(time)}</span></h2>
//     <div class="puzzle__timer__toggles">
//         <a id="puzzle__timer__start" class="button">Start</button>
//         <a id="puzzle__timer__pause" class="button">Pause</button>
//         <a id="puzzle__timer__reset" class="button button-empty"">Reset</button>
//     </div>
// `
const sidebarEl = document.querySelector(".puzzle__side")

const timerEl = document.createElement("div")
const headerEl = document.createElement("h2")
const clockEl = document.createElement("span")
const togglesEl = document.createElement("div")
const startButtonEl = document.createElement("button")
const resetButtonEl = document.createElement("button")
const pauseButtonEl = document.createElement("button")

startButtonEl.classList.add("button")
startButtonEl.setAttribute("id", "puzzle__timer__start")
startButtonEl.textContent = "Start"

resetButtonEl.classList.add("button", "button-empty")
resetButtonEl.setAttribute("id", "puzzle__timer__reset")
resetButtonEl.textContent = "Reset"

pauseButtonEl.classList.add("button")
pauseButtonEl.setAttribute("id", "puzzle__timer__pause")
pauseButtonEl.textContent = "Pause"

togglesEl.classList.add("puzzle__timer__toggles")
togglesEl.append(startButtonEl, pauseButtonEl, resetButtonEl)

headerEl.textContent = "Timer: "
headerEl.append(clockEl)

clockEl.textContent = formatTime(time)
clockEl.setAttribute("id", "puzzle__timer__clock")

timerEl.classList.add("puzzle__timer")
timerEl.append(headerEl, togglesEl)

sidebarEl.append(timerEl)

document
  .getElementById("puzzle__timer__start")
  .addEventListener("click", lpstStart)
document
  .getElementById("puzzle__timer__reset")
  .addEventListener("click", lpstReset)
document
  .getElementById("puzzle__timer__pause")
  .addEventListener("click", lpstPause)

// Start the timer in case the page is reloaded
if (time > 0) {
  lpstStart()
  document.getElementById("puzzle__timer__start").style.display = "none"
} else {
  document.getElementById("puzzle__timer__pause").style.display = "none"
}
