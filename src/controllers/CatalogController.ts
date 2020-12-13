import { Catalog, CatalogItem, CatalogItemType } from "../util/Catalog";
import { CatImages } from "../util/CatImages";
import { Database } from "../util/Database";
import { LSWrapper } from "../util/LS";
import { Random } from "../util/Random";
import { toWords } from "../util/toWords";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";

@RegisterController
export class CatalogController extends AbstractElementController<HTMLSpanElement> {
	protected elementID = "catalog-items";
	protected elementMap: Map<CatalogItem, HTMLDivElement> = new Map();
	public async register() {
		for (const catItem of Catalog.getCatalog()) {
			const elem = await this.toElement(catItem);
			this.element.append(elem);
			this.elementMap.set(catItem, elem);
		}
		this.client.on("tick", async ev => {
			for (const [item, elem] of this.elementMap) {
				this.updateElement(item, this.extractChildren(elem));
			}
		});
		return true;
	}
	public async toElement(item: CatalogItem) {
		const elem = document.createElement("div");
		elem.classList.add("catalog-item");
		const amt = (await Database.getOrCreateCatalogItem(item.id)).amount;
		const button = this.createElementWithText("button", "BUY");
		elem.append(
			document.createElement("h2"),
			this.createElementWithText("h3", item.name),
			document.createElement("p"),
			document.createElement("p"),
			button
		);
		let canRun = true;
		button.addEventListener("click", async ev => {
			if (!canRun) return;
			if (elem.hasAttribute("data-disabled")) return;
			canRun = false;
			const price = item.getPrice(await item.getDatabaseAmount());
			if (LSWrapper.getCats() < price) return;
			await item.incrDatabaseAmount(1);
			LSWrapper.incrCats(-price);
			canRun = true;
		});
		await this.updateElement(item, this.extractChildren(elem));
		return elem;
	}
	public async updateElement(item: CatalogItem, { amount, desc, cost, elem }: CatalogItemChildren) {
		const amt = await item.getDatabaseAmount();
		amount.innerText = String(amt);
		desc.innerText = `+${toWords(item.value)} ${item.type === CatalogItemType.CPS ? "Automatic CPS" : "Cats Per Click"}`;
		const price = item.getPrice(amt);
		cost.innerText = `Cost: ${toWords(price)} Cats`;
		const elemDisabled = elem.hasAttribute("data-disabled");
		const cats = LSWrapper.getCats();
		if (!elemDisabled && price > cats) elem.setAttribute("data-disabled", "");
		else if (elemDisabled && price < cats) elem.removeAttribute("data-disabled");
	}
	public extractChildren(elem: HTMLDivElement) {
		const [amount, title, desc, cost, button] = elem.children;
		return { amount, title, desc, cost, button, elem } as CatalogItemChildren;
	}
	protected createElementWithText<T extends keyof HTMLElementTagNameMap>(tag: T, text: string) {
		const elem = document.createElement(tag);
		elem.innerText = text;
		return elem;
	}
}

export interface CatalogItemChildren {
	amount: HTMLHeadingElement;
	title: HTMLHeadingElement;
	desc: HTMLParagraphElement;
	cost: HTMLParagraphElement;
	button: HTMLButtonElement;
	elem: HTMLHeadingElement;
};