import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";

// Country code data
const countryCodes = [
  // US and UK
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  
  // GCC countries
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  
  // South Asian countries
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" }
];

interface PhoneInputProps {
  control: Control<any>;
  className?: string;
}

export function PhoneInput({ control, className }: PhoneInputProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-2">
        <FormField
          control={control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country code" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center">
                        <span className="mr-2">{country.flag}</span>
                        <span>{country.code}</span>
                        <span className="ml-2 text-muted-foreground text-xs">
                          {country.name}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your mobile number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your mobile number without country code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
