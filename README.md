## Pages

- [] / : 로그인 여부를 확인하여 로그인이 되어있다면 홈페이지를 그렇지 않다면 계정 생성 / 로그인 페이지로 이동
  - [] 로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 한다.
  - [] 트윗을 작성할 수 있어야 한다.
- [x] /create-account : 계정을 생성하는 페이지
- [x] /log-in : 로그인을 진행하는 페이지
- [] /tweet/[id] : 트윗의 상세 정보를 보는 페이지
  - [] 사용자는 id에 해당하는 트윗의 내용과 좋아요 버튼을 볼 수 있어야 한다.
  - [] 좋아요 버튼 구현 - 클릭했을 경우 좋아요의 상태값이 DB에 저장되어야 하며, useSWR의 mutate를 사용하여 업데이트를 반영해야 한다.

## Models

- [x] User
- [x] Token
- [x] Tweet
- [x] Like

## Hooks

- [x] useHandler
- [x] useSession
- [x] useInfiniteScroll

## Authentication

### Login

- [x] email과 password를 입력 받아 DB에 있는 정보와 일치하면 로그인시킨다.

### Sign Up

- [x] email을 입력 받고 DB에 없는 email인 경우 인증 메일을 발송한다.
- [x] 인증이 완료되면 password를 입력 받아 account를 생성한다.

## 참고사항

prisma.schema파일을 변경했다면 npm run db-sync를 실행한다.
