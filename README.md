# MOVA_BACKEND
## [스파르타코딩클럽 내일배움캠프 AI 3기] A4팀 최종 프로젝트
![image](http://user-images.githubusercontent.com/112370211/207631093-78907a55-d513-4d50-9513-ed0e79c8104b.png)


## 프로젝트 소개
저희 Mova(모바)는 웹툰 커뮤니티 사이트를 만들어 웹툰을 리뷰하고 토론할 수 있는 웹툰에 대한 애정을 느끼게 만드는 웹사이트입니다.


## 개발기간
2022.11.30 - 12.15

## front-end github-address
[MOVA_Frontend](http://github.com/marinred/MOVA_Frontend)

## 기술 스택
<img src="http://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white" align='left'/>
<img src="http://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white" align='left'/>
<img src="http://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" align='left'>
<img src="http://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" align='left'>
<img src="http://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" align='left'>
<img src="http://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" align='left'><br>


## 역할 파트
**front-end** :
- 회원가입, 로그인,  회원탈퇴, 비밀번호 찾기, 회원정보 수정: 정진엽님
- 메인 페이지, 웹툰상세페이지:  주세민님, 염보미님
- 게시글(공지사항, 토론, 팬 게시판):  임동근님
- 딥러닝: 이태규님

**back-end** :
- 회원가입, 로그인,  회원탈퇴, 비밀번호 찾기, 회원정보 수정: 정진엽님
- 웹툰 크롤링, 웹툰 리뷰, 좋아요, 북마크:  주세민님, 염보미님
- 게시글(공지사항, 토론, 팬 게시판):  임동근님
- 딥러닝: 이태규님

## 주요 기능
1. 회원 가입 / 로그인
    - 회원 가입
    - 로그인
2. 프로필페이지
    - 프로필
    - 좋아요 클릭된 웹툰 GET
3. 프로필수정페이지
    - 프로필 수정
    - 회원탈퇴    
4. 메인페이지
    - 네이버 오늘의 웹툰 view
    - 카카오 오늘의 웹툰 view
    - 내가 북마크한 웹툰 view
    - 전체 웹툰 중 title로 원하는 웹툰 검색하는 기능
5. 웹툰상세페이지
    - 각 웹툰의 상세정보 표시
    - 좋아요/북마크
    - 웹툰 보러가기
    - 댓글 보기/작성/수정/삭제
6. 공지사항
    - 공지사항 list get 
    - 공지사항 title 검색
    - 버튼을 이용하여 카테고리(공지사항, 이벤트) 구분
    - 공지사항 카테고리별 작성
7. 공지사항상세페이지
    - 공지사항 상세보기
    - 공지사항 관리자 권한을 가진 이용자만 수정, 삭제 가능
    - 공지사항 수정
    - 공지사항 삭제    
8. 토론방/팬게시판페이지
    - 토론방/팬게시판 list get 
    - 토론방/팬게시판 title 검색
    - 버튼을 이용하여 카테고리(토론방, 팬게시판) 구분
    - 토론방/팬게시판 카테고리별 작성
9. 토론방/펜게시판 상세페이지
    - 게시판 카테고리 설정
    - 게시글 작성 내 웹툰 검색
    - 게시글 작성
    - 게시글 작성자만 수정/삭제 가능
10.팬아트페이지
    - 웹툰별 팬아트 게시글 리스트 출력
    - 좋아요 순위로 팬아트 게시글 리스트 출력

11. 팬아트 디테일
    - 팬아트 게시글, 댓글 가
    - 좋아요기능, 댓글달기, 댓글 삭제기능

12. 팬아트 글작성
    - 게시글 작성
    - 채색하기 기능
    - 스케치 따기 기능
    
## 와이어프레임
[http://www.figma.com/file/PQ2QMjtryocR803csfCQdL/Untitled?node-id=0%3A1&t=lqWiwBzbHidYZDRz-0](http://www.figma.com/file/PQ2QMjtryocR803csfCQdL/Untitled?node-id=0%3A1&t=lqWiwBzbHidYZDRz-0)
![image](http://user-images.githubusercontent.com/113073174/207761107-4d2305a4-a03b-4f07-922c-accda9b17eef.png)



## DB 설계
![ERD](http://user-images.githubusercontent.com/112370211/207582899-17ae8309-d344-48f9-aff1-990e82e3416d.jpg)

## API 설계
| App | 기능 | URL | Method | Request | Response |
| --- | --- | --- | --- | --- | --- |
| User |  |  |  |  |  |
|  | 회원가입 | /user/signup/ | POST | {“email”,“username”,“password”,”password2”} | |
|  | 로그인 | /user/api/token/ | POST | {“email”, “password”} | {"mova에 오신 것을 환영합니다"} |
|  | 로그아웃 | | | | 
|  | 프로필 | /user/profile/ | GET |  | {"username", "bio", "profile_image"} |
|  | 비밀번호변경 | /user/passwordchange/ | PUT | {"password", "change_password", "change_passoword2"} | |
|  | 회원정보수정 | /user/userchange/ | PUT | {"username", "bio", "profile_image"}  | |
|  | 회원 탈퇴 | /user/userchange/ | DELETE | {"username", "bio", "profile_image"}  | {"탈퇴가 완료되었습니다"}|
| Webtoon |  |  |  |  |  |
|  | 메인페이지 | / | GET |  | {”webtoon_id”, ”platform”, ”author”, ”title”,<br> ”genre”, “image_url”, ”day_of_the_week”, ”likes_count”} |
|  | 웹툰 상세보기 | /<int:webtoon_id>/| GET |  | {”webtoon_id”, ”platform”, ”title”, “author”,<br> ”image_url”, ”summary”, ”genre”, ”day_of_the_week”,<br> “webtoon_link”, ”likes_count”, “bookmarks_count”}|
|  | 웹툰 리뷰 보기 | /<int:webtoon_id>/comment/ | GET |  | {"id", "username", "image", "webtoon",<br> "content", "created_at"} |
|  | 웹툰 리뷰 작성 | /<int:webtoon_id>/comment/ | POST | {”user_id”,”comment”} | |
|  | 웹툰 리뷰 수정 | /<int:webtoon_id>/comment/<int:webtooncomment_id>/ | PUT | {”user_id”,”comment”, “webtooncomment_id”} | |
|  | 웹툰 리뷰 삭제 | <int:webtoon_id>/comment/<int:webtooncomment_id>/ | DELETE | {”user_id”,”comment”, “webtooncomment_id”} | |
|  | 웹툰 좋아요 | /<int:webtoon_id>/like/| POST | {”user_id”,”webtoon_id”} | {"좋아요 등록(취소) 완료"} |
|  | 웹툰 북마크 | /<int:webtoon_id>/bookmark/| POST | {”user_id”,”webtoon_id”} | {"북마크 등록(취소) 완료"} |
| Notice |  |  |  |  |  |
|  | 공지사항 | /notice/all/ | GET |  | {”count”, ”next”, ”previous”, ”results”, <br>{”id”, ”notice_user”, ”notice_user_profile_image”,<br>”title”,”content”,”category_name”,”notice_category_name”,<br>”created_at”,”updated_at”},}|
|  | 공지사항 title 검색| /notice/all?search={”title”}/ | GET |  | {”count”,”next”,”previous",”results”, <br>{”id”,”notice_user”,”notice_user_profile_image”,<br>”title”,”content”,”category_name”,<br>”notice_category_name”,”created_at”,”updated_at”},}|
|  | 공지사항 작성 | /notice/ | POST |  | {”category_name”,”title”,”content”} |  |
|  | 공지사항 상세보기 | /notice/<int:notice_id>/ | GET |  |  | {”id”,”board_user”,”board_user_profile_image”,”title”, <br>”content”,”category_name”,”webtoon”,”webtoon_title”,<br> ”board_category_name”,”created_at”,”updated_at”} |
|  | 공지사항 수정 | /notice/<int:notice_id>/ | PUT |  | {”notice_id”, “user_id”, “category”, “title”, “content”, “updated_at”} |  |
|  | 공지사항 삭제 | /notice/<int:notice_id>/ | DELETE |  |  | {"삭제되었습니다"} |
| Board |  |  |  |  |  |
|  | 토론방/팬게시판 | /board/all/ | GET |  |  | {”count”,”next”,”previous”,”results”,<br>{”id”,”board_user”,”board_user_profile_image”,”title”,<br>”content”,”category_name”,”webtoon”,”webtoon_title”,<br> ”board_category_name”,”created_at”,”updated_at”},}|
|  | 게시판 title 검색 | /board/all?search={title}/ | GET |  |  | {”count”,”next”,”previous”,”results”, <br>{”id”,”board_user”,”board_user_profile_image”,”title”,<br>”content”,”category_name”,”webtoon”,”webtoon_title”,<br> ”board_category_name”,”created_at”,”updated_at”},}|
|  | 토론방/팬게시판 작성 | /board/<int:board_id>/ | POST |  |  | {”category_name”,”title”,”content”,”webtoon”} |
|  | 토론방/팬게시판 상세보기 | board/<int:board_id>/ | GET |  |  | {”id”,”board_user”,”board_user_profile_image”,”title”,<br> ”content”,”category_name”,”webtoon”,”webtoon_title”,<br> ”board_category_name””created_at”,”updated_at”} |
|  | 토론방/팬게시판 수정 | /board/<int:board_id>/ | PUT |  | {”notice_id”, “user_id”, “category”, “title”,<br> “content”, “updated_at”} |  |
|  | 토론방/팬게시판 삭제 | /notice/<int:notice_id>/ | DELETE |  |  | {"삭제되었습니다"} |
|  | 토론방/팬게시판 POST 내 웹툰 검색 | /board/webtoonall?search={webtoon.title}/ | GET |  |  | {”count”,”next”,”previous”,”results”,<br>{”title”,”id”,”image_url”,”author”},} |
|  | 팬 게시판만 검색 | /board/fanboard/ | GET |  |  | {”count”,”next”,”previous”,”results”, <br>{”id”,”board_user”,”board_user_profile_image”,”title”,<br>”content”,”category_name”,”webtoon”,”webtoon_title”,<br>”board_category_name”,”created_at”,”updated_at”},} |
|  | 토론방만 검색 | /board/discussion/ | GET |  |  | {”count”,”next”,”previous”,”results”,<br>{”id”,”board_user”,”board_user_profile_image”,”title”,<br>”content”,”category_name”,”webtoon”,”webtoon_title”,<br>”board_category_name”,”created_at”,”updated_at”},} |
| Fanart |  |  |  |  |  |
|  | 팬아트/팬아트 리스트 보기 | /fanart/ | GET |  | [{ “id” , “title”, “result_image”, “likes”, <br>“comments”,  “content”}],[{ “id” , “title”, <br>“result_image”, “likes”, “comments”,  “content”}] |
|  | 팬아트/기본이미지 최적화 | /fanart/baseimage/ | POST | {“image”} | {“resize_image_url”} |
|  | 팬아트/이미지 채색 | /fanart/colorization/ | POST | {“resize_image_id”, “hint_image”} | {“resize_image_url”} |
|  | 팬아트/웹툰 검색후 해당팬아트 가져오기 | /fanart/search/<int:webtoon_id>/ | GET |  | [{ “id” , “title”, “result_image”, “likes”, <br>“comments”,  “content”}],[{ “id” , “title”, <br>“result_image”, “likes”, “comments”,  “content”}] |
|  | 팬아트/게시글 하나 가져오기 | /fanart/<int:fanart_id>/ | GET |  | { “id” , “title”, “result_image”, “likes”, <br>“comments”,  “content”} |
|  | 팬아트/게시글 삭제 | /fanart/<int:fanart_id>/ | DELETE |  |  | {”삭제완료”} |
|  | 팬아트/댓글 작성 | /fanart/<int:fanart_id>/comment/ | POST | {“content”} | {“id”, “fanart_id”, “webtoon”, “user”,<br> content”, “created_at”} |
|  | 팬아트/댓글 수정 | /fanart/<int:fanart_id>/comment/<int:comment_id>/ | PUT | {“content”} | { “id”, “fanart_id”, “webtoon”, “user”,<br> content”, “created_at”} |
|  | 팬아트/댓글 삭제 | /fanart/<int:fanart_id>/comment/<int:comment_id>/ | DELETE |  | {”삭제완료”} |
|  | 팬아트/좋아요 | /fanart/<int:fanart_id>/like/ | POST |  | {“좋아요 취소 완료!”},<br>{ “좋아요 등록 완료!”} |



## 딥러닝 모델
[Colorization_Tool_on_Web](http://github.com/yangco-le/Colorization_Tool_on_Web)

## 프로젝트 시연영상
![image](http://user-images.githubusercontent.com/113073174/207761398-d2db14a7-cdb4-4051-b8b0-61065ee06c98.png)
![프로젝트 시연영상](http://www.youtube.com/watch?v=bVhm_Z2KKZ0)

