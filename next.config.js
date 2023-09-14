/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode:false,
    swcMinify: true,

    // async rewrites() {
    //     return [
    //         {
    //             source: '/:path*' ,
    //             destination: `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=1efb2da70d936bb190d6a62d1097f47a`
    //         },
    //         {
    //             source:'/:path*',
    //             destination:'/:path*'
    //         }
    //     ]
    // },
    // async headers() {
    //     return [
    //       {
    //         // matching all API routes
    //         source: "/:path*",
    //         headers: [
    //           { key: "Access-Control-Allow-Credentials", value: "true" },
    //           { key: "Access-Control-Allow-Origin", value: "*" },
    //           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
    //           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
    //         ]
    //       }
    //     ]
    //   }
}

module.exports = nextConfig

