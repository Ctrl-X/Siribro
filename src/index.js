const isArray = require('lodash/isArray');
const load = require('./load');
const DOM = require('./DOM');

var expose = {};
var options;

/**
 * DOM / HTMl elements
 */
var replyTemplate;
var inputZone;
var flowZone;
var chatZone;


/**
 * Data
 */
var conversationalJson;
var discussionHistory;
var useranswers;


/**
 * Ajax
 */
var isAjaxLoading;
var onAjaxStopCallbacks;

/**
 * Conversation flow
 */
var isInitialized;
var currentConversationBloc;
var currentConversationStep;


/**
 * Animation
 */
var thinkingTimerId;
var typingTimerId;
var needScrollAtBottomBeforeAppending;


var lastUserInput;
var optionGroupOffset;

/**
 * Custom Code param
 */
var customFunctionList;



function init() {

  options = {
          isLogEnabled : true, /* By default, we enable debugging to console  */
          isPersistHistory : false, /* By default, we don't persist  */
          typingSpeed : 20, /* Number of character typed per second */
          readingSpeed : 50,  /* Number of character read per second by the Bot */
          botface : "data:image/png;base64,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"
  };


  DOM.init(window.document.body);

  replyTemplate = $('<div class="message" data-id="messageBloc"><table cellpadding="0" cellspacing="0" border="0"><tr><td><div class="portrait"></div></td><td><div class="sentence" data-id="sentenceZone"><div data-id="phraseZone"></div><div class="interphrase"></div></div></td></tr></table></div>');
  inputZone = $('[data-id="inputZone"]');
  flowZone = $('[data-id="flowZone"]');
  chatZone = $('[data-id="chatZone"]');

  conversationalJson = null;
  discussionHistory = [];
  useranswers = {};


  isAjaxLoading = false;
  onAjaxStopCallbacks = [];
  customFunctionList = {};

  isInitialized = false;
  currentConversationBloc = null;
  currentConversationStep = null;
  lastUserInput = null;
  optionGroupOffset = 0;


  needScrollAtBottomBeforeAppending = true;


  chatZone.on("submit", onUserInput);

  inputZone.focus();
  chatZone.on("mouseover",function(){inputZone.focus()})

}


function setOptions(optionList){
  if (optionList){
    try{
      for (var key in optionList) {
        if (optionList.hasOwnProperty(key)) {
          options[key] = optionList[key];
        }
      }
      expose.options = options;

    }catch(ex){
      log("ERROR : Unable to set options. Reason : ", ex.message)
    }
  }

  return this;
}


function generateHtml(){
  // HTML chat Container
  $("body").append('<div id="chatContainer" style="display:none" class="close"> \
      <form data-id="chatZone"> \
        <div class="chatZone">  \
            <div class="textZoneContainer"> \
                <div data-id="flowZone" class="textZone"><!-- Here come new text --></div> \
            </div>  \
            <div class="inputArea"> \
                <input type="text" placeholder="Type a message" data-id="inputZone">  \
                <input type="submit" value="Send" style="display:none"/>  \
            </div>  \
          </div>  \
       </form> \
    </div>');
}

function loadingStop() {
  onAjaxStopCallbacks.forEach(function (callbackFunction) {
    callbackFunction();
  });

  onAjaxStopCallbacks = [];
}



function start(blocName) {

  if(options.isPersistHistory && !options.isHistoryLoaded){
    if("Cookies" in window ){
      discussionHistory = Cookies.getJSON("history");
      if (discussionHistory == null) {
        discussionHistory = [];
      }
      printDiscussionHistory();
      useranswers = Cookies.getJSON("answers");
      if (useranswers == null) {
        useranswers = {};
      }
      expose.answers = useranswers;
      options.isHistoryLoaded = true;
    }else{
      log("ERROR : Unable the set isPersistHistory to true. Reason : you need to include the cookie management library", "https://github.com/js-cookie/js-cookie ")
      options.isPersistHistory = false;
    }
  }


  if (!isInitialized) {
    // We need to wait until the data has been loaded
    onAjaxStopCallbacks.push(function () {
      start(blocName);
    });
    return;
  }else{
    //We can display the chat window
    $("#chatContainer").show()
            .removeClass('close')
            .addClass('open');
  }

  if (conversationalJson != null) {
    if (discussionHistory.length == 0) {
      //No history, we start from the beginning
      gotoBloc(blocName);
    } else {
      //TODO We need to decide what to do with history
      // Need to start from the last Step find in the history
    }

  } else {
    throw "Please load a valid Markdown or JSON before calling .start(...)";
  }
}


