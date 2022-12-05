import testConfig from "./modules/testConfig/testConfig.js"
import variationCSS from "./modules/testConfig/variation-1.css";

import addStylesToDOM from "./modules/genericFunctions/addStylesToDOM.js"
import watchForChange from "./modules/genericFunctions/watchForChange.js"
import isMobileSite from "./modules/genericFunctions/isMobileSite.js"
import pollFunction from "./modules/genericFunctions/pollFunction.js"
import gaSendEvent from "./modules/genericFunctions/gaSendEvent.js"
import peabody from "./modules/genericFunctions/peabody.js"

testConfig["variant"] = "Variation 1"
const bodyClass = `${testConfig.id}_loaded`.replace(/ /g, '-').toLowerCase()
const isMobile = isMobileSite()
peabody.registerTest(testConfig["variant"], {
	message: "Choose your delivery method"
})

function init() {
	peabody.log('Init Function Called')
	if (!document.body.classList.contains(bodyClass)) {
		document.body.classList.add(bodyClass);
		if (isMobile) {
			document.body.classList.add('pbdy_mobile')
		}
		peabody.log(`${bodyClass} Class Added`)
		gaSendEvent(testConfig["variant"], 'Loaded', false)
		addStylesToDOM(variationCSS)
		let secureCheckoutBtn = document.querySelector('#secureCheckoutBtn')
		secureCheckoutBtn.textContent = window.peabody[testConfig["id"]].message
	}
}

function pollConditions() {
	let conditions = []
	conditions.push(!!document.querySelector('#secureCheckoutBtn'))
	peabody.log({message: `Polling: Conditions`, conditions})
	let result = conditions.every(a => a)
	peabody.log({message: `Polling: Result`, result})
	return result
}

peabody.log(`${testConfig["variant"]} Code Loaded`)
pollFunction(pollConditions, init)