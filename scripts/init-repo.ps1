
# --- Configuration ---
# Set this to the main branch name you prefer (usually main or master)
$MAIN_BRANCH_NAME = "main"
# Set to 'true' if you want to automatically confirm Vercel deployments
$AUTO_CONFIRM_VERCEL = $true

# --- Error Handling ---
$ErrorActionPreference = "Stop"
$ERRORS = @()

# Function to report errors and exit
function Handle-Error {
    param(
        [string]$command,
        [string]$message
    )
    $ERRORS += "Error running command: $command"
    $ERRORS += "Details: $message"
    foreach ($error in $ERRORS) {
        Write-Host "`e[31m$error`e[0m"
    }
    exit 1
}

# Ensure we're in a git repository
try {
    git rev-parse --git-dir | Out-Null
} catch {
    Handle-Error "git rev-parse" "Not a git repository. Please initialize git first."
}

# Check if origin remote exists and add if it doesn't
try {
    $remotes = git remote
    if ($remotes -notcontains "origin") {
        $gitUrl = git config --get remote.origin.url
        if (-not $gitUrl) {
            Write-Host "No origin remote found. Please add your repository URL:"
            $gitUrl = Read-Host
            git remote add origin $gitUrl
        }
    }
} catch {
    Handle-Error "git remote" "Failed to check/add git remote"
}

# Create and switch to main branch if it doesn't exist
try {
    $currentBranch = git rev-parse --abbrev-ref HEAD
    if ($currentBranch -ne $MAIN_BRANCH_NAME) {
        git checkout -b $MAIN_BRANCH_NAME
    }
} catch {
    Handle-Error "git branch" "Failed to create/switch to main branch"
}

# Initialize Vercel if not already initialized
try {
    if (-not (Test-Path .vercel)) {
        Write-Host "Initializing Vercel..."
        if ($AUTO_CONFIRM_VERCEL -eq $true) {
            vercel --yes
        } else {
            vercel
        }
    }
} catch {
    Handle-Error "vercel" "Failed to initialize Vercel"
}

Write-Host "`e[32m*** Repository initialized successfully! ***`e[0m"
