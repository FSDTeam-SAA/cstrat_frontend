'use client';
import Image from 'next/image';
import { InstagramIcon } from 'lucide-react';
import { useRef } from 'react';
import { useAuth } from '@/context/auth-context';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner"

export function UserProfile() {
  const { user, token, refetchUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/update-avatar`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }
    },
    onSuccess: async () => {
      toast.success('Profile image updated!');
      await refetchUser();
    },
    onError: () => {
      toast.error('Failed to update profile image');
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-2 h-28 w-28 cursor-pointer" onClick={handleAvatarClick}>
        {isPending ? (
          <div className="w-full h-full flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-500 animate-pulse">
            Updating...
          </div>
        ) : user?.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name?.charAt(0) || 'D'}
            width={112}
            height={112}
            className="rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-3xl font-semibold text-gray-600">
            {user?.name?.charAt(0).toUpperCase() || 'D'}
          </div>
        )}
        <div className="absolute bottom-0 right-0 rounded-full border border-gray-200 bg-white p-1">
          <InstagramIcon />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      {user && <h2 className="text-xl font-bold">{user.name}</h2>}
      {user && <p className="text-sm text-gray-500">{user.email}</p>}
    </div>
  );
}
