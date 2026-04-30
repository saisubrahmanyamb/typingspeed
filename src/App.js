import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const easySentences = [
  "Practice makes perfect.",
  "Python is fun to learn.",
  "Typing is an essential skill.",
  "Code daily to improve.",
  "Focus helps you succeed."
];

const mediumParagraphs = [
  "Typing tests are great for improving your speed and accuracy. With regular practice, you can type faster and more confidently.",
  "Python is a beginner-friendly programming language that is widely used in various fields like web development, data science, and automation.",
  "Good typing skills help you complete tasks faster, reduce fatigue, and allow you to focus more on the content rather than the keyboard.",
  "Technology continues to evolve at an exponential rate, and staying ahead of the curve is essential for those looking to make an impact in their fields. Continuous learning is the key.",
  "Effective communication is an important aspect of any profession. Whether you're sending emails or preparing presentations, strong writing and typing skills can make a huge difference."
];

const hardParagraphs = [
  "The rapid advancement of technology has made it essential for individuals to stay updated with the latest tools and programming languages. Python, in particular, has gained popularity due to its versatility and ease of use.",
  "Artificial intelligence is transforming the way industries operate. From automating repetitive tasks to making data-driven decisions, AI has become an integral part of modern technological solutions. Learning to code in Python gives you a head start in this field.",
  "Consistency, discipline, and curiosity are the three pillars of successful learning. Whether you're improving your typing speed or mastering a new programming concept, small steps taken daily lead to significant results over time.",
  "In the world of software development, clean and efficient code is highly valued. Not only does it ensure better performance, but it also reduces maintenance costs and makes it easier to collaborate with others.",
  "Data analysis has become an essential skill in many industries. With the increasing availability of large datasets, the ability to analyze and derive insights from this data is a critical competitive advantage."
];

function App() {
  const [level, setLevel] = useState(null);
  const [testText, setTestText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  const selectLevel = (selectedLevel) => {
    let text = '';
    if (selectedLevel === 'easy') {
      text = easySentences[Math.floor(Math.random() * easySentences.length)];
    } else if (selectedLevel === 'medium') {
      text = mediumParagraphs[Math.floor(Math.random() * mediumParagraphs.length)];
    } else if (selectedLevel === 'hard') {
      text = hardParagraphs[Math.floor(Math.random() * hardParagraphs.length)];
    }
    setLevel(selectedLevel);
    setTestText(text);
    setTypedText('');
    setFinished(false);
    setResults(null);
  };

  const startTest = () => {
    setStarted(true);
    setStartTime(Date.now());
    setTypedText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setTypedText(input);

    if (input.length === testText.length) {
      finishTest(input);
    }
  };

  const finishTest = (typed) => {
    const endTime = Date.now();
    const elapsedSeconds = (endTime - startTime) / 1000;
    const wordCount = testText.split(' ').length;
    const wpm = Math.round((wordCount / elapsedSeconds) * 60);

    let correctChars = 0;
    for (let i = 0; i < testText.length; i++) {
      if (i < typed.length && testText[i] === typed[i]) {
        correctChars++;
      }
    }
    const accuracy = Math.round((correctChars / testText.length) * 100);

    setFinished(true);
    setResults({
      timeSeconds: elapsedSeconds.toFixed(2),
      wpm,
      accuracy,
      correctChars,
      totalChars: testText.length
    });
  };

  const reset = () => {
    setLevel(null);
    setTestText('');
    setTypedText('');
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setResults(null);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>⌨️ Typing Speed Calculator</h1>

        {!level && (
          <div className="level-selection">
            <h2>Select a Level</h2>
            <div className="level-buttons">
              <button onClick={() => selectLevel('easy')} className="btn btn-easy">
                Easy
              </button>
              <button onClick={() => selectLevel('medium')} className="btn btn-medium">
                Medium
              </button>
              <button onClick={() => selectLevel('hard')} className="btn btn-hard">
                Hard
              </button>
            </div>
          </div>
        )}

        {level && !started && (
          <div className="test-ready">
            <div className="test-text">
              <p>{testText}</p>
            </div>
            <button onClick={startTest} className="btn btn-primary">
              Start Test
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="test-active">
            <div className="test-text">
              <p>
                {testText.split('').map((char, idx) => (
                  <span
                    key={idx}
                    className={
                      idx < typedText.length
                        ? testText[idx] === typedText[idx]
                          ? 'correct'
                          : 'incorrect'
                        : 'pending'
                    }
                  >
                    {char}
                  </span>
                ))}
              </p>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={typedText}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className="input-field"
              autoFocus
            />
            <div className="progress">
              <div className="progress-bar" style={{width: `${(typedText.length / testText.length) * 100}%`}}></div>
            </div>
            <p className="progress-text">{typedText.length} / {testText.length} characters</p>
          </div>
        )}

        {finished && results && (
          <div className="results">
            <h2>Results</h2>
            <div className="results-grid">
              <div className="result-item">
                <span className="label">Time Taken</span>
                <span className="value">{results.timeSeconds}s</span>
              </div>
              <div className="result-item">
                <span className="label">Typing Speed</span>
                <span className="value">{results.wpm} WPM</span>
              </div>
              <div className="result-item">
                <span className="label">Accuracy</span>
                <span className="value">{results.accuracy}%</span>
              </div>
              <div className="result-item">
                <span className="label">Correct Characters</span>
                <span className="value">{results.correctChars}/{results.totalChars}</span>
              </div>
            </div>
            <button onClick={reset} className="btn btn-primary">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
