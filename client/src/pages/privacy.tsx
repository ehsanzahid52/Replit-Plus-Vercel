import Navigation from '../components/Navigation';
import SEOHead from '../components/SEOHead';
import { useLanguageFromUrl } from '../components/LanguageRouter';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function Privacy() {
  const currentLanguage = useLanguageFromUrl();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Privacy Policy - GoldSniper"
        description="Privacy Policy for Gold Sniper - Forex Alerts app by Zilvy. Learn how we collect, use, and protect your personal data."
        keywords="privacy policy, data protection, forex alerts, gold sniper, trading app privacy"
        canonical={`https://goldsniper.io/${currentLanguage}/privacy`}
      />
      <Navigation currentPage="privacy" />

      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t('privacy.title')}
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none space-y-8">
              <div className="text-gray-300 leading-relaxed">
                <p className="text-lg mb-6">
                  {t('privacy.welcome')}<br />
                  {t('privacy.description')}<br />
                  {t('privacy.agreement')}
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  1. {t('privacy.sections.dataCollection.title')}
                </h2>
                <p className="mb-4">
                  {t('privacy.sections.dataCollection.subtitle')}
                </p>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[color:var(--brand-orange)] mb-3">
                    📌 {t('privacy.sections.dataCollection.infoWeCollect')}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-white">✅ Personal Information (User-Provided Data)</h4>
                      <p>Name, email address, and payment details (if subscribing to premium services).</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">✅ Device & Usage Information</h4>
                      <p>Device type, operating system, IP address (for geo-restrictions), and activity logs.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">✅ Location Data (For Geo-Blocking & Compliance)</h4>
                      <p>We may collect approximate location data to enforce geo-restrictions in the UK and other restricted regions.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[color:var(--brand-orange)] mb-3">
                    🔹 Why We Collect This Data
                  </h3>
                  <ul className="space-y-2">
                    <li>✅ To provide real-time market alerts and insights.</li>
                    <li>✅ To enforce geo-restrictions and comply with financial regulations.</li>
                    <li>✅ To process premium subscriptions and transactions.</li>
                    <li>✅ To improve app functionality, security, and user experience.</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  2. {t('privacy.sections.dataSharing.title')}
                </h2>
                <ul className="space-y-2 mb-6">
                  <li>✅ {t('privacy.sections.dataSharing.noSell')}</li>
                  <li>✅ {t('privacy.sections.dataSharing.shareWith')}</li>
                  <li className="ml-4">{t('privacy.sections.dataSharing.paymentProcessors')}</li>
                  <li className="ml-4">{t('privacy.sections.dataSharing.analyticsProviders')}</li>
                  <li className="ml-4">{t('privacy.sections.dataSharing.legalAuthorities')}</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  3. {t('privacy.sections.dataSecurity.title')}
                </h2>
                <ul className="space-y-2 mb-6">
                  <li>✅ {t('privacy.sections.dataSecurity.implement')}</li>
                  <li>✅ {t('privacy.sections.dataSecurity.noGuarantee')}</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  4. {t('privacy.sections.geoRestrictions.title')}
                </h2>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[color:var(--brand-orange)] mb-3">
                    ✅ {t('privacy.sections.geoRestrictions.notAvailable')}
                  </h3>
                  <ul className="space-y-2">
                    <li>{t('privacy.sections.geoRestrictions.ukRestriction')}</li>
                    <li>{t('privacy.sections.geoRestrictions.autoBlock')}</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  5. {t('privacy.sections.userRights.title')}
                </h2>
                <div className="mb-6">
                  <p className="mb-3">{t('privacy.sections.userRights.mayRequest')}</p>
                  <ul className="space-y-2">
                    <li>{t('privacy.sections.userRights.accountDeletion')}</li>
                    <li>{t('privacy.sections.userRights.dataCorrection')}</li>
                    <li>{t('privacy.sections.userRights.deleteContact')}</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  6. {t('privacy.sections.policyUpdates.title')}
                </h2>
                <p className="mb-6">
                  {t('privacy.sections.policyUpdates.description')}
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                  7. {t('privacy.sections.contact.title')}
                </h2>
                <p className="mb-6">
                  {t('privacy.sections.contact.description')}
                </p>
                <div className="space-y-2">
                  <p>{t('privacy.sections.contact.email')}</p>
                  <p>{t('privacy.sections.contact.company')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}