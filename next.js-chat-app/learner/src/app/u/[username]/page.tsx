'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { messageSchema } from '@/schemas/message.schema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';


const MessagePage = () => {
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [sendingMessageLoading, setSendingMessageLoading] = useState<boolean>(false);
  const [aiText, setAiText] = useState<string>("");
  const [incomingSuggestedMessageloading, setIncomingSuggestedMessageloading] = useState<boolean>(false);
  const params = useParams<{ username: string }>();

  const form = useForm({
    resolver: zodResolver(messageSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      setSendingMessageLoading(true);
      const response = await axios.post<ApiResponse>('/api/send-message', { data, username: params.username });
      toast.success("Message send successfully", {
        description: response.data.message,
        position: "bottom-right"
      });
      form.reset({ ...form.getValues(), content: '' });
    }
    catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Failed to send message", {
        description: axiosError.response?.data.message ?? "An error occured , Please send again",
        position: 'bottom-right'
      });
    }
    finally {
      setSendingMessageLoading(false);
    };
  };

  const suggestMessage = async () => {
    setIncomingSuggestedMessageloading(true);
    setAiText("");
    setSuggestedMessages([]);

    try {
      const response = await fetch("/api/suggest-messages", { method: "POST" });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer: string = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        buffer += chunk;

        while (buffer.includes("||")) {
          const [complete, ...rest] = buffer.split("||");

          setSuggestedMessages(prev => [...prev, complete.trim()]);

          setAiText("");
          
          buffer = rest.join("||");
        }
        setAiText(buffer);
      }
      if (buffer.trim()) {
        setSuggestedMessages(prev => [...prev, buffer.trim()]);
        setAiText("");
      }
    }
    catch (error) {
      toast.error("Failed to fetch suggestions", {
        description: error as string ?? "An error occured , Please try again",
        position: 'bottom-right'
      });
    }
    finally {
      setIncomingSuggestedMessageloading(false);
    };
  };

  const copyToClipboard = (msg: string): void => {
    navigator.clipboard.writeText(msg);
  };

  return (
    <div className='flex flex-col items-center min-w-screen min-h-screen relative'>
      <div className='absolute h-full w-3/4 -z-100 left-1/2 -translate-x-1/2 border-l border-r border-gray-300'></div>
      <h1 className='font-bold text-6xl my-16'>
        Public Profile Link
      </h1>
      <div className='w-2/3'>
        <Form {...form}>
          <form className='flex flex-col' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField name='content' control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-6 text-3xl'>Send message to {params.username}</FormLabel>
                  <Input className='h-15' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='cursor-pointer mt-6 mx-auto' type='submit' disabled={!form.formState.isDirty || !form.formState.isValid}>
              {sendingMessageLoading ? (<span className='flex gap-1 justify-center items-center'>Sending <Loader2 className='animate-spin' /></span>) : ("Send")}
            </Button>
          </form>
        </Form>
      </div>
      <div className='w-2/3 my-16'>
        <Button className='cursor-pointer' onClick={suggestMessage} disabled={incomingSuggestedMessageloading}>
          {incomingSuggestedMessageloading ? (<span className='flex gap-1 items-center justify-center'>Generating <Loader2 className='animate-spin' /></span>) : ("Suggest Messages")}
        </Button>
        <p className='my-4 text-lg font-bold'>Click on any message below to select it.</p>
        <div>
          
          {suggestedMessages.map((message: string, index: any) => (
            <div key={index}>
              <button className='cursor-pointer' type='button' disabled={incomingSuggestedMessageloading} onClick={() => copyToClipboard(suggestedMessages[index])}>
                {message}
              </button>
            </div>
          ))}
          {aiText && (
            <div className='border p-3 rounded-md italic opacity-70'>
              {aiText}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MessagePage;