/**
 * Move the sequence to the Next Step
 * @param nextStep Specify the Step we want to go (Optional) If not provided, it find it automatically
 *
 */
function gotoNextStep(nextStep) {
  if (nextStep != null) {
    currentConversationStep = nextStep;
  } else {
    // No step provided so we seek for the next step
    currentConversationStep = findNextStep(currentConversationBloc, currentConversationStep);
  }

  computeStep(currentConversationStep);
}

function computeStep(step) {
  if (step != null) {
    switch (step["type"]) {
    case "sentence":
      computeSentence(step);
      break;
    case "pause":
      computePause(step);
      break;
    case "input":
      computeInput(step);
      break;
    case "optionGroup":
      computeOptionGroup(step);
      break;
    case "goto":
      // We need to jump to a different
      computeGoto(step);
      break;
    case "function":
      //We need to execute a certain function
      computeCustomFunction(step);
    }
  }
}


/**
 * SENTENCE STEP Methods
 *
 */
function computeSentence(step) {
  var variance = 0.20; // (+/- 20%) for the duration of animations

  // We must animate the writing phase
  // We consider X characters per second
  var textPhraseToWrite = getSentenceFromText(step["text"]);
  var textLengthToWrite = $("<div/>").append(textPhraseToWrite).text().length;
  var typingDuration = textLengthToWrite / (options.typingSpeed + (Math.random() * 2 * variance - variance));


  // We must animate the thinking phase
  var reactionDuration = 0; // time to move hands on the keyboard
  // by default we take the time to think about what we need to write
  var thinkingDuration = 0;
  // but if the previous sentence is from the user, we need to simulate the reading process
  var lastSentence = (discussionHistory.length > 0) ? discussionHistory[discussionHistory.length - 1] : {};
  if (lastSentence["from"] == "User") {
    var textPhraseToRead = lastSentence["sentence"];
    var textLengthToRead = $("<div/>").append(textPhraseToRead).text().length;
    // we think as fast as we read
    reactionDuration = 1.0;
    thinkingDuration = textLengthToRead / (options.readingSpeed + (Math.random() * 2 * variance - variance));
  } else {
    //The Bot was just typing, so there is no delay to put his hand on the keyboard
    thinkingDuration =  textLengthToWrite / options.readingSpeed; // we think as fast as we read
  }

  thinkingDuration += reactionDuration;


  log("====Sentence===== ");
  log("text : ", textPhraseToWrite);
  log("textlength : ", textLengthToWrite);
  log("thinking duration : ", thinkingDuration);
  log("typing duration : ", typingDuration);

  // We put a little lag before writing
  thinkingTimerId = window.setTimeout(function () {
    thinkingTimerId = null;
    // like if the person was thinking
    startTypingEffect();
    typingTimerId = window.setTimeout(function () {
      typingTimerId = null;
      printSentence(textPhraseToWrite, "Bot");
      gotoNextStep();
    },
    typingDuration * 1000);
  },
  thinkingDuration * 1000);
}




function getSentenceFromText(text){
  if(!text)
    return "";


  // We parse some potential dynamic value
  var regexp = new RegExp(/(\[\w{2,}\])+/,"gi");
  var result = text.replace(regexp,function(match,offset,string){
    var valueList = getValueListFromText(match);
    var selectedIndex = Math.floor(Math.random() * valueList.length);
    return valueList[selectedIndex];
  });

  var textArray = result.split("|");
  var selectedIndex = Math.floor(Math.random() * textArray.length);

  return $.trim(textArray[selectedIndex]);
}


function getValueListFromText(text){
  var result = [];

  var node = findFirstLevelNodeWithName("value_bloc",text);
  if(node){
    var values = node["values"];
    if(isArray(values)){
      result = values;
    }
  }

  return result;
}


function startTypingEffect() {
  needScrollAtBottomBeforeAppending = isScrollBarAtBottom();

  // typing effect by default
  var messageElement = replyTemplate.clone()
  .addClass("typing")
  .addClass("fromBot");

  var urlString = "url('" + options.botface + "')";
  messageElement.find(".portrait").css("background-image",urlString);


  messageElement.find('[data-id="phraseZone"]').html("&nbsp");
  flowZone.append(messageElement);
  updateScroll();
}


