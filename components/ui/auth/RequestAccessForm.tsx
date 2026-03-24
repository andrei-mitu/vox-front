"use client"

import {Input} from "../input/Input"
import {Textarea} from "../input/Textarea"
import {Button} from "../Button"

export function RequestAccessForm() {
    return (
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <Input id="req-name" type="text" label="Full Name" placeholder="Enter your full name"/>
            <Input id="req-email" type="email" label="Email" placeholder="Enter your email"/>
            <Input id="organization" type="text" label="Organization" placeholder="Enter your organization"/>
            <Textarea id="message" label="Message" rows={3} placeholder="Why do you need access?"/>
            <Button type="submit" fullWidth>
                Submit Request
            </Button>
        </form>
    )
}
