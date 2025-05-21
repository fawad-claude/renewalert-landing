import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Country code data
const countryCodes = [
  // GCC countries (primary focus)
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  
  // US and UK
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  
  // South Asian countries
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" }
];

interface PhoneInputProps {
  control: Control<any>;
  className?: string;
  isLoading?: boolean;
}

export function PhoneInput({ control, className, isLoading = false }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; flag: string; name: string } | null>(null);
  const { t, dir } = useLanguage();

  // Function to find country by code
  const findCountryByCode = (code: string) => {
    return countryCodes.find(country => country.code === code) || null;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-2">
        <FormField
          control={control}
          name="countryCode"
          render={({ field }) => {
            // Update selected country when field value changes
            useEffect(() => {
              if (field.value) {
                setSelectedCountry(findCountryByCode(field.value));
              }
            }, [field.value]);

            return (
              <FormItem>
                <div className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <FormLabel className={dir === 'rtl' ? 'text-right w-full' : ''}>{t("country")}</FormLabel>
                  {isLoading && (
                    <span className="text-xs text-primary flex items-center">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      {dir === 'rtl' ? 'جارٍ تحديد الموقع...' : 'Detecting location...'}
                    </span>
                  )}
                </div>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCountry(findCountryByCode(value));
                  }} 
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className={isLoading ? "opacity-70" : ""}>
                      {selectedCountry ? (
                        <span className="flex items-center">
                          <span className="mr-2 text-lg">{selectedCountry.flag}</span>
                          <span>{selectedCountry.code}</span>
                        </span>
                      ) : (
                        <SelectValue placeholder={dir === 'rtl' ? "اختر الدولة" : "Select country"} />
                      )}
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
            );
          }}
        />
        
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={dir === 'rtl' ? 'text-right w-full' : ''}>{t("phone_number")}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t("mobile_placeholder")}
                  className={dir === 'rtl' ? 'text-right' : 'text-left'}
                  {...field}
                />
              </FormControl>
              <FormDescription className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                {t("mobile_instruction")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
