import { Catalog, CatalogItemType } from "../util/Catalog";
import { CatImages } from "../util/CatImages";
import { LSWrapper } from "../util/LS";
import { Random } from "../util/Random";
import { AbstractController } from "./AbstractController";
import { AbstractElementController } from "./AbstractElementController";
import { CatClickEvent } from "./CatClickController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CatalogApplyController extends AbstractController {
	public register() {
		this.client.on("catClick", this.eventHandler(CatalogItemType.CLICKS));
		this.client.on("catalogTick", this.eventHandler(CatalogItemType.CPS));
		return true;
	}
	public eventHandler(type: CatalogItemType) {
		return async (ev: CatClickEvent) => {
			const incr = ev.getIncr();
			ev.setIncr(new Promise(async res => {
				let toIncr = await incr;
				for (const item of Catalog.getCatalog())
					if (item.type === type) toIncr += item.value * BigInt(await item.getDatabaseAmount());
				res(toIncr);
			}));
		}
	}
}