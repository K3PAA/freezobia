import { Point } from "../lib/types";
import Sprite from "./Sprite";

class Bullet extends Sprite {
    width = 2 * 8 * 3;
	height = 3 * 8 * 3;
    offSet: Point = { x: 0, y: 0 };
    position: Point = { x: 0, y: 0 };
    velocity: Point = { x: 0, y: 0 };
    speed = 5;
    direction = 1;

    constructor({
        canvas,
		position,
		imgSrc,
		scale = 3,
		columns = 8,
		maxFrames = 8,
		width,
		height,
		offSet,
		direction,
    }) {
        super({
            canvas,
			position,
			imgSrc,
			scale,
			columns,
			maxFrames,
			width,
			height,
			offSet,
			direction,
        })
    }
}

export default Bullet;