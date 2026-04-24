export default function Moments() {
  return (
    <section className="min-h-screen bg-border-white p-8 md:p-16 lg:p-24 flex flex-col justify-center">
      <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12 md:mb-16">
        All - about <br /> moments ©26
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1">
        <div className="bg-bg-inner rounded-[2.5rem] border border-black/5 shadow-inner flex items-center justify-center text-black/5 font-black italic text-6xl min-h-100">
          01
        </div>
        <div className="bg-bg-inner rounded-[2.5rem] border border-black/5 shadow-inner flex items-center justify-center text-black/5 font-black italic text-6xl min-h-100">
          02
        </div>
      </div>
    </section>
  );
}
