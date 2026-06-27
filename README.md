# Codebox Event Demo

## 개요

이 저장소는 DOM 기반 UI와 커스텀 이벤트 플로우 시스템을 활용한 한글 타이핑 프로그램입니다.

- `index.html` - 앱 진입점 HTML
- `index.css` - 기본 스타일
- `index.js` - 앱 초기화 및 UI 구성, `sequent` 이벤트 모듈 사용 예시
- `hangulClass.js` - 한글 입력 처리를 위한 클래스
- `keyboardClass.js` - 키보드 입력 처리를 위한 클래스
- `sequent/` - 커스텀 이벤트 시스템 모듈

## 주요 목적

- DOM 이벤트를 추상화하는 `sequent` 이벤트 프레임워크 테스트
- 사용자 인터페이스 요소 생성과 이벤트 연결 흐름 시연
- 두벌식 키보드 매핑을 통한 한글 입력 처리
- 이벤트 흐름 제어 및 재사용 가능성 검토

## 실행 방법

1. 로컬 웹 서버에서 `index.html`을 엽니다.
2. 또는 브라우저에서 `index.html`을 직접 열어 동작을 확인합니다.

## `sequent/` 폴더 설명

`sequent/`에는 다음과 같은 모듈이 포함되어 있습니다.

- `EventEmitter.js` - DOM 이벤트를 관리하는 이벤트 래퍼
- `EventActionClass.js` - 단일 이벤트 액션 정의
- `EventElementClass.js` - 이벤트 액션을 모아 흐름을 구성
- `EventHandler.js` - 이벤트 요소 그룹 관리를 위한 도우미
- `EventFlowClass.js`, `EventFlowEnum.js` - 이벤트 플로우 상태 관리

## 한글 입력 시스템

### hangulClass.js
- 두벌식 키보드 매핑 (static map)
- 키 입력을 자모로 변환
- 자모 조합을 통한 한글 완성
- 백스페이스 처리

### keyboardClass.js
- 언어 모드 전환 (한글/영어)
- 입력/출력 버퍼 관리
- 정답 비교를 위한 타겟 버퍼
- HangulClass를 활용한 한글 처리

## 완료된 보완 항목

- ~~`index.js`와 `sequent/` 간 역할 분리~~ - 현재 sequent 모듈을 submodule로 분리 완료
- ~~`README.md`의 사용 예시 확대~~ - 기본 구조 및 실행 방법 문서화 완료
- ~~`sequent/README.md`와 함께 프로젝트 문서화 강화~~ - sequent 모듈은 별도 저장소로 관리
- ~~한글 입력 시스템 구현~~ - hangulClass.js와 keyboardClass.js 추가 완료
