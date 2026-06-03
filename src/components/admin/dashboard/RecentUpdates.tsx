import Image from "next/image";

const updates = [
  {
    name: "Mike Tyson",
    action: "received his order of",
    product: "Night lion tech GPS drone.",
    time: "2 Minutes Ago",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    name: "Diana Ayi",
    action: "declined her order of",
    product: "DJI Air 2S.",
    time: "5 Minutes Ago",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
  },
  {
    name: "Mandy Roy",
    action: "received his order of",
    product: "LARVENDER KF102 Drone.",
    time: "6 Minutes Ago",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mandy",
  },
];

export function RecentUpdates() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#363949] mb-4">Recent Updates</h2>
      <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none transition-shadow">
        <div className="flex flex-col gap-6">
          {updates.map((update, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#f6f6f9]">
                <Image
                  src={update.img}
                  alt={update.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-[#363949]">
                  <span className="font-bold">{update.name}</span>{" "}
                  <span className="text-[#7d8da1]">
                    {update.action} {update.product}
                  </span>
                </p>
                <p className="text-xs text-[#7d8da1] mt-1">{update.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
