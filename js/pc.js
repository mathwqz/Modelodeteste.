const zoomImg = document.getElementById('zoom-img');
const lens = document.getElementById('zoom-lente');
const cx = 2; // zoom nível
zoomImg.addEventListener('mousemove', moveLens);
zoomImg.addEventListener('mouseenter', () => lens.style.visibility = 'visible');
zoomImg.addEventListener('mouseleave', () => lens.style.visibility = 'hidden');

function moveLens(e) {
  const rect = zoomImg.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  const lensSize = lens.offsetWidth / 2;
  x = Math.max(lensSize, Math.min(x, zoomImg.width - lensSize));
  y = Math.max(lensSize, Math.min(y, zoomImg.height - lensSize));

  lens.style.left = (x - lensSize) + 'px';
  lens.style.top = (y - lensSize) + 'px';
  lens.style.backgroundImage = `url('${zoomImg.src}')`;
  lens.style.backgroundSize = `${zoomImg.width * cx}px ${zoomImg.height * cx}px`;
  lens.style.backgroundPosition = `-${(x * cx) - lensSize}px -${(y * cx) - lensSize}px`;
}

document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    zoomImg.src = thumb.dataset.large;
  });
});
// apague essa merda dps