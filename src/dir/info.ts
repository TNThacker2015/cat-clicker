import "./info.scss";
window.addEventListener("load", () => {
	const footer = document.querySelector("footer");
	if (!footer) return;
	footer.style.backgroundImage = `url(${document.querySelector("footer > img")?.getAttribute("src")})`;
});