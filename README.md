# netflix-mern


專案介紹


前端：

【api】
．Client: axios instance攔截request / response，分成一般訪客和註冊會員
．Configs: 封裝endpoint寫成函式和物件，元件引入使用
．Modules: 引入Client axios instance，寫好前端所需api

【Components:】
．Conmmom: Pages頁面所需的子元件，共28個。
．Layout: routes最上層元件，全局loading、登入註冊modal、Outlet搭配routes。

【Configs】
．Menu: 封裝Topbar&UserMenu元件所需的icon, path等等
．Theme: MUI createTheme，根據深色或一般模式提供UI Styles
．Ui: 封裝UI相關CSS設定

【Pages】
．HomePage: 首頁，預先提供熱門、高評分電影目錄
．MediaList: useParams取得媒體類型，根據媒體類型、目錄類型，渲染頁面
．MediaDetail: 需要5個api，後端整合成1個後返回，看影片&海報&留言評論&加入清單。
．MediaSearch: search bar，利用setTimeout、clearTimeout、closure，減少query多次送出request，優化效能
．FavoriteList: 查看加入清單的節目
．ReviewList: 查看留言過的評論、評論的時間
．PersonDetail: 演員介紹、演出過的電影、節目
．PasswordUpdate: 更改密碼，useFormik + yup做驗證

【Redux】
．store: 使用RTK，redux-persist登入持久化，避免重新整理登入狀態消失
．appStateSlice 儲存當前page，menu&TopBar元件會抓其state，顯示當前頁面。
．authModalSlice 預設false，若為true，顯示登入註冊視窗。
．globalLoadingSlice 等待異步請求時，變成true，顯示等待中。
．themeModeSlice UI配色為深色或一般模式
．userSlice：setUser JWT儲存/移除到localStorge, listFavorites移除/增加/設置 清單的內容


Store: 使用RTK，儲存reducer，另外使用redux-persist實現登入持久化，避免重新整理登入狀態會消失
Routes: 路由表，方便App.jsx引入使用
Utils: 檢查電影是不是屬於在我的珍藏清單，是的話返回true，該電影會被標記愛心
App: 引入swiperCSS, mui全局樣式, react-toastify頁面提示訊息功能
Index: RTK的store, 以及PersistGate的持久化狀態



後端：

Axios: 設定get函式，讓返回資料直接是response.data
Controller: 共10多隻api，media.getDetail向5個api取得資料，統整後返回，其餘皆一個api請求資料返回前端，
Index: 使用express架設後端, mongoose連接Mongodb數據, 
Routes: 處理路由使用相對應的Controller
Model: 設定資料庫的Schema和model
Tmdb: 封裝theMovieDataBase API的 baseURL和各種point
Handlers: response.handler函式傳入res, statusCode, data 提供給Controller使用，request.handler 接受req 確認有無error。
Middleware: 解析與驗證jwt token, 傳到下一個controller。
