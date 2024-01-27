import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/player.png")
k.loadSprite("bag", "/sprites/bag.png")
k.loadSprite("ghosty", "/sprites/ghosty.png")
k.loadSprite("venus", "/sprites/venus.png")
k.loadSprite("grass", "/sprites/grass.png")
k.loadSprite("hedge", "/sprites/hedge.png")
k.loadSprite("steel", "/sprites/steel.png")
k.loadSprite("prize", "/sprites/jumpy.png")
k.loadSprite("apple", "/sprites/apple.png")
k.loadSprite("portal", "/sprites/portal.png")
k.loadSprite("coin", "/sprites/coin.png")
k.loadSprite("acid", "/sprites/acid.png")
k.loadSound("coin", "/examples/sounds/score.mp3")
k.loadSound("powerup", "/examples/sounds/powerup.mp3")
k.loadSound("blip", "/examples/sounds/blip.mp3")
k.loadSound("hit", "/examples/sounds/hit.mp3")
k.loadSound("portal", "/examples/sounds/portal.mp3")

k.setBackground([40, 180, 99]);

setGravity(2500)

const SPEED = 320

k.add([
	text("Press arrow keys & WASD", { width: width() / 2 }),
	pos(12, 12),
])
// custom component controlling enemy patrol movement
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
const JUMP_FORCE = 1000
const MOVE_SPEED = 480
const FALL_DEATH = 90000

const LEVELS = [
	[
		"===================================================================================================",
		"= =<= ===                                                                                         =",
		"= = < = =                                                                                         =",
		"= <   < =                                                                                         =",
		"=        =                                                                                        =",
		"==  &     =                                                                                       =",
		"=   ===    ========================================================================================",
		"=  =====     =                                     =    <  <  <  <  <  <   =     =            =   =",
		"=   =  ==    =                                     =                       =     =                =",
		"==  =   ==   =                                     =                       =     == == == == ===  =",
		"=   =    ==  =  >   >   >   >   >   >   >   >   >  =                       =     =            =   =",
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
	// [
	// 	"    0       ",
	// 	"   --       ",
	// 	"       $$   ",
	// 	" %    ===   ",
	// 	"            ",
	// 	"   ^^  > = @",
	// 	"============",
	// ],
	// [
	// 	"                          $",
	// 	"                          $",
	// 	"                          $",
	// 	"                          $",
	// 	"                          $",
	// 	"           $$         =   $",
	// 	"  %      ====         =   $",
	// 	"                      =   $",
	// 	"                      =    ",
	// 	"       ^^      = >    =   @",
	// 	"===========================",
	// ],
	// [
	// 	"     $    $    $    $     $",
	// 	"%    $    $    $    $     $",
	// 	"                           ",
	// 	"                           ",
	// 	"                           ",
	// 	"                           ",
	// 	"      >   >                ",
	// 	"  ^^^^=^^^=^^^^>^^^^>^^^^^@",
	// 	"===========================",
	// ],
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
		"#": () => [
			sprite("apple"),
			area(),
			anchor("bot"),
			body(),
			offscreen({ hide: true }),
			"apple",
		],
		">": () => [
			sprite("ghosty"),
			area(),
			scale(1.1),
			anchor("bot"),
			body(),
			// patrol(),
			offscreen({ hide: true }),
			"enemy",
		],
		"@": () => [
			sprite("portal"),
			area({ scale: 0.5 }),
			anchor("bot"),
			pos(0, -12),
			offscreen({ hide: true }),
			"portal",
		],
		"&": () => [
			sprite("bean"),
			area(),
			scale(1),
			body(),
			anchor("bot"),
			"player",
		],
		">": () => [
			sprite("acid"),
			area(),
			scale(2),
			body(),
			anchor("bot"),
			"danger",
		]
	},
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)
	//gets the player rules from levels area
	const player = level.get("player")[0]

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

	player.onCollide("portal", () => {
		play("portal")
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
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

	onKeyDown("left", () => {
		player.move(-MOVE_SPEED, 0)
	})
	onKeyDown("a", () => {
		player.move(-MOVE_SPEED, 0)
	})

	onKeyDown("right", () => {
		player.move(MOVE_SPEED, 0)
	})
	onKeyDown("d", () => {
		player.move(MOVE_SPEED, 0)
	})

	onKeyPress("down", () => {
		player.weight = 3
	})
	onKeyPress("s", () => {
		player.weight = 3
	})

	onKeyRelease("down", () => {
		player.weight = 1
	})
	onKeyRelease("s", () => {
		player.weight = 1
	})

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
