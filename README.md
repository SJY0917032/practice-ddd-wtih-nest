# practice-web-event-api

> Work : 0801 ~ 0808

## How to Run

> 실행 방법

`실행방법을 적어둡니다.`

## Domain

- Event
  - 이벤트 목록을 조회한다.
  - 이벤트를 조회한다.
  - 이벤트를 만든다.
  - 이벤트를 수정한다.
  - 이벤트를 삭제한다.
  - 이벤트가 완료된다.

## 진행 상황

- [ ] api 구현
  - [ ] 도메인 구분에 따른 진행여부를 체크박스로 넣어주세요.
- [ ] 문서화
  - [ ] 실행방법
  - [ ] 이벤트 도메인의 구분
  - [ ] 구현하는동안 생각한 점
- [ ] TDD 해봤니

### 0801

> 초기세팅 완료

- 도커 세팅 완료
  - 도커 환경변수 분리하기

TODO : 이벤트 TDD 시작하기

### 0802

> TDD 어렵..

공통으로 사용될 Class부터 제작

IUseCase? -> UseCase에서 사용될 execute에대한 정의
Result -> Result를통해 Domain생성

event

- 노출여부
- 이벤트 제목
- 이벤트 설명
- 이벤트 시작일
- 이벤트 종료일
- 배너이미지
- 배너 노출 페이지
- 이벤트 이미지 (다중등록가능)

이미지 관련은 Multer/S3로 등록해보기 (가능하다면)

### 0803

- Presentation의 response, request dto
- Application의 dto는 분리돼서 테스트해야한다.

#### id?

> id에대한 접근권한을 어떻게 줄것인가?
생성시 or 생성전...
일단 생성시에 auto generate하는방식으로 uuid...

domain,infra부분을 만들면서 감이잡히는중.. 잘못된 감일수도