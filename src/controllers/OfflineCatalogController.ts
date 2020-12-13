import Swal from "sweetalert2";
import pms from "pretty-ms/index.js";
import { LSWrapper } from "../util/LS";
import { AbstractController } from "./AbstractController";
import { AbstractElementController } from "./AbstractElementController";
import { RegisterController } from "./RegisterController";
import { ClickEventWrapper } from "../util/ClickEventWrapper";
import { toWords } from "../util/toWords";

@RegisterController
export class CPSController extends AbstractController {
	private static DEFAULT_MAX_OFFLINE_TIME: number = 1 * 1000 * 60 * 60;
	public async register() {
		this.client.once("catalogTick", async ev => {
			if (!LSWrapper.getMaxOfflineTime()) LSWrapper.setMaxOfflineTime(CPSController.DEFAULT_MAX_OFFLINE_TIME);
			const lastOnline = LSWrapper.getLastOnline() || Date.now();
			const totalOffline = Date.now() - lastOnline;
			const gainTime = Math.min(LSWrapper.getMaxOfflineTime(), totalOffline);
			const gained = BigInt(Math.floor(gainTime / 1000)) * (await ClickEventWrapper.getAutoCPS());
			if (totalOffline >= 30000)
				Swal.fire({
					title: "Sleepy Cat",
					html: `You were offline for ${pms(totalOffline)}, and gained ${toWords(gained)} cats.
${
	LSWrapper.getMaxOfflineTime() < totalOffline
		? `<br><br>You exceeded your maximum offline time of ${pms(
				LSWrapper.getMaxOfflineTime()
		  )}, losing potential cats in the process.`
		: ""
}`,
					icon: "info",
					iconHtml: `;3`,
				});
			this.client.on("tick", async () => LSWrapper.setLastOnline(Date.now()));
		});
		return true;
	}
}
