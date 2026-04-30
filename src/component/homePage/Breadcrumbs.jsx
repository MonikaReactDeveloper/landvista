import { Link, useParams } from "react-router-dom";

export default function Breadcrumbs() {
  const { slug, capSlug } = useParams();

  const services =
    JSON.parse(localStorage.getItem("services")) || [];

  const service = services.find((s) => s.slug === slug);
  const capability = service?.capabilities?.find(
    (c) => c.slug === capSlug
  );

  return (
    <div className="border-b bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-3 text-sm flex gap-2">

        <Link to="/">Home</Link>
        <span>/</span>

        <Link to="/services">Services</Link>

        {service && (
          <>
            <span>/</span>
            <Link to={`/services/${service.slug}`}>
              {service.title}
            </Link>
          </>
        )}

        {capability && (
          <>
            <span>/</span>
            <span className="font-medium">
              {capability.title}
            </span>
          </>
        )}
      </div>
    </div>
  );
}