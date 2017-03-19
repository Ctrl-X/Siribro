/* global window */

const isArray = require('lodash/isArray');

function buildOptionGroupObj(){
  // We build an optionGroup
  var obj = {
    "type" : "optionGroup",
    "options" : []
  }
  return obj;
}

function buildOptionObj(dataArray,lines,leadingSpaceCount){
  var option = null;
  // build an option from dataArray
  if(isArray(dataArray) && dataArray.length > 0){
    var steps = buildChilds(lines,leadingSpaceCount+1);
    option = {
      "type" : "option",
      "value" : dataArray[1],
      "steps" : steps
    };
  }
  return option;
}


function buildSentenceObj(dataArray){
  // build a sentence line from a dataArray
  var obj = null
  if(isArray(dataArray) && dataArray.length > 0){
    obj = {
      "type" : "sentence",
      "text" : $.trim(dataArray[1])
    }
  }
  return obj;
}

function buildFunctionObj(dataArray){
// build a function line from a dataArray
  var obj = null;
  if(isArray(dataArray) && dataArray.length > 0){
    var functionName = dataArray[1];
    var param = dataArray.length > 2 ? $.trim(dataArray[2]) : null;
    switch(functionName){
      case "input" :
        obj = {
          "type" : "input",
          "data" : param
        };
        break;
      case "goto" :
        obj = {
          "type" : "goto",
          "value" : param
        };
        break;
      case "pause" :
        obj = {
          "type" : "pause",
          "millisecond" : param
        };
        break;
      default :
        // unknown function (Custom function)
        obj = {
          "type" : "function",
          "name" : functionName
        };
    }
  }
  return obj;
}

function buildChilds(lines, currentIndentation){
  var childs = [];
  const leadingPattern = new RegExp(/^(\s*)/,""); // Anything that begin with a space or \t
  const sentencePattern = new RegExp(/\s*\*\s(.+)$/,"");      // ex : * Hi, how are you ?
  const functionPattern = new RegExp(/^\s*\*\s`\s*(.+)\((\w*)\)\s*`\s*$/,"");   //ex : * `input(firstTime)`
  const optionListPattern = new RegExp(/^\s*\d{1,}\.\s(.+)$/,"");   // ex :     1. Yes it's Ok


  var obj = {};
  while (lines.length > 0){
    var line = lines[0];

    var leadingSpace = leadingPattern.exec(line);
    var leadingSpaceCount = leadingSpace[0].length;

    if(leadingSpaceCount < currentIndentation){
      break; // This line is at least 1 level above, so we exit the loop
    }

    //As we will process this line, we can  remove it safely from the line array
    lines.shift();


    var matchArray = null; // RegExp.exec will parse the expression and return the matching groups when exist
    if(matchArray = functionPattern.exec(line)){
      obj = buildFunctionObj(matchArray);
      if(obj){
        childs.push(obj);
      }
    }else if(matchArray = sentencePattern.exec(line)){
      obj = buildSentenceObj(matchArray);
      if(obj){
        childs.push(obj);
      }
    }else if(matchArray = optionListPattern.exec(line)){
      if(obj.type != "optionGroup"){
        //We create the root optionGroup
        obj = buildOptionGroupObj();
        if(obj){
          childs.push(obj);
        }
      }
      // We are already in an optionGroup, we add this option
      var option = buildOptionObj(matchArray,lines,leadingSpaceCount);
      if(option)
        obj.options.push(option);

    }else{
      obj = null;
    }
  }

  return childs;
}

function buildBloc(lines){
  const dialogBlocPattern = new RegExp(/^#\s(\w+)\s*$/,"g");  //  ex : # FirstTime
  const valueListPattern = new RegExp(/^(\[\w+\])\s*$/,""); //  ex : [Yes]
  const valuePattern = new RegExp(/\s*\*\s(.+)/,"");

  var blockHeader = lines.shift();
  var jsonBlock = null;
  var matchArray = null;
  var childs = [];
  // There is two type of blocs : Dialog bloc and ValueBloc
  if(matchArray = dialogBlocPattern.exec(blockHeader)){
    childs = buildChilds(lines,0);
    jsonBlock = {
      "type": "dialog_bloc",
      "name": matchArray[1] ,
      "steps": childs
    };
  }else if(matchArray = valueListPattern.exec(blockHeader)){
    // We need to get every value after and put then in the values list
    var value = null;
    for(var j=0;j < lines.length;j++){
      if(value = valuePattern.exec(lines[j])){
        childs.push($.trim(value[1]));

      }
    }
    jsonBlock = {
      "type": "value_bloc",
      "name": matchArray[1] ,
      "values": childs
    };
  }

  return jsonBlock;
}

function fromMarkdown(markdownString){
  var json = null;

  const linePattern = new RegExp(/^.*$/,"gm");  // Anything that ends with a newline
  const emptyLinePattern = new RegExp(/^\s*$/,"g");   // ex :
  const singleLineCommentPattern = new RegExp(/[^.]?\/\/.*$/,"gm");  // ex : //
  const multiLineCommentPattern = new RegExp(/[^.]?\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//,"g");  // ex : /*  this is a comment */

  if(markdownString){
    json = [];

    //We trim comments from the document
    markdownString = markdownString.replace(singleLineCommentPattern, '')
      .replace(multiLineCommentPattern, '');

    // Replace \t with four space
    markdownString = markdownString.replace(/\t/g,'    ');

    //We split lines
    var lines = markdownString.match(linePattern);
    lines.push(""); // We add an empty line at the end

    // bloc : multiline text. Each bloc are separated from each other by at least one empty line
    var blocs = [];  // will contain a list of bloc
    var currentBloc = [];

    // We match the line against empty patterns to find blocs
    for(var i=0; i < lines.length;i++){
      var line = lines[i];
      if(emptyLinePattern.test(line)){
        // EMPTY LINE : if there is a bloc, we add it to the list of blocks
        if(currentBloc.length > 0){
          blocs.push(currentBloc);
          currentBloc = [];
        }
      }else
        currentBloc.push(line);
    }

    // We transform each block into a json object
    for(var i=0; i < blocs.length;i++){
      var jsonBlock = buildBloc(blocs[i]);
      if(jsonBlock)
        json.push(jsonBlock);
    }
  }

  return json;
}

function load(fileUrl, fileType, callback) {
  $.ajax({
    url: fileUrl,
    beforeSend: function (xhr) {
      xhr.overrideMimeType(fileType + "; charset=utf-8");
    },
    complete: function (jqXHR, status) {
      if (status != "success") {
        throw "Ajax call failed : " + status;
      }
    }
  }).done(function (data) {
    if (data != null && data.length > 0) {
      if( fileType == "application/json"){
        callback(data);
      }else if( fileType == "text/markdown"){
        callback(fromMarkdown(data));
      }
    }
  });
}

module.exports = {
  load
};
