import { AbstractController } from "./AbstractController";
import { RegisterController } from "./RegisterController";
@RegisterController
export class CPSController extends AbstractController {
	protected channel = new BroadcastChannel("main");
	public register() {
		this.client.on("sec-tick", ev => {
			this.channel.postMessage("Tab open!");
		});
		this.channel.addEventListener("message", ev => window.location.href = "about:blank")
		return true;
	}
}