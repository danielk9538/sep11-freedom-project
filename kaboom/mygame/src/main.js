import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("player", "sprites/player1.png")
k.loadSprite("player1", "sprites/player2.png")
k.loadSprite("left1", "sprites/left1.png")
k.loadSprite("left2", "sprites/left2.png")
k.loadSprite("player4", "sprites/player5.png")
k.loadSprite("player5", "sprites/player6.png")
k.loadSprite("right1", "sprites/right1.png")
k.loadSprite("right2", "sprites/right2.png")
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

const walkFramesLeft = ["player3", "player4"];
const walkFramesRight = ["player6", "player7"];

function createPlayer() {
    const player = add([
        sprite("player"),
        pos(12, 12), // Set the initial position here
        area(),
        scale(1),
        body(),
        anchor("bot"),
        "player",
    ]);

    player.update(() => {
        if (player.move.x < 0) {
            player.frame = walkFramesLeft[Math.floor(player.pos.x / 10) % walkFramesLeft.length];
            player.play(1, true); // Reverse the animation when moving left
        } else if (player.move.x > 0) {
            player.frame = walkFramesRight[Math.floor(player.pos.x / 10) % walkFramesRight.length];
            player.play(1);
        } else {
            player.play("player");
        }
    });

    return player;
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
		"=       >=                                                                                        =",
		"==       >=                                                                                       =",
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
		"p": () => [
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
			sprite("player"),
			area(),
			scale(1),
			body(),
			anchor("bot"),
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
    const level = addLevel(LEVELS[levelId ?? 0], levelConf);
    const player = createPlayer();

    player.onUpdate(() => {
        camPos(player.pos);
        if (player.pos.y >= FALL_DEATH) {
            go("death");
        }
    });

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


	// if player onCollide with any obj with "danger2" tag, player receives knockback
player.onCollide("danger2", (p, danger2) => {
    // Calculate knockback direction
    const knockbackDirection = p.pos.sub(danger2.pos).unit();

    // Apply knockback force
    const knockbackForce = 5000;

    // Update player's velocity to simulate knockback
    p.move(knockbackDirection.scale(knockbackForce / 60)); // Adjust the division factor as needed
});




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
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    function moveLeft() {
        player.move(-MOVE_SPEED, 0);
    }

    function moveRight() {
        player.move(MOVE_SPEED, 0);
    }

    onKeyDown("left", moveLeft);
    onKeyDown("a", moveLeft);
    onKeyDown("right", moveRight);
    onKeyDown("d", moveRight);
    onKeyPress("space", jump);
    onKeyPress("up", jump);
    onKeyPress("w", jump);

	onGamepadButtonPress("south", jump);
    onGamepadStick("left", (v) => {
        player.move(v.x * MOVE_SPEED, 0);
    });

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
