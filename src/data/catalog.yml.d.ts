export interface CatalogEntry {
	name: string;
	cost: number;
	unit: number;
	costUnit: number;
	value: number;
	type: "CPS" | "CLICKS";
}
export const catalog: CatalogEntry[];