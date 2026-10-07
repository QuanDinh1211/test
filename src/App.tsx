import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { LoadingScreen } from '@/components/LoadingScreen';
import { IntroScreen } from '@/components/IntroScreen';
import { Hero } from '@/components/Hero';
import { Countdown } from '@/components/Countdown';
import { LoveLetter } from '@/components/LoveLetter';
import { Timeline } from '@/components/Timeline';
import { PhotoGallery } from '@/components/PhotoGallery';
import { MiniGame } from '@/components/MiniGame';
import { SurpriseButton } from '@/components/SurpriseButton';
import { WishSection } from '@/components/WishSection';
import { InteractiveHeart } from '@/components/InteractiveHeart';
import { SecretMessage, HiddenHeart } from '@/components/SecretMessage';
import { FinalSection } from '@/components/FinalSection';
import { MusicPlayer } from '@/components/MusicPlayer';
import { FloatingHearts, Confetti } from '@/components/effects';

type Stage = 'loading' | 'intro' | 'main';

function App() {
  const [stage, setStage] = useState<Stage>('loading');
  const [finalSurprise, setFinalSurprise] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(0);

  // Check if we should skip loading (on revisit)
  useEffect(() => {
    const visited = sessionStorage.getItem('visited');
    if (visited) {
      setStage('main');
    }
  }, []);

  const handleLoadingComplete = () => {
    setStage('intro');
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem('visited', 'true');
    setStage('main');
  };

  const handleEasterEgg = () => {
    setEasterEggCount((c) => {
      const next = c + 1;
      if (next >= 3) {
        setFinalSurprise(true);
        setTimeout(() => setFinalSurprise(false), 5000);
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-romantic-gradient">
      {/* Loading screen */}
      <AnimatePresence>
        {stage === 'loading' && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Intro screen */}
      <AnimatePresence>
        {stage === 'intro' && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main content */}
      {stage === 'main' && (
        <main className="relative">
          <FloatingHearts count={6} />
          <Hero />
          <Countdown />
          <LoveLetter />
          {/* <Timeline /> */}
          {/* <PhotoGallery /> */}
          <MiniGame />
          <SurpriseButton />
          <WishSection />
          <InteractiveHeart />
          <SecretMessage onEasterEggFound={handleEasterEgg} />
          <FinalSection />
          <MusicPlayer />
          <HiddenHeart onFound={handleEasterEgg} />
        </main>
      )}

      {/* Final easter egg surprise */}
      <Confetti active={finalSurprise} count={200} />
      {finalSurprise && (
        <div className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center">
          <div className="animate-floatUp text-6xl">💗</div>
        </div>
      )}
    </div>
  );
}

export default App;
