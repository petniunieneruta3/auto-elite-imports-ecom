
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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerInfo,
      paymentType,
      paymentAmount,
      totalAmount,
      depositAmount,
      orderSummary,
      specialRequests
    }: OrderEmailRequest = await req.json();

    const orderDate = new Date().toLocaleDateString('de-DE');
    const orderTime = new Date().toLocaleTimeString('de-DE');

    // Send business notification email
    const businessEmailResponse = await resend.emails.send({
      from: "Auto Import Export <onboarding@resend.dev>",
      to: ["contact@autoimportexpor.com"],
      subject: `Neue Bestellung - ${customerInfo.firstName} ${customerInfo.lastName}`,
      html: `
        <h2>Neue Bestellung eingegangen</h2>
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
        
        <p><strong>Bestelldatum:</strong> ${orderDate} ${orderTime}</p>
      `,
    });

    // Send customer confirmation email
    const customerEmailResponse = await resend.emails.send({
      from: "Auto Import Export <onboarding@resend.dev>",
      to: [customerInfo.email],
      subject: "Bestellbestätigung - Auto Import Export",
      html: `
        <h1>Vielen Dank für Ihre Bestellung!</h1>
        <p>Liebe/r ${customerInfo.firstName} ${customerInfo.lastName},</p>
        
        <p>vielen Dank für Ihre Bestellung bei Auto Import Export!</p>
        
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
      `,
    });

    console.log('Business email sent:', businessEmailResponse);
    console.log('Customer email sent:', customerEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      businessEmailId: businessEmailResponse.data?.id,
      customerEmailId: customerEmailResponse.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
