# Entry 1
##### 11/11/23

I've decided to use the tool Kaboom to create a platformer game. I've completed the tutorial and tinkered with it in jsbin creating a semi platformer game. I have learned to create a character that can move side to side using `onkeyDown` and `player.move(-speed, 0)` these allow for the arrow keys to direct the character.

```javascript
// onKeyDown() registers an event that runs every frame as long as user is holding a certain key
onKeyDown("left", () => {
	// .move() is provided by pos() component, move by pixels per second
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

// onClick() registers an event that runs once when left mouse is clicked
onClick(() => {
	// .moveTo() is provided by pos() component, changes the position
	player.moveTo(mousePos())
})

add([
	// text() component is similar to sprite() but renders text
	text("Press arrow keys", { width: width() / 2 }),
	pos(12, 12),
])
```
The snippet above is the code used for directing each key to move a certain direction, the `onclick` allows for moving the character onto where the cursor clicks. Added gravity to add a sense of left and right pov instead on birds eye view `setGravity(1600)` allowing me to later add some type of obstacle. I

```javascript

// Load assets
loadSprite("bean", "/sprites/bean.png")

// Define player movement speed (pixels per second)
const SPEED = 320

// Add player game object
const player = add([
	sprite("bean"),
	// center() returns the center point vec2(width() / 2, height() / 2)
	pos(center()),
])

```

[Next](entry02.md)

[Home](../README.md)
