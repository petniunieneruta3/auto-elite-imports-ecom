import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Rückgabepolitik
                </CardTitle>
              </CardHeader>
              <CardContent className="leading-relaxed">
                <p className="mb-4">
                  Wir möchten, dass Sie mit Ihrem Kauf rundum zufrieden sind. Wenn Sie aus irgendeinem Grund mit
                  Ihrem Kauf nicht zufrieden sind, können Sie den Artikel gemäß den unten aufgeführten Bedingungen
                  zurückgeben.
                </p>

                <h2 className="text-xl font-semibold mb-2">Bedingungen für die Rückgabe</h2>
                <ul className="list-disc pl-5 mb-4">
                  <li>
                    <span className="font-semibold">Zeitrahmen:</span> Sie haben 14 Tage ab dem Datum der Lieferung,
                    um einen Artikel zurückzugeben.
                  </li>
                  <li>
                    <span className="font-semibold">Zustand:</span> Der Artikel muss unbenutzt, inOriginalzustand und
                    in der Originalverpackung sein.
                  </li>
                  <li>
                    <span className="font-semibold">Nachweis:</span> Ein Kaufnachweis ist erforderlich, um eine
                    Rückgabe zu bearbeiten.
                  </li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">Wie Sie einen Artikel zurückgeben</h2>
                <ol className="list-decimal pl-5 mb-4">
                  <li>
                    <span className="font-semibold">Kontaktieren Sie uns:</span> Senden Sie eine E-Mail an
                    unseren Kundenservice, um eine Rücksendung zu beantragen.
                  </li>
                  <li>
                    <span className="font-semibold">Verpacken Sie den Artikel:</span> Verpacken Sie den Artikel
                    sicher in der Originalverpackung, einschließlich aller Zubehörteile und Dokumente.
                  </li>
                  <li>
                    <span className="font-semibold">Senden Sie den Artikel:</span> Senden Sie den Artikel an die
                    Adresse, die Ihnen von unserem Kundenservice mitgeteilt wurde.
                  </li>
                </ol>

                <h2 className="text-xl font-semibold mb-2">Rückerstattung</h2>
                <p className="mb-4">
                  Sobald wir Ihre Rücksendung erhalten und geprüft haben, senden wir Ihnen eine E-Mail, um Sie über
                  die Genehmigung oder Ablehnung Ihrer Rückerstattung zu informieren. Wenn Sie genehmigt werden, wird
                  Ihre Rückerstattung bearbeitet und innerhalb von 10 Werktagen automatisch auf Ihre ursprüngliche
                  Zahlungsmethode angewendet.
                </p>

                <h2 className="text-xl font-semibold mb-2">Ausnahmen</h2>
                <p className="mb-4">
                  Die folgenden Artikel können nicht zurückgegeben werden:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Artikel, die beschädigt oder verändert wurden.</li>
                  <li>Artikel, die sich nicht im Originalzustand befinden.</li>
                  <li>Artikel, die ohne Kaufnachweis zurückgegeben werden.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">Versand</h2>
                <p className="mb-4">
                  Sie sind für die Zahlung der Versandkosten für die Rücksendung Ihres Artikels verantwortlich.
                  Versandkosten sind nicht erstattungsfähig.
                </p>

                <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
                <p className="mb-4">
                  Wenn Sie Fragen zu unserer Rückgabepolitik haben, kontaktieren Sie uns bitte unter
                  autoexport49@gmail.com.
                </p>
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

export default Returns;
