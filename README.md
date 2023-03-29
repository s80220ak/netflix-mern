# netflix-mern

後端：

Axios: 設定get函式，讓返回資料直接是response.data
Controller: 共10多隻api，media.getDetail向5個api取得資料，統整後返回，其餘皆一個api請求資料返回前端，
Index: 使用express架設後端, mongoose連接Mongodb數據, 
Routes: 處理路由使用相對應的Controller
Model: 設定資料庫的Schema和model
Tmdb: 封裝theMovieDataBase API的 baseURL和各種point
Handlers: response.handler函式傳入res, statusCode, data 提供給Controller使用，request.handler 接受req 確認有無error。
Middleware: 解析與驗證jwt token, 傳到下一個controller。
