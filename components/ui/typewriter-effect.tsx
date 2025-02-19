"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Word {
  text: string;
  className?: string;
}

interface TypewriterProps {
  words: Word[];
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: TypewriterProps) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  const animateText = useCallback(() => {
    animate(
      "span",
      {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      },
      {
        duration: 0.3,
        delay: stagger(0.1),
        ease: "easeInOut",
      }
    );
  }, [animate]);

  useEffect(() => {
    if (isInView) {
      animateText();
    }
  }, [isInView, animateText]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-white opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-2xl md:text-3xl lg:text-2xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-8 sm:h-9 md:h-10 lg:h-10 bg-primary",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: TypewriterProps) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-white `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-primary",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterBackspace: React.FC<TypewriterProps> = ({
  words,
  className,
  cursorClassName,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Initial delay of 2 seconds before starting
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, 2000);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setCurrentText(currentText.slice(0, -1));
        }
      } else {
        const currentWord = words[currentWordIndex];
        if (currentText === currentWord.text) {
          // Pause at the end of typing for 1.5 seconds
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        } else {
          setCurrentText(currentWord.text.slice(0, currentText.length + 1));
        }
      }
    }, isDeleting ? 100 : 150); // Slower typing speed (was 40/80, now 100/150)

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, words, isStarted]);

  return (
    <div className={cn("flex space-x-1 my-8", className)}>
      <div className="overflow-hidden pb-2">
        <div
          className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold"
          
        >
          <span className="dark:text-primary text-white">
            Igniting Ideas, Inspiring Change.
          </span>&nbsp;
          <span 
            className={cn(
              "dark:text-primary text-primary",
              words[currentWordIndex].className
            )}
          >
            {currentText}
          </span>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-6 sm:h-6 md:h-8 lg:h-10 bg-primary",
          cursorClassName
        )}
      />
    </div>
  );
};
