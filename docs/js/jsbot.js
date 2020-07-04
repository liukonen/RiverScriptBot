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
		  	let WSR = await axios.get('https://river-backend.herokuapp.com/?text=' + msg);
		  	this.messages.push({text: WSR.data.response, isBot: true, time: (new Date).toLocaleTimeString()})
		  	this.counter ++;
		  	var $dialogue = $("#dialogue");
		  	$dialogue.animate({ scrollTop: $dialogue[0].scrollHeight }, 1000);
	  }
	}
  })