function printSentence(htmlText, fromWho, isFromHistory) {

  // We can merge multiple sentence
  // if the last child sentence is of the same type
  var lastMessage = flowZone.find('[data-id="messageBloc"]:not(.typing)').last();
  var lastSentence = lastMessage.find('[data-id="sentenceZone"]').last();
  var isSameSpeaker = false;
  var isSaveToHistory = true;


  if(isFromHistory)
    isSaveToHistory = false;


  var messageElement;
  switch (fromWho) {
  case "Bot":

    // BOT Sentence
    needScrollAtBottomBeforeAppending = isScrollBarAtBottom();
    if (lastMessage.hasClass("fromBot")) {
      isSameSpeaker = true;
      // We don't need the typing area anymore
      flowZone.find(".typing").remove();
    } else {
      // last message was from User
      messageElement = flowZone.find(".typing").removeClass("typing");
      if (messageElement.length == 0) {
        messageElement = replyTemplate.clone().addClass("fromBot");
        flowZone.append(messageElement);
      }
   }
    break;
  case "User":
    // USER sentence
    needScrollAtBottomBeforeAppending = true; // We Always scroll down when it's from the user
    if (lastMessage.hasClass("fromUser")) {
      isSameSpeaker = true;
    } else {
      //last message was from Bot
      messageElement = replyTemplate.clone().addClass("fromUser");

      //If we have a typing element, we insert before
      if (flowZone.find(".typing").length > 0) {
        flowZone.find(".typing").before(messageElement);
      } else {
        flowZone.append(messageElement);

      }
    }
    break;
  case "System":
    isSaveToHistory = false;
    //It's a system line (like a date separator)
    needScrollAtBottomBeforeAppending = isScrollBarAtBottom();
    messageElement = $('<div class="separator fromSystem" data-id="messageBloc"><div data-id="phraseZone"></div></div>');
    log(messageElement);
    flowZone.append(messageElement);

    break;

   default:
     return;
  }


  if (isSameSpeaker) {
    // Instead of creating a new message bloc, we insert the message in the last existing bloc
    messageElement = lastSentence.clone().insertAfter(lastSentence);
  }else{
    if(isFromHistory){
      messageElement.addClass("fromHistory");
    }
  }



  if(isSaveToHistory)
    saveSentenceToHistory(htmlText, fromWho);



  if (messageElement != null) {
    //We add the text in the sentenceZone
    messageElement.find('[data-id="phraseZone"]')
    .html(htmlText);
  }

  updateScroll();
}



/**
 * PAUSE STEP Methods
 *
 */

function computePause(step) {
  var duration = step["millisecond"] * 1;

  log("====Pause===== ");
  log("Delai : ", duration);

  typingTimerId = window.setTimeout(function () {
    gotoNextStep();
  },
  duration);
}


/**
 * INPUT STEP Methods
 *
 */

function computeInput(step) {
  log("====Input===== ");
  log("wait for input... ");
}

function onUserInput(event) {
  event.preventDefault();

  var userInput = $.trim(inputZone.val());
  if(userInput.length == 0)
    return;

  lastUserInput = userInput;
  inputZone.val('');  //Clear the input
  log("Value :", lastUserInput);
  printSentence(lastUserInput, "User");

  if (currentConversationStep != null && currentConversationStep["type"] == "input") {
    var dataName = currentConversationStep["data"];
    if (dataName){
      useranswers[dataName] = lastUserInput;
      expose.answers = useranswers;
      if(options.isPersistHistory)
        Cookies.set("answers", useranswers);
    }

    gotoNextStep();
  }
}




/**
 *   GOTO STEP Methods
 */
function computeGoto(step){
  var blocName = step["value"];
  if(blocName != null)
    gotoBloc(blocName);
}

function gotoBloc(blocName){
  currentConversationBloc = findFirstLevelNodeWithName("dialog_bloc", blocName);
  currentConversationStep = null;
  gotoNextStep();
}


/**
 *   FUNCTION STEP Methods
 */
function computeCustomFunction(step){
  var funcName = step["name"];
  // We call the custom function
  customFunctionList[funcName]();
}

function addFunction(name,func){
  customFunctionList[name] = func;
  return this;
}

