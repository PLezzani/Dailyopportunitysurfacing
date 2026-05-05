import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/AskAnything/svg-23s735pzkf';

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-[#0ba5ec] px-[23.633px] py-[14.18px] rounded-bl-[28.36px] rounded-br-[28.36px] rounded-tr-[28.36px] w-fit drop-shadow-[0px_0px_0.591px_rgba(0,0,0,0.24),0px_2.363px_2.363px_rgba(0,0,0,0.16),0px_-1.182px_0.591px_rgba(0,0,0,0.08)]"
    >
      <div className="flex gap-[6px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-[8px] h-[8px] bg-white/60 rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function TypedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <>{displayedText}</>;
}

function PromptSuggestions({ stage }: { stage: number }) {
  const prompts = [
    "How is my brand performing this week?",
    "Show me VIP players with high churn risk",
    "What are the top deposit triggers?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-[8px] w-full"
    >
      {prompts.map((prompt, index) => (
        <motion.button
          key={index}
          animate={
            index === 0 && stage === 1
              ? {
                  scale: [1, 0.97, 1],
                  borderColor: ["#eaecf0", "#0ba5ec", "#0ba5ec"],
                  backgroundColor: ["#ffffff", "#f0f9ff", "#f0f9ff"],
                }
              : {}
          }
          transition={
            index === 0 && stage === 1
              ? { duration: 0.4, delay: 1.2 }
              : {}
          }
          className="bg-white border border-[#eaecf0] rounded-[8px] px-[14px] py-[10px] text-left shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
        >
          <p className="font-['Inter:Regular',sans-serif] text-[13px] leading-[18px] text-[#344054]">
            {prompt}
          </p>
        </motion.button>
      ))}
    </motion.div>
  );
}

export default function App() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timings = [
      1500,  // Stage 1: AI greeting with prompt suggestions
      2000,  // Stage 2: Simulate click - user message appears
      1500,  // Stage 3: AI typing indicator
      3500,  // Stage 4: AI first response
      2000,  // Stage 5: AI detailed response with widget
    ];

    const timeout = setTimeout(() => {
      if (stage < 5) {
        setStage(stage + 1);
      } else {
        // Loop back to start
        setTimeout(() => setStage(0), 3000);
      }
    }, timings[stage] || 1000);

    return () => clearTimeout(timeout);
  }, [stage]);

  return (
    <div className="size-full bg-gradient-to-b from-white to-[#f3f5f7] flex items-center justify-center p-[32px]">
      <div className="w-[500px] h-[500px] flex flex-col gap-[16px] bg-gradient-to-t from-[#F3F5F7] to-[#FFFFFF] p-[24px] shadow-lg justify-start">

        {/* AI Initial Greeting with Prompt Suggestions */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-[12px] w-full"
            >
              <div className="flex justify-start">
                <div className="bg-[#0ba5ec] px-[23.633px] py-[14.18px] rounded-bl-[28.36px] rounded-br-[28.36px] rounded-tr-[28.36px] max-w-[85%] drop-shadow-[0px_0px_0.591px_rgba(0,0,0,0.24),0px_2.363px_2.363px_rgba(0,0,0,0.16),0px_-1.182px_0.591px_rgba(0,0,0,0.08)]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24.626px] text-[18.47px] text-white">
                    <TypedText
                      text="What would you like to know?"
                    />
                  </p>
                </div>
              </div>
              {stage < 2 && <PromptSuggestions stage={stage} />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Response - Clicked Prompt */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex justify-end w-full"
            >
              <div className="bg-[#07388a] drop-shadow-[0px_0px_0.587px_rgba(0,0,0,0.24),0px_2.348px_2.348px_rgba(0,0,0,0.16),0px_-1.174px_0.587px_rgba(0,0,0,0.08)] px-[23.483px] py-[14.09px] rounded-bl-[28.18px] rounded-br-[28.18px] rounded-tl-[28.18px] max-w-[85%]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24.626px] text-[18.47px] text-right text-white">
                  How is my brand performing this week?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Typing Indicator */}
        <AnimatePresence>
          {stage === 3 && (
            <div className="flex justify-start w-full">
              <TypingIndicator />
            </div>
          )}
        </AnimatePresence>

        {/* AI Response */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start w-full"
            >
              <div className="bg-[#0ba5ec] px-[23.633px] py-[14.18px] rounded-bl-[28.36px] rounded-br-[28.36px] rounded-tr-[28.36px] max-w-[85%] drop-shadow-[0px_0px_0.591px_rgba(0,0,0,0.24),0px_2.363px_2.363px_rgba(0,0,0,0.16),0px_-1.182px_0.591px_0.591px_rgba(0,0,0,0.08)]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24.626px] text-[18.47px] text-white">
                  <TypedText
                    text="Sure, here's the key insights on player activity over the last week"
                  />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Detailed Response */}
        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-start w-full"
            >
              <div className="bg-white rounded-[12px] p-[18px] w-full shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col gap-[12px]">
                  {/* Widget */}
                  <div className="bg-white drop-shadow-[0px_0.386px_0.386px_rgba(16,24,40,0.05)] flex gap-[12px] p-[12px] rounded-[8px] border border-[#eaecf0]">
                    <div className="flex flex-col gap-[6.175px] flex-1">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#101828]">
                        Active Players This Week
                      </p>
                      <div className="flex gap-[6px] items-end">
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[24px] text-[#101828] tracking-[-0.5px]">
                          12.4K
                        </p>
                        <div className="bg-[#ecfdf3] flex gap-[4px] items-center px-[6px] py-[2px] rounded-full border border-[#12b76a]/20">
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#12b76a]">
                            ↑ 23%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[120px] h-[60px] relative">
                      <svg className="w-full h-full" viewBox="0 0 120 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#12b76a" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#12b76a" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 45 L 20 42 L 40 38 L 60 32 L 80 22 L 100 15 L 120 8 L 120 60 L 0 60 Z"
                          fill="url(#growthGradient)"
                        />
                        <path
                          d="M 0 45 L 20 42 L 40 38 L 60 32 L 80 22 L 100 15 L 120 8"
                          stroke="#12b76a"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="font-['Inter:Regular',sans-serif] text-[13px] leading-[20px] text-[#101828]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-[8px]">
                      Strong Weekly Growth
                    </p>
                    <p className="text-[12px]">
                      Your brand saw a 23% increase in active players compared to last week, with peak engagement on weekend sessions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up Question */}
        <AnimatePresence>
          {stage >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start w-full"
            >
              <div className="flex flex-col gap-[8px] max-w-[90%] hidden">
                <div className="bg-white rounded-[12px] px-[18px] py-[14px] shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
                  <p className="font-['Inter:Regular',sans-serif] text-[14px] leading-[20px] text-[#101828]">
                    <TypedText text="Do you want me to create an audience to target these players?" />
                  </p>
                </div>
                <ActionButtons />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
