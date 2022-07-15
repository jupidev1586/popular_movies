const modalBodyEl = document.createElement('div');

const createModal = () => {
  const modalEl = document.createElement('div');
  modalEl.className = 'modal';
  document.body.append(modalEl);
  
  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'modal-wrapper';
  modalEl.append(modalWrapper);

  const modalOverlayEl = document.createElement('div');
  modalOverlayEl.className = 'modal-overlay';
  modalWrapper.appendChild(modalOverlayEl);

  const modalContentEl = document.createElement('div');
  modalContentEl.className = 'modal-content';
  modalWrapper.appendChild(modalContentEl);

  const modalHeaderEl = document.createElement('div');
  modalHeaderEl.className = 'modal-header';
  modalContentEl.appendChild(modalHeaderEl);
  
  modalHeaderEl.innerHTML = `
    <span class="close" id="closeModal">&times;</span>
  `;
  
  
  modalBodyEl.className = 'modal-body';
  modalContentEl.appendChild(modalBodyEl);
  
  const modalClassEl = document.querySelector('.modal');
  
  modalWrapper.onclick = function (event) {
    if (event.target == modalWrapper) {
      modalClassEl.style.display = "none";
      console.log('modal off')
    }
  }
  
  const closeModalEl = document.getElementById('closeModal');
  
  closeModalEl.onclick = function (event) {
    if (event.target == closeModalEl) {
      modalClassEl.style.display = "none";
      console.log('modal off')
    }
  }
  
}





export { modalBodyEl, createModal };