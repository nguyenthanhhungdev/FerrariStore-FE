// src/Notification.jsx
// import './Notification.css';

const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed top-5 right-5 bg-darkBackground text-white p-4 rounded-lg shadow-custom z-50">
      {message}
      <button
        onClick={onClose}
        className="ml-4 bg-none border-none text-white text-lg cursor-pointer"
      >
        &times;
      </button>
      <div className="h-1 bg-green-500 mt-2 transition-width duration-100"></div>
    </div>
  );
};

export default Notification;
