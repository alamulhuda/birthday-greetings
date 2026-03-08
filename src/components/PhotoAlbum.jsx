import { useState, useCallback, useEffect, useRef } from 'react';

// Album photos — update paths to match your files in public/album/
const ALBUM_ITEMS = [
    { src: '/album/photo1.JPG', caption: 'Momen berharga ✨' },
    { src: '/album/photo2.JPG', caption: 'Memories together 💛' },
    { src: '/album/photo3.JPG', caption: 'Senyummu yang terindah 🌸' },
    { src: '/album/photo4.JPG', caption: 'Always beautiful 🌟' },
    { src: '/album/photo5.JPG', caption: 'Favorite moments 💕' },
    { src: '/album/photo6.JPG', caption: 'Kenangan indah 💫' },
    { src: '/album/photo7.JPG', caption: 'Together forever 💖' },
    { src: '/album/photo8.JPG', caption: 'Cerita kita 🌹' },
    { src: '/album/photo9.JPG', caption: 'Moment spesial 🎂' },
    { src: '/album/photo10.JPG', caption: 'Senyum terindah 😊' },
    { src: '/album/photo11.JPG', caption: 'My happiness 🥰' },
    { src: '/album/photo12.JPG', caption: 'Best memories 💛' },
    { src: '/album/photo13.JPG', caption: 'beauty 💛' },
    { src: '/album/photo14.JPG', caption: 'beauty 💛' },
];

// Build pages: cover + photo pages (2 photos per spread) + back cover
function buildPages(items) {
    const pages = [];
    // Cover page
    pages.push({ type: 'cover' });
    // Photo pages — one photo per page (left and right of each spread)
    for (let i = 0; i < items.length; i++) {
        pages.push({ type: 'photo', item: items[i], index: i });
    }
    // Back cover
    pages.push({ type: 'back' });
    return pages;
}

const PAGES = buildPages(ALBUM_ITEMS);
// Total "flippable" leaves = Math.ceil(pages / 2)
const totalLeaves = Math.ceil(PAGES.length / 2);

export default function PhotoAlbum() {
    const [currentLeaf, setCurrentLeaf] = useState(0);
    const [flippedLeaves, setFlippedLeaves] = useState(new Set());
    const [isFlipping, setIsFlipping] = useState(false);
    const [flippingLeaf, setFlippingLeaf] = useState(null); // track which leaf is mid-flip
    const touchStartRef = useRef(null);

    const flipNext = useCallback((e) => {
        if (e) e.stopPropagation();
        if (isFlipping || currentLeaf >= totalLeaves) return;
        setIsFlipping(true);
        setFlippingLeaf(currentLeaf);
        setFlippedLeaves((prev) => new Set([...prev, currentLeaf]));
        setCurrentLeaf((prev) => prev + 1);
        setTimeout(() => {
            setIsFlipping(false);
            setFlippingLeaf(null);
        }, 1000);
    }, [currentLeaf, isFlipping]);

    const flipPrev = useCallback((e) => {
        if (e) e.stopPropagation();
        if (isFlipping || currentLeaf <= 0) return;
        setIsFlipping(true);
        const prevLeaf = currentLeaf - 1;
        setFlippingLeaf(prevLeaf);
        setFlippedLeaves((prev) => {
            const next = new Set(prev);
            next.delete(prevLeaf);
            return next;
        });
        setCurrentLeaf(prevLeaf);
        setTimeout(() => {
            setIsFlipping(false);
            setFlippingLeaf(null);
        }, 1000);
    }, [currentLeaf, isFlipping]);

    // Touch swipe
    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
        if (touchStartRef.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartRef.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0) flipNext();
            else flipPrev();
        }
        touchStartRef.current = null;
    };

    // Keyboard (only when not conflicting with slide nav)
    useEffect(() => {
        const handleKey = (e) => {
            // Avoid hijacking slide navigation — ignore if not focused on book
        };
        return () => { };
    }, [flipNext, flipPrev]);

    // Build leaf data: each leaf has a front page and a back page
    const leaves = [];
    for (let i = 0; i < totalLeaves; i++) {
        const frontIdx = i * 2;
        const backIdx = i * 2 + 1;
        leaves.push({
            front: PAGES[frontIdx] || null,
            back: PAGES[backIdx] || null,
        });
    }

    // Calculate z-index: flipping leaf always on top, otherwise stack order
    const getLeafZIndex = (i) => {
        if (flippingLeaf === i) return totalLeaves + 1;
        if (flippedLeaves.has(i)) return i;
        return totalLeaves - i;
    };

    return (
        <section className="album-section">
            <p className="section-label">✦ OUR MEMORIES ✦</p>
            <h2 className="section-title">
                <span className="gold-text">Photo Library</span>
            </h2>

            <div
                className="book-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="book">
                    {leaves.map((leaf, i) => (
                        <div
                            key={i}
                            className={`book-leaf ${flippedLeaves.has(i) ? 'flipped' : ''} ${flippingLeaf === i ? 'flipping' : ''}`}
                            style={{ zIndex: getLeafZIndex(i) }}
                        >
                            {/* Front of the leaf (right page before flip) */}
                            <div className="book-page book-page-front">
                                <PageContent page={leaf.front} />
                            </div>
                            {/* Back of the leaf (left page after flip) */}
                            <div className="book-page book-page-back">
                                <PageContent page={leaf.back} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="book-nav">
                <button
                    className="book-nav-btn"
                    onClick={flipPrev}
                    disabled={currentLeaf <= 0}
                    aria-label="Previous page"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Prev</span>
                </button>
                <span className="book-page-indicator">
                    {Math.min(currentLeaf * 2 + 1, PAGES.length)} / {PAGES.length}
                </span>
                <button
                    className="book-nav-btn"
                    onClick={flipNext}
                    disabled={currentLeaf >= totalLeaves}
                    aria-label="Next page"
                >
                    <span>Next</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

function PageContent({ page }) {
    if (!page) return <div className="book-page-empty" />;

    if (page.type === 'cover') {
        return (
            <div className="book-page-cover">
                <div className="book-cover-ornament top-left" />
                <div className="book-cover-ornament top-right" />
                <div className="book-cover-ornament bottom-left" />
                <div className="book-cover-ornament bottom-right" />
                <div className="book-cover-content">
                    <p className="book-cover-label">✦ Our Memories ✦</p>
                    <h3 className="book-cover-title">Photo<br />Library</h3>
                    <div className="book-cover-divider" />
                    <p className="book-cover-year">2026</p>
                </div>
            </div>
        );
    }

    if (page.type === 'back') {
        return (
            <div className="book-page-cover book-page-back-cover">
                <div className="book-cover-ornament top-left" />
                <div className="book-cover-ornament top-right" />
                <div className="book-cover-ornament bottom-left" />
                <div className="book-cover-ornament bottom-right" />
                <div className="book-cover-content">
                    <p className="book-cover-label">💛</p>
                    <p className="book-back-text">Setiap foto adalah cerita,<br />setiap momen adalah kenangan</p>
                </div>
            </div>
        );
    }

    return (
        <div className="book-page-photo">
            <div className="book-photo-frame">
                <img src={page.item.src} alt={page.item.caption} loading="lazy" />
            </div>
            <p className="book-photo-caption">{page.item.caption}</p>
            <span className="book-photo-number">{page.index + 1}</span>
        </div>
    );
}
