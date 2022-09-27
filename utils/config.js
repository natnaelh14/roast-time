export const sessionOptions = {
    cookieName: "Roast Time",
    password: process.env.COOKIES_TOKEN,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
    ttl: 60 * 60,
}