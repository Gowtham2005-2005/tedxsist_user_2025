"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Label } from "@/components/ui/label2";
import { Input } from "@/components/ui/input2";
import { cn } from "@/lib/utils";
import ProtectedRoute from "@/components/protected-route";
import { Textarea } from "@/components/ui/textarea2";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/firebase/firebase-client"; // Ensure Firestore is properly configured
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
export default function RegisterFormsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
   const router = useRouter();
  const userEmail = user?.email || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  useEffect(() => {
  if (!userEmail) return;

  const checkRegistration = async () => {
    try {
      const registeredDoc = await getDoc(doc(db, "registered", "emails"));
      if (registeredDoc.exists() && registeredDoc.data()?.emails.includes(userEmail)) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      setIsRegistered(false);
    }
  };

  checkRegistration();
}, [userEmail]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      firstName: formData.get("firstname")?.toString().trim(),
      lastName: formData.get("lastname")?.toString().trim(),
      email: userEmail,
      degree: formData.get("degree")?.toString().trim(),
      branch: formData.get("branch")?.toString().trim(),
      experienceResponse: formData.get("q1")?.toString().trim(),
      goalsResponse: formData.get("q2")?.toString().trim(),
      resilienceResponse: formData.get("q3")?.toString().trim(),
    };

    // Validate all fields are filled
    if (Object.values(data).some(value => !value)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.status === 409) { // Handle "already registered" case
      toast({
        title: "Already Registered",
        description: "You have already registered for TEDxSIST 2025.",
        variant: "destructive",
      });
      return;
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    toast({
      title: "Registration Successful!",
      description: "Your application has been submitted successfully.",
      variant: "default"
    
    });

    form.reset();
router.push('/register');
  } catch (error) {
    console.error("Form submission error:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Please try again later.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
}, [toast, userEmail,router]);

if (isRegistered === null) {
  return(
    <ProtectedRoute>
     <main className="bg-background flex min-h-screen flex-col items-center justify-center  py-24">
        <div className="space-y-4 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
      </ProtectedRoute>
  )
  }

  // If already registered, show a different component
  if (isRegistered) {
    return (
      <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen px-4">
  <p className="text-md sm:text-xl md:text-xl font-semibold text-center">
    You have registered for <span className="text-primary">TEDx</span>SIST 2025. Check your inbox and spams.
  </p>
</div>

      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8">
        <h2 className="font-bold text-5xl text-neutral-200 text-center mb-8">
          <span className="text-primary">TEDx</span>SIST 2025 Registration
        </h2>
       <div className="mt-16 mb-4">
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>ATTENTION</AlertTitle>
    <AlertDescription>
      Some departments have CAE on the event day (Feb 24, 2025). Please check your schedule, as the event begins at 10 AM.
    </AlertDescription>
  </Alert>
</div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Personal Details Card */}
          <div className="rounded-2xl shadow-input bg-black p-6 md:p-8 space-y-4 border border-border">
            <h3 className="text-xl font-semibold text-neutral-200 mb-4">
              Personal Details
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input 
                  id="firstname" 
                  name="firstname" 
                  placeholder="First name" 
                  type="text" 
                  required 
                  maxLength={50}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input 
                  id="lastname" 
                  name="lastname" 
                  placeholder="Last name" 
                  type="text" 
                  required 
                  maxLength={50}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={userEmail}
                disabled
                className="opacity-75 cursor-not-allowed"
              />
            </LabelInputContainer>

            <div className="flex flex-col md:flex-row gap-4">
              <LabelInputContainer>
                <Label htmlFor="degree">Degree and Year of Study</Label>
                <Input 
                  id="degree" 
                  name="degree" 
                  placeholder="B.E and 3rd year" 
                  type="text" 
                  required 
                  maxLength={20}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="branch">Branch</Label>
                <Input 
                  id="branch" 
                  name="branch" 
                  placeholder="Computer Science and Engineering" 
                  type="text" 
                  required 
                  maxLength={100}
                />
              </LabelInputContainer>
            </div>
          </div>

          {/* Questions Card */}
          <div className="rounded-2xl shadow-input bg-black p-6 md:p-8 space-y-4 border border-border">
            <h3 className="text-xl font-semibold text-neutral-200 mb-4">
              Questions
            </h3>

            <LabelInputContainer>
              <Label htmlFor="q1">What motivates you to attend TEDxSIST?</Label>
              <Textarea 
                id="q1"
                name="q1"
                placeholder="Your answer..."
                className="min-h-[100px] p-3 bg-zinc-900 border border-border rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                required
                maxLength={500}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="q2">
                Which TED talk has inspired you the most and why?
              </Label>
              <Textarea 
                id="q2"
                name="q2"
                placeholder="Your answer..."
                className="min-h-[100px] p-3 bg-zinc-900 border border-border rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                required
                maxLength={500}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="q3">What do you hope to gain from this experience?</Label>
              <Textarea 
                id="q3"
                name="q3"
                placeholder="Your answer..."
                className="min-h-[100px] p-3 bg-zinc-900 border border-border rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                required
                maxLength={500}
              />
            </LabelInputContainer>
          </div>

          <button
            className="relative group/btn w-full h-12 font-medium text-white rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-[0px_1px_0px_0px_theme(colors.zinc.800)_inset,0px_-1px_0px_0px_theme(colors.zinc.800)_inset] mt-8"
            type="submit"
            disabled={isSubmitting}
          >
            <span className="block transition duration-500 group-hover/btn:text-[#EB0028]">
              {isSubmitting ? "Submitting..." : "Complete Registration →"}
            </span>
            <BottomGradient />
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-[#EB0028] to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-[#EB0028] to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};