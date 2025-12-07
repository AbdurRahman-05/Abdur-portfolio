import React, { useRef, useEffect, useState, ReactNode } from 'react';
import './ParallaxStyles.css';

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: 'up' | 'down';
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    className = '',
    speed = 0.3,
    direction = 'up'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const offset = (scrollProgress - 0.5) * 100 * speed;

            setTransform(direction === 'up' ? -offset : offset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, direction]);

    return (
        <div
            ref={ref}
            className={`parallax-section ${className}`}
            style={{ transform: `translateY(${transform}px)` }}
        >
            {children}
        </div>
    );
};

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'fadeIn';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className = '',
    delay = 0,
    animation = 'fadeUp'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`scroll-reveal scroll-reveal-${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

interface ParallaxBackgroundProps {
    imageUrl?: string;
    overlayColor?: string;
    speed?: number;
    children?: ReactNode;
    className?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
    imageUrl,
    overlayColor = 'rgba(0,0,0,0.5)',
    speed = 0.5,
    children,
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const scrolled = window.scrollY;
            const rect = ref.current.getBoundingClientRect();
            const elementTop = rect.top + scrolled;

            if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + rect.height) {
                setOffset((scrolled - elementTop) * speed);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={`parallax-bg-container ${className}`}>
            {imageUrl && (
                <div
                    className="parallax-bg-image"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        transform: `translateY(${offset}px) scale(1.1)`
                    }}
                />
            )}
            <div className="parallax-bg-overlay" style={{ backgroundColor: overlayColor }} />
            <div className="parallax-bg-content">
                {children}
            </div>
        </div>
    );
};

export default { ParallaxSection, ScrollReveal, ParallaxBackground };
