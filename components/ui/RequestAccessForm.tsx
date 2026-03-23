import { FormField } from '@/components/ui/FormField';

export function RequestAccessForm() {
    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <FormField
                label="Full Name"
                id="req-name"
                type="text"
                placeholder="Enter your full name"
            />
            <FormField
                label="Email"
                id="req-email"
                type="email"
                placeholder="Enter your email"
            />
            <FormField
                label="Organization"
                id="organization"
                type="text"
                placeholder="Enter your organization"
            />
            <FormField
                label="Message"
                id="message"
                multiline
                rows={3}
                placeholder="Why do you need access?"
            />

            <button type="submit" className="login-btn-primary">
                Submit Request
            </button>
        </form>
    );
}