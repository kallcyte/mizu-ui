$nodeBin = 'C:\Users\Administrator\AppData\Roaming\fnm\node-versions\v24.18.0\installation'
$env:Path = $nodeBin + ';' + $env:Path
$env:PATHEXT = '.EXE;.CMD;.BAT;.COM'
Set-Location 'D:\codes\mizu-ui'
& pnpm build 2>&1 | Select-Object -Last 6
