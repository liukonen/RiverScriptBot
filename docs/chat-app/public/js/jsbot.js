Date.prototype.addHours = function(h) {this.setTime(this.getTime() + (h*60*60*1000));  return this;}

window.bot = null;

function loadTemplate(template) {

	let temp;

	if (localStorage.getItem(template + "expire") === null || localStorage.getItem(template + "expire") < new (Date))
	{
		$.ajax({
			url:  template,
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

	loadTemplate("rs-standard.rive.txt");