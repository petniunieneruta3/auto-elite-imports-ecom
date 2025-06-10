
import React, { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSelector = () => {
  useEffect(() => {
    // Add CSS styles for Google Translate
    const style = document.createElement('style');
    style.textContent = `
      /* Style Google Translate widget */
      .google-translate-container .goog-te-gadget {
        font-family: inherit !important;
        font-size: 0 !important;
      }
      
      .google-translate-container .goog-te-gadget-simple {
        background-color: rgba(255, 255, 255, 0.9) !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;
        font-size: 14px !important;
        display: inline-block !important;
        padding: 8px 12px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      }
      
      .google-translate-container .goog-te-gadget-simple .goog-te-menu-value {
        color: #374151 !important;
        font-family: inherit !important;
        font-weight: 500 !important;
      }
      
      .google-translate-container .goog-te-gadget-simple .goog-te-menu-value:hover {
        color: #111827 !important;
      }
      
      .google-translate-container .goog-te-gadget-icon {
        display: none !important;
      }
      
      .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span {
        color: inherit !important;
      }
      
      /* Hide Google Translate banner */
      .goog-te-banner-frame {
        display: none !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .skiptranslate iframe {
        visibility: hidden !important;
      }
      
      body.translated-ltr {
        top: 0 !important;
      }
      
      .goog-te-balloon-frame {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'de',
          includedLanguages: 'de,en,fr,es,it,ru,pl,nl,pt,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="google-translate-container">
        <div id="google_translate_element"></div>
      </div>
    </div>
  );
};

export default LanguageSelector;
