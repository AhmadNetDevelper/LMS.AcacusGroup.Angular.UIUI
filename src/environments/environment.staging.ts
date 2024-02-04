export const environment = {
    production: false,
    name: 'Development',
    apiRoute: 'https://localhost:7292/api',
    hubRoute: 'https://localhost:7292/hubs',
    authApiRoute:
        'https://sftp-poc-gateway.azure-api.net/sftp-poc-functions-auth',
    sentry: {
        DSN:
            'https://3e218e103eea4edc8577ca7aca6f031e@o313160.ingest.sentry.io/5352536',
        enabled: false,
        dialogEnabled: false,
    },
};