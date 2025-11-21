'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Story = {
  id: string;
  avatar: string;
  cover: string;
  title: string;
  link: string;
};

const stories: Story[] = [
  {
    id: '1',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'ربات چت ۳۰ هزار تومانی',
    link: '/products/chatbot',
  },
  {
    id: '2',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'گوشی های هوشمند',
    link: '/products/smartphones',
  },
  {
    id: '3',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'لپ تاپ گیمینگ',
    link: '/products/gaming-laptops',
  },
  {
    id: '4',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'ساعت هوشمند',
    link: '/products/smartwatch',
  },
  {
    id: '5',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'لوازم التحریر',
    link: '/products/stationery',
  },
  {
    id: '6',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'استایل جذاب',
    link: '/products/style',
  },
  {
    id: '7',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'دکوری',
    link: '/products/decorative',
  },
  {
    id: '8',
    avatar: '/temp/story-avatar.jpeg',
    cover: '/temp/story-image.jpg',
    title: 'دکوری',
    link: '/products/decorative',
  },
];

const STORY_DURATION = 5000;

export const Story = () => {
  const router = useRouter();
  const [isViewing, setIsViewing] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentStory = stories[currentStoryIndex];
  const isFirstStory = currentStoryIndex === 0;
  const isLastStory = currentStoryIndex === stories.length - 1;

  const clearTimers = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(100, (elapsed / STORY_DURATION) * 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressIntervalRef.current!);
      }
    }, 50);

    intervalRef.current = setTimeout(() => {
      nextStory();
    }, STORY_DURATION);
  };

  const nextStory = () => {
    clearTimers();

    if (isLastStory) {
      closeStory();
    } else {
      const newIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(newIndex);
      setProgress(0);
      swiperRef.current?.slideTo(newIndex);
    }
  };

  const prevStory = () => {
    if (!isFirstStory) {
      clearTimers();
      const newIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(newIndex);
      setProgress(0);
      swiperRef.current?.slideTo(newIndex);
    }
  };

  const openStory = (index: number) => {
    setCurrentStoryIndex(index);
    setIsViewing(true);
    setProgress(0);
    setIsPaused(false);

    setTimeout(() => {
      swiperRef.current?.slideTo(index);
    }, 100);
  };

  const closeStory = () => {
    clearTimers();
    setIsViewing(false);
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentStoryIndex(swiper.activeIndex);
    setProgress(0);
  };

  const handleSeeMore = () => {
    if (currentStory.link) {
      window.location.href = currentStory.link;
    }
  };

  const handleImageClick = () => {
    if (currentStory.link) {
      closeStory();
      router.push(currentStory.link);
    }
  };

  useEffect(() => {
    if (isViewing && !isPaused) {
      startTimer();
    } else {
      clearTimers();
    }

    return clearTimers;
  }, [isViewing, isPaused, currentStoryIndex]);

  useEffect(() => {
    if (isViewing) {
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [currentStoryIndex, isViewing]);

  const renderProgressBar = () => (
    <div className="absolute top-4 left-4 right-4 z-30 flex gap-1 flex-row-reverse">
      {stories.map((_, index) => {
        const rtlIndex = stories.length - 1 - index;
        const width =
          rtlIndex < currentStoryIndex
            ? '100%'
            : rtlIndex === currentStoryIndex
              ? `${progress}%`
              : '0%';

        return (
          <div
            key={index}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            style={{ direction: 'rtl' }}
          >
            <div
              className="h-full bg-white transition-all duration-75"
              style={{
                width,
                transition:
                  rtlIndex === currentStoryIndex ? 'none' : 'width 0.2s ease',
                marginLeft: 'auto',
              }}
            />
          </div>
        );
      })}
    </div>
  );

  const renderCloseButton = () => (
    <div className="absolute top-8 right-4 z-30">
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeStory();
        }}
        className="flex items-center justify-center size-8 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors shadow-lg"
      >
        <X size={20} />
      </button>
    </div>
  );

  const renderNavigationArrows = () => (
    <>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextStory();
          }}
          className={`flex items-center justify-center size-10 rounded-full text-white transition-colors shadow-lg ${
            isLastStory
              ? 'bg-black/20 text-white/40 cursor-not-allowed'
              : 'bg-black/50 hover:bg-black/70'
          }`}
          disabled={isLastStory}
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevStory();
          }}
          className={`flex items-center justify-center size-10 rounded-full text-white transition-colors shadow-lg ${
            isFirstStory
              ? 'bg-black/20 text-white/40 cursor-not-allowed'
              : 'bg-black/50 hover:bg-black/70'
          }`}
          disabled={isFirstStory}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </>
  );

  const renderStorySlide = (story: Story, index: number) => (
    <SwiperSlide key={story.id}>
      <div className="relative w-full h-full bg-transparent pointer-events-none">
        <div
          className="absolute inset-0 cursor-pointer pointer-events-auto z-10"
          onClick={handleImageClick}
        />
        <Image
          src={story.cover}
          alt={story.title}
          fill
          className="object-cover"
          priority={index === currentStoryIndex}
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSeeMore();
            }}
            className="bg-black/50 text-white border border-white/30 rounded-full px-6 py-2 text-sm font-medium hover:bg-black/70 transition-colors"
          >
            مشاهده
          </button>
        </div>
      </div>
    </SwiperSlide>
  );

  return (
    <section className="w-full container">
      <div className="flex gap-6 overflow-x-auto pb-0.5 px-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
        <div className="flex gap-6 mx-auto">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex flex-col items-center gap-2 shrink-0 snap-start"
            >
              <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                  <Image
                    src={story.avatar}
                    alt={story.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-800 text-center max-w-[80px] leading-tight font-medium">
                {story.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isViewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/30"
            style={{
              backdropFilter: 'blur(25px) saturate(180%)',
              WebkitBackdropFilter: 'blur(25px) saturate(180%)',
              background: 'rgba(0, 0, 0, 0.3)',
            }}
            dir="rtl"
            onClick={closeStory}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[min(400px,90vw)] h-full relative pointer-events-auto">
                {renderProgressBar()}
                {renderCloseButton()}
                {renderNavigationArrows()}

                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={handleSlideChange}
                  modules={[Navigation, Pagination, Keyboard]}
                  spaceBetween={0}
                  slidesPerView={1}
                  centeredSlides={true}
                  keyboard={{ enabled: true }}
                  className="h-full w-full"
                  initialSlide={currentStoryIndex}
                  allowTouchMove={false}
                >
                  {stories.map(renderStorySlide)}
                </Swiper>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
