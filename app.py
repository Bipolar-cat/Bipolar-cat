@app.route('/')
def index():
    # 'templates' フォルダの中の index.html を探す
    return render_template('index.html') 
