const buttons = document.querySelectorAll('.trigger[data-mimodal-trigger]');

for(let button of buttons) {
	mimodalEvent(button);
}

function mimodalEvent(button) {
	button.addEventListener('click', () => {
		const trigger = "trigger-1";
		const mimodal = document.querySelector(`[data-mimodal=${trigger}]`);
		console.log(mimodal);
		const contentWrapper = mimodal.querySelector('.content-wrapper');
		console.log(contentWrapper);
		const close = mimodal.querySelector('.close');
		console.log(close);

		close.addEventListener('click', () => mimodal.classList.remove('open'));
		mimodal.addEventListener('click', () => mimodal.classList.remove('open'));
		contentWrapper.addEventListener('click', (e) => e.stopPropagation());

		mimodal.classList.toggle('open');
	});
}
