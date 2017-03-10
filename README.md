Work in Progress... 
Unstable version...
Description may not reflect the actual work

# Siribro.js : The Bot that looks like human
Siribro is a dialog based bot in javascript that can adapt his behavior based on the answers of the user.
You can build a very complex dialog flow to handle many scenario or just play with a simple conversation. 
You can run Siribro on any project even those without a server side code (like an moblie hybrid app).


# Dependencies
Siribro has only a **jQuery** dependency. It is used for DOM control and AJAX request. Any version of jQuery should work.
We will try to remove this dependency in a future version.


# Installation 

* Download [siribro.min.js](TODO).
* Get a sample dialog file like [bot.md](TODO)
* Link the javascript to your html page :
```html	
<script type="application/javascript" src="siribro.min.js"></script>
```
* Call Siribro from your main function like :
```javascript	
$(function() {
	siribro.loadMD("bot.md")
	.start();
});
```
* Navigate to the page on your localhost server
 


# Dialog File
Usually, bots use a form based approach : They convert an existing form into a bot.
Siribro use a different approach. 

When we developed Siribro, we had in mind the simplicity for the developper and/or the scenarist to use it (modify the discussion, create new one, etc). 

So we focused on the human readability aspect while keeping a flexible set of advanced tools. 
A exemple is worth a thousand words, so `bot.md :` looks like :
```markdown
#Beginning
* `pause(3000)`
* Hello, how are you?
* `input(mood)`
* My name is Julien, I would like to introduce our products
* Shall I continue?
* `input()`
	1.	[Yes]
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
				* `goto(Finish)`
	2. Other
		* Ok no prob. Let me know if you need anything ;)
		* `goto(Finish)`
		
#Finish
* Have a great day !

[Yes]
	* yes
	* sure
	* ok

```


Siribro use either *JSON* or *Markdown* to compute the discussion flow. 
Most of the time, you will prefer the simplicity of markdown, but if you want to build the discussion from a server side database (or else), JSON is supported natively in many server side technology (php, JAVA, etc) so it may be the best choice.

