import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Users, Globe, BookOpen, Calendar, Award, FileText,
  Menu as MenuIcon, X, Facebook, Twitter, Linkedin, Youtube, ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Menu, MenuItem, ProductItem, HoveredLink } from './components/ui/navbar-menu';
import { cn } from './lib/utils';
import { useAdmin } from './contexts/AdminContext';
import { EditableText, EditableImage } from './components/Editable';
import { AdminModal } from './components/AdminModal';
import { RouterProvider, useRouter, Link } from './components/Router';
import { DEFAULT_CONTENT } from './constants';
import { AdminControlPanel } from './components/AdminControlPanel';
import { DynamicSections } from './components/DynamicSection';
import { ImpactSectors } from './components/ImpactSectors';
import { FeaturesPage } from './components/FeaturesPage';
import { SolutionsPage, ResearchPage, PublicationsPage, ConferencesPage, AboutPage } from './components/ElsevierPages';

// --- SECTIONS (Components) ---

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4' : 'bg-transparent py-6'
      }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <EditableImage
              id="logo_header"
              defaultSrc="/logo.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">IVRI<span className="text-primary">RESEARCH</span></span>
        </Link>

        {/* New Aceternity Desktop Nav */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Discover">
              <div className="flex flex-col space-y-4 text-sm w-48">
                <HoveredLink to="/features">Core Features</HoveredLink>
                <HoveredLink to="/solutions">Our Solutions</HoveredLink>
                <HoveredLink to="/about">Why Choose Us</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Research">
              <div className="text-sm grid grid-cols-2 gap-10 p-4 w-[500px]">
                <ProductItem
                  title="Research Areas"
                  href="/research"
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200"
                  description="Explore our core domains of scientific inquiry."
                />
                <ProductItem
                  title="Publications"
                  href="/publications"
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200"
                  description="Access our latest findings and whitepapers."
                />
                <ProductItem
                  title="Conferences"
                  href="/conferences"
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=200"
                  description="Join us at upcoming global events."
                />
                <ProductItem
                  title="Latest News"
                  href="/"
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=200"
                  description="Stay updated with our progress."
                />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-4 text-sm w-48">
                <HoveredLink to="/">Documentation</HoveredLink>
                <HoveredLink to="/">API Reference</HoveredLink>
                <HoveredLink to="/">Community</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Company">
              <div className="flex flex-col space-y-4 text-sm w-48">
                <HoveredLink to="/about">About Us</HoveredLink>
                <HoveredLink to="/">Careers</HoveredLink>
                <HoveredLink to="/">Contact</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-4">

        </div>

        {/* Mobile Toggle & Home Link */}
        <div className="flex items-center gap-4 relative z-50">
          <Link to="/" className="hidden lg:block text-sm font-semibold text-gray-900 hover:text-primary transition-colors">
            Home
          </Link>
          <button className="lg:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {[
                { name: 'Home', to: '/' },
                { name: 'Features', to: '/features' },
                { name: 'Solutions', to: '/solutions' },
                { name: 'Research', to: '/research' },
                { name: 'Publications', to: '/publications' },
                { name: 'About', to: '/about' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-lg font-medium text-gray-900 border-b border-gray-50 pb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <EditableText
            id="hero_eyebrow"
            defaultContent={DEFAULT_CONTENT.hero_eyebrow}
            as="p"
            className="text-accent font-bold text-sm tracking-widest uppercase mb-6"
          />
          <EditableText
            id="hero_title"
            defaultContent={DEFAULT_CONTENT.hero_title}
            as="h1"
            className="text-4xl sm:text-5xl lg:text-[72px] font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight"
          />
          <EditableText
            id="hero_subtitle"
            defaultContent={DEFAULT_CONTENT.hero_subtitle}
            as="p"
            className="text-lg sm:text-xl text-gray-500 mb-8 leading-relaxed max-w-lg"
          />

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              <EditableText id="hero_cta_primary" defaultContent={DEFAULT_CONTENT.hero_cta_primary} as="span" />
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group text-gray-600 hover:text-primary hover:bg-blue-50 px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center">
              <EditableText id="hero_cta_secondary" defaultContent={DEFAULT_CONTENT.hero_cta_secondary} as="span" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
            <Globe className="text-accent" size={20} />
            <EditableText id="hero_trust" defaultContent={DEFAULT_CONTENT.hero_trust} as="span" />
          </div>
        </motion.div>

        {/* Right Visual - Expandable Cards */}
        <div className="relative h-[500px] hidden lg:flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="relative flex-1 hover:flex-[3] transition-all duration-500 ease-in-out h-full rounded-[32px] overflow-hidden group shadow-2xl"
            >
              <EditableImage
                id={`hero_image_${i}`}
                defaultSrc={DEFAULT_CONTENT[`hero_image_${i}`] as string}
                alt="Research visual"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-white font-bold text-xl">Innovation Hub</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuickLinks = () => {
  const cards = [
    { icon: Users, idPrefix: "ql_1", color: "text-blue-500" },
    { icon: Award, idPrefix: "ql_2", color: "text-purple-500" },
    { icon: Globe, idPrefix: "ql_3", color: "text-teal-500" },
  ];

  return (
    <section className="py-12 -mt-12 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-[24px] shadow-xl shadow-gray-200/50 border border-gray-100 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${card.color}`}>
                <card.icon size={32} />
              </div>
              <EditableText id={`${card.idPrefix}_title`} defaultContent={DEFAULT_CONTENT[`${card.idPrefix}_title`]} as="h3" className="text-2xl font-bold text-gray-900 mb-3" />
              <EditableText id={`${card.idPrefix}_desc`} defaultContent={DEFAULT_CONTENT[`${card.idPrefix}_desc`]} as="p" className="text-gray-500 leading-relaxed mb-6" />
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all cursor-pointer">
                <span>Learn More</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Users, id: '1', color: 'bg-blue-100 text-blue-600' },
    { icon: Globe, id: '2', color: 'bg-teal-100 text-teal-600' },
    { icon: Calendar, id: '3', color: 'bg-purple-100 text-purple-600' },
    { icon: BookOpen, id: '4', color: 'bg-orange-100 text-orange-600' },
    { icon: Award, id: '5', color: 'bg-indigo-100 text-indigo-600' },
    { icon: FileText, id: '6', color: 'bg-pink-100 text-pink-600' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <EditableText id="features_title" defaultContent={DEFAULT_CONTENT.features_title} as="h2" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" />
          <p className="text-gray-500">Comprehensive support for every stage of your research journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.id} className="p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all bg-white group">
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6`}>
                <f.icon size={28} />
              </div>
              <EditableText id={`feature_${f.id}_title`} defaultContent={DEFAULT_CONTENT[`feature_${f.id}_title`]} as="h4" className="text-xl font-bold text-gray-900 mb-3" />
              <EditableText id={`feature_${f.id}_desc`} defaultContent={DEFAULT_CONTENT[`feature_${f.id}_desc`]} as="p" className="text-gray-500 text-sm leading-relaxed" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResearchAreas = () => {
  const areas = [1, 2, 3, 4];
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Research Focus Areas</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((id) => (
            <div key={id} className="group relative h-80 rounded-[32px] overflow-hidden cursor-pointer shadow-md">
              <EditableImage
                id={`area_${id}_img`}
                defaultSrc={DEFAULT_CONTENT[`area_${id}_img`] as string}
                alt={`Research Area ${id}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <EditableText id={`area_${id}_title`} defaultContent={DEFAULT_CONTENT[`area_${id}_title`]} as="h3" className="text-white text-xl font-bold mb-2" />
                <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-300">
                  <span className="text-accent text-sm font-semibold flex items-center gap-2">Explore Research <ArrowRight size={14} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl bg-gradient-to-br from-primary via-blue-600 to-secondary rounded-[48px] px-8 py-20 lg:py-32 text-center relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <EditableText id="cta_title" defaultContent={DEFAULT_CONTENT.cta_title} as="h2" className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" />
          <EditableText id="cta_subtitle" defaultContent={DEFAULT_CONTENT.cta_subtitle} as="p" className="text-blue-100 text-xl mb-10" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors shadow-2xl">
              Get Started Now
            </button>
            <div className="flex items-center justify-center gap-2 text-white/90 font-medium px-6 py-4">
              <ShieldCheck size={20} />
              <span>No credit card required • Free 14-day trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { isAdmin, logout, setLoginModalOpen } = useAdmin();

  const handleLogoClick = () => {
    if (isAdmin) {
      if (window.confirm("Logout of Admin Mode?")) {
        logout();
      }
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-24 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2 mb-6 cursor-pointer group"
            title="Admin Login"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
              <EditableImage
                id="logo_footer"
                defaultSrc="/logo.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">IVRI<span className="text-gray-400">RESEARCH</span></span>
            {isAdmin && <span className="ml-2 text-xs bg-green-500 text-black font-bold px-2 py-0.5 rounded">ADMIN</span>}
          </div>
          <EditableText id="footer_tagline" defaultContent={DEFAULT_CONTENT.footer_tagline} as="p" className="text-gray-400 mb-8 max-w-xs" />
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Products</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/solutions" className="hover:text-primary transition-colors">Consultation</Link></li>
            <li><Link to="/publications" className="hover:text-primary transition-colors">Publications</Link></li>
            <li><Link to="/conferences" className="hover:text-primary transition-colors">Conferences</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <EditableText id="footer_email" defaultContent={DEFAULT_CONTENT.footer_email} as="span" />
            </li>
            <li className="flex items-center gap-2">
              <EditableText id="footer_phone" defaultContent={DEFAULT_CONTENT.footer_phone} as="span" />
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <EditableText id="footer_copy" defaultContent={DEFAULT_CONTENT.footer_copy} as="p" />
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// --- PAGES ---

const HomePage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero />
    <ImpactSectors />
    <QuickLinks />
    <Features />
    <ResearchAreas />
    <DynamicSections />
    <CTA />
  </motion.div>
);

// --- Structured Content Renderer ---
const StructuredContentRenderer = ({ content }: { content: string }) => {
  // Simple parser to turn the text blocks into a richer UI
  // Rules:
  // 1. Double newline = new block
  // 2. Short line (under 60 chars) followed by newline = Heading
  // 3. Line starting with "Outcome:" or "For ..." = Special Block

  const blocks = content.split('\n\n').filter(b => b.trim());

  return (
    <div className="space-y-12">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const firstLine = lines[0].trim();

        // Detect specific "For ..." sections (Like "For Individual Researchers") to create cards
        if (firstLine.startsWith('For ') && lines.length > 1) {
          return (
            <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                {firstLine}
              </h3>
              <div className="space-y-3 text-gray-600 pl-4 border-l-2 border-gray-200 ml-4">
                {lines.slice(1).map((line, j) => {
                  if (line.startsWith('Outcome:')) {
                    return (
                      <div key={j} className="mt-6 pt-4 border-t border-dashed border-gray-300">
                        <span className="font-bold text-primary">{line}</span>
                      </div>
                    )
                  }
                  return <p key={j} className="leading-relaxed">{line}</p>
                })}
              </div>
            </div>
          );
        }

        // Detect "Core Features" or similar main headers
        if (firstLine.length < 50 && !firstLine.includes('.') && lines.length === 1) {
          return <h2 key={i} className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-b pb-4">{firstLine}</h2>;
        }

        // Detect bullet-like lists (simple heuristic)
        if (lines.length > 3 && lines.every(l => l.length < 100)) {
          return (
            <div key={i} className="grid sm:grid-cols-2 gap-6 my-8">
              {lines.map((l, k) => (
                <div key={k} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-gray-700">{l}</span>
                </div>
              ))}
            </div>
          )
        }

        // Default Paragraphs with some sub-header detection logic
        return (
          <div key={i} className="prose prose-lg text-gray-600 max-w-none">
            {lines.map((line, k) => {
              // If a line is short and bold-worthy
              if (line.length < 60 && !line.endsWith('.') && k === 0 && lines.length > 1) {
                return <h4 key={k} className="text-xl font-bold text-gray-800 mb-2">{line}</h4>
              }
              return <p key={k} className="mb-2">{line}</p>
            })}
          </div>
        );
      })}
    </div>
  );
};

