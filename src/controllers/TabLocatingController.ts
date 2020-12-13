import { AbstractController } from "./AbstractController";
import { RegisterController } from "./RegisterController";7

@RegisterController
export class CPSController extends AbstractController {
	protected channel = new BroadcastChannel("main");
	public register() {
		this.client.on("secTick", async ev => {
			this.channel.postMessage("Tab open!");
		});
		this.channel.addEventListener("message", ev => window.location.href = "/illegal.html")
		return true;
	}
}