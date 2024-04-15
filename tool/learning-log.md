# Tool Learning Log

Tool: **Kaboom**

Project: **Platformer Game**

---

10/29/23:
* I only watched a few videos on how kaboom can be used. Scrolled through both kaboom.js' library and playtested in Kaboom.js playground. I still haven't decided on what I want to create since I don't wanna find out it can't be done half way through.

[Kaboom.js](https://kaboomjs.com/)

[Kaboom.js Playground](https://kaboomjs.com/play?example=movement)

[Learn to Make a Game with Kaboom.js in 39 Minutes - Step-by-Step Tutorial](https://www.youtube.com/watch?v=hgReGsh5xVU)

11/05/23:
* I created a sandbox map with the ability for a character to move around using WASD. Scrolling the Kabooms library to find which code fits what i need. Later I'll detail the map to be more of my liking and add a animated player.

[Kaboom.js Playground- movement](https://kaboomjs.com/play?example=movement)

12/10/23
* I used a pre existing platformer game with variety of creations (blockgame which allows you to free build on 2d platform) With refrence i reshaped the map to look identical or simillar. I created a Levels tag and gave a symbol "=" attributes within the bracket to create a model within my codespace. For example the symbol "=" , I linked the "hedge" sprite to it and drew out my map. I found this Level tag within the Kaboom.js playground and it really makes it easy to detail your level to your liking.

[Kaboom.js Playground- scenes](https://kaboomjs.com/play?example=scenes)


01/28/24
* Attempt at making an animated sprite when moving around.I made changes to my map to be more specified to my planned map. I then drew a sprite with a few animations and put them on a spritesheet. Originally I thought I could make the sprite appear when a key is pressed and it returns on release but that hasn't worked out. I still yet managed to get the sprite to animate because I'm receiving errors when interperting code from youtube videos. I still plan to make another animation for another sprite (venus flytrap, mouth open/closing). I also am trying to create a way for damage blocks that push you away (knockback) without instantly elimating the player, aswell as add sound to the game such as jumping, background, and etc. Refactored my movement code.

[Sprite Animation in JavaScript](https://www.youtube.com/watch?v=CY0HE277IBM)

[Top Down Character Movement & Animations in Kaboom.js](https://www.youtube.com/watch?v=n-q0pKGhxyw)

02/11/24
*  I've mostly been troubleshooting, and testing fall damage, gravity, and knockback.



Animation snippet
```javascript
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
```
Knockback snippet
```javascript
// knockback, I'll come back to it later
		// detect when the player sprite collides with the block
	player.onCollide("danger2", () => {
	// move the player sprite back in the opposite direction
	player.move(-player.dir.x * 100, -player.dir.y * 100);
  });
```

[Sprite Animation in JavaScript](https://www.youtube.com/watch?v=CY0HE277IBM)

[Top Down Character Movement & Animations in Kaboom.js](https://www.youtube.com/watch?v=n-q0pKGhxyw)


03/11/24

I've been revamping the way knockback when colliding with a sprite with the tag "danger2" rather than eliminate the player. Previously, the player just gets warped to a random area nearby rather than tossed away however the player now gets slowly push away off the block it collides with. This wasn't my original intention however I do like how it turned out.

```javascript
	// Define the sign function
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}
		// detect when the player sprite collides with the block
player.onCollide("danger2", (obj) => {
    // Calculate the knockback direction based on the player's position relative to the danger object
    const knockbackDir = vec2(
        sign(player.pos.x - obj.pos.x),
        -1
    );

    // Apply knockback force to the player
    player.move(knockbackDir.scale(900)); // Adjust the knockback force as needed
});

```
03/25/24

I've been creating coins/objective that the player can do while completing the parkour, coins around the map which will allow the player to win under the rule that they collected all the coins. There isn't that much to show as I just created a new config for coins and plotted them onto the layout. Soon I will set the conditional that will set required coins amount to complete the game. I also will correct my respawn system from making the player fall through the ground after death.

```javascript
"0": () => [
			sprite("coin"),
			area(),
			scale(1),
			body(),
			anchor("center"),
			"coin",
		],
"s": () => [
			sprite("spawner"),
			area(),
			scale(1),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"spawn",
```
03/31/24

I've been working on an objective that allows the player to win with a certain amount of coins after completing the parkour. Soon I will set the conditional that will set required coins amount to complete the game. I still haven't corrected my respawn system from making the player fall through the ground after death.

```javascript

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
```

04/7/24

I've been working on an objective that allows the player to walk through a door to have their location/position switch to the next door. Later I'd like to prompt the user to enter through specific doors, though I am not sure this will be done. Snippet below. (Doesn't work yet)

```javascript
"@": () => [
			sprite("door"),
			area(),
			scale(0.01),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"door",
		],
		"%": () => [
			sprite("door"),
			area(),
			scale(0.01),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"2door2",
		],

			// if player onCollide with any obj with "door" tag,
	player.onCollide("door", () => {
		player.pos = level.get("2door2")[0].pos; // Move player to door2 position
	});
    ```

04/14/24

I've completed the door transportation I planned to do. I created serveral tags with the same config and had it teleport the player to the tag I wanted the player to teleport tou. Snippet below shows the code for two portals, I repeated the same code with different tags. (May refactor in the future)

```javascript
		"6": () => [
			sprite("door"),
			area(),
			scale(0.01),
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

			// if player onCollide with any obj with "door" tag,
	player.onCollide("portal5", () => {
		player.pos = level.get("portal6")[0].pos; // Move player to door2 position
	});
    ```
