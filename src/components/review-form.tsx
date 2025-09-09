'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  review: z.string().min(10, 'Please write a review of at least 10 characters.').max(500, 'Review cannot exceed 500 characters.'),
});

type ReviewFormProps = {
  onFormSubmit: (values: z.infer<typeof formSchema>) => Promise<boolean>;
};

export function ReviewForm({ onFormSubmit }: ReviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: '',
    },
  });
  
  const { formState: { isSubmitting }, reset } = form;

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await onFormSubmit(values);
    if (success) {
      reset();
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Submit a Review</CardTitle>
        <CardDescription>Let us know what you think. Your feedback helps us improve.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Product Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I really loved the quality, but the shipping was slow..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Sentiment'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
