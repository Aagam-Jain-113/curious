$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks['bot'] = {
  init: function() {
    this.appendStatementInput("BOT")
        .setCheck(null)
        .appendField("bot");
    this.setColour(225);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

var code="";
Blockly.JavaScript['bot'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'BOT');
  return code;
};

Blockly.Blocks['dropdown'] = {
  init: function() {
    this.appendValueInput("dropdown_ques")
      .appendField("Ask me a Question: ")
      .appendField(new Blockly.FieldDropdown([["select", "select"], ["What is the date today?", "date"], ["What is the time now?", "time"], ["How are you?", "howru"], ["What is Javascript?", "javascript"], ["What is your name?", "yourname"]]), "Questions");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['dropdown'] = function (block) {
  var question = block.getFieldValue('Questions');
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
  
  if (question === "select") {
    code = `var inputTextValue ="${ques}";`;
  }
  else if (question === "date") {
    code = `var inputTextValue = "${dateToday}";`;
  }
  else if (question === "time") {
    code = `var inputTextValue = "${timeToday}";`;
  }
  else if (question === "howru") {
    code = `var inputTextValue = "${how}";`;
  }
  else if (question === "javascript") {
    code = `var inputTextValue = "${js}";`;
  }
  else if (question === "yourname") {
    code = `var inputTextValue = "${myName}";`;
  }
  return 'alert(getAnswer(' + question + ');\n ';
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
