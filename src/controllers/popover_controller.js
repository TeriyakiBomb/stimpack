import { Controller } from "@hotwired/stimulus"
import { computePosition, arrow, offset } from "@floating-ui/dom"
import { useClickOutside, useHover } from "stimulus-use"

// TODO: Switch to tailwind showing and hiding

export default class extends Controller {
  static targets = ["popover", "arrow"]

  static values = {
    position: { type: String, default: "bottom" },
    offset: { type: Number, default: 20 },
    mode: { type: String, default: "hover" },
    delay: { type: Number, default: 0 },
  }
  connect() {
    useClickOutside(this)
    useHover(this, { element: this.element })
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
    const popover = this.popoverTarget
    popover.style.display = popover.style.display === "none" ? "block" : "none"
    if (popover.style.display === "block") {
      this.popover()
    }
  }

  show() {
    this.hoverTimer = setTimeout(() => {
      this.popoverTarget.style.display = "block"
      this.popover()
    }, this.delayValue)
  }

  hide() {
    this.popoverTarget.style.display = "none"
    clearTimeout(this.hoverTimer)
  }

  clickOutside(event) {
    this.hide()
  }

  popover() {
    const button = this.element
    const popover = this.popoverTarget
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
