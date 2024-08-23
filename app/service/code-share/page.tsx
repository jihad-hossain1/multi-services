import React from 'react'
import CodeShare from './_comp/CodeShare'
import os from 'node:os'


const Sharepage = async () => {
  // const os_version =  os.version()
  // const os_macadd =  os.networkInterfaces()
  // const findmacaddrr:any   = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'] 

  // const osInfo = {
  //     os_version: os_version as string,
  //     os_macadd: findmacaddrr[0]?.mac ? findmacaddrr[0]?.mac : "No Mac Address",
  // }

  return (
    <div>
        <CodeShare osInfo={{os_version: "d",os_macadd: "d"}} />
    </div>
  )
}

export default Sharepage