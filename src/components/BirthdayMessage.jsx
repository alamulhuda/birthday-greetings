import MusicPlaylist from './MusicPlaylist';

export default function BirthdayMessage() {
    return (
        <section className="message-section">
            <div className="message-content-wrapper">
                <div className="message-text-side">
                    <div className="message-icon visible">🎂</div>
                    <h2 className="message-heading visible">
                        <span className="gold-text">Happy Birthday,</span>
                        <br />
                        Anida!
                    </h2>
                    <p className="message-body visible">
                        "HBD ya ! Semoga semua wish kamu tercapai tahun ini. You deserve to be happy, seriusan.
                        dan terimakasih udah jadi orang yang spesial bagiku selama ini.
                        nggak banyak kata kata, yang penting sehat, sehat, senang terus,bahagia terus. dan ya sekali lagi Happy birthday!"! 💛
                    </p>
                    <p className="message-signature visible">
                        — From, Him ♥
                    </p>
                </div>
                {/* <div className="message-music-side">
                    <MusicPlaylist />
                </div> */}
            </div>
        </section>
    );
}
