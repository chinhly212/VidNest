const GenDownload = (() => {
  const API = "https://gendownload.com/api";

  async function request(endpoint, body) {
    const response = await fetch(`${API}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API lỗi HTTP ${response.status}`);
    }

    return response.json();
  }

  // Phân tích video
  async function extract(url) {
    return request("extract", { url });
  }

  // Lấy danh sách video trong kênh hoặc playlist
  async function channel(url, limit = 30) {
    return request("channel", { url, limit });
  }

  // Đóng gói nhiều video thành ZIP
  async function zip(urls, quality = "best") {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw new Error("Chưa có video nào được chọn.");
    }

    return request("zip", { urls, quality });
  }

  // Kiểm tra trạng thái dịch vụ
  async function health() {
    const response = await fetch(`${API}/health`);

    if (!response.ok) {
      throw new Error(`API lỗi HTTP ${response.status}`);
    }

    return response.json();
  }

  return { extract, channel, zip, health };
})();
