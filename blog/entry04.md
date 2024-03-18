# Entry 4
##### 3/17/24

During this part of my project, I've mostly been finishing up the achievable goals and somewhat started abilities throughout the map.

This snippet below is my config for the coins around the map in which the player must collect all coins to finish the game or they will have to restart again.

```javascript
"0": () => [
			sprite("coin"),
			area(),
			scale(1),
			body(),
			anchor("center"),
			"coin",
		],
```

A new issue I'm trying to resolve is when the sprite hits a damage sprite, they should then be moved to another sprite that will serve as a respawn anchor. The snippet below is what allows the game to check if the player character comes in contact with a damage block and then moves the player to the position of where the spawn anchor is.

``` javascript
	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
		player.pos = level.get("spawn")[0].pos; // Move player to spawn position
		play("hit");
	});
```

The snippet shown here is the code to provide knockback when colliding with a sprite with the tag "danger2" rather than eliminate the player. Previously, the player just gets warped to a random area nearby rather than tossed away however the player now gets slowly push away off the block it collides with. This wasn't my original intention however I do like how it turned out.

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

The skills I used throughout this entry were troubleshooting, testing knockback a position warping. As of writing my 4rd entry I have overcame the knockback issue though not the phasing glitch and player animation, However I am making progress towards the right direction. I still don't regret picking Kaboomjs as it's easy to use and just takes time to understand. More solutions soon to come. Few Links I used provided below.

[Kaboom.js](https://kaboomjs.com/)

[Kaboom.js Playground](https://kaboomjs.com/play?example=movement)

[Sprite Animation in JavaScript](https://www.youtube.com/watch?v=CY0HE277IBM)

[Top Down Character Movement & Animations in Kaboom.js](https://www.youtube.com/watch?v=n-q0pKGhxyw)

[Previous](entry02.md) | [Next](entry04.md)

[Home](../README.md)


[Previous](entry03.md) | [Next](entry05.md)

[Home](../README.md)
