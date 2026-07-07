import { NextRequest, NextResponse, after } from "next/server";
import { adminDb } from "@/firebase/firebase-server";

export const maxDuration = 60; // Set max duration to 60 seconds to prevent timeouts

import { FieldValue } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import "dotenv/config";

interface RegistrationBody {
  firstName: string;
  lastName: string;
  email: string;
  degree: string;
  branch: string;
  experienceResponse: string;
  goalsResponse: string;
  resilienceResponse: string;
}

export async function POST(req: NextRequest) {
  let body: RegistrationBody | undefined;

  try {
    const data = await req.json();
    body = data as RegistrationBody;
    const { firstName, lastName, email, degree, branch, experienceResponse, goalsResponse, resilienceResponse } = body;

    const missingFields = [
      !firstName && "firstName",
      !lastName && "lastName",
      !email && "email",
      !degree && "degree",
      !branch && "branch",
      !experienceResponse && "experienceResponse",
      !goalsResponse && "goalsResponse",
      !resilienceResponse && "resilienceResponse",
    ].filter(Boolean);

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing fields: ${missingFields.join(", ")}` }, { status: 400 });
    }

    const participantsRef = adminDb.collection("participants").doc(email);
    const registeredRef = adminDb.collection("registered").doc("emails");
    const participantId = uuidv4();

    await adminDb.runTransaction(async (transaction) => {
      const registeredDoc = await transaction.get(registeredRef);
      const registeredEmails = registeredDoc.exists ? registeredDoc.data()?.emails || [] : [];
      if (registeredEmails.includes(email)) {
        throw new Error("You have already registered.");
      }

      const name = `${firstName} ${lastName}`;
      const department = branch;

      transaction.set(participantsRef, {
        id: participantId,
        name,
        email,
        degree,
        department,
        experienceResponse,
        goalsResponse,
        resilienceResponse,
        attend: false,
        selected: false,
        certgen: false,
        emailsent: false,
        createdAt: FieldValue.serverTimestamp(),
      });

      transaction.set(
        registeredRef,
        { emails: FieldValue.arrayUnion(email) },
        { merge: true }
      );
    });

    after(async () => {
      try {
        await sendConfirmationEmail(email, firstName);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    });

    return NextResponse.json({ success: true, participantId }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "You have already registered.") {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }

      console.error("Error submitting registration", {
        error: error.message,
        stack: error.stack,
        requestData: body || "No request data available",
      });
    } else {
      console.error("An unknown error occurred", { error });
    }

    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

async function sendConfirmationEmail(to: string, username: string) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error("Missing email credentials in environment variables");
    throw new Error("Server misconfiguration: Missing email credentials");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: emailUser,
    to,
    subject: "TEDxSIST 2026 Registration Received! 🎉",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TEDxSIST 2026 Registration</title>
</head>
<body style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
  
  <!-- Preheader Text -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; mso-hide:all; font-size:0px; line-height:0px;">
    Thank you for registering for TEDxSIST 2026. We will notify you if you are selected to attend.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);">
          
          <!-- Header section -->
          <tr>
            <td style="background-color: #000000; padding: 40px 30px; text-align: center;">
              <img src="https://media.marka-img.com/7929a0ca/Z57FdYod0OV2031NJp5b3VwvgbqIpK.png" alt="TEDxSIST 2026 Official Logo" height="40" style="height: 40px; margin-bottom: 24px; display: block; margin: 0 auto 24px auto; border: 0; outline: none; text-decoration: none;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; line-height: 1.3;">Registration Received!</h1>
            </td>
          </tr>

          <!-- Body section -->
          <tr>
            <td style="padding: 40px 30px; color: #18181b;">
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi <strong>${username}</strong>,</p>
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Thank you for registering for TEDxSIST 2026! We are excited by your interest in joining us for an inspiring day filled with powerful ideas and a community of forward-thinkers.</p>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: #475569;"><em>Please note: Due to limited seating, we will be carefully reviewing all applications to select our attendees.</em></p>

              <!-- "Save the Date" Highlight Box using Table for Outlook Compatibility -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background-color: #fef2f2; border-left: 4px solid #eb0028; padding: 24px; border-radius: 0 8px 8px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #eb0028; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">SAVE THE DATE</h3>
                    <p style="margin: 8px 0; font-size: 16px; color: #3f3f46;"><strong style="color: #18181b; display: inline-block; width: 65px;">Date:</strong> 17th July 2026</p>
                    <p style="margin: 8px 0; font-size: 16px; color: #3f3f46;"><strong style="color: #18181b; display: inline-block; width: 65px;">Venue:</strong> Sathyabama Institute of Science and Technology</p>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
                      <tr>
                        <td style="background-color: #f59e0b; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 14px; font-weight: 600;">
                          Status: Application Under Review
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">We will notify you via email if you are selected to attend. Keep an eye on your inbox for further updates!</p>
              
              <!-- CTA Button using Table for Outlook Compatibility -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 40px 0 20px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#eb0028" style="border-radius: 50px;">
                          <a href="https://www.tedxsist.com" role="button" style="color: #ffffff; text-decoration: none; padding: 16px 36px; font-weight: 600; font-size: 16px; display: inline-block; letter-spacing: 0.5px;">Visit Our Website</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <img src="https://media.marka-img.com/7929a0ca/JN8wbGiqp27pedNPfLFkS287aRaBqL.png" alt="TEDxSIST Ideas Change Everything" height="20" style="height: 20px; margin-bottom: 20px; opacity: 0.8; display: inline-block; border: 0; outline: none; text-decoration: none;">
              <p style="font-weight: 600; color: #475569; font-size: 14px; line-height: 1.5; margin: 5px 0;">Ideas Change Everything.</p>
              
              <div style="margin: 20px 0;">
                <a href="https://www.instagram.com/tedxsist?igsh=MWgwMGMzYXh4ZGphZQ==" style="display: inline-block; margin: 0 10px; text-decoration: none;"><img src="https://media.marka-img.com/7929a0ca/i5QmZtopS37189vHhSeQYhkLVdxpj4.png" alt="Instagram" width="24" height="24" style="width: 24px; height: 24px; display: inline-block; border: 0; outline: none; text-decoration: none;"></a>
                <a href="https://www.youtube.com/@TED" style="display: inline-block; margin: 0 10px; text-decoration: none;"><img src="https://media.marka-img.com/7929a0ca/pXM2sDpa6HLApH7tXUhqv5pJ9GlbkQ.png" alt="YouTube" width="24" height="24" style="width: 24px; height: 24px; display: inline-block; border: 0; outline: none; text-decoration: none;"></a>
                <a href="https://www.linkedin.com/company/tedxsist1" style="display: inline-block; margin: 0 10px; text-decoration: none;"><img src="https://media.marka-img.com/7929a0ca/EXFByEdEV7fzmJDV7k1n3px1pc55Mo.png" alt="LinkedIn" width="24" height="24" style="width: 24px; height: 24px; display: inline-block; border: 0; outline: none; text-decoration: none;"></a>
              </div>

              <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 5px 0;">© 2026 TEDxSIST. All rights reserved.</p>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                <tr>
                  <td align="center">
                    <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">Need help? Contact our support team at <br><a href="mailto:tedxsist@gmail.com" style="color: #eb0028; text-decoration: none; font-weight: 600;">tedxsist@gmail.com</a></p>
                  </td>
                </tr>
              </table>
              <p style="color: #94a3b8; font-size: 11px; line-height: 1.5; margin: 15px 0 0 0;">This is an auto-generated email. Please do not reply directly to this message.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
