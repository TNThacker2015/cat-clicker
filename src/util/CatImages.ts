import { Random } from "./Random";

export class CatImages {
	private constructor() {}
	protected static images: string[] = [
		"axocat",
		"cancat",
		"radcat2",
		"tencat",
		"zefcat",
		"bowcat",
		"fincat",
		"soccercat",
		"tencatputer",
		"zircat",
		"guhcat",
	];
	public static getCats(): readonly string[] {
		return this.images;
	}
	public static toURL(cat: string) {
		return `/${cat}.png`;
	}
	public static getRandomCat() {
		return Random.sample(this.images);
	}
	public static getRandomCatURL() {
		return this.toURL(this.getRandomCat());
	}
}
