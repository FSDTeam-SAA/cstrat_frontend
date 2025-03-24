'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contactwithus() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Form submitted:', data);
    setIsSubmitting(false);
    form.reset();
  }

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
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 w-32 rounded-md bg-white font-medium text-black hover:bg-gray-200"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
