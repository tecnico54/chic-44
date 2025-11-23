import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Icon } from './Icon';

export const Footer: React.FC = () => {
    const { t } = useTranslation();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand & Social */}
            <div>
                <h3 className="font-bold text-lg tracking-widest text-white mb-2">CHIC 44</h3>
                <p className="text-sm text-gray-400 mb-4">{t('brand_subtitle')}</p>
                <div className="flex space-x-4">
                    <a href="https://www.instagram.com/novedaddelbolso?utm_source=qr&igsh=MTVzNmdhOGl5NHhheg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram Novedad del Bolso">
                        <Icon type="instagram" className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/chic44boutique?utm_source=qr&igsh=azluNjZnY2w0cTVs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram Chic 44 Boutique">
                        <Icon type="instagram" className="h-6 w-6" />
                    </a>
                </div>
            </div>

            {/* Column 2: La Empresa */}
            <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">{t('footer_company')}</h3>
                <p className="text-sm text-gray-400">
                  {t('footer_company_text')}
                </p>
            </div>

            {/* Column 3: Nuestras Tiendas */}
            <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">{t('footer_our_stores')}</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li>
                        <strong className="text-white">{t('footer_store_copacabana')}</strong>
                        <p>{t('footer_store_copacabana_address')}</p>
                    </li>
                    <li>
                        <strong className="text-white">{t('footer_store_girardota')}</strong>
                        <p>{t('footer_store_girardota_address')}</p>
                    </li>
                    <li>
                        <strong className="text-white">{t('footer_store_barbosa')}</strong>
                        <p>{t('footer_store_barbosa_address_1')}</p>
                        <p>{t('footer_store_barbosa_address_2')}</p>
                    </li>
                </ul>
            </div>
            
            {/* Column 4: Contacto e Info */}
            <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">{t('footer_contact')}</h3>
                <ul className="space-y-2">
                    <li>
                        <a href={`mailto:${t('footer_contact_email')}`} className="text-gray-400 hover:text-white hover:underline text-sm break-all">{t('footer_contact_email')}</a>
                    </li>
                </ul>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4 mt-6">{t('footer_info')}</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-gray-400 hover:text-white hover:underline text-sm">{t('footer_terms')}</a>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-xs">
            {t('footer_copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
