import { Box, Flex, Text } from '@radix-ui/themes';

interface StatBadgeProps {
    value: string;
    label: string;
}

export function StatBadge({ value, label }: StatBadgeProps) {
    return (
        <Box p="3" style={{
            backgroundColor: 'rgba(35, 35, 35, 0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-3)',
            textAlign: 'center',
        }}>
            <Flex direction="column" align="center" gap="1">
                <Text size="5" weight="bold" style={{ color: 'var(--vox-accent)' }}>{value}</Text>
                <Text size="1" style={{ color: 'var(--vox-text-secondary)' }}>{label}</Text>
            </Flex>
        </Box>
    );
}