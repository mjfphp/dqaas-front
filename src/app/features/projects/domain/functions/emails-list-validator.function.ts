import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Custom validator for an array of emails.
 * Ensures each value in the array is a valid email.
 */
export function emailListValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emails: string[] = control.value || [];

        // Check if any email is invalid
        const invalidEmails = emails.filter(email => !emailRegex.test(email));

        return invalidEmails.length > 0 ? { invalidEmails: invalidEmails } : null;
    };
}
