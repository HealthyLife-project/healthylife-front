# Healthylife_project
사용자에게 개인화된 건강 관리와 식단, 운동 계획을 제공하는 웹 서비스입니다.


## 🔧 Stack
- **Language**: TypeScript
- **Library & Framework** : React,Next.js


## 🔧 USE API
- 카카오 주소 API
- Swiper
- Sokect IO
- Antd
- 네이버 로그인 API
- 카카오 로그인 API
- 구글 로그인 API
- Deepl
- Tesseract
- Toss Payment


## 주요기능

### 회원가입
![회원가입](https://github.com/user-attachments/assets/dc1996ca-fb6e-4f45-80a3-d1e7c45e8885)
- 유효성 검사를 포함한 회원가입 정보 제공
- 카카오 주소 API

### 로그인 페이지
![로그인 페이지](https://github.com/user-attachments/assets/3b4126cc-fbda-487b-9c9d-fe643c3eb81c)
- 로그인 기능
- 네이버 / 카카오 / 구글 소셜 로그인 제공

### 아이디 찾기 페이지
![아이디 찾기 페이지](https://github.com/user-attachments/assets/f49c2e03-4e08-4d97-9754-d58edcd65973)
- 전화번호에 따른 아이디 찾기

### 비밀번호 재설정 페이지 
![비밀번호-찾기-Clipchamp로-제작-_1_](https://github.com/user-attachments/assets/33eb1c6f-7b39-481a-89a3-4ddc77c5fd61)

- 회원가입에 작성한 이메일에 비밀번호 재설정 이메일을 전송 후 비밀번호 재설정을 할 수 있도록 하였다

### 마이페이지
![마이페이지-Clipchamp로-제작_1](https://github.com/user-attachments/assets/13a33da7-a05f-443b-ac8f-0913639c8e0e)

- 개인정보 : 개인정보 수정
- 운동정보 : 입력한 주소를 기반으로 카카오 주소 API를 사용하여 근처 2km이내 헬스장 위치를 띄어줌
             입력한 인바디 내용을 기반으로 chart를 표시해줌
- 운동&식단 : Google Gemini를 사용하여 운동방식을 추천받고, Gemini를 사용하여 궁금한 것을 물어 볼 수 있음
- 프리미엄 : 토스 결제 API를 사용하여 결제할 수 있음


### 이미지 텍스트 추출
![이미지-텍스트-추출](https://github.com/user-attachments/assets/77136a48-df85-4448-8425-5f7e0f739b3e)



### 결제 페이지
![토스-결제-Clipchamp로-제작](https://github.com/user-attachments/assets/caaab6cc-7f4f-4186-8d2d-6ff46dd7b57b)


### 해시태그 페이지
![해시태그-등록](https://github.com/user-attachments/assets/817afe1d-8c28-4a45-822b-61dc1d7a3b60)

- 회원가입 후 최초 로그인 시 사용자 맞춤 해시태그를 입력할 수 있음

![해시태그-수정](https://github.com/user-attachments/assets/d2c70384-163e-4832-9972-4a6520d6a3b0)

- 해시태그 수정 페이지에서 해시태그를 수정할 수 있음 

### 웹 소켓
![웹-소켓-Clipchamp로-제작](https://github.com/user-attachments/assets/f11238f2-c7c7-482a-9789-b007fcd2e26a)

- 웹 소켓을 활용하여 채팅방 기능을 구현
- 페이지가 아닌 컴포넌트를 활용하여 다른 페이지에 이동하더라도 채팅방 컴포넌트는 사라지지 않음 

### 웹 소켓 - 역 무한 스크롤
![역-무한-스크롤](https://github.com/user-attachments/assets/37953314-fac2-4315-9cc7-559994991142)



### 신고하기
![신고하기](https://github.com/user-attachments/assets/96ae9cca-7ea8-4904-ae6a-4cda6eb92cb4)


### 메인화면
![메인화면](https://github.com/user-attachments/assets/3ea4d2c4-ca17-4a74-b983-00ea02e0c7a7)
- 로그인 / 회원가입 / 메인페이지 / 마이페이지 이동
- 사용자들이 많이 선택한 해시태그 기준으로 AI이미지 생성
- Person / Pet 카테고리 관련 네이버 뉴스 기사
- 사용자들이 많이 선택한 해시태그 내림차순 


## 👨‍💻 담당 기능

| 기능           | 담당자  |
|-------------------|------------|
| 회원가입 | 이주형 |
| 비밀번호 찾기 | 이주형, 안상현 |
| 아이디찾기 | 이주형 |
| 키워드 기반 AI 이미지 생성 | 이정민 |
| 뉴스 기사 | 이정민 |
| 개인정보 수정 | 이정민 |
| 소셜로그인(카카오,네이버, 구글) | 이정민 |
| 카카오 지도 API | 이정민 |
| 이미지 텍스트 추출 | 이정민 |
| 인바디 차트 | 이정민 |
| AI를 사용한 운동 추천 | 이정민 |
| 채팅방 - 웹소켓  | 이정민 |
| 채팅방 - 신고  | 이정민 |
| 토스결제  | 이정민 |


## 👨‍👩‍👧‍👦 Developers
*  **이정민** ([ihoek](https://github.com/ihoek))
*  **이주형** ([hellojuhyoung](https://github.com/hellojuhyoung))
