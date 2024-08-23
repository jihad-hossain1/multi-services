import React from 'react'
import CodeShare from './_comp/CodeShare'
// import { osInfos } from '@/helpers/osinfo'


const Sharepage = async () => {
  //  const _osInfo = await osInfos()

  return (
    <div>
        <CodeShare osInfo={{ os_version: "1.0.0", os_macadd: "00:00:00:00:00:00" }} />
    </div>
  )
}

export default Sharepage