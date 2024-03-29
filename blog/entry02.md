# Entry 2
##### 12/8/23

For this part of my project, I've mostly been designing the layout of my platformer game while adjusting gravity and attributes of each sprite to create an difficult yet enjoying parkour map. Using constants and symbols to design my landscape as if it were on my codespace.

This snippet is to specify the definition of a symbol that I'd like to use in the landscape. The example shown below is the grassblocks that make up most of the neutral ground. Giving it an image to display, size, whether or not the player can go through it, and if the sprite can be moved off screen.

```javascript
// define what each symbol means in the level graph
const levelConf = {
	tileWidth: 64,
	tileHeight: 64,
	tiles: {
		"=": () => [
			sprite("hedge"),
			area(),
			scale(.80),
			body({ isStatic: true }),
			anchor("bot"),
			offscreen({ hide: true }),
			"platform",
		],
```

The snippet below is a scene or grid of my landscape. The grid allows me to use the symbols I defined earlier and create a simple layout through basic design. The method allows me to view my landscape and how its percieved from a fullscreen. Although its easy to use, Its irratating when I change a few things and the rest of the row isn't lined up.

```javascript
const LEVELS = [
	[
		"=   =                 =                            == == == == ==   =",
		"=   =                 =                            == == == == ==  ==",
		"=   =  ^              =     =        =     =       ===== ========   =",
		"= ==  =    ^      ^  =  =  =  =  =  =  =  =  =  =              ==  =",
		"=     ==   =   ^  =     =^^=^^=^^=^^=^^=^^=^^=^^=              =   =",
		"================================================================= =",
		"=    <  <  <  =     <    <     =                         =        =",
		"=             =                =                         = ========",
		"=             =                =                         =        =",
		"=             =                =   ==  =  =  ==  =  =    ======== =",
		"=    =  =  =     ^     ^     ^     ^^^^^^^^^^^^^^^^^^^^^          =",
		"================================================================= =",
		"=        =   <=====<                                          =   =",
		"=        =    <===<   =^=  ==                                 =  ==",
		"=        = =   <<<   ==     <                                 =   =",
		// "=   &      ==       ===^                                      ==  =",
		"=          ===       ^====                                        =",
		"===================================================================",
```
The snippet shown here is the code to display the scene(snippet above) when the game begins. The scene also functions to create levels throughout the scene, a new landscape. Although, I only used one level for my scene as its an ongoing parkour map so, I didn't see a point to use more levels. This idea my change based on the development of my platformer game.

```javascript
	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)
	//gets the player rules from levels area
	const player = level.get("player")[0]
```

The skills I used throughout this entry was creativity in my layout and the results of how my definitions may be effected such in falldamage and gravity. As of creating this entry I still struggle with the gravity and falldamage as sometimes my player sprite may fall through the ground after long fall due to gravity.

As for my decision of picking Kaboom, I don't regret it as its easy to use and there are many tutorial videos if i ever get stuck. I'll probably still be working on designing the layout after this entry since the parkour must be enjoyable and playable.(design and test)

[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
