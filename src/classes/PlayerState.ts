import { AllowedKeysObject } from "../lib/types";
import idle from "../assets/char_idle_new.png"
import run from "../assets/char_run.png"

const SPRITES = {
	IDLE: {
		imageSrc: idle,
		columns: 8,
		maxFrames: 8
	},
	RUNNING: {
		imageSrc: run,
		columns: 8,
		maxFrames: 8
	},
};

const STATES = {
	IDLE: 0,
	RUNNING: 1,
};

class State {
	player: any;
	state: any;
	constructor({ player, state }: any) {
		this.player = player;
		this.state = state;
	}
}

class Idle extends State {
	constructor(player: any) {
		super({
			player,
			state: "IDLE",
		});
	}

	input = (keys: AllowedKeysObject) => {
    if (!keys.KeyW && !keys.KeyA && !keys.KeyS && !keys.KeyD) {
			this.player.setState(STATES.IDLE);
      this.player.setSprite(SPRITES.IDLE);
      this.player.velocity.x = 0
      this.player.velocity.y = 0
		}
		if (keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD) {
			this.player.setState(STATES.RUNNING);
      this.player.setSprite(SPRITES.RUNNING)
		}
	};
}

class Running extends State {
	constructor(player: any) {
		super({
			player,
			state: "RUNNING",
		});
	}

	input = (keys: AllowedKeysObject) => {
    if (keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD) {
			this.player.setState(STATES.RUNNING);
      this.player.setSprite(SPRITES.RUNNING)
		}
    if (keys.KeyA) {
      this.player.velocity.x = -this.player.speed
    }
    if (keys.KeyD) {
      this.player.velocity.x = this.player.speed
    }
    if (keys.KeyW) {
      this.player.velocity.y = -this.player.speed
    }
    if (keys.KeyS) {
      this.player.velocity.y = this.player.speed
    }
    if (!keys.KeyW && !keys.KeyA && !keys.KeyS && !keys.KeyD) {
			this.player.setState(STATES.IDLE);
      this.player.setSprite(SPRITES.IDLE)
		}
	};
}

export { SPRITES, STATES, Idle, Running };
