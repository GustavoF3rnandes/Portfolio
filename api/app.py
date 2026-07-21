from flask import Flask, render_template, redirect, request, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, static_url_path="")
app.secret_key = os.getenv("SECRET_KEY", "moraiscode")

mail_settings = {
    "MAIL_SERVER": "smtp.gmail.com",
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.getenv("EMAIL"),
    "MAIL_PASSWORD": os.getenv("SENHA"),
}

app.config.update(mail_settings)
mail = Mail(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/send", methods=["POST"])
def send():
    nome = request.form.get("nome", "").strip()
    email = request.form.get("email", "").strip()
    mensagem = request.form.get("mensagem", "").strip()

    if not nome or not email or not mensagem:
        flash("Por favor, preencha todos os campos.")
        return redirect("/")

    try:
        msg = Message(
            subject=f"{nome} te enviou uma mensagem no portfólio",
            sender=app.config.get("MAIL_USERNAME"),
            recipients=["gustavof3rnandes@outlook.com", app.config.get("MAIL_USERNAME")],
            body=f"{nome} ({email}) enviou:\n\n{mensagem}",
        )
        mail.send(msg)
        flash("Mensagem enviada com sucesso!")
    except Exception:
        flash("Erro ao enviar mensagem. Tente novamente mais tarde.")

    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
