// Your code here.
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelector('.items');
    const cubes = document.querySelectorAll('.item');
    let selectedCube = null;
    let offsetX = 0;
    let offsetY = 0;

    cubes.forEach(cube => {
        cube.addEventListener('mousedown', (event) => {
            selectedCube = cube;
            const rect = cube.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
            cube.style.position = 'absolute';
            cube.style.zIndex = 1000;
            document.body.append(cube);
            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                cube.style.left = pageX - offsetX + 'px';
                cube.style.top = pageY - offsetY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            cube.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                selectedCube = null;
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
            });
        });
    });
});
