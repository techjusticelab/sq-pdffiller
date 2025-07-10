// lib/pdfGenerator.js
import { PDFDocument } from 'pdf-lib';
import pdfTemplate from '$lib/CDCR 2311 (1).pdf';

export async function generateFilledPdf(formData) {
  try {
    // Fetch the empty PDF template using the imported URL
    const formPdfBytes = await fetch(pdfTemplate).then((res) => res.arrayBuffer());

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(formPdfBytes);

    // Get the form fields
    const form = pdfDoc.getForm();

    // Fill in Personal Information
    form
      .getTextField('Legal Last Name First Name and Middle Initial')
      .setText(`${formData.lastName}, ${formData.firstName} ${formData.middleInitial || ''}`);

    form.getTextField('Other names you have been known by').setText(formData.otherNames || '');

    form.getTextField('Date of Birth Month Day Year').setText(formData.dateOfBirth || '');

    // Gender Selection (Using radio buttons in Group1)
    const genderField = form.getRadioGroup('Group1');
    if (formData.gender === 'Male') {
      genderField.select('Male');
    } else if (formData.gender === 'Female') {
      genderField.select('Female');
    } else if (formData.gender === 'Non-Binary') {
      genderField.select('Non-Binary');
    }

    // Social Security Number (split into 3 fields)
    if (formData.ssn) {
      const ssnParts = formData.ssn.replace(/\D/g, '').split('');
      if (ssnParts.length >= 3) {
        form.getTextField('Social Security Number1').setText(ssnParts.slice(0, 3).join(''));
        if (ssnParts.length >= 5) {
          form.getTextField('Social Security Number2').setText(ssnParts.slice(3, 5).join(''));
          if (ssnParts.length >= 9) {
            form.getTextField('Social Security Number3').setText(ssnParts.slice(5, 9).join(''));
          }
        }
      }
    }

    // Contact Information
    if (formData.phoneNumber) {
      const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
      if (phoneDigits.length >= 3) {
        // Ensure the text length does not exceed the maxLength of the field
        const contactNumber1Text = phoneDigits.slice(0, 3);
        form.getTextField('Contact Number1').setText(contactNumber1Text);

        if (phoneDigits.length >= 10) {
          // Ensure the remaining text length does not exceed the maxLength
          const remainingDigits = phoneDigits.slice(3);
          const contactNumber2Text = remainingDigits.slice(0, Math.min(remainingDigits.length, 7)); // Limiting to 7 characters
          form.getTextField('Contact Number2').setText(contactNumber2Text);
        }
      }
    }

    form
      .getTextField('State ID or Drivers License')
      .setText(formData.stateId || formData.driverLicense || '');

    form
      .getTextField('Passport if no State IDDrivers License')
      .setText(formData.passportNumber || '');

    form.getTextField('State Bar Number').setText(formData.stateBarNumber || '');

    form.getTextField('State').setText(formData.state || '');

    // Background Questions (using radio groups)
    // Visited inmate
    const visitedInmateField = form.getRadioGroup('Group2');
    if (formData.visitedInmate) {
      visitedInmateField.select('Yes'); // Yes
    } else {
      visitedInmateField.select('No'); // No
    }

    // Former inmate
    const formerInmateField = form.getRadioGroup('Group3');
    if (formData.formerInmate) {
      formerInmateField.select('Yes'); // Yes
    } else {
      formerInmateField.select('No'); // No
    }

    // Restricted access
    const restrictedAccessField = form.getRadioGroup('Group4');
    if (formData.restrictedAccess) {
      restrictedAccessField.select('Yes'); // Yes
    } else {
      restrictedAccessField.select('No'); // No
    }

    // Felony conviction
    const felonyConvictionField = form.getRadioGroup('Group5');
    if (formData.felonyConviction) {
      felonyConvictionField.select('Yes'); // Yes
      if (formData.felonyDetails) {
        form
          .getTextField('Date(s), counties, violation(s) & disposition')
          .setText(formData.felonyDetails);
      }
    } else {
      felonyConvictionField.select('No'); // No
    }

    // Probation/parole
    const probationParoleField = form.getRadioGroup('Group6');
    if (formData.onProbationParole) {
      probationParoleField.select('Yes'); // Yes
    } else {
      probationParoleField.select('No'); // No
    }

    // Pending charges
    const pendingChargesField = form.getRadioGroup('Group7');
    if (formData.pendingCharges) {
      pendingChargesField.select('Yes'); // Yes
    } else {
      pendingChargesField.select('No'); // No
    }

    // Authorization Type
    //    const authTypeField = form.getRadioGroup('Group8');
    //    if (formData.authorizationType === 'Gate Clearance') {
    //      authTypeField.select('0');
    //    } else if (formData.authorizationType === 'State ID Card (Contractor)') {
    //      authTypeField.select('1');
    //    }

    // Date
    const today = new Date();
    const dateString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    form.getTextField('Date1').setText(dateString);
    // Check if the signature field exists before setting the value
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
