import kaboom from "kaboom"



const k = kaboom()

loadSprite("player", "sprites/player1.png")
loadSprite("fall", "sprites/player2.png")
loadSprite("lookR", "sprites/player5.png")
loadSprite("lookL", "sprites/player6.png")
loadSprite("walkL", "sprites/moveleftspritesheet.png")
loadSprite("walkR", "sprites/moverightspritesheet.png")
loadSprite("venus", "/sprites/venus.png")
loadSprite("hedge", "/sprites/hedge.png")
loadSprite("acid", "/sprites/acid.png")
loadSound("hit", "/examples/sounds/hit.mp3")

setBackground([40, 180, 99]);

setGravity(2500)

k.add([
	text("Press arrow keys & WASD", { width: width() / 2 }),
	pos(12, 12),
])

// define some constants
const JUMP_FORCE = 1000
const MOVE_SPEED = 480
const FALL_DEATH = 90000

const LEVELS = [
	[
		"===================================================================================================",
		"= =<= ===                                                                                         =",
		"= = < = =                                                                                         =",
		"= <   < =                                                                                         =",
		"=       >=                                                                                        =",
		"==  &    >=                                                                                       =",
		"=   ===>  >========================================================================================",
		"=  =====>    =                                     =    <  <  <  <  <  <   =     =            =   =",
		"=   =  ==>   =                                     =                       =     =                =",
		"==  =   ==>  =                                     =                       =     == == == == ===  =",
		"=   =    ==> =  >   >   >   >   >   >   >   >   >  =                       =     =            =   =",
		"=  ===    ==    >   >   >   >   >   >   >   >   >                                =            =  ==",
		"=   =     ========================================================================            =   =",
		"==  =  =  =                                                                      =            ==  =",
		"=   =     =                                                                      =            =   =",
		"=  ===   ==                                                                      =            =  ==",
		"=   =     =                                                                      =            =   =",
		"==  =  =  =  =====================================================================            ==  =",
		"=   =     =                                                                      =            =   =",
		"=  ===    =                                                                      == == == == ==  ==",
		"=   =    ==                                                                      == == == == ==   =",
		"==  =  =  =                                                                      == == == == ===  =",
		"=   =     =                                                                      == == == == ==   =",
		"=  ==    ==  ====================================================================== == == == ==  ==",
		"=   ==    =                                                                      == == == == ==   =",
		"==  =  =  =                                                                      == == == == ===  =",
		"=   =     =                                                                      == == == == ==   =",
		"=  ===    =                                                                      == == == == ==  ==",
		"=   =                                                                            == == == == ==   =",
		"==  =============================================================================== == == == ===  =",
		"=   =                =                                                           == == == == ==   =",
		"=  ==                =                                                           == == == == ==  ==",
		"=   =                =     =        =     =                                      ===== ========   =",
		"==  = =^   ^      ^  =  =  =  =  =  =  =  =  =  =                                             ==  =",
		"=     ==   =   ^  =     =^^=^^=^^=^^=^^=^^=^^=^^=                                             =   =",
		"================================================================================================= =",
		"=    <  <  <  =     <    <     =                                                         =        =",
		"=             =                =                                                         = ========",
		"=             =                =                                                         =        =",
		"=             =                =   ==  =  =  ==  =  =                                    ======== =",
		"=    =  =  =     ^     ^     ^     ^^^^^^^^^^^^^^^^^^^^^                                          =",
		"================================================================================================= =",
		"=        =   <=====<                                                                          =   =",
		"=        =    <===<   =^=  ==                                                                 =  ==",
		"=        = =   <<<   ==     <                                                                 =   =",
		"=          ==       ===^                                                                      ==  =",
		"=          ===       ^====                                                                        =",
		"===================================================================================================",
	],
]

// define what each symbol means in the level graph
const levelConf = {
	tileWidth: 64,
	tileHeight: 64,
	tiles: {
		"=": () => [
			sprite("hedge"),
			area(),
			scale(2),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"platform",
		],

		"-": () => [
			sprite("steel"),
			area(),
			body({ isStatic: true }),
			offscreen({ hide: true }),
			anchor("bot"),
		],
		"0": () => [
			sprite("bag"),
			area(),
			body({ isStatic: true }),
			offscreen({ hide: true }),
			anchor("bot"),
		],
		"$": () => [
			sprite("coin"),
			area(),
			pos(0, -9),
			anchor("bot"),
			offscreen({ hide: true }),
			"coin",
		],
		"%": () => [
			sprite("prize"),
			area(),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"prize",
		],
		"^": () => [
			sprite("venus"),
			area(),
			scale(1.5),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger",
			// fixed(),
		],
		"<": () => [
			sprite("venus"),
			area(),
			scale(1.5),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger",
			pos(0, -66),
			rotate(180),
			// fixed(),
		],
		"&": () => [
			sprite("player", {anim: "idle" }),
			area(),
			scale(1),
			body(),
			anchor("center"),
			"player",
		],
		">": () => [
			sprite("acid"),
			area(),
			scale(1.4),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger2",
			// fixed(),
		]
	},
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

	//gets the player rules from levels area
	const player = level.get("player")[0]

	loadSprite("player", "sprites/spritesheet.png", {
		sliceX: 2,
		sliceX: ,
	}





	)

	// action() runs every frame
	player.onUpdate(() => {

		// center camera to player
		camPos(player.pos)

		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("death")
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
		go("death")
		play("hit")
	})

	function jump() {
		// these 2 functions are provided by body() component
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
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
	onKeyDown("right", moveRight);
	onKeyDown("d", moveRight);

	onGamepadButtonPress("south", jump)

	onGamepadStick("left", (v) => {
		player.move(v.x * MOVE_SPEED, 0)
	})

	onKeyPress("f", () => {
		setFullscreen(!isFullscreen())
	})
})

k.scene("death", () => {
	k.add([
		text("You Died"),
		pos(center()),
	])
	onKeyPress(() => go("game"))
})

scene("win", () => {
	add([
		text("You Win"),
	])
	onKeyPress(() => go("game"))
})

go("game")


// npm run dev
