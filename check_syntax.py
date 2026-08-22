with open('js/app.js', encoding='utf-8') as f:
    app_js = f.read()

mod3_start = app_js.find('function renderModule3(container) {')
mod4_start = app_js.find('function renderModule4(container) {')

with open('tmp2.txt', 'w', encoding='utf-8') as f:
    f.write(app_js[mod3_start:mod4_start])
