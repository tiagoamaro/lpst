const storage = window.localStorage
const LPST_TIMER = "lpst-timer"
const LPST_TIMER_REF = "lpst-timer-ref"

/**
 * Retrieves the value associated with the given key from the browser's local storage.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {string|null} - The value associated with the key, or null if the key does not exist.
 */
function getStorageItem(key) {
  return storage.getItem(key)
}

/**
 * Sets the value of a key in the browser's local storage.
 *
 * @param {string} key - The key to set.
 * @param {any} value - The value to associate with the key.
 */
function setStorageItem(key, value) {
  storage.setItem(key, value)
}

/**
 * Formats a given time into a readable string.
 *
 * @param {Number} time - The time to format.
 * @returns {string} The formatted time string.
 */
function formatTime(time) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = time % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }
}

function lpstStart() {
  const clock = document.getElementById("puzzle__timer__clock")
  let time = getStorageItem(LPST_TIMER) || 0

  document.getElementById("puzzle__timer__start").style.display = "none"
  document.getElementById("puzzle__timer__pause").style.display = "block"

  const intervalRef = setInterval(() => {
    time++
    setStorageItem(LPST_TIMER, time)
    clock.textContent = formatTime(time)
  }, 1000)

  storage.setItem("lpst-timer-ref", intervalRef)
}

function lpstPause() {
  const timerRef = getStorageItem(LPST_TIMER_REF)

  clearInterval(timerRef)
  setStorageItem(LPST_TIMER_REF, null)

  document.getElementById("puzzle__timer__start").style.display = "block"
  document.getElementById("puzzle__timer__pause").style.display = "none"
}

function lpstReset() {
  const clock = document.getElementById("puzzle__timer__clock")
  const timerRef = getStorageItem(LPST_TIMER_REF)

  document.getElementById("puzzle__timer__start").style.display = "block"
  document.getElementById("puzzle__timer__pause").style.display = "none"

  clearInterval(timerRef)
  setStorageItem(LPST_TIMER, 0)
  clock.textContent = formatTime(0)
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
const toolsEl = document.querySelector(".puzzle__tools")

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

clockEl.textContent = formatTime(getStorageItem(LPST_TIMER))
clockEl.setAttribute("id", "puzzle__timer__clock")

timerEl.classList.add("puzzle__timer")
timerEl.append(headerEl, togglesEl)

toolsEl.prepend(timerEl)

document
  .getElementById("puzzle__timer__start")
  .addEventListener("click", lpstStart)
document
  .getElementById("puzzle__timer__reset")
  .addEventListener("click", lpstReset)
document
  .getElementById("puzzle__timer__pause")
  .addEventListener("click", lpstPause)

lpstStart()
