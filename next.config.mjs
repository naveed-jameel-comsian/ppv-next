/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["linentechwebdev.s3.amazonaws.com", "encrypted-tbn0.gstatic.com"], // Add your S3 domain here
    },
};

export default nextConfig;
