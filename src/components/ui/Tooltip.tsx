import { useState, useRef, useEffect } from 'react';
import theoryData from '../../data/theoryData.json';

export type TheoryTopic = keyof typeof theoryData;

interface TooltipProps {
  topic: TheoryTopic;
  children: React.ReactNode;
}

export function Tooltip({ topic, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const data = theoryData[topic];

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 150); // slight delay for better UX
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (!data) return <>{children}</>;

  return (
    <div 
      className="relative inline-flex items-center cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-stone-900 dark:bg-stone-800 text-stone-100 rounded-xl shadow-xl animate-fade-in-up border border-stone-700 pointer-events-none">
          <div className="font-semibold text-xs mb-1 text-blue-300">{data.title}</div>
          <div className="text-[10px] leading-relaxed opacity-90">{data.content}</div>
          
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-stone-900 dark:border-t-stone-800"></div>
        </div>
      )}
    </div>
  );
}
