# practice-web-event-api

> Work : 0801 ~ 0808

## How to Run

> 실행 방법

```bash
vi .env # .env 파일 생성
docker-compose build
docker-compose up

Test

yarn test
```

## Domain

- Event
  - 이벤트 목록을 조회한다.
  - 이벤트를 제목으로 조회한다.
  - 이벤트를 조회한다.
  - 이벤트를 만든다.
  - 이벤트를 수정한다.
  - 이벤트가 완료된다.

## 진행 상황

- [x] api 구현
  - [x] CreateEventUseCase
  - [x] EditEventUseCase
  - [x] FindAllEventUseCase
  - [x] FindOneEventUseCase
  - [x] FindEventByTitleUseCase
- [x] 문서화
  - [x] 실행방법
  - [x] 이벤트 도메인의 구분
  - [x] 구현하는동안 생각한 점
- [x] TDD 해봤니

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
> 생성시 or 생성전...
> 일단 생성시에 auto generate하는방식으로 uuid...

domain,infra부분을 만들면서 감이잡히는중.. 잘못된 감일수도

### 0804

- TDD 어느정도 해봄..
- Controller 짜는중
  - Request,Response는 [라이브러리](https://bakjuna.tistory.com/121) 여기 참고하기

### 0805

- Controller 테스트완료
- e2e테스트 ~ing

### 0807

컨트롤러 완료..

e2e는 하다가 포기.. -> 금주내로 시간나면 다시 해보자

스웨거 -> 데코레이터들만 붙이면 작업가능 -> Swagger module작동되는거 확인

## 마치며

- 레이어 나누는거에대한 이해가 코드를 짜면서 이해가 됨
  - 테스트가 쉽다
  - 추후에 기능을 붙인다면 기존 파일가서 어렵게 수정하지않고 그냥 새로 추가하면됨 (말 그대로 객체로써 사용이 된다.)

- TDD를 해봄
  - 일단 재미있다
  - 짜면서 만드니 어렵지 않은코드여도 로직에대한 어느정도 신뢰성?같은게 생김..

### 못했던거

- Red-Green-Blue
  - Red-Green은 OK인데 Blue까진 어려운거같다.. 그정도 머리는 안되나

- e2e test
  - 하다가 통신부분에서 막혀서 stop
  - 유닛테스트보다 e2e가 중요하니 꼭 해볼것

- Swagger
  - 데코레이터만 붙이면되는데 까먹었다..