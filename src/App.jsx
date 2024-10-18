/*
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

import Sidebar from './components/Sidebarr';
import ChatWindow from './components/ChatWindoww';
import ChatForm from './components/ChatForm';

function App() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [localChats, setLocalChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    setMessage(null);
    setText('');
    setCurrentTitle(null);
  };

  const backToHistoryPrompt = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText('');
  };

  const toggleSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text) return;

    setIsResponseLoading(true);
    setErrorText('');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: text }),
    };

    try {
      const response = await fetch('http://localhost:3000/api/search/', options);

      if (response.status === 429) {
        return setErrorText('Too many requests, please try again later.');
      }

      const data = await response.json();
      if (data.error) {
        setErrorText(data.error.message);
        setText('');
      } else {
        setErrorText('');
        setMessage(data);
        setTimeout(() => {
          scrollToLastItem.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        }, 1);
        setTimeout(() => {
          setText('');
        }, 2);
      }
    } catch (e) {
      setErrorText(e.message);
    } finally {
      setIsResponseLoading(false);
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsShowSidebar(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const storedChats = localStorage.getItem('previousChats');
    if (storedChats) setLocalChats(JSON.parse(storedChats));
  }, []);

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      const newChat = { title: currentTitle, role: 'user', content: text };
      const responseMessage = { title: currentTitle, role: message.role, content: message.ai_message };

      setPreviousChats((prevChats) => [...prevChats, newChat, responseMessage]);
      setLocalChats((prevChats) => [...prevChats, newChat, responseMessage]);

      localStorage.setItem('previousChats', JSON.stringify([...localChats, newChat, responseMessage]));
    }
  }, [message, currentTitle]);

  const currentChat = (localChats || previousChats).filter((prevChat) => prevChat.title === currentTitle);

  return (
    <div className='container'>
      <Sidebar
        createNewChat={createNewChat}
        backToHistoryPrompt={backToHistoryPrompt}
        isShowSidebar={isShowSidebar}
        toggleSidebar={toggleSidebar}
        previousChats={previousChats}
        localChats={localChats}
      />

      <section className='main'>
        {!currentTitle ? (
          <div className='empty-chat-container'>
            <img src='images/chatgpt-logo.svg' width={45} height={45} alt='MimirAI' />
            <h1>MimirAI</h1>
            <h3>How can I help you today?</h3>
          </div>
        ) : (
          <ChatWindow currentChat={currentChat} scrollToLastItem={scrollToLastItem} />
        )}

        <ChatForm
          text={text}
          setText={setText}
          submitHandler={submitHandler}
          isResponseLoading={isResponseLoading}
          errorText={errorText}
        />
      </section>
    </div>
  );
}

export default App;
*/
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatForm from './components/ChatForm';


function App() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [localChats, setLocalChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    setMessage(null);
    setText('');
    setCurrentTitle(null);
  };

  const backToHistoryPrompt = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText('');
  };

  const toggleSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text) return;

    setIsResponseLoading(true);
    setErrorText('');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({ query: text }),

      body: JSON.stringify({
        query: text,
        internet_access: "true" // or "false", based on your logic
      }),
    };

    console.log(currentChat)

    try {
      const response = await fetch('http://localhost:3000/api/search/', options);

      if (response.status === 429) {
        return setErrorText('Too many requests, please try again later.');
      }

      const data = await response.json();
      if (data.error) {
        setErrorText(data.error.message);
        setText('');
      } else {
        setErrorText('');
        setMessage(data);
        // setTimeout(() => {
        //   scrollToLastItem.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        // }, 1);
        
        setTimeout(() => {
          setText('');
        }, 2);
      }
    } catch (e) {
      setErrorText(e.message);
    } finally {
      setIsResponseLoading(false);
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsShowSidebar(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const storedChats = localStorage.getItem('previousChats');
    if (storedChats) setLocalChats(JSON.parse(storedChats));
  }, []);

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      const newChat = { title: currentTitle, role: 'user', content: text };
      const responseMessage = { title: currentTitle, role: message.role, content: message.ai_message, sources: message.sources };

      setPreviousChats((prevChats) => [...prevChats, newChat, responseMessage]);
      setLocalChats((prevChats) => [...prevChats, newChat, responseMessage]);

      localStorage.setItem('previousChats', JSON.stringify([...localChats, newChat, responseMessage]));
    }
  }, [message, currentTitle]);

  const currentChat = (localChats || previousChats).filter((prevChat) => prevChat.title === currentTitle);

  return (
    <div className='container'>
      <Sidebar
        createNewChat={createNewChat}
        backToHistoryPrompt={backToHistoryPrompt}
        isShowSidebar={isShowSidebar}
        toggleSidebar={toggleSidebar}
        previousChats={previousChats}
        localChats={localChats}
      />

      <section className='main'>
        {!currentTitle ? (
          <div className='empty-chat-container'>
          <img src='/images/mimirlogo.PNG' alt='MimirAI' width={45} height={45} />


            <h1>MimirAI</h1>
            <h3>How can I help you today?</h3>
          </div>
        ) : (
          <ChatWindow currentChat={currentChat} text={text} isResponseLoading={isResponseLoading} scrollToLastItem={scrollToLastItem} />
        )}

        <ChatForm
          text={text}
          setText={setText}
          submitHandler={submitHandler}
          isResponseLoading={isResponseLoading}
          errorText={errorText}
        />
      </section>
    </div>
  );
}

export default App;
