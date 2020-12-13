import { CatImages } from "../util/CatImages";
import { LSWrapper } from "../util/LS";
import { Random } from "../util/Random";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CatClickController extends AbstractElementController<HTMLSpanElement> {
	protected elementID = "click-cat";
	public register() {
		const catScroller = document.getElementById("cat-scroller");
		if (!catScroller) return false;
		this.element.addEventListener("click", async ev => {
			const event = new CatClickEvent(1n);
			this.client.emit("catClick", event);
			LSWrapper.incrCats(await event.getIncr());
			const scrollCat = document.createElement("img");
			scrollCat.classList.add("scrolling-cat");
			scrollCat.src = CatImages.getRandomCatURL();
			scrollCat.style.left = `${Random.randint(document.body.scrollWidth)}px`;
			scrollCat.style.width = `${Random.randfloat(4, 1)}rem`;
			scrollCat.style.top = `${-scrollCat.scrollHeight}px`;
			scrollCat.style.transform = `rotate(${Random.randint(360)}deg)`;
			scrollCat.setAttribute("data-move-speed", String(Random.randfloat(4, 0.5)));
			scrollCat.setAttribute("data-spin-speed", Math.round(Math.random()) ? 
				String(Random.randfloat(8, -3.5))
				: String(Random.randfloat(0.4, -0.2)));
			catScroller.append(scrollCat);
			this.client.emit("scrollCatSpawn", { element: scrollCat });
		});
		return true;
	}
}

export class CatClickEvent extends CustomEvent<{}> {
	constructor(protected toIncr: bigint | Promise<bigint>, protected eventName = "catClick") {
		super(eventName);
	};
	public setIncr(toIncr: bigint | Promise<bigint>) {
		this.toIncr = toIncr;
	}
	public getIncr() {
		return this.toIncr;
	}
}