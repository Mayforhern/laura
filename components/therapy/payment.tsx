"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TherapyAgent } from "@/lib/agents/therapy.agent";
import { LitService } from "@/lib/services/lit.service";
import { Shield, Lock, KeyRound, Wallet, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PaymentButton({
  sessionId,
  amount,
}: {
  sessionId: string;
  amount: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const { toast } = useToast();

  // Initialize both agents
  const therapyAgent = TherapyAgent.getInstance();
  const litService = LitService.getInstance();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setPaymentStep(1);

      // Step 1: Use Lit Protocol for secure credential verification
      await litService.initialize();
      const verificationResult = await litService.verifyUserCredentials();
      setPaymentStep(2);

      // Step 2: Generate encrypted payment authorization using Lit
      const encryptedAuth = await litService.generatePaymentAuthorization(
        sessionId,
        amount
      );
      setPaymentStep(3);

      // Step 3: Process the actual payment using Coinbase AgentKit
      await therapyAgent.processPayment(
        amount,
        process.env.NEXT_PUBLIC_THERAPY_WALLET_ADDRESS!,
        encryptedAuth // Pass the Lit-generated authorization
      );
      setPaymentStep(4);

      // Step 4: Store encrypted session credentials using Lit
      await litService.storeSessionCredentials(sessionId, {
        paymentConfirmation: true,
        timestamp: new Date().toISOString(),
        therapyCredits: amount,
      });
      setPaymentStep(5);

      toast({
        title: "Payment successful",
        description: "Your therapy session has been securely booked!",
      });
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setPaymentStep(0);
    }
  };

  const paymentSteps = [
    { icon: Shield, label: "Initializing Security" },
    { icon: KeyRound, label: "Verifying Credentials" },
    { icon: Lock, label: "Generating Authorization" },
    { icon: Wallet, label: "Processing Payment" },
    { icon: ArrowRight, label: "Finalizing Session" },
  ];

  return (
    <div className="space-y-4">
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full relative overflow-hidden"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span>{paymentSteps[paymentStep].label}</span>
            <Progress value={(paymentStep + 1) * 20} className="w-20" />
          </div>
        ) : (
          "Book Secure Session"
        )}
      </Button>

      {isLoading && (
        <Card className="p-4 space-y-3">
          {paymentSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 ${
                  index === paymentStep
                    ? "text-primary"
                    : index < paymentStep
                    ? "text-muted-foreground"
                    : "opacity-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{step.label}</span>
                {index === paymentStep && (
                  <div className="ml-auto animate-pulse">Processing...</div>
                )}
              </div>
            );
          })}
        </Card>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="text-xs"
        onClick={() => setShowSecurityInfo(!showSecurityInfo)}
      >
        {showSecurityInfo ? "Hide" : "Show"} Security Details
      </Button>

      {showSecurityInfo && (
        <Card className="p-4 text-xs space-y-2">
          <p>🔐 Lit Protocol: Encrypted credential verification</p>
          <p>🏦 Coinbase AgentKit: Secure payment processing</p>
          <p>🔒 End-to-end encryption of session data</p>
          <p>🛡️ Decentralized access control</p>
        </Card>
      )}
    </div>
  );
}
