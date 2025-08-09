// // import CreateClassForm from "../components/CreateClassForm";

// // export default function CreateClass() {
// //   return (
// //     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
// //       <h2 className="text-xl font-semibold mb-4">Create a Live Class</h2>
// //       <CreateClassForm />
// //     </div>
// //   );
// // }


// import CreateClassForm from "../components/CreateClassForm";
// import { CalendarPlus } from "lucide-react";

// export default function CreateClass() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <CalendarPlus className="text-blue-600 w-6 h-6" />
//           <h2 className="text-2xl font-bold text-blue-800">Schedule a New Class</h2>
//         </div>

//         <p className="text-gray-600 mb-6">
//           Fill in the class details below and it will appear in your upcoming schedule.
//         </p>
//         <CreateClassForm />
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClass = {
      id: Date.now(),
      ...formData,
    };

    const stored = JSON.parse(localStorage.getItem("classes")) || [];
    localStorage.setItem("classes", JSON.stringify([...stored, newClass]));

    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Class Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 1hr)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
{/*     <input
          type="url"
          name="link"
          placeholder="Class Link (e.g. Zoom/Meet)"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        /> */}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;



