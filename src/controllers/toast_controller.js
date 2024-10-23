import { Controller } from "@hotwired/stimulus"
import { useVisibility } from "stimulus-use"

export default class extends Controller {
  static targets = ["toast", "bar"]

  connect() {
    this.startCountdown()
  }

  startCountdown() {
    this.open()
    const delay = 5000
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, delay - elapsed)
      const percentage = (remainingTime / delay) * 100

      this.barTarget.style.width = `${percentage}%`

      if (remainingTime <= 0) {
        clearInterval(interval)
        this.barTarget.style.width = "0%"
        this.close()
      }
    }, 1000)
  }

  open() {
    this.toastTarget.classList.remove("stimpack--toast-hide")
    this.toastTarget.classList.add("stimpack--toast-show")
  }

  close() {
    this.toastTarget.classList.add("stimpack--toast-hide")
  }
}
