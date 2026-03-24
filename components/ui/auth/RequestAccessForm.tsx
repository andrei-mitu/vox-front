"use client"

import {Input} from "../input/Input"
import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { validateForm } from "@/utils/validation"

import {Button} from "../Button"
import {PhoneInput} from "@/components/ui/input/PhoneInput";

export function RequestAccessForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const { requestAccess, isLoading, error, accessMessage, accessRequested } = useAuthStore();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const { RequestAccessSchema } = await import("@/lib/validations/auth");
      const isValid = await validateForm(RequestAccessSchema, { email, name, phone, companyName, position }, setFormErrors);
      if (!isValid) return;
      await requestAccess({ name, email, phone, companyName, position });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={formErrors.name}
            />
            <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
            />
            <PhoneInput
                id="phone"
                label="Phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={formErrors.phone}
            />
            <Input
                id="company"
                type="text"
                label="Company"
                placeholder="Enter your organization"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={formErrors.companyName}
            />
            <Input
                id="position"
                type="text"
                label="Position"
                placeholder="Your role / position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                error={formErrors.position}
            />
            {error && <p className="text-sm text-error">{error}</p>}
            {accessRequested && accessMessage && (
                <p className="text-sm text-success">{accessMessage}</p>
            )}
            <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
        </form>
    )
}
