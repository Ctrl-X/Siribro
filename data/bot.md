# Beginning
* `pause(1000)`	// Will wait for 3 seconds
* Hello, how are you?
* `input(mood)`		// Will save the answer into siribro.answers["mood"]
* My name is Julien, I would like to introduce our products
* Shall I continue?
* `input()`		// Won't save the user answer
	1.	[Yes]		// But will use it as the last answer for this choice
		* Cool ;)
		* We are a small company based in Montreal
		* We sell or rent appartment downtown
		* Where are you living?
		* `input(city)`
			1. Montreal | downtown
				* Really ? that's fantastic, let's have a beer!
				* ...
			2. Other
				* Oh I see. 
				* Maybe we can stay in touch!
				* `goto(Finish)`	// will go to the bloc called "Finish"
	2. No
		* Ok no prob. Let me know if you need anything ;)
		* `goto(Finish)`	
		
# Finish
* Have a great day !

[Yes]
	* yes
	* sure
	* ok