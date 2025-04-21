import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define languages we want to support
export type SupportedLanguage = 'en' | 'ar' | 'hi' | 'ur' | 'tl';

// Translation dictionary type
export type TranslationDictionary = {
  [key in SupportedLanguage]: {
    [key: string]: string;
  };
};

// Create translations dictionary
export const translations: TranslationDictionary = {
  en: {
    // Hero Section
    "hero_title": "Never miss an important renewal again",
    "hero_subtitle": "Get timely reminders for your passports, licenses, residency permits (Iqama), and visas before they expire",
    "hero_cta": "Get Early Access",
    
    // Form Labels
    "form_title": "Sign up for early access",
    "full_name": "Full Name",
    "email": "Email",
    "phone": "Phone Number",
    "notes": "Notes (Optional)",
    "enter_notes": "Enter any specific documents you track...",
    "notification_preference": "Notification Preference",
    "email_me": "Email me",
    "text_me": "Text me",
    "opt_in": "I agree to receive notifications about my document renewals",
    "privacy_policy": "I agree to the Privacy Policy",
    "submit": "Sign Up",
    "success": "Thank you! We'll be in touch soon.",
    
    // Features
    "feature_timely_title": "Timely Reminders",
    "feature_timely_desc": "Get notifications well before your documents expire",
    "feature_simple_title": "Simple Process",
    "feature_simple_desc": "Just upload your documents and we handle the rest",
    "feature_secure_title": "Secure Storage",
    "feature_secure_desc": "Your data is encrypted and securely stored"
  },
  ar: {
    // Hero Section
    "hero_title": "لن تفوت تجديد مهم مرة أخرى",
    "hero_subtitle": "احصل على تذكيرات في الوقت المناسب لجوازات السفر والتراخيص وتصاريح الإقامة (الإقامة) والتأشيرات قبل انتهاء صلاحيتها",
    "hero_cta": "احصل على وصول مبكر",
    
    // Form Labels
    "form_title": "اشترك للوصول المبكر",
    "full_name": "الاسم الكامل",
    "email": "البريد الإلكتروني",
    "phone": "رقم الهاتف",
    "notes": "ملاحظات (اختياري)",
    "enter_notes": "أدخل أي وثائق محددة تتتبعها...",
    "notification_preference": "تفضيل الإشعار",
    "email_me": "أرسل لي بريدًا إلكترونيًا",
    "text_me": "أرسل لي رسالة نصية",
    "opt_in": "أوافق على تلقي إشعارات حول تجديدات وثائقي",
    "privacy_policy": "أوافق على سياسة الخصوصية",
    "submit": "اشترك",
    "success": "شكرًا لك! سنتواصل معك قريبًا.",
    
    // Features
    "feature_timely_title": "تذكيرات في الوقت المناسب",
    "feature_timely_desc": "احصل على إشعارات قبل انتهاء صلاحية مستنداتك بوقت كافٍ",
    "feature_simple_title": "عملية بسيطة",
    "feature_simple_desc": "ما عليك سوى تحميل مستنداتك ونحن نتولى الباقي",
    "feature_secure_title": "تخزين آمن",
    "feature_secure_desc": "يتم تشفير بياناتك وتخزينها بشكل آمن"
  },
  hi: {
    // Hero Section
    "hero_title": "फिर कभी महत्वपूर्ण नवीनीकरण न चूकें",
    "hero_subtitle": "अपने पासपोर्ट, लाइसेंस, निवास परमिट (इकामा), और वीज़ा के लिए समय पर रिमाइंडर प्राप्त करें उनके समाप्त होने से पहले",
    "hero_cta": "शीघ्र पहुंच प्राप्त करें",
    
    // Form Labels
    "form_title": "शीघ्र पहुंच के लिए साइन अप करें",
    "full_name": "पूरा नाम",
    "email": "ईमेल",
    "phone": "फोन नंबर",
    "notes": "नोट्स (वैकल्पिक)",
    "enter_notes": "कोई विशिष्ट दस्तावेज़ दर्ज करें जिनका आप ट्रैक रखते हैं...",
    "notification_preference": "अधिसूचना प्राथमिकता",
    "email_me": "मुझे ईमेल करें",
    "text_me": "मुझे मैसेज करें",
    "opt_in": "मैं अपने दस्तावेज़ नवीनीकरण के बारे में सूचनाएं प्राप्त करने के लिए सहमत हूं",
    "privacy_policy": "मैं गोपनीयता नीति से सहमत हूं",
    "submit": "साइन अप करें",
    "success": "धन्यवाद! हम जल्द ही संपर्क में आएंगे।",
    
    // Features
    "feature_timely_title": "समय पर रिमाइंडर",
    "feature_timely_desc": "अपने दस्तावेज़ों की समाप्ति से पहले अधिसूचनाएं प्राप्त करें",
    "feature_simple_title": "सरल प्रक्रिया",
    "feature_simple_desc": "बस अपने दस्तावेज अपलोड करें और हम बाकी संभाल लेंगे",
    "feature_secure_title": "सुरक्षित स्टोरेज",
    "feature_secure_desc": "आपका डेटा एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है"
  },
  ur: {
    // Hero Section
    "hero_title": "اہم تجدید کو دوبارہ کبھی نہ چھوڑیں",
    "hero_subtitle": "اپنے پاسپورٹ، لائسنس، رہائشی اجازت نامے (اقامہ)، اور ویزا کے لیے بروقت یاد دہانیاں حاصل کریں، ان کی میعاد ختم ہونے سے پہلے",
    "hero_cta": "جلد رسائی حاصل کریں",
    
    // Form Labels
    "form_title": "جلد رسائی کے لیے سائن اپ کریں",
    "full_name": "پورا نام",
    "email": "ای میل",
    "phone": "فون نمبر",
    "notes": "نوٹس (اختیاری)",
    "enter_notes": "کوئی مخصوص دستاویزات درج کریں جن کا آپ ٹریک رکھتے ہیں...",
    "notification_preference": "اطلاع کی ترجیح",
    "email_me": "مجھے ای میل کریں",
    "text_me": "مجھے پیغام بھیجیں",
    "opt_in": "میں اپنے دستاویزات کی تجدید کے بارے میں اطلاعات وصول کرنے پر رضامند ہوں",
    "privacy_policy": "میں رازداری کی پالیسی سے متفق ہوں",
    "submit": "سائن اپ کریں",
    "success": "شکریہ! ہم جلد ہی آپ سے رابطہ کریں گے۔",
    
    // Features
    "feature_timely_title": "بروقت یاد دہانیاں",
    "feature_timely_desc": "اپنے دستاویزات کی میعاد ختم ہونے سے پہلے اطلاعات حاصل کریں",
    "feature_simple_title": "سادہ عمل",
    "feature_simple_desc": "صرف اپنے دستاویزات اپ لوڈ کریں اور ہم باقی سنبھال لیں گے",
    "feature_secure_title": "محفوظ اسٹوریج",
    "feature_secure_desc": "آپ کا ڈیٹا انکرپٹڈ اور محفوظ طریقے سے ذخیرہ کیا جاتا ہے"
  },
  tl: {
    // Hero Section - Tagalog
    "hero_title": "Hindi na makakaligtaan ang mahalagang renewal",
    "hero_subtitle": "Kumuha ng napapanahong mga paalala para sa iyong mga pasaporte, lisensya, permit sa paninirahan (Iqama), at visa bago ang kanilang pagpaso",
    "hero_cta": "Kumuha ng Maagang Access",
    
    // Form Labels
    "form_title": "Mag-sign up para sa maagang access",
    "full_name": "Buong Pangalan",
    "email": "Email",
    "phone": "Numero ng Telepono",
    "notes": "Mga Tala (Opsyonal)",
    "enter_notes": "Ilagay ang anumang partikular na dokumento na sinusubaybayan mo...",
    "notification_preference": "Kagustuhan sa Notification",
    "email_me": "I-email ako",
    "text_me": "I-text ako",
    "opt_in": "Sumasang-ayon ako na tumanggap ng mga notification tungkol sa aking mga renewal ng dokumento",
    "privacy_policy": "Sumasang-ayon ako sa Patakaran sa Pagkapribado",
    "submit": "Mag-sign Up",
    "success": "Salamat! Kokontakin ka namin sa lalong madaling panahon.",
    
    // Features
    "feature_timely_title": "Napapanahong Paalala",
    "feature_timely_desc": "Kumuha ng mga notification bago mag-expire ang iyong mga dokumento",
    "feature_simple_title": "Simpleng Proseso",
    "feature_simple_desc": "I-upload lang ang iyong mga dokumento at kami na ang bahala sa iba",
    "feature_secure_title": "Ligtas na Storage",
    "feature_secure_desc": "Ang iyong data ay naka-encrypt at naka-store nang ligtas"
  }
};

// Create language map with language details
export const languageMap: Record<SupportedLanguage, { name: string, nativeName: string, flag: string, dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  tl: { name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', dir: 'ltr' }
};

// Interface for the language context
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  dir: 'ltr'
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get saved language from localStorage, default to 'en'
  const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') as SupportedLanguage : null;
  const [language, setLanguage] = useState<SupportedLanguage>(savedLanguage || 'en');

  // Get text direction based on language
  const dir = languageMap[language].dir;

  // Function to update language
  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      
      // Update HTML dir attribute
      document.documentElement.dir = languageMap[lang].dir;
      document.documentElement.lang = lang;
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    // Return the key if no translation is found
    return key;
  };

  // Set initial document direction
  React.useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};