function nextFromFunction(customFunctionOutput){

  if (currentConversationStep != null){
    if (currentConversationStep["type"] == "function") {
      var nextStep = findNextStep(currentConversationBloc, currentConversationStep);
      if (nextStep != null) {
        switch (nextStep["type"]) {
          case "optionGroup" :
            nextStep = getStepFromOptionGroup(nextStep, customFunctionOutput);
            break;
        }
      }
      gotoNextStep(nextStep);

    }else if (currentConversationStep["type"] == "optionGroup") {
      //The function was called from an optiongroup
      if(customFunctionOutput){
        //if the output is TRUE we take the first step of this option
        var options = currentConversationStep["options"];
        var option = options[optionGroupOffset];
        var step = getFirstOptionStep(option);
        gotoNextStep(step);
      }else{
        // if the output is false, we move on to the next option
        optionGroupOffset = optionGroupOffset + 1;
        computeOptionGroup(currentConversationStep);
      }

    }
  }
}


/**
 * OPTIONGROUP STEP Methods
 *
 */
function computeOptionGroup(step) {
  log("====OptionGroup===== ");
  log("Choose an Option with last user input : " , lastUserInput)
  var nextStep = getStepFromOptionGroup(step, lastUserInput);
  if(nextStep != step)
    gotoNextStep(nextStep); // We go to next step only if it's a different step ( used for dynamic function callback)
}


function getStepFromOptionGroup(optionGroup, inputString) {

  var options = optionGroup["options"];
  var foundOption = null;
  var step = null;
  if (isArray(options)) {
    for (var i = optionGroupOffset; i < options.length && foundOption == null; i++) {
      // For each option we take the value
      var option = options[i];
      var optionType = option["type"];
      var optionValue = option["value"];
      if(optionType == "function"){
        optionGroupOffset = i;
        computeCustomFunction(option);
        return optionGroup; //we need to wait the callback from the function so we return the current step
      }else if(isSelectedOptionValue(optionValue,inputString)){
        foundOption = option;
      }
    }
  }

  if(foundOption == null){
    //No valid option : We take the last options if it's a "other" option
    if(isArray(options) && options.length > 0){
      var otherOption = options[options.length-1];
      var otherOptionValue = otherOption["value"];
      if(otherOptionValue && otherOptionValue.toLowerCase() == "other"){
        foundOption = otherOption;
      }
    }
  }

  // We take the first step of the founded option
  if(foundOption != null){
    step = getFirstOptionStep(foundOption);
  }else{

    //If the previous step is an input step, we go back to that step until we have the right answer
    var previousStep = findPreviousStep(currentConversationBloc, optionGroup);
    if (previousStep && previousStep["type"] == "input") {
      step = previousStep; // We go one step back
    }

  }

  optionGroupOffset = 0;
  return step;
}
function getFirstOptionStep(option){
  var step = null;
  var steps = option["steps"];
  if(isArray(steps) && steps.length > 0){
    step = steps[0];
  }
  return step;
}

function isSelectedOptionValue(value,inputString){
  if(!value)
    return null;

  value = $.trim(value);

  // We parse some potential dynamic value
  var regexp = new RegExp(/(\[\w{2,}\])+/,"gi");
  value = value.replace(regexp,function(match,offset,string){
    //We have the list of values, we simplify them
    var valueList = getValueListFromText(match);
    for(var i=0 ; i < valueList.length ; i++){
      var rawValue = simplifyString(valueList[i]);
      valueList[i] = rawValue.replace(new RegExp(/\s/,"gi"), '\\s?');
    }
    return valueList.join('|');
  });

  // we add word boundary \b to detection so we take only full word and not part of word.
  value = "\\b("+value+")\\b";

  inputString = simplifyString(inputString);

  var regexp = new RegExp(value,"gi");
  if(inputString.match(regexp) != null)
    return true;
  else
    return false;
}


function simplifyString(inputString){
  var out = inputString;
  if(out != null){
    out = removeSpecialCharacters(out.toLocaleLowerCase());
    out = $.trim(out);
  }

  return out;
}




/**
 * History Methods
 */

function printDiscussionHistory() {
  // We refresh the screen with the discussion history
  for (var i = 0; i < discussionHistory.length; i++) {
    var sentence = discussionHistory[i];
    if(i == 0){
      var time = new Date(sentence.stamp);
      printSentence(time.toLocaleDateString(),"System");
    }

    printSentence(sentence["sentence"], sentence["from"],true);

  }
}

function saveSentenceToHistory(htmlText, fromWho) {
  // We save the sentence on the discussion history
  var newSentence = {
          "from": fromWho,
          "stamp": (+new Date()),
          "sentence": htmlText
  };

  discussionHistory.push(newSentence);

  if(options.isPersistHistory)
    Cookies.set("history", discussionHistory);

}








