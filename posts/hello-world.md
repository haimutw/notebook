# Markdown 系統功能完整測試文章

這是一篇用來全面測試「個人網頁」Markdown 渲染引擎的範例文章。我們將在此驗證程式碼高亮（Highlight.js）、數學公式（KaTeX）、GitHub 風格提示區塊（Alerts）、自訂表格與圖片的防跑版樣式。

---

## 1. 程式碼高亮測試 (Highlight.js)

以下測試不同程式語言的高亮效果，包含行號樣式與 Apple 風格的深淺色背景轉換。

### JavaScript 範例
```javascript
// 測試非同步請求與 Marked.js 的擴充功能
async function loadMarkdownPost(postName) {
    try {
        const response = await fetch(`posts/${postName}.md`);
        if (!response.ok) throw new Error('文章不存在 (404)');
        const markdownText = await response.text();
        
        // 渲染成 HTML
        document.getElementById('article-content').innerHTML = marked.parse(markdownText);
        console.log(`[Success] ${postName} 載入成功！`);
    } catch (error) {
        console.error(`[Error] 載入失敗: ${error.message}`);
    }
}

```

### CSS 範例

```css
/* 測試毛玻璃與 Apple 風格卡片 */
.apple-card {
    background-color: var(--bs-body-bg);
    border: 1px solid var(--border-translucent);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

```

---

## 2. GitHub 風格提示區塊 (Alerts)

此處測試自訂的 `blockquote` 解析器，應該要正確渲染出 5 種帶有 Bootstrap 圖示與專屬邊框顏色的提示框。

> [!NOTE]
> **筆記 (Note)**
> 這是用於補充說明的藍色提示框。適合放一些不影響閱讀主線，但對讀者有幫助的背景知識。

> [!TIP]
> **提示 (Tip)**
> 這是綠色的技巧提示框。可以用來分享小秘訣、最佳實踐（Best Practices）或是更有效率的快捷鍵。

> [!IMPORTANT]
> **重要 (Important)**
> 這是紫色的重要事項框。讀者在執行下一步之前，絕對需要先掌握的核心關鍵資訊。

> [!WARNING]
> **警告 (Warning)**
> 這是黃色的警告框。用來提醒讀者某些操作可能會帶來非預期的副作用，需要提高警覺。

> [!CAUTION]
> **危險 (Caution)**
> 這是紅色的危險框！用於警告毀滅性的後果，例如：資料遺失、硬體損壞或嚴重的安全性漏洞。

---

## 3. 數學公式測試 (KaTeX)

此處測試數學公式解析。行內公式應該要與文字完美對齊，區塊公式則應該獨立置中。

### 行內公式 (Inline Math)

當我們在討論機器學習時，著名的邏輯斯諦函數（Sigmoid）可以表示為 $f(x) = \frac{1}{1 + e^{-x}}$，這在神經網路中常作為激活函數。另外，愛因斯坦的質能互換公式為 $E=mc^2$。

### 獨立區塊公式 (Display Math)

以下是一個複雜的傅立葉變換（Fourier Transform）公式，用來測試多行與大型符號的渲染極限：

$$\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} \,dx$$

再測試一個標準差與方差的統計學公式：

$$\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2}$$

---

## 4. 表格內嵌測試 (Tables)


| 狀態碼 | 類型 | 語法功能說明 | 是否支援 |
| --- | --- | --- | --- |
| 200 | Core | 標準 Markdown 標題、粗體、斜體與清單 | **已支援** |
| 201 | Plugin | 程式碼區塊高亮（Highlight.js 載入） | **已支援** |
| 202 | KaTeX | 行內與區塊數學公式（$ 與 $$ 語法） | **已支援** |
| 203 | Custom | GitHub Alerts 提示區塊區分器 | **已支援** |
| 404 | Error | 找不到 `.md` 檔案時的 404 友善提示 | **已修復** |
