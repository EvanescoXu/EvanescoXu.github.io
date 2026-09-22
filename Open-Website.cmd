@echo off
cd /d "%~dp0"
powershell -NoProfile -Command "$items = @(Get-ChildItem -LiteralPath './photos' -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|webp|gif|avif)$' } | Sort-Object Name | ForEach-Object { @{src=('photos/' + [uri]::EscapeDataString($_.Name)); alt=$_.BaseName} }); if ($items.Count -eq 0) { $items = @(@{src='assets/home-reference.png';alt='Palm reflection';reference=$true}) }; $json = ConvertTo-Json -InputObject $items -Depth 3; Set-Content -LiteralPath './photos.js' -Value ('window.PHOTOS = ' + $json + ';') -Encoding UTF8; Start-Process -FilePath (Join-Path (Get-Location) 'index.html')"
if errorlevel 1 pause
