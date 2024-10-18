/*
const ChatWindow = ({
  currentChat,
  text,
  isResponseLoading,
  scrollToLastItem,
}) => {
  return (
    <div className="main-header">
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {currentChat?.map((chatMsg, idx) => {
          const isUser = chatMsg.role === "user";
          const sources = chatMsg?.sources;

          return (
            <li
              key={idx}
              ref={scrollToLastItem}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              {!isUser ? (
                <div>
                  <img src="/images/mimirlogo.PNG" alt="MimirAI" />
                </div>
              ) : null}
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: isUser ? "#404150" : "transparent", // Red background for user messages, no background for bot messages
                  marginLeft: isUser ? "10px" : "0",
                  marginRight: isUser ? "0" : "10px",
                }}
              >
                {!isUser ? (
                  <>
                    <p className="role-title">MimirAI</p>
                    <h3>Sources</h3>
                    <div className="source-box">
                      {sources?.map((source, sid) => (
                        <a href={source} target="_blank" className="source">
                          {source}
                        </a>
                      ))}
                    </div>
                    <h3>Answer</h3>
                  </>
                ) : null}

                <p>{chatMsg.content}</p>
              </div>
            </li>
          );
        })}
        {isResponseLoading ? (
          <>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#404150",
                }}
              >
                <p>{text}</p>
              </div>
            </li>
            <li
              ref={scrollToLastItem}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "10px",
              }}
            >
              <img src="/images/mimirlogo.PNG" alt="MimirAI" />
              <div
                className="placeholder-chat"
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "transparent", // No background for the bot placeholder message
                  marginLeft: "10px",
                }}
              >
                <p className="role-title">MimirAI</p>

                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default ChatWindow;*/

import React, { useState, useEffect, useRef } from 'react';

const ChatWindow = ({
  currentChat,
  text,
  isResponseLoading,
  // scrollToLastItem,
}) => {

  const scrollToLastItem = useRef(null); 
  // Function to truncate the URL and handle the view more functionality
  useEffect(() => {
    if (scrollToLastItem.current) {
      scrollToLastItem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [text]); 
  const TruncateSource = ({ source, charLimit = 30 }) => {
    const [isFullView, setIsFullView] = useState(false);
    
    const toggleView = () => setIsFullView(!isFullView);
    const extractDomain = (url) => {
      const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/i);
      return match ? match[1].split('.')[0] : url; // Get the first part of the domain
    };
    const title = extractDomain(source);

    return (
      <span>
        {/* Conditionally render truncated or full URL */}
        {isFullView ? source : `${title.substring(0, charLimit)}...`}
        {/* View More/View Less link */}
        {source.length > charLimit && (
          <span
            onClick={toggleView}
            style={{ color: 'white', cursor: 'pointer', marginLeft: '5px',  }}
          >
            {/* {isFullView ? 'View Less' : 'View More'} */}
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="main-header">
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {currentChat?.map((chatMsg, idx) => {
          const isUser = chatMsg.role === "user";
          const sources = chatMsg?.sources;

          return (
            <li
              key={idx}
              // ref={scrollToLastItem}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              {!isUser ? (
                <div>
                  <img src="/images/mimirlogo.PNG" alt="MimirAI" />
                </div>
              ) : null}
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: isUser ? "#404150" : "transparent", 
                  marginLeft: isUser ? "10px" : "0",
                  marginRight: isUser ? "0" : "10px",
                }}
              >
                {!isUser ? (
                  <>
                    <p className="role-title">MimirAI</p>
                    <h3>Sources</h3>
                    <div className="source-box">
                      {sources?.map((source, sid) => (
                        <a href={source} target="_blank" className="source" key={sid}>
                          {/* Use the TruncateSource component to handle truncation and view more */}
                          <TruncateSource source={source} />
                        </a>
                      ))}
                    </div>
                    <h3>Answer</h3>
                  </>
                ) : null}

                <p>{chatMsg.content}</p>
              </div>
            </li>
          );
        })}
        {isResponseLoading ? (
          <>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#404150",
                }}
              >
                <p>{text}</p>
              </div>
            </li>
            <li
              ref={scrollToLastItem}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "10px",
                // overflow: "auto",
                // flexDirection: 'column-reverse'
              }}
            >
              <img src="/images/mimirlogo.PNG" alt="MimirAI" />
              <div
                className="placeholder-chat"
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "transparent",
                  marginLeft: "10px",
                }}
              >
                <p className="role-title">MimirAI</p>

                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default ChatWindow;

