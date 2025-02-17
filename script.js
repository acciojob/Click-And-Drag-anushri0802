document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelector('.items');
    const cubes = document.querySelectorAll('.item');
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    items.addEventListener('mousedown', (event) => {
        if (!event.target.classList.contains('item')) return;

        isDragging = true;
        startX = event.pageX - items.offsetLeft;
        scrollLeft = items.scrollLeft;
        event.target.style.cursor = 'grabbing';
    });

    items.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    items.addEventListener('mouseup', () => {
        isDragging = false;
    });

    items.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        event.preventDefault();
        const x = event.pageX - items.offsetLeft;
        const walk = (x - startX) * 3; // Adjust scroll speed as needed
        items.scrollLeft = scrollLeft - walk;
    });

    cubes.forEach(cube => {
        cube.addEventListener('mousedown', (event) => {
            cube.style.position = 'absolute';
            cube.style.zIndex = 1000;
            let shiftX = event.clientX - cube.getBoundingClientRect().left;
            let shiftY = event.clientY - cube.getBoundingClientRect().top;

            document.body.append(cube);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                cube.style.left = pageX - shiftX + 'px';
                cube.style.top = pageY - shiftY + 'px';

                // Boundary constraints
                const itemsRect = items.getBoundingClientRect();
                const cubeRect = cube.getBoundingClientRect();

                if (cubeRect.left < itemsRect.left) {
                    cube.style.left = itemsRect.left + 'px';
                }
                if (cubeRect.top < itemsRect.top) {
                    cube.style.top = itemsRect.top + 'px';
                }
                if (cubeRect.right > itemsRect.right) {
                    cube.style.left = itemsRect.right - cubeRect.width + 'px';
                }
                if (cubeRect.bottom > itemsRect.bottom) {
                    cube.style.top = itemsRect.bottom - cubeRect.height + 'px';
                }
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            cube.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                cube.onmouseup = null;
            };
        });
    });
});
