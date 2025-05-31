export class IconSpinner {
    #isSpinning = false;
    #activeTasks = 0;
    #frame = 0;
    #originalFrame = "../images/person-raised-hand16.png";
    #framePaths = [
        "../images/person-raised-hand-loading16-01.png",
        "../images/person-raised-hand-loading16-02.png",
        "../images/person-raised-hand-loading16-03.png",
        "../images/person-raised-hand-loading16-04.png"
    ];

    async start() {
        this.#activeTasks++;
        if (this.#isSpinning) return;
        this.#isSpinning = true;

        while (this.#isSpinning) {
            await chrome.action.setIcon({path: {
                "16":this.#framePaths[this.#frame]
        }});
            this.#frame = (this.#frame + 1) % this.#framePaths.length;
            await this.#delay(120);
        }
    }

    stop () {
        this.#activeTasks--;
        if (this.#activeTasks > 0) return;
        this.#isSpinning = false;
        this.#frame = 0;
        chrome.action.setIcon({path: {
            "16":this.#originalFrame
        }});
    }

    #delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
