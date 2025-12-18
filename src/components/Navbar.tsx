import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
const logo = "/logo.png";

interface NavbarProps {
  onSubmitClick: () => void;
}

export function Navbar({ onSubmitClick: _ }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Call for Papers', id: 'cfp' },
    { label: 'Topics', id: 'topics' },
    { label: 'Submission', id: 'submission' },
    { label: 'Important Dates', id: 'dates' },
    { label: 'Venue', id: 'venue' },
    { label: 'Committee', id: 'committee' },
    { label: 'Contact Us', id: 'contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/98 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">

          {/* Logo and Branding */}
          <div className="flex items-center gap-4 flex-shrink-0 ml-6">
            <img src={logo} alt="CIT Logo" className="h-10 w-auto" />
            <div className="hidden md:flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent text-base font-bold tracking-wide">
                NCAI 2026
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-xs text-gray-600">
                National Conference on AI
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Centered with flex-1 */}
          <div className="hidden lg:flex items-center gap-10 flex-1 justify-center mr-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 ml-auto hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left py-3 px-4 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}