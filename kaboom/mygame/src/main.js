import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

k.add([
	k.pos(120, 80),
	k.sprite("bean"),
])

k.onClick(() => k.addKaboom(k.mousePos()))

onKeyDown("w", () => {
	player2.move(SPEED, 0)
})

onKeyDown("a", () => {
	player2.move(SPEED, 0)
})

onKeyDown("s", () => {
	player2.move(SPEED, 0)
})

onKeyDown("d", () => {
	player2.move(SPEED, 0)
})

const SPEED = 320

const player = add([
	sprite("bean"),
	pos(center()),
])

onKeyDown("left", () => {
	player.move(-SPEED, 0)
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
})


onKeyDown("up", () => {
	player.move(0, -SPEED)
})


onKeyDown("down", () => {
	player.move(0, SPEED)
})


add([
	text("Press arrow keys & WASD", { width: width() / 2 }),
	pos(12, 12),
])
