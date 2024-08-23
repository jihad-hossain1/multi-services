// 'use server';

// import os from 'node:os';

// export async function osInfos() {
//   const os_version = await os.version()
//   const os_macadd = await os.networkInterfaces()
//   const findmacaddrr:any   = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'] 

//   const osInfo = {
//       os_version: os_version as string,
//       os_macadd: findmacaddrr[0].mac ? findmacaddrr[0].mac : "No Mac Address",
//   }

//   return osInfo
// }