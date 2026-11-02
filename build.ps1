$lines = Get-Content "D:\ai产品项目内容\圣诞树div\圣诞树DIY.html"
$htmlHead = $lines[0..777] -join "`n"
$htmlTail = "`n<script src='./assets/main.js'></script>`n</body>`n</html>`n"
$fullHtml = $htmlHead + $htmlTail
[IO.File]::WriteAllText("D:\ai产品项目内容\圣诞树div\dist\index.html", $fullHtml, [Text.Encoding]::UTF8)
Write-Host "Done. Total lines: $($lines.Count)"
