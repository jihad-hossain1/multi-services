// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export default prisma;

// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//  prisma = new PrismaClient();
// } else 
// { if (!(global as any).prisma)
//      {
// (global as any).prisma = new PrismaClient(); 
// }
//  prisma = (global as any).prisma;
// }

// export default prisma;

import { PrismaClient } from './generated/client'
import { PrismaClient as PrisClient } from "@prisma/client";

let prisma: any;

if (process.env.NODE_ENV === "production") {
 prisma = new PrisClient();
} else 
{ if (!(global as any).prisma)
     {
(global as any).prisma = new PrismaClient(); 
}
 prisma = (global as any).prisma;
}

export default prisma;