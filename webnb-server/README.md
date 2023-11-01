# WEBNB Project (wecode-project-AirBNB) backend

<br>

### 프로젝트 소개
AirBNB를 참고하여 만든 예약 사이트입니다.
유저가 쉽게 서비스에 접근할 수 있는 것에 대한 고민을 했고
로그인 및 회원가입에 대한 절차를 간소화하고, 예약과 결제에 대한 간소화로 보다 쉽게 예약을 할 수 있게 했습니다.
메인페이지는 지역에 따라 카테고리를 설정하여 보다 빠른 속도로 원하는 지역의 숙소에 예약을 가능하게 하였습니다.

---

### 개발 기간
23.08.21 ~ 23.09.01

---
### 멤버 구성(48-Default-backend)
권영경 : ERD모델링, 메인페이지 리스트, 카테고리 필터

김도윤 : PET분석(백엔드), db Schema작업, 예약 API

박건률 : 로그인, 회원가입, 예약API , 결제 API

임홍규 : 초기설정, 상세페이지 API, 데이터 추가


---

### 개발 환경

- `javascript`
- `node.js`
- **Framework** : `express.js`
- **Database** : `mySQL`
- **ORM** : `TypeORM`
<br>

## 주요 기능

#### 회원가입
- name, email, password로 database에 저장
- bycrpt로 password 암호화
- email을 중복으로 가입하지 못하게 unique값 부여 및 기능 구현
#### 로그인
- email, password의 값으로 일치하는 회원정보 제공
- 로그인 시 JWT(Json Web Token)발급
#### 메인 페이지
- 메인페이지 목록 불러오기 위해 User의 토큰값을 받아 database에서 GET으로 정보 제공
- query builder를 이용하여 카테고리 및 필터로 특정 조건 설정
- 각 방의 title 및 rating, price 등의 정보 제공
- 유저 정보가 없을 경우의 페이지 구현
#### 상세정보 페이지
- 특정 방의 정보를 해당 방의 ID 값으로 요청하여 응답을 받아 유저에게 제공함
- 방 타이틀, 방 설명 및 편의용품 등의 정보 기입
- rating 및 후기의 정보를 제공함으로 해당 방에 대한 평가 확인 가능
#### 예약 기능
- 상세페이지와 함께 나오는 기능이지만 예약에 관련된 내용을 따로 작성
- 특정 날짜와 일정이 overlab이 될 경우 에러를 보내 일정이 겹치지 않게 특정 ID와 시간에 대한 Unique값 부여 및 기능 구현
- 특정 날짜를 querystring으로 request를 받아 POST를 보내는 방식으로 이중으로 예약불가능하게 설정
#### 결제 페이지
- 특정 User의 토큰값을 받아 ID를 복호화 후 해당 User의 정보를 가져와 결제를 가능하게 하는 페이지 구현
- 방의 정보와 예약 정보는 querystring으로 받아 정보 제공
- 임의의 point값을 지정하여 총 price의 대한 값과의 연산으로 결제방식 진행
- Transaction 기능으로 결제 도중 오류가 있으면 결제 기능 자체를 막는 방식의 기능 구현
