import CreateClassForm from "../components/CreateClassForm";

export default function CreateClass() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create a Live Class</h2>
      <CreateClassForm />
    </div>
  );
}
