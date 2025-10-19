import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiSend, FiX } from 'react-icons/fi'
import { SiGooglegemini } from 'react-icons/si'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI with API key from .env (Vite)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Gemini API Function using Official SDK
const generateGeminiResponse = async (prompt, conversationHistory = []) => {
  try {
    // Get the generative model with optimized settings
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',  // Changed from gemini-2.5-flash
      generationConfig: {
        maxOutputTokens: 1000,  // Increased for complete responses
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    // Start a chat session with history (removed duplicate generationConfig)
    const chat = model.startChat({
      history: conversationHistory,
    });

    // Send message and get response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      response: text
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to get response from Gemini'
    };
  }
};

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showGeminiChat, setShowGeminiChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleGeminiClick = () => {
    setShowGeminiChat(true)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputMessage.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Convert message history to Gemini SDK format
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    const result = await generateGeminiResponse(inputMessage.trim(), conversationHistory)

    if (result.success) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.response
      }])
    } else {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${result.error}`
      }])
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4"
          >
            {/* Gemini Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGeminiClick}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '16px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}
              title="Open Gemini AI Assistant"
            >
              <SiGooglegemini size={20} />
            </motion.button>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '16px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}
              title="Back to Top"
            >
              <FiArrowUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gemini Chat Window */}
      <AnimatePresence>
        {showGeminiChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '16px'
            }}
            onClick={() => setShowGeminiChat(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#18181b',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '672px',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #3f3f46',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderBottom: '1px solid #3f3f46'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    <SiGooglegemini size={24} color="white" />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Gemini AI</h3>
                    <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Your Learning Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGeminiChat(false)}
                  style={{
                    color: '#9ca3af',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px'
                  }}
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {messages.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '40px' }}>
                    <SiGooglegemini size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                    <p style={{ fontSize: '18px', margin: '0 0 8px 0' }}>How can I help you learn today?</p>
                    <p style={{ fontSize: '14px', margin: 0 }}>Ask me anything about your studies!</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        borderRadius: '16px',
                        padding: '12px 16px',
                        background: message.role === 'user' 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : '#27272a',
                        color: message.role === 'user' ? 'white' : '#e5e7eb'
                      }}
                    >
                      <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      background: '#27272a',
                      borderRadius: '16px',
                      padding: '12px 16px'
                    }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                        <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%', animation: 'bounce 1s infinite 0.1s' }}></div>
                        <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{
                padding: '16px',
                borderTop: '1px solid #3f3f46'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      background: '#27272a',
                      border: '1px solid #3f3f46',
                      borderRadius: '12px',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1
                    }}
                  >
                    <FiSend size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingButton