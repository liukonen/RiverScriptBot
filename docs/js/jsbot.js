Date.prototype.addHours = function(h) {this.setTime(this.getTime() + (h*60*60*1000));  return this;}

/* RiveScript.com "Try Online" Script */
window.bot = null;

function loadTemplate(template) {

	let temp;

	if (localStorage.getItem(template + "expire") === null || localStorage.getItem(template + "expire") < new (Date))
	{
		$.ajax({
			url: "./" + template,
				dataType: "text",	async: false,
			error: function(jqXHR, textStatus, error) {window.alert(error);},
			success: function(data, textStatus, jqXHR) {temp = data;}
		});
		localStorage.setItem(template, temp);
	//	let current = new Date;
		let date = new Date;
		localStorage.setItem(template + "expire", (new Date).addHours(12));
	}else{
		temp = localStorage.getItem(template);
	}

	if (temp.length == 0) {window.alert("You didn't enter any RiveScript code!");return false;}
	// Initialize the bot.
	window.bot = new RiveScript();
	window.bot.setHandler("coffeescript", new RSCoffeeScript(window.bot));
	window.bot.stream(temp, function(error) {
		window.alert("Error in your RiveScript code:\n\n" + error);
	});
	window.bot.sortReplies();
}



const UserTempate = $("#UserTempate");
const BotTempate  = $("#botTempate");

function ClickOrPress(){
	var $dialogue = $("#dialogue");
	var $message = $("#message");

	if (window.bot === null) {return; /* No bot? Weird.*/}
	let message = $message.val();
	if (message.length == 0) {return;	}
	let item = {userRequest:message, time:(new Date).toLocaleTimeString()};
	UserTempate.tmpl(item).appendTo($dialogue);
	$message.val("");
	// Fetch the reply.
	window.bot.reply("local-user", message).then(function(reply) {
		reply = reply.replace(new RegExp("\n", "g"), "<br>");
		let responseItem = { botResponse:reply, time: (new Date).toLocaleTimeString()};
		BotTempate.tmpl(responseItem).appendTo($dialogue);
		$dialogue.animate({ scrollTop: $dialogue[0].scrollHeight }, 1000);
	});
	let el = parseInt($("#msgCount").text());
	$("#msgCount").text(parseInt(el)+1);
}

$(document).ready(function() {

	loadTemplate("rs-standard.rive.txt");

	// The Enter key.
	$("#message").keydown(function(e) {
		if (e.keyCode == 13) {
			ClickOrPress();
		}
	})
});
