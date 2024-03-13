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

function isMobileLandscape() {
    // This will return true if the device is in landscape mode
    return window.matchMedia("(orientation: landscape)").matches && window.innerWidth > window.innerHeight;
}  
  

function showContentDesktop(containerId) {
    const heroText = document.getElementById('hero-text');
    const mainbuttons = document.getElementById('mainbuttons');

    adjustElementDesktop(heroText, 'translateY(-40%) scale(0.5)', 'rgba(231, 216, 182, 0.685)');
    adjustElementDesktop(mainbuttons, 'scale(1.4)', '-20px', 'rgba(199, 175, 124, 0.514)');
    displayContent(containerId, 'translateY(-135%)');
}

function showContentMobile(containerId) {
    if (window.matchMedia("(orientation: landscape)").matches) {
        adjustElementMobile('hero-text', 'translateY(-20%) scale(1)');
        adjustElementMobile('mainbuttons', 'scale(1)', '0px', 'rgba(131, 116, 83, 0.247)');

        displayContent(containerId, 'translateY(-400%)');
    }
    else {
        adjustElementMobile('hero-text', 'translateY(-27%) scale(1)');
        adjustElementMobile('mainbuttons', 'scale(1)', '0px', 'rgba(131, 116, 83, 0.247)');

        displayContent(containerId, 'translateY(-150%)');
    }

    enableScrolling();
}

function resetViewDesktop() {
    resetViewCommon('translateY(0) scale(1)', 'scale(1)', '-10px', 'rgba(131, 116, 83, 0.247)');
    disableScrolling();
}

function resetViewMobile() {
    resetViewCommon('translateY(0%) scale(1)', 'scale(1)', '0px', 'rgba(131, 116, 83, 0.247)');
    disableScrolling();
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




function disableScrolling(){
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed'; // Lock the body's position
    document.body.style.width = '100%'; // Prevent width from being inadvertently set to less than the viewport width
}

function enableScrolling(){
    document.body.removeEventListener('touchmove', preventDefault, { passive: false });
    document.body.style.overflow = '';
    document.body.style.position = '';
}

function preventDefault(e){
    e.preventDefault();
}

// Call this function to disable scrolling
disableScrolling();

// Call this function to enable scrolling
// enableScrolling();
