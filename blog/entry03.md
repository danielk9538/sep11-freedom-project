# Entry 2
##### 2/9/24

For this part of my project, I've mostly been troubleshooting characteristics my character displays and realistic abilities with achievable goals.

This snippet below is my attempt at animation using a sprite sheet. I attempted to use a sprite sheet I created and then have the sprite change each time an arrow key is pressed down, Unfortunately, I still haven't come to a solution.

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

Another issue I'm trying to resolve is my sprite falls through solid sprites. The snippet below is what I believe may be the issue. The snippet prevents the player character from landing on certain types of objects while jumping. This might be the reason my player falls through platforms however I'm not sure how to refactor the code yet.

``` javascript
	player.onBeforePhysicsResolve((collision) => {
		if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
			collision.preventResolution()
		}
	})
```

The snippet shown here is the code to provide knockback when colliding with a sprite with the tag "danger2" rather than eliminate the player. However, the player just gets warped to a random area nearby rather than tossed away. I think I may leave this alone for a while and address other issues.

```javascript
// knockback, I'll come back to it later
		// detect when the player sprite collides with the block
	player.onCollide("danger2", () => {
	// move the player sprite back in the opposite direction
	player.move(-player.dir.x * 100, -player.dir.y * 100);
  });
```

The skills I used throughout this entry were troubleshooting, testing fall damage, gravity, and knockback. As of writing my 3rd entry I still haven't resolved the issues since my 2nd blog.
Kaboom can be confusing at times, However, I don't still don't regret it as it's easy to use and just takes time to understand. I'll hopefully figure out the solution before the next entry. Few Links I used provided below.

[Kaboom.js](https://kaboomjs.com/)

[Kaboom.js Playground](https://kaboomjs.com/play?example=movement)

[Sprite Animation in JavaScript](https://www.youtube.com/watch?v=CY0HE277IBM)

[Top Down Character Movement & Animations in Kaboom.js](https://www.youtube.com/watch?v=n-q0pKGhxyw)

[Previous](entry02.md) | [Next](entry04.md)

[Home](../README.md)
