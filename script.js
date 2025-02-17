document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelector('.items');
    const cubes = document.querySelectorAll('.item');
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Handling scrolling within the items container
    items.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.pageX - items.offsetLeft;
        scrollLeft = items.scrollLeft;
        items.classList.add('active');
    });

    items.addEventListener('mouseleave', () => {
        isDragging = false;
        items.classList.remove('active');
    });

    items.addEventListener('mouseup', () => {
        isDragging = false;
        items.classList.remove('active');
    });

    items.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.pageX - items.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed as needed
        items.scrollLeft = scrollLeft - walk;
    });

    // Handling drag and drop for individual cubes
    cubes.forEach(cube => {
        cube.addEventListener('mousedown', (event) => {
            event.stopPropagation();
            const shiftX = event.clientX - cube.getBoundingClientRect().left;
            const shiftY = event.clientY - cube.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                cube.style.left = pageX - shiftX + 'px';
                cube.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                cube.onmouseup = null;

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
            }, { once: true });
        });

        cube.ondragstart = () => {
            return false;
        };
    });
});
