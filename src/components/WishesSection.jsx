const wishes = [
    {
        icon: '🌟',
        title: 'Bahagia Selalu',
        text: 'Semoga hidupmu selalu dipenuhi tawa, senyum, dan kebahagiaan tanpa batas.',
    },
    {
        icon: '💪',
        title: 'Sehat & Kuat',
        text: 'Semoga diberikan kesehatan yang prima untuk menjalani setiap petualangan baru.',
    },
    {
        icon: '🚀',
        title: 'Sukses Besar',
        text: 'Semoga segala cita-cita dan impianmu tercapai satu per satu. Kamu pasti bisa!',
    },
];

export default function WishesSection() {
    return (
        <section className="wishes-section">
            <p className="section-label">✦ Doa & Harapan ✦</p>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>
                Wishes For You
            </h2>
            <div className="wishes-grid">
                {wishes.map((wish, i) => (
                    <div
                        key={i}
                        className="wish-card visible"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        <div className="wish-icon">{wish.icon}</div>
                        <h3 className="wish-title">{wish.title}</h3>
                        <p className="wish-text">{wish.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