For simplicity, we will only present the markdown version but you can find all dialog sample in JSON and MD here :
* [JSON format] (http://TODO)
* [Markdown format] (http://TODO)

Now you can learn more by reading the **"How to create a dialog file"** section


# Documentation
There is a lot of ways to customize Siribro for your need.
Each section will discuss about one specific aspect.

## Start the Dialog
To start a dialog, you will need to provide a dialog file first. You can use `load...` like this :
```javascript	
siribro.loadMD("file.md");
```
or 
```javascript	
siribro.loadJson("file.json");	
```

Now you can start the dialog with `start()`. It takes a optional parameter to set the entry point of the discussion (the name of a dialog bloc) .
```javascript	
siribro.start(); // will begin from the first dialog bloc in the file
```
or
```javascript	
siribro.start("Beginning"); // will begin from the #Beginning dialog bloc 
```


## Set Options to customize your setup
Siribro have some options that you can provide to tweak the component. Just call `setOptions(...)` before your start the dialog :
```javascript	
siribro.loadMD(...)
	.setOptions({"isPersistHistory":false,"isLogEnabled":false})
	.start("Beginning");
```

#### Available options :  
option name | type | default value | Description
------------ | ------------- | ------------- | -------------
`botface` | string | base64 | url of the picture face of the bot (32x32px) 
`isLogEnabled` | boolean | `true` | display some debug output in the console
`isPersistHistory` | boolean | `false` | when set to true, it will save the discussion for later. If the user come back, the bot will display the history.
`typingSpeed` | integer | `20` | Number of character typed per second by the Bot 
`readingSpeed` | integer | `50` | Number of character read per second by the Bot 



## How to write a dialog file
Siribro use the concept of dialog Bloc (in contrast to form based bots). 

:information_source: A good habit to follow is to always write your discussion in a guided way. Don't ask open question and avoid questions from the user.
If you do face a user question, you will have to handle random situations that are far more complex to manage. Actually, you would probably have to write sort of machine learning algorithm...

### What is a Dialog bloc
A dialog bloc is just a conversation flow that begin and end with the last line of the bloc.
You can write multiple dialog block in your file. It become very useful to go to a specific dialog bloc after a serie of interaction, so that you can redirect multiple path to one single ending.

```markdown
#DialogOne
* first sentence of dialog one
* second sentence of dialog one

#DialogTwo
* first sentence of dialog two
* second sentence of dialog two

```

To go to a specific dialog bloc, use the `goto()` function like this :
```markdown
#DialogOne
* first sentence of dialog one
* `goto(DialogTwo)`

```


### Sentence 
A dialog contain sentences. To write a sentence, use the list symbol like this :
```markdown
* first sentence
* second sentence
* third sentence

```


### Answers
A discussion is usually based on sentences(phrase or question) and answers. You can ask any question to the user and get his input with the comand :
```markdown
* `input()`
```
If you provide a parameter to the input, then Siribro will save the answer into the `siribro.answers[]` array with the name of your param as the index.


```markdown
* `input(city)` // siribro.answers["city"] will contain the answer of the user
```
As soon as the user has provided a value, then the discussion will proceed. 
There is one exception to that behavior : Decision (see **Decisions** section). 

### Decisions
Usually a discussion is not linear. Based on the answers, Siribro need take decision to adapt the following discussion path.

:information_source: You should always ask closed questions (yes/no type or with a reduced set on possibility) if you want to achieve a smooth decision flow.

To create a discussion branch, you will have to use an ordered list notation and indent to the right all child path like this :
```markdown
* `input()`
    1. OK
        * ...
    2. NOT OK
        * ...
```
In the `1. OK` , "OK" represent the value that will be compared to the user answer. It can be :
* a plain string
* multiple choice separated with a pipe `|` 
* a regex
* a \[reference\] to a value bloc (more on that in the **Value Bloc** section)
* a \`function\` name like \`ageBelow18\` (more on that in the **Advanced : Add a custom handler** section)

If none of the answer match a value, Siribro will wait and not proceed with the next sentence/step.


#### Catch-all decision 
By default, if the answer don't match any value, Siribro will wait until an answer that match. 
If you want to by pass that behavior, you can add a last option with the value `Other`, like this : 
```markdown
* Are you happy ?
	1. Yes
		* Great !
		* Let's have a beer !
	2. No
		* Ok so why not having a beer !
	3. Other
		* -> This will handle any other answer

``` 

### Value Bloc (  Random sentences or multi-value Decisions)
Usually, there is multiple way of saying something. So Siribro do support values lists. It's a powerfull feature that help you :
* Propose random sentence to the user
* Handle multiple answer in one option

#### Random sentences
When you want a discussion that can be replayed by the same person without noticing too much that it's not human, you can add multiple random sentence or just a part of a sentence.
You will have to define a reference at the root of the document like this 

Ex :
```markdown
[Hello]
	* Hello
	* Hi
	* Hey
```

Then somewhere in the discussion :
```markdown
* [Hello], how are you ?
```

#### For Decisions
Same approach is used to accept a wide set of answer to take a decision. 
Let say you want to interpret **ok**, **agree** and **fine** as a *"ok"*, you could write a value bloc
```markdown
[Ok]
	* ok
	* agree
	* fine
```

Then somewhere in a discussion bloc 
```markdown
#Dialog
(...)
* `input(reply)`
	1. [OK]
		* Nice, we should continue then!
		* ...
	2. No
		* I'm sad
		* ...
```




## Advanced : Add a custom handler
You can add some custom function to do something during the dialog flow. 
Let say you want to check something on the server before pursuing the discussion.

You could add a custom function :
```javascript
$(function() {
    siribro.loadMD("data/bot.md")
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
### Call a function  in a Sentence 
In your bot.md, you can call your custom function like this :
```markdown
* Could you provide me an email so I can check your identity?
* `input(email)`
* Ok, let me check. This should only take a few seconds...
* `checkOnServer()`
* --> Will wait until `siribro.next()` is call from `checkOnServer()` function
```

It your custom handler you can use the `siribro.answers[]` array to get answers from the user


There is virtually no limit in what you could do :
* Save all answers in your database
* Display something on your website during a walkthrough
* Do a background action
* Send an email
* etc

The only thing to remember is to call `siribro.next()` at the end of your action to resume the discussion flow. 
If you provide a param to the `next(...)` function, it will be used in the very next Decision (more on Decision in **Decision** section)


### Call a function  in a Decision
As for sentences, you can take a decision based on a custom function :
```markdown
* Could you give me your age ?
* `input(age)`
	1. `ageBelow18()`
		* You are too young
	2. Other
		* ok, next step !
```

where `ageBelow18()` is a custom function that could be :
```javascript
siribro.addFunction("ageBelow18",function(){
	if (siribro.answers["age"] < 18){
		siribro.next(false);
	}else
	{
		siribro.next(true);
	}
});
```





