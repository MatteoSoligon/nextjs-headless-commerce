import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
     typedRoutes: false,
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);