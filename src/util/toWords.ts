const under20 = [
	"",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen",
	"twenty"
];
const multiples10 = [
	"",
	"ten",
	"twenty",
	"thirty",
	"forty",
	"fifty",
	"sixty",
	"seventy",
	"eighty",
	"ninety"
];
const low = ["hundred", "thousand"];
const higher = [
	"m",
	"b",
	"tr",
	"quadr",
	"quint",
	"sext",
	"sept",
	"oct",
	"non",
	"dec",
	"undec",
	"duodec",
	"tredec",
	"quattuordec",
	"quinquadec",
	"sedec",
	"septendec",
	"octodec",
	"novendec"
];
const highestPrefixes = [
	"",
	"un",
	"duo",
	"tres",
	"quattuor",
	"quinqua",
	"ses",
	"septem",
	"octo",
	"novem"
];
const vigints = [
	"vigint",
	"trigint",
	"quadragint",
	"quinquagint",
	"sexagint",
	"septuagint",
	"octogint",
	"nonagint",
	"cent",
	"decicent",
	"viginticent",
	"trigintacent",
	"quadragintacent",
	"quinquagintacent",
	"sexagintacent",
	"septuagintacent",
	"octogintacent",
	"nonagintacent"
];
const bigPrefix = [
	"",
	"deci",
	"viginti",
	"triginta",
	"quadraginta",
	"quinquaginta",
	"sexaginta",
	"septuaginta",
	"octoginta",
	"nonaginta"
];
const bigbois = [
	"ducent",
	"trecent",
	"quadringent",
	"quingent",
	"sescent",
	"septingent",
	"octingent",
	"nongent"
];
const nm = (num: bigint, m: bigint) => `.${num.toString().replace((num / m).toString(), "").slice(0, 3)}`.replace(/\.?0+$/, "");
export const toWords = (num: bigint): string => {
	if (num < 0n) return `-${toWords(-num)}`;
	// if (num <= 20) return under20[Number(num)];
	if (num < 10000) return num.toString();
	if (num < 1000000) return `${(Number(num) / 1000).toFixed(3).replace(/\.?0+$/, "")} thousand`;
	for (const [index, high] of higher.entries()) {
		const m = 10n ** ((BigInt(index) + 2n) * 3n);
		if (num < m * 1000n) return `${num / m}${nm(num, m)} ${high}illion`;
	}
	for (const [index, h] of vigints.entries()) {
		for (const [i, p] of highestPrefixes.entries()) {
			const m = 10n ** ((BigInt(index * 10 + i) + 21n) * 3n);
			if (num < m * 1000n) return `${num / m}${nm(num, m)} ${p}${h}illion`;
		}
	}
	for (const [index, h] of bigbois.entries()) {
		for (const [i, p] of bigPrefix.entries()) {
			for (const [j, s] of highestPrefixes.entries()) {
				const m = 10n ** ((BigInt(index * 100 + i * 10 + j) + 201n) * 3n);
				if (num < m * 1000n) return `${num / m}${nm(num, m)} ${s}${p}${h}illion`;
			}
		}
	}
	if (num < 10n**3006n) return `${num / 10n**3003n} millillion`;
	const str = toWords(10n ** (BigInt(num.toString().length - 1) - 3000n));
	const li = str.lastIndexOf(" ");
	return `${str.substring(0, li)} milli${str.substring(li + 1)}`
	return `1e+${num.toString().length - 1}`;
};
