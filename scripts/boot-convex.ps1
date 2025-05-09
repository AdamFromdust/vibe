
# Install Convex CLI globally
pnpm add -g convex@latest

# Check for CONVEX_DEPLOY_KEY in Convex production environment
$DEPLOY_KEY = & npx convex env --prod get CONVEX_DEPLOY_KEY 2>&1

if ($DEPLOY_KEY -match 'not found') {
    Write-Host "`n`e[31m✖ Environment variable 'CONVEX_DEPLOY_KEY' not found.`e[0m"
    Write-Host "`nTo deploy with Convex, you need to set your deploy key."
    Write-Host "1. Visit your Convex dashboard: https://dashboard.convex.dev"
    Write-Host "2. Go to your project settings and copy the Deploy Key."
    Write-Host "3. Add it to your environment variables as CONVEX_DEPLOY_KEY."
    Write-Host "`nExample (.env):`nCONVEX_DEPLOY_KEY=your-deploy-key-here`n"

    # Try to get CONVEX_DEPLOY_KEY from local .env or .env.local
    if (Test-Path .env.local) {
        $LOCAL_KEY = Get-Content .env.local | Where-Object { $_ -match '^CONVEX_DEPLOY_KEY=' } | ForEach-Object { $_ -replace '^CONVEX_DEPLOY_KEY=', '' }
        if ($LOCAL_KEY) {
            Write-Host "`e[34mFound CONVEX_DEPLOY_KEY in .env.local. Attempting to add to Vercel production env...`e[0m"
            $env:CONVEX_DEPLOY_KEY = $LOCAL_KEY
            Write-Host "`e[32m✓ Successfully set CONVEX_DEPLOY_KEY`e[0m"
            
            # Set the key in Vercel environment
            try {
                vercel env add CONVEX_DEPLOY_KEY production
            } catch {
                Write-Host "`e[33mWarning: Could not set CONVEX_DEPLOY_KEY in Vercel environment`e[0m"
            }
        }
    } elseif (Test-Path .env) {
        $LOCAL_KEY = Get-Content .env | Where-Object { $_ -match '^CONVEX_DEPLOY_KEY=' } | ForEach-Object { $_ -replace '^CONVEX_DEPLOY_KEY=', '' }
        if ($LOCAL_KEY) {
            Write-Host "`e[34mFound CONVEX_DEPLOY_KEY in .env. Attempting to add to Vercel production env...`e[0m"
            $env:CONVEX_DEPLOY_KEY = $LOCAL_KEY
            Write-Host "`e[32m✓ Successfully set CONVEX_DEPLOY_KEY`e[0m"
            
            # Set the key in Vercel environment
            try {
                vercel env add CONVEX_DEPLOY_KEY production
            } catch {
                Write-Host "`e[33mWarning: Could not set CONVEX_DEPLOY_KEY in Vercel environment`e[0m"
            }
        }
    }
}
