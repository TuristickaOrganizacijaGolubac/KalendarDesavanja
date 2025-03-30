$(document).ready(function() {
    var flipbook = $('#flipbook');
    var width = Math.min(1000, $(window).width() * 0.9);
    var height = width;

    flipbook.turn({
        width: width,
        height: height,
        autoCenter: true,
        gradients: true, // Omogućava gradijente (curl efekat)
        elevation: 50, // Podešava dubinu curl efekta
        pages: 19,
        display: 'single',
        when: {
            turned: function(e, page) {
                console.log('Trenutna stranica: ' + page);
            }
        }
    });

    // Dodavanje interaktivnog okretanja stranica
    var isDragging = false;
    var startX = 0;

    flipbook.on('mousedown touchstart', '.page', function(e) {
        isDragging = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        e.preventDefault(); // Sprečava selekciju teksta
    });

    $(document).on('mousemove touchmove', function(e) {
        if (!isDragging) return;
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        var diff = startX - x;

        if (diff > 50) {
            flipbook.turn('next');
            isDragging = false;
        } else if (diff < -50) {
            flipbook.turn('previous');
            isDragging = false;
        }
    });

    $(document).on('mouseup touchend', function() {
        isDragging = false;
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 37) {
            flipbook.turn('previous');
        } else if (e.keyCode == 39) {
            flipbook.turn('next');
        }
    });

    $(window).resize(function() {
        var width = Math.min(1000, $(window).width() * 0.9);
        var height = width;
        flipbook.turn('size', width, height);
        flipbook.turn('resize');
    });
});
