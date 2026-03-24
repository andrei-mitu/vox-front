'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Flex} from '@radix-ui/themes';
import {TextInput} from '@/components/ui/input/TextInput';
import {TextareaInput} from '@/components/ui/input/TextareaInput';
import {Button} from '@/components/ui/button/Button';
import {requestAccessSchema, type RequestAccessSchema} from '@/lib/validations/request-access';

export function RequestAccessForm() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RequestAccessSchema>({
        resolver: zodResolver(requestAccessSchema),
    });

    const onSubmit = async (data: RequestAccessSchema) => {
        // TODO: connect to API
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Flex direction="column" gap="4">
                <TextInput
                    label="Full Name"
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                />
                <TextInput
                    label="Email"
                    id="req-email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <TextInput
                    label="Organization"
                    id="organization"
                    type="text"
                    placeholder="Enter your organization"
                    error={errors.organization?.message}
                    {...register('organization')}
                />

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
            </Flex>
        </form>
    );
}