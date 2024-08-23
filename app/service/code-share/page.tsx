import React from 'react'
import CodeShare from './_comp/CodeShare'
// import os from 'node:os';

// async function osInfos() {
//   const os_version = await os.version()
//   const os_macadd = await os.networkInterfaces()
//   const findmacaddrr:any   = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'] 

//   const osInfo = {
//       os_version: os_version as string,
//       os_macadd: findmacaddrr[0].mac ? findmacaddrr[0].mac : "No Mac Address",
//   }

//   return osInfo
// }

const Sharepage = async () => {
  //  const _osInfo = await osInfos()

  return (
    <div>
        <CodeShare osInfo={{ os_version: "1.0.0", os_macadd: "00:00:00:00:00:00" }} />
    </div>
  )
}

export default Sharepage