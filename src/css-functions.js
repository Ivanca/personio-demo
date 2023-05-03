

const parentEmployeeSelector = '.open:has(> ul > li > .employee.active) > .info-container';
const grandpaEmployeeSelector = '.open:has(> ul > li > .employee.open > ul > li > .employee.active) > .info-container';

export function rotateUsingCss3(items) {

  const isRoot = items[0]?.closest('.employee')?.matches('.radial-nav > ul > li > .employee');

  let count = items.length;
  let degrees = 150;
  let offset = 30;
  if (count > 4) {
      offset = 75;
      degrees = 240;
  }

  if (isRoot) {
    items[0].closest('.employee').classList.add('root');
    items = [...items, items[0].parentElement.closest('li')];
  }
  
  items.forEach((item, i) => {
    let infoCont = item.querySelector(':scope > .employee > .info-container');
    if (!infoCont)
      console.log(item)
    let info = infoCont.firstElementChild;
    
    infoCont.style = '';
    info.style = '';
  
    if (infoCont.matches(parentEmployeeSelector)) {
      info.style.transform = 'scale(0.4) translate(150%, 335%)';
      info.style.opacity = 0.4;
      info.style.pointerEvents = 'all';
      return;
    }
  
    if (infoCont.matches(grandpaEmployeeSelector)) {
      info.style.transform = 'scale(0.2) translate(300%, 840%)';
      info.style.opacity = 0.2;
      return;
    }

    if (!item.closest('.employee')?.matches('.active.open')) {
      return;
    }
    
    if (item.querySelector(':scope > .employee.active')) {
      return;
    }
  
    let transform = info.computedStyleMap().get('transform');
    let currScale = transform.length && [...transform].find(e => e instanceof CSSScale)?.x.value;
    let scale = typeof currScale === 'number' ? ' scale(' + currScale + ')' : '';
    let maths = count > 1 ? ((degrees) / (count - 1)) * i - offset : 0;
    infoCont.style.transform = `rotate(${maths}deg) scale(1)`;
    info.style.transform = `rotate(${maths * -1}deg) scale(0.5)`;

  });
}
