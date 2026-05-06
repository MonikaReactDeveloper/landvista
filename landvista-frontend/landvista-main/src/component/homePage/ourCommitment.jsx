import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../../utils/api';

// Static fallback images cycled across zones
const fallbackImages = [
  '/assets/images/zone-1.jpg',
  '/assets/images/zone-2.jpg',
  '/assets/images/zone-3.jpg',
  '/assets/images/zone-4.jpg',
  '/assets/images/hero-main.jpg',
];

export default function OurCommitment() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await api.get('/policy/zones');
        const data = response.data.data || response.data;
        setZones(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        console.error('Failed to fetch zones', error);
      }
    };
    fetchZones();
  }, []);

  return (
    <section className="w-full bg-landvista-bg py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-16 md:mb-24 border-b-2 border-landvista-blue pb-4">
          <h2 className="text-[40px] md:text-[56px] font-black text-landvista-charcoal uppercase tracking-tighter leading-none">
            POLICY <span className="font-thin text-landvista-grey">&amp; ZONES</span>
          </h2>
          <button
            onClick={() => navigate('/policy-zones')}
            className="group flex items-center gap-3 text-[11px] font-black text-landvista-charcoal uppercase tracking-[0.2em] hover:text-landvista-slate transition whitespace-nowrap"
          >
            VIEW ALL INTELLIGENCE
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {zones.map((zone, i) => (
            <div
              key={zone.id || zone._id || i}
              onClick={() => zone.status !== 'locked' && navigate(`/policy-zones/${zone.slug}`)}
              className={`relative group h-[420px] overflow-hidden rounded-2xl ${zone.status === 'locked' ? 'cursor-not-allowed grayscale' : 'cursor-pointer shadow-2xl shadow-black/10'}`}
            >
              {/* IMAGE */}
              <img
                src={zone.image || fallbackImages[i % fallbackImages.length]}
                alt={zone.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-landvista-blue via-landvista-blue/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">

                {/* TOP TEXT */}
                <div>
                  {zone.status === 'locked' ? (
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] bg-landvista-maroon text-white px-3 py-1 rounded-sm mb-4">
                      RESTRICTED ACCESS
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] bg-landvista-green text-white px-3 py-1 rounded-sm mb-4">
                      ACTIVE SIGNALS
                    </span>
                  )}
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">
                    Intelligence Zone
                  </p>
                  <h3 className="text-[28px] font-black uppercase tracking-tight leading-tight">
                    {zone.name}
                  </h3>
                </div>

                {/* HOVER DESCRIPTION */}
                <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-[14px] font-medium text-white/80 leading-relaxed mb-6 line-clamp-3">
                    {zone.description}
                  </p>
                  {zone.status !== 'locked' && (
                    <span className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-white/40 pb-1 group-hover:border-white transition-all">
                      ENTER ZONE <ArrowRight size={14} />
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}