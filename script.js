// ================================
// DOM取得
// ================================
const textInput = document.getElementById("textInput");
const showBtn = document.getElementById("showBtn");
const bgBtn = document.getElementById("bgBtn");
const displayArea = document.getElementById("displayArea");
const table = document.getElementById("myTable");
const countSpan = document.getElementById("count");

// 背景色の循環用
const colors = ["lightblue", "lightgreen", "lightcoral"];
let colorIndex = 0;

// 追加回数
let addCount = 0;

// 最大表示件数
const MAX_ROWS = 3;


// ================================
// 設問7：forループで1～5をログに表示
// ================================
function printLoopCounts() {
    console.log("===== 設問7：forループで1～5表示 =====");
    for (let i = 1; i <= 5; i++) {
        console.log(i);
    }
    console.log("===================================");
}


// ================================
// 設問1：表示処理
// 設問3：highlightトグル
// 設問4：クリックで行追加（修正）
// ================================
showBtn.addEventListener("click", () => {
    const text = textInput.value.trim();

    if (text === "") {
        alert("入力値が空です。");
        return;
    }

    // 設問1：表示
    displayArea.textContent = text;

    // 設問3：highlightトグル
    displayArea.classList.toggle("highlight");

    // 設問7：ログ（1～5）
    printLoopCounts();

    // 設問4：行追加（クリックで追加に変更）
    addRow();
});


// ================================
// 設問2：背景色変更
// ================================
bgBtn.addEventListener("click", () => {
    displayArea.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;

    printLoopCounts();
});


// ================================
// 設問4：テーブル行の追加
// 設問6：最大3件 → 古いデータを削除
// ================================

// Enterキーで追加
textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addRow();
});

function addRow() {
    const text = textInput.value.trim();
    if (text === "") return;

    // 3件制限（古い行から削除）
    while (table.rows.length - 1 >= MAX_ROWS) {
        table.deleteRow(1);
        addCount--;
    }

    // 新規行を追加
    const row = table.insertRow(-1);
    const cellText = row.insertCell(0);
    const cellBtn = row.insertCell(1);

    cellText.textContent = text;

    // 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";

    // 設問5：削除処理
    delBtn.addEventListener("click", () => {
        table.deleteRow(row.rowIndex);
        addCount--;
        countSpan.textContent = addCount;

        // 3件未満になれば表示ボタンをまた表示
        if (addCount < 3) {
            showBtn.style.display = "inline-block";
        }

        printLoopCounts();
    });

    cellBtn.appendChild(delBtn);

    // カウント更新
    addCount++;
    countSpan.textContent = addCount;

    // 3件以上になれば表示ボタンを非表示
    if (addCount >= 3) {
        showBtn.style.display = "none";
    }

    textInput.value = "";
    printLoopCounts();
}