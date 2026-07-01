# Codebox Event Demo

## 개요

이 저장소는 DOM 기반 UI와 커스텀 이벤트 플로우 시스템을 활용한 한글 타이핑 프로그램입니다.

- `index.html` - 앱 진입점 HTML
- `index.css` - 기본 스타일
- `index.js` - 앱 초기화 및 UI 구성, 모듈화된 구조 사용
- `hangulClass.js` - 한글 입력 처리를 위한 클래스
- `keyboardClass.js` - 키보드 입력 처리를 위한 클래스
- `sequent/` - 커스텀 이벤트 시스템 모듈

## 프로젝트 구조

```
codebox/
├── index.html                    # 진입점 HTML
├── index.css                     # 스타일시트
├── index.js                      # 앱 초기화 (모듈화된 구조)
├── hangulClass.js                # 한글 입력 처리
├── keyboardClass.js              # 키보드 입력 처리
├── FileInput.js                  # 파일 입력 처리
├── frameEmitter.js               # 프레임 기반 타이밍
├── utils/                        # DOM 유틸리티
│   └── DOM.js                    # 요소 생성, 스타일 설정
├── events/                       # 이벤트 핸들러
│   ├── ButtonHandler.js          # 버튼 클릭 이벤트
│   ├── DragHandler.js            # 드래그 이벤트
│   ├── DocumentHandler.js        # 문서 클릭 이벤트
│   └── KeyboardHandler.js        # 키보드 입력 이벤트
├── ui/                           # UI 컴포넌트
│   ├── components/
│   │   ├── Input.js              # 입력 필드
│   │   ├── Monitor.js            # 텍스트 디스플레이
│   │   ├── Status.js             # 상태 표시줄
│   │   └── Ground.js             # 메인 컨테이너
│   └── window/
│       ├── Window.js             # 드래그 가능한 윈도우
│       ├── CloseButton.js        # 닫기 버튼
│       └── MaxMinButton.js       # 최대화/최소화 버튼
├── services/                     # 비즈니스 로직 서비스
│   ├── TypingSpeedService.js     # WPM 계산 서비스
│   └── FileService.js            # 파일 입력 서비스
└── sequent/                      # 커스텀 이벤트 시스템
    ├── EventEmitter.js           # DOM 이벤트 래퍼
    ├── EventActionClass.js       # 단일 이벤트 액션
    ├── EventElementClass.js      # 이벤트 액션 흐름 구성
    └── EventHandler.js           # 이벤트 요소 그룹 관리
```

## 주요 목적

- DOM 이벤트를 추상화하는 `sequent` 이벤트 프레임워크 테스트
- 사용자 인터페이스 요소 생성과 이벤트 연결 흐름 시연
- 두벌식 키보드 매핑을 통한 한글 입력 처리
- 이벤트 흐름 제어 및 재사용 가능성 검토
- 모듈화된 아키텍처를 통한 코드 유지보수성 향상

## 실행 방법

1. 로컬 웹 서버에서 `index.html`을 엽니다.
2. 또는 브라우저에서 `index.html`을 직접 열어 동작을 확인합니다.

## 모듈 설명

### utils/DOM.js
DOM 요소 생성 및 조작 유틸리티
- `createDivElement()` - 스타일된 div 요소 생성
- `settingDivElement()` - 요소 중앙 정렬
- `appBInd()` - 요소 추가 및 정렬

### events/
이벤트 핸들러 모듈
- `ButtonHandler.js` - 클릭 이벤트 및 전체화면 토글
- `DragHandler.js` - 마우스 드래그 앤 드롭
- `DocumentHandler.js` - 문서 수준 클릭 처리
- `KeyboardHandler.js` - 키보드 입력, 언어 전환, 백스페이스

### ui/components/
UI 컴포넌트 모듈
- `Input.js` - 사용자 입력 필드
- `Monitor.js` - 텍스트 디스플레이 모니터
- `Status.js` - 타이핑 속도 상태 표시
- `Ground.js` - 메인 컨테이너

### ui/window/
윈도우 시스템 모듈
- `Window.js` - 드래그 가능한 윈도우 컨테이너
- `CloseButton.js` - 윈도우 닫기 버튼
- `MaxMinButton.js` - 최대화/최소화 버튼

### services/
비즈니스 로직 서비스
- `TypingSpeedService.js` - WPM(분당 단어 수) 계산 및 표시
- `FileService.js` - 파일 입력 처리 및 텍스트 로딩

## 리팩토링 진행 상황

현재 5단계(서비스 추출)까지 완료됨:
- ✅ 1단계: 유틸리티 추출
- ✅ 2단계: 이벤트 핸들러 추출
- ✅ 3단계: UI 컴포넌트 추출
- ✅ 4단계: 윈도우 시스템 추출
- ✅ 5단계: 서비스 추출
- ⏸️ 6단계: 애플리케이션 레이어 생성 (보류)
- ⏸️ 7단계: 진입점 단순화 (보류)
- ~~`README.md`의 사용 예시 확대~~ - 기본 구조 및 실행 방법 문서화 완료
- ~~`sequent/README.md`와 함께 프로젝트 문서화 강화~~ - sequent 모듈은 별도 저장소로 관리
- ~~한글 입력 시스템 구현~~ - hangulClass.js와 keyboardClass.js 추가 완료
