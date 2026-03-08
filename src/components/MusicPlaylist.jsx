import { useState } from 'react';

const PLAYLIST = [
    {
        id: 'LGymNBRdx5s',
        title: 'Tunggu Aku',
        artist: 'Good Morning Everyone',
    },
    {
        id: 'da4Xw2Kr79w',
        title: 'Everything You Are',
        artist: 'Hindia',
    },
    {
        id: '0put0_a--Ng',
        title: 'Make You Feel My Love',
        artist: 'Adele',
    },
];

export default function MusicPlaylist() {
    const [activeSong, setActiveSong] = useState(null);

    return (
        <div className="playlist-container">
            <p className="playlist-label">🎵 Playlist For You</p>

            <div className="playlist-list">
                {PLAYLIST.map((song, i) => (
                    <button
                        key={song.id}
                        className={`playlist-item ${activeSong === i ? 'active' : ''}`}
                        onClick={() => setActiveSong(activeSong === i ? null : i)}
                    >
                        <span className="playlist-number">{String(i + 1).padStart(2, '0')}</span>
                        <div className="playlist-info">
                            <span className="playlist-title">{song.title}</span>
                            <span className="playlist-artist">{song.artist}</span>
                        </div>
                        <span className="playlist-play">
                            {activeSong === i ? '⏸' : '▶'}
                        </span>
                    </button>
                ))}
            </div>

            {activeSong !== null && (
                <div className="playlist-player">
                    <iframe
                        width="100%"
                        height="80"
                        src={`https://www.youtube.com/embed/${PLAYLIST[activeSong].id}?autoplay=1&rel=0`}
                        title={PLAYLIST[activeSong].title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '12px' }}
                    />
                </div>
            )}
        </div>
    );
}
