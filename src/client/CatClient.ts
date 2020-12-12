import { EventEmitter } from "../util/EventEmitter";
import type { AbstractController, ExtendedController } from "../controllers/AbstractController";
import { Database } from "../util/Database";

export type CatClientEvents = "tick" | "secTick" | "scrollCatSpawn";
export interface CatClientEventMap {
	scrollCatSpawn: CustomEvent<{ element: HTMLImageElement }>;
}
export class CatClient extends EventEmitter<CatClientEvents, CatClientEventMap> {
	protected registeredControllers: AbstractController[] = [];
	public constructor() {
		super();
	}
	public initialize() {
		setInterval(() => {
			this.emit("tick");
		}, 1);
		setInterval(() => {
			this.emit("secTick");
		}, 1000);
	}
	public async registerControllers(...controllers: ExtendedController[]) {
		for (const Controller of controllers) {
			const controller = new Controller(this);
			controller.preregister();
			if (await controller.register()) this.registeredControllers.push(controller);
			else throw new Error(`Controller ${Controller.name} failed to load!`);
		};
		this.hideLoading();
		Database.setCatalogItem("e", 10);
	}

	public hideLoading() {
		const loadingScreen = document.getElementById("page-cover");
		if (!loadingScreen) return;
		loadingScreen.remove();
	}
}