$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks['bot'] = {
  init: function () {
    this.appendValueInput("dropdown_ques")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown([["Ask me a question:", "questiondetail"], ["What is the date today?", "date"], ["What is the time now?", "time"], ["How are you?", "howru"], ["What is Javascript?", "javascript"], ["What is your name?", "yourname"]]), "Questions");
    this.setInputsInline(false);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot'] = function (block) {
  var dropdown__ask_me_a_question = block.getFieldValue('Questions');

  // If Question is not selected
  var ques = "Please select a question";

  // Question 1 answer
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  var dateToday = dd + '/' + mm + '/' + yyyy;
  
  // Question 2 answer
  var hh = String(today.getHours()).padStart(2,'0');
  var mi = String(today.getMinutes()).padStart(2,'0');
  var ss = String(today.getSeconds()).padStart(2,'0');
  var timeToday = hh + ':' + mi + ':' + ss;

  // Question 3 answer
  var how = "I am fine.";

  // Question 4 answer
  var js = "JavaScript is the Programming Language for the Web.";

  // Question 5 answer
  var myName = "My name is Aagam Jain."
  
  if (dropdown__ask_me_a_question === "questiondetail") {
    var code = `var inputTextValue ="${ques}";`;
  }
  else if (dropdown__ask_me_a_question === "date") {
    var code = `var inputTextValue = "${dateToday}";`;
  }
  else if (dropdown__ask_me_a_question === "time") {
    var code = `var inputTextValue = "${timeToday}";`;
  }
  else if (dropdown__ask_me_a_question === "howru") {
    var code = `var inputTextValue = "${how}";`;
  }
  else if (dropdown__ask_me_a_question === "javascript") {
    var code = `var inputTextValue = "${js}";`;
  }
  else if (dropdown__ask_me_a_question === "yourname") {
    var code = `var inputTextValue = "${myName}";`;
  }
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  workspace.clear();
  redrawUi();
}
