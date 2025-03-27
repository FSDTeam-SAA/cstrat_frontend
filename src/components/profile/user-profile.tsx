import Image from 'next/image';
import { InstagramIcon } from 'lucide-react';
interface UserProfileProps {
  name: string;
  email: string;
  image: string;
}

export function UserProfile({ name, email, image }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-2 h-28 w-28">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          width={112}
          height={112}
          className="rounded-full border border-gray-200 object-cover"
        />
        <div className="absolute bottom-0 right-0 rounded-full border border-gray-200 bg-white p-1">
          <InstagramIcon />
          {/* <Image src="/instagram-icon.png" alt="Instagram" width={20} height={20} /> */}
        </div>
      </div>
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  );
}
