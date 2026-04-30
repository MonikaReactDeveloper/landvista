import { useParams } from "react-router-dom";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import Breadcrumbs from "../homePage/Breadcrumbs";

export default function ServiceCapabilityDetail() {
  const { slug, capSlug } = useParams();

  const services =
    JSON.parse(localStorage.getItem("services")) || [];

  const service = services.find((s) => s.slug === slug);
  const capability = service?.capabilities.find(
    (c) => c.slug === capSlug
  );

  if (!service || !capability) {
    return <div className="p-10">Not found</div>;
  }

  return (
    <div className="bg-landvista-bg">
      <Navbar />
<Breadcrumbs/>
      <section className="max-w-[1000px] mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-4">
          {capability.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {capability.subtitle}
        </p>

        <p className="text-gray-700">
          {capability.description}
        </p>
      </section>

      <Footer />
    </div>
  );
}