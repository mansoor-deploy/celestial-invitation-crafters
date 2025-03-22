
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X, Video } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number;
  tip: string;
}

interface WeddingQuizProps {
  className?: string;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  coupleNames: {
    partner1: string;
    partner2: string;
  };
  onVideoPlay?: () => void;
}

const WeddingQuiz: React.FC<WeddingQuizProps> = ({
  className,
  variant = 'eternal',
  coupleNames,
  onVideoPlay,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  // Generate questions based on couple names
  const questions: Question[] = [
    {
      id: 1,
      text: `What is a traditional gift given to the bride during a Muslim wedding?`,
      options: ['Chocolates', 'Mahr (Dowry)', 'Birthday Cake', 'Sports Car'],
      answer: 1,
      tip: 'Mahr is a mandatory gift from the groom to the bride that becomes her exclusive property, symbolizing respect and honor.'
    },
    {
      id: 2,
      text: `Which of the following is NOT part of a traditional Muslim wedding?`,
      options: ['Nikah Ceremony', 'Walima (Reception)', 'Champagne Toast', 'Mehndi (Henna)'],
      answer: 2,
      tip: 'Alcohol is forbidden in Islam, so champagne toasts are not part of traditional Islamic weddings.'
    },
    {
      id: 3,
      text: `What will ${coupleNames.partner1} and ${coupleNames.partner2} recite during their Nikah?`,
      options: ['Wedding Vows', 'Qabool Hai', 'Shakespeare Sonnet', 'Wedding Speech'],
      answer: 1,
      tip: 'Qabool Hai (I accept) is said by both bride and groom to express acceptance of the marriage contract.'
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
    setPlayingVideo(false);
  };

  const playVideo = () => {
    setPlayingVideo(true);
    if (onVideoPlay) {
      onVideoPlay();
    }
  };

  const getContainerStyle = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-gradient-to-br from-white/80 to-white/60 border-eternal-primary/20';
      case 'celestial':
        return 'bg-gradient-to-br from-white/80 to-white/60 border-celestial-primary/20';
      case 'sacred':
        return 'bg-gradient-to-br from-white/80 to-white/60 border-sacred-primary/20';
      case 'radiant':
        return 'bg-gradient-to-br from-white/80 to-white/60 border-radiant-primary/20';
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
        return 'bg-gradient-to-r from-eternal-primary to-eternal-primary/90 text-white hover:bg-eternal-primary/90';
      case 'celestial':
        return 'bg-gradient-to-r from-celestial-primary to-celestial-accent text-white hover:bg-celestial-primary/90';
      case 'sacred':
        return 'bg-gradient-to-r from-sacred-primary to-sacred-secondary text-white hover:bg-sacred-primary/90';
      case 'radiant':
        return 'bg-gradient-to-r from-radiant-primary to-radiant-secondary text-white hover:bg-radiant-primary/90';
      default:
        return 'bg-primary text-white hover:bg-primary/90';
    }
  };

  const getTipStyle = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary/10 border-eternal-primary/20 text-eternal-primary';
      case 'celestial':
        return 'bg-celestial-primary/10 border-celestial-primary/20 text-celestial-accent';
      case 'sacred':
        return 'bg-sacred-primary/10 border-sacred-primary/20 text-sacred-secondary';
      case 'radiant':
        return 'bg-radiant-primary/10 border-radiant-primary/20 text-radiant-primary';
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
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
          
          {selectedOption !== null && (
            <div className={cn(
              'p-4 rounded-md border mt-4 animate-fade-in',
              getTipStyle()
            )}>
              <h5 className="font-medium mb-1">Islamic Marriage Tip:</h5>
              <p>{questions[currentQuestion].tip}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          {!playingVideo ? (
            <>
              <div className="animate-scale-in">
                <h4 className="text-xl font-medium mb-4">Quiz Complete!</h4>
                <p className="text-lg mb-6">Your score: {score}/{questions.length}</p>
                <p className="mb-6">
                  {score === questions.length 
                    ? `Amazing! You're truly ready for ${coupleNames.partner1} and ${coupleNames.partner2}'s wedding!` 
                    : `Thank you for playing! We look forward to seeing you at the wedding!`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={resetQuiz}
                    className={cn(
                      'px-6 py-2 rounded-md transition-all duration-300',
                      getButtonStyle()
                    )}
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={playVideo}
                    className={cn(
                      'px-6 py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2',
                      getButtonStyle()
                    )}
                  >
                    <Video className="w-5 h-5" />
                    Watch Invitation Video
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="animate-scale-in">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl mb-6">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="Wedding Invitation" 
                  className="w-full h-full" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <button 
                onClick={resetQuiz}
                className={cn(
                  'px-6 py-2 rounded-md transition-all duration-300',
                  getButtonStyle()
                )}
              >
                Back to Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeddingQuiz;
