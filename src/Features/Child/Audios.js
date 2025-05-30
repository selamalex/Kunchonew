// File: Audios.js
import './Audios.css';

const audioList = [
  {
    title: "The Jungle Song",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnail: "https://cdn.pixabay.com/photo/2017/01/31/19/14/music-2025546_1280.png"
  },
  {
    title: "Bedtime Story",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumbnail: "https://cdn.pixabay.com/photo/2021/09/14/10/40/story-6623526_1280.jpg"
  },
  {
    title: "Animal Sounds",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumbnail: "https://cdn.pixabay.com/photo/2018/04/25/09/39/bear-3345585_1280.png"
  }
];

const Audios = () => {
  return (
    <div className="audio-page">
      <div className="audio-hero">
        <h1>🎵 Fun Audio Time!</h1>
        <p>Enjoy these cool stories and songs made just for kids!</p>
      </div>
      <div className="audio-grid">
        {audioList.map((audio, index) => (
          <div className="audio-card" key={index}>
            <img src={audio.thumbnail} alt="Thumbnail" className="audio-thumb" />
            <h3>{audio.title}</h3>
            <audio controls>
              <source src={audio.src} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Audios;
