
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, CreditCard, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const paymentSchema = z.object({
  customerName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  customerEmail: z.string().email('Email invalide'),
  customerPhone: z.string().min(10, 'Numéro de téléphone invalide'),
  paymentMethod: z.enum(['monthly', 'full'], {
    required_error: 'Veuillez sélectionner un mode de paiement',
  }),
  paymentProof: z.any().refine((file) => file?.length > 0, 'La preuve de paiement est obligatoire'),
  bankDetails: z.string().min(10, 'Les détails bancaires sont requis'),
  termsAccepted: z.boolean().refine((val) => val === true, 'Vous devez accepter les conditions'),
});

interface PaymentFormProps {
  totalAmount: number;
  depositAmount: number;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PaymentForm = ({ totalAmount, depositAmount, onSubmit, onCancel }: PaymentFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      paymentMethod: 'monthly',
      bankDetails: '',
      termsAccepted: false,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setUploadedFile(file);
        form.setValue('paymentProof', [file]);
        toast({
          title: "Fichier téléchargé",
          description: `${file.name} a été téléchargé avec succès.`,
        });
      } else {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez télécharger une image ou un PDF.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (values: z.infer<typeof paymentSchema>) => {
    const formData = {
      ...values,
      paymentProof: uploadedFile,
      totalAmount,
      depositAmount,
      remainingAmount: totalAmount - depositAmount,
    };
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Informations de Paiement</h3>
        </div>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Total de la commande:</strong> €{totalAmount.toLocaleString()}</p>
          <p><strong>Acompte requis (20%):</strong> €{depositAmount.toLocaleString()}</p>
          <p><strong>Reste à payer:</strong> €{(totalAmount - depositAmount).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Coordonnées Bancaires pour le Virement</h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p><strong>IBAN:</strong> DE89 3704 0044 0532 0130 00</p>
          <p><strong>BIC:</strong> COBADEFFXXX</p>
          <p><strong>Banque:</strong> Commerzbank AG</p>
          <p><strong>Titulaire:</strong> LuxeAuto GmbH</p>
          <p><strong>Référence:</strong> Acompte commande [votre nom]</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet *</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone *</FormLabel>
                <FormControl>
                  <Input placeholder="+33 1 23 45 67 89" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode de paiement du solde</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="monthly"
                        value="monthly"
                        checked={field.value === 'monthly'}
                        onChange={() => field.onChange('monthly')}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="monthly">Paiement mensuel (12 mois sans intérêt)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="full"
                        value="full"
                        checked={field.value === 'full'}
                        onChange={() => field.onChange('full')}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="full">Paiement total à la livraison</Label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Détails bancaires complémentaires</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informations supplémentaires sur votre virement (référence utilisée, banque, etc.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preuve de paiement de l'acompte *</FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Téléchargez une capture d'écran ou un reçu de votre virement bancaire
                      </p>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="cursor-pointer"
                      />
                      {uploadedFile && (
                        <p className="text-sm text-green-600 font-medium">
                          ✓ Fichier téléchargé: {uploadedFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    J'accepte les conditions de vente et confirme que l'acompte de €{depositAmount.toLocaleString()} a été versé *
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-luxury-gold hover:bg-luxury-dark-gold text-black">
              <CreditCard className="mr-2 h-4 w-4" />
              Confirmer la commande
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
