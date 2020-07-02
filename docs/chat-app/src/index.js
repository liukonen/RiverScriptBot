import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from "jquery";



class TodoApp extends React.Component {
  constructor(props) {

    super(props);
    //this .context.Bot = 
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div id="app">
      <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col chat h-100">
  
        <div className="card h-100">
          <div className="card-header msg_head">
            <div className="d-flex bd-highlight justify-content-between">
              <div className="img_cont">
                <img src="./img/msrobot.png" className="rounded-circle user_img" alt="River" />
                <span className="online_icon"></span>
              </div>
              <div className="user_info">
                <span>Chat with River</span>
                <p><i id="msgCount">{this.context.counter}</i> Messages</p>
              </div>
              <button  className=" text-light btn btn-link" data-toggle="modal" data-target="#aboutModal"><i className="fas fa-info-circle fa-3x"></i></button>
            </div>

          </div>
          <div className="card-body msg_card_body" id="dialogue">
          <TodoList items={this.state.items}/>
          </div>

          <div className="card-footer">

          <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <div className="input-group-append">
               <span className="input-group-text attach_btn"></span>
             </div>
             <input type="text" className="form-control type_msg" placeholder="Type your message..." value={this.state.text} onChange={this.handleChange}></input>
             <div className="input-group-append">
               <button type="submit" value="Submit" className="input-group-text send_btn"> Send<i className="fas fa-location-arrow"></i></button>
             </div>
          </div>
          </form>
        </div>
  </div>
    </div>
        </div>
      </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }

    
    const newItem = {
      text: this.state.text,
      id: Date.now(), isBot: false
    };

     this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));

    let cb = await window.bot.reply("local-user", this.state.text);
    const BotItem = {text: cb, id: Date.now(), isBot: true}
    this.setState(state => ({
      items: state.items.concat(BotItem),
      text: ''
    }));
    var $dialogue = $("#dialogue");
    $dialogue.animate({ scrollTop: $dialogue[0].scrollHeight }, 1000);

  }
}

class TodoList extends React.Component {
  render() {
   
    return (
      
      <div>
        {this.props.items.map(item => (
              <div>
              {item.isBot ? (
                        <div className= "d-flex justify-content-start mb-4">
                          <div class="img_cont_msg">
                            <img src="./img/msrobot.png" className="rounded-circle user_img_msg" alt="river" />
                          </div>
                          <div className="msg_cotainer">
                            <p>{item.text}</p>
                            <span className="msg_time">{(new Date()).toLocaleTimeString()}</span>
                          </div>
                        </div>
      ) : (
        <div className="d-flex justify-content-end mb-4">
        <div class="msg_cotainer_send">
          <p>{item.text}</p>
          <span class="msg_time_send">{(new Date()).toLocaleTimeString()}</span>
        </div>
        <div class="img_cont_msg">
          <img src="img/user.png" class="rounded-circle user_img_msg" alt="user" />
        </div>
      </div>
      )}

</div>



              

          
          ))} 
</div>
    );
  }
}




ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);




//ReactDOM.render(
//  <React.StrictMode>
//    <parentForm />
//  </React.StrictMode>,
///  document.getElementById('root')
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
