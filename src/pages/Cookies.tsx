import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  Cookie-Richtlinie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Diese Cookie-Richtlinie erklärt, wie AUTO IMPORT EXPORT Cookies und ähnliche Technologien verwendet, um Sie wiederzuerkennen, wenn Sie unsere Website besuchen. Sie erklärt, was diese Technologien sind und warum wir sie verwenden, sowie Ihre Rechte, unsere Verwendung von ihnen zu kontrollieren.
                  </p>
                  <p>
                    <strong>Was sind Cookies?</strong>
                  </p>
                  <p>
                    Cookies sind kleine Datendateien, die auf Ihrem Computer oder Mobilgerät abgelegt werden, wenn Sie eine Website besuchen. Cookies werden von Website-Besitzern weitgehend verwendet, um ihre Websites funktionsfähig zu machen oder effizienter zu gestalten sowie um Berichtsinformationen bereitzustellen.
                  </p>
                  <p>
                    Cookies, die vom Website-Besitzer (in diesem Fall AUTO IMPORT EXPORT) gesetzt werden, werden als "Erstanbieter-Cookies" bezeichnet. Cookies, die von anderen Parteien als dem Website-Besitzer gesetzt werden, werden als "Drittanbieter-Cookies" bezeichnet. Drittanbieter-Cookies ermöglichen es, Funktionen oder Features von Drittanbietern auf oder über die Website bereitzustellen (z. B. Werbung, interaktive Inhalte und Analysen). Die Parteien, die diese Drittanbieter-Cookies setzen, können Sie erkennen, sowohl wenn Sie die betreffende Website besuchen als auch wenn Sie bestimmte andere Websites besuchen.
                  </p>
                  <p>
                    <strong>Warum verwenden wir Cookies?</strong>
                  </p>
                  <p>
                    Wir verwenden Erstanbieter- und Drittanbieter-Cookies aus verschiedenen Gründen. Einige Cookies sind aus technischen Gründen erforderlich, damit unsere Website funktioniert, und wir bezeichnen diese als "essenzielle" oder "unbedingt notwendige" Cookies. Andere Cookies ermöglichen es uns auch, die Interessen unserer Nutzer zu verfolgen und anzusprechen, um die Erfahrung auf unserer Online-Immobilien zu verbessern. Drittanbieter setzen Cookies über unsere Website für Werbung, Analysen und andere Zwecke. Dies wird unten näher beschrieben.
                  </p>
                  <p>
                    <strong>Wie kann ich Cookies kontrollieren?</strong>
                  </p>
                  <p>
                    Sie haben das Recht zu entscheiden, ob Sie Cookies akzeptieren oder ablehnen. Sie können Ihre Cookie-Rechte ausüben, indem Sie Ihre Präferenzen im Cookie-Zustimmungsmanager festlegen. Mit dem Cookie-Zustimmungsmanager können Sie auswählen, welche Kategorien von Cookies Sie akzeptieren oder ablehnen. Essenzielle Cookies können nicht abgelehnt werden, da sie für den Betrieb der Website unbedingt erforderlich sind.
                  </p>
                  <p>
                    Der Cookie-Zustimmungsmanager befindet sich im Benachrichtigungsbanner unserer Website. Wenn Sie unsere Website zum ersten Mal besuchen, wird Ihnen ein Banner angezeigt, mit dem Sie Ihre Präferenzen verwalten können.
                  </p>
                  <p>
                    Sie können auch Ihre Webbrowser-Steuerelemente so einstellen oder ändern, dass Cookies akzeptiert oder abgelehnt werden. Wenn Sie Cookies über Ihre Webbrowser-Steuerelemente ablehnen, können Sie unsere Website möglicherweise weiterhin nutzen, obwohl Ihr Zugriff auf einige Funktionen und Bereiche unserer Website eingeschränkt sein kann. Da die Mittel, mit denen Sie Cookies über Ihre Webbrowser-Steuerelemente ablehnen können, von Browser zu Browser unterschiedlich sind, sollten Sie das Hilfemenü Ihres Browsers für weitere Informationen aufrufen.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Cookies;
