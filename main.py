from flask import Flask, request, render_template, redirect, session, jsonify
import csv

app = Flask(__name__)
app.secret_key = "uabfakjbeak"

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        with open('account_database.csv', 'r') as csv_file:
            reader = csv.reader(csv_file, delimiter=',')
            for row in reader:
                if len(row) < 3:
                    continue
                else:
                    stored_username, stored_password, stored_email = row
                    if stored_username == username and stored_password == password:
                        session["logged_in"] = True
                        session["username"] = username
                        return redirect('/home')
                    else:
                        continue
            return "error: Invalid username or password", 400
    return render_template('index.html')

@app.route("/home", methods=['GET', 'POST'])
def home():
    if not session.get("logged_in"):
        return redirect('/')
    return render_template("home.html", username=session.get("username"))

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')
        with open('account_database.csv', 'r') as csv_file:
            reader = csv.reader(csv_file, delimiter=',')
            for row in reader:
                if len(row) < 3:
                    continue
                stored_username, stored_password, stored_email = row
                if stored_username == username:
                    return "Error: Username already exists!", 400
                if stored_email == email:
                    return "Error: Email already registered!", 400
        with open('account_database.csv', 'a') as csv_file:
            a = csv.writer(csv_file , delimiter=',')
            data = [username, password, email]
            a.writerow(data)
        csv_file.close()
        return redirect('/')

    return render_template('signup.html')

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/leaderboard")
def leaderboard():
    if not session.get("logged_in"):
        return redirect('/')
    return render_template('leaderboard.html')

@app.route("/reels")
def reels():
    if not session.get("logged_in"):
        return redirect('/')
    return render_template('reels.html')

@app.route("/support")
def support():
    if not session.get("logged_in"):
        return redirect('/')
    return render_template('support.html')

if __name__ == '__main__':
    app.run(debug=True)