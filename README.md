# React Card Maker

- 명함을 쉽게 제작해주는 웹페이지

------

## 프로젝트 목적

- React hook 연습
- firebase api를 사용하여 React와 연동해보기
- cloudinary api 사용하여 이미지 파일 관리 학습
- React router 학습
- MVC 패턴 적용 연습

## 사용 기술

React Hook, Firebase , MVC Pattern, Cloudinary (image upload), dependency injection


### 1. common에 공통적으로 쓰일 css 등록

### 2. Firebase 등록

1. src에 service 폴더 생성
2. firebase.js 에 firebase SDK 등록
3. API Key 등은 .env에 보관
4. auth_service.js에서 로그인 기능
5. firebase -> authentication -> google이랑 github 사용설정 해주기
6. github는 settings -> developer settings에서 client 설정

### 3. 로그인 화면 구현

1. footer, header, login components 만들고 각각 jsx파일 생성
2. login 에서 로그인 화면 구성 (import header, footer)
3. index.js에서 import authService & app 에서 authService 실행 => app.jsx에 props로 authService 전달 => login.jsx에가서 props에 authService 전달
4. Login component 안에 Login할 수 있는 함수 생성 = onLogin => authservice.login 실행

### 4. header, footer, login

1. login에 Logout 구성, img 삽입,
2. css 작성

### 5. 로그인-홈 화면 연결 => Router

1. yarn add react-router-dom
2. App.js에서 BrowserRouter, Switch, Route 추가
3. <Route (exact) path="?"> 로 어떤 path에서 어떤 page가 뜨게 할 것인지 결정. Ex. /users 와 /users/abc 같은 비슷한 url을 구분할 때는 exact path 를 써준다
4. components에 maker 생성하고 app.jsx -> Switch 하나에 할당

### 5. 로그인하면 maker 화면으로 넘어가기

1. 화면에서 다른 화면으로 넘어갈 때 : const history = useHistory()
2. goToMaker 함수 만들기
3. console.log 찍은거에서 uid 확인 후 history 에서 path랑 같이 obj로 넘겨주기
4. authService.~~.then() 괄호 안 수정

### 6. 사용자 기록에 따라 로그인 유지 (Ref. firebaseDocs => web => Get Started)

1. authService.js 에서 onAuthChange
2. login.jsx => useEffect : user가 있으면 maker로 이동

### 7. Maker 화면

1. Header, Footer 불러오기
2. authService에서 logout 기능 만들기
3. maker.jsx 에서 logout 구현 : 로그아웃되면 home으로 돌아가기 => useEffect : user가 없다면 home으로 이동 ( + history)
4. maker에서 Header와 Footer 사이에 div로 컨텐츠 들어갈 부분 만들어주기

### 8. Editor 화면 & Preview 화면

1. 각각 만들어서 Maker div 태그 안에 넣어주기
2. 각각 css => flex-basis 활용해서 50% 씩 나눠주기
3. maker.css 에서 화면 크기에 따라 절반이 아래로 나눠지게 해주기
4. maker에서 card 상태를 수정할 수 있게 만들기
   1. [cards, setCards] = useState(...)
   2. ... 에 들어가야할 props들 설정
5. 8-4에서 만든걸 editor와 preview에 전달 => editor랑 preview에서 props로 cards 받기
6. card component 만들고 props로 cards에서 map으로 뺀 card 받기
7. cardEditForm component 만들고 props로 cardsdptj map으로 뺀 card 받기

### 9. card 화면

1. maker.js 의 useState에서 설정한 props들 다 받아서 오기
2. html 구조 만들기
3. theme 별로 다른 card 색상 내보내도록 함수 하나 추가로 짜주기
4. card css

### 10. editor 화면

1. card에서 props 받아오기 (card.jsx처럼)
2. cardEditForm에 html 기본 구조 만들기
3. button component 생성
4. cardEditForm에 Button 추가
5. imageFileInput component 생성

### 11. AddForm 기능 추가

1. CardEditForm이랑 비슷하므로 component 복사하고 props 지우고, 이름 바꾼 후 value 값을 다 placeholder로 바꿔줌
2. editor.jsx 에 추가
3. Input 값들 useRef() 를 이용하여 input 에 ref={...} 으로 넣어주기
4. onSubmit 으로 클릭하면 add 하게 만들기
5. addCard 함수 prop으로 받기 : CardAddForm => Editor => Maker
6. maker.jsx에서 addCard 만들고 setCards로 갱신: [...cards, card] === [기존것들, 새로운거]

