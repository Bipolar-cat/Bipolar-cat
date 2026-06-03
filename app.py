from flask import Flask, render_template

app = Flask(__name__)

# --- Karteのルート ---
@app.route('/karte/step3')
def karte_step3():
    return render_template('karte/step3/index.html')

@app.route('/karte/step10')
def karte_step10():
    return render_template('karte/step10/index.html')

# --- Summaryのルート ---
@app.route('/summary/step3')
def summary_step3():
    return render_template('summary/step3/index.html')

@app.route('/summary/step10')
def summary_step10():
    return render_template('summary/step10/index.html')

# --- Baseのルート ---
@app.route('/base/step3')
def base_step3():
    return render_template('base/step3/index.html')

@app.route('/base/step10')
def base_step10():
    return render_template('base/step10/index.html')

# --- Testのルート ---
@app.route('/test')
def test():
    return render_template('test/index.html')

if __name__ == '__main__':
    app.run()