/**
 *
 * Traversal Methods
 *
 */


/**
 * Get forst level node ot the traversal tree
 */
function findFirstLevelNodeWithName(type, name) {

  var root = conversationalJson;

  var blocFound = null;

  if(isArray(root)){
    for (var i = 0; i < root.length; i++) {
      var elt = root[i];
      var eltType = elt["type"] ? elt["type"].toLowerCase() : "";
      if(eltType == type.toLowerCase()){
        if( (typeof(name) == 'undefined') || elt["name"] == name){
          blocFound = elt;
          break;
        }
      }
    }
  }
  return blocFound;
}




function findNextStep(node, step) {
  var nextStep = null;
  if (node != null) {
    if (step == null) {
      // We take the first step of the currentbloc
      if (isArray(node["steps"]) && node["steps"].length > 0) {
        nextStep = currentConversationBloc["steps"][0];
      }
    } else {
      //We search the current step in each "steps" arrays
      if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          if (node[i] === step) {
            if (i + 1 < node.length) {
              nextStep = node[i + 1];
            } else {
              nextStep = -1;
            }
            break;
          } else {
            nextStep = findNextStep(node[i], step);
            if (nextStep != null) {
              if (nextStep == -1 && isArray(node["steps"])) {
                // We have found the step in a lower level
                if (i + 1 < node.length)
                  nextStep = node[i + 1];
              }
              break;
            }
          }
        }

      } else if ((typeof node === 'object') && (node !== null)) {
        for (var key in node) {
          if (node.hasOwnProperty(key)) {
            nextStep = findNextStep(node[key], step);
            if (nextStep != null)
              return nextStep;
          }
        }
      }
    }
  }
  return nextStep;
}

function findPreviousStep(node, step) {
  var previousStep = null;
  if (node != null) {
    if (step == null) {
      // We take the first step of the currentbloc
      if (isArray(node["steps"]) && node["steps"].length > 0) {
        previousStep = currentConversationBloc["steps"][0];
      }
    } else {
      //We search the current step in each "steps" arrays
      if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          if (node[i] === step) {
            if (i - 1 > 0) {
              previousStep = node[i - 1];
            } else {
              previousStep = -1;
            }
            break;
          } else {
            previousStep = findPreviousStep(node[i], step);
            if (previousStep != null) {
              if (previousStep == -1 && isArray(node["steps"])) {
                // We have found the step in a lower level
                if (i - 1 > 0)
                  previousStep = node[i - 1];
              }
              break;
            }
          }
        }

      } else if ((typeof node === 'object') && (node !== null)) {
        for (var key in node) {
          if (node.hasOwnProperty(key)) {
            previousStep = findPreviousStep(node[key], step);
            if (previousStep != null)
              return previousStep;
          }
        }
      }
    }
  }
  return previousStep;
}


/**
 *
 * Scrolling Methods
 *
 */

function updateScroll() {
  window.setTimeout(function () {
    if (needScrollAtBottomBeforeAppending) {
      //Yes, so we scroll to bottom
      flowZone.each(function () {

        this.scrollTop = this.scrollHeight;
      });
    }
  }, 1)
}

function isScrollBarAtBottom() {
  var isBottom = false;
  flowZone.each(function () {
    isBottom = this.scrollHeight - this.clientHeight <= this.scrollTop + 1;
  });
  return isBottom;
}

