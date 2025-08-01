'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type FormValues = z.infer<typeof formSchema>;

// API function to send contact form data
const sendContactForm = async (data: FormValues) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/contact/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to send message');
  }

  return response.json();
};

export default function Contactwithus() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // const contactMutation = useMutation({
  //   mutationFn: async (data: FormValues) => {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/contact/send`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })

  //     if (!response.ok) {
  //       throw new Error("Failed to submit form")
  //     }

  //     return response.json()
  //   },
  //   onSuccess: (data) => {
  //     toast.success(data.message || "Form submitted successfully")
  //     form.reset()
  //   },
  //   onError: () => {
  //     toast.error("Failed to submit form. Please try again.")
  //   },
  // })

  // Set up the mutation
  const mutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      toast.success('Message sent successfully!');
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message. Please try again.');
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full rounded-xl bg-black py-10">
      <div className="">
        <h1 className="my-8 text-center text-[36px] font-medium text-white">Contact with us</h1>
        <div className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="h-14 max-w-[506px] border-none bg-zinc-800 text-white placeholder:text-[#6B6B6B]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        type="email"
                        {...field}
                        className="h-14 border-none bg-zinc-800 text-white placeholder:text-[#6B6B6B]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your Phone"
                        type="tel"
                        {...field}
                        className="h-14 border-none bg-zinc-800 text-white placeholder:text-[#6B6B6B]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message......."
                        {...field}
                        className="min-h-[120px] resize-none border-none bg-zinc-800 text-white placeholder:text-[#6B6B6B]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="h-10 w-32 rounded-md bg-white font-medium text-black hover:bg-gray-200"
                >
                  {mutation.isPending ? 'Sending...' : 'Submit'}
                </Button>
              </div>

              {mutation.isError && (
                <p className="text-center text-red-400">
                  {mutation.error instanceof Error ? mutation.error.message : 'An error occurred'}
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
