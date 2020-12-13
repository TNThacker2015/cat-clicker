import type { ExtendedController } from "./AbstractController";
import { client } from "../meow";

export const RegisterController = <T extends ExtendedController>(clazz: T) => {
	client.registerControllers(clazz);
	return clazz;
}