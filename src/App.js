import logo from './logo.svg';
import './App.css';
import './normalize.css'
import { useState } from 'react';

function App() {

  const [input, setInput] = useState("");
  // const [chatLog, setChatLog] = useState([{
  //   user: "gpt",
  //   message: "How can I help you today?"
  // }]);
  const [chatLog, setChatLog] = useState([]);

  function clearChat(){
    setChatLog([]);
  }

  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [...chatLog, {user: "me", message: `${input}`}]
    const prompt = input
    // setChatLog([...chatLog, {user: "me", message: `${input}`}]);
    setInput("");

    const messages = chatLog.map((message) => message.message).join("\n")
    // console.log(chatLog);
    console.log(messages);
    const response = await fetch(`http://localhost:5000/api/${prompt} at the end`)
    console.log(response)
    const data = await response.json();

    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}`}])
    console.log(chatLog);
    console.log(data);


  }


  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className='chatbox'>
        <div className='chat-log'>
          
          {chatLog.map((message,index) => (
            <ChatMessage key={index} message={message}/>
          ))}
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input className='chat-input-textarea' rows="1" value={input} onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({message}) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "gpt"}`} >
      <div className='chat-message-center'>
      {message.user === "me" ? 
        <div className='avatar '>
          <svg viewBox="0 0 100 100" fill="#1E3A57" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="avatar">
            <circle cx="50" cy="50" r="50" fill="#1E3A57"/>
            <path
              d="M50 10c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25zm0 5c-8.271 0-15 6.729-15 15s6.729 15 15 15 15-6.729 15-15-6.729-15-15-15zm21.706 41.9C65.51 58.538 57.09 62 50 62c-7.092 0-15.51-3.462-21.706-5.1C27.934 55.525 38.125 53 50 53s22.066 2.525 21.706 3.9zM50 30c5.522 0 10 4.478 10 10s-4.478 10-10 10-10-4.478-10-10 4.478-10 10-10zm0 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"
              fill="#FFFFFF" 
            />
          </svg>
        </div>
        :
        <div className='avatar '>
                <svg viewBox="0 0 100 100" fill="#3C91E6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="avatar">
                  <circle cx="50" cy="50" r="50" />
                  <path
                    d="M30.42 57.474c2.07-1.738 3.38-4.506 3.38-7.554 0-4.746-3.86-8.606-8.606-8.606S16.588 45.174 16.588 50s3.86 8.606 8.606 8.606c2.753 0 5.2-1.285 6.787-3.294a1.844 1.844 0 0 1 2.562-.35 1.856 1.856 0 0 1 .35 2.562C28.75 58.608 28.189 59 27.588 59c-.732 0-1.447-.336-1.92-.921a1.856 1.856 0 0 1 .351-2.562z"
                    fill="#FFF"
                  />
                  <path
                    d="M76.844 52.496c-1.703-2.872-4.895-4.742-8.238-4.742s-6.534 1.87-8.238 4.742c-.635 1.071-1.93 1.44-3.001.803-1.07-.635-1.439-1.93-.803-3.001 2.548-4.307 7.147-7.144 12.041-7.144 4.894 0 9.493 2.837 12.041 7.144.636 1.071.268 2.366-.802 3.001zM50 0C22.43 0 0 22.43 0 50s22.43 50 50 50 50-22.43 50-50S77.57 0 50 0zm0 93.75C26.324 93.75 6.25 73.676 6.25 50 6.25 26.324 26.324 6.25 50 6.25S93.75 26.324 93.75 50c0 23.676-20.074 43.75-43.75 43.75z"
                    fill="#F36A5A"
                  />
                </svg>
              </div>
      }
        <div className='message'>
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
