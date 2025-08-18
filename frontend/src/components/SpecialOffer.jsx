import React, { useEffect, useState } from 'react';


const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
          <img
            src="https://public.readdy.ai/ai/img_res/1d8bcec2da6fd4c94b0f1345ac766ab7.jpg"
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Flash Sale</h2>
          <p className="text-xl text-gray-600">Get up to 50% off on premium brands. Limited time offer!</p>
          <div className="text-2xl font-bold text-gray-900">
            Ends in: {formatTime(timeLeft)}
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Shop the Sale
          </button>
        </div>
      </div>
    </section>
  );
};


export default SpecialOffer;