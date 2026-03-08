import { useState, useRef, useCallback, useEffect } from 'react';
import HeroSection from './HeroSection';
import BirthdayMessage from './BirthdayMessage';
import WishesSection from './WishesSection';
import Footer from './Footer';
import MusicPlaylist from './MusicPlaylist';
import GiftPage from './GiftPage';
import PhotoAlbum from './PhotoAlbum';
import Confetti from './Confetti';

const SLIDE_LABELS = ['Greeting', 'Playlist', 'Message', 'Wishes', 'Album', 'Gift', 'Close'];

export default function CelebrationPage() {
    const [entered, setEntered] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const touchStartRef = useRef(null);
    const totalSlides = 7;

    const handleEnter = useCallback(() => {
        setEntered(true);
    }, []);

    const goToSlide = useCallback((index) => {
        if (isTransitioning || index === currentSlide) return;
        if (index < 0 || index >= totalSlides) return;
        setIsTransitioning(true);
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 700);
    }, [currentSlide, isTransitioning]);

    const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
    const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [nextSlide, prevSlide]);

    // Mouse wheel navigation
    useEffect(() => {
        let wheelTimeout = null;
        const handleWheel = (e) => {
            if (wheelTimeout) return;
            wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 800);
            if (e.deltaY > 0) nextSlide();
            else if (e.deltaY < 0) prevSlide();
        };
        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [nextSlide, prevSlide]);

    // Touch swipe navigation
    const handleTouchStart = (e) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current) return;
        const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
        const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 50) {
            if (absDy >= absDx) {
                if (dy < 0) nextSlide(); else prevSlide();
            } else {
                if (dx < 0) nextSlide(); else prevSlide();
            }
        }
        touchStartRef.current = null;
    };

    // Gate screen
    if (!entered) {
        return (
            <div className="gate-screen">
                <div className="gate-content">
                    <div className="gate-emoji">🎁</div>
                    <h1 className="gate-title">
                        <span className="gold-text">Selamat!</span>
                    </h1>
                    <p className="gate-subtitle">Ada kejutan spesial untukmu...</p>
                    <button className="gate-button" onClick={handleEnter}>
                        <span>Buka Kejutan</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="slide-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Confetti />

            {/* Slides */}
            <div className="slides-wrapper" style={{ transform: `translateY(-${currentSlide * 100}vh)` }}>
                <div className="slide">
                    <HeroSection />
                </div>
                <div className="slide">
                    <MusicPlaylist />
                </div>
                <div className="slide">
                    <BirthdayMessage />
                </div>
                <div className="slide">
                    <WishesSection />
                </div>
                <div className="slide">
                    <PhotoAlbum />
                </div>
                <div className="slide">
                    <GiftPage />
                </div>
                <div className="slide">
                    <Footer />
                </div>
            </div>

            {/* Navigation Arrows */}
            {currentSlide > 0 && (
                <button className="slide-arrow slide-arrow-up" onClick={prevSlide} aria-label="Previous Slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </button>
            )}
            {currentSlide < totalSlides - 1 && (
                <button className="slide-arrow slide-arrow-down" onClick={nextSlide} aria-label="Next Slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>
            )}

            {/* Dot Navigation */}
            <div className="slide-dots">
                {SLIDE_LABELS.map((label, i) => (
                    <button
                        key={i}
                        className={`slide-dot ${i === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(i)}
                        aria-label={label}
                        title={label}
                    >
                        <span className="slide-dot-inner" />
                    </button>
                ))}
            </div>

            {/* Slide Counter */}
            <div className="slide-counter">
                <span className="slide-counter-current">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="slide-counter-sep">/</span>
                <span className="slide-counter-total">{String(totalSlides).padStart(2, '0')}</span>
            </div>
        </div>
    );
}
