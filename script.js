// 靜態美食資料 (MVP階段，模擬資料)
// 實際專案中，這些資料會來自後端或API
const staticRestaurants = [
    {
        name: "一蘭拉麵 (新宿店)",
        address: "東京都新宿区新宿3-34-11 ピースビルB1F",
        price: "中等 (約 1000-1500 円)",
        recommended: "天然豚骨拉麵、半熟鹽味蛋、豚骨",
        comment: "單人座設計很棒，可以專心品嚐拉麵，湯頭濃郁麵條Q彈。",
        category: "拉麵" // 新增分類欄位方便篩選
    },
    {
        name: "築地玉壽司 (築地本店)",
        address: "東京都中央区築地5-2-1 築地魚河岸 小田原橋棟3F",
        price: "昂貴 (約 3000-5000 円)",
        recommended: "握壽司拼盤、海膽壽司",
        comment: "新鮮度滿分，醋飯調味適中，是品嚐築地海鮮的好選擇。",
        category: "壽司、海鮮" // 新增分類欄位
    },
    {
        name: "鳥貴族 (澀谷中心街店)",
        address: "東京都渋谷区宇田川町28-3 A2ビルB1F",
        price: "便宜 (約 500-1500 円)",
        recommended: "烤雞肉串 (均一價)、高粱酒、串燒",
        comment: "價格實惠CP值高，串燒種類多樣，朋友聚餐的好去處。",
        category: "居酒屋、串燒" // 新增分類欄位
    },
    {
        name: "HARBS (六本木之丘店)",
        address: "東京都港区六本木6-10-1 六本木ヒルズ 森タワー 1F",
        price: "中等 (約 1000-2500 円)",
        recommended: "水果千層蛋糕、草莓蛋糕、甜點",
        comment: "蛋糕用料實在，水果新鮮，甜度適中，下午茶的首選。",
        category: "甜點、咖啡" // 新增分類欄位
    },
    {
        name: "美登利壽司 (銀座總本店)",
        address: "東京都中央区銀座7-2 銀座コリドー街",
        price: "中等 (約 2000-4000 円)",
        recommended: "特選握壽司、蟹膏沙拉",
        comment: "CP值超高的迴轉壽司店，食材新鮮份量足，排隊值得！",
        category: "壽司、海鮮" // 新增分類欄位
    },
    {
        name: "淺草今半 (國際通本店)",
        address: "東京都台東区西淺草3-1-12",
        price: "昂貴 (約 8000-15000 円)",
        recommended: "壽喜燒、涮涮鍋、和牛",
        comment: "頂級和牛壽喜燒，入口即化，服務一流，值得一試。",
        category: "壽喜燒、和牛" // 新增分類欄位
    },
    {
        name: "涉谷肉橫丁",
        address: "東京都渋谷区宇田川町13-8 ちとせ会館",
        price: "中等 (約 2000-4000 円)",
        recommended: "燒肉、烤肉、居酒屋、各式小吃",
        comment: "多家燒肉、居酒屋集中地，適合和朋友體驗日本夜生活。",
        category: "燒肉、居酒屋" // 新增分類欄位
    },
    {
        name: "新宿思い出橫丁",
        address: "東京都新宿区西新宿1-2",
        price: "便宜 (約 1000-3000 円)",
        recommended: "串燒、拉麵、居酒屋、蕎麥麵",
        comment: "懷舊風格的小巷，充滿昭和氣息，有很多特色小店。",
        category: "居酒屋、串燒、小吃" // 新增分類欄位
    }
];

// 獲取 DOM 元素
const searchButton = document.getElementById('searchButton');
const searchResultsDiv = document.getElementById('searchResults');
const locationInput = document.getElementById('location');
const categoryInput = document.getElementById('category');
const priceInput = document.getElementById('price'); // 雖然MVP階段暫不處理複雜的價位篩選，但可以獲取值

// 監聽搜尋按鈕點擊事件
searchButton.addEventListener('click', () => {
    const locationQuery = locationInput.value.toLowerCase().trim(); // 獲取並處理景點輸入
    const categoryQuery = categoryInput.value.toLowerCase().trim(); // 獲取並處理類別輸入
    // const priceQuery = priceInput.value.toLowerCase().trim(); // 獲取價位輸入，目前MVP不處理複雜篩選

    const filteredRestaurants = staticRestaurants.filter(restaurant => {
        let matchesLocation = true;
        let matchesCategory = true;
        // let matchesPrice = true; // 暫不處理價位篩選

        // 景點篩選邏輯
        if (locationQuery) {
            // 檢查餐廳地址是否包含景點關鍵字
            matchesLocation = restaurant.address.toLowerCase().includes(locationQuery) ||
                              restaurant.name.toLowerCase().includes(locationQuery); // 也檢查店名是否包含景點
        }

        // 美食類別篩選邏輯
        if (categoryQuery) {
            // 檢查餐廳的 category 欄位或推薦項目是否包含類別關鍵字
            matchesCategory = restaurant.category.toLowerCase().includes(categoryQuery) ||
                              restaurant.recommended.toLowerCase().includes(categoryQuery);
        }

        // 綜合判斷：只要滿足所有輸入的條件，就視為符合
        return matchesLocation && matchesCategory; // && matchesPrice;
    });

    displayResults(filteredRestaurants);
});

/**
 * 根據提供的餐廳資料陣列，動態顯示搜尋結果
 * @param {Array} restaurants - 包含餐廳物件的陣列
 */
function displayResults(restaurants) {
    searchResultsDiv.innerHTML = ''; // 清空之前的結果

    if (restaurants.length === 0) {
        searchResultsDiv.innerHTML = '<p class="placeholder-text">抱歉，沒有找到符合條件的餐廳。請嘗試其他關鍵字或放寬搜尋條件。</p>';
        return;
    }

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');

        // 生成 Google Map 連結的 URL
        // 使用 encodeURIComponent 確保地址中的特殊字元正確編碼
        const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('東京 ' + restaurant.address)}`;

        card.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p><strong>地址：</strong> ${restaurant.address}
               <a href="${googleMapUrl}" target="_blank" class="google-map-link">(查看地圖)</a>
            </p>
            <p><strong>平均價位：</strong> ${restaurant.price}</p>
            <p><strong>推薦/必點：</strong> ${restaurant.recommended}</p>
            <p><strong>評論：</strong> 「${restaurant.comment}」</p>
        `;
        searchResultsDiv.appendChild(card);
    });
}

// 頁面載入時，先顯示一個提示訊息
document.addEventListener('DOMContentLoaded', () => {
    searchResultsDiv.innerHTML = '<p class="placeholder-text">輸入條件後點擊搜尋，即可找到東京美食！</p>';
});

