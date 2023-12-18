import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/player.png")
k.loadSprite("bag", "/sprites/bag.png")
k.loadSprite("ghosty", "/sprites/ghosty.png")
k.loadSprite("spike", "/sprites/spike.png")
k.loadSprite("grass", "/sprites/grass.png")
k.loadSprite("hedge", "/sprites/hedge.png")
k.loadSprite("steel", "/sprites/steel.png")
k.loadSprite("prize", "/sprites/jumpy.png")
k.loadSprite("apple", "/sprites/apple.png")
k.loadSprite("portal", "/sprites/portal.png")
k.loadSprite("coin", "/sprites/coin.png")
k.loadSound("coin", "/examples/sounds/score.mp3")
k.loadSound("powerup", "/examples/sounds/powerup.mp3")
k.loadSound("blip", "/examples/sounds/blip.mp3")
k.loadSound("hit", "/examples/sounds/hit.mp3")
k.loadSound("portal", "/examples/sounds/portal.mp3")

k.setBackground([255, 205, 0]);

// k.add([
// 	rect(width(), 100),
// 	outline(4),
// 	area(),
// 	pos(0, height() - 48),
// 	body({ isStatic: true }),
// ])

k.onClick(() => k.addKaboom(k.mousePos()))

setGravity(3000)

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
const JUMP_FORCE = 1100
const MOVE_SPEED = 480
const FALL_DEATH = 2400

const LEVELS = [
	[
		" =============================================================",
		"     <  <  <  =     <    <     =                             =",
		"              =                =                             =",
		"              =                =                             =",
		"              =                =    === = = === = = = = =    =",
		"     =  =  =     ^     ^     ^    ^^^^^^^^^^^^^^^^^^^^^  ^   =",
		"==============================================================",
		"        =    <=====<                        $",
		"        =     <===<                        $",
		"        = =    <<<                          $",
		"        = ==                             $",
		"          === ^    ^       ^     ^          $",
		"==========================================",
		"                          $$         =   $",
		"                        ====         =   $",
		"                                     =   $",
		" %                                        ",
		"        ^^    ^^^     ^^      = > >   =   @",
		"==========================================",
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
			scale(.76),
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
			sprite("spike"),
			area(),
			scale(0.15,.2),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"danger",
			// fixed(),
		],
		"<": () => [
			sprite("spike"),
			area(),
			scale(0.15,.2),
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
	},
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

	// define player object
	const player = add([
		sprite("bean"),
		pos(0, 250),
		area(),
		scale(1),
		// makes it fall to gravity and jumpable
		body(),
		// the custom component we defined above
		// big(),
		anchor("bot"),
	])

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

	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			destroy(l)
			addKaboom(player.pos)
			play("powerup")
		}
	})

	player.onCollide("enemy", (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("death")
			play("hit")
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
