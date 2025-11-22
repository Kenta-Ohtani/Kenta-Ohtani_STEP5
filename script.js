// ================================
// それぞれ使用するDOM取得
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


// =====================================
// 1～5のループ回数を記録
// =====================================
let loopCounts = {
    q1: 0, // 1
    q2: 0, // 2
    q3: 0, // 3
    q4: 0, // 4
    q5: 0  // 5
};

// ログ出力用関数
function printLoopCounts() {
    console.log("===== 設問1～5のループ回数 =====");
    console.log("設問1（表示）：", loopCounts.q1);
    console.log("設問2（背景色変更）：", loopCounts.q2);
    console.log("設問3（ハイライト切替）：", loopCounts.q3);
    console.log("設問4（行追加）：", loopCounts.q4);
    console.log("設問5（行削除）：", loopCounts.q5);
    console.log("===============================");
}



// ================================
// 設問1
// 設問3
// ================================
showBtn.addEventListener("click", () => {
    const text = textInput.value.trim();

    if (text === "") {
        alert("入力値が空です。");
        return;
    }

    displayArea.textContent = text;
    displayArea.classList.toggle("highlight");

    // 設問1 & 設問3 カウント
    loopCounts.q1++;
    loopCounts.q3++;
    printLoopCounts();
});



// ================================
// 設問2
// ================================
bgBtn.addEventListener("click", () => {
    displayArea.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;

    loopCounts.q2++;
    printLoopCounts();
});



// ================================
// 設問4
// 設問6
// ================================

textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addRow();
});

// 表示ボタンのダブルクリックでも追加できるように（任意）
showBtn.addEventListener("dblclick", addRow);

function addRow() {
    const text = textInput.value.trim();
    if (text === "") {
        alert("入力値が空です。");
        return;
    }

    // ---- 設問6：最大3件の制限 ----
    while (table.rows.length - 1 >= MAX_ROWS) {
        table.deleteRow(1); // 先頭のデータを削除
        addCount--;
    }

    // 行の追加
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

        loopCounts.q5++;
        printLoopCounts();

        // 3件未満に戻ったら表示ボタンを戻す
        if (addCount < 3) {
            showBtn.style.display = "inline-block";
        }

        countSpan.textContent = addCount;
    });

    cellBtn.appendChild(delBtn);

    // カウント増加
    addCount++;
    countSpan.textContent = addCount;

    // 3回以上追加すると表示ボタンを非表示
    if (addCount >= 3) {
        showBtn.style.display = "none";
    }

    textInput.value = "";

    // 設問4 カウント
    loopCounts.q4++;
    printLoopCounts();
}
