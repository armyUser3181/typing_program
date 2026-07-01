# 타자 속도 측정 시스템 아이디어 보고서

## 현재 시스템 분석

### 기존 구조
- **KeyboardClass**: 키 입력 처리, 한글/영어 모드 지원
- **target.buffer**: 타자 연습용 텍스트 (현재 'hello world')
- **output.buffer**: 사용자 입력 결과
- **order**: 현재 입력 위치 추적
- **processKey**: 키 입력 처리 및 정답 확인
- **FileInput**: 파일 드래그 앤 드롭으로 연습 텍스트 로드

### 현재 기능
- 실시간 정답/오답 판별
- 한글/영어 모드 전환
- 백스페이스 처리
- 파일 입력으로 연습 텍스트 변경

---

## 타자 속도 측정 아이디어

### 1. 기본 속도 측정 (WPM - Words Per Minute)

**구현 방법:**
- 시작 시간 기록 (첫 키 입력 시)
- 종료 시간 기록 (텍스트 완료 시)
- 총 입력 문자 수 / 5 = 단어 수 (표준 WPM 계산법)
- WPM = (단어 수 / 경과 시간(분))

**추가 클래스:**
```javascript
class TypingSpeedMeter {
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.totalChars = 0;
        this.correctChars = 0;
        this.errors = 0;
    }

    start() {
        this.startTime = Date.now();
    }

    stop() {
        this.endTime = Date.now();
    }

    getWPM() {
        if (!this.startTime || !this.endTime) return 0;
        const minutes = (this.endTime - this.startTime) / 60000;
        const words = this.totalChars / 5;
        return Math.round(words / minutes);
    }

    getAccuracy() {
        if (this.totalChars === 0) return 0;
        return Math.round((this.correctChars / this.totalChars) * 100);
    }
}
```

---

### 2. 실시간 속도 표시

**구현 방법:**
- 1초마다 현재 속도 계산
- UI에 실시간 WPM 표시
- 정확도 퍼센트 표시

**UI 요소:**
- 현재 속도: 120 WPM
- 정확도: 95%
- 경과 시간: 00:45

---

### 3. 구간별 속도 분석

**구현 방법:**
- 텍스트를 여러 구간으로 분할 (예: 문장 단위)
- 각 구간의 소요 시간 측정
- 느린 구간 하이라이트 표시

**데이터 구조:**
```javascript
class SectionSpeed {
    constructor() {
        this.sections = []; // { start, end, duration, wpm }
    }

    addSection(startIndex, endIndex, duration) {
        const charCount = endIndex - startIndex;
        const wpm = (charCount / 5) / (duration / 60000);
        this.sections.push({ start: startIndex, end: endIndex, duration, wpm });
    }

    getSlowSections(threshold = 60) {
        return this.sections.filter(s => s.wpm < threshold);
    }
}
```

---

### 4. 키별 반응 시간 측정

**구현 방법:**
- 각 키 입력 시간 기록
- 평균 반응 시간 계산
- 느린 키 식별

**데이터 구조:**
```javascript
class KeyLatency {
    constructor() {
        this.keyTimes = new Map(); // key -> [time1, time2, ...]
    }

    recordKey(key, timestamp) {
        if (!this.keyTimes.has(key)) {
            this.keyTimes.set(key, []);
        }
        this.keyTimes.get(key).push(timestamp);
    }

    getAverageLatency(key) {
        const times = this.keyTimes.get(key);
        if (!times || times.length < 2) return 0;
        
        let total = 0;
        for (let i = 1; i < times.length; i++) {
            total += times[i] - times[i-1];
        }
        return total / (times.length - 1);
    }
}
```

---

### 5. 실시간 피드백 시스템

**구현 방법:**
- 오류 발생 시 시각/청각 피드백
- 연속 정답 시 콤보 시스템
- 속도 향상 그래프

**피드백 유형:**
- 오류: 빨간색 하이라이트, 진동
- 콤보: 연속 정답 카운트, 특수 효과
- 속도 향상: 그래프로 트렌드 표시

---

### 6. 난이도 시스템

**구현 방법:**
- 텍스트 난이도 분류 (초급/중급/고급)
- 한글/영어 혼합 비율 조절
- 복합 모음/종성 포함 여부

**난이도 분류 기준:**
- **초급**: 기본 자모만, 짧은 문장
- **중급**: 복합 모음 포함, 중간 길이
- **고급**: 복합 종성 포함, 긴 문장, 한영 혼합

---

## 구현 우선순위

### 1단계 (필수)
- 기본 WPM 측정
- 정확도 계산
- 실시간 속도 표시

### 2단계 (권장)
- 구간별 속도 분석
- 실시간 피드백 시스템
- 결과 저장 기능

### 3단계 (심화)
- 키별 반응 시간 측정
- 난이도 시스템
- 통계 분석 대시보드

---

## 기술적 고려사항

### 성능 최적화
- 과도한 DOM 업데이트 방지 (throttle/debounce)
- 대량 데이터 처리 시 Web Worker 고려

### 사용자 경험
- 측정 시작/종료 명확한 표시
- 결과 직관적인 시각화
- 모바일 환경 대응

### 확장성
- 다양한 텍스트 소스 지원 (API, DB)
- 여러 사용자 데이터 비교
- 장기 추적 및 향상 그래프
