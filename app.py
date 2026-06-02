@app.route('/test')
def index():
    return render_template('test/index.html')

@app.route('/step3')
def step3():
    return render_template('base/step3/index.html')

@app.route('/step10')
def step10():
    return render_template('base/step10/index.html')

@app.route('/summary/step3')
def summary_step3():
    return render_template('summary/step3/index.html')

@app.route('/summary/step10')
def summary_step10():
    return render_template('summary/step10/index.html')

@app.route('/karte/step3')
def karte_step3():
    return render_template('karte/step3/index.html')

@app.route('/karte/step10')
def karte_step10():
    return render_template('karte/step10/index.html')
