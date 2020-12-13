import { ClickEventWrapper } from "../util/ClickEventWrapper";
import { LSWrapper } from "../util/LS";
import { toWords } from "../util/toWords";
import { AbstractElementController } from "./AbstractElementController";
import { CatalogTickEvent } from "./CatalogTickController";
import { CatClickEvent } from "./CatClickController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class SmallDisplayController extends AbstractElementController<HTMLSpanElement> {
	protected elementID = "small-display";
	public register() {
		const catalogDisplay = document.getElementById("small-display-catalog");
		const catClickDisplay = document.getElementById("small-display-clicks-per-cat");
		if (catalogDisplay === null || catClickDisplay === null) return false;
		this.client.on("secTick", async ev => {
			catClickDisplay.innerText = toWords(await ClickEventWrapper.getCatPerClick());
			catalogDisplay.innerText = toWords(await ClickEventWrapper.getAutoCPS());
		});
		return true;
	}
}