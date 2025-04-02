export default function Home() {
  return (
    <div className="relative flex flex-col items-center h-screen w-full gap-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* 小屏：底部半圆 */}
        <div
          className="block md:hidden fixed bottom-[-50vw] left-[50%] -ml-[50vw] w-[100vw] h-[100vw] rounded-full pointer-events-none z-0"
          style={{
            background: `radial-gradient(
              circle,
              #B53900 5%,
              #F06B10 20%,
              #F4CA3E 40%,
              #FEF3AA 60%,
              #FFF9E3 70%,
              rgba(255, 249, 227, 0.6) 85%,
              transparent 100%
            )`
          }}
        />
        {/* 大屏：右下角四分之一圆 */}
        <div className="hidden md:block absolute bottom-0 right-0 w-[100vw] h-[100vw]"
          style={{
            background: `radial-gradient(
              circle at bottom right,
              #B53900 0%,
              #F06B10 15%,
              #F4CA3E 25%,
              #FEF3AA 35%,
              #FFF9E3 45%,
              transparent 50%
            )`
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col w-full h-full max-w-7xl px-4">
        {/* top section */}
        <div className="flex flex-1 flex-col gap-10 md:flex-row">
          {/* left */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-center text-center md:text-left gap-10">
            <h1 className="text-3xl md:text-4xl font-bold text-orange-600 leading-snug">
              If the sun’s in your schedule,<br />
              let’s keep overheating out of it!
            </h1>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl">
              Check Heat Alerts
            </button>
          </div>
          {/* right */}
          <div className="flex-1 flex justify-center items-start md:items-center">
            <div className="h-auto md:h-[45%] flex flex-col items-center justify-evenly bg-white/30 backdrop-blur-md rounded-xl px-10 py-8 gap-8 text-white text-center shadow-lg w-[70%] max-w-sm md:max-w-md">
              <p className="text-orange-700 text-base font-bold mb-2">
                Severe heat alert<br />
                Stay hydrated!
              </p>
              <p className="text-6xl font-extrabold mb-2">33°C</p>
              <p className="text-xl font-semibold">Melbourne</p>
              <p className="text-sm">Australia</p>
            </div>
          </div>
        </div>
        {/* bottom */}
        <p className="text-center text-grey-800 text-sm max-w-2xl mx-auto px-4 mt-auto pb-6">
          SOLARA keeps you safe and comfortable during extreme heat with real-time alerts, hydration tips, and expert advice to prevent heat-related illnesses wherever you are.
        </p>
      </div>
    </div>
  );
}
