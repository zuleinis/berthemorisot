export type EventItem = {
  title: string;
  date: string;
  description: string;
};
export const TimelineEvent = ({ event }: { event: EventItem }) => {
  return (
    <div className="timeline-event">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p className="text-sm text-gray-500">{event.date}</p>
      <p className="mt-2">{event.description}</p>
    </div>
  );
};
