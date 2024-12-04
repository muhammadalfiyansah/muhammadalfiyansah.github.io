/**TOGGLE NAV */
const hamBurger = document.querySelector('.hamberger');
const nav = document.querySelector('.nav');

hamBurger.addEventListener('click', function () {
    nav.classList.toggle('active');
});

/**CERTIFICATE PAGE */
document.addEventListener('DOMContentLoaded', function () {
    var certificatePage = document.getElementById('certificate-page');

    certificatePage.addEventListener('click', function () {
        window.location.href = 'certificate.html';
    });
});

/**FORM */
const scriptURL = 'https://script.google.com/macros/s/AKfycbx5YV1swwjqTMTER_sqnmuU3HjXr98Dc4qrf8HEVkakc3jbZYiMECIkDGFLelCq7NA/exec';
const form = document.forms['data-base-form-portfolio'];
const btnSend = document.getElementById("btn-send");
const btnSendLoading = document.getElementById("btn-send-loading");
const alertsSuccess = document.getElementById("alerts-success");
const closeButton = document.getElementById("close-button");

function showLoading() {
    btnSend.style.display = 'none';
    btnSendLoading.style.display = 'block';
}

function hideLoading() {
    btnSend.style.display = 'block';
    btnSendLoading.style.display = 'none';
}

function showSuccess() {
    alertsSuccess.style.display = 'block';
    alertsSuccess.style.display = 'flex';
}

function hideSuccess() {
    alertsSuccess.style.display = 'none';
}

function resetForm() {
    form.reset();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    showLoading();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            hideLoading();
            showSuccess();
        })
        .catch(error => {
            console.error('Error!', error.message);
            hideLoading();
        });
});

closeButton.addEventListener('click', function () {
    hideSuccess();
    resetForm();
});

/**SCROLL SECTION ACTIVE*/
const boxes = document.querySelectorAll('.home-img');
const options = {
    threshold: 0.5
};

const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animation-img');
            observer.unobserve(entry.target);
        }
    });
}, options);

boxes.forEach(box => {
    intersectionObserver.observe(box);
});


/**SCROLL SECTION LINE*/
const skillsSection = document.getElementById('skills-section');
const line = document.querySelectorAll('.line');

function showProgress() {
    line.forEach(line => {
        const value = line.dataset.progress;
        line.style.opacity = 1;
        line.style.width = `${value}%`;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos) {
        showProgress();
    }

})
















