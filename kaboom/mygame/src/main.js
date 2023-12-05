import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

k.add([
	k.pos(120, 80),
	k.sprite("bean"),
])

k.onClick(() => k.addKaboom(k.mousePos()))

const SPEED = 320

const player = add([
	sprite("bean"),
	pos(center()),
])

onKeyDown("left", () => {
	player.move(-SPEED, 0)
})
onKeyDown("a", () => {
	player2.move(SPEED, 0)
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
})
onKeyDown("d", () => {
	player2.move(SPEED, 0)
})

onKeyDown("up", () => {
	player.move(0, -SPEED)
})
onKeyDown("w", () => {
	player2.move(SPEED, 0)
})

onKeyDown("down", () => {
	player.move(0, SPEED)
})
onKeyDown("s", () => {
	player2.move(SPEED, 0)
})

add([
	text("Press arrow keys & WSAD", { width: width() / 2 }),
	pos(12, 12),
])
