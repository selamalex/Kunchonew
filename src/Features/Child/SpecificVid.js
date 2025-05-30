// File: SpecificVid.js
import { useParams } from 'react-router-dom';
import '../Child/SpacificVid.css';

const videoData = [
  {
    id: '1',
    title: 'Dino Dance Party',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: '2',
    title: 'Magical Storytime',
    src: 'https://www.w3schools.com/html/movie.mp4',
  },
];

const SpecificVid = () => {
  const { videoId } = useParams();
  const video = videoData.find((vid) => vid.id === videoId);

  if (!video) {
    return <p>Video not found 🥲</p>;
  }

  return (
    <div className="specific-vid-page">
      <h2>{video.title}</h2>
      <video controls width="100%">
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SpecificVid;
