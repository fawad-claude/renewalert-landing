import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { PhoneInput } from "@/components/ui/phone-input";
import { phoneNumberValidationSchema } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { getLocationBasedDialCode } from "@/lib/geolocation";
import { useLanguage } from "@/contexts/LanguageContext";
import { SocialShare } from "@/components/social-share";

export function SignupForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  // Default to phone input method since it's shown first
  const [inputMethod, setInputMethod] = useState<'phone' | 'email' | 'none'>('phone');
  const { toast } = useToast();
  const { t, dir } = useLanguage();

  const form = useForm({
    resolver: zodResolver(phoneNumberValidationSchema),
    defaultValues: {
      fullName: "",
      countryCode: "+965", // Kuwait as fallback default
      phoneNumber: "",
      email: "",
      notes: "",
      optIn: false,
      privacyPolicy: false,
    },
    mode: "onChange",
  });

  // Load user's country based on location
  useEffect(() => {
    async function loadUserCountry() {
      try {
        setIsLoadingLocation(true);
        const dialCode = await getLocationBasedDialCode();
        form.setValue("countryCode", dialCode);
      } catch (error) {
        console.error("Error setting location-based country:", error);
        // Default to Kuwait if there's an error
        form.setValue("countryCode", "+965");
      } finally {
        setIsLoadingLocation(false);
      }
    }

    loadUserCountry();
  }, [form]);
  
  // Listen for changes in phone number and email fields to update input method
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // When phone number changes
      if (name === 'phoneNumber' && value.phoneNumber) {
        if (value.phoneNumber.length > 0) {
          setInputMethod('phone');
          // Clear email field when user starts typing phone number
          if (form.getValues('email')) {
            form.setValue('email', '');
          }
        } else if (!value.email || value.email.length === 0) {
          setInputMethod('none');
        }
      }
      
      // When email changes
      if (name === 'email' && value.email) {
        if (value.email.length > 0) {
          setInputMethod('email');
          // Clear phone fields when user starts typing email
          if (form.getValues('phoneNumber')) {
            form.setValue('phoneNumber', '');
          }
        } else if (!value.phoneNumber || value.phoneNumber.length === 0) {
          setInputMethod('none');
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const mutation = useMutation({
    mutationFn: (data: {
      fullName: string;
      countryCode?: string;
      phoneNumber?: string;
      email?: string;
      notes?: string;
      optIn?: boolean;
      privacyPolicy?: boolean;
    }) => {
      console.log('Making API request with data:', data);
      return apiRequest("POST", "/api/signup", data)
        .then(response => {
          console.log('API response:', response);
          return response;
        })
        .catch(error => {
          console.error('API error:', error);
          throw error;
        });
    },
    onSuccess: (data) => {
      console.log('Mutation success:', data);
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Thank you for signing up for early access!",
      });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    },
  });

  async function onSubmit(data: {
    fullName: string;
    countryCode?: string;
    phoneNumber?: string;
    email?: string;
    notes?: string;
    optIn?: boolean;
    privacyPolicy?: boolean;
  }) {
    try {
      // Debug log before validation
      console.log('Form data before validation:', { ...data, inputMethod });
      console.log('Form errors:', form.formState.errors);
      
      // Validate name
      if (!data.fullName || data.fullName.trim().length < 2) {
        form.setError('fullName', { 
          type: 'manual', 
          message: 'Please enter your full name (at least 2 characters)' 
        });
        return;
      }
      
      // Validate that at least one contact method is provided
      if (inputMethod === 'phone' && (!data.phoneNumber || data.phoneNumber.trim() === '')) {
        form.setError('phoneNumber', { 
          type: 'manual', 
          message: 'Please enter a phone number' 
        });
        return;
      }
      
      if (inputMethod === 'email' && (!data.email || data.email.trim() === '')) {
        form.setError('email', { 
          type: 'manual', 
          message: 'Please enter an email address' 
        });
        return;
      }
      
      // Make sure the opt-in checkbox is checked
      if (!data.optIn) {
        form.setError('optIn', { 
          type: 'manual', 
          message: 'You must opt-in to receive notifications' 
        });
        return;
      }
      
      // Make sure the privacy policy checkbox is checked
      if (!data.privacyPolicy) {
        form.setError('privacyPolicy', { 
          type: 'manual', 
          message: 'You must agree to the privacy policy' 
        });
        console.log('Privacy policy not checked:', data.privacyPolicy);
        return;
      }
      
      // Make sure we only send what's needed based on input method
      const submissionData = {
        ...data,
        // If email is selected, clear phone data - use empty string to avoid nulls
        ...(inputMethod === 'email' ? { 
          phoneNumber: '', 
          countryCode: '+965' // Use a valid country code even if we're not using it
        } : {}),
        // If phone is selected, clear email data
        ...(inputMethod === 'phone' ? { 
          email: '' 
        } : {})
      };
      
      // Extra validation for phone number format
      if (inputMethod === 'phone' && submissionData.phoneNumber) {
        // Make sure it's only digits
        if (!/^\d+$/.test(submissionData.phoneNumber)) {
          form.setError('phoneNumber', { 
            type: 'manual', 
            message: 'Phone number must contain only digits' 
          });
          return;
        }
        
        // Make sure it's a reasonable length
        if (submissionData.phoneNumber.length < 6 || submissionData.phoneNumber.length > 15) {
          form.setError('phoneNumber', { 
            type: 'manual', 
            message: 'Phone number must be between 6 and 15 digits' 
          });
          return;
        }
      }
      
      // Extra validation for email format
      if (inputMethod === 'email' && submissionData.email) {
        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submissionData.email)) {
          form.setError('email', { 
            type: 'manual', 
            message: 'Please enter a valid email address' 
          });
          return;
        }
      }
      
      console.log('Submitting form data:', submissionData);
      
      // All validation checks passed
      console.log('All validation checks passed, proceeding to submit data');
      
      // Submit the data
      mutation.mutate(submissionData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting the form. Please try again."
      });
    }
  }

  if (isSuccess) {
    return (
      <Card className="bg-white rounded-xl shadow-xl p-6 md:p-8 border-2 border-green-500 transform transition-all hover:shadow-2xl animate-bounce-once">
        <CardContent className="px-0 py-0 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {t("success")}
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            {t("success")}
          </p>
          <p className="text-gray-600">
            We'll notify you when we launch RenewAlert.
          </p>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">
              Your contact details have been recorded. You're now on our early access list.
            </p>
          </div>
          
          {/* Social Sharing Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="animate-pulse-slow">
              <div className="mb-4 mx-auto w-20 h-1 bg-primary rounded-full"></div>
            </div>
            
            {/* Import the social share component */}
            <SocialShare className="mt-4" />
            
            <p className="text-sm text-gray-500 mt-6">
              Help your friends and family save time and avoid stress by sharing RenewAlert with them.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 transform transition-all hover:shadow-2xl">
      <CardContent className="px-0 py-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {t("form_title")}
        </h3>
        <p className="text-gray-600 mb-6">
          {t("hero_cta")}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-md mb-2 text-sm text-amber-800">
              Please provide either a phone number or an email address.
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("full_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("full_name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact method selection buttons */}
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium">{t("notification_preference")} <span className="text-destructive">*</span></div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  variant={inputMethod === 'phone' ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => {
                    setInputMethod('phone');
                    form.setValue('email', '');
                    // Clear any existing errors
                    form.clearErrors('phoneNumber');
                    form.clearErrors('email');
                  }}
                >
                  {t("text_me")}
                </Button>
                <Button 
                  type="button"
                  variant={inputMethod === 'email' ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => {
                    setInputMethod('email');
                    form.setValue('phoneNumber', '');
                    form.setValue('countryCode', '+965'); // Reset to default country code
                    // Clear any existing errors
                    form.clearErrors('phoneNumber');
                    form.clearErrors('email');
                  }}
                >
                  {t("email_me")}
                </Button>
              </div>
            </div>

            {/* Phone input fields - shown only when phone is selected */}
            {inputMethod === 'phone' && (
              <div>
                <PhoneInput control={form.control} isLoading={isLoadingLocation} />
              </div>
            )}

            {/* Email input field - shown only when email is selected */}
            {inputMethod === 'email' && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("email")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("notes")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("enter_notes")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="optIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t("opt_in")}{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormDescription>
                      I agree to receive renewal reminders via Email, SMS or
                      WhatsApp. (Required to use RenewAlert's services - we
                      promise no spam, only important notifications).
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <div className="grid gap-1.5 leading-none">
                    <FormLabel>
                      {t("privacy_policy")}{" "}
                      <Link href="/privacy-policy">
                        <span className="text-primary hover:underline cursor-pointer">
                          Privacy Policy
                        </span>
                      </Link>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full pulse-animation"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t("submit")}
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
