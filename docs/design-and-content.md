# Cake68 — Phân tích dữ liệu và định hướng thiết kế

## Dữ liệu đã đọc

`Cake68-Website.docx` mô tả doanh nghiệp bánh đặt riêng và nội dung trang bằng tiếng Phần Lan. `Tài liệu không có tiêu đề.docx` xác nhận tên, ngôn ngữ, điện thoại, email và màu trắng–đỏ đậm từ logo. Nội dung trích xuất nguyên bản được lưu trong hai file `.txt` ở thư mục này.

| Thông tin | Dữ liệu xác nhận | Đưa lên website |
| --- | --- | --- |
| Thương hiệu | Cake68 / Cake 68; logo “Art & Taste”, “Since 2013” | Giữ Cake68 nhất quán, logo chính thức |
| Ngôn ngữ | Phần Lan | `lang="fi"`, toàn bộ nội dung khách hàng bằng tiếng Phần Lan |
| Hoạt động từ | 2013 | Hero, câu chuyện, sidebar, footer |
| Sản phẩm | Bánh được thiết kế theo mong muốn khách hàng | Danh mục và nội dung thương hiệu |
| Dịp lễ | Sinh nhật, cưới, rửa tội, tốt nghiệp, dịp đặc biệt | Biên tập lại trong phần giới thiệu và danh mục |
| Tùy chỉnh | Ngoại hình, màu, trang trí, vị | About, hướng dẫn đặt bánh |
| Email | Cake68fin@gmail.com / cake68fin@gmail.com | Chuẩn hóa chữ thường; cùng một địa chỉ |
| Điện thoại | 0400810936 | Hiển thị 040 081 0936; link quốc tế +358400810936 |
| Phương thức | Chỉ nhận đơn online; ưu tiên email | Mẫu email thật, nút email và gọi điện |
| Giá / ưu đãi | Không cung cấp | Không tạo giá hoặc ưu đãi |
| Địa chỉ / giờ hoạt động | Không cung cấp | Không tạo địa chỉ, bản đồ hay giờ mở cửa |
| Mạng xã hội | Chỉ ghi “Cake68” trên Facebook và Instagram, chưa có URL | Theo chỉ dẫn bổ sung của người dùng: bỏ khỏi trang |

Danh mục đủ 14 nhóm:

- Juhlakakut: Synttärikakut, Lasten kakut, Hääkakut, Ristiäiskakut, Fantasiakakut, Kuvakakut, Levykakut.
- Täyte & mousse: Täytekakut, Moussekakut.
- Erityisruokavaliot: Maidottomat kakut, Vegaaniset kakut, Gluteenittomat kakut, Munattomat kakut.
- Koristeet: Kakkujen koristeet.

Sửa lỗi chính tả “Glueenittomat” thành “Gluteenittomat”, chuẩn hóa “Fantasykakut” thành “Fantasiakakut”. Không thay đổi ý nghĩa. Không tự tạo vị bánh, khẩu phần, thời gian giao, đảm bảo chống dị ứng, đánh giá hoặc giải thưởng.

Điểm chưa thống nhất: file ghi chú tiếng Việt gọi đây là “tiệm kem”, nhưng tài liệu nội dung chi tiết và logo mô tả bánh. Website lấy tài liệu chi tiết làm cơ sở; không tự thêm kem vào danh mục.

## Nghiên cứu website thực tế

Đã truy cập website chính thức và xem ảnh chụp trình duyệt ngày 14/10/2026. Không sao chép ảnh, logo hoặc mã nguồn của các thương hiệu này.

