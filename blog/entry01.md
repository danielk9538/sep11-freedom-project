# Entry 1
##### 11/11/23

I've decided to use the tool Kaboom to create a platformer game. I've completed the tutorial and tinkered with it in jsbin creating a semi platformer game.

I have learned to create a character using an asset from kaboom called sprites which is just the character. The snippet below imports an asset then I placed it in the center of the screen to portray a character.

```javascript
loadSprite("bean", "/sprites/bean.png")

const player = add([
	sprite("bean"),
	pos(center()),
])
```

Using the character sprite above I used the `onkeyDown` and `player.move(-speed, 0)`  allowing for the arrow keys to direct the character at a select speed. The snippet Below is the code used for directing each key to move a certain direction, the `onclick` allows for moving the character onto where the cursor clicks.

```javascript
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
```

The snippet below demonstrates the Mouse button click.
```javascript
onClick(() => {
	player.moveTo(mousePos())
})

add([
	text("Press arrow keys", { width: width() / 2 }),
	pos(12, 12),
])
```

 Added gravity to add a sense of left and right pov instead on birds eye view `setGravity(1600)` allowing me to later add some type of obstacle. I added a jump feature using `player.jump` with a conditional allowing the character to jump only if the character has landed `player.isGrounded` without this, the character would jump like flappy bird.

```javascript
onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump()
	}
})
```
The skills I used for my tool is How to read and how to learn by carefully reading the instructions and playtesting to see what line of code produces the type of action.

I decided for my project I wanted to create a platformer game. I researched different tools and found that Kaboom would be helpful, This was the first two steps of design process (Define and Research)

[Next](entry02.md)

[Home](../README.md)
