import Dice, {Die} from "./Dice.ts";
import {Faces} from "./Faces.ts";

export class Player {
    name: string
    life: number
    tokens: number
    timesRolled: number

    castDice: Map<string, Faces>
    availableDice: Map<string, Die>

    constructor(name: string) {
        this.name = name;
        this.life = 15;
        this.tokens = 0;
        this.timesRolled = 0;

        this.castDice = new Map();
        this.availableDice = new Map(Dice);
    }

    rollDice(): Map<string, Faces> {
        this.timesRolled++;

        let tempCast: Map<string, Faces> = new Map();

        this.availableDice.forEach((d: Die, k: string) => {
            tempCast.set(k, d.roll());
        });

        return tempCast;
    }

    keepDice(kept: Map<string, Faces>) {
        kept.forEach((f: Faces, k: string) => {
            this.castDice.set(k, f);
            this.availableDice.delete(k);
        });
    }

    damage(amount: number) {
        this.life -= amount;
        this.life = Math.max(0, this.life);
    }

    setTokens(amount: number) {
        this.tokens = amount;
    }

    resetDice() {
        this.castDice = new Map();
        this.availableDice = new Map(Dice);
    }

}
