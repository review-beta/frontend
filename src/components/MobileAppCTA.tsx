import React from "react";

const MobileAppCTA: React.FC = () => {

  return (
    <section className="bg-[#F9FAFB] px-6 pt-10 md:pt-16">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            {/* Left: Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
            <h2 className="font-futura text-[24px] md:text-[36px] font-semibold text-[#101828]">
                Our Mobile App is Coming Soon 🚀
            </h2>

            <p className="font-work text-[15px] md:text-[18px] text-[#667085] max-w-xl mx-auto md:mx-0">
                Discover, rate, and explore the best movies, events, dining spots, and hangouts — all in one app.  
                Be the first to know when we launch.
            </p>

            {/* Subscribe form */}
            <form className="mt-4 flex flex-row sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                <input
                type="email"
                required
                placeholder="Enter your email"
                className="
                    flex-1
                    border border-[#E1E1E1]
                    px-4 py-3
                    rounded-[50px]
                    font-work text-[14px]
                    focus:outline-none focus:ring-0
                "
                />
                <button
                type="submit"
                className="
                    bg-[#3B82F6]
                    text-white
                    px-6 py-3
                    rounded-[50px]
                    font-futura text-[14px]
                    hover:bg-[#2563EB]
                    transition
                "
                >
                Notify Me
                </button>
            </form>
            </div>

            {/* Right: Image */}
            <div className="w-full md:w-1/2 flex justify-center">
            <img
                src="/images/MobileAppCTA.svg"
                alt="Mobile app preview"
                className="w-full max-w-[360px] md:max-w-[420px] object-contain"
            />
            </div>

        </div>
    </section>
  );
};

export default MobileAppCTA;