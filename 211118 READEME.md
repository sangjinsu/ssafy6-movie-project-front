# 211118 READEME

### UI / UX 프로토타이핑

총 10page를 만들었다.

![02_Login](md-images/02_Login-16372317358882.jpg)

![03_Signup](md-images/03_Signup.jpg)

![04_Movies](md-images/04_Movies.jpg)

![07_Review Item](md-images/07_Review%20Item.jpg)

### Navbar

vue bootstrap에서 navbar를 따왔는데 원하는대로 작동하지않아서 조금 다르게 만들었다.

### genre search

분류 dropdown에서 장르를 선택하면 장르 별 인기영화 20개의 data를 뽑아준다. 분류창에서 선택하기 전 초기화면에서는 최신영화 20개를 뽑아준다.

dropdown도 장르가 많아 길어져서 스크롤 기능을 추가하였다.

그리고 분류창에서 dropdown으로 고르는 기능 외에 키보드로 직접 쳐서 장르를 선택할 수 있다.

### movie list 

인기영화 3개의 데이터를 뽑는 작업 

찜한영화, 좋아요한영화에 대한 리스트를 만들었다.

영화디테일 function을 만들었다.

### router 수정

로그인 했을 경우 사인업, 로그인, 홈 페이지로 갈 수 없게 막는 작업

들어가려고 시도 시 movies 페이지로 던져진다

### movies 홈페이지

movie list 작업한 데이터를 vue로 받아서 movies page에 인기영화 3개,

최신영화 20개의 포스터를 띄우는 작업을 했다.

