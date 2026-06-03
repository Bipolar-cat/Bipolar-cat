@app.route("/test")
def test():
    return render_template("test/index.html")
