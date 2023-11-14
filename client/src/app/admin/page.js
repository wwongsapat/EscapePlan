export default function AdminPage() {
  return (
    <div className="bg-blue-500 text-white p-4 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-lg font-semibold mb-2">{`Current Online Players:`}</h2>
      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
        Reset
      </button>
    </div>
  );
}
