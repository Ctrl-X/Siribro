# Beginning
* [Hello]
* Do you need some help?
* `input(needhelp)`
	1. [Yes]
		* Ok, I'll need your email to verify your account
		* Can I have your email ?
		* `goto(CheckEmail)`
	2.	Other
		* Ok, let me know if you need assistance !
		* `goto(Finish)`

# CheckEmail
* `input(email)`
* `checkOnServer()`
		1. OK
			* `goto(Authenticated)`
		2. Other
			* [EmailNotValid]
			* Do you want to make another attempt?
			* `input(retry)`
				1. [Yes]
					* [EmailRetry]
					* `goto(CheckEmail)`
				2. Other
					* Ok, that's fine
					* `goto(Finish)`

		
# Authenticated
* Perfect, I found your account!
* How can I help you ?
* To be continued...

# Finish
* Have a great day !


[Hello]
	* Hello
	* Hi !
	* Morning !

[Yes]
	* yes
	* sure
	* ok
	
[EmailNotValid]
	* The email doesn't seems right
	* I can't find your email
	
[EmailRetry]
	* Ok, give me a valid email
	* can I have your email again?
