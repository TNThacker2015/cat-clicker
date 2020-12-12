import { CatImages } from "../util/CatImages";
import { LSWrapper } from "../util/LS";
import { Random } from "../util/Random";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class BackgroundRandomizer extends AbstractElementController<HTMLElement> {
	protected elementID = "bg-overlay";
	public register() {
		this.element.style.backgroundImage = `url("background${Random.randint(10, 1)}.png")`;
		return true;
	}
}