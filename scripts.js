(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // ---------- Ace Editor Initialization ----------
        const htmlContainer = document.getElementById('html-editor-container');
        const cssContainer = document.getElementById('css-editor-container');
        const jsContainer = document.getElementById('js-editor-container');

        function createAceEditor(container, mode, theme = 'ace/theme/dracula') {
            if (!container) return null;
            const textarea = container.querySelector('textarea');
            if (!textarea) return null;
            const editorDiv = document.createElement('div');
            editorDiv.style.width = '100%';
            editorDiv.style.height = textarea.style.height || '200px';
            editorDiv.className = 'ace-editor';
            textarea.parentNode.insertBefore(editorDiv, textarea);
            textarea.style.display = 'none';
            const editor = ace.edit(editorDiv);
            editor.setTheme(theme);
            editor.session.setMode(mode);
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                fontSize: '14px',
                showPrintMargin: false,
                tabSize: 2,
                mouseWheelScrollSpeed: 1
            });
            editor.setValue(textarea.value || '', -1);
            return editor;
        }

        const htmlEditor = createAceEditor(htmlContainer, 'ace/mode/html');
        const cssEditor = createAceEditor(cssContainer, 'ace/mode/css');
        const jsEditor = createAceEditor(jsContainer, 'ace/mode/javascript');

        const editors = { html: htmlEditor, css: cssEditor, js: jsEditor };
        let activeEditor = htmlEditor;
        Object.values(editors).forEach(ed => {
            if (ed) ed.on('focus', () => { activeEditor = ed; });
        });

        // ---------- State ----------
        const uploadedFiles = { html: [], css: [], js: [] };
        let currentIndices = { html: 0, css: 0, js: 0 };

        function updateFileStats() {
            const total = uploadedFiles.html.length + uploadedFiles.css.length + uploadedFiles.js.length;
            document.getElementById('fileCount').innerHTML = `<i class="far fa-file"></i> ${total} files loaded`;
            const tree = document.getElementById('fileTreeList');
            if (tree) {
                tree.innerHTML = '';
                [...uploadedFiles.html, ...uploadedFiles.css, ...uploadedFiles.js].forEach(f => {
                    const li = document.createElement('li');
                    li.textContent = `📄 ${f.name}`;
                    tree.appendChild(li);
                });
            }
        }

        // ---------- File Upload ----------
        const fileInput = document.getElementById('globalFileInput');
        if (fileInput) {
            fileInput.addEventListener('change', async (e) => {
                const files = Array.from(e.target.files);
                for (const file of files) {
                    const ext = file.name.split('.').pop().toLowerCase();
                    const content = await file.text();
                    if (ext === 'html' || ext === 'htm') uploadedFiles.html.push({ name: file.name, content });
                    else if (ext === 'css') uploadedFiles.css.push({ name: file.name, content });
                    else if (ext === 'js') uploadedFiles.js.push({ name: file.name, content });
                }
                if (uploadedFiles.html.length && htmlEditor) htmlEditor.setValue(uploadedFiles.html[0].content, -1);
                if (uploadedFiles.css.length && cssEditor) cssEditor.setValue(uploadedFiles.css[0].content, -1);
                if (uploadedFiles.js.length && jsEditor) jsEditor.setValue(uploadedFiles.js[0].content, -1);
                updateFileStats();
                updatePreview();
                fileInput.value = '';
            });
        }

        // ---------- Preview ----------
        const previewFrame = document.querySelector('.right-preview iframe');
        function updatePreview() {
            if (!previewFrame) return;
            const html = htmlEditor ? htmlEditor.getValue() : '';
            const css = cssEditor ? cssEditor.getValue() : '';
            const js = jsEditor ? jsEditor.getValue() : '';
            const doc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
            const blob = new Blob([doc], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            previewFrame.src = url;
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        }

        let previewTimer;
        function schedulePreview() {
            const autoRefresh = document.getElementById('autoRefreshCheck');
            if (autoRefresh && !autoRefresh.checked) return;
            clearTimeout(previewTimer);
            previewTimer = setTimeout(updatePreview, 500);
        }
        if (htmlEditor) htmlEditor.on('change', schedulePreview);
        if (cssEditor) cssEditor.on('change', schedulePreview);
        if (jsEditor) jsEditor.on('change', schedulePreview);

        document.getElementById('refreshPreview')?.addEventListener('click', updatePreview);

        // ---------- Shuffle ----------
        function setEditorContentFromUpload(type, index) {
            const files = uploadedFiles[type];
            if (!files.length) return;
            const idx = ((index % files.length) + files.length) % files.length;
            const file = files[idx];
            if (type === 'html' && htmlEditor) htmlEditor.setValue(file.content, -1);
            if (type === 'css' && cssEditor) cssEditor.setValue(file.content, -1);
            if (type === 'js' && jsEditor) jsEditor.setValue(file.content, -1);
            currentIndices[type] = idx;
        }

        document.getElementById('shuffleHtml')?.addEventListener('click', () => {
            currentIndices.html++;
            setEditorContentFromUpload('html', currentIndices.html);
            updatePreview();
        });
        document.getElementById('shuffleCss')?.addEventListener('click', () => {
            currentIndices.css++;
            setEditorContentFromUpload('css', currentIndices.css);
            updatePreview();
        });
        document.getElementById('shuffleJs')?.addEventListener('click', () => {
            currentIndices.js++;
            setEditorContentFromUpload('js', currentIndices.js);
            updatePreview();
        });
        document.querySelector('.shuffle-preview-btn')?.addEventListener('click', () => {
            if (uploadedFiles.html.length) {
                currentIndices.html = Math.floor(Math.random() * uploadedFiles.html.length);
                setEditorContentFromUpload('html', currentIndices.html);
            }
            if (uploadedFiles.css.length) {
                currentIndices.css = Math.floor(Math.random() * uploadedFiles.css.length);
                setEditorContentFromUpload('css', currentIndices.css);
            }
            if (uploadedFiles.js.length) {
                currentIndices.js = Math.floor(Math.random() * uploadedFiles.js.length);
                setEditorContentFromUpload('js', currentIndices.js);
            }
            updatePreview();
        });

        // ---------- Editor Actions (Copy, Undo, Redo, Go to line, Search) ----------
        document.querySelectorAll('.editor-tab').forEach(container => {
            const editor = container.id === 'html-editor-container' ? htmlEditor :
                          container.id === 'css-editor-container' ? cssEditor :
                          container.id === 'js-editor-container' ? jsEditor : null;
            if (!editor) return;

            container.querySelector('.copy-btn')?.addEventListener('click', () => {
                navigator.clipboard.writeText(editor.getValue()).then(() => alert('Copied'));
            });
            container.querySelector('.undo-btn')?.addEventListener('click', () => editor.undo());
            container.querySelector('.redo-btn')?.addEventListener('click', () => editor.redo());
            const gotoInput = container.querySelector('.goto-line');
            if (gotoInput) {
                gotoInput.addEventListener('change', () => {
                    const line = parseInt(gotoInput.value, 10);
                    if (!isNaN(line) && line > 0) editor.gotoLine(line);
                });
            }
            const searchInput = container.querySelector('.search-input');
            if (searchInput) {
                let timer;
                searchInput.addEventListener('input', () => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        const query = searchInput.value;
                        if (query) editor.find(query, { wrap: true });
                    }, 300);
                });
            }
        });

        // Global undo/redo
        document.getElementById('globalUndo')?.addEventListener('click', () => activeEditor?.undo());
        document.getElementById('globalRedo')?.addEventListener('click', () => activeEditor?.redo());

        // ---------- Google Search ----------
        document.getElementById('googleSearch')?.addEventListener('click', () => {
            const input = document.getElementById('googleQuery');
            let query = input.value.trim();
            if (!query && activeEditor) query = activeEditor.getSelectedText();
            if (query) window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            else alert('Enter a query or select text');
        });

        // ---------- Download / Split ----------
        document.getElementById('downloadCurrent')?.addEventListener('click', () => {
            if (!activeEditor) return;
            const content = activeEditor.getValue();
            const ext = activeEditor === htmlEditor ? 'html' : activeEditor === cssEditor ? 'css' : 'js';
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `download.${ext}`;
            a.click();
            URL.revokeObjectURL(url);
        });

        document.getElementById('splitFile')?.addEventListener('click', () => {
            if (!activeEditor || typeof JSZip === 'undefined') return;
            const content = activeEditor.getValue();
            const lines = content.split('\n');
            const chunkSize = 50;
            const zip = new JSZip();
            for (let i = 0; i < lines.length; i += chunkSize) {
                zip.file(`chunk_${Math.floor(i/chunkSize)+1}.txt`, lines.slice(i, i+chunkSize).join('\n'));
            }
            zip.generateAsync({ type: 'blob' }).then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'chunks.zip';
                a.click();
                URL.revokeObjectURL(url);
            });
        });

        document.getElementById('downloadAll')?.addEventListener('click', () => {
            if (typeof JSZip === 'undefined') return;
            const zip = new JSZip();
            if (htmlEditor) zip.file('index.html', htmlEditor.getValue());
            if (cssEditor) zip.file('style.css', cssEditor.getValue());
            if (jsEditor) zip.file('script.js', jsEditor.getValue());
            zip.generateAsync({ type: 'blob' }).then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'project.zip';
                a.click();
                URL.revokeObjectURL(url);
            });
        });

        // ---------- Go to Top/Bottom ----------
        function scrollEditorTo(editor, position) {
            if (!editor) return;
            const lineCount = editor.session.getLength();
            editor.gotoLine(position === 'top' ? 1 : lineCount);
        }

        document.querySelector('.go-top')?.addEventListener('click', () => scrollEditorTo(activeEditor, 'top'));
        document.querySelector('.go-bottom')?.addEventListener('click', () => scrollEditorTo(activeEditor, 'bottom'));
        document.querySelector('.editor-top')?.addEventListener('click', () => scrollEditorTo(activeEditor, 'top'));
        document.querySelector('.editor-bottom')?.addEventListener('click', () => scrollEditorTo(activeEditor, 'bottom'));
        document.querySelector('.preview-top')?.addEventListener('click', () => {
            document.querySelector('.right-preview').scrollTop = 0;
        });
        document.querySelector('.preview-bottom')?.addEventListener('click', () => {
            const p = document.querySelector('.right-preview');
            p.scrollTop = p.scrollHeight;
        });

        // ---------- Settings Panel Collapse ----------
        const settingsPanel = document.getElementById('settingsPanel');
        const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
        const closeSettingsBtn = document.getElementById('closeSettingsBtn');

        function openSettings() { settingsPanel.classList.remove('collapsed'); }
        function closeSettings() { settingsPanel.classList.add('collapsed'); }

        toggleSettingsBtn?.addEventListener('click', () => {
            if (settingsPanel.classList.contains('collapsed')) openSettings();
            else closeSettings();
        });
        closeSettingsBtn?.addEventListener('click', closeSettings);

        // Preview panel collapse
        const previewPanel = document.getElementById('previewPanel');
        const togglePreviewBtn = document.getElementById('togglePreviewBtn');
        togglePreviewBtn?.addEventListener('click', () => {
            previewPanel.classList.toggle('collapsed');
            setTimeout(() => {
                Object.values(editors).forEach(ed => ed?.resize());
            }, 300);
        });

        // ---------- Settings Controls ----------
        // Theme
        const themeSelect = document.getElementById('themeSelect');
        const savedTheme = localStorage.getItem('styles-theme') || 'dracula';
        themeSelect.value = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);
        function applyTheme(theme) {
            const aceTheme = theme === 'dracula' ? 'ace/theme/dracula' :
                            theme === 'chrome' ? 'ace/theme/chrome' : 'ace/theme/monokai';
            Object.values(editors).forEach(ed => ed?.setTheme(aceTheme));
        }
        applyTheme(savedTheme.toLowerCase());
        themeSelect.addEventListener('change', () => {
            const theme = themeSelect.value.toLowerCase();
            localStorage.setItem('styles-theme', theme);
            applyTheme(theme);
        });

        // Font size (zoom)
        const zoomRange = document.getElementById('zoomRange');
        const savedSize = localStorage.getItem('styles-fontsize') || '100';
        zoomRange.value = savedSize;
        function applyFontSize(percent) {
            const newSize = Math.round(14 * percent / 100);
            Object.values(editors).forEach(ed => ed?.setFontSize(newSize + 'px'));
        }
        applyFontSize(parseInt(savedSize));
        zoomRange.addEventListener('input', () => {
            localStorage.setItem('styles-fontsize', zoomRange.value);
            applyFontSize(parseInt(zoomRange.value));
        });

        // Hyperscroll
        const hyperscrollCheck = document.getElementById('hyperscrollCheck');
        const savedScroll = localStorage.getItem('styles-hyperscroll') === 'true';
        hyperscrollCheck.checked = savedScroll;
        function applyScroll(enabled) {
            const speed = enabled ? 12 : 1;
            Object.values(editors).forEach(ed => ed?.setOption('mouseWheelScrollSpeed', speed));
            document.getElementById('hyperStat').innerHTML = `<i class="fas fa-tachometer-alt"></i> hyper mode: ${enabled ? 'on' : 'off'}`;
        }
        applyScroll(savedScroll);
        hyperscrollCheck.addEventListener('change', () => {
            localStorage.setItem('styles-hyperscroll', hyperscrollCheck.checked);
            applyScroll(hyperscrollCheck.checked);
        });

        // Word wrap
        const wordWrapCheck = document.getElementById('wordWrapCheck');
        const savedWrap = localStorage.getItem('styles-wordwrap') === 'true';
        wordWrapCheck.checked = savedWrap;
        function applyWrap(enabled) {
            Object.values(editors).forEach(ed => ed?.session.setUseWrapMode(enabled));
        }
        applyWrap(savedWrap);
        wordWrapCheck.addEventListener('change', () => {
            localStorage.setItem('styles-wordwrap', wordWrapCheck.checked);
            applyWrap(wordWrapCheck.checked);
        });

        // Auto-refresh
        const autoRefreshCheck = document.getElementById('autoRefreshCheck');
        const savedAuto = localStorage.getItem('styles-autorefresh') === 'true';
        autoRefreshCheck.checked = savedAuto;

        // Save settings
        document.getElementById('saveSettings')?.addEventListener('click', () => {
            localStorage.setItem('styles-autorefresh', autoRefreshCheck.checked);
            alert('Settings saved');
        });

        // Reset settings
        document.getElementById('resetSettings')?.addEventListener('click', () => {
            localStorage.clear();
            location.reload();
        });

        // ---------- Footer Actions ----------
        document.getElementById('copyAllBtn')?.addEventListener('click', () => {
            const content = [
                '// index.html', htmlEditor?.getValue() || '',
                '// style.css', cssEditor?.getValue() || '',
                '// script.js', jsEditor?.getValue() || ''
            ].join('\n');
            navigator.clipboard.writeText(content).then(() => alert('Copied all files'));
        });

        document.getElementById('searchFilesBtn')?.addEventListener('click', () => {
            const query = prompt('Search for:');
            if (!query) return;
            const results = [];
            if (htmlEditor?.getValue().includes(query)) results.push('index.html');
            if (cssEditor?.getValue().includes(query)) results.push('style.css');
            if (jsEditor?.getValue().includes(query)) results.push('script.js');
            alert(results.length ? `Found in: ${results.join(', ')}` : 'Not found');
        });

        document.getElementById('footerTop')?.addEventListener('click', () => {
            document.querySelector('.main-dashboard').scrollTop = 0;
        });
        document.getElementById('footerBottom')?.addEventListener('click', () => {
            const container = document.querySelector('.main-dashboard');
            container.scrollTop = container.scrollHeight;
        });

        // ---------- Resize Handler ----------
        window.addEventListener('resize', () => {
            Object.values(editors).forEach(ed => ed?.resize());
        });

        // ---------- Initial Preview & Stats ----------
        updatePreview();
        updateFileStats();
    }
})();
