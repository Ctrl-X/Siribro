Work in Progress... Unstable version
Description may not reflect the actual work

# Siribro : The Bot that think and act like human

## Intro
Siribro is a dialog based bot that can adapt his flow based on the answers of the user.
You can build a very complex dialog flow to handle many scenario or just play with a simple introduction dialog. 

## Dialog File Format
Siribro use either *JSON* or *Markdown* to parse the discussion flow. Most of the time, you will prefer the simplicity of markdown, but in case you want to build the discussion from a server side database (or else), JSON is supported natively in many server side technology (php, JAVA, etc).
You can find a basic dialog sample here : 
* [JSON format] (http://TODO)
* [Markdown format] (http://TODO)



## Easy install & try !

1 Download the minified version of siribro from the dist folder.
2 Download the sample bot dialog file [bot.md](TODO)
3 Link the javascript at the end of your html page :
	
	`<script type="application/javascript" src="siribro.min.js"></script>`
	
4 Now just call Siribro from your main function like :
        
		  `$(function() {
            siribro.loadMD("bot.md")
                .start();
        });`

As you can see, you will have to load a dialog file (here "bot.md") that will feed siribro. You can read the section "Create a dialog file" for more information on the option you have


## Dependency
Siribro has only a *jQuery* dependency. It is only used for DOM control and AJAX request. Any version of jQuery should work.
We will remove this dependency in a future version.



## Set Options to customize your setup
Siribro have some options that you can provide to tweak the component. Just call `setOptions(...)` before your start the dialog :
	
	siribro.loadJson(...)
		.setOptions({"isPersistHistory":false,"isLogEnabled":false})
		.start(...);
  
 ### List of available options :  
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
          data: { email: siribro.answers["email"] }
          })
          .done(function( msg ) {
            if(msg == "OK")
              siribro.next(); // Resume the discussion flow
          });
      })  
      .start("Beginning");`
      
And now in your bot.md, you call call your custom function like this in the dialog *.md* file :
>    \* Can you provide me an email ?

>    \* \`input(email)\`

>    \* Ok, now let me check if I find your account...

>    \* \`checkOnServer()\`

## Create a  dialogue file
TODO
### Create a JSON  dialogue file
TODO
### Create a  Markdown dialogue file
TODO
