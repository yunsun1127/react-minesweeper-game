# minesweeper

### 개발 환경

node version의 경우 lts인 `v16.15.1`을 사용했습니다.

### 프로젝트 실행방법

```
npm install
npm run start
```

### 프로젝트 구현 접근방법

- 2차원 배열을 사용하여 지뢰판을 구현했습니다.
- 필요한 state가 많고 업데이트가 잦아 `useReducer()`를 사용하여 `/src/utils/control.ts` 하위로 state의 업데이트 로직을 분리했습니다.

### 구현 상세

- 왼쪽 클릭 시 지뢰일 경우 전체 지뢰 표시 및 게임 끝 (LOSE)
- 왼쪽 클릭 시 지뢰가 아닐 경우 근접한 영역의 지뢰의 수 만큼 숫자 표시
- 오른쪽 클릭 시 깃발표시, 다시 오른쪽 클릭을 할 경우 깃발이 사라짐
- 지뢰를 제외한 모든 버튼이 open되었을 경우 게임 끝 (WIN)

### License

© yunseon jang
