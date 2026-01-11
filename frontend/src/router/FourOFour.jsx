import { Link } from "react-router-dom";

const FourOFour = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6">
      <div className="max-w-md text-center">
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold text-slate-800 tracking-tight">
          404
        </h1>

        {/* Message */}
        <p className="mt-4 text-xl font-semibold text-slate-700">
          Page not found
        </p>

        <p className="mt-2 text-slate-500">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Go home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default FourOFour