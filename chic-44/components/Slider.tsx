
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Icon } from './Icon';

interface SlideData {
    id: string;
    bgColor: string;
    textColor: string;
    accentColor?: string;
    imageUrl: string;
    imageAltKey: string;
    titleKey?: string;
    descriptionKey?: string;
    ctaKey?: string;
    layout: 'standard' | 'reversed' | 'centered' | 'full';
    overlayImage?: boolean;
    extraElement?: React.ReactNode;
}

const slides: SlideData[] = [
    {
        id: 'summer',
        bgColor: '#000000',
        textColor: '#ffffff',
        imageUrl: 'https://res.cloudinary.com/dt1rhz43z/image/upload/v1763696118/Slyder_2_svcjti.png',
        imageAltKey: 'slide_summer_alt',
        layout: 'full'
    },
    {
        id: 'collection_22',
        bgColor: '#000000',
        textColor: '#ffffff',
        imageUrl: 'https://res.cloudinary.com/dt1rhz43z/image/upload/v1763696117/slyder_33_cdnp5x.png',
        imageAltKey: 'slide_new_alt',
        layout: 'full'
    },
    {
        id: 'slide_33',
        bgColor: '#000000',
        textColor: '#ffffff',
        imageUrl: 'https://res.cloudinary.com/dt1rhz43z/image/upload/v1763696117/Slyder_1_pjkplh.png',
        imageAltKey: 'slide_33_alt',
        layout: 'full'
    }
];

export const Slider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslation();

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (slides.length <= 1) return;
        const sliderInterval = setInterval(() => {
            goToNext();
        }, 6000);

        return () => clearInterval(sliderInterval);
    }, [goToNext]);

    return (
        <section className="relative h-[200px] sm:h-[350px] md:h-[650px] w-full m-auto group overflow-hidden bg-black" aria-roledescription="carousel" aria-label="Destacados">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    style={{ backgroundColor: slide.bgColor, color: slide.textColor }}
                >
                    {slide.layout === 'full' ? (
                        <img 
                            src={slide.imageUrl} 
                            alt={t(slide.imageAltKey)} 
                            className="w-full h-full object-fill"
                        />
                    ) : (
                         <div className="container mx-auto h-full flex items-center px-6 sm:px-12 relative">
                            {slide.extraElement}
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center ${slide.layout === 'centered' ? 'justify-center' : ''}`}>
                                
                                <div className={`space-y-6 z-10 ${slide.layout === 'centered' ? 'text-center md:text-left' : ''} order-2 md:order-1`}>
                                    {slide.titleKey && (
                                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight uppercase whitespace-pre-line">
                                            {t(slide.titleKey)}
                                        </h2>
                                    )}
                                    
                                    {slide.descriptionKey && (
                                        <p className="text-sm sm:text-base md:text-lg max-w-lg opacity-90 leading-relaxed">
                                            {t(slide.descriptionKey)}
                                        </p>
                                    )}

                                    {slide.ctaKey && (
                                        <button 
                                            className="px-8 py-3 sm:px-10 sm:py-4 font-bold text-sm tracking-widest uppercase transition-transform hover:scale-105 shadow-lg bg-gray-100 text-gray-900 hover:bg-white"
                                        >
                                            {t(slide.ctaKey)}
                                        </button>
                                    )}
                                </div>

                                <div className={`relative h-64 sm:h-96 md:h-[500px] flex justify-center items-center order-1 md:order-2 ${slide.overlayImage ? 'md:translate-x-12' : ''}`}>
                                    <img 
                                        src={slide.imageUrl} 
                                        alt={t(slide.imageAltKey)} 
                                        className={`max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 ${index === currentIndex ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 text-white p-2 rounded-full hover:bg-white/20 transition-colors hidden md:block"
                    >
                        <Icon type="chevron-left" className="h-10 w-10" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 text-white p-2 rounded-full hover:bg-white/20 transition-colors hidden md:block"
                    >
                        <Icon type="chevron-right" className="h-10 w-10" />
                    </button>
                </>
            )}

            {slides.length > 1 && (
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                    {slides.map((_, slideIndex) => (
                        <button
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 border ${currentIndex === slideIndex ? 'w-6 md:w-8 bg-white' : 'bg-transparent border-white'}`}
                            aria-label={`Ir a la diapositiva ${slideIndex + 1}`}
                        ></button>
                    ))}
                </div>
            )}
        </section>
    );
};
