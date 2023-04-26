const storage = browser.storage.local
const LPST_TIMER = "lpst-timer"
const LPST_TIMER_LIFETIME = "lpst-timer-lifetime"
const LPST_TIMER_REF = "lpst-timer-ref"

/**
 * Retrieves the value associated with the given key from the browser's local storage.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {string|null} - The value associated with the key, or null if the key does not exist.
 */
async function getStorageItem(key) {
  const result = await storage.get(key)
  return result[key]
}

/**
 * Formats a given time into a readable string.
 *
 * @param {Number} time - The time to format.
 * @returns {string} The formatted time string.
 */
function formatTime(time) {
  const days = Math.floor(time / 86400)
  const hours = Math.floor((time % 86400) / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  const timeValues = [
    { value: days, label: "day" },
    { value: hours, label: "hour" },
    { value: minutes, label: "minute" },
    { value: seconds, label: "second" },
  ]

  const timeString = timeValues.reduce((str, { value, label }) => {
    if (value > 0) {
      const plural = value !== 1 ? "s" : ""
      const timeLabel = `${value} ${label}${plural}`
      return str ? `${str}, ${timeLabel}` : timeLabel
    }
    return str
  }, "")

  return timeString || "0 seconds"
}

/**
 * Sets the value of a key in the browser's local storage.
 *
 * @param {string} key - The key to set.
 * @param {any} value - The value to associate with the key.
 */
async function setStorageItem(key, value) {
  await storage.set({ [key]: value })
}

const lifetimeEl = document.getElementById("puzzle__timer__lifetime")
const resetLifetimeEl = document.getElementById(
  "puzzle__timer__reset__lifetime"
)

getStorageItem(LPST_TIMER_LIFETIME).then((lifetime) => {
  lifetimeEl.textContent = formatTime(lifetime)
})
resetLifetimeEl.addEventListener("click", () => {
  if (confirm("Are you sure?")) {
    getStorageItem(LPST_TIMER_REF).then((ref) => {
      clearInterval(ref)
      setStorageItem(LPST_TIMER_LIFETIME, 0)
      lifetimeEl.textContent = formatTime(0)
    })
  }
})
