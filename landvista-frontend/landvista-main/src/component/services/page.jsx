import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await api.get("/services");
        const data = response.data.data || response.data;
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (<>
    <Navbar />
    {/* <Breadcrumbs/> */}
    <section className="bg-landvista-bg mb-10">

      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* <ServiceHero/> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (
            <div
              key={service.slug}
              className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
            >
              {/* Service Image */}
              <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img 
                  src={service.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"} 
                  alt={service.title}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-[20px] font-semibold mb-3 text-landvista-blue">
                    {service.title}
                  </h3>
  
                  <p className="text-[14px] text-landvista-grey line-clamp-3">
                    {service.description}
                  </p>
                </div>
  
                <button
                  onClick={() => navigate(`/services/${service.slug || service._id}`)}
                  className="mt-6 text-landvista-green font-medium text-sm flex items-center gap-2 hover:translate-x-1 transition-transform"
                >
                  Explore Service <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
    {/* <Footer/> */}
  </>);
}