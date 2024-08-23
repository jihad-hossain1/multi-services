import React from 'react'
import CodeShare from './_comp/CodeShare'

const Sharepage = async () => {
  let osInfo = { os_version: '', os_macadd: 'No Mac Address' };

  if (typeof window === 'undefined') {
    // This code runs only on the server
    const os = await import('os');
    const os_version = os.version();
    const os_macadd = os.networkInterfaces();
    const findmacaddrr: any = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'];

    osInfo = {
      os_version: os_version as string,
      os_macadd: findmacaddrr[0]?.mac ? findmacaddrr[0]?.mac : "No Mac Address",
    };
  }

  return (
    <div>
        <CodeShare osInfo={osInfo} />
    </div>
  )
}

export default Sharepage;
