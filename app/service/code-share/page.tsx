import React from 'react'
import CodeShare from './_comp/CodeShare'
import os from 'node:os';



const Sharepage = () => {
    const os_version = os.version()
    const os_macadd = os.networkInterfaces()
    const findmacaddrr:any   = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'] 

    const osInfo = {
        os_version,
        os_macadd: findmacaddrr[0].mac ? findmacaddrr[0].mac : "No Mac Address",
    }

  return (
    <div>
        <CodeShare osInfo={osInfo} />
    </div>
  )
}

export default Sharepage