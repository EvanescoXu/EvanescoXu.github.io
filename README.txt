Canlin Xu — 本地网站

1. 先解压整个 ZIP，不要在压缩包内直接打开。
2. Windows：把照片复制到 photos 文件夹，双击 Open-Website.cmd。
   启动文件使用系统自带的 PowerShell 更新照片列表，然后用默认浏览器打开首页。
   无需安装网站框架，也不需要租服务器；本地离线可用。
3. 照片按文件名排序。推荐命名为 01.jpg、02.jpg、03.jpg。
   支持 JPG / JPEG / PNG / WebP / GIF / AVIF，推荐 JPG 或 WebP。
   建议长边约 2000–2500px，单张尽量控制在 1–2MB。
4. 每次添加、删除、替换照片后，重新双击 Open-Website.cmd。
   首页每约 5 秒切换，鼠标停在照片上时暂停；只有一张照片时静态显示。
   首页没有放大功能。Gallery 会使用相同的照片列表。
   系统开启“减少动态效果”时，轮播与页面进场动画会停用。
5. 直接双击 index.html 也能看网站，但不会重新扫描新照片。
6. macOS / Linux：安装 Python 3 后，在该文件夹执行 python3 update_photos.py。
   也可直接编辑 photos.js 的列表，然后打开 index.html。

页面
- index.html：首页。
- projects.html：独立 Projects 页面，柔和淡入。
- gallery.html：独立 Gallery 页面，柔和淡入。
- profile.html：独立 Profile 页面，柔和淡入。
- 左上角显示 Canlin Xu，右上角统一显示 Home / Projects / Gallery / Profile。
  点击 Home 或名字可返回首页，导航位置保持一致。浏览器后退也可使用。
- style.css：颜色、居中布局、字体、动画。
- app.js：轮播与 Gallery。
- photos.js：照片清单，由启动文件生成，也可手动编辑。

当前照片来自你提供的首页截图，作为暂时素材。photos 文件夹有照片后，
启动文件会自动使用这些原图替换示例。Projects 目前保留展览现场照，
独立作品的高清展墙仍需原图。

本地修改不会自动同步到在线网站。要更新 GitHub Pages，可将本文件夹的
网站文件（index.html、其他 html、style.css、app.js、photos.js、assets、photos）
提交到你的站点仓库，保持目录结构。启动文件和说明不必上传。
此版本不依赖付费托管，也没有外部字体、追踪脚本或联网依赖。
