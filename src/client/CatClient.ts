import { EventEmitter } from "../util/EventEmitter";
import type { AbstractController, ExtendedController } from "../controllers/AbstractController";

export class CatClient extends EventEmitter {
	protected registeredControllers: AbstractController[] = [];
	public constructor() {
		super();
	}
	public initialize() {
		setInterval(() => {
			this.emit("tick");
		}, 1);
		setInterval(() => {
			this.emit("sec-tick");
		}, 1000);
	}
	public registerControllers(...controllers: ExtendedController[]) {
		for (const Controller of controllers) {
			const controller = new Controller(this);
			controller.preregister();
			if (controller.register()) this.registeredControllers.push(controller);
			else throw new Error(`Controller ${Controller.name} failed to load!`);
		};
	}
}