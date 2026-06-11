"use client"

import { useState } from "react"
import { auth, googleProvider } from "@/firebase/firebase-client"
import { signInWithPopup } from "firebase/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    if (!termsAccepted) return
    setIsLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      // No need to redirect here - the page component will handle it
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Register Here!!</h1>
                <p className="text-balance text-muted-foreground">
                  Register for TEDxSIST 2026
                </p>
              </div>
              
              <div className="flex flex-row items-center gap-3">
                <Checkbox 
                
                  id="terms" 
                  
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to attend the event in person and accept the terms of participation. I understand that by registering, I consent to share my information for event-related communications and acknowledge that photography/recording may occur during the event. I understand that registration will not comfirm my seat and there will be a shortlisting process to select 100 participants.
                </label>
              </div>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Continue with
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
              <Button 
                variant="default" 
                className={cn("w-full", (!termsAccepted || isLoading) && "cursor-not-allowed")}
                disabled={!termsAccepted || isLoading}
                onClick={handleGoogleLogin}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </>
                )}
                <span className="sr-only">Login with Google</span>
              </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                © TEDxSIST 2026
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/1fc6d1323b248916ccdc0358050cf6f2ba7a2433.jpg"
              alt="TEDxSIST 2026 Registration"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
