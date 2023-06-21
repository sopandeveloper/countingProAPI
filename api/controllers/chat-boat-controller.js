 
 const chatbotResponses = [
    { question: 'hello', response: 'Hello! How can I assist you?' },
    { question: 'help', response: 'Sure, I can help. What do you need assistance with?' },
    { question: 'bye', response: 'Goodbye! Have a nice day!' },
    { question: 'fallback', response: "I'm sorry, I didn't understand that. Can you please rephrase your message?" },
  ];

module.exports = {

    
    chatFn: async (req, res, next) => {
        const message = req.body.message;
        let response = '';
        const matchedQuestion = chatbotResponses.find(
            (item) => message.toLowerCase().includes(item.question)
          );
          if (matchedQuestion) {
            response = matchedQuestion.response;
          } else {
            response = chatbotResponses.find((item) => item.question === 'fallback').response;
          }
           res.json({ response });
    },

     
}