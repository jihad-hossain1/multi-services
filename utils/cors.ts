import Cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://onuragi.vercel.app'];

// Initialize CORS middleware
const cors = Cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Origin is allowed
        } else {
            callback(new Error(`Origin ${origin} is not allowed by CORS`)); // Origin is not allowed
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
});

// Helper to run middleware in Next.js
export function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
