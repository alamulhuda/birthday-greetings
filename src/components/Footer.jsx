import { useEffect, useState } from 'react';

export default function Footer() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className="footer-closing">
            {/* Floating hearts background */}
            <div className="closing-hearts" aria-hidden="true">
                {['💛', '✨', '💛', '🌟', '💛', '✨', '🌸', '💛'].map((emoji, i) => (
                    <span
                        key={i}
                        className="closing-heart-particle"
                        style={{
                            left: `${10 + i * 11}%`,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${4 + (i % 3)}s`,
                            fontSize: `${1 + (i % 3) * 0.5}rem`,
                        }}
                    >
                        {emoji}
                    </span>
                ))}
            </div>

            <div className={`closing-content ${visible ? 'visible' : ''}`}>
                {/* Main heart icon */}
                <div className="closing-icon">
                    <span className="closing-heart-main">💛</span>
                </div>

                {/* Thank you message */}
                <h2 className="closing-title">
                    <span className="gold-text">Thank You</span>
                </h2>

                <div className="closing-divider" />

                <p className="closing-message">
                    Terima kasih sudah menjadi bagian<br />
                    terindah dalam hidupku
                </p>

                <div className="closing-divider" />

                {/* Names */}
                <div className="closing-names">

                    <span className="closing-name-her">Anida</span>
                </div>

                {/* Year badge */}
                <div className="closing-year">
                    <span>✦</span>
                    <span>2026</span>
                    <span>✦</span>
                </div>

                {/* Footer credit */}
                <p className="closing-credit">
                    Made with <span className="closing-credit-heart">him</span> for you
                </p>
            </div>
        </footer>
    );
}
