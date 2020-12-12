import { catalog, CatalogEntry } from "../data/catalog.yml";
import SHA1 from "sha1";

export enum CatalogItemType {
	CPS,
	CLICKS,
}

export class CatalogItem {
	public readonly id: string = SHA1(this.name);
	protected static fromUnit(unit: number, num: number) {
		return 1000 ** unit * num;
	}
	public static fromEntry(entry: CatalogEntry) {
		return new this(
			entry.name,
			this.fromUnit(entry.costUnit, entry.cost),
			this.fromUnit(entry.value, entry.unit),
			CatalogItemType[entry.type]
		);
	}
	constructor(public name: string, public cost: number, public value: number, public type: CatalogItemType) {}
}
