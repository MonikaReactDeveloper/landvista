import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  // Convert slug → readable text
  const format = (str) =>
    str
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 py-4 text-sm text-gray-600 flex items-center gap-2">

        {/* Home */}
        <Link to="/" className="hover:text-black">
          Home
        </Link>

        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <span key={to} className="flex items-center gap-2">
              <span>/</span>

              {isLast ? (
                <span className="text-gray-900 font-medium">
                  {format(value)}
                </span>
              ) : (
                <Link to={to} className="hover:text-black">
                  {format(value)}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}