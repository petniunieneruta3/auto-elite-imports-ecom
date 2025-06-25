
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentType: string;
  paymentAmount: number;
  totalAmount: number;
  depositAmount: number;
  orderSummary: string;
  specialRequests: string;
  paymentProofUrl?: string;
  paymentProofFilename?: string;
  orderId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting email sending process...");
    
    const {
      customerInfo,
      paymentType,
      paymentAmount,
      totalAmount,
      depositAmount,
      orderSummary,
      specialRequests,
      paymentProofUrl,
      paymentProofFilename,
      orderId
    }: OrderEmailRequest = await req.json();

    console.log("Request data received:", {
      customerEmail: customerInfo.email,
      orderId,
      paymentType,
      paymentAmount
    });

    const orderDate = new Date().toLocaleDateString('de-DE');
    const orderTime = new Date().toLocaleTimeString('de-DE');

    console.log("Attempting to send business notification email...");
    
    // Send business notification email
    const businessEmailResponse = await resend.emails.send({
      from: "Auto Import Export <noreply@autoimportexpor.com>",
      to: ["contact@autoimportexpor.com"],
      subject: `Neue Bestellung - ${customerInfo.firstName} ${customerInfo.lastName}`,
      html: `
        <h2>Neue Bestellung eingegangen</h2>
        <p><strong>Bestell-ID:</strong> ${orderId || 'N/A'}</p>
        
        <h3>Kundendaten:</h3>
        <p><strong>Name:</strong> ${customerInfo.firstName} ${customerInfo.lastName}</p>
        <p><strong>E-Mail:</strong> ${customerInfo.email}</p>
        <p><strong>Telefon:</strong> ${customerInfo.phone}</p>
        <p><strong>Adresse:</strong> ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}, ${customerInfo.country}</p>
        
        <h3>Bestelldetails:</h3>
        <p><strong>Zahlungsart:</strong> ${paymentType === 'deposit' ? 'Anzahlung (20%)' : 'Vollzahlung'}</p>
        <p><strong>Zu zahlender Betrag:</strong> €${paymentAmount.toLocaleString()}</p>
        <p><strong>Gesamtwert:</strong> €${totalAmount.toLocaleString()}</p>
        
        <h3>Bestellte Fahrzeuge:</h3>
        <pre>${orderSummary}</pre>
        
        ${specialRequests ? `<h3>Besondere Anfragen:</h3><p>${specialRequests}</p>` : ''}
        
        ${paymentProofUrl ? `
        <h3>Zahlungsnachweis:</h3>
        <p><strong>Dateiname:</strong> ${paymentProofFilename || 'Unbekannt'}</p>
        <p><a href="${paymentProofUrl}" target="_blank" style="color: #2754C5; text-decoration: underline;">📎 Zahlungsnachweis anzeigen</a></p>
        <p><em>Klicken Sie auf den Link oben, um die vom Kunden hochgeladene Zahlungsbestätigung anzuzeigen.</em></p>
        ` : ''}
        
        <p><strong>Bestelldatum:</strong> ${orderDate} ${orderTime}</p>
        
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          Diese E-Mail wurde automatisch vom Auto Import Export Bestellsystem generiert.
        </p>
      `,
    });

    console.log('Business email response:', businessEmailResponse);

    if (businessEmailResponse.error) {
      console.error('Business email error:', businessEmailResponse.error);
      throw new Error(`Business email failed: ${businessEmailResponse.error.message}`);
    }

    console.log("Attempting to send customer confirmation email...");

    // Send customer confirmation email
    const customerEmailResponse = await resend.emails.send({
      from: "Auto Import Export <noreply@autoimportexpor.com>",
      to: [customerInfo.email],
      subject: "Bestellbestätigung - Auto Import Export",
      html: `
        <h1>Vielen Dank für Ihre Bestellung!</h1>
        <p>Liebe/r ${customerInfo.firstName} ${customerInfo.lastName},</p>
        
        <p>vielen Dank für Ihre Bestellung bei Auto Import Export!</p>
        
        ${orderId ? `<p><strong>Ihre Bestell-ID:</strong> ${orderId}</p>` : ''}
        
        <h2>Ihre Bestelldetails:</h2>
        <ul>
          <li><strong>Bestellwert:</strong> €${totalAmount.toLocaleString()}</li>
          <li><strong>Zahlungsart:</strong> ${paymentType === 'deposit' ? 'Anzahlung (20%)' : 'Vollzahlung'}</li>
          <li><strong>Zu zahlender Betrag:</strong> €${paymentAmount.toLocaleString()}</li>
          ${paymentType === 'deposit' ? `<li><strong>Restbetrag bei Lieferung:</strong> €${(totalAmount - depositAmount).toLocaleString()}</li>` : ''}
        </ul>
        
        <h2>Bestellte Fahrzeuge:</h2>
        <pre>${orderSummary}</pre>
        
        ${specialRequests ? `<h2>Besondere Anfragen:</h2><p>${specialRequests}</p>` : ''}
        
        ${paymentProofUrl ? `
        <h2>Ihr Zahlungsnachweis:</h2>
        <p>✅ Zahlungsnachweis erfolgreich hochgeladen: ${paymentProofFilename || 'Datei'}</p>
        <p>Wir haben Ihren Zahlungsnachweis erhalten und werden diesen umgehend prüfen.</p>
        ` : ''}
        
        <p>Wir haben Ihre Zahlung erhalten und werden Ihre Bestellung umgehend bearbeiten. Sie erhalten in Kürze weitere Informationen zum Lieferstatus.</p>
        
        <h2>Bei Fragen stehen wir Ihnen gerne zur Verfügung:</h2>
        <ul>
          <li><strong>Telefon:</strong> +33774 072351</li>
          <li><strong>E-Mail:</strong> contact@autoimportexpor.com</li>
        </ul>
        
        <p>Vielen Dank für Ihr Vertrauen!</p>
        
        <p><strong>Ihr Team von Auto Import Export</strong><br>
        Germendorfer Dorfstraße 66<br>
        16515 Oranienburg, Deutschland</p>
        
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
        </p>
      `,
    });

    console.log('Customer email response:', customerEmailResponse);

    if (customerEmailResponse.error) {
      console.error('Customer email error:', customerEmailResponse.error);
      throw new Error(`Customer email failed: ${customerEmailResponse.error.message}`);
    }

    console.log('Both emails sent successfully!');

    return new Response(JSON.stringify({ 
      success: true,
      businessEmailId: businessEmailResponse.data?.id,
      customerEmailId: customerEmailResponse.data?.id,
      message: "Emails sent successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-emails function:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Check function logs for more information"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
