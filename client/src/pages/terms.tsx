import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function Terms() {
  const currentLanguage = useLanguageFromUrl();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Terms of Service - GoldSniper"
        description="Terms of Service for Gold Sniper - Forex Alerts app. Understand your rights and obligations when using our trading alerts service."
        keywords="terms of service, forex alerts, gold sniper, trading app terms, user agreement"
        canonical={`https://goldsniper.io/${currentLanguage}/terms`}
      />
      <Navigation currentPage="terms" />

      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t('terms.title')}
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none space-y-8">
              <div className="text-gray-300 leading-relaxed">
                
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  1. {t('terms.sections.acceptance.title')}
                </h2>
                <p className="mb-6">
                  {t('terms.sections.acceptance.description')}
                </p>
                <p className="mb-6">
                  {t('terms.sections.acceptance.privacyAgreement')}
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  2. {t('terms.sections.informational.title')}
                </h2>
                <ul className="space-y-2 mb-4">
                  <li>✅ Gold Sniper - Forex Alerts provides financial market insights, alerts, and analysis purely for informational and educational purposes.</li>
                  <li>✅ We DO NOT provide investment advice, financial planning, brokerage, or trading execution services.</li>
                  <li>✅ We do not guarantee any profits, returns, or success in trading based on the information provided in the App.</li>
                </ul>
                <p className="mb-3">You acknowledge and agree that:</p>
                <ul className="space-y-2 mb-6">
                  <li>No content in the App should be considered investment or trading advice.</li>
                  <li>We are not responsible for financial losses incurred due to reliance on information provided in the App.</li>
                  <li>You should consult a licensed financial professional before making any trading or investment decisions.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  3. {t('terms.sections.eligibility.title')}
                </h2>
                <ul className="space-y-2 mb-6">
                  <li>✅ The App is intended for users 18 years or older.</li>
                  <li>✅ <strong>Not Available in Certain Regions</strong> – The App is not intended for users in the United Kingdom. If you are in a restricted region, you must immediately discontinue use of the App.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  4. No Trading Execution or Brokerage Services
                </h2>
                <ul className="space-y-2 mb-6">
                  <li>✅ We do NOT provide brokerage services, trading execution, or financial transactions.</li>
                  <li>✅ Any trading actions taken based on the App's information are solely at your own risk.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="mb-3">✅ We are not responsible for:</p>
                <ul className="space-y-2 mb-4">
                  <li>Market losses, failed trades, or financial damages resulting from the use of the App.</li>
                  <li>Any inaccuracies, delays, or omissions in market alerts or data.</li>
                  <li>Any unauthorized access, hacking, or security breaches affecting the App.</li>
                </ul>
                <p className="mb-6 font-semibold text-[color:var(--brand-orange)]">
                  ⚠️ By using the App, you waive any legal claims against us related to trading decisions, market conditions, or financial outcomes.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  6. Subscription & Payments
                </h2>
                <ul className="space-y-2 mb-6">
                  <li>Some features of the App are available through premium subscriptions.</li>
                  <li>Payments are processed through third-party providers (Google Play / Apple App Store).</li>
                  <li>Subscriptions automatically renew unless canceled before the renewal date.</li>
                  <li>No refunds are issued for partially used subscription periods.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  7. User Conduct & Prohibited Activities
                </h2>
                <p className="mb-3">✅ You agree NOT to:</p>
                <ul className="space-y-2 mb-6">
                  <li>Use the App for illegal financial activities or investment fraud.</li>
                  <li>Copy, scrape, or distribute content from the App.</li>
                  <li>Share, sell, or distribute premium content without authorization.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  8. Termination of Use
                </h2>
                <p className="mb-3">We reserve the right to suspend or terminate access to the App if:</p>
                <ul className="space-y-2 mb-6">
                  <li>You violate these Terms or engage in fraudulent activity.</li>
                  <li>You attempt to access the App from geo-restricted regions (e.g., UK).</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  9. Changes to Terms
                </h2>
                <p className="mb-6">
                  We may update these Terms from time to time. Continued use of the App after changes means you accept the revised Terms.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  10. Contact Us
                </h2>
                <p>
                  For any questions about these Terms, contact us at: <a href="mailto:info@goldsniper.io" className="text-[color:var(--brand-orange)] hover:underline">info@goldsniper.io</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}