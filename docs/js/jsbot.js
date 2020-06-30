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







new Vue({
	el: '#app',
	data: {
	  counter: 0,
	  message: '',
	  messages: [ ]
	},
	methods: {
	  
		async sendMessage() {

			let msg = this.message;
			this.message = "";
		  this.messages.push({text: msg, isBot: false, time:(new Date).toLocaleTimeString()});
		  
		  let cb = await window.bot.reply("local-user", msg);//.then(function(reply) {

		  this.messages.push({text: cb, isBot: true, time: (new Date).toLocaleTimeString()})
		  this.counter ++;
		  
		
		  var $dialogue = $("#dialogue");
		  $dialogue.animate({ scrollTop: $dialogue[0].scrollHeight }, 1000);
		
	  }
	}
  })



	loadTemplate("rs-standard.rive.txt");