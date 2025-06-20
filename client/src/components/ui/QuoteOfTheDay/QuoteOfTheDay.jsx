import React from 'react';

const quotes = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "If you are working on something exciting, it will keep you motivated. – Elon Musk",
    "Success is not in what you have, but who you are. – Bo Bennett",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "Great things never come from comfort zones.",
    "Push yourself, because no one else is going to do it for you."
];

const QuoteOfTheDay = () => {
    const todayIndex = new Date().getDate() % quotes.length;
    const todayQuote = quotes[todayIndex];

    return (
        <>
            <style>{`
        @keyframes fadeInMove {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatUpDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}
            </style>
            <div style={{
          backgroundColor: '#1b6cdd',
                padding: '2.5rem 2rem',
                borderRadius: '12px',
                fontStyle: 'italic',
                color: 'white',
                maxWidth: '420px',
                margin: '2.5rem auto',
                textAlign: 'center',
                boxShadow: '4px 4px 4px 4px rgba(62, 143, 236, 0.45)',
                animation: 'fadeInMove 1.2s ease forwards',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <h2 style={{color:"white"}}>Quote of Today: </h2>
          <p style={{
                    fontSize: '1.15rem',
                    animation: 'floatUpDown 4s ease-in-out infinite',
                    margin: 0,
                }}>
                    💡 {todayQuote}
                </p>
            </div>
        </>
    );
};

export default QuoteOfTheDay;
