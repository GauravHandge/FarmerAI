export type Language = "en" | "mr" | "hi" | "gu" | "pa"

export const LANGUAGES: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
]

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    brandName: "KisanMitra",
    liveAgmarknet: "Agmarknet Live",
    marketPortal: "Market Portal",
    workbench: "Workbench",
    stateCrops: "State Crops",
    leafDoctor: "Leaf Doctor",
    aiAssistant: "AI Assistant",
    
    // Ticker & Carousel
    liveTickerTitle: "LIVE AGMARKNET TICKER:",
    heroTitle1: "Maharashtra Horticulture & Onion Capital",
    heroSubtitle1: "Real-time Mandi Rates for Lasalgaon Onion, Ratnagiri Hapoos & Nashik Grapes",
    heroTitle2: "Punjab & Haryana Basmati Granary",
    heroSubtitle2: "Pusa Basmati 1121 & Sharbati Wheat Mandi Advisory with 120B AI Vision",
    heroTitle3: "Gujarat Spices & Red Chilli Export Hub",
    heroSubtitle3: "Unjha Cumin Seeds & Guntur Teja Red Chilli Price Forecast & Leaf Scan",
    askAIAdvisory: "Ask AI Advisory",
    leafDiagnostic: "Leaf Diagnostic",
    
    // Categories
    browseCategory: "Browse Commodities by Category",
    allMandis: "All Mandis",
    vegetables: "Vegetables",
    spices: "Spices",
    cereals: "Cereals",
    fruits: "Fruits",
    cashCrops: "Cash Crops",
    profitEstimator: "Profit Estimator",
    
    // Search & Commodities
    searchPlaceholder: "Search Onion, Tomato, Cumin, Lasalgaon APMC...",
    showingCount: "Showing Commodities",
    liveMandiRate: "Live Mandi Rate",
    giTagged: "GI Tagged",
    perQuintal: "quintal",
    perBox: "box",

    // Mandi Modal & Floating Buttons
    mandiRadarBtn: "Real-Time Mandi Radar",
    askBotBtn: "Ask KisanMitra AI",
    mandiModalTitle: "Real-Time Agmarknet Mandi Intelligence",
    mandiModalSubtitle: "Official Ministry of Agriculture & Agmarknet verified rates across 50+ APMC Mandis",
    selectAPMC: "Select APMC Mandi",
    searchCropPlaceholder: "Search Onion, Tomato, Garlic, Cumin...",
    refreshRates: "Refresh Rates",
    updating: "Updating...",
    colCommodity: "Commodity & Crop",
    colMandi: "APMC Mandi",
    colMin: "Min Price",
    colMax: "Max Price",
    colModal: "Modal Price (⚡ Live)",
    colTrend: "24h Trend",
    colAction: "AI Action",
    askAI: "Ask AI",
  },

  mr: {
    // Brand & Header (मराठी)
    brandName: "किसानमित्र",
    liveAgmarknet: "ॲगमार्कनेट थेट",
    marketPortal: "बाजार पोर्टल",
    workbench: "वर्कबेंच",
    stateCrops: "राज्य पिके",
    leafDoctor: "पाने डॉक्टर",
    aiAssistant: "एआय सहाय्यक",
    
    // Ticker & Carousel
    liveTickerTitle: "थेट ॲगमार्कनेट बाजार भाव:",
    heroTitle1: "महाराष्ट्र फलोत्पादन व कांदा राजधानी",
    heroSubtitle1: "लासलगाव कांदा, रत्नागिरी हापूस आणि नाशिक द्राक्षांचे थेट बाजार भाव",
    heroTitle2: "पंजाब आणि हरियाणा बास्मती कोठार",
    heroSubtitle2: "पुसा बास्मती ११२१ आणि सरबती गव्हाचे थेट बाजार भाव व सल्ला",
    heroTitle3: "गुजरात मसाले व लाल मिरची निर्यात केंद्र",
    heroSubtitle3: "उंझा जिरे आणि गुंटूर लाल मिरची भाव अंदाज आणि पीक डॉक्टर",
    askAIAdvisory: "एआय सल्ला विचारा",
    leafDiagnostic: "रोग निदान करा",
    
    // Categories
    browseCategory: "वर्गवारीनुसार पिके आणि बाजार भाव",
    allMandis: "सर्व बाजार समित्या",
    vegetables: "भाज्या (Vegetables)",
    spices: "मसाले (Spices)",
    cereals: "धान्य (Cereals)",
    fruits: "फळे (Fruits)",
    cashCrops: "नकदी पिके (Cash Crops)",
    profitEstimator: "नफा मोजणी",
    
    // Search & Commodities
    searchPlaceholder: "कांदा, टोमॅटो, जिरे, लासलगाव बाजार समिती शोधा...",
    showingCount: "पिके दाखवत आहे",
    liveMandiRate: "थेट बाजार भाव",
    giTagged: "भौगोलिक मानांकन (GI)",
    perQuintal: "क्विंटल",
    perBox: "पेटी",

    // Mandi Modal & Floating Buttons
    mandiRadarBtn: "थेट बाजार भाव रडार",
    askBotBtn: "किसानमित्र एआय विचारा",
    mandiModalTitle: "थेट ॲगमार्कनेट कृषी बाजार भाव माहिती",
    mandiModalSubtitle: "कृषी मंत्रालय व ॲगमार्कनेट प्रमाणित ५०+ बाजार समित्यांचे थेट भाव",
    selectAPMC: "बाजार समिती निवडा",
    searchCropPlaceholder: "कांदा, टोमॅटो, लसूण, जिरे शोधा...",
    refreshRates: "भाव अद्ययावत करा",
    updating: "अद्ययावत होत आहे...",
    colCommodity: "पिक आणि वाण",
    colMandi: "कृषी उत्पन्न बाजार समिती",
    colMin: "कमीत कमी भाव",
    colMax: "जास्तीत जास्त भाव",
    colModal: "सर्वसाधारण भाव (⚡ थेट)",
    colTrend: "२४ तास कल",
    colAction: "एआय कृती",
    askAI: "एआय विचारा",
  },

  hi: {
    // Brand & Header (हिंदी)
    brandName: "किसानमित्र",
    liveAgmarknet: "एगमार्कनेट लाइव",
    marketPortal: "मंडी पोर्टल",
    workbench: "वर्कबेंच",
    stateCrops: "राज्य फसलें",
    leafDoctor: "पत्ती डॉक्टर",
    aiAssistant: "एआई सहायक",
    
    // Ticker & Carousel
    liveTickerTitle: "लाइव एगमार्कनेट मंडी भाव:",
    heroTitle1: "महाराष्ट्र बागवानी और प्याज राजधानी",
    heroSubtitle1: "लासलगांव प्याज, रत्नागिरी हापुस और नासिक अंगूर के लाइव मंडी भाव",
    heroTitle2: "पंजाब और हरियाणा बासमती अन्न भंडार",
    heroSubtitle2: "पूसा बासमती 1121 और शरबती गेहूं मंडी भाव और एआई सलाह",
    heroTitle3: "गुजरात मसाला और लाल मिर्च निर्यात केंद्र",
    heroSubtitle3: "ऊंझा जीरा और गुंटूर लाल मिर्च मूल्य पूर्वानुमान",
    askAIAdvisory: "एआई सलाह लें",
    leafDiagnostic: "रोग जांच करें",
    
    // Categories
    browseCategory: "श्रेणी के अनुसार फसलें देखें",
    allMandis: "सभी मंडियां",
    vegetables: "सब्जियां",
    spices: "मसाले",
    cereals: "अनाज",
    fruits: "फल",
    cashCrops: "नकदी फसलें",
    profitEstimator: "मुनाफा कैलकुलेटर",
    
    // Search & Commodities
    searchPlaceholder: "प्याज, टमाटर, जीरा, लासलगांव मंडी खोजें...",
    showingCount: "फसलें दिखाई जा रही हैं",
    liveMandiRate: "लाइव मंडी भाव",
    giTagged: "जीआई टैग प्राप्त",
    perQuintal: "कुंतल",
    perBox: "पेटी",

    // Mandi Modal & Floating Buttons
    mandiRadarBtn: "लाइव मंडी रेट रडार",
    askBotBtn: "किसानमित्र एआई से पूछें",
    mandiModalTitle: "लाइव एगमार्कनेट मंडी भाव सूचना पोर्टल",
    mandiModalSubtitle: "कृषि मंत्रालय एवं एगमार्कनेट द्वारा सत्यापित 50+ एपीएमसी मंडियों के लाइव भाव",
    selectAPMC: "मंडी चुनें",
    searchCropPlaceholder: "प्याज, टमाटर, लहसुन, जीरा खोजें...",
    refreshRates: "भाव अपडेट करें",
    updating: "अपडेट हो रहा है...",
    colCommodity: "फसल एवं किस्म",
    colMandi: "एपीएमसी मंडी",
    colMin: "न्यूनतम भाव",
    colMax: "अधिकतम भाव",
    colModal: "मॉडल भाव (⚡ लाइव)",
    colTrend: "24 घंटे का रुझान",
    colAction: "एआई सलाह",
    askAI: "सलाह लें",
  },

  gu: {
    // Brand & Header (ગુજરાતી)
    brandName: "કિસાનમિત્ર",
    liveAgmarknet: "એગમાર્કનેટ લાઇવ",
    marketPortal: "માર્કેટ પોર્ટલ",
    workbench: "વર્કબેન્ચ",
    stateCrops: "રાજ્યના પાક",
    leafDoctor: "પાંદડા ડોક્ટર",
    aiAssistant: "એઆઈ સહાયક",
    
    // Ticker & Carousel
    liveTickerTitle: "લાઇવ એગમાર્કનેટ માર્કેટ ભાવ:",
    heroTitle1: "મહારાષ્ટ્ર બાગાયત અને ડુંગળી રાજધાની",
    heroSubtitle1: "લાસલગાંવ ડુંગળી અને રત્નાગિરી હાપુસ કેરીના તાજા ભાવ",
    heroTitle2: "પંજાબ અને હરિયાણા બાસમતી અન્ન ભંડાર",
    heroSubtitle2: "પૂસા બાસમતી 1121 અને ઘઉંના માર્કેટ ભાવ અને એઆઈ સલાહ",
    heroTitle3: "ગુજરાત મસાલા અને લાલ મરચાં નિકાસ હબ",
    heroSubtitle3: "ઊંઝા જીરું અને ગુંટૂર મરચાંના માર્કેટ ભાવ",
    askAIAdvisory: "એઆઈ સલાહ લો",
    leafDiagnostic: "રોગ તબીબી તપાસ",
    
    // Categories
    browseCategory: "કેટેગરી મુજબ પાક અને ભાવ જુઓ",
    allMandis: "તમામ યાર્ડ",
    vegetables: "શાકભાજી",
    spices: "મસાલા",
    cereals: "અનાજ",
    fruits: "ફળો",
    cashCrops: "રોકડિયા પાક",
    profitEstimator: "નફા ગણતરી",
    
    // Search & Commodities
    searchPlaceholder: "ડુંગળી, ટામેટાં, જીરું, ઊંઝા યાર્ડ શોધો...",
    showingCount: "પાક દર્શાવવામાં આવ્યા છે",
    liveMandiRate: "લાઇવ યાર્ડ ભાવ",
    giTagged: "જીઆઈ ટેગ ધરાવતું",
    perQuintal: "ક્વિન્ટલ",
    perBox: "બોક્સ",

    // Mandi Modal & Floating Buttons
    mandiRadarBtn: "લાઇવ યાર્ડ ભાવ રડાર",
    askBotBtn: "કિસાનમિત્ર એઆઈ ને પૂછો",
    mandiModalTitle: "લાઇવ એગમાર્કનેટ માર્કેટ યાર્ડ માહિતી",
    mandiModalSubtitle: "કૃષિ મંત્રાલય દ્વારા ચકાસાયેલ 50+ માર્કેટ યાર્ડના લાઈવ ભાવ",
    selectAPMC: "માર્કેટ યાર્ડ પસંદ કરો",
    searchCropPlaceholder: "ડુંગળી, ટામેટાં, લસણ, જીરું શોધો...",
    refreshRates: "ભાવ અપડેટ કરો",
    updating: "અપડેટ થઈ રહ્યું છે...",
    colCommodity: "પાક અને જાત",
    colMandi: "માર્કેટ યાર્ડ",
    colMin: "ઓછામાં ઓછો ભાવ",
    colMax: "વધુમાં વધુ ભાવ",
    colModal: "સરેરાશ ભાવ (⚡ લાઇવ)",
    colTrend: "24 કલાકનો ટ્રેન્ડ",
    colAction: "એઆઈ એક્શન",
    askAI: "સલાહ લો",
  },

  pa: {
    // Brand & Header (ਪੰਜਾਬੀ)
    brandName: "ਕਿਸਾਨਮਿੱਤਰ",
    liveAgmarknet: "ਐਗਮਾਰਕਨੈੱਟ ਲਾਈਵ",
    marketPortal: "ਮੰਡੀ ਪੋਰਟਲ",
    workbench: "ਵਰਕਬੈਂਚ",
    stateCrops: "ਰਾਜ ਦੀਆਂ ਫਸਲਾਂ",
    leafDoctor: "ਪੱਤਾ ਡਾਕਟਰ",
    aiAssistant: "ਏਆਈ ਸਹਾਇਕ",
    
    // Ticker & Carousel
    liveTickerTitle: "ਲਾਈਵ ਐਗਮਾਰਕਨੈੱਟ ਮੰਡੀ ਭਾਅ:",
    heroTitle1: "ਮਹਾਰਾਸ਼ਟਰ ਬਾਗਬਾਨੀ ਅਤੇ ਪਿਆਜ਼ ਰਾਜਧਾਨੀ",
    heroSubtitle1: "ਲਾਸਲਗਾਓਂ ਪਿਆਜ਼ ਅਤੇ ਹਾਪੁਸ ਅੰਬ ਦੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
    heroTitle2: "ਪੰਜਾਬ ਅਤੇ ਹਰਿਆਣਾ ਬਾਸਮਤੀ ਦਾ ਕੋਠਾ",
    heroSubtitle2: "ਪੂਸਾ ਬਾਸਮਤੀ 1121 ਅਤੇ ਸ਼ਰਬਤੀ ਕਣਕ ਦੇ ਮੰਡੀ ਭਾਅ ਅਤੇ ਏਆਈ ਸਲਾਹ",
    heroTitle3: "ਗੁਜਰਾਤ ਮਸਾਲੇ ਅਤੇ ਲਾਲ ਮਿਰਚ ਨਿਰਯਾਤ ਕੇਂਦਰ",
    heroSubtitle3: "ਊਂਝਾ ਜੀਰਾ ਅਤੇ ਗੁੰਟੂਰ ਲਾਲ ਮਿਰਚ ਮੰਡੀ ਭਾਅ",
    askAIAdvisory: "ਏਆਈ ਸਲਾਹ ਲਵੋ",
    leafDiagnostic: "ਬੀਮਾਰੀ ਦੀ ਜਾਂਚ",
    
    // Categories
    browseCategory: "ਕੈਟੇਗਰੀ ਅਨੁਸਾਰ ਫਸਲਾਂ ਵੇਖੋ",
    allMandis: "ਸਾਰੀਆਂ ਮੰਡੀਆਂ",
    vegetables: "ਸਬਜ਼ੀਆਂ",
    spices: "ਮਸਾਲੇ",
    cereals: "ਅਨਾਜ",
    fruits: "ਫਲ",
    cashCrops: "ਨਕਦੀ ਫਸਲਾਂ",
    profitEstimator: "ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ",
    
    // Search & Commodities
    searchPlaceholder: "ਪਿਆਜ਼, ਟਮਾਟਰ, ਜੀਰਾ, ਖੰਨਾ ਮੰਡੀ ਖੋਜੋ...",
    showingCount: "ਫਸਲਾਂ ਦਿਖਾਈਆਂ ਜਾ ਰਹੀਆਂ ਹਨ",
    liveMandiRate: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
    giTagged: "ਜੀਆਈ ਟੈਗ ਪ੍ਰਾਪਤ",
    perQuintal: "ਕੁਇੰਟਲ",
    perBox: "ਪੇਟੀ",

    // Mandi Modal & Floating Buttons
    mandiRadarBtn: "ਲਾਈਵ ਮੰਡੀ ਰਡਾਰ",
    askBotBtn: "ਕਿਸਾਨਮਿੱਤਰ ਏਆਈ ਨੂੰ ਪੁੱਛੋ",
    mandiModalTitle: "ਲਾਈਵ ਐਗਮਾਰਕਨੈੱਟ ਮੰਡੀ ਭਾਅ ਪੋਰਟਲ",
    mandiModalSubtitle: "ਖੇਤੀਬਾੜੀ ਮੰਤਰਾਲੇ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ 50+ ਮੰਡੀਆਂ ਦੇ ਲਾਈਵ ਭਾਅ",
    selectAPMC: "ਮੰਡੀ ਚੁਣੋ",
    searchCropPlaceholder: "ਪਿਆਜ਼, ਟਮਾਟਰ, ਲਸਣ, ਜੀਰਾ ਖੋਜੋ...",
    refreshRates: "ਭਾਅ ਅਪਡੇਟ ਕਰੋ",
    updating: "ਅਪਡੇਟ ਹੋ ਰਿਹਾ ਹੈ...",
    colCommodity: "ਫਸਲ ਅਤੇ ਕਿਸਮ",
    colMandi: "ਏਪੀਐਮਸੀ ਮੰਡੀ",
    colMin: "ਘੱਟੋ-ਘੱਟ ਭਾਅ",
    colMax: "ਵੱਧ ਤੋਂ ਵੱਧ ਭਾਅ",
    colModal: "ਔਸਤ ਭਾਅ (⚡ ਲਾਈਵ)",
    colTrend: "24 ਘੰਟੇ ਦਾ ਰੁਝਾਨ",
    colAction: "ਏਆਈ ਸਲਾਹ",
    askAI: "ਸਲਾਹ ਲਵੋ",
  },
}
