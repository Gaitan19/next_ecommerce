'use client'
 
export default function GlobalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Oops! Something went wrong.</h2>
          <p className="text-gray-600 mb-6">We encountered an error while processing your request.</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md"
            onClick={reset}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
  