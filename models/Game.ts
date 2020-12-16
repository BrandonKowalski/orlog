import {Counts} from "./Counts.ts";
import {Faces} from "./Faces.ts";
import {Player} from "./Player.ts";

export class Game {

    players: [Player, Player]

    constructor(playerOne: Player, playerTwo: Player) {
        this.players = [playerOne, playerTwo]
    }

    score() {
        let p1 = this.players[0];
        let p2 = this.players[1];

        let c1 = this.tabulate(p1);
        let c2 = this.tabulate(p2);

        this.calculateDamage(p1, c1, c2);
        this.calculateDamage(p2, c2, c1);

        this.calculateTokens(p1, c1, p2, c2);

    }

    tabulate(player: Player): Counts {
        let counts = new Counts(player);

        player.castDice.forEach(value => {
            switch (value) {
                case Faces.AXE:
                    counts.axes++;
                    break;

                case Faces.ARROW_BORDERED:
                    counts.bordered++;
                case Faces.ARROW:
                    counts.arrows++;
                    break;

                case Faces.HELMET_BORDERED:
                    counts.bordered++;
                case Faces.HELMET:
                    counts.helmets++;
                    break;

                case Faces.SHIELD_BORDERED:
                    counts.bordered++;
                case Faces.SHIELD:
                    counts.shields++;
                    break;

                case Faces.HAND_BORDERED:
                    counts.bordered++;
                case Faces.HAND:
                    counts.hands++;
                    break;
            }
        });

        return counts;
    }

    calculateDamage(defender: Player, defenderCounts: Counts, attackerCounts: Counts) {
        let axeDamageReceived = Math.max(0, attackerCounts.axes - defenderCounts.helmets);
        let arrowDamageReceived = Math.max(0, attackerCounts.arrows - defenderCounts.shields);
        let netDamage = axeDamageReceived + arrowDamageReceived;

        defender.damage(netDamage);
    }

    calculateTokens(playerOne: Player, playerOneCounts: Counts, playerTwo: Player, playerTwoCounts: Counts) {
        let playerOneNetHands = Math.max(0, playerOneCounts.hands - playerTwoCounts.hands);
        let playerTwoNetHands = Math.max(0, playerTwoCounts.hands - playerOneCounts.hands);

        let playerOneTokens = playerOne.tokens + playerOneCounts.bordered;
        let playerTwoTokens = playerTwo.tokens + playerTwoCounts.bordered;

        if (playerTwoTokens - playerOneNetHands >= 0) {
            playerOneTokens += playerOneNetHands;
            playerTwoTokens -= playerOneNetHands;
        } else {
            playerOneTokens += playerTwoTokens;
            playerTwoTokens -= playerOneTokens;
        }

        if (playerOneTokens - playerTwoNetHands >= 0) {
            playerTwoTokens += playerTwoNetHands;
            playerOneTokens -= playerTwoNetHands;
        } else {
            playerTwoTokens += playerOneTokens;
            playerOneTokens -= playerTwoTokens;
        }

        playerOne.setTokens(Math.max(0, playerOneTokens));
        playerTwo.setTokens(Math.max(0, playerTwoTokens));
    }

}
