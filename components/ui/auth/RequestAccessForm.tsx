"use client"

import {Input} from "../input/Input"
import { useState } from "react"
import { useAuthStore } from "@/store/authStore"

import {Button} from "../Button"

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
    const result = RequestAccessSchema.safeParse({ email, name, phone, companyName, position });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path && err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }
    setFormErrors({});
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
            />
            {formErrors.name && <p className="text-sm text-error">{formErrors.name}</p>}
            <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && <p className="text-sm text-error">{formErrors.email}</p>}
            <Input
                id="phone"
                type="text"
                label="Phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {formErrors.phone && <p className="text-sm text-error">{formErrors.phone}</p>}
            <Input
                id="company"
                type="text"
                label="Company"
                placeholder="Enter your organization"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            {formErrors.companyName && <p className="text-sm text-error">{formErrors.companyName}</p>}
            <Input
                id="position"
                type="text"
                label="Position"
                placeholder="Your role / position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            {formErrors.position && <p className="text-sm text-error">{formErrors.position}</p>}
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
