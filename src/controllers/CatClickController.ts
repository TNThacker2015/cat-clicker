import { LSWrapper } from "../util/LS";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CatClickController extends AbstractElementController<HTMLSpanElement> {
	protected elementID = "click-cat";
	public register() {
		this.element.addEventListener("click", ev => {
			LSWrapper.incrCats(1n);
		})
		return true;
	}
}