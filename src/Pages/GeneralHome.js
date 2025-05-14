import { useNavigate } from 'react-router-dom';

const GeneralHome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Kuncho 👶</h1>
      <p className="mb-6 text-lg">A playful space for kids, parents, and admins!</p>
      <button
        onClick={() => navigate('/login')}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
};

export default GeneralHome;
