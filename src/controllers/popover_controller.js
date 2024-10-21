import { Controller } from "@hotwired/stimulus"
import { computePosition, arrow, offset } from "@floating-ui/dom"
import { useClickOutside, useHover } from "stimulus-use"

export default class extends Controller {
  static targets = ["button", "content", "arrow"]

  static values = {
    position: { type: String, default: "bottom" },
    offset: { type: Number, default: 20 },
    mode: { type: String },
    delay: { type: Number, default: 0 },
    delayOut: { type: Number, default: 0 },
  }

  connect() {
    useClickOutside(this)
    useHover(this, { element: this.buttonTarget })
    this.contentTarget.setAttribute("data-state", "closed")
    this.contentTarget.style.display = "block"
    // console.log(this.contentTarget.dataset.state)
  }

  mouseEnter() {
    if (this.modeValue === "hover") {
      this.show()
    }
  }

  mouseLeave() {
    if (this.modeValue === "hover") {
      this.hide()
    }
  }

  toggle() {
    const popover = this.contentTarget
    if (popover.dataset.state === "closed") {
      this.show()
    } else {
      this.hide()
    }
  }

  show() {
    setTimeout(() => {
      // this.contentTarget.style.display = "block"
      this.contentTarget.dataset.state = "open"
      this.contentTarget.classList.add("opacity-100")
      this.contentTarget.classList.remove("opacity-0")
      // console.log(`changed to ${this.contentTarget.dataset.state}`)
      this.popover()
    }, this.delayValue)
  }

  hide() {
    setTimeout(() => {
      // this.contentTarget.style.display = "none"
      this.contentTarget.dataset.state = "closed"
      this.contentTarget.classList.add("opacity-0")
      this.contentTarget.classList.remove("opacity-100")
      // console.log(`changed to ${this.contentTarget.dataset.state}`)
    }, this.delayOutValue)
  }

  clickOutside(event) {
    this.hide()
  }

  popover() {
    const button = this.buttonTarget
    const popover = this.contentTarget
    const arrowElement = this.arrowTarget

    computePosition(button, popover, {
      placement: this.positionValue,
      middleware: [arrow({ element: arrowElement }), offset(this.offsetValue)],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(popover.style, {
        left: `${x}px`,
        top: `${y}px`,
      })

      const { x: arrowX, y: arrowY } = middlewareData.arrow

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]]

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-8px",
      })
    })
  }
}
