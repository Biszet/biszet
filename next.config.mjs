import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        // Disabled: Even 181KB optimized images fail with IPX 500 errors after Jan 12 update
        // Confirmed: NOT a file size issue - IPX is broken for all images
        // Contact Netlify Support: This is a service regression
        unoptimized: true,
    },
    rewrites: async () => {
        return [
            {
                source: '/en/knowledge',
                destination: '/en/wissen',
            },
            {
                source: '/en/knowledge/:slug',
                destination: '/en/wissen/:slug',
            },
        ];
    },
    redirects: () => {
        return [
            // German redirects
            {
                source: '/de/produkte',
                destination: '/de',
                permanent: true,
            },
            {
                source: '/de/bar',
                destination: '/de',
                permanent: true,
            },
            {
                source: '/de/benefits-of-cooling',
                destination: '/de',
                permanent: true,
            },
            {
                source: '/de/chilling-me-softly',
                destination: '/de',
                permanent: true,
            },
            {
                source: '/de/impressum',
                destination: '/de/imprint',
                permanent: true,
            },
            {
                source: '/de/kontakt.html',
                destination: '/de/contact',
                permanent: true,
            },
            {
                source: '/de/kontakt',
                destination: '/de/contact',
                permanent: true,
            },
            {
                source: '/de/datenschutz',
                destination: '/de/dataprotection',
                permanent: true,
            },
            {
                source: '/de/produkte/',
                destination: '/de',
                permanent: true,
            },
            {
                source: '/legal',
                destination: '/',
                permanent: true,
            },

            // English redirects
            {
                source: '/en/products',
                destination: '/en',
                permanent: true,
            },
            {
                source: '/en/bar',
                destination: '/en',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
