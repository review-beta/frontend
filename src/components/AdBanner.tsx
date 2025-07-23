import { useState, useEffect } from "react";

export default function AdBanner() {
  const [visible, setVisible] = useState(true);
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClose(true);
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); 
  }, []);

  if (!visible) return null;

  return (
    <section className="px-6 md:px-12 py-4 md:py-4 text-center">
    <div className="max-w-[1264px] h-[120px] mx-auto bg-indigo-600 text-white px-4 py-4 shadow-md rounded-md relative flex items-center justify-center">
      {showClose && (
        <button
          aria-label="Close ad banner"
          onClick={() => setVisible(false)}
          className="absolute top-1 right-4 text-gray-300 text-3xl rounded-sm font-bold hover:text-white cursor-pointer"
        >
          &times;
        </button>
      )}
      <p className="font-futura text-xl md:text-3xl">🔥 Check out our special Ad offer! Limited time only.</p>
    </div>
    </section>
  );
}
