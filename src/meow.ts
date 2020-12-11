import "./style.scss";
import { toWords } from "./util/toWords";
import { LSWrapper } from "./util/LS";
import { CatClient } from "./client/CatClient";

export const client = new CatClient();

window.addEventListener("load", () => {
	client.initialize();
});