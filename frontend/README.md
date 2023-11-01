# WEBNB (숙소 예약 및 공유 서비스)

<br>

### 프로젝트 소개
유저가 쉽게 서비스에 접근할 수 있는 것에 대한 고민을 했고
로그인 및 회원가입에 대한 절차를 간소화하고, 예약과 결제에 대한 간소화로 보다 쉽게 예약을 할 수 있게 했습니다.
메인페이지는 지역에 따라 카테고리를 설정하여 보다 빠른 속도로 원하는 지역의 숙소에 예약을 가능하게 하였습니다.

---

### 개발 기간
23.08.21 ~ 23.09.01

---
### 멤버 구성

#### Frontend

<b>이인재(Product Manager)</b> : 전반적인 PET(Product, End-User, Tech) 분석, Navbar, Footer, 상세 페이지 및 예약 기능, 결제 페이지, 결제 완료 페이지, 로그인, 회원가입 

홍래영 : 메인 페이지

#### Backend

권영경 : ERD모델링, 메인페이지 리스트, 카테고리 필터

김도윤 : PET분석(백엔드), db Schema작업, 예약 API

<b>박건률(Project Manager)</b> : 로그인, 회원가입, 예약API , 결제 API

임홍규 : 초기설정, 상세페이지 API, 데이터 추가


---

### 개발 환경

#### Frontend

- `javascript`
- `React`
- `react-router-dom`
- `SCSS`

#### Backend

- `javascript`
- `node.js`
- **Framework** : `express.js`
- **Database** : `mySQL`
- **ORM** : `TypeORM`
<br>

## 주요 기능

### 회원가입

#### Frontend

- 회원가입 Modal UI 구현
- email 형식이 올바르고, 비밀번호 길이가 5글자 이상일 때 회원가입 버튼 활성화
- name, email, password을 body 값에 저장하고 POST 요청
- 로그인 Modal로 바로 이동 가능하도록 구현

#### Backend

- name, email, password로 database에 저장
- bycrpt로 password 암호화
- email을 중복으로 가입하지 못하게 unique값 부여 및 기능 구현

<br />

### 로그인

#### Frontend

- 로그인 Modal UI 구현
- email 형식이 올바르고, 비밀번호 길이가 5글자 이상일 때 로그인 버튼 활성화
- email, password을 body 값에 저장하고 POST 요청
- 회원가입 Modal로 바로 이동 가능하도록 구현

#### Backend

- email, password의 값으로 일치하는 회원정보 제공
- 로그인 시 JWT(Json Web Token)발급

<br />

### 메인 페이지

#### Frontend

- 메인 페이지 UI 구현
- 지역 카테고리별 리스트 불러오기 구현
- 각 상품마다 5개의 이미지 캐러셀로 구현
- roomId, images, roomTitle, ratings, price를 querystring 사용하여 GET 요청

#### Backend

- 메인페이지 목록 불러오기 위해 User의 토큰값을 받아 database에서 GET으로 정보 제공
- query builder를 이용하여 카테고리 및 필터로 특정 조건 설정
- 각 방의 title 및 rating, price 등의 정보 제공
- 유저 정보가 없을 경우의 페이지 구현

<br />

### 상세정보 페이지

#### Frontend

- 상세 페이지 UI 구현
- Calendar 구현
- 리뷰 작성 모달을 띄워 작성 기능 구현
- 리뷰 작성과 동시에 별점을 달 수 있도록 구현
- 리뷰 작성된 것이 화면에 보여지도록 구현
- title, imageUrl, name, guestsCount, bedroomsCount, profileImage, wifiBoolean, bathroomsCount, airConditioningCount, roomDescription, locationName를 path parameter을 사용하여   GET 요청
- 리뷰 작성할 때 path parameter을 사용하여 POST 요청 후 성공하면 모달창 close
- 작성된 리뷰 서버에서 가져올 수 있도록 GET 요청

#### Backend

- 특정 방의 정보를 해당 방의 ID 값으로 요청하여 응답을 받아 유저에게 제공함
- 방 타이틀, 방 설명 및 편의용품 등의 정보 기입
- rating 및 후기의 정보를 제공함으로 해당 방에 대한 평가 확인 가능

<br />
  
### 예약 기능

#### Frontend

- 예약 UI 구현
- Calendar를 컴포넌트화 하여 모달로 띄워 선택된 날짜로 예약이 가능하도록 구현
- `0000-00-00` 형태로 서버로 넘어갈 수 있도록 구현
- roomId, startDate, endDate를 넘겨주기 위해 POST 요청 후에 useNavigate() hook을 사용해 url에 정보가 저장되도록 querystring으로 페이지 이동

#### Backend

- 상세페이지와 함께 나오는 기능이지만 예약에 관련된 내용을 따로 작성
- 특정 날짜와 일정이 overlab이 될 경우 에러를 보내 일정이 겹치지 않게 특정 ID와 시간에 대한 Unique값 부여 및 기능 구현
- 특정 날짜를 querystring으로 request를 받아 POST를 보내는 방식으로 이중으로 예약불가능하게 설정

<br />
  
### 결제 페이지

#### Frontend

- 결제 페이지 UI 구현
- roomId, startDate, price를 쿼리스트링으로 접근하여 point, title, price, thumbNail, ratings, startDate, endDate 데이터 GET
- 결제하기 버튼 클릭시 결제 완료 페이지 이동

#### Backend

- 특정 User의 토큰값을 받아 ID를 복호화 후 해당 User의 정보를 가져와 결제를 가능하게 하는 페이지 구현
- 방의 정보와 예약 정보는 querystring으로 받아 정보 제공
- 임의의 point값을 지정하여 총 price의 대한 값과의 연산으로 결제방식 진행
- Transaction 기능으로 결제 도중 오류가 있으면 결제 기능 자체를 막는 방식의 기능 구현
