import React, { useState, useEffect } from "react";
import "./UnreadMessages.css";
import "../index.css"

const UnreadMessages: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const randomCount = Math.floor(Math.random() * 10) + 1;
    setCount(randomCount);
  }, []);

  const formatMessage = (num: number) => {
    if (num === 1) return `У вас ${num} непрочитанное сообщение`;
    if (num >= 2 && num <= 4) return `У вас ${num} непрочитанных сообщения`;
    return `У вас ${num} непрочитанных сообщений`;
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
      <div className="message-container">
        <p className="message-text">{formatMessage(count)} <span className="message-date">({formatDate()})</span></p>
      </div>
  );
};

export default UnreadMessages;
