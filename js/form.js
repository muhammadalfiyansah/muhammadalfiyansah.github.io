/**
 * form.js — Contact form submission handler
 */

export function initContactForm() {
  const form = document.forms['contact-form'];
  if (!form) return;

  const btnSubmit = document.getElementById('btn-submit');
  const btnLoading = document.getElementById('btn-loading');
  const alertSuccess = document.getElementById('alert-success');
  const btnClose = document.getElementById('alert-close');

  /**
   * Toggle loading state on submit button
   * @param {boolean} isLoading
   */
  function setLoading(isLoading) {
    btnSubmit.style.display = isLoading ? 'none' : 'block';
    btnLoading.style.display = isLoading ? 'block' : 'none';
  }

  /**
   * Show/hide success alert
   * @param {boolean} visible
   */
  function setSuccessVisible(visible) {
    alertSuccess.classList.toggle('visible', visible);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();

    // Validate required fields
    if (!name || !email || !subject || !message) return;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Format email tidak valid. Silakan periksa kembali.');
      return;
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 2000) {
      alert('Input terlalu panjang. Silakan persingkat pesan Anda.');
      return;
    }

    const body = `Halo, saya ${name}\n\n📧 Email: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:alfiyansah.ys@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSuccessVisible(true);
    form.reset();
  });

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      setSuccessVisible(false);
      form.reset();
    });
  }
}
