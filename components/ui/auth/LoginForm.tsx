'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Checkbox, Flex, Link, Text} from '@radix-ui/themes';
import {TextInput} from '@/components/ui/input/TextInput';
import {PasswordInput} from '@/components/ui/input/PasswordInput';
import {Button} from '@/components/ui/button/Button';
import {loginSchema, type LoginSchema} from '@/lib/validations/login';

export function LoginForm() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        // TODO: connect to auth
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Flex direction="column" gap="4">
                <TextInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <PasswordInput
                    label="Password"
                    id="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Flex justify="between" align="center">
                    <Text as="label" size="2" className="text-text-secondary cursor-pointer">
                        <Flex gap="2" align="center">
                            <Checkbox {...register('rememberMe')}/>
                            Remember me
                        </Flex>
                    </Text>
                    <Link href="#" size="2" className="text-accent-primary hover:underline">
                        Forgot password?
                    </Link>
                </Flex>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </Flex>
        </form>
    );
}