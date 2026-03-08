import { useState } from 'react';

export default function GiftPage() {
    const [opened, setOpened] = useState(false);

    return (
        <section className="gift-page">
            {!opened ? (
                <div className="gift-box-wrapper">
                    <div className="gift-box" onClick={() => setOpened(true)}>
                        {/* Gift box SVG */}
                        <svg className="gift-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Ribbon vertical */}
                            <rect x="52" y="10" width="16" height="100" rx="2" stroke="var(--gold)" strokeWidth="2" className="gift-line" />
                            {/* Ribbon horizontal */}
                            <rect x="10" y="45" width="100" height="16" rx="2" stroke="var(--gold)" strokeWidth="2" className="gift-line" />
                            {/* Box body */}
                            <rect x="10" y="45" width="100" height="65" rx="4" stroke="var(--gold)" strokeWidth="2.5" className="gift-line" />
                            {/* Box lid */}
                            <rect x="5" y="38" width="110" height="18" rx="4" stroke="var(--gold)" strokeWidth="2.5" className="gift-line" />
                            {/* Bow left */}
                            <path d="M60 38 C45 20, 20 25, 35 38" stroke="var(--gold)" strokeWidth="2" className="gift-line" />
                            {/* Bow right */}
                            <path d="M60 38 C75 20, 100 25, 85 38" stroke="var(--gold)" strokeWidth="2" className="gift-line" />
                            {/* Bow center */}
                            <circle cx="60" cy="38" r="5" stroke="var(--gold)" strokeWidth="2" className="gift-line" />
                        </svg>
                    </div>
                    <p className="gift-tap-text">Tap to open your gift</p>
                </div>
            ) : (
                <div className="gift-reveal">
                    {/* Blooming flower SVG animation */}
                    <svg className="bloom-flower" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Center circle */}
                        <circle cx="200" cy="200" r="18" stroke="var(--gold)" strokeWidth="2" className="bloom-center" />
                        <circle cx="200" cy="200" r="8" stroke="var(--gold-light)" strokeWidth="1.5" className="bloom-center-inner" />

                        {/* Petal 1 - top */}
                        <path d="M200 182 C185 150, 175 120, 200 100 C225 120, 215 150, 200 182Z" stroke="var(--gold)" strokeWidth="1.8" className="bloom-petal petal-1" />
                        {/* Petal vein */}
                        <path d="M200 180 L200 108" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-vein vein-1" />

                        {/* Petal 2 - top-right */}
                        <path d="M214 188 C240 165, 265 148, 285 165 C275 190, 248 185, 214 188Z" stroke="var(--gold)" strokeWidth="1.8" className="bloom-petal petal-2" />
                        <path d="M218 188 L275 162" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-vein vein-2" />

                        {/* Petal 3 - bottom-right */}
                        <path d="M210 216 C235 235, 255 260, 245 285 C220 280, 218 255, 210 216Z" stroke="var(--gold)" strokeWidth="1.8" className="bloom-petal petal-3" />
                        <path d="M212 220 L248 275" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-vein vein-3" />

                        {/* Petal 4 - bottom-left */}
                        <path d="M190 216 C165 235, 145 260, 155 285 C180 280, 182 255, 190 216Z" stroke="var(--gold)" strokeWidth="1.8" className="bloom-petal petal-4" />
                        <path d="M188 220 L152 275" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-vein vein-4" />

                        {/* Petal 5 - top-left */}
                        <path d="M186 188 C160 165, 135 148, 115 165 C125 190, 152 185, 186 188Z" stroke="var(--gold)" strokeWidth="1.8" className="bloom-petal petal-5" />
                        <path d="M182 188 L125 162" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-vein vein-5" />

                        {/* Stem */}
                        <path d="M200 218 C200 260, 195 300, 200 360" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" className="bloom-stem" />

                        {/* Left leaf */}
                        <path d="M198 290 C170 275, 145 278, 140 290 C155 300, 175 295, 198 290Z" stroke="var(--gold)" strokeWidth="1.5" className="bloom-leaf leaf-left" />
                        <path d="M195 290 L148 287" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-leaf-vein vein-left" />

                        {/* Right leaf */}
                        <path d="M202 310 C230 295, 255 298, 260 310 C245 320, 225 315, 202 310Z" stroke="var(--gold)" strokeWidth="1.5" className="bloom-leaf leaf-right" />
                        <path d="M205 310 L252 307" stroke="var(--gold-dim)" strokeWidth="0.8" className="bloom-leaf-vein vein-right" />

                        {/* Small buds / dots around the flower */}
                        <circle cx="165" cy="130" r="3" stroke="var(--gold-light)" strokeWidth="1" className="bloom-sparkle s1" />
                        <circle cx="240" cy="125" r="2.5" stroke="var(--gold-light)" strokeWidth="1" className="bloom-sparkle s2" />
                        <circle cx="280" cy="210" r="2" stroke="var(--gold-light)" strokeWidth="1" className="bloom-sparkle s3" />
                        <circle cx="120" cy="215" r="2.5" stroke="var(--gold-light)" strokeWidth="1" className="bloom-sparkle s4" />
                        <circle cx="250" cy="290" r="2" stroke="var(--gold-light)" strokeWidth="1" className="bloom-sparkle s5" />
                        <circle cx="150" cy="300" r="3" stroke="var(--gold-light)" strokeWidth="1" className="bloom-sparkle s6" />
                    </svg>

                    <div className="gift-message-reveal">
                        <p className="gift-label">A flower that never wilts,</p>
                        <h2 className="gift-heading">
                            <span className="gold-text">For You, Anida</span>
                        </h2>
                        <p className="gift-note">
                            Keindahan tak perlu penjelasan, cukup seperti bunga.<br />
                            Mekar tanpa suara tapi bermakna 🌹
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
