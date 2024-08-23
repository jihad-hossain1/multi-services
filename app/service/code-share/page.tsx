import React from 'react'
import CodeShare from './_comp/CodeShare'
import { osInfos } from '@/helpers/osinfo'


const Sharepage = async () => {
   const _osInfo = await osInfos()

  return (
    <div>
        <CodeShare osInfo={_osInfo} />
    </div>
  )
}

export default Sharepage