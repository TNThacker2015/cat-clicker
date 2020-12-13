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
		this.client.on("tick", async ev => {
			const cats = LSWrapper.getCats();
			this.element.innerText = toWords(cats);
			const strCat = String(cats);
			smallDisplay.innerText = strCat.length > 50 ? `${strCat.slice(0, 10)}...${String(cats).slice(-39)}` : strCat;
		});
		return true;
	}
}