let giris_mail = document.querySelector("#giris_mail");
let giris_sifre = document.querySelector("#giris_sifre");

let kayit_mail = document.querySelector("#kayit_mail");
let kayit_sifre = document.querySelector("#kayit_sifre");

let kayit_btn = document.querySelector("#kayit_btn");
let giris_btn = document.querySelector("#giris_btn");


class LogAndSing {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }
    kayit_post(url, data) {

        this.xhr.open("POST", url); //Bağlantı açık
        this.xhr.setRequestHeader("Content-type", "application/json");
        let mail_hata = document.querySelector("span.kayit_mail_error");
        let sifre_hata = document.querySelector("span.kayit_password_error");
        let true_message = document.querySelector("span.kayit_true_message");
        mail_hata.textContent = "";
        sifre_hata.textContent = "";
        true_message.textContent = "";

        this.xhr.onload = function () {
            console.log(this.status);
            if (this.status === 200) {
                true_message.textContent = "Kayıt başarıyla oluşturuldu - Giriş Yapabilirsiniz";
            }
            if (this.status === 400) {
                let errorMessage = JSON.parse(this.responseText);
                console.log(errorMessage);
                if (errorMessage.error.message == "INVALID_EMAIL") {
                    console.log("Geçersiz E-Posta"); // İsteğimiz Bitti
                    mail_hata.textContent = "Geçersiz e-mail !";
                }
                else if (errorMessage.error.message == "EMAIL_EXISTS") {
                    mail_hata.textContent = "Bu e-mail zaten kayıtlı !";
                }
                else if (errorMessage.error.message == "MISSING_PASSWORD") {
                    sifre_hata.textContent = "Geçersiz şifre !";
                }
                else if (errorMessage.error.message == "WEAK_PASSWORD : Password should be at least 6 characters") {
                    sifre_hata.textContent = "Şifreniz en az 6 karakterli olmalıdır !";
                }


            }
        }

        this.xhr.send(JSON.stringify(data));


    }
    giris_post(url, data) {

        this.xhr.open("POST", url); //Bağlantı açık
        this.xhr.setRequestHeader("Content-type", "application/json");
        let mail_hata = document.querySelector("span.giris_mail_error");
        let sifre_hata = document.querySelector("span.giris_password_error");
        let true_message = document.querySelector("span.giris_true_message");
        mail_hata.textContent = "";
        sifre_hata.textContent = "";
        true_message.textContent = "";

        this.xhr.onload = function () {
            console.log(this.status);
            if (this.status === 200) {
                true_message.textContent = "Giriş Başarılı";
            }
            if (this.status === 400) {
                let errorMessage = JSON.parse(this.responseText);
                console.log(errorMessage);
                if (errorMessage.error.message == "INVALID_EMAIL") {
                    console.log("Geçersiz E-Posta"); // İsteğimiz Bitti
                    mail_hata.textContent = "Geçersiz e-mail !";
                }
                else if (errorMessage.error.message == "INVALID_PASSWORD") {
                    sifre_hata.textContent = "Geçersiz veya Hatalı şifre !";
                }
                else if (errorMessage.error.message == "MISSING_PASSWORD") {
                    sifre_hata.textContent = "Geçersiz şifre !";
                }
                else if (errorMessage.error.message == "WEAK_PASSWORD : Password should be at least 6 characters") {
                    sifre_hata.textContent = "Şifreniz en az 6 karakterli olmalıdır !";
                }


            }
        }

        this.xhr.send(JSON.stringify(data));


    }
}


const request = new LogAndSing();


kayit_btn.addEventListener("click", function (e) {
    console.log(kayit_mail.value);
    console.log(kayit_sifre.value);
    request.kayit_post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcfNJ8B0NSZwlXDgfNr9u28Iub4ixKvm4", { email: "" + kayit_mail.value + "", password: "" + kayit_sifre.value + "", returnSecureToken: "true" });
    e.preventDefault();
})

giris_btn.addEventListener("click", function (e) {
    console.log("girişe basıldı");
    request.giris_post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcfNJ8B0NSZwlXDgfNr9u28Iub4ixKvm4", { email: "" + giris_mail.value + "", password: "" + giris_sifre.value + "", returnSecureToken: "true" });
    e.preventDefault();
})



function giris_show_pas() {
    var x = document.getElementById("giris_sifre");
    let i = document.querySelector("i.giris_show_pas");
    if (x.type === "password") {
        x.type = "text";
        i.classList = "giris_show_pas uil uil-eye";
    } else {
        x.type = "password";
        i.classList = "giris_show_pas uil uil-eye-slash";
    }
}
function kayit_show_pas() {
    var x = document.getElementById("kayit_sifre");
    let i = document.querySelector("i.kayit_show_pas");
    if (x.type === "password") {
        x.type = "text";
        i.classList = "kayit_show_pas uil uil-eye";
    } else {
        x.type = "password";
        i.classList = "kayit_show_pas uil uil-eye-slash";
    }
}