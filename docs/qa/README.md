# Kiểm tra giao diện và chức năng

Chrome thực tế chạy headless qua Playwright trên Windows; viewport mô phỏng thiết bị. Ngày kiểm tra: 14/10/2026. Không xác nhận đã thử trên điện thoại vật lý hoặc Safari.

**Tất cả PASS:** 320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920px. Kết quả máy đọc được: `results.json`.

- Không tràn ngang ở toàn trang hoặc thành phần nội dung.
- Sidebar trái desktop; drawer trượt từ trái mobile/tablet.
- Menu mở, đóng bằng X/Escape/backdrop/chọn link; focus trap, trả focus và `inert` cho nội dung phía sau.
- Animation đóng drawer vẫn hiển thị trong thời gian trượt, rồi mới ẩn.
- Navigation active cập nhật theo vị trí scroll.
- Tab chọn nhóm, ArrowLeft/Right/Home/End, đầy đủ 14 loại bánh/phụ kiện.
- Tất cả anchor có đích hợp lệ; ID không trùng; một H1.
- Email mẫu có người nhận, subject và nội dung tiếng Phần Lan; link điện thoại đúng số. Không thử gửi email hoặc gọi thật.
- Clipboard thực sự chứa `cake68fin@gmail.com` sau khi nhấn Kopioi.
- Gallery mở lightbox; đóng bằng Escape/X/backdrop; khôi phục khả năng cuộn.
- Toàn bộ ảnh tải và decode thành công, font nội bộ tải thành công, không có request 404 hoặc lỗi JavaScript.
- Reduced motion không che nội dung; khi tắt JavaScript vẫn có đầy đủ nội dung và 14 nhóm bánh.
- Chạy thành công ở root và đường dẫn `/Cake%2068/`, xác nhận ảnh, font và điều hướng dùng đường dẫn tương đối.
- Tương phản chữ chính: đỏ rượu trên nền sáng khoảng 12.96:1; chữ nội dung xám trên nền cream khoảng 4.69:1; chữ mô tả trong khối đỏ hơn 7:1. Vàng dùng cho trang trí và đường nét.

Ảnh viewport: `desktop.jpg`, `mobile.jpg`, `mobile-menu.jpg`. Ảnh toàn trang: `desktop-full.jpg`, `mobile-full.jpg`.

Lưu ý ảnh chụp toàn trang của Chrome ghép vùng cuộn: sidebar hoặc thanh mobile `position: fixed` có thể xuất hiện ở vị trí viewport cuối khi chụp. Kiểm tra bố cục cố định bằng các ảnh viewport, không bằng vị trí của nó trong ảnh ghép toàn trang.
