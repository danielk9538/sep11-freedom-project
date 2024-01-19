# Entry 2
##### 12/8/23

For this part of my project, I've mostly been designing the layout of my platformer game while adjusting gravity and attributes of each sprite to create an difficult yet enjoying parkour map.

Using constants and symbols to design my landscape as if it were on my codespace.

This snippet is to specify what symbol I'd like to use and what that symbol means in the 
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
