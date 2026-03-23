import {FormField} from '@/components/ui/FormField';

export function LoginForm() {
    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <FormField
                label="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
            />
            <FormField
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-sm"
                       style={{color: 'var(--login-text-muted)'}}>
                    <input type="checkbox" className="w-4 h-4 rounded accent-[#75BEBF]"/>
                    <span>Remember me</span>
                </label>
                <a href="#" className="text-sm hover:underline" style={{color: 'var(--login-brand)'}}>
                    Forgot password?
                </a>
            </div>

            <button type="submit" className="login-btn-primary">
                Sign In
            </button>
        </form>
    );
}