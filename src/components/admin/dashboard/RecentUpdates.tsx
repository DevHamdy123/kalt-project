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
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Updates</h2>
      <div className="bg-card p-6 rounded-3xl shadow-sm border border-border/50">
        <div className="flex flex-col gap-6">
          {updates.map((update, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border/50 bg-secondary">
                <img
                  src={update.img}
                  alt={update.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-foreground">
                  <span className="font-bold">{update.name}</span>{" "}
                  {update.action} {update.product}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {update.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
