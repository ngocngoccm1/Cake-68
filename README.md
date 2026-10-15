# Cake68 — Art & Taste

Landing page tiếng Phần Lan, HTML/CSS/JavaScript thuần. `index.html` nằm ngay thư mục gốc. Không cần npm, build, tài khoản dịch vụ hoặc khóa API để chạy.

## Xem và chạy

Mở `index.html` trực tiếp bằng Chrome/Edge, hoặc chạy trong thư mục dự án:

```sh
python -m http.server 4188
```

Truy cập `http://localhost:4188/`. Nếu dùng Linux và lệnh `python` chưa có, dùng `python3`.

## Triển khai GitHub Pages

1. Đưa `index.html`, `styles.css`, `script.js`, `.nojekyll` và toàn bộ thư mục `assets` lên thư mục gốc của repository. Có thể giải nén `cake68-github-pages.zip` để lấy bộ bàn giao.
2. Vào **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Chọn branch chứa mã nguồn, chọn **/(root)** rồi **Save**.
4. Website sẽ chạy tại URL GitHub Pages do GitHub cung cấp. Asset dùng `./assets/...`, không có đường dẫn `/assets/...` gây lỗi ở repository path.

Khi biết URL website chính thức, chạy:

```sh
python scripts/set-site-url.py https://USERNAME.github.io/REPOSITORY/
```

Lệnh này thêm canonical URL, `og:url` và chuyển `og:image` thành URL tuyệt đối để các nền tảng chia sẻ đọc đúng ảnh. Thay URL ví dụ bằng URL thật; upload lại `index.html`. Website vẫn chạy bình thường trước bước này, nhưng ảnh chia sẻ trên mạng xã hội cần URL tuyệt đối để hoạt động ổn định.

## Chỉnh sửa

- Nội dung và thông tin liên hệ: `index.html`.
- Màu, typography, responsive: biến trong `:root` và media query của `styles.css`.
- Điều khiển menu, tab danh mục, lightbox, mẫu email: `script.js`.
- Hình: `assets/images`. Font và giấy phép OFL: `assets/fonts`.
- Mẫu email chỉ mở ứng dụng email của khách; khách xem, điền và tự gửi. Không có backend nhận đơn, không có biểu mẫu giả.
- Nút danh mục từng loại bánh mở email đến `cake68fin@gmail.com` với nội dung điền sẵn. Nút gọi dùng `tel:+358400810936`.

## Nguồn dữ liệu và thiết kế

Đã đọc cả hai file Word và dùng đúng logo gốc. Toàn bộ audit, thông tin còn thiếu, so sánh ba website tham khảo và design system nằm trong `docs/design-and-content.md`.

Bốn ảnh đã được tạo bằng công cụ imagegen theo sự cho phép của bạn, lưu trong `assets/images`, tối ưu WebP. Đây là ảnh minh họa ý tưởng, không phải ảnh sản phẩm hay cơ sở Cake68 thực tế. Website ghi rõ điều này ở phần Inspiraatio; prompt đầy đủ nằm trong `docs/image-prompts.json`. Logo chính thức được giữ nguyên, chỉ giảm kích thước cho web và favicon.

Theo yêu cầu của bạn, các thông tin chưa cung cấp (địa chỉ, giờ hoạt động, giá, URL mạng xã hội) được bỏ khỏi giao diện. Không có dữ liệu giả thay thế. URL website chính thức cần bổ sung cho canonical/Open Graph khi triển khai.

Bản desktop dùng sidebar trái; ở 1023px trở xuống chuyển sang drawer từ bên trái. Đã kiểm tra bằng Chrome/Playwright ở nhiều kích thước, có ảnh và kết quả trong `docs/qa`.
# Cake-68
