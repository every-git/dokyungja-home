#!/bin/bash

# 🚀 Dokyungja Home 배포 스크립트
# GitHub Pages 배포를 위한 빌드 및 배포 스크립트

set -e  # 에러 발생 시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 함수: 로그 출력
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# 배포 시작
log_info "🚀 Dokyungja Home 배포를 시작합니다..."

# 1. Node.js 버전 확인
log_info "Node.js 버전 확인 중..."
if ! command -v node &> /dev/null; then
    log_error "Node.js가 설치되어 있지 않습니다."
    exit 1
fi

NODE_VERSION=$(node -v)
log_success "Node.js 버전: $NODE_VERSION"

# 2. 의존성 설치 확인
log_info "의존성 확인 중..."
if [ ! -d "node_modules" ]; then
    log_warning "node_modules가 없습니다. 의존성을 설치합니다..."
    npm install
else
    log_success "의존성이 이미 설치되어 있습니다."
fi

# 3. 빌드 전 기존 dist 폴더 정리
log_info "기존 빌드 파일 정리 중..."
if [ -d "dist" ]; then
    rm -rf dist
    log_success "기존 dist 폴더를 삭제했습니다."
fi

# 4. 프로젝트 빌드
log_info "프로젝트 빌드 중..."
npm run build

if [ ! -d "dist" ]; then
    log_error "빌드에 실패했습니다. dist 폴더가 생성되지 않았습니다."
    exit 1
fi

log_success "빌드가 완료되었습니다. ✓"

# 5. 빌드 결과 확인
BUILD_SIZE=$(du -sh dist | cut -f1)
log_info "빌드 결과 크기: $BUILD_SIZE"

# 6. Git 작업 (배포)
echo ""
log_info "Git 저장소에 변경사항을 커밋하고 푸시합니다..."

# Git 저장소 확인
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log_error "현재 디렉토리가 Git 저장소가 아닙니다."
    exit 1
fi

# 변경사항 확인
if git diff --quiet && git diff --cached --quiet; then
    log_warning "커밋할 변경사항이 없습니다."
else
    # 커밋 메시지 설정 (인자가 있으면 사용, 없으면 날짜/시간 사용)
    if [ -n "$1" ]; then
        COMMIT_MESSAGE="$1"
        log_info "커밋 메시지: $COMMIT_MESSAGE"
    else
        COMMIT_MESSAGE="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
        log_info "커밋 메시지: $COMMIT_MESSAGE (자동 생성)"
    fi
    
    # Git 작업 수행
    git add .
    log_success "파일을 스테이징했습니다."
    
    git commit -m "$COMMIT_MESSAGE"
    log_success "커밋을 완료했습니다."
    
    git push origin main
    log_success "원격 저장소에 푸시했습니다."
    
    echo ""
    log_success "✅ 배포가 완료되었습니다!"
    log_info "GitHub Actions가 자동으로 GitHub Pages에 배포합니다."
fi
