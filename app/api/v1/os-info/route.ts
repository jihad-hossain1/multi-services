
import { NextRequest, NextResponse } from 'next/server';
import os from 'node:os';

export function GET(req: NextRequest) {
  try {
    const os_version = os.version();
    const os_macadd = os.networkInterfaces();
    const findmacaddrr: any = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'];
  
    const osInfo = {
      os_version,
      os_macadd: findmacaddrr[0]?.mac || 'No Mac Address',
    };
    console.log("🚀 ~ GET ~ osInfo:", osInfo)
  
    return NextResponse.json(osInfo);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}