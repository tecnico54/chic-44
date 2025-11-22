
import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Page, Category, MainCategory, Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/LanguageContext';
import { Icon } from './Icon';
import { mockProducts } from '../data/mockData';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    onCategoryClick: (category: Category) => void;
    onProductClick: (product: Product) => void;
}

interface NavItemData {
    label: string;
    key: string;
    items?: NavItemData[];
}

interface NavSection {
    title: string;
    categoryKey: Category;
    items: NavItemData[];
    promoImage?: {
        src: string;
        alt: string;
        titleKey: string;
    };
}

const NavItem: React.FC<{
    label: MainCategory;
    onCategoryClick: (category: Category) => void;
    sections: NavSection[];
}> = ({ label, onCategoryClick, sections }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();
    const promoSection = sections.find(s => s.promoImage);

    return (
        <div 
            className="relative" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="text-base tracking-wider uppercase hover:text-gray-300 transition-colors duration-200 py-4">{label}</button>
            {isHovered && sections.length > 0 && (
                <div className="absolute top-full left-0 w-max bg-white shadow-lg p-6 z-20 border-t border-gray-100 text-gray-800">
                    <div className="flex">
                       <div className="flex gap-x-12">
                           {sections.map(section => (
                               <div key={section.categoryKey} className="min-w-[160px]">
                                   <h3 className="font-bold text-sm uppercase mb-3">{section.title}</h3>
                                   <ul className="space-y-1">
                                       {section.items.map((item) => (
                                           <li key={item.key} className="relative group/sub">
                                                <a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(section.categoryKey); }} className="flex justify-between items-center text-sm text-gray-600 hover:text-black py-1">
                                                    {item.label}
                                                    {item.items && (
                                                        <svg className="h-4 w-4 text-gray-400 ml-2 opacity-0 group-hover/sub:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    )}
                                                </a>
                                                {item.items && (
                                                    <div className="absolute left-[calc(100%+1rem)] -top-2 bg-white shadow-lg p-4 hidden group-hover/sub:block z-30 min-w-[180px] border border-gray-100">
                                                        <ul className="space-y-1">
                                                            {item.items.map(subItem => (
                                                                <li key={subItem.key}>
                                                                    <a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(section.categoryKey); }} className="block text-sm text-gray-600 hover:text-black py-1 whitespace-nowrap">
                                                                        {subItem.label}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                           </li>
                                       ))}
                                       <li><a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(section.categoryKey); }} className="block text-sm text-black font-semibold underline py-1 mt-3">{t('view_all')}</a></li>
                                   </ul>
                               </div>
                           ))}
                       </div>
                        {promoSection && promoSection.promoImage && (
                            <div className="ml-12 border-l border-gray-100 pl-12">
                                <a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(promoSection.categoryKey); }} className="block group">
                                    <div className="w-48 h-48 bg-gray-100 overflow-hidden rounded-md">
                                        <img src={promoSection.promoImage.src} alt={promoSection.promoImage.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <h4 className="mt-3 font-semibold text-sm text-gray-800">{t(promoSection.promoImage.titleKey)}</h4>
                                    <p className="text-xs text-gray-500 group-hover:text-black group-hover:underline">{t('view_all')}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const Header: React.FC<HeaderProps> = ({ onNavigate, onCategoryClick, onProductClick }) => {
    const { cartCount } = useCart();
    const { t, language, setLanguage, formatPrice } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileMain, setExpandedMobileMain] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchResults, setSearchResults] = useState<{ categories: {label: string, categoryKey: Category}[], products: Product[] }>({ categories: [], products: [] });

    
    const mainCategories: { key: string, label: string }[] = [
        { key: 'woman', label: t('nav_woman') },
        { key: 'man', label: t('nav_man') },
        { key: 'discounts', label: t('nav_discounts') }
    ];

    // Shared Bag Categories
    const bagsSection: NavSection = {
        title: t('category_bags'),
        categoryKey: 'Bolsos',
        items: [
            { label: t('subcategory_bags_office'), key: 'office' },
            { label: t('subcategory_bags_purses'), key: 'purses' },
            { label: t('subcategory_bags_crossbody'), key: 'crossbody' },
            { label: t('subcategory_bags_baul'), key: 'baul' },
            { label: t('subcategory_bags_morral_fashion'), key: 'morral_fashion' },
            {
                label: t('subcategory_bags_morral_lona'),
                key: 'morral_lona',
                items: [
                    { label: 'Morral Lona Lens', key: 'lens' },
                    { label: 'Morral Lona Maoss', key: 'maoss' },
                    { label: 'Morral Lona Motta', key: 'motta' }
                ]
            },
            { label: t('subcategory_bags_maletin'), key: 'maletin' },
            { label: t('subcategory_bags_deportivo'), key: 'deportivo' },
        ],
        promoImage: {
            src: 'https://res.cloudinary.com/dt1rhz43z/image/upload/v1762976063/2_sjgw7w.png',
            alt: 'Promoción de Morrales Fashion',
            titleKey: 'subcategory_bags_morral_fashion'
        }
    };

    // Shared Accessories Categories
    const accessoriesSection: NavSection = {
        title: t('category_accessories'),
        categoryKey: 'Accesorios',
        items: [
            { label: t('subcategory_accessories_tula'), key: 'tula' },
            { label: t('subcategory_accessories_rinonera'), key: 'rinonera' },
            { label: t('subcategory_accessories_lonchera'), key: 'lonchera' },
            { label: t('subcategory_accessories_billetera'), key: 'billetera' },
            { label: t('subcategory_accessories_monedero'), key: 'monedero' },
            { label: t('subcategory_accessories_tarjetero'), key: 'tarjetero' },
            { label: t('subcategory_accessories_gorra'), key: 'gorra' },
            { label: t('subcategory_accessories_cinturon'), key: 'cinturon' },
        ]
    };

    // Specific Women's Clothing
    const womanMenuSections: NavSection[] = useMemo(() => [
        bagsSection,
        {
            title: t('category_clothing'),
            categoryKey: 'Ropa',
            items: [
                 { label: t('subcategory_clothing_blusa'), key: 'blusa' },
                 { label: t('subcategory_clothing_pantalon'), key: 'pantalon' },
                 { label: t('subcategory_clothing_jeans'), key: 'jeans' },
                 { label: t('subcategory_clothing_falda'), key: 'falda' },
                 { label: t('subcategory_clothing_vestido'), key: 'vestido' },
                 { label: t('subcategory_clothing_deportivo'), key: 'ropa_deportivo' },
                 { label: t('subcategory_clothing_sueter'), key: 'sueter' },
                 { label: t('subcategory_clothing_blazer'), key: 'blazer' },
            ]
        },
        accessoriesSection
    ], [t]);

    // Specific Men's Clothing
    const manMenuSections: NavSection[] = useMemo(() => [
        bagsSection,
        {
            title: t('category_clothing'),
            categoryKey: 'Ropa',
            items: [
                 { label: t('subcategory_clothing_camiseta'), key: 'camiseta' },
                 { label: t('subcategory_clothing_pantaloneta'), key: 'pantaloneta' },
                 { label: t('subcategory_clothing_jogger'), key: 'jogger' },
                 { label: t('subcategory_clothing_deportivo'), key: 'ropa_deportivo' },
                 { label: t('subcategory_clothing_sueter'), key: 'sueter' },
                 { label: t('subcategory_clothing_ropa_verano'), key: 'ropa_verano' },
            ]
        },
        accessoriesSection
    ], [t]);

    const getSectionsForCategory = (key: string): NavSection[] => {
        if (key === 'woman') {
            return womanMenuSections;
        } else if (key === 'man') {
            return manMenuSections;
        }
        return [];
    };

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const toggleMobileMain = (key: string) => {
        setExpandedMobileMain(prev => prev === key ? null : key);
    };
    
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Further search actions can be implemented here if needed
    };

    const handleCategoryResultClick = (category: Category) => {
        onCategoryClick(category);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleProductResultClick = (product: Product) => {
        onProductClick(product);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const lowerCaseQuery = searchQuery.toLowerCase();

            const allNavItems: { label: string; categoryKey: Category }[] = [];
            const addedLabels = new Set<string>();

            [...womanMenuSections, ...manMenuSections].forEach(section => {
                section.items.forEach(item => {
                    if (!addedLabels.has(item.label)) {
                        allNavItems.push({ label: item.label, categoryKey: section.categoryKey });
                        addedLabels.add(item.label);
                    }
                    if (item.items) {
                        item.items.forEach(subItem => {
                            if (!addedLabels.has(subItem.label)) {
                                allNavItems.push({ label: subItem.label, categoryKey: section.categoryKey });
                                addedLabels.add(subItem.label);
                            }
                        });
                    }
                });
            });

            const filteredCategories = allNavItems.filter(item =>
                item.label.toLowerCase().includes(lowerCaseQuery)
            );
            
            const filteredProducts = mockProducts.filter(product =>
                t(product.nameKey).toLowerCase().includes(lowerCaseQuery)
            ).slice(0, 4);

            setSearchResults({ categories: filteredCategories, products: filteredProducts });
        } else {
            setSearchResults({ categories: [], products: [] });
        }
    }, [searchQuery, t, womanMenuSections, manMenuSections]);

    useEffect(() => {
        if (isMobileMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen, isSearchOpen]);

    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
        <header className="bg-black text-white sticky top-0 z-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side: Hamburger, Logo & Nav */}
                    <div className="flex items-center">
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 -ml-2 text-white hover:text-gray-300"
                                aria-label="Abrir menú"
                            >
                                <Icon type="menu" />
                            </button>
                        </div>

                        {/* Unified Logo */}
                        <div className="flex shrink-0 mx-2 sm:mx-4">
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex flex-col items-start">
                                <span className="text-2xl sm:text-3xl font-bold tracking-widest">CHIC 44</span>
                                <span className="text-sm tracking-wider text-gray-300">{t('brand_subtitle')}</span>
                            </a>
                        </div>
                        
                        <nav className="hidden md:flex items-center space-x-8 ml-6">
                            {mainCategories.map(cat => (
                                <NavItem 
                                    key={cat.key} 
                                    label={cat.label as MainCategory} 
                                    onCategoryClick={onCategoryClick} 
                                    sections={getSectionsForCategory(cat.key)}
                                />
                            ))}
                        </nav>
                    </div>
                    
                    {/* Right side: Icons */}
                    <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                        <button onClick={() => setIsSearchOpen(true)} className="p-2 text-white hover:text-gray-300" aria-label={t('search_aria_label')}>
                            <Icon type="search" className="h-7 w-7" />
                        </button>
                        <button onClick={() => onNavigate('profile')} className="p-2 text-white hover:text-gray-300">
                            <Icon type="user" className="h-7 w-7" />
                        </button>
                        <button onClick={() => onNavigate('cart')} className="p-2 text-white hover:text-gray-300 relative" aria-label={t('cart_aria_label').replace('{count}', cartCount.toString())}>
                            <Icon type="cart" className="h-7 w-7" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
                            )}
                        </button>
                        <button onClick={toggleLanguage} className="p-2">
                            {language === 'es' ? (
                                <svg width="28" height="21" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="18" fill="#FFCD00"/>
                                    <rect y="9" width="24" height="9" fill="#003087"/>
                                    <rect y="13.5" width="24" height="4.5" fill="#C1272D"/>
                                </svg>
                            ) : (
                                <svg width="28" height="21" viewBox="0 0 72 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H72V54H0V0Z" fill="#BF0A30"/>
                                    <path d="M0 9H72V18H0V9ZM0 27H72V36H0V27ZM0 45H72V54H0V45Z" fill="white"/>
                                    <path d="M0 0H36V27H0V0Z" fill="#002868"/>
                                    <g fill="white">
                                        <path d="M7.2 4.5L8.18554 7.42705H11.2222L8.71833 9.27295L9.70387 12.2L7.2 10.3541L4.69613 12.2L5.68167 9.27295L3.17778 7.42705H6.21446L7.2 4.5Z"/>
                                        <path d="M14.4 4.5L15.3855 7.42705H18.4222L15.9183 9.27295L16.9039 12.2L14.4 10.3541L11.8961 12.2L12.8817 9.27295L10.3778 7.42705H13.4145L14.4 4.5Z"/>
                                        <path d="M21.6 4.5L22.5855 7.42705H25.6222L23.1183 9.27295L24.1039 12.2L21.6 10.3541L19.0961 12.2L20.0817 9.27295L17.5778 7.42705H20.6145L21.6 4.5Z"/>
                                        <path d="M28.8 4.5L29.7855 7.42705H32.8222L30.3183 9.27295L31.3039 12.2L28.8 10.3541L26.2961 12.2L27.2817 9.27295L24.7778 7.42705H27.8145L28.8 4.5Z"/>
                                        <path d="M7.2 13.5L8.18554 16.4271H11.2222L8.71833 18.273L9.70387 21.2L7.2 19.3541L4.69613 21.2L5.68167 18.273L3.17778 16.4271H6.21446L7.2 13.5Z"/>
                                        <path d="M14.4 13.5L15.3855 16.4271H18.4222L15.9183 18.273L16.9039 21.2L14.4 19.3541L11.8961 21.2L12.8817 18.273L10.3778 16.4271H13.4145L14.4 13.5Z"/>
                                        <path d="M21.6 13.5L22.5855 16.4271H25.6222L23.1183 18.273L24.1039 21.2L21.6 19.3541L19.0961 21.2L20.0817 18.273L17.5778 16.4271H20.6145L21.6 13.5Z"/>
                                        <path d="M28.8 13.5L29.7855 16.4271H32.8222L30.3183 18.273L31.3039 21.2L28.8 19.3541L26.2961 21.2L27.2817 18.273L24.7778 16.4271H27.8145L28.8 13.5Z"/>
                                    </g>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* Search Overlay */}
        <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSearchOpen(false)}>
            <div 
                className={`bg-white transition-transform duration-300 ease-in-out transform ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSearchSubmit} className="flex items-center h-24" noValidate>
                         <Icon type="search" className="h-6 w-6 text-gray-400 mr-4" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_placeholder')}
                            className="w-full h-full text-xl sm:text-2xl placeholder-gray-400 focus:outline-none bg-transparent"
                            autoComplete="off"
                        />
                        <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-black" aria-label={t('close_search_aria_label')}>
                            <Icon type="close" className="h-8 w-8" />
                        </button>
                    </form>
                    <div className="border-t">
                        {searchQuery.trim().length > 1 && (
                            <div className="py-6 max-h-[60vh] overflow-y-auto">
                                {searchResults.categories.length === 0 && searchResults.products.length === 0 ? (
                                    <p className="text-center text-gray-500">{t('search_no_results').replace('{query}', searchQuery)}</p>
                                ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {searchResults.categories.length > 0 && (
                                            <div className="lg:col-span-1">
                                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">{t('search_suggested_categories')}</h3>
                                                <ul className="space-y-2">
                                                    {searchResults.categories.map(cat => (
                                                        <li key={`${cat.label}-${cat.categoryKey}`}>
                                                            <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryResultClick(cat.categoryKey); }} className="text-gray-700 hover:text-black hover:underline text-sm py-1 block">
                                                                {cat.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {searchResults.products.length > 0 && (
                                            <div className="lg:col-span-2">
                                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">{t('search_suggested_products')}</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                                    {searchResults.products.map(product => (
                                                        <a href="#" key={product.id} onClick={(e) => { e.preventDefault(); handleProductResultClick(product); }} className="group flex items-center p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                            <img src={product.images[0]} alt={t(product.nameKey)} className="w-16 h-16 object-cover rounded-md mr-4" />
                                                            <div>
                                                                <p className="font-semibold text-sm group-hover:text-black">{t(product.nameKey)}</p>
                                                                <p className="text-xs text-gray-500">{formatPrice(product.price)}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>


        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-between items-center p-4 border-b">
                 <span className="font-bold text-lg">Menú</span>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2" aria-label="Cerrar menú">
                    <Icon type="close" />
                 </button>
            </div>
            <div className="flex flex-col justify-between" style={{height: 'calc(100% - 57px)'}}>
                <nav className="flex flex-col p-4 overflow-y-auto flex-grow">
                    {mainCategories.map(mainCat => {
                        const sections = getSectionsForCategory(mainCat.key);
                        const hasSubMenu = sections.length > 0;
                        const isExpanded = expandedMobileMain === mainCat.key;

                        return (
                            <div key={mainCat.key} className="border-b border-gray-100 last:border-0">
                                <button
                                    onClick={() => {
                                         if (hasSubMenu) {
                                             toggleMobileMain(mainCat.key);
                                         } else {
                                             // Handle direct links like 'Discounts' if they had a specific action
                                             setIsMobileMenuOpen(false);
                                         }
                                    }}
                                    className={`flex justify-between items-center w-full py-4 px-2 text-left font-bold uppercase transition-colors duration-200 ${isExpanded ? 'text-black' : 'text-gray-700'}`}
                                >
                                    {mainCat.label}
                                    {hasSubMenu && (
                                        <Icon type={isExpanded ? 'chevron-up' : 'chevron-down'} className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                                
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                     {hasSubMenu && (
                                         <div className="bg-gray-50 px-4 py-4 space-y-6">
                                             {sections.map(section => (
                                                 <div key={section.title}>
                                                     <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">{section.title}</h4>
                                                     <ul className="space-y-2 pl-1">
                                                         {section.items.map(item => (
                                                             <li key={item.key}>
                                                                  <a 
                                                                     href="#" 
                                                                     onClick={(e) => {
                                                                         e.preventDefault();
                                                                         onCategoryClick(section.categoryKey);
                                                                         setIsMobileMenuOpen(false);
                                                                     }}
                                                                     className="block text-gray-800 text-sm"
                                                                 >
                                                                     {item.label}
                                                                 </a>
                                                                  {/* Level 4 Sub-items */}
                                                                  {item.items && (
                                                                     <ul className="pl-3 mt-2 space-y-2 border-l border-gray-300 ml-1">
                                                                         {item.items.map(subItem => (
                                                                              <li key={subItem.key}>
                                                                                 <a 
                                                                                     href="#" 
                                                                                     onClick={(e) => {
                                                                                         e.preventDefault();
                                                                                         onCategoryClick(section.categoryKey);
                                                                                         setIsMobileMenuOpen(false);
                                                                                     }}
                                                                                     className="block text-gray-600 text-sm"
                                                                                 >
                                                                                     {subItem.label}
                                                                                 </a>
                                                                             </li>
                                                                         ))}
                                                                     </ul>
                                                                  )}
                                                             </li>
                                                         ))}
                                                          <li>
                                                             <a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(section.categoryKey); setIsMobileMenuOpen(false); }} className="block font-medium text-sm underline pt-1">
                                                                 {t('view_all')}
                                                             </a>
                                                          </li>
                                                     </ul>
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                </div>
                            </div>
                        );
                    })}
                </nav>
                <div className="p-4 border-t flex-shrink-0">
                     <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onNavigate('profile');
                        setIsMobileMenuOpen(false);
                    }} className="flex margin-left:2px text-lg py-2 hover:bg-gray-100 rounded-md px-2 transition-colors">
                        <Icon type="user" className="h-6 w-6 mr-3" />
                        {t('profile_mobile_link')}
                    </a>
                </div>
            </div>
        </div>
        </>
    );
};
