       /* 全体の背景とフォント、パディングを最適化 */
        body {
            font-family: 'Helvetica Neue', Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 10px;
            display: flex;
            justify-content: center;
        }

        /* 大枠の形（幅450px、角丸25px、パディング）を完全統一 */
        .container {
            max-width: 450px;
            width: 100%;
            background: white;
            padding: 20px 0;
            border-radius: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            text-align: center;
            overflow: hidden;
        }

        h1 {
            color: #5C6BC0;
            font-size: 28px;
            margin: 5px 0 0 0;
        }

        .subtitle {
            color: #888;
            font-size: 0.75rem;
            font-weight: bold;
            margin-bottom: 15px;
        }

        /* --- 主な診断名エリア（左の表から完全忠実に移植） --- */
        .diagnosis-area {
            width: 66.6%;
            margin: 0 auto 20px auto;
            text-align: left;
            box-sizing: border-box;
        }

        .diagnosis-fixed-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f5f5f5;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 13px;
            color: #333;
            box-sizing: border-box;
        }

        .change-btn {
            background: none;
            border: none;
            color: #4A90E2;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
        }

        .select-box {
            width: 100%;
            padding: 10px 12px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: #fff;
            font-size: 13px;
            color: #333;
            outline: none;
            box-sizing: border-box;
        }

        .other-diagnosis-input {
            display: none;
            width: 100%;
            margin-top: 6px;
            padding: 10px 12px;
            border-radius: 8px;
            border: 1px solid #4A90E2;
            background-color: #fff;
            font-size: 13px;
            box-sizing: border-box;
            color: #333;
        }
        /* ----------------------------------------------- */

        .input-section {
            padding: 0 20px;
        }

        .label {
            display: block;
            text-align: left;
            font-weight: bold;
            margin: 8px 0 5px 5px;
            color: #333;
            font-size: 15px;
        }

        .scroll-wrapper {
            overflow-x: auto;
            white-space: nowrap;
            padding: 2px 0 10px 5px;
            -webkit-overflow-scrolling: touch;
        }

        .scroll-wrapper::-webkit-scrollbar { display: none; }

        /* 10段階ボタンの横並びgapと配置 */
        .btn-group-circle {
            display: inline-flex;
            gap: 12px;
        }

        /* ボタンの大きさ（52px正円）とフォント・カラー */
        .btn-group-circle button {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 50%;
            border: 1px solid #e5e7eb;
            background: #ffffff;
            color: #9ca3af;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0;
        }

        #mood-btns button.active {
            border: 2px solid #bfdbfe;
            color: #3b82f6;
            background-color: #eff6ff;
            font-weight: bold;
        }

        #cond-btns button.active {
            border: 2px solid #fde68a;
            color: #f59e0b;
            background-color: #fffbeb;
            font-weight: bold;
        }

        /* 今の気持ちメモの大きさ（高さ50px、角丸12px、背景色） */
        textarea {
            width: 100%;
            height: 50px;
            margin: 5px 0 15px 0;
            padding: 10px 15px;
            border-radius: 12px;
            border: none;
            background-color: #f3f4f6;
            font-size: 14px;
            box-sizing: border-box;
            resize: none;
            color: #333;
        }

        .save-btn {
            width: 100%;
            padding: 12px;
            background-color: #4A90E2;
            color: white;
            border: none;
            border-radius: 30px;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 20px;
            display: block;
        }

        /* グラフエリア（高さ350px、直結ボーダー、余白） */
        .chart-container {
            width: 100%;
            height: 350px;
            border-top: 1px solid #f3f4f6;
            padding-top: 15px;
        }

        /* Summary機能用レイアウトスタイル */
        .summary-section {
            padding: 0 20px;
            margin-top: 20px;
            text-align: center;
        }

        .summary-action-btn {
            background-color: #00C853;
            color: white;
            border: none;
            padding: 13px 35px;
            border-radius: 50px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 200, 83, 0.15);
            transition: 0.2s;
            display: inline-block;
        }

        .summary-action-btn:active { transform: scale(0.98); }

        #summary-ts { font-size: 11px; color: #B0BEC5; margin: 10px 0; }

        #summary-card {
            display: none;
            text-align: left;
            background-color: #F1F8E9;
            border-radius: 20px;
            padding: 20px;
            border: 1px solid #DCEDC8;
            font-size: 14px;
            line-height: 1.6;
            animation: fadeIn 0.3s ease-out;
            margin-top: 15px;
            margin-bottom: 20px;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .report-header { font-weight: bold; color: #2E7D32; font-size: 15px; border-bottom: 1px dashed #C5E1A5; padding-bottom: 6px; margin-bottom: 12px; display: block; }
        .report-item { margin-bottom: 8px; color: #333; }
        .report-label { font-weight: bold; color: #558B2F; min-width: 80px; display: inline-block; }
        .report-notes { background: white; padding: 10px 14px; border-radius: 10px; border: 1px solid #E8F5E9; margin-top: 6px; max-height: 100px; overflow-y: auto; font-size: 13px; color: #555; }

        .log-title { text-align: center; font-size: 18px; font-weight: bold; color: #444; margin: 30px 0 15px; }
        .log-list { padding: 0 20px; }
        
        .log-item {
            text-align: left;
            padding: 15px;
            margin-bottom: 12px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 15px;
            font-size: 14px;
            transition: background-color 0.4s, border-color 0.4s;
            box-sizing: border-box;
        }

        .log-item.highlight {
            background-color: #fff9c4 !important;
            border-color: #fbc02d !important;
        }

        .log-date {
            color: #4b5563;
            font-weight: bold;
            display: block;
            margin-bottom: 4px;
            font-size: 13px;
        }
        .log-diagnosis {
            display: inline-block;
            background-color: #e8eaf6;
            color: #3f51b5;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: bold;
            margin-left: 8px;
        }
