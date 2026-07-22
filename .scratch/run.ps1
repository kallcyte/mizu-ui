$nodeBin = 'C:\Users\Administrator\AppData\Roaming\fnm\node-versions\v24.18.0\installation'
$env:Path = $nodeBin + ';' + $env:Path
Set-Location 'D:\codes\mizu-ui'
& node .scratch-extract.mjs
