import { Controller } from "@hotwired/stimulus"
import Coloris from "@melloware/coloris"

// Connects to data-controller="color-picker"
export default class extends Controller {
  static targets = ["input"]
  static values = {
    swatches: Array,
    margin: { type: Number, default: 12 },
  }

  connect() {
    Coloris.init()
    Coloris({
      el: this.inputTarget,
      swatches: this.swatchesValue,
      margin: this.marginValue,
      theme: "polaroid",
    })
    console.log(this.swatchesValue)
  }

  handleColorChange(event) {
    const color = event.target.value
    console.log(`Selected color: ${color}`)
  }

  disconnect() {
    Coloris.close()
  }
}