| Website | Quan sát bố cục, chữ, ảnh, màu và chuyển động | Chi tiết tham khảo |
| --- | --- | --- |
| [Lily Vanilli — London](https://lilyvanilli.com/) | Bánh có tính cá nhân là hình ảnh trung tâm; ảnh lớn trên nền nhạt, chữ đơn giản, nhận diện riêng. Site thực tế có menu ngang và popup. | Hướng chủ đạo: đặt bánh và tính cá nhân của sản phẩm ở trung tâm. Không dùng popup hoặc menu ngang của họ. |
| [Stohrer — Paris](https://stohrer.fr/) | Ảnh bánh full-width, serif, nền trắng kết hợp xanh đậm và vàng; phân cấp rõ giữa thương hiệu, bộ sưu tập và đặt hàng. | Quy mô ảnh, phối hợp chữ serif với nội dung thực dụng, nhấn vào tay nghề. Màu được thay bằng màu Cake68. |
| [Maison Honoré — France](https://maisonhonore.com/) | Logo lớn, ảnh pâtisserie nổi bật, phần sản phẩm phân nhóm, câu chuyện và địa điểm rõ ràng; nền trắng và màu vàng nhận diện. | Cách liên kết logo, hình ảnh và nội dung thực tế; chia nhóm sản phẩm. Không tái hiện logo lớn hoặc nội dung địa điểm. |

Không website nào trong ba mẫu đã xem dùng sidebar trái ở trang chủ. Sidebar của Cake68 được thiết kế riêng theo yêu cầu bắt buộc, kết hợp nhịp editorial, số thứ tự nhỏ và trạng thái active tinh tế. Các chuyển động của Cake68 được thiết kế riêng, không tuyên bố sao chép chuyển động của website tham khảo.

## Design system

- Màu: đỏ rượu `#570c1b`, đỏ sẫm `#3e0712`, trắng ngà `#fffdf9`, nền ấm `#f2ece3`, chữ `#2c211e`, nét phân cách `#d8c9bb`, vàng trầm `#b58d4a`.
- Typography: Cormorant Garamond cho display và italic; DM Sans cho nội dung và điều khiển. Font thật từ Google Fonts, self-host WOFF2, có giấy phép OFL, hỗ trợ ký tự Phần Lan.
- Khoảng cách: khoảng nhỏ 8–12–16–24px; khoảng thành phần 32–40–56px; nhịp section khoảng 64px mobile và 78–116px desktop.
- Grid: sidebar 244px desktop, 220px ở laptop nhỏ, 268px ở màn hình lớn; nội dung 2 cột có tỷ lệ thay đổi. Drawer mobile 280px, giới hạn 86vw.
- Hero: chữ và ảnh chia hai vùng; ảnh tràn cạnh phải trên desktop, chuyển xuống dưới và có lề riêng trên điện thoại.
- Ảnh: ánh sáng tự nhiên, tông ivory–burgundy, kết cấu bơ kem và linen; không góc bo hoặc shadow quảng cáo.
- Gallery: một ảnh lớn đứng cùng hai ảnh nhỏ; trên mobile ảnh lớn chiếm hàng đầu, hai ảnh nhỏ hàng sau.
- Danh mục: typography và đường phân cách, tab nhóm sản phẩm, không lặp card.
- Button: chữ nhỏ gọn, hình chữ nhật, đỏ rượu hoặc trắng ngà, mũi tên chuyển nhẹ khi hover.
- Motion: native smooth anchor, drawer 420ms, reveal nhẹ 700–800ms, hover ảnh scale 1.035. Hỗ trợ `prefers-reduced-motion`.

## Hình ảnh

Người dùng đã cho phép tạo ảnh thay cho ảnh thực tế. Công cụ built-in `imagegen` được dùng để tạo bốn concept: hero bánh marjakakku, hääkakku, hands piping, chocolate mousse. Prompt đầy đủ: `image-prompts.json`.

Ảnh cuối được lưu tại:

- `assets/images/hero.webp` và `hero.jpg` (JPEG cho Open Graph).
- `assets/images/wedding.webp`.
- `assets/images/craft.webp`.
- `assets/images/mousse.webp`.

Đây là ảnh minh họa ý tưởng. Gallery nói rõ bằng tiếng Phần Lan: “Kuvat ovat tekoälyllä luotuja inspiraatiokuvia, eivät Cake68:n toteutettuja asiakastöitä.” Alt text cũng dùng “Kakkuidea”, “Inspiraatiokuva” hoặc “Kuvitus”. Ảnh ở nhóm đặc biệt không được gắn thành chứng cứ bánh phù hợp chế độ ăn. Logo `logo.webp` và `favicon.png` được tạo từ logo khách cung cấp, không vẽ lại.

## Thông tin còn thiếu

Theo hướng dẫn bổ sung của người dùng, bỏ qua trong giao diện: URL Facebook/Instagram, địa chỉ, giờ hoạt động, bảng giá. Không có yêu cầu chờ các thông tin đó mới hoàn thành.

URL GitHub Pages chính thức chưa có. Khi biết URL, dùng `scripts/set-site-url.py` để cập nhật canonical và Open Graph thành URL tuyệt đối. Chưa triển khai/push vào tài khoản GitHub; bản bàn giao đã sẵn sàng cho static hosting.

## Cập nhật typography — 15/10/2026

Theo yêu cầu tăng độ dày chữ và làm rõ đậm–nhạt: heading dùng Cormorant Garamond 600, phần italic 500; nội dung DM Sans 450; menu 500, mục active và CTA 600. Chữ nội dung đậm hơn, nền cream ấm hơn và đỏ rượu sâu hơn để phân cấp rõ. Dùng đúng weight của font variable đã self-host, không thêm text-shadow hoặc stroke giả. Giữ bố cục sidebar và kiểm tra lại cả mobile.
