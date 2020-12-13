import { CatImages } from "../util/CatImages";
import { LSWrapper } from "../util/LS";
import { Random } from "../util/Random";
import { AbstractController } from "./AbstractController";
import { AbstractElementController } from "./AbstractElementController";
import { CatClickEvent } from "./CatClickController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CatalogTickController extends AbstractController {
	public register() {
		this.client.on("secTick", async ev => {
			const event = new CatalogTickEvent(0n);
			this.client.emit("catalogTick", event);
			LSWrapper.incrCats(await event.getIncr());
		});
		return true;
	}
}

export class CatalogTickEvent extends CatClickEvent {
	constructor(protected toIncr: bigint | Promise<bigint>) {
		super(toIncr, "catalogTick");
	}
}