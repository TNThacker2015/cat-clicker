import { catalog, CatalogEntry } from "../data/catalog.yml";
import SHA1 from "sha1";
import { Database } from "./Database";

export enum CatalogItemType {
	CPS,
	CLICKS,
}

export class CatalogItem {
	public readonly id: string = SHA1(this.name);
	protected cached?: number;
	protected static fromUnit(unit: number, num: number) {
		return 1000n ** BigInt(unit) * BigInt(num);
	}
	public static fromEntry(entry: CatalogEntry) {
		return new CatalogItem(
			entry.name,
			CatalogItem.fromUnit(entry.costUnit, entry.cost),
			CatalogItem.fromUnit(entry.unit, entry.value),
			CatalogItemType[entry.type]
		);
	}
	constructor(public name: string, public cost: bigint, public value: bigint, public type: CatalogItemType) {}
	public getPrice(count: number) {
		return BigInt(Math.round(1000000 * (Math.log(count + 1) / 2 * count + 1) + count ** 2 /5000)) * this.cost / 1000000n;
		//// return (this.cost * BigInt(Math.round((count + 1) ** (3/5) * 10000))) / 10000n;
	}
	public async getEnsuredDatabaseEntry() {
		return Database.getOrCreateCatalogItem(this.id);
	}
	public async setDatabaseAmount(amount: number) {
		this.cached = amount;
		return Database.setCatalogItem(this.id, amount);
	}
	public async incrDatabaseAmount(amount: number = 1) {
		return this.setDatabaseAmount(amount + (await this.getEnsuredDatabaseEntry()).amount);
	}
	public async getDatabaseAmount() {
		if (this.cached !== undefined) return this.cached;
		return this.cached = (await this.getEnsuredDatabaseEntry()).amount;
	}
}
export class Catalog {
	private constructor() {};
	protected static catalog: CatalogItem[] = catalog.map(CatalogItem.fromEntry);
	public static getCatalog(): readonly CatalogItem[] {
		return this.catalog;
	}
}
console.log(Catalog);