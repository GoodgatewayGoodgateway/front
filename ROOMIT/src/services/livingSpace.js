import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const fetchAllLivingSpace = async (query = "상인동") => {
  try {
    console.log("📡 요청 query:", query);
    const response = await api.get("/listings/search", {
      params: { query },
    });
    console.log("📥 받은 응답:", response.data);

    // 여기!! listings 키에서 꺼내기
    const listings = Array.isArray(response.data.listings) ? response.data.listings : [];

    console.log("✅ 추출된 listings 배열:", listings);
    return listings;
  } catch (error) {
    const errorMessage = error.response
      ? `에러: ${error.response.status} - ${error.response.data.message || "알 수 없는 에러"}`
      : error.message || "네트워크 에러";
    console.error("❌ LivingSpace fetch 실패:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const fetchListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};

export const fetchAiSummary = async (data) => {
  const response = await api.post("/summary", {
    address: data.address,
    netLeasableArea: data.area,
    deposit: data.deposit,
    monthly: data.monthly,
  });
  return response.data.summary;
};

export const fetchFacilities = async (id) => {
  try {
    const response = await api.get(`/facilities`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? `편의시설 불러오기 실패: ${error.response.status} - ${
          error.response.data.message || "알 수 없는 에러"
        }`
      : error.message || "네트워크 에러 발생";
    console.error("❌ 주변 편의시설 정보 실패:", errorMessage);
    throw new Error(errorMessage);
  }
};
