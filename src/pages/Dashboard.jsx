import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("classes")) || [];
    setClasses(data);
  }, []);

  const handleDelete = (id) => {
    const updated = classes.filter((c) => c.id !== id);
    setClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));
    toast.success("Class deleted");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCopyLink = (roomId) => {
    const fullLink = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(fullLink);
    toast.success("Invitation link copied to clipboard!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Scheduled Classes</h2>

      {classes.length === 0 && <p>No classes found.</p>}
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{cls.title}</h3>
            <p>Date: {new Date(cls.date).toLocaleString()}</p>

            {cls.roomId && (
              <>
                <p>
                  Join Link:{" "}
                  <Link
                    to={`/join/${cls.roomId}`}
                    className="text-blue-600 underline"
                  >
                    /join/{cls.roomId}
                  </Link>
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <WhatsappShareButton
                    url={`${window.location.origin}/join/${cls.roomId}`}
                    title={`Join this class: ${cls.title}`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>

                  <EmailShareButton
                    url={`${window.location.origin}/join/${cls.roomId}`}
                    subject="Class Invitation"
                    body={`Join this class: ${cls.title}`}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>

                  <FacebookShareButton
                    url={`${window.location.origin}/join/${cls.roomId}`}
                    quote={`Join this class: ${cls.title}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <button
                    onClick={() => handleCopyLink(cls.roomId)}
                    className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Copy Link
                  </button>
                </div>
              </>
            )}

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(cls.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cls.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Toast Message Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Dashboard;
