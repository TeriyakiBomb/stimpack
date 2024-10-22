import "../style.css"
import "@melloware/coloris/dist/coloris.css"

import { Application } from "@hotwired/stimulus"
import StimulusControllerResolver, {
  createViteGlobResolver,
} from "stimulus-controller-resolver"

const application = Application.start()

StimulusControllerResolver.install(
  application,
  createViteGlobResolver(import.meta.glob("./controllers/*_controller.js"))
)
