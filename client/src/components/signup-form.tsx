import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { PhoneInput } from "@/components/ui/phone-input";
import { phoneNumberValidationSchema } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export function SignupForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(phoneNumberValidationSchema),
    defaultValues: {
      countryCode: "+1",
      phoneNumber: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { countryCode: string; phoneNumber: string }) =>
      apiRequest("POST", "/api/signup", data),
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Thank you for signing up for early access!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
      });
    },
  });

  function onSubmit(data: { countryCode: string; phoneNumber: string }) {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return (
      <Card className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 transform transition-all hover:shadow-2xl">
        <CardContent className="px-0 py-0 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-4">
            <CheckCircle size={36} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600">You're all set! We'll notify you when we launch.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 transform transition-all hover:shadow-2xl">
      <CardContent className="px-0 py-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up for Early Access</h3>
        <p className="text-gray-600 mb-6">Be among the first to try our solution when we launch!</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <PhoneInput control={form.control} />
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="privacy-policy" 
                required
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="privacy-policy" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </Label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full pulse-animation"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign up for early access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              We'll only send you product updates. No spam, we promise!
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
