import React, { useEffect, useState } from "react";
import { FiUser, FiEye } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";


const iconMap = {
  user: FiUser,
  eye: FiEye,
  handshake: FaHandshake,
};


const Step = ({ number, title, description, icon }) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="flex flex-col items-center text-center max-w-sm">
      
      
      <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
        {IconComponent && (
          <IconComponent className="text-amber-500" size={28} />
        )}
      </div>

      
      <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold mb-4">
        {number}
      </div>

      
      <h3 className="text-lg font-semibold mb-3">
        {title}
      </h3>

      
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const Howitworks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fakeData = [
      {
        id: 1,
        title: "Create Your Profile",
        description:
          "Sign up and build a compelling profile with your talents, media, and availability.",
        icon: "user",
      },
      {
        id: 2,
        title: "Get Discovered",
        description:
          "Appear in search results. Seekers browse, filter, and find the perfect talent.",
        icon: "eye",
      },
      {
        id: 3,
        title: "Connect & Agree",
        description:
          "Negotiate, send offers, and finalize agreements — all within the platform.",
        icon: "handshake",
      },
    ];

    setTimeout(() => {
      setSteps(fakeData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section className="bg-gray-50 py-20 px-6">
      
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-gray-500 text-base">
          Three simple steps to get started
        </p>
      </div>

      
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          {steps.map((step, index) => (
            <Step
              key={step.id}
              number={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Howitworks;
