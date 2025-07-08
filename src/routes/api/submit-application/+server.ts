import { json } from '@sveltejs/kit';
import { db } from '$lib/db/connection';
import { applications } from '$lib/db/schema';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
  try {
    const formData = await request.json();

    // Save to database
    const [application] = await db.insert(applications).values(formData).returning();

    // Send email
    const transporter = nodemailer.createTransporter({
      host: env.EMAIL_HOST,
      port: parseInt(env.EMAIL_PORT),
      secure: false,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
      }
    });

    const emailHtml = generateEmailTemplate(formData);

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: formData.email,
      subject: 'CDCR Background Security Clearance Application Submitted',
      html: emailHtml
    });

    return json({ success: true, id: application.id });
  } catch (error) {
    console.error('Error submitting application:', error);
    return json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

function generateEmailTemplate(data) {
  return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<style>
				body { font-family: 'Merriweather', serif; line-height: 1.6; color: #2f3237; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background-color: #f8f9fc; padding: 20px; text-align: center; border-radius: 8px; }
				.section { margin: 20px 0; padding: 15px; background-color: #f1f3f9; border-radius: 8px; }
				.field { margin: 8px 0; }
				.label { font-weight: bold; color: #5e636e; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>CDCR Background Security Clearance Application</h1>
					<p>Application Submitted Successfully</p>
				</div>

				<div class="section">
					<h2>Personal Information</h2>
					<div class="field"><span class="label">Name:</span> ${data.lastName}, ${data.firstName} ${data.middleInitial || ''}</div>
					<div class="field"><span class="label">Date of Birth:</span> ${data.dateOfBirth}</div>
					<div class="field"><span class="label">Gender:</span> ${data.gender}</div>
					${data.otherNames ? `<div class="field"><span class="label">Other Names:</span> ${data.otherNames}</div>` : ''}
				</div>

				<div class="section">
					<h2>Contact Information</h2>
					<div class="field"><span class="label">Phone:</span> ${data.phoneNumber}</div>
					<div class="field"><span class="label">Email:</span> ${data.email}</div>
					${data.state ? `<div class="field"><span class="label">State:</span> ${data.state}</div>` : ''}
				</div>

				<div class="section">
					<h2>Authorization Type</h2>
					<div class="field">${data.authorizationType}</div>
				</div>

				<div class="section">
					<h2>Background Questions</h2>
					<div class="field"><span class="label">Visited/relationship with inmate:</span> ${data.visitedInmate ? 'Yes' : 'No'}</div>
					<div class="field"><span class="label">Former inmate:</span> ${data.formerInmate ? 'Yes' : 'No'}</div>
					<div class="field"><span class="label">Restricted access:</span> ${data.restrictedAccess ? 'Yes' : 'No'}</div>
					<div class="field"><span class="label">Felony conviction:</span> ${data.felonyConviction ? 'Yes' : 'No'}</div>
					<div class="field"><span class="label">On probation/parole:</span> ${data.onProbationParole ? 'Yes' : 'No'}</div>
					<div class="field"><span class="label">Pending charges:</span> ${data.pendingCharges ? 'Yes' : 'No'}</div>
				</div>

				<p style="text-align: center; color: #8f96a3; font-size: 12px; margin-top: 30px;">
					This is an automated email. Please do not reply to this message.
				</p>
			</div>
		</body>
		</html>
	`;
}
