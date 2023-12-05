import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

k.add([
	rect(width(), 48),
	outline(4),
	area(),
	pos(0, height() - 48),
	body({ isStatic: true }),
])

k.onClick(() => k.addKaboom(k.mousePos()))

// k.setgravity(1600)

const SPEED = 320

//player1 code
const player1 = add([
	k.pos(120, 80),
	k.sprite("bean"),
	k.area(),
	k.body(),
])

onKeyDown("a", () => {
	player1.move(-SPEED, 0)
})
onKeyDown("d", () => {
	player1.move(SPEED, 0)
})
onKeyPress("w", () => {
	// .isGrounded() is provided by body()
	if (player1.isGrounded()) {
		// .jump() is provided by body()
		player1.jump()
	}
})
//end

//player2 code
const player2 = add([
	sprite("bean"),
	pos(center()),
	area(),
	body(),
])

onKeyDown("left", () => {
	player2.move(-SPEED, 0)
})
onKeyDown("right", () => {
	player2.move(SPEED, 0)
})
onKeyPress("up", () => {
	// .isGrounded() is provided by body()
	if (player2.isGrounded()) {
		// .jump() is provided by body()
		player2.jump()
	}
})
//end

k.add([
	text("Press arrow keys & WASD", { width: width() / 2 }),
	pos(12, 12),
])
