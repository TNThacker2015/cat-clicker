import { LSWrapper } from "../util/LS";
import { toWords } from "../util/toWords";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class TextUpdateController extends AbstractElementController<HTMLSpanElement> {
	protected elementID = "large-display-number";
	public register() {
		const smallDisplay = document.getElementById("full-display-number");
		if (smallDisplay === null) return false;
		this.client.on("tick", ev => {
			const cats = LSWrapper.getCats();
			this.element.innerText = toWords(cats);
			smallDisplay.innerText = String(cats);
		});
		return true;
	}
}