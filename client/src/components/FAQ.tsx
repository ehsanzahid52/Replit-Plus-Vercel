import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(false);
  const [faqError, setFaqError] = useState<string | null>(null);
  const { t } = useTranslation();

  // Fetch FAQs from the same API endpoint as the support page
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoadingFaqs(true);
        setFaqError(null);
        
        const response = await fetch('https://x7kt-9pgq-melx.n7.xano.io/api:47ignXdD/faqs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        
        const data = await response.json();
        // The API returns { faqs: [...], support_email: "..." }
        if (data.faqs && Array.isArray(data.faqs)) {
          setFaqs(data.faqs);
        } else {
          throw new Error('Invalid FAQ data format');
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setFaqError('Failed to load FAQs. Showing offline content.');
        // Enhanced static fallback data based on API response
        setFaqs([
          {
            id: 1,
            question: "What is Gold Signals?",
            answer: "Gold Signals is an educational platform that provides market insights and analysis to help traders learn about Forex trading. We share trade ideas, but these are for informational purposes only."
          },
          {
            id: 2,
            question: "Are these signals financial advice?",
            answer: "No. We do not provide financial or investment advice. Our content is purely educational, and you are responsible for making your own trading decisions."
          },
          {
            id: 3,
            question: "Does following your signals guarantee profits?",
            answer: "No. Trading is risky, and results vary. Markets are unpredictable, and you should never trade more than you can afford to lose."
          },
          {
            id: 4,
            question: "Who can use Gold signals?",
            answer: "Our platform is for anyone interested in learning about market movements. Beginners and experienced traders can use it for educational purposes."
          },
          {
            id: 5,
            question: "How often do you provide trade ideas?",
            answer: "We share market insights when we identify potential setups, but there is no fixed schedule."
          },
          {
            id: 6,
            question: "Why didn't I receive notifications for new signals?",
            answer: "Some devices restrict background activity. To receive notifications properly, disable battery-saving restrictions for this app in your phone settings."
          },
          {
            id: 7,
            question: "Do I need money to start using this app?",
            answer: "No. The app is for education only. If you choose to trade, you must do so through a broker, at your own discretion."
          },
          {
            id: 8,
            question: "What happens if I miss a signal?",
            answer: "If you miss a signal, wait for the next one. Never enter a trade too late, as market conditions may have changed."
          },
          {
            id: 9,
            question: "Can users from the UK trade based on this app?",
            answer: "No. Due to FCA regulations, users in the United Kingdom are not permitted to use our app for trading purposes. If you are based in the UK, please do not attempt to use our service for trading activities."
          }
        ]);
      } finally {
        setIsLoadingFaqs(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">{t('faq.title')}</h2>
          <p className="text-lg text-gray-400">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="space-y-4">
          {isLoadingFaqs ? (
            // Loading skeleton
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg border border-gray-700 p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
              </div>
            ))
          ) : faqError ? (
            // Error state
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-8 text-center">
              <HelpCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 text-lg">{faqError}</p>
            </div>
          ) : (
            // FAQ items
            faqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-750 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[color:var(--brand-orange)]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[color:var(--brand-orange)]" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}