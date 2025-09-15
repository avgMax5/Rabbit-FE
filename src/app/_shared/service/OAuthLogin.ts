

function OAuthLogin(
  provider: "google" | "github" | "kakao" | "naver"
) {
  try {
    const url = `http://localhost:8080/login/${provider}`;
    window.location.assign(url);
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
}


function Logout() {
  try {
    const url = `http://localhost:8080/auth/logout`;
    window.location.assign(url);
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
}

export { OAuthLogin, Logout };