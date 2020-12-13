export class LSManager {
	private constructor() {};
	protected static get(key: string) {
		return localStorage.getItem(key);
	}
	protected static getOrDefault(key: string, def: string) {
		return this.get(key) ?? def;
	}
	protected static set(key: string, val: string) {
		return localStorage.setItem(key, val);
	}
	protected static setIfNotPresent(key: string, val: string) {
		return this.get(key) ?? this.set(key, val), val;
	}
	public static getString(key: string) {
		return this.get(key);
	}
	public static setString(key: string, val: string) {
		return this.set(key, val);
	}
	public static getNumber(key: string) {
		const val = this.get(key);
		if (val === null) return null;
		return isNaN(+val) ? (this.set(key, "0"), 0) : +val;
	}
	public static setNumber(key: string, num: number) {
		this.set(key, String(num));
	}
	public static getJSON(key: string) {
		const val = this.get(key);
		if (val === null) return null;
		try {
			return JSON.parse(val);
		} catch (e) {
			if (!(e instanceof SyntaxError)) throw e;
			return null;
		}
	}
	public static setJSON(key: string, val: number | object | string | boolean) {
		return this.set(key, JSON.stringify(val));
	}
	public static getBigInt(key: string) {
		const val = this.get(key);
		if (val === null) return null;
		try {
			return BigInt(val);
		} catch (e) {
			if (!(e instanceof SyntaxError)) throw e;
			return null;
		}
	}
	public static setBigInt(key: string, val: bigint) {
		return this.set(key, String(val));
	}
}
export class LSWrapper {
	private constructor() {};
	public static getCats() {
		return LSManager.getBigInt("cats") ?? 0n;
	}
	public static setCats(num: bigint) {
		return LSManager.setBigInt("cats", num);
	}
	public static incrCats(num: bigint) {
		return this.setCats(this.getCats() + num);
	}
	public static getMaxOfflineTime() {
		return LSManager.getNumber("maxOfflineTime") ?? 0;
	}
	public static setMaxOfflineTime(num: number) {
		return LSManager.setNumber("maxOfflineTime", num);
	}
	public static getLastOnline() {
		return LSManager.getNumber("lastOnline") ?? 0;
	}
	public static setLastOnline(num: number) {
		return LSManager.setNumber("lastOnline", num);
	}
}