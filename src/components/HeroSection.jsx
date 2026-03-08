import { useRef } from 'react';

export default function HeroSection() {
    const dashboardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!dashboardRef.current) return;
        const rect = dashboardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dashboardRef.current.style.setProperty('--mouse-x', `${x}px`);
        dashboardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className="hero" id="hero">
            <div
                className="hero-dashboard"
                ref={dashboardRef}
                onMouseMove={handleMouseMove}
            >
                <p className="hero-subtitle">A Special Day Is Coming</p>
                <h1 className="hero-name">
                    {'Wuwuh Anida Arifah'.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`name-letter ${char === ' ' ? 'name-space' : ''}`}
                            style={{ animationDelay: `${0.8 + i * 0.05}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                <div className="hero-divider" />
                <div className="hero-date-row">
                    <span className="hero-date-segment">09</span>
                    <span className="hero-date-dot">✦</span>
                    <span className="hero-date-segment">03</span>
                    <span className="hero-date-dot">✦</span>
                    <span className="hero-date-segment">2026</span>
                </div>
                <div className="hero-age-badge">
                    <span className="hero-age-number">26</span>
                    <span className="hero-age-suffix">th</span>
                </div>
            </div>
        </section>
    );
}
