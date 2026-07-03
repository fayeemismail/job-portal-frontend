'use client';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '/service-01.png',
      title: 'Choose Your Service',
      description: 'Pick the service you are looking for- from the website or the app.',
    },
    {
      number: '02',
      icon: '/service-02.png',
      title: 'Pick Your Schedule',
      description: 'Pick the service you are looking for- from the website or the app.',
    },
    {
      number: '03',
      icon: '/service-03.png',
      title: 'Place The Order',
      description: 'Pick the service you are looking for- from the website or the app.',
    },
  ];

  return (
    <section className="bg-white pb-16 md:pb-24 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[#0B2545] rounded-[2.5rem] px-6 py-16 md:py-20 lg:py-24 text-center relative overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-16 relative z-10">
            <span className="text-[#EE5E36] font-extrabold text-xs sm:text-sm tracking-[2.5px] uppercase mb-4">
              » HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-white leading-tight mb-4">
              Convenient Service Access
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Launch your online presence with ease! Our Professional Website Setup service offers a
              comprehensive.
            </p>
          </div>

          {/* Grid Layout for Steps */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Dashed Line (Visible on md screens and up) */}
            <div className="absolute top-[60px] left-[15%] right-[15%] w-[70%] hidden md:block z-0 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arrow-line.png"
                alt="Connecting dashed line"
                className="w-full h-auto object-contain opacity-80"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 relative z-10">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center group">
                  {/* Step Number */}
                  <span
                    className="text-[48px] font-black leading-none block mb-3 font-mono select-none"
                    style={{
                      WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.15)',
                      color: 'transparent',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Step Icon */}
                  <div className="w-[90px] h-[90px] rounded-full flex items-center justify-center bg-transparent mb-6 transition-transform duration-300 group-hover:scale-105">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-[90px] h-[90px] object-contain pointer-events-none select-none"
                    />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-white font-extrabold text-lg sm:text-xl mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-gray-400 text-sm max-w-[260px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
