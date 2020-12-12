import { UnionToIntersection } from "./Util";

export type EventTypes = "tick" | "secTick" | "scrollCatSpawn";
export class EventEmitter<U extends string, V extends { [index in U]?: CustomEvent }> {
	private target: EventTarget = new EventTarget();

	on<L extends U>(eventName: L, listener: (ev: L extends keyof V ? V[L] : Event) => void) {
		return this.target.addEventListener(eventName, listener as EventListener);
	}
	once<L extends U>(eventName: L, listener: (ev: L extends keyof V ? V[L] : Event) => void) {
		return this.target.addEventListener(eventName, listener as EventListener, { once: true });
	}
	off<L extends U>(eventName: L, listener: (ev: L extends keyof V ? V[L] : Event) => void) {
		return this.target.removeEventListener(eventName, listener as EventListener);
	}
	emit<L extends U>(eventName: L, detail?: V[L] extends CustomEvent ? V[L]["detail"] : undefined) {
		if (detail !== undefined) return this.target.dispatchEvent(new CustomEvent(eventName, { detail, cancelable: true }));
		else return this.target.dispatchEvent(new Event(eventName));
	}
}
