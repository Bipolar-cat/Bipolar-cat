from flask import Flask, render_template
app = Flask(__name__, template_folder='base')

@app.route('/')
def index():
    return render_template('step3/index.html')

if __name__ == '__main__':
    app.run()
