// import React, { Component } from 'react'
// import ChatBot from 'react-simple-chatbot';

// const steps = [
//     {
//         id: '0',
//         message: 'Welcome to react chatbot!',
//         trigger: '1',
//     },
//     {
//         id: '1',
//         message: 'Bye!',
//         end: true,
//     },
// ];
// export default class Demo extends Component {
//     render() {
//         return (
//             <div>
//                 <ChatBot steps={steps} />
//             </div> 
//         )
//     }
// }

import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'

export default class Demo extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user[0].fullname : 'User',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
}