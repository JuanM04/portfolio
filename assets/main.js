tippy('#me', {
  content: document.querySelector('#tippyTemplate'),
  theme: 'light',
  trigger: 'click',
  interactive: true
})

const me = document.getElementById('me')
const time = 500



me.addEventListener('click', () => {
  clearInterval(animationInterval)
})



setTimeout(() =>{
  animationInterval = setInterval(() => {
    me.style.transitionTimingFunction = 'ease-in'
    me.style.opacity = 0

    setTimeout(() => {
      me.style.transitionTimingFunction = 'ease-out'
      me.style.opacity = 1
    }, time)
  }, time * 2)
}, 5000)