import { Controller } from "@hotwired/stimulus"
import Coloris from "@melloware/coloris"

// Connects to data-controller="color-picker"
export default class extends Controller {
  static targets = ["input"]

  connect() {
    // Initialize Coloris
    Coloris.init()
    Coloris({ el: this.inputTarget })
    console.log("red")
  }

  handleColorChange(event) {
    const color = event.target.value
    console.log(`Selected color: ${color}`)
    // You can add additional functionality here, like updating other elements
  }

  disconnect() {
    Coloris.close()
  }
}
