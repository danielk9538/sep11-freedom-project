
import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("player", "sprites/spritesheet.png", {
    sliceX: 7,  // Adjusted for 7 sprites horizontally
    sliceY: 1,
    anims: {
        run: {
            from: 3,
            to: 4,
            loop: true,
        },
        "jump-up": 1,
        "jump-down": 0,
    },
});
k.loadSprite("checkpoint", "/sprites/flowercheckpoint.png");
k.loadSprite("spike", "/sprites/spike.png");
k.loadSprite("metal", "/sprites/metal.png");
k.loadSprite("acid", "/sprites/toxicwaste.png");
k.loadSprite("door", "/sprites/iron-door.png");
k.loadSprite("scrap", "/sprites/scrap.png");
k.loadSprite("dog", "/sprites/dog.png");
// k.loadSound("hit", "/examples/sounds/hit.mp3");

k.setBackground([128, 128, 128]);

k.add([
	text("Press arrow keys or WASD", {
		width: width() / 2 }),
	pos(12, 12),
])
setGravity(2000)
getGravity(2000)

function patrol(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area" ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

// define some constants
const JUMP_FORCE = 900
const MOVE_SPEED = 400
const FALL_DEATH = 5000
const LEVELS = [
	[
		"===================================================================================================",
		"= =<= ===     <<     <<         <<         <<     <       <<          <<         =  0             =",
		"= = < = =6                                                                        ==              =",
		"= <   < ==                                                                          ==            =",
		"=0      >==           0               0              0             0                  ==          =",
		"==       >==  =^=  =^=  =^=  =^=  =^=  =^=  =^=  =^=     ==^^==^    =   =^^^===              &  9 =",
		"=   ===>  >========================================================================================",
		"=  =====>    =                                     =    <  <  <  <  <  <  =      =            =   =",
		"=   =  ==>   =                                     =                      =      =                =",
		"==  =   ==>  =        0        0       0      0    =     0      0         =      ==  ====  =====  =",
		"=   =1   ==> =  >   >   >   >   >   >   >   >   >  =                      =      =            =   =",
		"=  ===    ==    >   >   >   >   >   >   >   >   >       =  =  =  =  =  =         =            =  ==",
		"=   =     ==================================================================     =            =   =",
		"==  =  =  =  =                            =    <     <     <     <         ==    ====  ==  =====  =",
		"=   =    ^=  =    0      0         0      =                                =    ===           =   =",
		"=  ===   ==  =                            =           0         0          =  =  ==   =====   =  ==",
		"=   =  0  =4   ^   ^   ^   ^   ^   ^   ^    ^     ^     ^     ^     ^     5=     ==           =   =",
		"==  =  =  ==================================================================  =  ==           ==  =",
		"=   =^    =  =  = = = = = = = = = = = = = =  =   <  <  <  <  <  <  <  <    =     ==  ==   ==  =   =",
		"=  ===    =  =  = =   = = =   =   = = =   =  =                             = =   ==           =  ==",
		"=   =  0 ==  =    = =  0  = =   = =   = =    =                             =     ==           =   =",
		"==  =  =  =  =  =   = = = = = = =   = 0 = =  =                             =   = ==           ==  =",
		"=   =     =2    = = = = =   = = = = = = = =      ^  ^  ^  ^  ^  ^   0     3=     ==           =   =",
		"=  ==^   ===================================================================    === == == == ==  ==",
		"=   ==    =<  <  <  <  <  <  <  <  <  <  < =    =                                == == == == ==   =",
		"==  =  =  =                                =                                     == == == == ===  =",
		"=   =     =      0          0              =                   =                 == == == == ==   =",
		"=  ===    =                                =   =               =                 == == == == ==  ==",
		"=   =         ^     ^     ^     ^     ^        =       g       =g     =^         == == == == ==   =",
		"==  =============================================================================== ==7== == ===  =",
		"=   =                   =        0        0       =              0               == == == == ==   =",
		"=  == 0                 =                         =                              ==^==^==^==^==  ==",
		"=   =                   =        =        =       =     =        =     =         ==============   =",
		"==  =   =^   ^      ^   =    =   =   =    =    =  =  =  =  =  =  =  =  =  =  =   =    8       ==  =",
		"=       ==   =   ^  =        =>>>=>>>=>>>>=>>>>=     =^^=^^=^^=^^=^^=^^=^^=^^=          =   0 =   =",
		"================================================================================================= =",
		"=     0=  <  <  <  =     <    <     =                           =   <<<<<<<<<<<<<<<<<    =        =",
		"= ======           =                =              0            =                        = ========",
		"=      =           =     0     0    =                           =                        =        =",
		"==     =           =                =   ==  =  =  ==  =  =      =    ^ ^   ^   ^   ^     ======== =",
		"=         =  =  =     ^     ^     ^     ^^^^^^^^^^^^^^^^^^^^^        > >   >   >   >              =",
		"= =================================================================================================",
		"=      =     =   <=====<           =             =                    =                   =       =",
		"====== =     =    <===<   =^=  ==  =    0        =                    =      ==           =       =",
		"=      =     = =   <<<   ==     <  =   ==        =    ==   0   ==  =  =   == <= 0       = =       =",
		"= ======     = ==       ===^       =   ==  ==  = = == =   ===   =  =  =         ==  ^=    =       =",
		"=   0     ^    ===      0^====       ^^==^^==^^=   =^^=^^^^=^^^^=^^=     ^  ^^^^^=  =>         s  =",
		"===================================================================================================",
	],
	[
		" ===== ===== ",
		" =   = =   = ",
		" =     =  0  ",
		" =  == =  == ",
		" = 0 =&=  9= ",
		" ===== ===== ",
		"=============",
	],
]
// define what each symbol means in the level graph
const levelConf = {
	tileWidth: 64,
	tileHeight: 64,
	tiles: {
		"=": () => [
			sprite("metal"),
			area(),
			scale(1),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"platform",
		],
		"s": () => [
			sprite("metal"),
			area(),
			scale(0.01),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"spawn",
		],
		"g": () => [
			sprite("dog"),
			area(),
			scale(0.08),
			anchor("bot"),
			body(),
			patrol(),
			offscreen({ hide: true }),
			"danger",
		],
		"^": () => [
			sprite("spike"),
			area(),
			scale(.5),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger",
		],
		"<": () => [
			sprite("spike"),
			area(),
			scale(.5),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger",
			pos(0, -66),
			rotate(180),
		],
		"&": () => [
			sprite("player"),
			area(),
			scale(1),
			body(),
			anchor("center"),
			"player",
		],
		"0": () => [
			sprite("scrap"),
			area(),
			scale(.03),
			anchor("center"),
			"scrap",
		],
		">": () => [
			sprite("acid"),
			area(),
			scale(1.4),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger2",
		],
		"$": () => [
			sprite("checkpoint"),
			area(),
			scale(1.4),
			body({ isStatic: false }),
			anchor("bot"),
			offscreen({ hide: true }),
			"safe",
		],
		"1": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal",
		],
		"2": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal1",
		],
		"3": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal2",
		],
		"4": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal3",
		],
		"5": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal4",
		],
		"6": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal5",
		],
		"7": () => [
			sprite("door"),
			area(),
			scale(0.01),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal6",
		],
		"8": () => [
			sprite("door"),
			area(),
			scale(0.01),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"portal7",
		],
		"9": () => [
			sprite("door"),
			area(),
			scale(0.3),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"finaldoor",
		],
	},
}

