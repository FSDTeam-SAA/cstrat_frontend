import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample notification data
const notifications = Array(14)
  .fill(null)
  .map((_, i) => ({
    id: i,
    sender: 'Alex rock',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum, odio sit amet posuere volutpat, tellus erat hendrerit enim, porttitor ullamcorper odio odio eget erat. Mauris vitae enim odio. Mauris at metus cursus lectus dapibus ultrices a eget nunc. Integer condimentum libero non orci laoreet tempus.',
    date: '5/10/25',
    avatar: `/avatar-${(i % 5) + 1}.png`,
  }));

export default function Notifications() {
  return (
    <div className="max-w-full">
      <h1 className="mb-6 text-2xl font-bold">Notifications</h1>

      <div className="space-y-0">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-4 border-b py-4">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={notification.avatar} alt={notification.sender} />
              <AvatarFallback>{notification.sender.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-bold">{notification.sender}</h3>
                <span className="ml-2 whitespace-nowrap text-sm">{notification.date}</span>
              </div>
              <p className="line-clamp-3 text-sm text-gray-600">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