function removeSpecialCharacters(str) {
  var defaultDiacriticsRemovalMap = [
          /*  this is for uppercase letter, which we don't have here
          {"base":"A", "letters":/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
          {"base":"AA","letters":/[\uA732]/g},
          {"base":"AE","letters":/[\u00C6\u01FC\u01E2]/g},
          {"base":"AO","letters":/[\uA734]/g},
          {"base":"AU","letters":/[\uA736]/g},
          {"base":"AV","letters":/[\uA738\uA73A]/g},
          {"base":"AY","letters":/[\uA73C]/g},
          {"base":"B", "letters":/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
          {"base":"C", "letters":/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
          {"base":"D", "letters":/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
          {"base":"DZ","letters":/[\u01F1\u01C4]/g},
          {"base":"Dz","letters":/[\u01F2\u01C5]/g},
          {"base":"E", "letters":/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
          {"base":"F", "letters":/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
          {"base":"G", "letters":/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
          {"base":"H", "letters":/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
          {"base":"I", "letters":/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
          {"base":"J", "letters":/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
          {"base":"K", "letters":/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
          {"base":"L", "letters":/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
          {"base":"LJ","letters":/[\u01C7]/g},
          {"base":"Lj","letters":/[\u01C8]/g},
          {"base":"M", "letters":/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
          {"base":"N", "letters":/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
          {"base":"NJ","letters":/[\u01CA]/g},
          {"base":"Nj","letters":/[\u01CB]/g},
          {"base":"O", "letters":/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
          {"base":"OI","letters":/[\u01A2]/g},
          {"base":"OO","letters":/[\uA74E]/g},
          {"base":"OU","letters":/[\u0222]/g},
          {"base":"P", "letters":/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
          {"base":"Q", "letters":/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
          {"base":"R", "letters":/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
          {"base":"S", "letters":/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
          {"base":"T", "letters":/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
          {"base":"TZ","letters":/[\uA728]/g},
          {"base":"U", "letters":/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
          {"base":"V", "letters":/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
          {"base":"VY","letters":/[\uA760]/g},
          {"base":"W", "letters":/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
          {"base":"X", "letters":/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
          {"base":"Y", "letters":/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
          {"base":"Z", "letters":/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
                                      */
                                     {"base":"a", "letters":/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
                                     {"base":"aa","letters":/[\uA733]/g},
                                     {"base":"ae","letters":/[\u00E6\u01FD\u01E3]/g},
                                     {"base":"ao","letters":/[\uA735]/g},
                                     {"base":"au","letters":/[\uA737]/g},
                                     {"base":"av","letters":/[\uA739\uA73B]/g},
                                     {"base":"ay","letters":/[\uA73D]/g},
                                     {"base":"b", "letters":/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
                                     {"base":"c", "letters":/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
                                     {"base":"d", "letters":/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
                                     {"base":"dz","letters":/[\u01F3\u01C6]/g},
                                     {"base":"e", "letters":/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
                                     {"base":"f", "letters":/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
                                     {"base":"g", "letters":/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
                                     {"base":"h", "letters":/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
                                     {"base":"hv","letters":/[\u0195]/g},
                                     {"base":"i", "letters":/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
                                     {"base":"j", "letters":/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
                                     {"base":"k", "letters":/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
                                     {"base":"l", "letters":/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
                                     {"base":"lj","letters":/[\u01C9]/g},
                                     {"base":"m", "letters":/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
                                     {"base":"n", "letters":/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
                                     {"base":"nj","letters":/[\u01CC]/g},
                                     {"base":"o", "letters":/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
                                     {"base":"oi","letters":/[\u01A3]/g},
                                     {"base":"ou","letters":/[\u0223]/g},
                                     {"base":"oo","letters":/[\uA74F]/g},
                                     {"base":"p","letters":/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
                                     {"base":"q","letters":/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
                                     {"base":"r","letters":/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
                                     {"base":"s","letters":/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
                                     {"base":"t","letters":/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
                                     {"base":"tz","letters":/[\uA729]/g},
                                     {"base":"u","letters":/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
                                     {"base":"v","letters":/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
                                     {"base":"vy","letters":/[\uA761]/g},
                                     {"base":"w","letters":/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
                                     {"base":"x","letters":/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
                                     {"base":"y","letters":/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
                                     {"base":"z","letters":/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g},
                                     {"base":" ","letters":/[\u002D\u005F\u002E\u003F\u0021\u002C\u0027]/g},
                                     {"base":"","letters":/[\u0028\u0029\u003A\u003B\u005B\u005C\u005D\u00EE]/g}
                                     ];

  for(var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
  }

  return str;
}

function log(message, value){
  if(options.isLogEnabled && console){
    if(value)
      console.log(message,value);
    else
      console.log(message);
  }
}

function getConversationAsJson(){
  if(conversationalJson)
    return JSON.stringify(conversationalJson);
}




expose.loadJSON = expose.loadMD = function(url) {
  load(url).then((data) => {
    isInitialized = true;
    conversationalJson = data;
    loadingStop();
  });
  return this;
};
expose.setOptions = setOptions;
expose.start = start;
expose.addFunction = addFunction;
expose.next = nextFromFunction;
expose.getConversationAsJson = getConversationAsJson;

expose.answers = {};
expose.options = {};

init();

module.exports = expose;
