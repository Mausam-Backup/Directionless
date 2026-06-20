(function () {
  const WEBHOOK_URL =
    "https://discord.com/api/webhooks/1517830185465024644/mWu7F83N-P76gVl43XselYFrE9TYCM8T1c8svsTZhnJPK2lj9MH40R3uGcJgrGcwvfUY";

  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = "Please fill out all fields.";
      status.className = "contact-status sg-text-body-mini error";
      return;
    }

    status.textContent = "Sending...";
    status.className = "contact-status sg-text-body-mini";

    const payload = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x514cf5,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Subject", value: subject, inline: false },
            { name: "Message", value: message, inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Directionless Contact Form" },
        },
      ],
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      status.textContent = "Message sent successfully. We'll get back to you soon.";
      status.className = "contact-status sg-text-body-mini success";
      form.reset();
    } catch {
      status.textContent = "Something went wrong. Please try again later.";
      status.className = "contact-status sg-text-body-mini error";
    }
  });
})();
