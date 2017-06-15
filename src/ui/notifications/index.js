export function notify(type, text) {
  const notificationsEl = document.querySelector('#notifications ul');

  const notificationLi = document.createElement('li');
  notificationLi.className = type;

  const dismissDiv = document.createElement('div');
  dismissDiv.className = 'dismiss';
  dismissDiv.textContent = 'x';
  dismissDiv.addEventListener('click', dismiss.bind(notificationLi));
  notificationLi.appendChild(dismissDiv);

  const textSpan = document.createElement('span');
  textSpan.textContent = text;
  notificationLi.appendChild(textSpan);

  notificationsEl.appendChild(notificationLi);
}

function dismiss(event) {
  this.addEventListener('transitionend', () => {
    this.remove();
  });
  this.style.opacity = 0;
}
