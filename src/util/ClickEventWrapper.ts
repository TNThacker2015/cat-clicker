import { CatalogTickEvent } from "../controllers/CatalogTickController";
import { CatClickEvent } from "../controllers/CatClickController";
import { client } from "../meow";

export class ClickEventWrapper {
	private constructor() {};
	public static async getCatPerClick() {
		const catClick = new CatClickEvent(1n);
		client.emit("catClick", catClick);
		return catClick.getIncr();
	}
	public static async getAutoCPS() {
		const catTick = new CatalogTickEvent(0n);
		client.emit("catalogTick", catTick);
		return catTick.getIncr();
	}
}