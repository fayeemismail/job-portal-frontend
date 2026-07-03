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
            <span className="text-[#EE5E36] font-extrabold text-xs sm:text-sm tracking-[2.5px] uppercase mb-4 flex items-center gap-2 justify-center">
              <svg
                className="w-3.5 h-3.5 text-[#EE5E36]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
              <span>HOW IT WORKS</span>
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
            <div className="absolute top-[78px] left-[15%] right-[15%] w-[70%] hidden md:block z-0 pointer-events-none">
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
                  {/* Step Number (bottom 15% hidden under the circle, lights up white on hover) */}
                  <span
                    className="text-[56px] font-black leading-none block font-mono select-none transition-colors duration-300 text-transparent group-hover:text-white z-0 relative mb-[-15px]"
                    style={{
                      WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Step Icon with Outer Dashed Circle (Static size, Orange dashed border by default) */}
                  <div className="relative w-[140px] h-[140px] rounded-full border-2 border-dashed border-[#EE5E36] bg-[#0B2545] flex items-center justify-center mb-6 z-10">
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
