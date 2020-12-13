import { CatImages } from "../util/CatImages";
import { LSWrapper } from "../util/LS";
import { Random } from "../util/Random";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CatClickController extends AbstractElementController<HTMLElement> {
	protected elementID = "cat-scroller";
	protected activeScrollCats: Set<HTMLImageElement> = new Set();
	public register() {
		this.client.on("scrollCatSpawn", ev => {
			const { element: cat } = ev.detail;
			this.activeScrollCats.add(cat);
		});
		this.client.on("tick", async ev => {
			if (this.activeScrollCats.size > 40) {
				const rand = Random.sample([...this.activeScrollCats]);
				this.activeScrollCats.delete(rand);
				rand.remove();
			}
			for (const cat of this.activeScrollCats) {
				if (!cat.style.top) cat.style.top = "0px";
				if (!cat.style.transform) cat.style.transform = "rotate(0deg)";
				const top = Number(cat.style.top.match(/-?\d+(\.\d+)?/)?.[0]);
				const rotate = Number(cat.style.transform.match(/-?\d+(\.\d+)?/)?.[0]);
				if (top > (window.innerHeight + cat.height)) {
					this.activeScrollCats.delete(cat);
					cat.remove();
					continue;
				}
				cat.style.top = `${top + Number(cat.getAttribute("data-move-speed") ?? 1)}px`
				cat.style.transform = `rotate(${rotate + Number(cat.getAttribute("data-spin-speed") ?? 1)}deg)`
			}
		})
		return true;
	}
}