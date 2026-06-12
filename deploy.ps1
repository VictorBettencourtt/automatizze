# deploy.ps1
# Script de deploy automático para o site Automatizze.ia
# Uso: clique com botão direito → "Executar com PowerShell"
# Ou no terminal: .\deploy.ps1

$projectPath = "C:\Users\victo\Downloads\Site Institucional"
$commitMsg = if ($args[0]) { $args[0] } else { "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "  🤖 Automatizze.ia — Deploy Automático" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não encontrado. Instale em: https://git-scm.com/download/win" -ForegroundColor Red
    Read-Host "Pressione Enter para fechar"
    exit 1
}

# Navegar para o projeto
Set-Location $projectPath

# Verificar se é um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Repositório Git não inicializado." -ForegroundColor Red
    Write-Host "   Execute primeiro: git init && git remote add origin <URL>" -ForegroundColor Yellow
    Read-Host "Pressione Enter para fechar"
    exit 1
}

Write-Host "📁 Verificando alterações..." -ForegroundColor White
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ Nenhuma alteração pendente. Site já está atualizado!" -ForegroundColor Green
    Read-Host "Pressione Enter para fechar"
    exit 0
}

Write-Host ""
Write-Host "📝 Arquivos alterados:" -ForegroundColor White
git status --short
Write-Host ""

# Add, commit, push
Write-Host "📦 Preparando commit..." -ForegroundColor White
git add .

Write-Host "💾 Commit: $commitMsg" -ForegroundColor White
git commit -m $commitMsg

Write-Host ""
Write-Host "🚀 Enviando para GitHub..." -ForegroundColor White
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host "  ✅ Deploy enviado com sucesso!" -ForegroundColor Green
    Write-Host "  ⏳ EasyPanel atualizará em ~60 segundos" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
} else {
    Write-Host ""
    Write-Host "❌ Erro no push. Verifique sua conexão e credenciais do GitHub." -ForegroundColor Red
}

Write-Host ""
Read-Host "Pressione Enter para fechar"
