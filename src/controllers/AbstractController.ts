import { CatClient } from "../client/CatClient";

export abstract class AbstractController {
	public constructor(public client: CatClient) {};
	public preregister() { /* noop */ };
	public abstract register(): boolean | Promise<boolean>;
}
export type ExtendedController = new (client: CatClient) => AbstractController;