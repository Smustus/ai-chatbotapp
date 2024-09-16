'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const scrollDown = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const node = scrollDown.current;
    if(node){
      node.scrollTop = node.scrollHeight;
    }
  });

  const formatString = (string: string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1)
  }
  
  return (
    <main className="flex flex-col w-full max-w-md h-fit py-12 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg">
      <h2 className='text-center'>
        AI-chatbot
      </h2>
      <ul ref={scrollDown} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <>
          {m.role === 'user' ? (
            <li
              key={m.id}
              className={`whitespace-pre-wrap p-3 rounded-lg ${
                'bg-blue-500 text-white self-end'
                }`}>
              <span className="font-semibold">
                {`${formatString(m.role)}: `}
              </span>
              {m.content}
            </li>
          ) : (
            <li
            key={m.id}
            className={`whitespace-pre-wrap p-3 rounded-lg ${
                'bg-gray-200 text-gray-900 self-start'
              }`}>
            <span className="font-semibold">
              {`${formatString(m.role)}: `}
            </span>
            {m.content}
          </li>
          )
          }
          </>
          ))}
        </ul>

      <form onSubmit={handleSubmit} className="sticky bottom-0 flex p-4 bg-white shadow-inner">
        <input
          className="flex-1 p-3 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Ask something..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </main>
  );
}