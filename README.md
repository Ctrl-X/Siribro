Work in Progress... 
Unstable version...
Description may not reflect the actual work

# Siribro : The Bot that looks like human


## Intro
Siribro is a dialog based bot that can adapt his flow based on the answers of the user.
You can build a very complex dialog flow to handle many scenario or just play with a simple introduction dialog. 
You can run Siribro for any project even those without a server side code (like an moblie hybrid app).



## Dialog File Format
Siribro use either *JSON* or *Markdown* to parse the discussion flow. Most of the time, you will prefer the simplicity of markdown, but in case you want to build the discussion from a server side database (or else), JSON is supported natively in many server side technology (php, JAVA, etc).
You can find a basic dialog sample here : 
* [JSON format] (http://TODO)
* [Markdown format] (http://TODO)




## Easy to try !

1. Download [siribro.min.js](TODO).
2. Download the sample dialog file [bot.md](TODO)
3. Link the javascript in your html page :
	
	`<script type="application/javascript" src="siribro.min.js"></script>`
	
4. Now just call Siribro from your main function like :
        
	`$(function() {
			siribro.loadMD("bot.md")
            .start();
     });`
5. Open the index.html from your localhost server
6. Enjoy your discussion !

Now you can learn more by reading *"How to create a dialog file"*



## Dependencies
Siribro has only a *jQuery* dependency. It is only used for DOM control and AJAX request. Any version of jQuery should work.
We will remove this dependency in a future version.




## Set Options to customize your setup
Siribro have some options that you can provide to tweak the component. Just call `setOptions(...)` before your start the dialog :
	
	siribro.loadJson(...)
		.setOptions({"isPersistHistory":false,"isLogEnabled":false})
		.start(...);
  
##### Available options :  
 * isLogEnabled : 
 	* Usage : display some debug output in the console 
 	* default value : true
 * isPersistHistory : 
 	* Usage : when set to true, it will save the discussion for later. If the user come back, the bot will resume the disucssion and display the history. 
 	* default value : false
 * typingSpeed : 
 	* Usage : Number of character typed per second by the Bot 
 	* default value : 20
 * readingSpeed : 
 	* Usage : Number of character read per second by the Bot
	* default value : 50




## Add Custom Function
You can add some custom function to do something during the dialog flow. Let say you want to check something on the server before pursuing the discussion.
You could add a custom function :

    siribro.loadJson("data/bot.md")
      .addFunction("checkOnServer",function(){
        $.ajax({
          method: "POST",
          url: "checkemail.php",
          data: { email: siribro.answers["email"] }  // send the email that were answered from the user input
          })
          .done(function( msg ) {
            if(msg == "OK")
              siribro.next(); // Resume the discussion flow
          });
      })  
      .start("Beginning");`
      
And now in your bot.md, you can call your custom function like this in the dialog *.md* file :
```markdown
* Can you provide me an email ?
* `input(email)`
* Ok, now let me check if I find your account...
* `checkOnServer()`
```



## How to create a dialog file
TODO
### Create a JSON  dialogue file
TODO
### Create a  Markdown dialogue file

#### Multiple values
Usually, there is multiple way of saying something. So Siribro do support values lists. It's a powerfull feature that help you :
* Propose random sentence to the user
* Handle multiple answer in one option

###### Propose multiple sentence
When you want a dialog that can be replayed by the same person without noticing too much that it's not human, you can add multiple random sentence or just a part of a sentence.
You will have to define a reference at the root of the document like this 

Ex :
>	[Hello]
>		* Hello
>		* Hi
>		* Hey

Then somewhere in the discussion :

>	* 
>	* [Hello], how are you ?




#### Answer Management
By default,  if the answer don't match any options, Siribro will wait until an answer that match. 
If you want to by pass that behaavior, you can add a lat option with the value Other like this : 
>	* Are you happy ?
>  	1. Yes
>    		* Great !
>     	* Let's have a beer !
>		2. No
> 			* Ok so why not having a beer !
>		3. Other
>			* Well I'm confused...
 

