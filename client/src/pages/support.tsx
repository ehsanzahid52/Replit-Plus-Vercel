import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Mail, MessageCircle, HelpCircle, Bug, Star, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';
import { Button } from '../components/ui/button';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export default function Support() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageFromUrl();
  
  // Add early loading state to prevent white flash
  if (!t || !currentLanguage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[color:var(--brand-orange)] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
    honeypot: '', // Bot protection honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(false);
  const [faqError, setFaqError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Move reasons array inside component to ensure i18n is loaded
  const reasons = (() => {
    try {
      return [
        { value: 'general', label: t('support.reasons.general', 'General Inquiry'), icon: MessageCircle },
        { value: 'technical', label: t('support.reasons.technical', 'Technical Support'), icon: HelpCircle },
        { value: 'bug', label: t('support.reasons.bug', 'Bug Report'), icon: Bug },
        { value: 'feedback', label: t('support.reasons.feedback', 'Feedback'), icon: Star },
      ];
    } catch (error) {
      console.error('Error loading support reasons:', error);
      return [
        { value: 'general', label: 'General Inquiry', icon: MessageCircle },
        { value: 'technical', label: 'Technical Support', icon: HelpCircle },
        { value: 'bug', label: 'Bug Report', icon: Bug },
        { value: 'feedback', label: 'Feedback', icon: Star },
      ];
    }
  })();

  // Use dynamic FAQ data from API with static fallback
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

  const toggleFaqExpansion = (faqId: number) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot protection: if honeypot is filled, it's likely a bot
    if (formData.honeypot) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link for now (can be replaced with API endpoint later)
      const subject = `[${reasons.find(r => r.value === formData.reason)?.label || 'Support'}] ${formData.name}`;
      const body = `Name: ${formData.name}
Email: ${formData.email}
Reason: ${reasons.find(r => r.value === formData.reason)?.label || formData.reason}

Message:
${formData.message}

---
Sent from GoldSniper Support Form`;

      const mailtoLink = `mailto:info@goldsniper.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SEOHead 
          title={`${t('nav.support')} - GoldSniper`}
          description="Contact GoldSniper support team for technical assistance, feedback, and general inquiries."
          keywords="goldsniper support, contact, help, technical support"
          canonical={`https://goldsniper.io/${currentLanguage}/support`}
        />
        <Navigation currentPage="support" />
        
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('support.success.title', 'Message Sent Successfully!')}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              {t('support.success.description', 'Your email client should have opened with your message. If not, please send your message manually to info@goldsniper.io')}
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-3 px-6 rounded-xl"
            >
              {t('support.success.sendAnother', 'Send Another Message')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title={`${t('nav.support')} - GoldSniper`}
        description="Contact GoldSniper support team for technical assistance, feedback, and general inquiries."
        keywords="goldsniper support, contact, help, technical support"
        canonical={`https://goldsniper.io/${currentLanguage}/support`}
      />
      <Navigation currentPage="support" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('support.title', 'Contact Support')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('support.subtitle', 'Need help? Have questions? We\'re here to assist you with any inquiries about GoldSniper.')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {t('support.form.title', 'Send us a message')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field for bot protection - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('support.form.name', 'Your Name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[color:var(--brand-orange)] transition-colors"
                  placeholder={t('support.form.namePlaceholder', 'Enter your full name')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('support.form.email', 'Email Address')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[color:var(--brand-orange)] transition-colors"
                  placeholder={t('support.form.emailPlaceholder', 'your.email@example.com')}
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('support.form.reason', 'Reason for Contact')} *
                </label>
                <select
                  id="reason"
                  name="reason"
                  required
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[color:var(--brand-orange)] transition-colors"
                >
                  <option value="">{t('support.form.reasonPlaceholder', 'Select a reason')}</option>
                  {reasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('support.form.message', 'Message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[color:var(--brand-orange)] transition-colors resize-none"
                  placeholder={t('support.form.messagePlaceholder', 'Please describe your inquiry in detail...')}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[color:var(--brand-orange)] hover:bg-[color:var(--amber-accent)] text-black font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('support.form.sending', 'Sending...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('support.form.send', 'Send Message')}</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('support.contact.title', 'Other ways to reach us')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[color:var(--brand-orange)]" />
                  <div>
                    <p className="text-white font-medium">{t('support.contact.email', 'Email')}</p>
                    <a href="mailto:info@goldsniper.io" className="text-gray-400 hover:text-[color:var(--brand-orange)] transition-colors">
                      info@goldsniper.io
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('support.faq.title', 'Common Questions')}
              </h3>
              
              <div className="space-y-4">
                {reasons.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <div key={reason.value} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <Icon className="w-5 h-5 text-[color:var(--brand-orange)]" />
                      <span className="text-gray-300">{reason.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('support.faqs.title', 'Frequently Asked Questions')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('support.faqs.subtitle', 'Find answers to the most common questions about GoldSniper')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {isLoadingFaqs ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-900 rounded-3xl p-6 border border-gray-800 animate-pulse">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : faqError ? (
              <div className="bg-red-900/20 border border-red-800 rounded-3xl p-8 text-center">
                <HelpCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-400 text-lg">{faqError}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                  >
                    <button
                      onClick={() => toggleFaqExpansion(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-orange)] focus:ring-inset"
                    >
                      <h3 className="text-lg font-semibold text-white pr-4">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-[color:var(--brand-orange)] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-700 pt-4">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}