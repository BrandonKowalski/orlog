import {Faces} from "./models/Faces.ts";
import {Game} from "./models/Game.ts";
import {Player} from "./models/Player.ts";

const game = new Game(new Player("Brandon"), new Player("Matt"));

const p1 = game.players[0];
const p2 = game.players[1];

let turn = function (player: Player) {
    let rolled = player.rollDice();
    let keep: Map<string, Faces> = new Map();

    rolled.forEach((v: Faces, k: string) => {
        if (player.timesRolled > 2 || Math.random() < 0.50) {
            keep.set(k, v);
        }
    });

    player.keepDice(keep);
}

while (p1.life !== 0 && p2.life !== 0) {
    for (let i = 0; i < 3; i++) {
        turn(p1);
        turn(p2);
    }

    game.score();

    console.log(p1);
    console.log(p2);
    console.log('\n');

    p1.resetDice();
    p2.resetDice();
}

console.log('\n');
console.log('\n');
console.log(p1);
console.log(p2);