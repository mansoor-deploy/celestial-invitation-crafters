
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number;
}

interface WeddingQuizProps {
  className?: string;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  coupleNames: {
    partner1: string;
    partner2: string;
  };
}

const WeddingQuiz: React.FC<WeddingQuizProps> = ({
  className,
  variant = 'eternal',
  coupleNames,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Generate questions based on couple names
  const questions: Question[] = [
    {
      id: 1,
      text: `What is a traditional gift given to the bride during a Muslim wedding?`,
      options: ['Chocolates', 'Mahr (Dowry)', 'Birthday Cake', 'Sports Car'],
      answer: 1,
    },
    {
      id: 2,
      text: `Which of the following is NOT part of a traditional Muslim wedding?`,
      options: ['Nikah Ceremony', 'Walima (Reception)', 'Champagne Toast', 'Mehndi (Henna)'],
      answer: 2,
    },
    {
      id: 3,
      text: `What will ${coupleNames.partner1} and ${coupleNames.partner2} recite during their Nikah?`,
      options: ['Wedding Vows', 'Qabool Hai', 'Shakespeare Sonnet', 'Wedding Speech'],
      answer: 1,
    },
  ];

  const handleAnswerClick = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    const correctAnswer = questions[currentQuestion].answer;
    const correct = optionIndex === correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const getContainerStyle = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-white/70 border-eternal-primary/20';
      case 'celestial':
        return 'bg-white/70 border-celestial-primary/20';
      case 'sacred':
        return 'bg-white/70 border-sacred-primary/20';
      case 'radiant':
        return 'bg-white/70 border-radiant-primary/20';
      default:
        return 'bg-white/70 border-primary/20';
    }
  };

  const getHeadingStyle = () => {
    switch (variant) {
      case 'eternal':
        return 'text-eternal-primary';
      case 'celestial':
        return 'text-celestial-accent';
      case 'sacred':
        return 'text-sacred-secondary';
      case 'radiant':
        return 'text-radiant-primary';
      default:
        return 'text-primary';
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary text-white hover:bg-eternal-primary/90';
      case 'celestial':
        return 'bg-celestial-primary text-white hover:bg-celestial-primary/90';
      case 'sacred':
        return 'bg-sacred-primary text-white hover:bg-sacred-primary/90';
      case 'radiant':
        return 'bg-radiant-primary text-white hover:bg-radiant-primary/90';
      default:
        return 'bg-primary text-white hover:bg-primary/90';
    }
  };

  return (
    <div className={cn(
      'p-6 rounded-lg backdrop-blur-sm border shadow-sm transition-all duration-300',
      getContainerStyle(),
      className
    )}>
      <h3 className={cn(
        'text-xl sm:text-2xl font-medium mb-6 font-cormorant text-center',
        getHeadingStyle()
      )}>
        Wedding Trivia Quiz
      </h3>

      {!showResult ? (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <span className="text-sm font-medium">Question {currentQuestion + 1}/{questions.length}</span>
            <h4 className="text-lg font-medium mt-2">{questions[currentQuestion].text}</h4>
          </div>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedOption !== null}
                className={cn(
                  'w-full text-left p-3 rounded-md transition-all duration-300',
                  selectedOption === null ? 'hover:bg-gray-100' : '',
                  selectedOption === index 
                    ? (isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300') 
                    : 'bg-white/80 border border-gray-200',
                  selectedOption !== null && index === questions[currentQuestion].answer && 'bg-green-100 border border-green-300'
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedOption === index && (
                    isCorrect 
                      ? <Check className="w-5 h-5 text-green-600" /> 
                      : <X className="w-5 h-5 text-red-600" />
                  )}
                  {selectedOption !== null && selectedOption !== index && index === questions[currentQuestion].answer && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h4 className="text-xl font-medium mb-4">Quiz Complete!</h4>
          <p className="text-lg mb-6">Your score: {score}/{questions.length}</p>
          <p className="mb-6">
            {score === questions.length 
              ? `Amazing! You're truly ready for ${coupleNames.partner1} and ${coupleNames.partner2}'s wedding!` 
              : `Thank you for playing! We look forward to seeing you at the wedding!`}
          </p>
          <button 
            onClick={resetQuiz}
            className={cn(
              'px-6 py-2 rounded-md transition-all duration-300',
              getButtonStyle()
            )}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WeddingQuiz;
