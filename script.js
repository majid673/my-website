document.addEventListener("DOMContentLoaded", function() {
    // مقداردهی اولیه EmailJS
    emailjs.init("mGh1cV_dHM_ryWFnG");

    // تابع نمایش پیام
    const showMessage = (element, message, color, duration = 3000) => {
        element.style.display = "block";
        element.style.color = color;
        element.textContent = message;
        setTimeout(() => element.style.display = "none", duration);
            // افکت لود تدریجی برای تصاویر پروژه‌ها
    const projectImages = document.querySelectorAll(".portfolio .project img");
    projectImages.forEach(img => {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });
        // اگه تصویر از قبل لود شده باشه
        if (img.complete) {
            img.classList.add("loaded");
        }
    });
    };

    // انیمیشن ورود هدر
    const header = document.querySelector("header");
    header.style.opacity = "0";
    header.style.transition = "opacity 1s ease";
    setTimeout(() => {
        header.style.opacity = "1";
    }, 100);

    // اسکرول نرم برای لینک‌های منو
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // انیمیشن اسکرول برای بخش‌ها
    const sections = document.querySelectorAll("section");
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(section);
    });

    // فرم تماس پویا با چک زنده ایمیل
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const validDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInput.addEventListener("input", function() {
        const email = emailInput.value;
        if (!email) {
            emailError.style.display = "none";
            return;
        }

        if (!emailPattern.test(email)) {
            showMessage(emailError, "Please enter a valid email (e.g., name@domain.com).", "#ff0000");
        } else {
            const domain = email.split("@")[1];
            if (!validDomains.includes(domain)) {
                showMessage(emailError, `Only ${validDomains.join(", ")} are supported.`, "#ff0000");
            } else {
                emailError.style.display = "none";
            }
        }
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = emailInput.value;
        const message = document.getElementById("message").value;
        const domain = email.split("@")[1];

        if (!emailPattern.test(email) || !validDomains.includes(domain)) {
            showMessage(formMessage, "Please fix the email error before submitting.", "#ff0000");
            return;
        }

        emailjs.send("service_r4dhlo5", "template_ncq4lad", {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "arashar905@gmail.com"
        })
        .then(response => {
            console.log("Email sent successfully:", response);
            showMessage(formMessage, `Thank you, ${name}! Your message has been sent.`, "#007bff");
            form.reset();
        })
        .catch(error => {
            console.log("Failed to send email:", error);
            showMessage(formMessage, "Failed to send message. Try again.", "#ff0000");
        });
    });
});