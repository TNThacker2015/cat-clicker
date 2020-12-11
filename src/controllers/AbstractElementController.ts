import { AbstractController } from "./AbstractController";

export abstract class AbstractElementController<T extends HTMLElement> extends AbstractController {
	protected abstract elementID: string;
	protected element!: T;
	public preregister() {
		const element = document.getElementById(this.elementID);
		if (element === null) throw new Error(`The element with ID of "${this.elementID}" for controller ${this.constructor.name} was not found.`);
		this.element = element as T;
	}
}