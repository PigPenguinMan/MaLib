/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');
const nextConfig = {
    reactStrictMode:false,
    swcMinify: true,
    // server:{
    //     https:{
    //         key:fs.readFileSync(path.join(__dirname,'localhost.key')),
    //         cert:fs.readFileSync(path.join(__dirname,'localhost.crt'))
    //     }
    // }
    images : { 
        remotePatterns: [
            {
                protocol : 'https',
                hostname : 'www.kmas.or.kr'
            }
        ]
    }
}

module.exports = nextConfig

