export class EventEmitter {
	private target: EventTarget = new EventTarget();

	on(eventName: string, listener: EventListener | EventListenerObject | null) {
		return this.target.addEventListener(eventName, listener);
	}
	once(eventName: string, listener: EventListener | EventListenerObject | null) {
		return this.target.addEventListener(eventName, listener, { once: true });
	}
	off(eventName: string, listener: EventListener | EventListenerObject | null) {
		return this.target.removeEventListener(eventName, listener);
	}
	emit(eventName: string, detail?: unknown) {
		if (detail !== undefined) return this.target.dispatchEvent(new CustomEvent(eventName, { detail, cancelable: true }));
		else return this.target.dispatchEvent(new Event(eventName));
	}
}
