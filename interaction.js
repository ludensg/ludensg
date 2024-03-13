document.addEventListener('DOMContentLoaded', function() {
    // Setup event listeners for opening content
    const buttons = ['artist-statement-btn', 'portfolio-btn', 'coverage-btn', 'contact-btn'];
    buttons.forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', function() {
            const containerId = btnId.replace('-btn', '-container');
            isMobile() ? showContentMobile(containerId) : showContentDesktop(containerId);
        });
    });

    // Setup event listeners for the "Back" button in each content container
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', isMobile() ? resetViewMobile : resetViewDesktop);
    });
});


function isMobile() {
    return window.innerWidth <= 768;
}

function showContentDesktop(containerId) {
    const heroText = document.getElementById('hero-text');
    const mainbuttons = document.getElementById('mainbuttons');

    adjustElementDesktop(heroText, 'translateY(-40%) scale(0.5)', 'rgba(231, 216, 182, 0.685)');
    adjustElementDesktop(mainbuttons, 'scale(1.4)', '-20px', 'rgba(199, 175, 124, 0.514)');

    displayContent(containerId, 'translateY(-135%)');
}

function showContentMobile(containerId) {
    // Example mobile adjustments, adjust these as necessary
    adjustElementMobile('hero-text', 'translateY(-27%) scale(1)');
    adjustElementMobile('mainbuttons', 'scale(1)', '0px', 'rgba(131, 116, 83, 0.247)');

    displayContent(containerId, 'translateY(-195%)');
}

function resetViewDesktop() {
    resetViewCommon('translateY(0) scale(1)', 'scale(1)', '-10px', 'rgba(131, 116, 83, 0.247)');
}

function resetViewMobile() {
    resetViewCommon('translateY(0%) scale(1)', 'scale(1)', '0px', 'rgba(131, 116, 83, 0.247)');
}

function adjustElementDesktop(element, transform, marginTop = null, backgroundColor = null) {
    if (element) {
        smoothTransform(element, transform);
        if (marginTop !== null) element.style.marginTop = marginTop;
        if (backgroundColor !== null) element.style.backgroundColor = backgroundColor;
    }
}

function adjustElementMobile(elementId, transform, marginTop = null, backgroundColor = null) {
    const element = document.getElementById(elementId);
    adjustElementDesktop(element, transform, marginTop, backgroundColor);
}

function displayContent(containerId, transform) {
    // Hide any previously shown content
    document.querySelectorAll('.content-container').forEach(container => {
        container.classList.remove('active');
        container.style.display = 'none';
    });

    // Show the selected content
    const contentContainer = document.getElementById(containerId);
    if (contentContainer) {
        contentContainer.style.display = 'block';
        smoothTransform(contentContainer, transform);
        setTimeout(() => contentContainer.classList.add('active'), 10);
    }
}

function resetViewCommon(heroTransform, buttonsTransform, buttonsMarginTop, buttonsBackgroundColor) {
    adjustElementDesktop(document.getElementById('hero-text'), heroTransform);
    adjustElementDesktop(document.getElementById('mainbuttons'), buttonsTransform, buttonsMarginTop, buttonsBackgroundColor);

    // Hide content containers
    document.querySelectorAll('.content-container').forEach(container => {
        container.classList.remove('active');
        smoothTransform(container, 'translateY(0%)');
        setTimeout(() => container.style.display = 'none', 500);
    });
}

function smoothTransform(element, transform) {
    if (element) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                element.style.transform = transform;
            });
        });
    }
}
