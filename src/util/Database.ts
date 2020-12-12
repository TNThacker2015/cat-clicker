import * as idb from "idb";
export const catalogDB = await idb.openDB("catalog", 1, {
	upgrade(init) {
		if (!init.objectStoreNames.contains("catalog")) {
			const catalogStore = init.createObjectStore("catalog", { keyPath: "id" });
			catalogStore.createIndex("amount", "amount", { unique: false });
		}
	},
});
export interface CatalogDatabaseEntry {
	id: string;
	amount: number;
}
export class Database {
	private constructor() {}
	public static getCatalogItem(id: string): Promise<CatalogDatabaseEntry | null> {
		const trx = catalogDB.transaction("catalog", "readonly");
		return trx.objectStore("catalog").get(id);
	}
	public static setCatalogItem(id: string, amount: number) {
		const trx = catalogDB.transaction("catalog", "readwrite");
		const obj = trx.objectStore("catalog");
		return this.getCatalogItem(id) ? obj.put({ amount, id }) : obj.add({ amount }, id);
	}
	public static async getOrCreateCatalogItem(id: string) {
		return await this.getCatalogItem(id) ?? (await this.setCatalogItem(id, 0), await this.getCatalogItem(id));
	}
}
console.log(Database);
