"use client"

import {Input} from "../input/Input"
import {Checkbox} from "../input/Checkbox"
import {Button} from "../Button"

export function LoginForm() {
    return (
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <Input id="email" type="email" label="Email" placeholder="Enter your email"/>
            <Input id="password" type="password" label="Password" placeholder="Enter your password"/>
            <div className="flex items-center justify-between">
                <Checkbox id="remember" label="Remember me"/>
                <a href="#" className="text-sm text-accent-primary hover:underline">
                    Forgot password?
                </a>
            </div>
            <Button type="submit" fullWidth>
                Sign In
            </Button>
        </form>
    )
}
