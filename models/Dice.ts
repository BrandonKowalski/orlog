import {Faces} from "./Faces.ts";

export class Die {
    faces: Array<Faces>

    constructor(faces: Array<Faces>) {
        this.faces = faces;
    }

    roll(): Faces {
        let face = Math.floor(Math.random() * 6);
        return this.faces[face];
    }

}

const Dice: Map<string, Die> = new Map(
    [
        ["d1", new Die([Faces.AXE, Faces.ARROW_BORDERED, Faces.AXE, Faces.SHIELD, Faces.HAND_BORDERED, Faces.HELMET])],
        ["d2", new Die([Faces.AXE, Faces.ARROW, Faces.AXE, Faces.SHIELD_BORDERED, Faces.HELMET, Faces.HAND_BORDERED])],
        ["d3", new Die([Faces.AXE, Faces.HAND, Faces.AXE, Faces.ARROW_BORDERED, Faces.SHIELD, Faces.HELMET_BORDERED])],
        ["d4", new Die([Faces.AXE, Faces.HAND_BORDERED, Faces.ARROW, Faces.SHIELD, Faces.AXE, Faces.HELMET_BORDERED])],
        ["d5", new Die([Faces.AXE, Faces.HAND, Faces.AXE, Faces.SHIELD_BORDERED, Faces.ARROW_BORDERED, Faces.HELMET])],
        ["d6", new Die([Faces.AXE, Faces.HAND, Faces.AXE, Faces.SHIELD_BORDERED, Faces.HELMET_BORDERED, Faces.ARROW])]
    ]
);

export default Dice;
