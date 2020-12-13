import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CPSController extends AbstractElementController<HTMLSpanElement> {
	protected elementID = "small-display-cps";
	protected clicks = 0;
	public register() {
		window.addEventListener("click", ev => this.clicks++);
		this.client.on("secTick", async ev => {
			this.element.innerText = String(this.clicks);
			this.clicks = 0;
		});
		return true;
	}
}