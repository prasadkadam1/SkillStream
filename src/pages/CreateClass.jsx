// import CreateClassForm from "../components/CreateClassForm";

// export default function CreateClass() {
//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Create a Live Class</h2>
//       <CreateClassForm />
//     </div>
//   );
// }


import CreateClassForm from "../components/CreateClassForm";
import { CalendarPlus } from "lucide-react";

export default function CreateClass() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <CalendarPlus className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-blue-800">Schedule a New Class</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Fill in the class details below and it will appear in your upcoming schedule.
        </p>
        <CreateClassForm />
      </div>
    </div>
  );
}