k.scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

	//gets the player rules from levels area
	const player = level.get("player")[0]

	player.onUpdate(() => {
		// center camera to player
		camPos(player.pos)
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			player.pos = level.get("spawn")[0].pos; // Move player to spawn position
			go("game")
		}
	})

	player.onBeforePhysicsResolve((collision) => {
		if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
			collision.preventResolution()
		}
	})
	player.onPhysicsResolve(() => {
		// Set the viewport center to player.pos
		camPos(player.pos)
	})
	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
		player.pos = level.get("spawn")[0].pos; // Move player to spawn position
		go("game")
		// play("hit");
	});
	// if player onCollide with any obj with "door" tag, Move player to next portal position
	player.onCollide("portal", () => {
		player.pos = level.get("portal1")[0].pos;
	});
	player.onCollide("portal2", () => {
		player.pos = level.get("portal3")[0].pos;
	});
	player.onCollide("portal4", () => {
		player.pos = level.get("portal5")[0].pos;
	});
	player.onCollide("portal6", () => {
		player.pos = level.get("portal7")[0].pos;
	});

	player.onCollide("scrap", (s) => {
		destroy(s)
		coins += 1
		coinsLabel.text = coins
	})

	const coinsLabel = add([
		text(coins),
		pos(24, 24),
		fixed(),
	])
	let stopwatch = 0

	const timer = add([
		anchor("topright"),
		pos(width() - 48, 24),
		text(stopwatch),
		fixed(),
	])

	player.onUpdate(() => {
		stopwatch += dt()
		timer.text = stopwatch.toFixed(2)
	})

	player.onCollide("finaldoor", () => {
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win", { coins: coins })
		}
	})

k.scene("win", ({ coins }) => {

		add([
			text(`You grabbed ${coins}/45 scrap!!! within ${stopwatch}`,{
			}),
			pos(width() / 2, height() / 2),
			anchor("center"),
		])

		onKeyPress(start)

	})
	// Define the sign function
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}
		// detect when the player sprite collides with the block
player.onCollide("danger2", (obj) => {
    // Calculate the knockback direction based on the player's position relative to the danger object
    const knockbackDir = vec2(
        sign(player.pos.x - obj.pos.x),-1
    );

    // Apply knockback force to the player
    player.move(knockbackDir.scale(900)); // Adjust the knockback force as needed
});

	function jump() {
		// these 2 functions are provided by body() component
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
			player.play("jump")
		}
	}
	// jump with space
	onKeyPress("space", jump)
	onKeyPress("up", jump)
	onKeyPress("w", jump)
	function moveLeft() {
		player.move(-MOVE_SPEED, 0);
	}
	onKeyDown("left", moveLeft);
	onKeyDown("a", moveLeft);
	function moveRight() {
		player.move(MOVE_SPEED, 0);
	}
	// onKeyDown("right", moveRight);
	// onKeyDown("d", moveRight);
	// onGamepadButtonPress("south", jump)
	// onGamepadStick("left", (v) => {
	// 	player.move(v.x * MOVE_SPEED, 0)
	// })
	onKeyDown("right", () => {
		player.move(SPEED, 0)
		player.flipX = false
		if (player.isGrounded() && player.curAnim() !== "run") {
			player.play("run")
		}
	})
	onKeyPress("f", () => {
		setFullscreen(!isFullscreen())
	})
})
go("game")

function start() {
	// Start with the "game" scene, with initial parameters
	go("game", {
		levelId: 0,
		coins: 0,
	})
}
// npm run dev