const GenericPage = ({ titleKey, contentKey, imageKey }: { titleKey: string, contentKey: string, imageKey?: string }) => {
  const { content } = useAdmin();
  const rawContent = content[contentKey] || DEFAULT_CONTENT[contentKey];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 min-h-screen bg-white"
    >
      {/* Hero Section for Inner Page */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end">
        {imageKey && (
          <div className="absolute inset-0">
            <EditableImage id={imageKey} defaultSrc={DEFAULT_CONTENT[imageKey]} alt="Header" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
        )}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-semibold tracking-wider mb-4 border border-white/20">
              IVRI RESEARCH
            </div>
            <EditableText
              id={titleKey}
              defaultContent={DEFAULT_CONTENT[titleKey]}
              as="h1"
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            />
            <div className="w-24 h-2 bg-primary rounded-full"></div>
          </motion.div>
        </div>
      </div>

      {/* Content Section with Side Rail or Central Focus */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8">
          <StructuredContentRenderer content={rawContent} />
        </div>

        {/* Sidebar / Context Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 sticky top-24">
            <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
            <button className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold mb-3 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
              Partner with Us
            </button>
            <button className="w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Download Brochure
            </button>

            <h4 className="font-bold text-gray-900 mt-8 mb-4">Related Topics</h4>
            <div className="flex flex-wrap gap-2">
              {['Research', 'Innovation', 'Global', 'Science', 'Future'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const MainContent = () => {
  const { path } = useRouter();

  let content;
  switch (path) {
    case '/':
      content = <HomePage />;
      break;
    case '/features':
      content = <FeaturesPage />;
      break;
    case '/solutions':
      content = <SolutionsPage />;
      break;
    case '/research':
      content = <ResearchPage />;
      break;
    case '/publications':
      content = <PublicationsPage />;
      break;
    case '/conferences':
      content = <ConferencesPage />;
      break;
    case '/about':
      content = <AboutPage />;
      break;
    default:
      content = <HomePage />;
  }

  return (
    <main>
      <AnimatePresence mode="wait">
        <div key={path}>
          {content}
        </div>
      </AnimatePresence>
    </main>
  );
};

export default function App() {
  const { isAdmin } = useAdmin();

  return (
    <RouterProvider>
      <div className={`min-h-screen bg-white ${isAdmin ? 'border-t-4 border-green-500' : ''}`}>
        <AdminModal />
        <AdminControlPanel />
        <Header />
        <MainContent />
        <Footer />

        {/* Admin Floating Indicator */}
        {isAdmin && (
          <div className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 pointer-events-none">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Admin Mode Active
          </div>
        )}
      </div>
    </RouterProvider>
  );
}
