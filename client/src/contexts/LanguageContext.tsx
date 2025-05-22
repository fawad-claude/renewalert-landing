import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define languages we want to support
export type SupportedLanguage = 'en' | 'ar' | 'hi';

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
    "hero_title": "Never Miss an ID Renewal for You or Your Family",
    "hero_subtitle": "Get timely reminders for everyone's passports, licenses, residency permits (Iqama), and visas before they expire",
    "hero_cta": "Get Early Access",
    "expat_paragraph": "Whether you're an Expat, Resident, or Citizen managing documents for yourself or your entire family, we get it — keeping track of renewals is a headache. Passports, licenses, residency permits (Iqama), visas for multiple family members — it's overwhelming and easy to miss important dates.\n\nOur upcoming mobile app is designed to send you timely reminders for all your family's important renewals, helping everyone stay ahead and stress-free. Track documents for your spouse, children, and elderly parents all in one place.\n\nBe the first to experience the convenience of staying organized with ease.",
    "key_benefits": "Key Benefits",
    "coming_soon": "Coming Soon",
    "provide_either": "Please provide either a phone number or an email address",
    "countries_title": "Launching Soon In",
    "countries_subtitle": "RenewAlert will be available in these countries to help you keep track of your important documents",
    "countries_footer": "More countries will be added soon! Stay tuned for updates.",
    "promise_message": "We only send product updates. No spam, we promise.",
    
    // Form Labels
    "form_title": "Sign up for early access",
    "full_name": "Full Name",
    "email": "Email",
    "phone": "Phone Number",
    "phone_number": "Phone Number",
    "mobile_placeholder": "Enter your mobile number",
    "notes": "Notes (Optional)",
    "enter_notes": "What you would like to see in the app?",
    "notification_preference": "Notification Preference",
    "email_me": "Email me",
    "text_me": "Text me",
    "opt_in": "I agree to receive notifications about the app launch via Email, SMS, or WhatsApp",
    "privacy_policy": "I agree to the Privacy Policy *",
    "submit": "Sign Up",
    "success": "Thank you! We'll be in touch soon.",
    "success_message": "We'll notify you when RenewAlert launches",
    "contact_recorded": "Your contact details have been recorded. You are now on the early access list",
    "mobile_instruction": "Please enter a valid mobile number without the country code",
    
    // Features
    "feature_timely_title": "Timely Reminders",
    "feature_timely_desc": "Get notifications well before your documents expire",
    "feature_simple_title": "Simple Process",
    "feature_simple_desc": "Just upload your documents and we handle the rest",
    "feature_secure_title": "Secure and Flexible Storage",
    "feature_secure_desc": "Your Data, Your Choice — on your phone or in the cloud. Encrypted and protected",
    "feature_family_title": "Family Document Management",
    "feature_family_desc": "Track everyone's documents in one place - from children's passports to elderly parents' IDs",
    
    // Social Sharing
    "share_heading": "Help friends and family stay updated too!",
    "share_subheading": "Share RenewAlert with your network",
    "share_title": "RenewAlert - Never miss important document renewals again!",
    "share_message": "I just signed up for RenewAlert to get timely reminders for my passport, visa, and ID renewals. No more last-minute panic! Join me here:"
  },
  ar: {
    // Hero Section
    "hero_title": "لن تفوت تجديد بطاقة الهوية مرة أخرى",
    "hero_subtitle": "احصل على تذكيرات في الوقت المناسب لجوازات السفر والتراخيص وتصاريح الإقامة (الإقامة) والتأشيرات قبل انتهاء صلاحيتها",
    "hero_cta": "احصل على وصول مبكر",
    "expat_paragraph": "المغتربون، نحن نفهم - تجديد الوثائق أمر مزعج. جواز السفر، الرخصة، تصاريح الإقامة (الإقامة)، التأشيرة - التجديدات يمكن أن تكون ساحقة وسهلة النسيان. تم تصميم تطبيقنا المحمول القادم لإرسال تذكيرات في الوقت المناسب لجميع التجديدات المهمة الخاصة بك، مما يساعدك على البقاء في المقدمة وخالي من التوتر. كن أول من يختبر راحة البقاء منظمًا بسهولة.",
    
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
    "country": "الدولة",
    "phone_number": "رقم الهاتف",
    "mobile_placeholder": "رقم الهاتف المحمول",
    "mobile_instruction": "أدخل رقم هاتفك المحمول بدون رمز الدولة",
    "enter_email": "أدخل بريدك الإلكتروني",
    "privacy_agreement": "أوافق على سياسة الخصوصية",
    "key_benefits": "فوائد رئيسية",
    "promise_message": "نحن نرسل فقط تحديثات المنتج. لا بريد مزعج، نعد بذلك",
    "success_message": "سنعلمك عندما نطلق رينيو ألرت",
    "contact_recorded": "تم تسجيل تفاصيل الاتصال الخاصة بك. أنت الآن في قائمة الوصول المبكر",
    "either_phone_or_email": "يرجى تقديم إما رقم هاتف أو عنوان بريد إلكتروني",
    "provide_either": "يرجى تقديم إما رقم هاتف أو عنوان بريد إلكتروني",
    "must_check_box": "يجب عليك تحديد هذا المربع لتلقي الإشعارات",
    "opt_in": "أوافق على تلقي إشعارات حول إطلاق التطبيق عبر البريد الإلكتروني أو الرسائل القصيرة أو واتساب",
    "privacy_policy": "أوافق على سياسة الخصوصية *",
    "submit": "اشترك",
    "success": "شكرًا لك! سنتواصل معك قريبًا.",
    
    // Features
    "feature_timely_title": "تذكيرات في الوقت المناسب",
    "feature_timely_desc": "احصل على إشعارات قبل انتهاء صلاحية مستنداتك بوقت كافٍ",
    "feature_simple_title": "عملية بسيطة",
    "feature_simple_desc": "ما عليك سوى تحميل مستنداتك ونحن نتولى الباقي",
    "feature_secure_title": "تخزين آمن",
    "feature_secure_desc": "يتم تشفير بياناتك وتخزينها بشكل آمن",
    "feature_family_title": "إدارة وثائق العائلة",
    "feature_family_desc": "تتبع وثائق الجميع في مكان واحد - من جوازات سفر الأطفال إلى بطاقات هوية الوالدين",
    
    // Social Sharing
    "share_heading": "ساعد أصدقائك وعائلتك على البقاء على اطلاع أيضاً!",
    "share_subheading": "شارك رينيو ألرت مع شبكتك",
    
    // Countries Section
    "countries_title": "سيتم الإطلاق قريباً في",
    "countries_subtitle": "سيكون رينيو ألرت متاحاً في هذه البلدان لمساعدتك على تتبع مستنداتك المهمة",
    "countries_footer": "سيتم إضافة المزيد من البلدان قريباً! ترقبوا التحديثات.",
    "share_title": "رينيو ألرت - لا تفوت تجديدات الوثائق المهمة مرة أخرى!",
    "share_message": "لقد اشتركت للتو في رينيو ألرت للحصول على تذكيرات في الوقت المناسب لجواز سفري وتأشيرتي وتجديدات الهوية. لا مزيد من الذعر في اللحظة الأخيرة! انضم إلي هنا:"
  },
  hi: {
    // Hero Section
    "hero_title": "फिर कभी अपना आईडी नवीनीकरण न चूकें",
    "hero_subtitle": "अपने पासपोर्ट, लाइसेंस, निवास परमिट (इकामा), और वीज़ा के लिए समय पर रिमाइंडर प्राप्त करें उनके समाप्त होने से पहले",
    "hero_cta": "शीघ्र पहुंच प्राप्त करें",
    "expat_paragraph": "प्रवासियों, हम समझते हैं - दस्तावेज़ों का नवीनीकरण एक सिरदर्द है। पासपोर्ट, लाइसेंस, निवास परमिट (इकामा), वीज़ा - नवीनीकरण अभिभूत करने वाला और आसानी से छूट सकता है। हमारा आगामी मोबाइल ऐप आपके सभी महत्वपूर्ण नवीनीकरणों के लिए समय पर रिमाइंडर भेजने के लिए डिज़ाइन किया गया है, जिससे आपको आगे रहने और तनावमुक्त रहने में मदद मिलती है। आसानी से व्यवस्थित रहने की सुविधा का अनुभव करने वाले पहले व्यक्ति बनें।",
    
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
    "opt_in": "मैं ईमेल, एसएमएस, या व्हाट्सएप के माध्यम से ऐप लॉन्च के बारे में सूचनाएं प्राप्त करने के लिए सहमत हूं",
    "privacy_policy": "मैं गोपनीयता नीति से सहमत हूं *",
    "submit": "साइन अप करें",
    "success": "धन्यवाद! हम जल्द ही संपर्क में आएंगे।",
    "success_message": "जब रिन्यू अलर्ट लॉन्च होगा तो हम आपको सूचित करेंगे",
    "contact_recorded": "आपके संपर्क विवरण दर्ज कर लिए गए हैं। आप अब शीघ्र पहुंच सूची में हैं",
    "mobile_instruction": "कृपया देश कोड के साथ एक वैध मोबाइल नंबर दर्ज करें",
    
    // Features
    "feature_timely_title": "समय पर रिमाइंडर",
    "feature_timely_desc": "अपने दस्तावेज़ों की समाप्ति से पहले अधिसूचनाएं प्राप्त करें",
    "feature_simple_title": "सरल प्रक्रिया",
    "feature_simple_desc": "बस अपने दस्तावेज अपलोड करें और हम बाकी संभाल लेंगे",
    "feature_secure_title": "सुरक्षित स्टोरेज",
    "feature_secure_desc": "आपका डेटा एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है",
    "feature_family_title": "परिवार दस्तावेज़ प्रबंधन",
    "feature_family_desc": "सभी के दस्तावेज़ एक ही स्थान पर रखें - बच्चों के पासपोर्ट से लेकर बुजुर्ग माता-पिता के पहचान पत्र तक",
    
    // Social Sharing
    "share_heading": "दोस्तों और परिवार को भी अपडेट रहने में मदद करें!",
    "share_subheading": "रिन्यू अलर्ट को अपने नेटवर्क के साथ साझा करें",
    
    // Countries Section
    "countries_title": "जल्द ही लॉन्च होगा",
    "countries_subtitle": "रिन्यू अलर्ट आपके महत्वपूर्ण दस्तावेजों का ट्रैक रखने में मदद करने के लिए इन देशों में उपलब्ध होगा",
    "countries_footer": "जल्द ही और देश जोड़े जाएंगे! अपडेट के लिए बने रहें।",
    "share_title": "रिन्यू अलर्ट - फिर कभी महत्वपूर्ण दस्तावेज़ नवीनीकरण न चूकें!",
    "share_message": "मैंने अपने पासपोर्ट, वीज़ा और आईडी नवीनीकरण के लिए समय पर रिमाइंडर प्राप्त करने के लिए रिन्यू अलर्ट के लिए साइन अप किया है। अब आखिरी क्षण का घबराहट नहीं! मेरे साथ यहां शामिल हों:"
  }
};

// Create language map with language details
export const languageMap: Record<SupportedLanguage, { name: string, nativeName: string, flag: string, dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
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