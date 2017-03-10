Work in Progress... 
Unstable version...
Description may not reflect the actual work

# Siribro : The Bot that looks like human


## Intro
Siribro is a dialog based bot that can adapt his behavior based on the answers of the user.
You can build a very complex dialog flow to handle many scenario or just play with a simple conversation. 
You can run Siribro on any project even those without a server side code (like an moblie hybrid app).


## Dependencies
Siribro has only a *jQuery* dependency. It is used for DOM control and AJAX request. Any version of jQuery should work.
We will try to remove this dependency in a future version.


## Let's try !

1. Download [siribro.min.js](TODO).
2. Download a sample dialog file like [bot.md](TODO)
3. Link the javascript in your html page :
	
	`<script type="application/javascript" src="siribro.min.js"></script>`
	
4. Call Siribro from your main function like :
```javascript	
$(function() {
	siribro.loadMD("bot.md")
		.start();
});
5. Navigate to the page on your localhost server
6. Enjoy your discussion !



Now you can learn more by reading *"How to create a dialog file"*



## Dialog File Format
Siribro use either *JSON* or *Markdown* to parse the discussion flow. 
Most of the time, you will prefer the simplicity of markdown, but if you want to build the discussion from a server side database (or else), JSON is supported natively in many server side technology (php, JAVA, etc) so it may be the best choice.

For simplicity, we will only present the markdown version but you can find all dialog sample in JSON and MD here :
* [JSON format] (http://TODO)
* [Markdown format] (http://TODO)




## Customization
There is a lot of way to customize Siribro. Feel free to reach me at  *julien at myly.fr*
Each section will discuss about a specific aspect.


### Set Options to customize your setup
Siribro have some options that you can provide to tweak the component. Just call `setOptions(...)` before your start the dialog :
```javascript	
siribro.loadJson(...)
	.setOptions({"isPersistHistory":false,"isLogEnabled":false})
	.start(...);
```

##### Available options :  
option name | type | default value | Description
------------ | ------------- | ------------- | -------------
`isLogEnabled` | boolean | `true` | display some debug output in the console
`isPersistHistory` | boolean | `false` | when set to true, it will save the discussion for later. If the user come back, the bot will display the history.
`typingSpeed` | integer | `20` | Number of character typed per second by the Bot 
`readingSpeed` | integer | `50` | Number of character read per second by the Bot 




### Add a custom handler
You can add some custom function to do something during the dialog flow. 
Let say you want to check something on the server before pursuing the discussion.

You could add a custom function :
```javascript
$(function() {

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
});  
```
      
And now in your bot.md, you can call your custom function like this in the dialog *.md* file :
```markdown
* Could you provide me an email so I can check your identity?
* `input(email)`
* Ok, let me check. This should only take a few seconds...
* `checkOnServer()`
```

It your custom handler you can use the `siribro.answers[]` array to get answers from the user

There is virtually no limit in what you could do :
* Save all answers on your database
* Display something on your website during a walkthrough
* Do a background action
* Send an email
* etc

The only thing to remember is to call `siribro.next();` at the end of your action to resume the discussion flow.


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
 

