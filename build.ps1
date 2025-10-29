[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
# build.ps1
# Génère une page HTML autonome (style + script inclus) basée sur donnees.csv et template.html

# chemins
$basePath   = Split-Path -Parent $MyInvocation.MyCommand.Path
$dataFile   = Join-Path $basePath "data\donnees.csv"
$template   = Join-Path $basePath "static\template.html"
$outputFile = Join-Path $basePath "dist\index.html"
$cssFile    = Join-Path $basePath "static\style.css"
$jsFile     = Join-Path $basePath "static\script.js"
$svgFile     = Join-Path $basePath "static\pieces.svg"

# lecture csv
$pieces = Import-Csv -Path $dataFile -Delimiter ";"

# génération des boîtes par zone
$zones = @{
    "haut"   = ""
    "bas"    = ""
    "gauche" = ""
    "droite" = ""
}

foreach ($p in $pieces) {
    $etat = if ($p.NombreAchete -eq 0) {
        "dispo"
    } elseif ($p.NombreAchete -lt $p.NombreTotal) {
        "partiel"
    } else {
        "complet"
    }

    $zones[$p.Position] += @"
    <button class="boite $etat" 
         data-piece="$($p.Piece)" 
         data-total="$($p.NombreTotal)" 
         data-achete="$($p.NombreAchete)" 
         data-acheteurs="$($p.Acheteurs)"
         data-svgtype="$($p.SVGType)"
         data-image="$($p.image)">
        <span>$($p.Piece)</span>
    </button>
"@
}

# charger template
$templateContent = Get-Content $template -Raw -Encoding UTF8
# charger css/js
$cssContent = Get-Content $cssFile -Raw
$jsContent  = Get-Content $jsFile -Raw
$svgContent  = Get-Content $svgFile -Raw

# remplacer placeholders
$page = $templateContent -replace "{{ZONE_HAUT}}",    $zones["haut"]
$page = $page -replace "{{ZONE_BAS}}",     $zones["bas"]
$page = $page -replace "{{ZONE_GAUCHE}}",  $zones["gauche"]
$page = $page -replace "{{ZONE_DROITE}}",  $zones["droite"]
$page = $page -replace "{{CSS_INLINE}}",   "<style>`r`n$cssContent`r`n</style>"
$page = $page -replace "{{JS_INLINE}}",    "<script>`r`n$jsContent`r`n</script>"
$page = $page -replace "{{SVG_INLINE}}",   "`r`n$svgContent`r`n"

# écrire page
New-Item -ItemType Directory -Force -Path (Split-Path $outputFile) | Out-Null
Set-Content -Path $outputFile -Value $page -Encoding UTF8

Write-Host "✅ Page générée avec zones positionnées : $outputFile"
