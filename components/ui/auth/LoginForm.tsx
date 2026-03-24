"use client"

import {Input} from "../input/Input"
import {Checkbox} from "../input/Checkbox"
import {Button} from "../Button"
import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { validateForm } from "@/utils/validation"

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { loginStep1, isLoading, error } = useAuthStore();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const { LoginSchema } = await import("@/lib/validations/auth");
      const isValid = await validateForm(LoginSchema, { email, password, rememberMe }, setFormErrors);
      if (!isValid) return;
      await loginStep1({ email, password, rememberMe });
    };


    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
            />
            <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
            />
            <div className="flex items-center justify-between">
                <Checkbox
                    id="remember"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <a href="#" className="text-sm text-accent-primary hover:underline">
                    Forgot password?
                </a>
            </div>
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </Button>
        </form>
    )
}
