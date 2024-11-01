import cafe1 from '../images/img1.jpeg'
export const colLogo = "https://upload.wikimedia.org/wikipedia/en/7/7a/Yenepoya_University_logo.png"
export const token = localStorage.getItem("authToken")
export const isAdmin = localStorage.getItem("isAdmin") || "false"
export const FETCH_URL = process.env.REACT_APP_FETCH_URL

export const options = {
    month: "long", // Full month name
    day: "numeric", // Day of the month
    hour: "numeric", // Hour
    minute: "2-digit", // Minute with leading zeros
    hour12: true, // 12-hour time format
  };

export const emptyCart = "https://keenthemes.ams3.digitaloceanspaces.com/market/images/doozy/doozy_free/20.png"

export const img1 = cafe1
export const img2 = "https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205097.jpg?t=st=1716994459~exp=1716998059~hmac=f3d2bbc60a5afdf293cb85d706b212ba4e1c90744c7c5a12fb9504660755f833&w=1380"
export const img3 = "https://static01.nyt.com/images/2023/05/02/multimedia/23WELL-HEALTHY-BREAKFAST1-gzqt/23WELL-HEALTHY-BREAKFAST1-gzqt-superJumbo.jpg?quality=75&auto=webp"