export class Random {
	private constructor() {};
	public static randfloat(size: number, min: number = 0) {
		return Math.random() * size + min;
	}
	public static randint(size: number, min?: number) {
		return Math.floor(this.randfloat(size, min));
	}
	public static sample<T>(arr: T[]): T {
		return arr[this.randint(arr.length)];
	}
}