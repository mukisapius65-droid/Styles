
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0d1117;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    color: #e6edf3;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* ========== TOP MEGA BAR ========== */
.top-mega-bar {
    background: #161c24;
    border-bottom: 2px solid #2d4055;
    padding: 0.6rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    box-shadow: 0 6px 14px #00000080;
    z-index: 200;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-section span:first-child {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(145deg, #b0e0ff, #6a9eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 1px;
}

.logo-section span:last-child {
    font-size: 0.9rem;
    opacity: 0.7;
    color: #8fa3c9;
}

.file-upload-global {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.file-upload-global label,
.global-actions button,
.shuffle-preview-btn {
    background: #263545;
    border: 1px solid #4d6b8f;
    color: #d4e6ff;
    padding: 0.45rem 1.1rem;
    border-radius: 30px;
    font-size: 0.9rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: 0.15s;
}

.file-upload-global label:hover,
.global-actions button:hover,
.shuffle-preview-btn:hover {
    background: #3f5c82;
    border-color: #84abdd;
    box-shadow: 0 0 12px #2d6bb0;
}

.global-actions {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
}

/* ========== MAIN 3-COLUMN GRID ========== */
.main-dashboard {
    display: grid;
    grid-template-columns: 260px 1fr 280px;
    gap: 1.2rem;
    padding: 1.2rem;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

/* ========== LEFT EXPLORER ========== */
.left-explorer {
    background: #141c26;
    border-radius: 28px;
    border: 1px solid #2f4660;
    padding: 1.2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
    box-shadow: inset 0 2px 6px #030609, 0 12px 24px #00000080;
}

.section-title {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #93b3df;
    margin-bottom: 0.8rem;
    border-bottom: 1px solid #334f6e;
    padding-bottom: 0.3rem;
}

.image-directory h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: #b5d1f0;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.image-item {
    background: #1e2b3b;
    border-radius: 18px;
    padding: 0.6rem;
    text-align: center;
    border: 1px solid #3b5780;
    font-size: 0.75rem;
    color: #b5d1f0;
    transition: 0.1s;
}

.image-item span {
    font-size: 2.5rem;
    color: #679ad8;
    margin-bottom: 4px;
    display: block;
}

.file-tree ul {
    list-style: none;
    padding-left: 0;
}

.file-tree li {
    padding: 0.4rem 0.8rem;
    background: #1b2635;
    margin-bottom: 0.3rem;
    border-radius: 12px;
    border-left: 4px solid #446b9e;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #bbd3f3;
}

.go-to-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.go-to-buttons button {
    background: #263545;
    border: 1px solid #4d6b8f;
    color: #d4e6ff;
    padding: 0.4rem 1rem;
    border-radius: 30px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: 0.15s;
    flex: 1;
}

.go-to-buttons button:hover {
    background: #3f5c82;
}

/* ========== MIDDLE EDITORS ========== */
.middle-editors {
    background: #141c26;
    border-radius: 28px;
    border: 1px solid #2f4660;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
}

.editor-tab {
    background: #0e1621;
    border-radius: 22px;
    border: 1px solid #2c4260;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
}

.editor-header {
    background: #1e2d3f;
    padding: 0.5rem 1.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: #c5dcff;
    border-bottom: 1px solid #2c4a70;
    gap: 0.5rem;
}

.editor-header-left i {
    margin-right: 6px;
}

.editor-header-right {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.editor-header-right button,
.editor-header-right label {
    background: #2c4058;
    border: none;
    color: white;
    padding: 0.25rem 0.8rem;
    border-radius: 30px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: 0.1s;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.editor-header-right input {
    background: #1f2e40;
    border: 1px solid #3f5b7a;
    color: white;
    width: 70px;
    padding: 0.25rem 0.5rem;
    border-radius: 30px;
    margin-left: 4px;
}

.editor-header-right button:hover {
    background: #3f5c82;
}

textarea {
    width: 100%;
    background: #1a1a1a;
    color: #d4d4d4;
    border: none;
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    resize: vertical;
    min-height: 150px;
    outline: none;
}

textarea:focus {
    outline: 1px solid #3f6b9e;
}

/* ========== RIGHT PREVIEW ========== */
.right-preview {
    background: #141c26;
    border-radius: 28px;
    border: 1px solid #2f4660;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    overflow-y: auto;
    transition: width 0.3s ease, min-width 0.3s ease, opacity 0.2s ease;
}
.right-preview.collapsed {
    width: 0;
    min-width: 0;
    opacity: 0;
    padding: 0;
    border: none;
}

.preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
    color: #b5d1f0;
}

.preview-header button {
    background: #2c4058;
    border: 1px solid #4d6b8f;
    color: white;
    padding: 0.3rem 1rem;
    border-radius: 30px;
    cursor: pointer;
}

.preview-header button:hover {
    background: #3f5c82;
}

iframe {
    width: 100%;
    height: 220px;
    background: white;
    border-radius: 12px;
    border: 1px solid #2c4a70;
}

.shuffle-area,
.search-area,
.download-area {
    background: #1e2b3b;
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    align-items: center;
}

.shuffle-area span,
.search-area span {
    font-weight: bold;
    color: #b5d1f0;
    min-width: 140px;
}

.shuffle-area .note {
    color: #7c94b5;
    font-size: 0.85rem;
    margin-left: auto;
}

.search-area input {
    flex: 1;
    min-width: 180px;
    background: #1f2e40;
    border: 1px solid #3f5b7a;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 0.9rem;
}

.search-area button,
.download-area button {
    background: #2c4058;
    border: 1px solid #4d6b8f;
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.15s;
}

.search-area button:hover,
.download-area button:hover {
    background: #3f5c82;
}

.download-area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.download-area button {
    flex: 1;
    min-width: 140px;
}

/* ========== SETTINGS PANEL ========== */
.settings-area {
    background: #161c24;
    padding: 2rem;
    margin: 1.5rem;
    border-radius: 30px;
    border: 1px solid #2f4660;
    transition: max-height 0.3s ease, padding 0.3s ease, margin 0.3s ease;
    overflow: hidden;
    max-height: 600px;
}
.settings-area.collapsed {
    max-height: 0;
    padding: 0 2rem;
    margin: 0 1.5rem;
    border: none;
}
.settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
#closeSettingsBtn {
    background: transparent;
    border: none;
    color: #93b3df;
    font-size: 1.5rem;
    cursor: pointer;
}
#closeSettingsBtn:hover {
    color: white;
}

.settings-area h2 {
    color: #93b3df;
    border-bottom: 1px solid #334f6e;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
}

.settings-area h3 {
    color: #b5d1f0;
    margin-bottom: 0.8rem;
}

.settings-area label {
    display: block;
    margin-bottom: 0.5rem;
    color: #c9ddff;
}

.settings-area input[type="checkbox"] {
    margin-right: 0.5rem;
    accent-color: #4d8fd8;
}

.settings-area select,
.settings-area input[type="number"],
.settings-area input[type="range"] {
    background: #1f2e40;
    border: 1px solid #3f5b7a;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    margin-left: 0.5rem;
}

.settings-actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
}

.settings-actions button {
    background: #2c4058;
    border: 1px solid #4d6b8f;
    color: white;
    padding: 0.7rem 2rem;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1rem;
}

.settings-actions button:hover {
    background: #3f5c82;
}

/* ========== FOOTER ========== */
footer {
    background: #161c24;
    padding: 1rem 1.5rem;
    border-top: 2px solid #2d4055;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    color: #9bb5d9;
}

.footer-stats {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    flex-wrap: wrap;
}

.footer-stats span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.footer-actions {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.footer-actions button {
    background: #263545;
    border: 1px solid #4d6b8f;
    color: #d4e6ff;
    padding: 0.3rem 1rem;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.15s;
}

.footer-actions button:hover {
    background: #3f5c82;
}

/* ========== SCROLLBARS ========== */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: #0e1621;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: #2c4058;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: #3f5c82;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1000px) {
    .main-dashboard {
        grid-template-columns: 1fr;
        overflow-y: auto;
    }
    .left-explorer,
    .middle-editors,
    .right-preview {
        max-height: 500px;
    }
    .settings-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 600px) {
    .top-mega-bar {
        flex-direction: column;
        align-items: stretch;
    }
    .global-actions {
        justify-content: center;
    }
    .shuffle-area,
    .search-area,
    .download-area {
        flex-direction: column;
        align-items: stretch;
    }
    .search-area input {
        width: 100%;
    }
    footer {
        flex-direction: column;
        text-align: center;
    }
}
