# Entry 2
##### 12/8/23

For this part of my project, I've mostly been designing the layout of my platformer game while adjusting gravity and attributes of each sprite to create an difficult yet enjoying parkour map.

Using constants and symbols to design my landscape as if it were on my codespace.

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

The snippet below is a portion of my landscape made into a grid. The grid allows me to use the symbols I defined earlier and create a simple layout through basic design. The method allows me to view my landscape and how its percieved from a fullscreen. Although its easy to use, Its irratating when I change a few things and the rest of the row isn't 

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

[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
