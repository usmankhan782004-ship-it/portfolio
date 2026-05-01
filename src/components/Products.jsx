import { useEffect, useRef } from 'react'
import './Products.css'

const PRODUCTS = [
    {
        icon: '◉',
        label: 'SaaS Product',
        title: 'Professor Dost',
        description:
            'An AI-powered academic assistant that helps students find answers faster, organize study sessions, and learn interactively.',
        tags: ['AI Assistant', 'Education', 'Productivity'],
        href: 'https://professor-dost.vercel.app/',
        accent: 'cyan',
    },
    {
        icon: '◈',
        label: 'SaaS Product',
        title: 'Academia Pro',
        description:
            'A student workflow platform that organizes resources, reduces friction, and keeps academic tasks manageable in one place.',
        tags: ['Workflow', 'Student Tools', 'Web App'],
        href: 'https://academia-pro-kohl.vercel.app/',
        accent: 'purple',
    },
]

const PRODUCTS_SPOTLIGHT = {
    eyebrow: 'Live SaaS focus',
    title: 'Products built for real users, not just demos',
    description:
        'Professor Dost and Academia Pro are the clearest proof of my product work: AI-assisted learning, workflow design, and clean execution with live deployments.',
    metrics: [
        { value: '2', label: 'Live SaaS apps' },
        { value: 'AI + workflow', label: 'Core product angle' },
        { value: 'User-facing', label: 'Shipped for real use' },
    ],
    flow: ['Identify', 'Design', 'Ship', 'Refine'],
}

export default function Products() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.15 }
        )

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="products" className="products" ref={sectionRef}>
            <div className="container">
                <p className="section-label animate-on-scroll">SaaS Products</p>
                <h2 className="section-title animate-on-scroll">Live Products</h2>
                <p className="section-subtitle animate-on-scroll">
                    These are the SaaS products I have shipped and put in front of real users.
                </p>

                <div className="products-spotlight glass animate-on-scroll">
                    <div className="products-spotlight-copy">
                        <span className="products-spotlight-eyebrow">{PRODUCTS_SPOTLIGHT.eyebrow}</span>
                        <h3 className="products-spotlight-title">{PRODUCTS_SPOTLIGHT.title}</h3>
                        <p className="products-spotlight-text">{PRODUCTS_SPOTLIGHT.description}</p>

                        <div className="products-spotlight-flow" aria-hidden="true">
                            {PRODUCTS_SPOTLIGHT.flow.map((item) => (
                                <span key={item}>{item}</span>
                            ))}
                        </div>
                    </div>

                    <div className="products-spotlight-metrics">
                        {PRODUCTS_SPOTLIGHT.metrics.map((metric) => (
                            <div key={metric.label} className="products-spotlight-metric">
                                <div className="products-spotlight-metric-value">{metric.value}</div>
                                <div className="products-spotlight-metric-label">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="products-grid">
                    {PRODUCTS.map((product, index) => (
                        <article
                            key={product.title}
                            className={`product-card glass animate-on-scroll product-card--${product.accent}`}
                            style={{ transitionDelay: `${index * 0.12}s` }}
                        >
                            <div className="product-card-top">
                                <div className="product-icon">{product.icon}</div>
                                <a
                                    href={product.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="product-link"
                                >
                                    Open App ↗
                                </a>
                            </div>

                            <div className="product-card-body">
                                <span className="product-label">{product.label}</span>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-tags">
                                    {product.tags.map((tag) => (
                                        <span key={tag} className="product-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}