### 12. state realtime 업데이트 (state변경, Delete )

1. cardEditForm.jsx 에서 onChange 함수 만들고 각 html 태그마다 onChange 넣어주기
2. cardEditForm props에 updateCard, deleteCard 추가 => Editor에 prop추가 => Maker에서 함수 만들기
3. 🌟 중요! 🌟
   1. 새로운 업데이트를 하기 위해서 앞에서부터 for loop , map 로 순차적으로 돌면서 찾는 것은 비효율적
   2. 따라서 배열의 크기가 길어지면 매번 다 반복 호출해야 함
   3. useState([...]) 에 있던 배열(=> {...}) 에 각각 '1', '2'로 key를 주고 key:value 형식 (=> {'1':{...}, '2':{...}, } )으로 바꿔 줌
   4. 더 이상 배열이 아니기 때문에 map을 배열로 처리했던 부분 다 바꿔주기 : editor.jsx & preview.jsx
4. updateCard
5. create이나 update나 logic이 똑같으므로 addCard 를 updateCrad 에 합쳐버리고 createOrUpdateCard 로 이름 변경 & Editor에 들어갈 prop을 addCard 와 updateCard 둘 다 createOrUpdateCard 로 변경
6. delete 함수 구성하고 cardEditForm 의 onSubmit에서 deleteCard 함수 호출

### 13. 이미지 업로드

1. 이미지 업로드 하는 기능은 component에 있으면 안된다. => service 폴더에서 class로 생성
2. imageFileInput.jsx 에서 prop으로 받으면 App에서부터 아래로 내려가므로 너무 많은 props를 내리게 된다 => imageFileInput component를 외부에서 만든 다음에 전달해 나간다. {...props}는 확장성을 위해 받아준다.
3. index.js에서 imageUploader 받아오기
4. index.js에서 FileInput component 만들기
5. App에서 FileInput={FileInput} 으로 받고 쭉 내려가면서 props 전달 (index -> App -> Maker -> Editor -> editForm & addForm)
6. imageFileInput 에서 버튼 디자인
7. onChange 함수 구성 <= prop으로 넘어온 onFileChange 받기
8. editForm에 onFileChange 올려주고 함수 만들기
9. addForm에서는 add 버튼을 눌러야 업데이트 되니까 그 전까지는 state로 유지해주기
10. addForm에 onFileChange 올려주고 함수 만들기
11. editForm과 addForm의 FileInput에서 name 받기
12. add 누르면 초기화 구성
13. imageFileInput에 loading으로 state 구성 & css에서 로딩 스피너 만들기
14. button className 수정해서 버튼 업로드가 되면 핑크색, 업로드가 안되면 회색으로 만들기
15. editor랑 preview에 overflow-y: 'auto' 줘서 스크롤되게 만들기

### 14. firebase 연동

1. service에서 cardRepositoy class 생성
2. 사용자 id 별로 DB를 구성할 것이기 때문에 maker에 userId를 state로 줘서 관리
3. Maker에서 CardRepository를 props로 받아서 사용, index.js까지 올리기
4. Maker의 createOrUpdate, deleteCard 에 cardRepository 적용
5. calss에 실시간 sycn 추가 -> Maker 에서 사용
6. firebase 전체 import 하지말고 필요한 것만 import, export

### 15. 성능개선

1. form 안에서 데이터가 변경될 때 모든 컴포넌트가 업데이트 됨
   1. 다음 component => 함수 에 memo 추가
      1. card.jsx => Card
      2. cardEditForm.jsx => CardEditForm
      3. cardaddForm.jsx => CardAddForm
      4. button.jsx
      5. imageFileInput.jsx => imageFileInput
      6. index.jsx => FileInput
      7. header.jsx => Header
      8. footer.jsx => Footer
   2. maker.jsx => onLogout 함수가 maker component가 변경될 때마다 다시 랜더링 됨 => 계속 동일한 데이터를 쓰고 싶으면 useCallback
2. preview, editor 같이 여러 component의 부모component 는 자식 component 중 하나만 바뀌어도 prop이 바뀌기 때문에 prop 변경이 매우 빈번하여 memo를 쓰는 것이 의미가 없다. 오히려 성능하락 유발할 수도 있음.
