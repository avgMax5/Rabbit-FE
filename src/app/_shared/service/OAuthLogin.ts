const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function OAuthLogin(
  provider: "google" | "github" | "kakao" | "naver"
) {
  try {
    const url = `${API_BASE_URL}/login/${provider}`;
    window.location.assign(url);
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
}


function Logout() {
  try {
    const url = `${API_BASE_URL}/auth/logout`;
    window.location.assign(url);
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
}

export { OAuthLogin, Logout };