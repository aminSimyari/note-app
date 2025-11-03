// app/loading.tsx

// Displays a simple loading message while the Server Component (app/page.tsx) is fetching data.
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-lg font-semibold text-indigo-600">
        Loading Notes...
      </div>
    </div>
  );
}
