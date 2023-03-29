# netflix-mern


專案介紹


前端：

api資料夾：
Client: 在發出request或接收response之前，request根據是否為註冊會員，傳送jwt返回後端做驗證，response若有response.data，返回data。
Configs: 重複性高的endpoint和配置寫成函式和物件，方便元件引入使用
Modules: 引入client文件夾設置好的axios instance，寫好前端所需的api

Components: 
Conmmom: page頁面所需的子元件
Layout: routes最上層元件，設置全局loading元件、登入註冊modal、寫入Outlet搭配routes，取得使用者登入資料。

Configs:
Menu: 封裝Topbar&UserMenu元件所需的icon, path等等
Theme: 使用material ui的createTheme，接收一個值，返回深色或一般模式的UI調色盤配置
Ui: 封裝ui相關的css設定


Pages:
HomePage: 首頁，預先提供熱門、高評分電影目錄瀏覽
MediaList: useParams取得媒體類型，根據媒體類型、目錄類型，發出request取回所需資料，
MediaDetail: 頁面需要5個api的資料，由後端資料庫整合成1個response後返回，功能有看影片&海報、留言評論。
MediaSearch: search bar，利用setTimeout定時器、clearTimeout、closure，減少query多次送出request，優化效能
FavoriteList: 查看加入最愛，點擊可以連結到MediaDetail，發送request給後端，返回資料渲染頁面
ReviewList: 查看留言過的評論、評論的時間
PersonDetail: 演員介紹、演出過的電影、節目
PasswordUpdate: 更改密碼，useFormik + yup做驗證

Redux:
Features: 
appStateSlice儲存當前page，menu&TopBar元件會抓其state，顯示當前在哪個頁面。
authModalSlice 預設為false，若有需要登入時，轉為true，顯示登入或註冊的視窗。
globalLoadingSlice 等待異步請求時，變成true，顯示等待中的畫面。
themeModeSlice ：UI配色為深色或一般模式
userSlice：setUser 將jwt儲存/移除到localStorge, 另外listFavorites有移除/增加/設置 最愛清單的內容


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
