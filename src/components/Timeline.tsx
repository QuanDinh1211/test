import { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, HeartIcon } from './effects';

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionWrapper
      id={content.timeline.id}
      className="px-6 py-24"
      bg="linear-gradient(180deg, #fff5f7 0%, #fff0f5 50%, #ffe4ec 100%)"
    >
      <RevealItem className="mb-4 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.timeline.title}
        </h2>
      </RevealItem>
      <RevealItem delay={0.2} className="mb-16 text-center">
        <p className="font-script text-lg text-rose-400 sm:text-xl">
          {content.timeline.subtitle}
        </p>
      </RevealItem>

      <div className="relative mx-auto max-w-4xl">
        {/* Center line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-12">
          {content.timeline.memories.map((memory, i) => {
            const isLeft = i % 2 === 0;
            const isActive = activeIndex === i;

            return (
              <RevealItem key={i} delay={i * 0.1}>
                <div
                  className={`relative flex items-center gap-6 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Dot on timeline */}
                  <motion.div
                    className="absolute left-4 z-10 -translate-x-1/2 sm:left-1/2"
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setActiveIndex(isActive ? null : i)}
                  >
                    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-rose-500 soft-shadow">
                      <HeartIcon className="text-white" size={14} />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className={`ml-12 flex-1 sm:ml-0 ${
                      isLeft ? 'sm:pr-12' : 'sm:pl-12'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveIndex(isActive ? null : i)}
                  >
                    <div
                      className={`glass-card overflow-hidden rounded-2xl soft-shadow transition-all duration-300 ${
                        isActive ? 'glow-rose' : ''
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden sm:h-52">
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />
                        <span className="absolute top-3 right-3 rounded-full bg-white/70 px-3 py-1 font-body text-xs font-semibold text-rose-600 backdrop-blur">
                          {memory.date}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-script text-xl text-rose-600 sm:text-2xl">
                          {memory.title}
                        </h3>
                        <motion.p
                          className="mt-2 font-body text-sm text-rose-500 sm:text-base"
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0.7,
                            height: isActive ? 'auto' : 'auto',
                          }}
                        >
                          {memory.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Spacer for other side */}
                  <div className="hidden flex-1 sm:block" />
                </div>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
