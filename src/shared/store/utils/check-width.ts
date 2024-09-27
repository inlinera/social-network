import { makeAutoObservable } from "mobx"

class CheckWidthStore {

    constructor() {
        makeAutoObservable(this);
        window.addEventListener('resize', this.updateWin);
     }

    width = window.innerWidth;

    get isMobile() {
        return this.width < 853;
    }

    updateWin = () => this.width = window.innerWidth;
}

export default new CheckWidthStore();